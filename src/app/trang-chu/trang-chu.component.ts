import { Component, OnInit } from '@angular/core';
import { MatDialog } from '@angular/material/dialog';
import { Title } from '@angular/platform-browser';
import { BatDongSan } from '../bat-dong-san/bat-dong-san.component';
import { BatDongSanService } from '../batdongsan.service';
import { DongSan } from '../dong-san/dong-san.component';
import { DongSanService } from '../dongsan.service';

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
