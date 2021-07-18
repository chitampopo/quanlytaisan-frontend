import { Component, Inject, Input, OnInit } from '@angular/core';
import { BatDongSan } from '../bat-dong-san/bat-dong-san.component';
import { Options, LabelType } from '@angular-slider/ngx-slider';
import { MatDialogRef, MAT_DIALOG_DATA } from '@angular/material/dialog';

@Component({
  templateUrl: './tim-nang-cao.component.html',
  styleUrls: ['./tim-nang-cao.component.scss'],
})
export class TimNangCaoComponent implements OnInit {
  minValue: number = 100;
  maxValue: number = 400;
  options: Options = {
    floor: 0,
    ceil: 500,
    translate: (value: number, label: LabelType): string => {
      switch (label) {
        case LabelType.Low:
          return '<b>Thấp nhất:</b> $' + value;
        case LabelType.High:
          return '<b>Cao nhất:</b> $' + value;
        default:
          return '$' + value;
      }
    },
  };

  constructor(
    public dialogRef: MatDialogRef<TimNangCaoComponent>,
    @Inject(MAT_DIALOG_DATA) public data: BatDongSan
  ) {}

  onNoClick(): void {
    this.dialogRef.close();
  }

  ngOnInit(): void {}
}
