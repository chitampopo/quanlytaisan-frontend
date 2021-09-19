import { CdkDragDrop, moveItemInArray } from '@angular/cdk/drag-drop';
import { HttpClient } from '@angular/common/http';
import { Component, OnInit } from '@angular/core';
import { FormGroup, FormControl, Validators } from '@angular/forms';
import { MatDialog } from '@angular/material/dialog';
import { MatSnackBar } from '@angular/material/snack-bar';
import { Title } from '@angular/platform-browser';
import { Router } from '@angular/router';
import { Observable } from 'rxjs';
import { PizzaPartyComponent } from 'src/app/bat-dong-san/quan-ly-bds/quan-ly-bds.component';
import { DongSanService } from 'src/app/dongsan.service';
import { HinhAnhService } from 'src/app/hinh-anh.service';
import { DongSan } from '../dong-san.component';

@Component({
  selector: 'app-quan-ly-ds',
  templateUrl: './quan-ly-ds.component.html',
  styleUrls: ['./quan-ly-ds.component.scss']
})
export class QuanLyDsComponent implements OnInit {

  value = 'Sản phẩm muốn tìm';
  keyword: string = '';
  danhSachDongSanDayDu: DongSan[] = [];
  selectDs: DongSan;
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
    private dongSanService: DongSanService,
    private hinhAnhService: HinhAnhService,
    private _snackBar: MatSnackBar
  ) {
    this.titleService.setTitle('Quản lý ĐS');
  }

  ngOnInit(): void {
    this.myForm = new FormGroup({
      id: new FormControl(null),
      ten: new FormControl(null, Validators.required),
      gia: new FormControl(null, Validators.required),
      diaChi: new FormControl(null, Validators.required),
      hangXe: new FormControl(null),
      dongXe: new FormControl(null),
      namSanXuat: new FormControl(null),
      soChoNgoi: new FormControl(null),
      urlHinhDaiDien: new FormControl(null),
      danhSachUrlHinhAnh: new FormControl(null),
      giaBangChu: new FormControl(null),
      ghiChu: new FormControl(null),
      viTriGoogleMap: new FormControl(null)
    });
    this.dongSanService
      .getAllDongSan()
      .subscribe((all) => (this.danhSachDongSanDayDu = all));
  }

  onSubmit() {
    const bds: DongSan = {
      id: this.myForm.controls.id.value,
      ten: this.myForm.controls.ten.value,
      diaChi: this.myForm.controls.diaChi.value,
      gia: this.myForm.controls.gia.value,
      giaBangChu: this.myForm.controls.giaBangChu.value,
      ghiChu: this.myForm.controls.ghiChu.value,
      dongXe: this.myForm.controls.dongXe.value,
      hangXe: this.myForm.controls.hangXe.value,
      namSanXuat: this.myForm.controls.namSanXuat.value,
      soChoNgoi: this.myForm.controls.soChoNgoi.value,
    };
    this.dongSanService
      .updateDongSan(bds)
      .subscribe((response: DongSan) => {
        this.openSnackBar();
        this.handleImages(response.id);
      });
  }

  drop(event: CdkDragDrop<string[]>) {
    moveItemInArray(this.danhSachDongSanDayDu, event.previousIndex, event.currentIndex);
  }

  handleImages(id: string) {
    this.hinhAnhService.cleanFolder('dongsan', id).subscribe(() => {
      //Hình đại diện
      this.hinhAnhService.uploadHinhAnhDaiDien(this.files[0], 'dongsan', id).subscribe();
      //Các hình khác
      this.otherFiles.forEach((file) => {
        this.hinhAnhService.uploadHinhAnhKhac(file, 'dongsan', id).subscribe();
      });
    })
  }

  onSelectBds(item: DongSan) {
    this.files = [];
    this.otherFiles = [];
    this.selectDs = item;
    this.thayDoiToaDo(item);
    this.fillDataVaoForm(item);
  }

  thayDoiToaDo(bds: DongSan) {
  }

  setAddress(address: google.maps.places.PlaceResult) {
    this.myForm.controls.diaChi.setValue(address.formatted_address);
    const lat = address.geometry!.location.lat();
    const lng = address.geometry!.location.lng();
    this.myForm.controls.viTriGoogroutingleMap.setValue(lat + ", " + lng);
    this.mapCenter = { lat, lng };
    this.mapMarkerPosition = { lat, lng };
  }

  fillDataVaoForm(bds: DongSan) {
    this.myForm.controls.id.setValue(bds.id);
    this.myForm.controls.ten.setValue(bds.ten);
    this.myForm.controls.gia.setValue(bds.gia);
    this.myForm.controls.giaBangChu.setValue(bds.giaBangChu);
    this.myForm.controls.ghiChu.setValue(bds.ghiChu);
    this.myForm.controls.diaChi.setValue(bds.diaChi);
    this.myForm.controls.id.setValue(bds.id);
    this.myForm.controls.hangXe.setValue(bds.hangXe);
    this.myForm.controls.dongXe.setValue(bds.dongXe);
    this.myForm.controls.namSanXuat.setValue(bds.namSanXuat);
    this.myForm.controls.soChoNgoi.setValue(bds.soChoNgoi);
    this.myForm.controls.ghiChu.setValue(bds.ghiChu);
    if (bds.diaChiHinhAnhDaiDien) {
      this.getImage(bds.diaChiHinhAnhDaiDien).subscribe(data => {
        var filename = bds.diaChiHinhAnhDaiDien!.replace(/^.*[\\\/]/, '')
        const file = new File([data], filename, { type: data.type });
        this.files.push(file);
      });
    }
    if (bds.danhSachDiaChiHinhAnh) {
      bds.danhSachDiaChiHinhAnh.forEach(url => {
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
