import { Component, Inject, Input, OnInit } from '@angular/core';
import { BatDongSan } from '../bat-dong-san/bat-dong-san.component';
import { Options, LabelType } from '@angular-slider/ngx-slider';
import { MatDialogRef, MAT_DIALOG_DATA } from '@angular/material/dialog';


export class SearchNangCao {
  ten: string = '';
  diaChi: string = '';
  giaTu: number;
  denGia: number;
}

@Component({
  templateUrl: './tim-nang-cao.component.html',
  styleUrls: ['./tim-nang-cao.component.scss'],
})
export class TimNangCaoComponent implements OnInit {
  minValue: number = 1; //1tr
  maxValue: number = 100000000000; //100 tỷ

  constructor(
    public dialogRef: MatDialogRef<TimNangCaoComponent>,
    @Inject(MAT_DIALOG_DATA) public data: SearchNangCao
  ) {}

  onNoClick(): void {
    this.dialogRef.close();
  }

  formatLabel(value: number) {
    if (value >= 1000) {
      return Math.round(value / 1000) + 'tỷ';
    }

    return value;
  }

  ngOnInit(): void {
    // this.data.denGia = 100000000000;
  }
}
