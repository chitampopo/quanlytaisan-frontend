import { Component } from '@angular/core';
import { LightboxConfig } from 'ngx-lightbox';

@Component({
  selector: 'app-root',
  templateUrl: './app.component.html',
  styleUrls: ['./app.component.scss']
})
export class AppComponent {
  title = 'Quản lý tài sản';

  constructor(private _lightboxConfig: LightboxConfig) {
    // override default config
    _lightboxConfig.fadeDuration = 1;
    _lightboxConfig.showZoom = true;
    _lightboxConfig.showRotate = true;
    _lightboxConfig.albumLabel = "Hình %1 / %2";

  }
}
