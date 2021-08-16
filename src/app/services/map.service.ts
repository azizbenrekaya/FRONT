import { Injectable } from '@angular/core';
import {Observable} from 'rxjs';
import {HttpClient, HttpHeaders} from '@angular/common/http';
import {Cites} from '../models/cites';
@Injectable({
  providedIn: 'root'
})
export class MapService 

{
  
  public host = '/api/cite';
  httpOptions =
   {
    headers: new HttpHeaders({ 'Content-Type': 'application/json' })
   }
 
  constructor(private http: HttpClient) {}

  add_cite( area: string,description:string,lattitude:number,longitude:number): Observable<any> {

    return this.http.post(this.host + '/addcite' , {
      area,description,lattitude,longitude
    }, this.httpOptions );
  
  }
  delete(id:string): Observable<any> 
  {

  return this.http.post(this.host + '/delete' , {id}, this.httpOptions );

  }
  update_cite(_id : string ,area: string,description:string,lattitude:number,longitude:number): Observable<any> {

    return this.http.post(this.host + '/update' , {
      _id,area,description,lattitude,longitude
    }, this.httpOptions );
  
  }
  get_Cites()
   {
    return this.http.get<Cites[]>(this.host + '/getallcites');
  }
  getdataperstation(lattitude:number,longitude:number): Observable<any> 
  {

  return this.http.post(this.host + '/getalldata' , {lattitude,longitude}, this.httpOptions );

  }

  getcurrent(lattitude:number,longitude:number): Observable<any> 
  {

  return this.http.post(this.host + '/getcurrent' , {lattitude,longitude}, this.httpOptions );

  }

}
