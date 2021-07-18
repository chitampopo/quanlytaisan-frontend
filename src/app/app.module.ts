import { ChiTietBatDongSanComponent } from './bat-dong-san/chi-tiet-bat-dong-san/chi-tiet-bat-dong-san.component';
import { NgModule } from '@angular/core';
import { BrowserModule } from '@angular/platform-browser';
import { AppRoutingModule } from './app-routing.module';
import { AppComponent } from './app.component';
import { BrowserAnimationsModule } from '@angular/platform-browser/animations';
import { MenuComponent } from './menu/menu.component';
import { MatMenuModule } from '@angular/material/menu';
import { MatTabsModule } from '@angular/material/tabs';
import { TrangChuComponent } from './trang-chu/trang-chu.component';
import { BatDongSanComponent } from './bat-dong-san/bat-dong-san.component';
import { BanDoComponent } from './ban-do/ban-do.component';
import { MatButtonModule } from '@angular/material/button';
import { MatInputModule } from '@angular/material/input';
import { MatFormFieldModule } from '@angular/material/form-field';
import { MatIconModule } from '@angular/material/icon';
import { MatSelectModule } from '@angular/material/select';
import { MatListModule } from '@angular/material/list';
import { NgbModule } from '@ng-bootstrap/ng-bootstrap';
import { ThongSoComponent } from './thong-so/thong-so.component';
import { ChiTietDongSanComponent } from './dong-san/chi-tiet-dong-san/chi-tiet-dong-san.component';
import { DongSanComponent } from './dong-san/dong-san.component';
import { FormsModule, ReactiveFormsModule } from '@angular/forms';
import { TimNangCaoComponent } from './tim-nang-cao/tim-nang-cao.component';
import { MatDialogModule } from '@angular/material/dialog';
import { NgxSliderModule } from '@angular-slider/ngx-slider';
import { QuanLyBdsComponent } from './bat-dong-san/quan-ly-bds/quan-ly-bds.component';
import { GoogleMapsModule } from '@angular/google-maps';
import { HttpClientModule } from '@angular/common/http';
import { LoginComponent } from './login/login.component';
import { NgxDropzoneModule } from 'ngx-dropzone';
import { MatAutocompleteModule } from '@angular/material/autocomplete';
import { TimKiemComponent } from './tim-kiem/tim-kiem.component';
import { LightboxModule } from 'ngx-lightbox';
import { QuillModule } from 'ngx-quill';
import { MatSnackBarModule } from '@angular/material/snack-bar';
import { GooglePlacesDirective } from './google-places.directive';
import { MatCheckboxModule } from '@angular/material/checkbox';

@NgModule({
  declarations: [
    AppComponent,
    MenuComponent,
    TrangChuComponent,
    BatDongSanComponent,
    DongSanComponent,
    BanDoComponent,
    ChiTietBatDongSanComponent,
    ChiTietDongSanComponent,
    ThongSoComponent,
    TimNangCaoComponent,
    QuanLyBdsComponent,
    LoginComponent,
    TimKiemComponent,
    GooglePlacesDirective,
  ],
  imports: [
    BrowserModule,
    AppRoutingModule,
    BrowserAnimationsModule,
    FormsModule,
    ReactiveFormsModule,
    NgbModule,
    MatMenuModule,
    MatTabsModule,
    MatButtonModule,
    MatInputModule,
    MatFormFieldModule,
    MatIconModule,
    MatSelectModule,
    MatListModule,
    MatDialogModule,
    NgxSliderModule,
    GoogleMapsModule,
    HttpClientModule,
    NgxDropzoneModule,
    MatAutocompleteModule,
    LightboxModule,
    MatSnackBarModule,
    QuillModule.forRoot({
      modules: {
        syntax: false,
        toolbar: [
          ['bold', 'italic', 'underline', 'strike'],
          [{ header: 1 }, { header: 2 }],
          [{ list: 'ordered' }, { list: 'bullet' }],
          [{ indent: '-1' }, { indent: '+1' }],
          [{ size: ['small', false, 'large', 'huge'] }],
          [{ color: [] }, { background: [] }],
        ],
      },
    }),
    MatCheckboxModule,
  ],
  providers: [],
  bootstrap: [AppComponent],
})
export class AppModule {}
