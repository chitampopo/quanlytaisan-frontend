import { Component, OnInit } from '@angular/core';
import { MatDialog } from '@angular/material/dialog';
import { Title } from '@angular/platform-browser';
import { Router } from '@angular/router';
import { forkJoin } from 'rxjs';
import { BatDongSan } from '../bat-dong-san/bat-dong-san.component';
import { BatDongSanService } from '../batdongsan.service';
import { ConfigService } from '../config.service';
import { DongSan } from '../dong-san/dong-san.component';
import { DongSanService } from '../dongsan.service';
import { SearchNangCao } from '../tim-nang-cao/tim-nang-cao.component';

@Component({
  selector: 'app-trang-chu',
  templateUrl: './trang-chu.component.html',
  styleUrls: ['./trang-chu.component.scss'],
})
export class TrangChuComponent implements OnInit {
  soLuongToiDa = 4;

  allBDS: BatDongSan[] = [];
  listBSDUuTien: BatDongSan[] = [];
  danhSachBatDongSan: BatDongSan[] = [];

  danhSachDongSanDayDu: DongSan[] = [];
  danhSachDongSan: DongSan[] = [];
  danhSachDongSanUuTien: DongSan[] = [];
  keyword: string = '';

  constructor(
    private titleService: Title,
    public dialog: MatDialog,
    private dongSanService: DongSanService,
    private batDongSanService: BatDongSanService,
    private configService: ConfigService,
    private router: Router,
  ) {
    this.titleService.setTitle('Trang chủ');
  }

  ngOnInit(): void {
    const allDongSan = this.dongSanService.getAllDongSan();
    const sapXepDongSan = this.configService.getSortDongSan();
    const allBatDongSan = this.batDongSanService.getAllBatDongSan();
    const sapXepBatDongSan = this.configService.getSortBatDongSan();
    forkJoin(
      [allDongSan, sapXepDongSan, allBatDongSan, sapXepBatDongSan]
    ).subscribe(([allDongSan, sapXepDongSan, allBatDongSan, sapXepBatDongSan]) => {
      this.danhSachDongSanDayDu = allDongSan;
      this.danhSachDongSan = this.danhSachDongSanDayDu;
      //Sap xep dong san
      console.log(sapXepDongSan.homepage);
      const listIdDongSanUuTien: string[] = [];
      sapXepDongSan.homepage.forEach(item => {
        listIdDongSanUuTien.push(item.id);
      })
      this.danhSachDongSan.forEach(ds => {
        if(listIdDongSanUuTien.includes(ds.id.toString())) {
          this.danhSachDongSanUuTien.push(ds);
        }
       })

      this.allBDS = allBatDongSan;
      this.danhSachBatDongSan = this.allBDS;
      const listIdBatDongSanUuTien: string[] = [];
      sapXepBatDongSan.homepage.forEach(item => {
        listIdBatDongSanUuTien.push(item.id);
      })
      this.danhSachBatDongSan.forEach(bds => {
        if(listIdBatDongSanUuTien.includes(bds.id.toString())) {
          this.listBSDUuTien.push(bds);
        }
       })
    })

    this.batDongSanService.getAllBatDongSan().subscribe((all) => {
      this.allBDS = all;
      this.danhSachBatDongSan = this.allBDS;
    });
  }

  onThayDoiKeyword(newKeyword: string) {
    this.keyword = newKeyword;

    this.danhSachDongSan = this.danhSachDongSanDayDu.filter((item) => {
      return (
        this.stringToSlug(item.ten).includes(this.stringToSlug(newKeyword)) ||
        this.stringToSlug(item.diaChi).includes(this.stringToSlug(newKeyword))
      );
    });
    this.danhSachBatDongSan = this.allBDS.filter((item) => {
      return (
        this.stringToSlug(item.ten).includes(this.stringToSlug(newKeyword)) ||
        this.stringToSlug(item.diaChi).includes(this.stringToSlug(newKeyword))
      );
    });
  }

  sapXep(event: any) {
    if (event.value === 'low-to-high') {
      this.danhSachDongSan = this.danhSachDongSan.sort((a, b) => a.gia - b.gia);
      this.listBSDUuTien = this.listBSDUuTien.sort((a, b) => a.gia - b.gia);
      this.danhSachBatDongSan = this.danhSachBatDongSan.sort((a, b) => a.gia - b.gia);
      this.danhSachDongSanUuTien = this.danhSachDongSanUuTien.sort((a, b) => a.gia - b.gia);
    } else if (event.value === 'high-to-low') {
      this.danhSachDongSan = this.danhSachDongSan.sort((a, b) => b.gia - a.gia);
      this.listBSDUuTien = this.listBSDUuTien.sort((a, b) => b.gia - a.gia);
      this.danhSachBatDongSan = this.danhSachBatDongSan.sort((a, b) => b.gia - a.gia);
      this.danhSachDongSanUuTien = this.danhSachDongSanUuTien.sort((a, b) => b.gia - a.gia);
    }
  }

  timKiemNangCao(data: SearchNangCao) {
    this.keyword = this.convertSearchNangCaoToString(data);
    this.danhSachDongSan = this.danhSachDongSanDayDu.filter(item => this.matchSearchNangCaoDS(item, data));
    this.danhSachBatDongSan = this.allBDS.filter(item => this.matchSearchNangCaoBDS(item, data));
  }

  //ten=abc,diachi=cantho,min=1000000000,max=9000000000
  private convertSearchNangCaoToString(data: SearchNangCao) {
    return 'ten=' + data.ten + ',diachi=' + data.diaChi + ',min=' + data.giaTu + ',max' + data.denGia;
  }

  private matchSearchNangCaoBDS(item: BatDongSan, data: SearchNangCao) {
    let cacTieuChi: boolean[] = [];
    if(data.ten) {
      cacTieuChi.push(this.stringToSlug(item.ten).includes(this.stringToSlug(data.ten)));
    }
    if(data.diaChi) {
      cacTieuChi.push(this.stringToSlug(item.diaChi).includes(this.stringToSlug(data.diaChi)));
    }
    if(data.giaTu) {
      cacTieuChi.push(item.gia >= data.giaTu);
    }
    if(data.denGia) {
      cacTieuChi.push(item.gia <= data.denGia);
    }
    return cacTieuChi.every(value => value == true);
  }

  private matchSearchNangCaoDS(item: DongSan, data: SearchNangCao) {
    let cacTieuChi: boolean[] = [];
    if(data.ten) {
      cacTieuChi.push(this.stringToSlug(item.ten).includes(this.stringToSlug(data.ten)));
    }
    if(data.diaChi) {
      cacTieuChi.push(this.stringToSlug(item.diaChi).includes(this.stringToSlug(data.diaChi)));
    }
    if(data.giaTu) {
      cacTieuChi.push(item.gia >= data.giaTu);
    }
    if(data.denGia) {
      cacTieuChi.push(item.gia <= data.denGia);
    }
    return cacTieuChi.every(value => value == true);
  }

  stringToSlug(str: string): string {
    // remove accents
    var from =
        'àáãảạăằắẳẵặâầấẩẫậèéẻẽẹêềếểễệđùúủũụưừứửữựòóỏõọôồốổỗộơờớởỡợìíỉĩịäëïîöüûñçýỳỹỵỷ',
      to =
        'aaaaaaaaaaaaaaaaaeeeeeeeeeeeduuuuuuuuuuuoooooooooooooooooiiiiiaeiiouuncyyyyy';
    for (var i = 0, l = from.length; i < l; i++) {
      str = str.replace(RegExp(from[i], 'gi'), to[i]);
    }

    str = str
      .toLowerCase()
      .trim()
      .replace(/[^a-z0-9\-]/g, '-')
      .replace(/-+/g, '-');

    return str;
  }

  navigate(value: string) {
    this.router.navigate([value]);
  }

}
