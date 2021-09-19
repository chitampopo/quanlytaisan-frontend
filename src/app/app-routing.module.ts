import { NgModule } from '@angular/core';
import { RouterModule, Routes } from '@angular/router';
import { AuthenService } from './authen.service';
import { BanDoComponent } from './ban-do/ban-do.component';
import { BatDongSanComponent } from './bat-dong-san/bat-dong-san.component';
import { ChiTietBatDongSanComponent } from './bat-dong-san/chi-tiet-bat-dong-san/chi-tiet-bat-dong-san.component';
import { QuanLyBdsComponent } from './bat-dong-san/quan-ly-bds/quan-ly-bds.component';
import { SapXepBatDongSanComponent } from './bat-dong-san/sap-xep-bat-dong-san/sap-xep-bat-dong-san.component';
import { CaiDatComponent } from './cai-dat/cai-dat.component';
import { ChiTietDongSanComponent } from './dong-san/chi-tiet-dong-san/chi-tiet-dong-san.component';
import { DongSanComponent } from './dong-san/dong-san.component';
import { QuanLyDsComponent } from './dong-san/quan-ly-ds/quan-ly-ds.component';
import { LoginComponent } from './login/login.component';
import { TrangChuComponent } from './trang-chu/trang-chu.component';

const routes: Routes = [
  { path: '', redirectTo: '/home', pathMatch: 'full' },
  { path: 'home', component: TrangChuComponent},
  { path: 'trang-chu', component: TrangChuComponent},
  { path: 'bat-dong-san', component: BatDongSanComponent },
  { path: 'bat-dong-san/:id', component: ChiTietBatDongSanComponent },
  { path: 'bat-dong-san-quan-ly', component: QuanLyBdsComponent, canActivate: [AuthenService] },
  { path: 'dong-san-quan-ly', component: QuanLyDsComponent, canActivate: [AuthenService] },
  { path: 'bat-dong-san-sap-xep', component: SapXepBatDongSanComponent, canActivate: [AuthenService] },
  { path: 'dong-san', component: DongSanComponent },
  { path: 'dong-san/:id', component: ChiTietDongSanComponent },
  { path: 'ban-do', component: BanDoComponent},
  { path: 'cai-dat', component: CaiDatComponent, canActivate: [AuthenService]},
  { path: 'login', component: LoginComponent},
];

@NgModule({
  imports: [RouterModule.forRoot(routes)],
  exports: [RouterModule],
   declarations: [
  ]
})
export class AppRoutingModule { }
