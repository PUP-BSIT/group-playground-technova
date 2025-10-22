import { Injectable } from '@angular/core';
import { HttpClient } from '@angular/common/http';
import { Observable } from 'rxjs';

@Injectable({ providedIn: 'root' })
export class ProfileService {
  private apiUrl = 'http://localhost:8080/api/users';

  constructor(private http: HttpClient) {}

  getProfile(userId: number): Observable<any> {
    return this.http.get(`${this.apiUrl}/${userId}`);
  }

  updateProfile(userId: number, data: any): Observable<any> {
    return this.http.put(`${this.apiUrl}/${userId}`, data);
  }

}

