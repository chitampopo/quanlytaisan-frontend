import { Component, OnInit } from '@angular/core';
import { AbstractControl, FormControl } from '@angular/forms';
import { ThemePalette } from '@angular/material/core';
import { Title } from '@angular/platform-browser';
import { NgxMatColorPickerInput, Color } from '@angular-material-components/color-picker';

@Component({
  selector: 'app-cai-dat',
  templateUrl: './cai-dat.component.html',
  styleUrls: ['./cai-dat.component.scss']
})
export class CaiDatComponent implements OnInit {
  public touchUi = false;
  public mainBgColor: ThemePalette = 'primary';
  mainBgColorFC: AbstractControl = new FormControl(null);
  mainBackgroundColor: Color;
  buttonBackgroundColor: Color;
  public buttonBgColor: ThemePalette = 'primary';
  buttonBgColorFC: AbstractControl = new FormControl(null);

  public options = [
    { value: true, label: 'True' },
    { value: false, label: 'False' }
  ];


  headerFiles: File[] = [];
  footerFiles: File[] = [];

  constructor(private titleService: Title) {
    this.titleService.setTitle('Cài đặt');
  }

  ngOnInit() {
    const mainBgColor = this.hexToRgb('#E5E5E5');
    if(mainBgColor) {
      this.mainBgColorFC.setValue(new Color(mainBgColor.r, mainBgColor.g, mainBgColor.b));
      this.mainBackgroundColor = new Color(mainBgColor.r, mainBgColor.g, mainBgColor.b);
    }
    const buttonBackground = this.hexToRgb('#0275b1');
    if(buttonBackground) {
      this.buttonBgColorFC.setValue(new Color(buttonBackground.r, buttonBackground.g, buttonBackground.b));
      this.buttonBackgroundColor = new Color(buttonBackground.r, buttonBackground.g, buttonBackground.b);
    }
  }

  onSelectHeader(event: any) {
    this.headerFiles = [];
    this.headerFiles.push(...event.addedFiles);
  }
  onRemoveHeader(event: any) {
    this.headerFiles = [];
  }

  onSelectFooter(event: any) {
    this.footerFiles = [];
    this.footerFiles.push(...event.addedFiles);
  }
  onRemoveFooter(event: any) {
    this.footerFiles = [];
  }

  hexToRgb(hex: string) {
    const shorthandRegex = /^#?([a-f\d])([a-f\d])([a-f\d])$/i;
    hex = hex.replace(shorthandRegex, (m, r, g, b) => {
      return r + r + g + g + b + b;
    });
    const result = /^#?([a-f\d]{2})([a-f\d]{2})([a-f\d]{2})$/i.exec(hex);
    return result ? {
      r: parseInt(result[1], 16),
      g: parseInt(result[2], 16),
      b: parseInt(result[3], 16)
    } : null;
  }

}
