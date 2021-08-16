import { Injectable } from '@angular/core';
import {Observable} from 'rxjs';
import {HttpClient, HttpHeaders} from '@angular/common/http';


@Injectable({
  providedIn: 'root'
})
export class DeviceService {
  public host = '/api/sensor';
  constructor(private http: HttpClient) { }
  httpOptions = {
    headers: new HttpHeaders({ 'Content-Type': 'application/json' })


}
add_sensor(LocationId: string,SensorId:string,SensorName:string,Description:string,SensorLattitude:number,SensorLongitude:number): Observable<any>
{

  return this.http.post(this.host + '/Add' , {LocationId,SensorId,SensorName,Description,SensorLattitude,SensorLongitude}
  , this.httpOptions );

}
getdataperstation(id:string,date:string): Observable<any> 
{

  return this.http.post(this.host + '/getdataperstation' , {id,date}, this.httpOptions );

}
delete(id:string): Observable<any> 
{

  return this.http.post(this.host + '/delete' , {id}, this.httpOptions );

}

find_sensor(Sensorid:string): Observable<any>
{
  return this.http.post( this.host + '/find', {Sensorid} , this.httpOptions );
}
get_all()
{
 return this.http.get<any[]>(this.host + '/getall');
}
get_latestinfo()
{
 return this.http.get<any[]>(this.host + '/getlatestdata');
}
addrule(_id:string,Type:string,Tmax:string,Tmin:string): Observable<any> 
{
  return this.http.post(this.host + '/updatesensor' , {_id,Type,Tmax,Tmin}, this.httpOptions );
}
get_sensorswithrules()
{
 return this.http.get<any[]>(this.host + '/sensorswithrules');
}


}
