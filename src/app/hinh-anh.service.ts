import { HttpClient, HttpParams } from '@angular/common/http';
import { Injectable } from '@angular/core';
import { Observable } from 'rxjs';

@Injectable({
  providedIn: 'root'
})
export class HinhAnhService {

  constructor(private http: HttpClient) { }

  cleanFolder(folder: string, id: number): Observable<void> {
    let params = new HttpParams().set('folder', folder).set('id', id);
    return this.http.delete<void>(`/api/images/clean-folder`, { params });
  }

  uploadHinhAnhKhac(file: File, folder: string, id: number): Observable<void> {
    let params = new HttpParams().set('folder', folder).set('id', id);
    let body = new FormData();
    body.append("file", file);

    return this.http.post<void>(`/api/images/upload-others`, body, { params });
  }

  uploadHinhAnhDaiDien(file: File, folder: string, id: number): Observable<void> {
    let params = new HttpParams().set('folder', folder).set('id', id);
    let body = new FormData();
    body.append("file", file);

    return this.http.post<void>(`/api/images/upload`, body, { params });
  }
}
