import { Component } from '@angular/core';
import {FormControl, FormGroup, Validators,ReactiveFormsModule} from '@angular/forms';
import { MapService } from "../../Services/map.service";
import {NgbModal, ModalDismissReasons} from '@ng-bootstrap/ng-bootstrap';
import { StationService } from "../../Services/station.service";
import MapboxGeocoder from '@mapbox/mapbox-gl-geocoder';
import MapboxLanguage from '@mapbox/mapbox-gl-language';
import * as Mapboxgl from 'mapbox-gl';
@Component({
  templateUrl: 'buttons.component.html'
})
export class ButtonsComponent {
  private getDismissReason(reason: any): string {
    if (reason === ModalDismissReasons.ESC) {
      return 'by pressing ESC';
    } else if (reason === ModalDismissReasons.BACKDROP_CLICK) {
      return 'by clicking on a backdrop';
    } else {
      return `with: ${reason}`;
    }
  }

  
  selectedSite : number;
  sitesdata = []; stationsdata=[]; closeResult = '';
  private stationform = new FormGroup({
    name: new FormControl('', [Validators.required]),
    localisation: new FormControl('', [Validators.required]),
    site: new FormControl('', [Validators.required])


  });
  constructor(private mapservice: MapService,private modalService: NgbModal,private stationservice: StationService) { }
  ngOnInit() {

    
    this.mapservice.get_Cites().subscribe(data => {
      this.sitesdata = data;
        console.log(this.sitesdata)
    });

    this.stationservice.get_stations().subscribe(data => {
      this.stationsdata = data;
        console.log(this.stationsdata)
    });
   }
   open(content) {
    this.modalService.open(content, {ariaLabelledBy: 'modal-basic-title'}).result.then((result) => {
      this.closeResult = `Closed with: ${result}`;
    }, (reason) => {
      this.closeResult = `Dismissed ${this.getDismissReason(reason)}`;
    });
  } 
  onchange(i:number){
    this.selectedSite = i;
    console.log(this.selectedSite)

  }
  delete(x:string){
    this.stationservice.delete(x).subscribe(data => {
     
    });
    alert('Station deleted ');
    this.ngOnInit()
  }

  addStation() {

    this.stationservice.add_station(this.stationform.value['name'],this.stationform.value['localisation'],this.selectedSite).subscribe(data =>  {console.log(data) ; console.log(this.selectedSite) });

    console.log("BOOM")
    alert('Station added! ');
    window.location.reload();
    this.ngOnInit();
    
   
  }

  Sitename(i:number)
  {
    let x;
    this.sitesdata.forEach(element => 
    {
      
      if (element._id === i){x = element.area}
      
    });
  return x
  
  }
   
}
