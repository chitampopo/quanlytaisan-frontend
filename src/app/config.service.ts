import { HttpClient } from '@angular/common/http';
import { Injectable } from '@angular/core';
import { Observable } from 'rxjs';

export class SortItem {
  id: string;
}
export class SortResult {
  homepage: SortItem[];
  full: SortItem[];
  hidden: SortItem[];
}

export interface ServerConfig {
  id: string;
  key: string;
  value: string;
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

  getAllConfigs(): Observable<ServerConfig[]> {
    return this.http.get<ServerConfig[]>('/api/configs');
  }
}
