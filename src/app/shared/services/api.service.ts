import { HttpClient, HttpParams } from '@angular/common/http';
import { Injectable } from '@angular/core';
import { map, Observable } from 'rxjs';
import { ComboResultBase } from '../models/base-requests';

@Injectable({ providedIn: 'root' })
export class ApiService {
  private readonly baseUrl = 'https://localhost:5001/api';

  constructor(private http: HttpClient) {}

  get<TResponse>(path: string, query?: any): Observable<TResponse> {
    let params = new HttpParams();
    if (query) {
      Object.keys(query).forEach((key) => {
        if (query[key] !== null && query[key] !== undefined) {
          params = params.append(key, query[key].toString());
        }
      });
    }
    return this.http.get<TResponse>(`${this.baseUrl}/${path}`, { params });
  }

  post<TRequest, TResult>(path: string, body: TRequest): Observable<TResult> {
    return this.http.post<TResult>(`${this.baseUrl}/${path}`, body);
  }

  put<TRequest, TResult>(path: string, body: TRequest): Observable<TResult> {
    return this.http.put<TResult>(`${this.baseUrl}/${path}`, body);
  }

  delete<TResult>(path: string, id: string): Observable<TResult> {
    return this.http.delete<TResult>(`${this.baseUrl}/${path}/${id}`);
  }

  getCombo(endpoint: string, query?: any): Observable<ComboResultBase[]> {
    let params = new HttpParams();

    if (query) {
      Object.keys(query).forEach((key) => {
        const value = query[key];
        if (value !== null && value !== undefined) {
          params = params.set(key, value.toString());
        }
      });
    }

    return this.http
      .get<any>(`${this.baseUrl}/${endpoint}/combo`, { params })
      .pipe(map((res) => res.data));
  }
}
