import { HttpClient } from '@angular/common/http';
import { Injectable } from '@angular/core';
import { Observable } from 'rxjs';
import { baseUrl } from '../apiRoot/baseUrl';

@Injectable({
  providedIn: 'root'
})
export class ProductService {

  constructor(private __httpClient: HttpClient) { }

  allProduct(): Observable<any> {
    return this.__httpClient.get(`${baseUrl}/get`)

  }
}
