import { Injectable } from '@angular/core';
import {Observable} from 'rxjs';
import {HttpClient, HttpHeaders} from '@angular/common/http';
import {Station} from '../models/station';
@Injectable({
  providedIn: 'root'
})
export class StationService {

  public host = '/api/station';
  constructor(private http: HttpClient) { }
  httpOptions = {
    headers: new HttpHeaders({ 'Content-Type': 'application/json' })


}




get_stations() {
  return this.http.get<Station[]>(this.host + '/getallstations');
}
add_station(name:string,localisation:string,cite:number): Observable<any> {

  return this.http.post(this.host + '/addstation' , {
    name,localisation,cite
  }, this.httpOptions );

}
delete(id:string): Observable<any> 
{

  return this.http.post(this.host + '/delete' , {id}, this.httpOptions );

}

}
