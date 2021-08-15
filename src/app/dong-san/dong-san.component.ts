import { DongSanService } from './../dongsan.service';
import { Component, OnInit } from '@angular/core';
import { MatDialog } from '@angular/material/dialog';
import { Title } from '@angular/platform-browser';
import { danhSachDongSan } from 'src/assets/sample-datas';
import { SearchNangCao, TimNangCaoComponent } from '../tim-nang-cao/tim-nang-cao.component';
import { environment } from '../../environments/environment';

export interface DongSan {
  id: string;
  ten: string;
  hangXe: string;
  dongXe: string;
  ghiChu?: string;
  diaChi: string;
  namSanXuat: string;
  soChoNgoi: string;
  gia: number;
  giaBangChu: string;
  ghiChuGia?: string;
  diaChiHinhAnhDaiDien: string;
  danhSachDiaChiHinhAnh: string[];
}

@Component({
  selector: 'app-dong-san',
  templateUrl: './dong-san.component.html',
  styleUrls: ['./dong-san.component.scss']
})
export class DongSanComponent implements OnInit {
  imageFolder = environment.imageFolder;
  value = "Sản phẩm muốn tìm";
  keyword: string = '';
  danhSachDongSanDayDu: DongSan[] = [];
  danhSachDongSan: DongSan[] = [];

  constructor(private titleService: Title, public dialog: MatDialog, private dongSanService: DongSanService) {
    this.titleService.setTitle('Động sản');
  }

  ngOnInit(): void {
    this.dongSanService.getAllDongSan().subscribe(all => {
      this.danhSachDongSan = all;
      this.danhSachDongSanDayDu = all;
    });
  }

  openDialog() {
    const dialogRef = this.dialog.open(TimNangCaoComponent, {
      width: '50%',
      data: {ten: '', diaChi: ''} });

    dialogRef.afterClosed().subscribe(result => {
      console.log(`Dialog result: ${result}`);
    });
  }

  modelChanged(event: any) {
    this.danhSachDongSan = this.danhSachDongSanDayDu.filter(item => {
      return this.stringToSlug(item.ten).includes(this.stringToSlug(event)) || this.stringToSlug(item.diaChi).includes(this.stringToSlug(event));
    });
  }

  sapXep(event: any) {
    if(event.value === 'low-to-high') {
      this.danhSachDongSan = this.danhSachDongSan.sort((a, b) => a.gia - b.gia);
    } else if(event.value === 'high-to-low') {
      this.danhSachDongSan = this.danhSachDongSan.sort((a, b) => b.gia - a.gia);
    }
  }

  timKiemNangCao(data: SearchNangCao) {
    this.danhSachDongSan = this.danhSachDongSanDayDu.filter(item => {
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
