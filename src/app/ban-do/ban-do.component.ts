import { Component, OnInit, ViewChild } from '@angular/core';
import { Title } from '@angular/platform-browser';
import { BatDongSan } from '../bat-dong-san/bat-dong-san.component';
import { danhSachBatDongSan } from 'src/assets/sample-datas';
import { Observable } from 'rxjs';
import { HttpClient } from '@angular/common/http';
import { MapInfoWindow, MapMarker } from '@angular/google-maps';
import { BatDongSanService } from '../batdongsan.service';

@Component({
  selector: 'app-ban-do',
  templateUrl: './ban-do.component.html',
  styleUrls: ['./ban-do.component.scss'],
})
export class BanDoComponent implements OnInit {
  @ViewChild(MapInfoWindow) infoWindow: MapInfoWindow;

  danhSachBatDongSanDayDu = danhSachBatDongSan;
  danhSachBatDongSan: BatDongSan[] = [];
  apiLoaded: Observable<boolean> | undefined;
  zoom = 12;
  center: google.maps.LatLngLiteral = {
    lat: 10.044582015883334,
    lng: 105.74795720950137,
  };
  options: google.maps.MapOptions = {
    gestureHandling: 'cooperative',
    maxZoom: 15,
    minZoom: 5,
  };
  markerOptions: google.maps.MarkerOptions = { draggable: false, animation: google.maps.Animation.DROP};
  markerPositions: google.maps.LatLngLiteral[] = [];
  markers: MapMarker[] = [];
  infoContent: any;
  infoTitle: string;
  infoPrice: number;

  constructor(private titleService: Title, private httpClient: HttpClient, private batDongSanService: BatDongSanService) {
    this.titleService.setTitle('Bản đồ');
  }

  ngOnInit() {
    this.batDongSanService.getAllBatDongSan().subscribe(all => {
      this.danhSachBatDongSanDayDu = all;
      this.danhSachBatDongSan = this.danhSachBatDongSanDayDu;
      this.danhSachBatDongSan.forEach((item) => {
        const viTri = item.viTriGoogleMap.split(',');
        const lat: number = Number(viTri[0].trim());
        const lng: number = Number(viTri[1].trim());
        this.markerPositions.push({ lat, lng });
      });
    });
  }

  zoomIn() {
    if (this.zoom < 15) {
      this.zoom++;
    }
  }

  zoomOut() {
    if (this.zoom > 8) {
      this.zoom--;
    }
  }

  thayDoiToaDo(bds: BatDongSan) {
    const viTri = bds.viTriGoogleMap.split(',');
    const lat: number = Number(viTri[0].trim());
    const lng: number = Number(viTri[1].trim());
    setTimeout(() => {
      this.zoom = 12;
    }, 300);
    setTimeout(() => {
      this.center = {
        lat,
        lng,
      };
      this.zoom = 15;
    }, 600);
  }

  openInfoWindow(marker: MapMarker, index: number) {
    this.infoWindow.open(marker);
    this.infoTitle = this.danhSachBatDongSan[index].ten;
    this.infoPrice = this.danhSachBatDongSan[index].gia;
  }
}
