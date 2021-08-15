import { Component, OnInit, ViewChild } from '@angular/core';
import { FormControl, FormGroup, Validators } from '@angular/forms';
import { MatDialog } from '@angular/material/dialog';
import { Title } from '@angular/platform-browser';
import { Router } from '@angular/router';
import { Observable } from 'rxjs';
import { BatDongSanService } from 'src/app/batdongsan.service';
import { BatDongSan } from '../bat-dong-san.component';
import { MatSnackBar } from '@angular/material/snack-bar';
import { HinhAnhService } from 'src/app/hinh-anh.service';
import { HttpClient } from '@angular/common/http';
import { CdkDragDrop, moveItemInArray } from '@angular/cdk/drag-drop';

@Component({
  selector: 'app-quan-ly-bds',
  templateUrl: './quan-ly-bds.component.html',
  styleUrls: ['./quan-ly-bds.component.scss'],
})
export class QuanLyBdsComponent implements OnInit {
  value = 'Sản phẩm muốn tìm';
  keyword: string = '';
  danhSachBatDongSanDayDu: BatDongSan[] = [];
  selectBds: BatDongSan;
  files: File[] = [];
  otherFiles: File[] = [];
  mapCenter: google.maps.LatLngLiteral = {
    lat: 10.044582015883334,
    lng: 105.74795720950137,
  };
  markerOptions: google.maps.MarkerOptions = {
    draggable: false,
    animation: google.maps.Animation.DROP,
  };
  mapMarkerPosition: google.maps.LatLngLiteral = {
    lat: 10.044582015883334,
    lng: 105.74795720950137,
  };
  filteredOptions: Observable<String[]>;
  myForm: FormGroup;

  constructor(
    private titleService: Title,
    private router: Router,
    private httpClient: HttpClient,
    public dialog: MatDialog,
    private batDongSanService: BatDongSanService,
    private hinhAnhService: HinhAnhService,
    private _snackBar: MatSnackBar
  ) {
    this.titleService.setTitle('Quản lý BDS');
  }

  ngOnInit(): void {
    this.myForm = new FormGroup({
      id: new FormControl(null),
      ten: new FormControl(null, Validators.required),
      gia: new FormControl(null, Validators.required),
      diaChi: new FormControl(null, Validators.required),
      huong: new FormControl(null),
      mucDichSuDung: new FormControl(null),
      urlHinhDaiDien: new FormControl(null),
      danhSachUrlHinhAnh: new FormControl(null),
      giaBangChu: new FormControl(null),
      ghiChu: new FormControl(null),
      viTriGoogleMap: new FormControl(null)
    });
    this.batDongSanService
      .getAllBatDongSan()
      .subscribe((all) => (this.danhSachBatDongSanDayDu = all));
  }

  onSubmit() {
    const bds: BatDongSan = {
      id: this.myForm.controls.id.value,
      ten: this.myForm.controls.ten.value,
      diaChi: this.myForm.controls.diaChi.value,
      gia: this.myForm.controls.gia.value,
      huong: this.myForm.controls.huong.value,
      mucDichSuDung: this.myForm.controls.mucDichSuDung.value,
      giaBangChu: this.myForm.controls.giaBangChu.value,
      ghiChu: this.myForm.controls.ghiChu.value,
      viTriGoogleMap: this.myForm.controls.viTriGoogleMap.value
    };
    this.batDongSanService
      .updateBatDongSan(bds)
      .subscribe((response: BatDongSan) => {
        this.openSnackBar();
        this.handleImages(response.id);
      });
  }

  drop(event: CdkDragDrop<string[]>) {
    moveItemInArray(this.danhSachBatDongSanDayDu, event.previousIndex, event.currentIndex);
  }

  handleImages(id: number) {
    this.hinhAnhService.cleanFolder('batdongsan', id).subscribe(() => {
      //Hình đại diện
      this.hinhAnhService.uploadHinhAnhDaiDien(this.files[0], 'batdongsan', id).subscribe();
      //Các hình khác
      this.otherFiles.forEach((file) => {
        this.hinhAnhService.uploadHinhAnhKhac(file, 'batdongsan', id).subscribe();
      });
    })
  }

  onSelectBds(item: BatDongSan) {
    this.selectBds = item;
    this.thayDoiToaDo(item);
    this.fillDataVaoForm(item);
  }

  thayDoiToaDo(bds: BatDongSan) {
    const viTri = bds.viTriGoogleMap.split(',');
    const lat: number = Number(viTri[0].trim());
    const lng: number = Number(viTri[1].trim());
    this.mapCenter = { lat, lng };
    this.mapMarkerPosition = { lat, lng };
  }

  setAddress(address: google.maps.places.PlaceResult) {
    this.myForm.controls.diaChi.setValue(address.formatted_address);
    const lat = address.geometry!.location.lat();
    const lng = address.geometry!.location.lng();
    this.myForm.controls.viTriGoogleMap.setValue(lat + ", " + lng);
    this.mapCenter = { lat, lng };
    this.mapMarkerPosition = { lat, lng };
  }

  fillDataVaoForm(bds: BatDongSan) {
    this.myForm.controls.id.setValue(bds.id);
    this.myForm.controls.ten.setValue(bds.ten);
    this.myForm.controls.gia.setValue(bds.gia);
    this.myForm.controls.giaBangChu.setValue(bds.giaBangChu);
    this.myForm.controls.ghiChu.setValue(bds.ghiChu);
    this.myForm.controls.diaChi.setValue(bds.diaChi);
    this.myForm.controls.viTriGoogleMap.setValue(bds.viTriGoogleMap);
    this.myForm.controls.id.setValue(bds.id);
    this.myForm.controls.huong.setValue(bds.huong);
    this.myForm.controls.mucDichSuDung.setValue(bds.mucDichSuDung);
    if (bds.urlHinhDaiDien) {
      this.getImage(bds.urlHinhDaiDien).subscribe(data => {
        var filename = bds.urlHinhDaiDien!.replace(/^.*[\\\/]/, '')
        const file = new File([data], filename, { type: data.type });
        this.files.push(file);
      });
    }
    if (bds.danhSachUrlHinhAnh) {
      bds.danhSachUrlHinhAnh.forEach(url => {
        this.getImage(url).subscribe(data => {
          var filename = url.replace(/^.*[\\\/]/, '')
          const file = new File([data], filename, { type: data.type });
          this.otherFiles.push(file);
        });
      });
    }
    this.thayDoiToaDo(bds);
  }

  getImage(imageUrl: string): Observable<Blob> {
    return this.httpClient.get(`api/images/${imageUrl}`, { responseType: 'blob' });
  }

  displayFn(value: string): string {
    return value;
  }

  onSelect(event: any) {
    this.files = [];
    this.files.push(...event.addedFiles);
  }

  onSelectOtherFile(event: any) {
    this.otherFiles.push(...event.addedFiles);
  }

  onRemove(event: any) {
    this.files.splice(this.files.indexOf(event), 1);
  }

  onRemoveOtherFiles(event: any) {
    this.otherFiles.splice(this.otherFiles.indexOf(event), 1);
  }

  openSnackBar() {
    this._snackBar.openFromComponent(PizzaPartyComponent, {
      duration: 3000,
    });
  }
}

@Component({
  selector: 'updated-bds',
  templateUrl: './updated-bds.html',
  styles: [
    `
      .example-pizza-party {
        color: hotpink;
      }
    `,
  ],
})
export class PizzaPartyComponent {}
