import { Component, OnInit } from '@angular/core';
import { MapService } from "../../Services/map.service";
import { CommonModule } from '@angular/common';
import MapboxGeocoder from '@mapbox/mapbox-gl-geocoder';
import MapboxLanguage from '@mapbox/mapbox-gl-language';
import {FormsModule, ReactiveFormsModule,FormControl, FormGroup,Validators} from '@angular/forms'
import * as Mapboxgl from 'mapbox-gl';
@Component({
  
  templateUrl: './station.component.html',
  styleUrls: ['./station.component.scss']
})
export class StationComponent implements OnInit {
  allsites =[];
  selectedid :string;
  mapboxx:  Mapboxgl.Map;
  mapboxx2:  Mapboxgl.Map;
  private Latt = 0;
  private Lngg = 0;
  selectedSite = {}
  showbool = true
  updatebool = false
  show = true;
  constructor(private mapservice: MapService) { }
  siteform = new FormGroup({
    sitename: new FormControl('', [Validators.required]),
    description : new FormControl('', [Validators.required]),
    lattitude: new FormControl('', [Validators.required]),
    longitude: new FormControl('', [Validators.required]),
   

  });
  ngOnInit() {
    //
    (Mapboxgl as any).accessToken = 'pk.eyJ1IjoiYXppemJlbnJla2F5YSIsImEiOiJja24zbXBncmExZnUzMnBxdWkzdDRwbnlsIn0.845vZZjC-1vASHA1sS70wg';

    if (Mapboxgl.getRTLTextPluginStatus() !== 'loaded') {
      Mapboxgl.setRTLTextPlugin(
        'https://api.mapbox.com/mapbox-gl-js/plugins/mapbox-gl-rtl-text/v0.2.3/mapbox-gl-rtl-text.js',
        null,
         // Lazy load the plugin
      );
    }
    this.mapboxx2 = new Mapboxgl.Map({
      container: 'map-mapboxxxxxxx2',
      style: 'mapbox://styles/mapbox/streets-v11',
      zoom: 7,
      center: [9.8480112, 37.3574074],
      language:"fr-FR"
    });
    this.mapboxx = new Mapboxgl.Map({
      container: 'map-mapboxxxxxxx',
      style: 'mapbox://styles/mapbox/streets-v11',
      zoom: 7,
      center: [9.8480112, 37.3574074],
      language:"fr-FR"
    });
    //
    const geocoder = new MapboxGeocoder({
      countries: 'TN',
      language:"fr-FR",
      accessToken: 'pk.eyJ1IjoiYXppemJlbnJla2F5YSIsImEiOiJja24zbXBncmExZnUzMnBxdWkzdDRwbnlsIn0.845vZZjC-1vASHA1sS70wg',
      mapboxgl: Mapboxgl, // Set the mapbox-gl instance
      marker: {
        color: 'orange'
        }, // Do not use the default marker style
    });
    
    this.mapboxx.addControl(geocoder);
    const nav = new Mapboxgl.NavigationControl();
    this.mapboxx.addControl(nav);
    this.mapboxx.addControl(
      new Mapboxgl.GeolocateControl({
        positionOptions: {
          enableHighAccuracy: true
        },
        trackUserLocation: true
      })
    );
  
    const popup = new Mapboxgl.Popup();
    if(this.selectedSite != null)
    popup.setLngLat([9.8480112 , 37.3574074 ]).setHTML('<div><h6 style="color: red"> Update Site Location </h6></div>'
  
    )
    .addTo(this.mapboxx);
    this.marker(9.8480112 , 37.3574074 );

    //
    this.mapservice.get_Cites().subscribe(data => {
      this.allsites = data;
        console.log(this.allsites)
    });
  }



  hidemap()
  {
    this.show = true
    this.mapboxx2 = new Mapboxgl.Map({
      container: 'map-mapboxxxxxxx2',
      style: 'mapbox://styles/mapbox/streets-v11',
      zoom: 7,
      center: [ 10.318202618273972 , 36.83471008898373 ],
      language:"fr-FR"
    });
    
  }

  marker2(a: number , b: number ) { 
    this.mapboxx2 = new Mapboxgl.Map({
      container: 'map-mapboxxxxxxx2',
      style: 'mapbox://styles/mapbox/streets-v11',
      zoom: 7,
      center: [9.8480112, 37.3574074],
      language:"fr-FR"
    });
    this.show = false
      
    // this.humidity = data.humidity;
    // this.description = data.description;
    var el = document.createElement('div');
    el.className = 'marker';

    const marker = new Mapboxgl.Marker(el).setLngLat([b,a])
      .addTo(this.mapboxx2);
  
   
   
   
 
}

  marker(a: number , b: number) {
    const marker = new Mapboxgl.Marker(
      {
        color: 'red',
        draggable: true,
      }).setLngLat([a, b])
      .addTo(this.mapboxx);
    marker.on('drag', () => {
      
      this.Lngg = marker.getLngLat().lng;
      this.Latt = marker.getLngLat().lat;
      console.log(this.Lngg)
      console.log(this.Latt)
    })
  }

  SiteSelection(i:{},d : string){
    this.selectedSite = i
    this.selectedid = d
    console.log(this.selectedSite)
    console.log("////////////////////////")
    console.log(this.selectedid)
    this.showbool = false
    this.updatebool = true
  }
  Turnback(){
    this.showbool = true
    this.updatebool = false
  }

  siteupdate() {
    this.siteform.controls['longitude'].setValue(this.Lngg)
    this.siteform.controls['lattitude'].setValue(this.Latt)
    console.log(this.selectedid)
    this.mapservice.update_cite(this.selectedid,this.siteform.value['sitename'],this.siteform.value['description'],this.siteform.controls['lattitude'].value,this.siteform.controls['longitude'].value)
    .subscribe(data =>  {console.log(data) ; });
    this.showbool = true
    this.updatebool = false
    alert("Update Done !")
    this.ngOnInit();
  
   
  }
  delete(id:string) {
    this.mapservice.delete(id)
    .subscribe(data =>  {console.log("done") ; });
    alert("Site Deleted !")
    this.ngOnInit();

  }
}
