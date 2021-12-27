import { Component, OnInit } from '@angular/core';
import { AuthenService } from './authen.service';
import { USER_MENU, ADMIN_MENU } from '../app/menu-items'
@Component({
  selector: 'app-root',
  templateUrl: './app.component.html',
  styleUrls: ['./app.component.scss'],
})
export class AppComponent implements OnInit {
  title = 'Quản lý tài sản';
  isLoggedIn = false;
  menuItems = USER_MENU;

  constructor(private authenService: AuthenService) {
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
      this.menuItems = ADMIN_MENU;
    }
  }

  logout() {
    if(confirm("Bạn có chắc thực hiện đăng xuất")) {
      localStorage.removeItem('isAuthen');
      location.reload();
    }
  }
}
