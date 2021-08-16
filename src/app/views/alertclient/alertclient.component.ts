import { Component, OnInit } from '@angular/core';
import {FormControl, FormGroup, Validators,ReactiveFormsModule} from '@angular/forms';
import {DeviceService} from "../../Services/device.service";

@Component({
  selector: 'app-alertclient',
  templateUrl: './alertclient.component.html',
  styleUrls: ['./alertclient.component.scss']
})
export class AlertclientComponent implements OnInit {
  alldev = []
  factors = []
  selectedid
  sensorswithrules=[]
  private Ruleform = new FormGroup({
    idsensor:  new FormControl('', [Validators.required]),
    Type: new FormControl('', [Validators.required]),
    Tmax: new FormControl('', [Validators.required]),
    Tmin: new FormControl('', [Validators.required])


  });
  constructor(public devService: DeviceService) { }

  ngOnInit(): void {
    this.devService.get_all().subscribe(data => {
      this.alldev = data;
        console.log(this.alldev)
     
    });
    this.devService.get_sensorswithrules().subscribe(data => { 
      this.sensorswithrules = data
      console.log(this.sensorswithrules)
    })
  }

  fillfactors(i,x){
    this.selectedid = x
    console.log(this.selectedid)
    this.factors = []
    if(i === "CCCCCCCCCCCCCCCC") {
     this.factors.push('Temperature') ;this.factors.push('Humidity')
    }
    if(i === "2417BAC2CB0180F2"){
      this.factors.push('CO') ; this.factors.push('CO2') ;   this.factors.push('O2')
      this.factors.push('CH4') ; this.factors.push('Temperature') ; this.factors.push('Humidity');
      this.factors.push('Pressure')
     }
     if(i === "0004A30B00EF427C"){
      this.factors.push('O3') ;this.factors.push('NO2') ; this.factors.push('NO');
      this.factors.push('Temperature') ;  this.factors.push('Humidity'); this.factors.push('Pressure');
     }

  }

  addRule(){
    this.devService.addrule(this.selectedid,
      this.Ruleform.value['Type'],this.Ruleform.value['Tmax'],this.Ruleform.value['Tmin']
    ).subscribe(data =>  {console.log("done")});

    console.log("BOOM")
    alert('Rule added! ');
    window.location.reload();
    this.ngOnInit();
    
  }


}
