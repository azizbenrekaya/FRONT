import { Injectable } from '@angular/core';
import {Observable} from 'rxjs';
import {HttpClient, HttpHeaders} from '@angular/common/http';

@Injectable({
  providedIn: 'root'
})
export class AuthentificationService {
  public host = '/api/user';
  constructor(private http: HttpClient) { }
  httpOptions = {
    headers: new HttpHeaders({ 'Content-Type': 'application/json' })


}
logIn(email: string, password: string): Observable<any> {

  return this.http.post(this.host + '/login' , {
    email,
    password
  }, this.httpOptions );

}
Register(nom: string,prenom:string,email:string, password: string): Observable<any> {

  return this.http.post(this.host + '/register' , {
    nom,prenom,
    email,
    password
  }, this.httpOptions );

}
 
}
