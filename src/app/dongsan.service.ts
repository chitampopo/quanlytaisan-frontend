import { HttpClient } from '@angular/common/http';
import { Injectable } from '@angular/core';
import { Observable, of } from 'rxjs';
import { DongSan } from './dong-san/dong-san.component';

@Injectable({
  providedIn: 'root'
})
export class DongSanService {

  constructor(private http: HttpClient) { }

  getAllDongSan(): Observable<DongSan[]> {
    return this.http.get<DongSan[]>('/api/dong-san/all');
  }

  getDongSan(id: number): Observable<DongSan> {
    return this.http.get<DongSan>(`/api/dong-san/${id}`);
  }
}
