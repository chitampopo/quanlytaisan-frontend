import { HttpClient } from '@angular/common/http';
import { Injectable } from '@angular/core';
import { Observable } from 'rxjs';
import { BatDongSan } from './bat-dong-san/bat-dong-san.component';

@Injectable({
  providedIn: 'root'
})
export class BatDongSanService {

  constructor(private http: HttpClient) { }

  getAllBatDongSan(): Observable<BatDongSan[]> {
    return this.http.get<BatDongSan[]>('/api/bat-dong-san/all');
  }

  getBatDongSan(id: string): Observable<BatDongSan> {
    return this.http.get<BatDongSan>(`/api/bat-dong-san/${id}`);
  }

  updateBatDongSan(bds: BatDongSan): Observable<BatDongSan> {
    return this.http.post<BatDongSan>('/api/bat-dong-san', bds);
  }
}
