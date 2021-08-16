import { Component,NgModule } from '@angular/core';
import { FormsModule } from '@angular/forms'; 
import { CommonModule } from '@angular/common';
import { BrowserModule } from '@angular/platform-browser';
import { MapService } from "../../Services/map.service";
import {FormControl, FormGroup, Validators,ReactiveFormsModule} from '@angular/forms';
import MapboxGeocoder from '@mapbox/mapbox-gl-geocoder';
import MapboxLanguage from '@mapbox/mapbox-gl-language';
import * as Mapboxgl from 'mapbox-gl';
import {Router} from "@angular/router";
@Component({
  templateUrl: 'chartjs.component.html'
})
export class ChartJSComponent {

  showarea = true ;
  Latt : number;
  Lngg : number;

   public language = new MapboxLanguage({
    defaultLanguage: 'fr'
  });

  mapboxx:  Mapboxgl.Map;

  //IdLigneSelected: number;
 // IdAreaSelected: number;
 // Lignedata = [];

  
  data = [];
  areaForm1 = new FormGroup({
    area: new FormControl('', [Validators.required]),
    description: new FormControl('', [Validators.required]),
    longitude: new FormControl('', [Validators.required]),
    lattitude: new FormControl('', [Validators.required]),


  });

  get area() {
    return this.areaForm1.get('area');
  }

  get description() {
    return this.areaForm1.get('description');
  }
  get longitude() {
    return this.areaForm1.get('longitude');
  } get lattitude() {
    return this.areaForm1.get('lattitude');
  }
  constructor(private mapservice: MapService,private router: Router) { }

  ngOnInit() {
    
    (Mapboxgl as any).accessToken = 'pk.eyJ1IjoiYXppemJlbnJla2F5YSIsImEiOiJja241dWwwZzEwN3Z6MnBwOWE2NWk5bnRlIn0.lGJe0Pu72xseHQjXh-6_Gg';

    if (Mapboxgl.getRTLTextPluginStatus() !== 'loaded') {
      Mapboxgl.setRTLTextPlugin(
        'https://api.mapbox.com/mapbox-gl-js/plugins/mapbox-gl-rtl-text/v0.2.3/mapbox-gl-rtl-text.js',
        null,
        true // Lazy load the plugin
      );
    }

    this.mapboxx = new Mapboxgl.Map({
      container: 'map-mapboxxxxxxx',
      style: 'mapbox://styles/mapbox/streets-v11',
      zoom: 7,
      center: [9.8480112, 37.3574074],
      language:"fr-FR"
    });
  


    const geocoder = new MapboxGeocoder({
      countries: 'TN',
      language:"fr-FR",
      accessToken: 'pk.eyJ1IjoiYXppemJlbnJla2F5YSIsImEiOiJja241dWwwZzEwN3Z6MnBwOWE2NWk5bnRlIn0.lGJe0Pu72xseHQjXh-6_Gg',
      mapboxgl: Mapboxgl, // Set the mapbox-gl instance
      marker: {
        color: 'orange'
        }, // Do not use the default marker style
    });
    this.mapboxx.addControl(this.language);
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
    popup.setLngLat([9.8480112 , 37.3574074 ]).setHTML('<div><h6 style="color: red"> Choose your Location </h6></div>'
  
    )
    .addTo(this.mapboxx);
    this.marker(9.8480112 , 37.3574074 );


    this.mapservice.get_Cites().subscribe(data => {
      this.data = data;
      for ( let i = 0; i < data.length ; i++)
      {
        this.marker2( data[i].longitude, data[i].lattitude,data[i].area,data[i].description) 
      }
          
      console.log(this.data)
    });

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



   marker2(a: number , b: number , c: string,d:string) { 

    const popup = new Mapboxgl.Popup({ className: 'apple-popup' })
      .setHTML('<h4 > Ref : ' + c + "<br> <br> " + "Description:  "+d  + '</h4></div>');
    const marker = new Mapboxgl.Marker(
      {
        color: 'green',
        draggable: false,
      }).setLngLat([a, b])
      .addTo(this.mapboxx);
    marker.getElement().addEventListener('click', function() {
     marker.setPopup(popup);
    });
  }



  /*  add() {
    
    const popup = new Mapboxgl.Popup();
    popup.setLngLat([this.Lngg , this.Latt ])
    .setHTML('<div><h6 style="color: red"> Choose your Location </h6></div></form>'
    
    )
    .addTo(this.mapboxx);
    this.marker(this.Lngg , this.Latt);
    this.mapboxx.flyTo(
      {
        zoom: 9,
        center: [
          this.Lngg ,
          this.Latt
        ],
        essential: true // this animation is considered essential with respect to prefers-reduced-motion
      }
    );

  } */




  addCite() {
    this.areaForm1.controls['longitude'].setValue(this.Lngg)
    this.areaForm1.controls['lattitude'].setValue(this.Latt)
    console.log("/////////////////////////////////")
    console.log(this.areaForm1.value['longitude'])
    console.log(this.areaForm1.value['lattitude'])
    this.mapservice.add_cite(this.areaForm1.value['area'],this.areaForm1.value['description'],this.areaForm1.controls['lattitude'].value,this.areaForm1.controls['longitude'].value).subscribe(data =>  {console.log(data) ; this.showarea = true ;});
 
    console.log("BOOM")
    
    this.ngOnInit();
   
  }



  
  showform(){
    this.showarea= false;
  }


}
