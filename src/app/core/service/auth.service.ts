import { HttpClient } from '@angular/common/http';
import { Injectable } from '@angular/core';
import { Observable } from 'rxjs';
import { baseUrl } from '../apiRoot/baseUrl';
import { IRegister } from '../interfaces/iregister';
import { ILogin } from '../interfaces/ilogin';

@Injectable({
  providedIn: 'root'
})
export class AuthService {

  constructor(private _HttpClient:HttpClient) { }


register(registerData:IRegister):Observable<any>{
  return this._HttpClient.post(`${baseUrl}/api/users`,registerData)
}

login(loginUser:ILogin):Observable<any>{
  return this._HttpClient.post(`${baseUrl}/api/users/auth`,loginUser)
}

}
