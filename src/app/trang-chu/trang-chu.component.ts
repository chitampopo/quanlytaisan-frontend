import { Component, OnInit } from '@angular/core';
import { MatDialog } from '@angular/material/dialog';
import { Title } from '@angular/platform-browser';
import { BatDongSan } from '../bat-dong-san/bat-dong-san.component';
import { BatDongSanService } from '../batdongsan.service';
import { DongSan } from '../dong-san/dong-san.component';
import { DongSanService } from '../dongsan.service';
import { SearchNangCao } from '../tim-nang-cao/tim-nang-cao.component';

@Component({
  selector: 'app-trang-chu',
  templateUrl: './trang-chu.component.html',
  styleUrls: ['./trang-chu.component.scss']
})
export class TrangChuComponent implements OnInit {
  soLuongToiDa = 4;
  danhSachBatDongSanDayDu: BatDongSan[] = [];
  danhSachBatDongSan: BatDongSan[] = [];
  danhSachDongSanDayDu: DongSan[] = [];
  danhSachDongSan: DongSan[] = [];

  constructor(private titleService: Title, public dialog: MatDialog, private dongSanService: DongSanService, private batDongSanService: BatDongSanService) {
    this.titleService.setTitle('Trang chủ');
  }

  ngOnInit(): void {
    this.dongSanService.getAllDongSan().subscribe(all => {
      this.danhSachDongSanDayDu = all;
      this.danhSachDongSan = this.danhSachDongSanDayDu;
    });

    this.batDongSanService.getAllBatDongSan().subscribe(all => {
      this.danhSachBatDongSanDayDu = all;
      this.danhSachBatDongSan = this.danhSachBatDongSanDayDu;
    });

  }

  modelChanged(event: any) {
    this.danhSachDongSan = this.danhSachDongSanDayDu.filter(item => {
      return this.stringToSlug(item.ten).includes(this.stringToSlug(event)) || this.stringToSlug(item.diaChi).includes(this.stringToSlug(event));
    });
    this.danhSachBatDongSan = this.danhSachBatDongSanDayDu.filter(item => {
      return this.stringToSlug(item.ten).includes(this.stringToSlug(event)) || this.stringToSlug(item.diaChi).includes(this.stringToSlug(event));
    });
  }

  sapXep(event: any) {
    if(event.value === 'low-to-high') {
      this.danhSachDongSan = this.danhSachDongSan.sort((a, b) => a.gia - b.gia);
      this.danhSachBatDongSan = this.danhSachBatDongSan.sort((a, b) => a.gia - b.gia);
    } else if(event.value === 'high-to-low') {
      this.danhSachDongSan = this.danhSachDongSan.sort((a, b) => b.gia - a.gia);
      this.danhSachBatDongSan = this.danhSachBatDongSan.sort((a, b) => b.gia - a.gia);
    }
  }

  timKiemNangCao(data: SearchNangCao) {
    this.danhSachDongSan = this.danhSachDongSanDayDu.filter(item => {
      const matchTen = this.stringToSlug(item.ten).includes(this.stringToSlug(data.ten)) || this.stringToSlug(item.diaChi).includes(this.stringToSlug(data.ten));
      const matchGia = item.gia >= data.giaTu && item.gia <=data.denGia;
      return matchTen && matchGia;
    });
    this.danhSachBatDongSan = this.danhSachBatDongSanDayDu.filter(item => {
      const matchTen = this.stringToSlug(item.ten).includes(this.stringToSlug(data.ten)) || this.stringToSlug(item.diaChi).includes(this.stringToSlug(data.ten));
      const matchGia = item.gia >= data.giaTu && item.gia <=data.denGia;
      return matchTen && matchGia;
    });
  }

  stringToSlug(str: string): string {
    // remove accents
    var from = "àáãảạăằắẳẵặâầấẩẫậèéẻẽẹêềếểễệđùúủũụưừứửữựòóỏõọôồốổỗộơờớởỡợìíỉĩịäëïîöüûñçýỳỹỵỷ",
        to   = "aaaaaaaaaaaaaaaaaeeeeeeeeeeeduuuuuuuuuuuoooooooooooooooooiiiiiaeiiouuncyyyyy";
    for (var i=0, l=from.length ; i < l ; i++) {
      str = str.replace(RegExp(from[i], "gi"), to[i]);
    }

    str = str.toLowerCase()
          .trim()
          .replace(/[^a-z0-9\-]/g, '-')
          .replace(/-+/g, '-');

    return str;
  }
}
