import { Component, OnInit } from '@angular/core';
import { MatDialog } from '@angular/material/dialog';
import { Title } from '@angular/platform-browser';
import { Router } from '@angular/router';
import { BatDongSanService } from '../batdongsan.service';
import { SearchNangCao, TimNangCaoComponent } from '../tim-nang-cao/tim-nang-cao.component';
export class BatDongSan {
  id: string;
  ten: string;
  gia: number;
  huong: string;
  mucDichSuDung: string;
  diaChi: string;
  viTriGoogleMap: string;
  urlHinhDaiDien?: string;
  danhSachUrlHinhAnh?: string[];
  giaBangChu: string = '';
  ghiChu: string = '';
  dienTichDat?: string;
  dienTichNha?: string;
}

@Component({
  selector: 'app-bat-dong-san',
  templateUrl: './bat-dong-san.component.html',
  styleUrls: ['./bat-dong-san.component.scss'],
})
export class BatDongSanComponent implements OnInit {
  value = 'Sản phẩm muốn tìm';
  keyword: string = '';
  danhSachBatDongSanDayDu: BatDongSan[] = [];
  danhSachBatDongSan: BatDongSan[] = [];

  constructor(
    private batDongSanService: BatDongSanService,
    private titleService: Title,
    private router: Router,
    public dialog: MatDialog
  ) {
    this.titleService.setTitle('Bất động sản');

  }

  ngOnInit(): void {
    this.batDongSanService.getAllBatDongSan().subscribe(all => {
      this.danhSachBatDongSanDayDu = all;
      this.danhSachBatDongSan = all;
    });
  }

  xemChiTiet(id: number): void {
    this.router.navigate(['/bat-dong-san', id]);
  }

  openDialog() {
    const dialogRef = this.dialog.open(TimNangCaoComponent, {
      width: '50%',
      data: {ten: '', diaChi: ''} });

    dialogRef.afterClosed().subscribe(result => {
      console.log(`Dialog result: ${result}`);
    });
  }

  openTrangQuanLyBDS(): void {

  }

  modelChanged(event: any) {
    this.danhSachBatDongSan = this.danhSachBatDongSanDayDu.filter(item => {
      return this.stringToSlug(item.ten).includes(this.stringToSlug(event)) || this.stringToSlug(item.diaChi).includes(this.stringToSlug(event));
    });
  }

  sapXep(event: any) {
    if(event.value === 'low-to-high') {
      this.danhSachBatDongSan = this.danhSachBatDongSan.sort((a, b) => a.gia - b.gia);
    } else if(event.value === 'high-to-low') {
      this.danhSachBatDongSan = this.danhSachBatDongSan.sort((a, b) => b.gia - a.gia);
    }
  }

  timKiemNangCao(data: SearchNangCao) {
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
