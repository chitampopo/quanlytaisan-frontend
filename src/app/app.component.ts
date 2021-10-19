import { trigger, transition, query, style, animate, group } from '@angular/animations';
import { Component, OnInit } from '@angular/core';
import { LightboxConfig } from 'ngx-lightbox';
import { Subject } from 'rxjs';
import { AuthenService } from './authen.service';

@Component({
  selector: 'app-root',
  templateUrl: './app.component.html',
  styleUrls: ['./app.component.scss'],
  // animations: [
  //   trigger('myAnimation', [
  //     transition('* <=> *', [
  //       query(':enter, :leave', style({ position: 'fixed', width:'100%' })),
  //       group([
  //         query(':enter', [
  //           style({ transform: 'translateX(100%)' }),
  //           animate('0.2s ease-in-out', style({ transform: 'translateX(0%)' }))
  //         ]),
  //         query(':leave', [
  //           style({ transform: 'translateX(0%)' }),
  //           animate('0.2s ease-in-out', style({ transform: 'translateX(-100%)' }))]),
  //       ])
  //     ])
  // ])]
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

  logout() {
    if(confirm("Bạn có chắc thực hiện đăng xuất")) {
      localStorage.removeItem('isAuthen');
      location.reload();
    }
  }
}
