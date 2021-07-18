import { Component, OnInit } from '@angular/core';
import { Title } from '@angular/platform-browser';
import { ActivatedRoute } from '@angular/router';
import { IAlbum, Lightbox } from 'ngx-lightbox';
import { BatDongSanService } from 'src/app/batdongsan.service';
import { BatDongSan } from '../bat-dong-san.component';

@Component({
  selector: 'app-chi-tiet-bat-dong-san',
  templateUrl: './chi-tiet-bat-dong-san.component.html',
  styleUrls: ['./chi-tiet-bat-dong-san.component.scss']
})
export class ChiTietBatDongSanComponent implements OnInit {
  batDongSan: BatDongSan;
  private _album: IAlbum[] = [];

  constructor(private route: ActivatedRoute, private batDongSanService: BatDongSanService, private title: Title, private _lightbox: Lightbox) { }

  ngOnInit() {
    this.route.params.subscribe(params => {
      this.batDongSanService.getBatDongSan(params.id).subscribe(bds => {
        this.batDongSan = bds;
        this.title.setTitle(bds.ten);

        if(this.batDongSan && this.batDongSan.danhSachUrlHinhAnh) {
          for (let i = 0; i < this.batDongSan.danhSachUrlHinhAnh.length; i++) {
            const src = '/api/images/' + this.batDongSan.danhSachUrlHinhAnh[i];
            const thumb = '/api/images/' + this.batDongSan.danhSachUrlHinhAnh[i];
            const album:IAlbum = {
               src: src,
               thumb: thumb
            };
            this._album.push(album);
          }
        }
      });
    });
  }

  open(index: number): void {
    // open lightbox
    this._lightbox.open(this._album, index);
  }

  close(): void {
    // close lightbox programmatically
    this._lightbox.close();
  }

}
