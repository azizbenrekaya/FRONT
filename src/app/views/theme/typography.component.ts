import { Component,OnInit } from '@angular/core';
import {DeviceService} from "../../Services/device.service";
import { DatePipe } from '@angular/common';
import { StationService } from "../../Services/station.service";
import * as Mapboxgl from 'mapbox-gl';
@Component({
  templateUrl: 'typography.component.html'
})
export class TypographyComponent implements OnInit {
 alldev = []
 allsites = []
 latestinfo =[]
 mapboxx:  Mapboxgl.Map;
 show = true;
  constructor(public devService: DeviceService,private datePipe : DatePipe,private stationservice: StationService) { }
  ngOnInit() { 
    this.devService.get_all().subscribe(data => {
      this.alldev = data;
        console.log(this.alldev)
     
    });
    this.devService.get_latestinfo().subscribe(data => {
      this.latestinfo = data;
      
        console.log(this.latestinfo)
     
    });
    this.stationservice.get_stations().subscribe(data => {
      this.allsites = data;
        
    }); 
    //
    (Mapboxgl as any).accessToken = 'pk.eyJ1IjoiYXppemJlbnJla2F5YSIsImEiOiJja24zbXBncmExZnUzMnBxdWkzdDRwbnlsIn0.845vZZjC-1vASHA1sS70wg';

    if (Mapboxgl.getRTLTextPluginStatus() !== 'loaded') {
      Mapboxgl.setRTLTextPlugin(
        'https://api.mapbox.com/mapbox-gl-js/plugins/mapbox-gl-rtl-text/v0.2.3/mapbox-gl-rtl-text.js',
        null,
         // Lazy load the plugin
      );
    }

    this.mapboxx = new Mapboxgl.Map({
      container: 'map-mapboxxxxxxx',
      style: 'mapbox://styles/mapbox/streets-v11',
      zoom: 7,
      center: [ 10.318202618273972 , 36.83471008898373 ],
      language:"fr-FR"
    });

    //

  }
  marker2(a: number , b: number ) { 
    
   
      
      // this.humidity = data.humidity;
      // this.description = data.description;
      var el = document.createElement('div');
      el.className = 'marker';
  
      const marker = new Mapboxgl.Marker(el).setLngLat([b,a])
        .addTo(this.mapboxx);
    
     
     
     
   
  }

  delete(x:string){
    this.devService.delete(x).subscribe(data => {
     
    });
    alert('Device deleted ');
    this.ngOnInit()
  }
  transform(x:Date){
    let date2 = this.datePipe.transform(x, 'dd-MM-YYYY');
    return date2
  }

  Sitename(i:number)
  {
    let x;
    this.allsites.forEach(element => 
    {
      
      if (element.Sensor_ids[0] === i){x = element.name}
      
    });
  return x
  
  }
  hidemap()
  {
    this.show = true
    this.mapboxx = new Mapboxgl.Map({
      container: 'map-mapboxxxxxxx',
      style: 'mapbox://styles/mapbox/streets-v11',
      zoom: 7,
      center: [ 10.318202618273972 , 36.83471008898373 ],
      language:"fr-FR"
    });
    
  }
  MarkCite(i:number)
  {
    this.show = false
    let x;
    this.allsites.forEach(element => 
    {
      
      if (element.Sensor_ids[0] === i)
      {
        this.marker2(element.lattitude,element.longitude)

      }
      
    });
    
  return x
  

  }
  batterielvl(id:number){
    let x;
    
    for (let i = 0 ; i<this.latestinfo.length;i++)
    {
     
      
      if (this.latestinfo[i]._id === id && this.latestinfo[i].data != '' ) 
      {
        x = this.latestinfo[i].data[0].batterie
        // x = d.batterie
      }
     
    }
    console.log(x)
    return(x)
  }
  latestdata(id:number){
    let finalS;
    let x; let y ; let z
    
    for (let i = 0 ; i<this.latestinfo.length;i++)
    {
     
      
      if (this.latestinfo[i]._id === id && this.latestinfo[i].data != '' ) 
      {
        z = (this.latestinfo[i].data[0].time).substring(0,10)
        x = this.latestinfo[i].data[0].temperature
        y = this.latestinfo[i].data[0].humidite
      }
     
    }
    let html : string =  `Date:`+z+`<br>`+`Temperature:`+x+`<br>`;
    finalS = 'Date:' +' ' +z+' '+' '+ ' ' +"       Temperature : "+x+"°    Humidite : " + y+"%"
    return(finalS)
  }
}
