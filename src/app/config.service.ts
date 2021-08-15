import { HttpClient } from '@angular/common/http';
import { Injectable } from '@angular/core';
import { Observable } from 'rxjs';

export class SortItem {
  id: number;
}
export class SortResult {
  homepage: SortItem[];
  full: SortItem[];
  hidden: SortItem[];
}

@Injectable({
  providedIn: 'root',
})
export class ConfigService {
  constructor(private http: HttpClient) {}

  getSortBatDongSan(): Observable<SortResult> {
    return this.http.get<SortResult>('/api/configs/sap-xep-bds');
  }

  getSortDongSan(): Observable<SortResult> {
    return this.http.get<SortResult>('/api/configs/sap-xep-ds');
  }

  updateSort(type: string, key: string, data: SortItem[]): Observable<void> {
    const body = { data };
    return this.http.put<void>(`/api/configs/update-sort/${type}/${key}`, body);
  }
}
