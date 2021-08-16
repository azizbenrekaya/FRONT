import { Component, Inject, ElementRef,OnInit,TemplateRef,NgModule ,AfterViewInit,ViewChild} from '@angular/core';
import { DOCUMENT } from '@angular/common';
import { getStyle, rgbToHex } from '@coreui/coreui/dist/js/coreui-utilities';
import {NgbModal, ModalDismissReasons} from '@ng-bootstrap/ng-bootstrap';
import {DeviceService} from "../../Services/device.service";
import {Router} from "@angular/router";
import {FormsModule, ReactiveFormsModule,FormControl, FormGroup,Validators} from '@angular/forms'
import { NgForm }   from '@angular/forms';

import { StationService } from "../../Services/station.service";
import { CommonModule } from '@angular/common';

import { BrowserModule } from '@angular/platform-browser';
import { MapService } from "../../Services/map.service";

import MapboxGeocoder from '@mapbox/mapbox-gl-geocoder';
import MapboxLanguage from '@mapbox/mapbox-gl-language';
import * as Mapboxgl from 'mapbox-gl';

@Component({
  templateUrl: 'colors.component.html'
})
export class ColorsComponent implements OnInit {

  constructor(@Inject(DOCUMENT) private _document: any,private mapservice: MapService, private modalService: NgbModal,public devService: DeviceService, private stationservice: StationService, private router: Router) {}
 
  findform = new FormGroup({
    sensname: new FormControl('', [Validators.required])
  })

  sensorform = new FormGroup({
    sensorname: new FormControl('', [Validators.required]),
    locationId : new FormControl('', [Validators.required]),
    description: new FormControl('', [Validators.required]),
    longitude: new FormControl('', [Validators.required]),
    lattitude: new FormControl('', [Validators.required]),
    site: new FormControl('', [Validators.required])

  });
  verif = false ;
  Sensorfound : {};
  
  SensorId : string;
  LocationId:string;
  selectedSite : string; stationsdata=[];
  sitesdata = [];
  private Latt = 0;
  private Lngg = 0;
  
   public language = new MapboxLanguage({
    defaultLanguage: 'fr'
  });
  
  mapboxx:  Mapboxgl.Map;
  closeResult = '';


  
  @ViewChild('input1', {static: false}) inputEl: ElementRef;
   ngAfterViewInit() {
    setTimeout(() => this.inputEl.nativeElement.focus(), 0);
    }
  ngOnInit() {
     
    
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
      center: [9.8480112, 37.3574074],
      language:"fr-FR"
    });
    /////
    this.mapservice.get_Cites().subscribe(data => {
      this.sitesdata = data;
        console.log(this.sitesdata)
    });
    this.stationservice.get_stations().subscribe(data => {
      this.stationsdata = data;
        console.log(this.stationsdata)
    });
    
  
      //////////
    const geocoder = new MapboxGeocoder({
      countries: 'TN',
      language:"fr-FR",
      accessToken: 'pk.eyJ1IjoiYXppemJlbnJla2F5YSIsImEiOiJja24zbXBncmExZnUzMnBxdWkzdDRwbnlsIn0.845vZZjC-1vASHA1sS70wg',
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


  }

  findsensor(){
    this.devService.find_sensor(this.findform.value['sensname']).subscribe(data => {
      this.Sensorfound = data;
        console.log(this.Sensorfound)
        this.SensorId = data.SensorFoundId
        if(data.status != "err") {
          this.verif = true;
          alert("sensor found !")
        }
       
        else
        alert("this sensor is already in use !")
        console.log(this.verif)
        console.log(this.SensorId)
    });
  }



  onchange(i:string){
    this.LocationId = i;
    console.log(this.LocationId)
    this.sensorform.controls['locationId'].setValue(i)

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
  sensorupdate() {
    this.sensorform.controls['longitude'].setValue(this.Lngg)
    this.sensorform.controls['lattitude'].setValue(this.Latt)
    
    console.log(this.selectedSite)
      console.log(this.SensorId)
        console.log(this.sensorform.value['sensorname'])
        console.log(this.sensorform.value['description'])
        console.log(this.sensorform.value['longitude'])
        console.log(this.sensorform.value['lattitude'])
    this.devService.add_sensor(this.sensorform.value['locationId'],this.SensorId,this.sensorform.value['sensorname'],this.sensorform.value['description'],this.sensorform.value['longitude'],this.sensorform.value['lattitude'])
    .subscribe(data =>  {console.log(data) ; });
    console.log(this.Lngg);
    console.log(this.Latt);
    console.log("BOOM")
    this.verif = false
    alert("New sensor added !")
    this.ngOnInit();
   
  }
 

  
}
