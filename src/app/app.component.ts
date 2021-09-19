import { Component, OnInit } from '@angular/core';
import { LightboxConfig } from 'ngx-lightbox';
import { Subject } from 'rxjs';
import { AuthenService } from './authen.service';

@Component({
  selector: 'app-root',
  templateUrl: './app.component.html',
  styleUrls: ['./app.component.scss']
})
export class AppComponent implements OnInit {
  title = 'Quản lý tài sản';
  isLoggedIn = false;

  constructor(private _lightboxConfig: LightboxConfig, private authenService: AuthenService) {
    // override default config
    _lightboxConfig.fadeDuration = 1;
    _lightboxConfig.showZoom = true;
    _lightboxConfig.showRotate = true;
    _lightboxConfig.albumLabel = "Hình %1 / %2";

    this.authenService.observeLogin().subscribe(
      () => {
        if(localStorage.getItem('isAuthen')) {
          this.isLoggedIn = true;
        }
      }
    )
  }

  ngOnInit(): void {
    if(localStorage.getItem('isAuthen')) {
      this.isLoggedIn = true;
    }
  }
}
