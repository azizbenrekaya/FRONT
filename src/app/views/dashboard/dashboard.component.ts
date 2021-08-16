import { Component, OnInit,Inject } from '@angular/core';
import { getStyle, hexToRgba } from '@coreui/coreui/dist/js/coreui-utilities';
import { CustomTooltips } from '@coreui/coreui-plugin-chartjs-custom-tooltips';
import { StationService } from "../../Services/station.service";
import { MapService } from "../../Services/map.service";
import { DeviceService } from "../../Services/device.service";
import { BsDatepickerModule } from 'ngx-bootstrap/datepicker';
import {FormControl, FormGroup, Validators,ReactiveFormsModule} from '@angular/forms';
import MapboxGeocoder from '@mapbox/mapbox-gl-geocoder';
import MapboxLanguage from '@mapbox/mapbox-gl-language';
import { CarouselConfig } from 'ngx-bootstrap/carousel';
import * as Mapboxgl from 'mapbox-gl';


import { DatePipe } from '@angular/common';
@Component({
  templateUrl: 'dashboard.component.html'
})
export class DashboardComponent implements OnInit {

  radioModel: string = 'Month';
  constructor( private mapservice: MapService,private datePipe : DatePipe,private stationservice: StationService, private deviceservice : DeviceService) {}


  public mainChartElements :number;
  public mainChartData1: Array<number> = [];
  public mainChartData2: Array<number> = [];

  


  
  public previsionChartLabels: Array<number> = [];
  public previsionChartElement:number;
  public  previsionChartData: Array<any> = [];
  public previsionchartOptions: any = {
    tooltips: {
      enabled: false,
      custom: CustomTooltips,
      intersect: true,
      mode: 'index',
      position: 'nearest',
      callbacks: {
        labelColor: function(tooltipItem, chart) {
          return { backgroundColor: chart.data.datasets[tooltipItem.datasetIndex].borderColor };
        }
      }
    },
    options: {
      scaleShowValues: true,
      scales: {
        yAxes: [{
          ticks: {
            beginAtZero: true
          }
        }],
        xAxes: [{
          ticks: {
            autoSkip: false
          }
        }]
      }
    }
  };
  
  public mainChartData: Array<any> = [];
  public mainChartLabels: Array<string> = [];
  public mainChartOptions: any = {
    tooltips: {
      enabled: false,
      custom: CustomTooltips,
      intersect: true,
      mode: 'index',
      position: 'nearest',
      callbacks: {
        labelColor: function(tooltipItem, chart) {
          return { backgroundColor: chart.data.datasets[tooltipItem.datasetIndex].borderColor };
        }
      }
    },
  options: {
    scaleShowValues: true,
    scales: {
      yAxes: [{
        ticks: {
          beginAtZero: true
        }
      }],
      xAxes: [{
        ticks: {
          autoSkip: false
        }
      }]
    }
  }
   };
  public mainChartColours: Array<any> = [
    { // brandInfo
      backgroundColor: hexToRgba(getStyle('--info'), 10),
      borderColor: getStyle('--info'),
      pointHoverBackgroundColor: '#fff'
    },
    { // brandSuccess
      backgroundColor: 'transparent',
      borderColor: getStyle('--success'),
      pointHoverBackgroundColor: '#fff'
    },
    { // brandDanger
      backgroundColor: 'transparent',
      borderColor: getStyle('--danger'),
      pointHoverBackgroundColor: '#fff',
      borderWidth: 1,
      borderDash: [8, 5]
    }
  ]
  public mainChartLegend = true;
  public mainChartType = 'line';
  
  dateForm = new FormGroup({
    date: new FormControl('', [Validators.required]),
  });
  txt : string ;
  selectedid ='';
  longitude:number;lattitude:number;
  stationsdata = [];
  allsites =[];
  maxtemp:0;maxhumid:0;
  station_cite =[];
  alldata = [];
  data =[];
  prevdata = [];
  temp = [];humid = []; time:[];

  temp2=[];time2=[];
  sixdaysdata = [] ;todaydata=[];secondday=[];thirdday=[];fourthday=[];fifthday=[];lastday=[]
  day1 ='';day2="";day3="";day4="";day5="";
  //
  public Libelium1chartType: string = 'line';

  public Libelium1chartData: Array<any> = [];

  public Libelium1chartLabels: Array<any> = [];

  public Libelium1chartColors: Array<any> = [
    {
      backgroundColor: 'rgba(105, 0, 132, .2)',
      borderColor: 'rgba(200, 99, 132, .7)',
      borderWidth: 2,
    },
    {
      backgroundColor: 'rgba(0, 137, 132, .2)',
      borderColor: 'rgba(0, 10, 130, .7)',
      borderWidth: 2,
    }
  ];

  public Libelium1chartOptions: any = {
    responsive: true
  };
  public Libelium1chartClicked(e: any): void { }
  public Libelium1chartHovered(e: any): void { }

  Libelium1name : '' ; Libelium1CO = [] ; Libelium1CO2 = [] ; Libelium1O2 = []; Libelium1CH4 = []; Libelium1temp = []; Libelium1humidite = []; Libelium1pressure = [] ;Libelium1time = [] ;Libelium1batterie ='';
  //
  public  Libelium2chartType: string = 'line';

  public Libelium2chartData: Array<any> = [];

  public Libelium2chartLabels: Array<any> = [];

  public Libelium2chartColors: Array<any> = [
    {
      backgroundColor: 'rgba(105, 0, 132, .2)',
      borderColor: 'rgba(200, 99, 132, .7)',
      borderWidth: 2,
    },
    {
      backgroundColor: 'rgba(0, 137, 132, .2)',
      borderColor: 'rgba(0, 10, 130, .7)',
      borderWidth: 2,
    }
  ];

  public Libelium2chartOptions: any = {
    responsive: true
  };
  public Libelium2chartClicked(e: any): void { }
  public Libelium2chartHovered(e: any): void { }

  Libelium2name : '' ;Libelium2O3 = [] ;  Libelium2NO2 = [] ;  Libelium2NO = [] ; Libelium2temp = []; Libelium2humidite = [] ;Libelium2pressure = []; Libelium2time = [] ;Libelium2batterie ='';
  //
  nameCite =''
  showtable = false
  mapboxx:  Mapboxgl.Map;
  currenttemp:string;
  currentdate:string;
  showprevision(){
   this.showtable = true
  }
  hideprevision(){
    this.showtable = false
   }

  ngOnInit(): void {
      this.stationservice.get_stations().subscribe(data => {
      this.stationsdata = data;
        console.log(this.stationsdata)
    });
    this.mapservice.get_Cites().subscribe(data => {
      this.allsites = data;
        console.log(this.allsites)
    });
    let date=new Date();
      let latest_date =this.datePipe.transform(date, 'yyyy-MM-dd');
      this.deviceservice.getdataperstation("60c898fd92e702378c8f1c37",latest_date).subscribe(data => {
        this.alldata = data;
        this.temp = data.temp;
        this.humid = data.humidite;
        this.time = data.time
        this.currentdate = latest_date
        this.mainChartData1 = this.temp
        console.log("/////////////////"+latest_date)
       this.mainChartElements = data.temp.length
       this.mainChartData1 = data.temp
       this.mainChartData2 = data.humidite
       console.log(Math.max(data.temp))
        this.maxtemp =  Math.max.apply(Math, data.temp);
        this.maxhumid = Math.max.apply(Math, data.humidite);
       this.mainChartLabels = this.time
      this.mainChartData = [
        {
          data: data.temp,
          label: 'Temperature'
        },
        {
          data: data.humidite,
          label: 'Humidite'
        }
       
      ];
      });

  }
 
  selectedCite(i:number){
    
    
    this.station_cite = []
    this.stationsdata.forEach(element => 
      {
        
        if (element.cite=== i){this.station_cite.push(element)
         this.nameCite = element.name
        }
        
      }
      
      )
      if (this.station_cite[0] == null)
      {
        let x : {name:string}
        x.name = "No Station Found !"
        this.station_cite.push(x)
      }
      else {
      console.log(this.station_cite)
      ;
      let date=new Date();
      let latest_date =this.datePipe.transform(date, 'yyyy-MM-dd');
      this.deviceservice.getdataperstation(this.station_cite[0]._id,latest_date).subscribe(data => {
        console.log("//////////////")
        
        console.log(data)
       
        console.log("//////////////")
        if ( data.length === 2)
        {
          this.Libelium1batterie = data[0].batterie
         this.Libelium2batterie = data[1].batterie
         this.Libelium1name = data[0].name
         this.Libelium2name = data[1].name
       
         this.alldata = data;
        this.Libelium1chartLabels = data[0].time
      
        
       this.Libelium1chartData = [
         {
           data: data[0].CO,
           label: 'CO:ppm'
         },
         {
           data: data[0].CO2,
           label: 'CO2:ppm'
         },
         {
           data: data[0].O2,
           label: 'O2:ppm'
         },
         {
           data: data[0].CH4,
           label: 'CH4:LEL'
         },
         {
           data: data[0].pressure,
           label: 'Pressure:Kpa'
         },
         {
           data: data[0].temp,
           label: 'Temperature'
         },
         {
           data: data[0].humidite,
           label: 'Humidite:HR%'
         }
        
       ];
       //
       this.Libelium2chartLabels = data[1].time
       this.Libelium2chartData = [
         {
           data: data[1].O3,
           label: 'O3:ppm'
         },
         {
           data: data[1].NO2,
           label: 'NO2:ppm'
         },
         {
           data: data[1].NO,
           label: 'NO:ppm'
         },
         {
           data: data[1].pressure,
           label: 'Pressure:Kpa'
         },
         {
           data: data[1].temp,
           label: 'Temperature'
         },
         {
           data: data[1].humidite,
           label: 'Humidite:HR%'
         }
        
       ];
 
 
        }
        
        else 
        {
        this.alldata = data;
        this.temp = data.temp;
        this.humid = data.humidite;
        this.time = data.time
        this.mainChartData1 = this.temp
        // console.log(this.mainChartData1)
       this.mainChartElements = data.temp.length
       this.mainChartData1 = data.temp
       this.mainChartData2 = data.humidite
       console.log(Math.max(data.temp))
        this.maxtemp =  Math.max.apply(Math, data.temp);
        this.maxhumid = Math.max.apply(Math, data.humidite);
       this.mainChartLabels = this.time
      this.mainChartData = [
        {
          data: data.temp,
          label: 'Temperature'
        },
        {
          data: data.humidite,
          label: 'Humidite'
        }
       
      ];
       }
      

      });
    }
  }

  selectedstation(i:string,x:number,y:number){
    this.selectedid=i
    this.lattitude=x
    this.longitude=y
    console.log(this.lattitude)
    console.log(this.longitude)
    
    this.mapservice.getdataperstation(this.lattitude,this.longitude).subscribe(data => {
      this.sixdaysdata = data
      this.todaydata = data.todaysdata;
      console.log("test")
      console.log(this.todaydata)
   
      
      //secondday,thirdday,fourthday,fifthday,lastday
      this.secondday = data.secondday ; this.day1 = data.secondday[0].day 
      this.thirdday = data.thirdday ;this.day2 = data.thirdday[0].day 
      this.fourthday = data.fourthday ; this.day3 = data.fourthday[0].day 
      this.fifthday = data.fifthday  ;this.day4 = data.fifthday[0].day 
      this.lastday = data.lastday  ;this.day5 = data.lastday[0].day 
      console.log(this.secondday)
      console.log(this.thirdday)
      console.log(this.fourthday) 
      console.log(this.fifthday)
      console.log(this.lastday)
   
     })
    
  }
  getdataperstation(){
    
    console.log("test")
    let bool = false
    let indice = 11

    
    let date = this.dateForm.value['date']
    let date2 = this.datePipe.transform(date, 'yyyy-MM-dd');
   let date3 = date2.toString()
    console.log(date3)
 
    let id = this.selectedid
    console.log(id + ' ' + date3 )

  



  
    this.deviceservice.getdataperstation(id,date3).subscribe(data => {
    //   this.alldata = data;
    //   this.temp = data.temp;
    //   this.humid = data.humidite;
    //   this.time = data.time
    //   this.mainChartData1 = this.temp
    //   // console.log(this.mainChartData1)
    //  this.mainChartElements = data.temp.length
    //  this.mainChartData1 = data.temp
    //  this.mainChartData2 = data.humidite
    //  console.log(Math.max(data.temp))
    //   this.maxtemp =  Math.max.apply(Math, data.temp);
    //   this.maxhumid = Math.max.apply(Math, data.humidite);
    //   this.currentdate = date3
    //  this.mainChartLabels = this.time
    // this.mainChartData = [
    //   {
    //     data: data.temp,
    //     label: 'Temperature'
    //   },
    //   {
    //     data: data.humidite,
    //     label: 'Humidite'
    //   }
     
    // ];
    if ( data.length === 2)
    {
      this.Libelium1batterie = data[0].batterie
     this.Libelium2batterie = data[1].batterie
     this.Libelium1name = data[0].name
     this.Libelium2name = data[1].name
   
     this.alldata = data;
    this.Libelium1chartLabels = data[0].time
  
    
   this.Libelium1chartData = [
     {
       data: data[0].CO,
       label: 'CO:ppm'
     },
     {
       data: data[0].CO2,
       label: 'CO2:ppm'
     },
     {
       data: data[0].O2,
       label: 'O2:ppm'
     },
     {
       data: data[0].CH4,
       label: 'CH4:LEL'
     },
     {
       data: data[0].pressure,
       label: 'Pressure:Kpa'
     },
     {
       data: data[0].temp,
       label: 'Temperature'
     },
     {
       data: data[0].humidite,
       label: 'Humidite:HR%'
     }
    
   ];
   //
   this.Libelium2chartLabels = data[1].time
   this.Libelium2chartData = [
     {
       data: data[1].O3,
       label: 'O3:ppm'
     },
     {
       data: data[1].NO2,
       label: 'NO2:ppm'
     },
     {
       data: data[1].NO,
       label: 'NO:ppm'
     },
     {
       data: data[1].pressure,
       label: 'Pressure:Kpa'
     },
     {
       data: data[1].temp,
       label: 'Temperature'
     },
     {
       data: data[1].humidite,
       label: 'Humidite:HR%'
     }
    
   ];


    }
    
    else 
    {
    this.alldata = data;
    this.temp = data.temp;
    this.humid = data.humidite;
    this.time = data.time
    this.mainChartData1 = this.temp
    // console.log(this.mainChartData1)
   this.mainChartElements = data.temp.length
   this.mainChartData1 = data.temp
   this.mainChartData2 = data.humidite
   console.log(Math.max(data.temp))
    this.maxtemp =  Math.max.apply(Math, data.temp);
    this.maxhumid = Math.max.apply(Math, data.humidite);
   this.mainChartLabels = this.time
  this.mainChartData = [
    {
      data: data.temp,
      label: 'Temperature'
    },
    {
      data: data.humidite,
      label: 'Humidite'
    }
   
  ];
   }
    });
  }

  marker2(a: number , b: number , c: string,d:string) { 
    
    this.mapservice.getcurrent(b,a).subscribe(data => {
      this.currenttemp = data.temperature;
      // this.humidity = data.humidity;
      // this.description = data.description;
      var el = document.createElement('div');
      el.className = 'marker';
      const popup = new Mapboxgl.Popup({ className: 'apple-popup' })
        .setHTML('<h5>Temperature:'+ data.temperature+ '</h5> <h5> Humidity :'+ data.humidity +  '</h5> <h5> Weather :'+ data.description +' </h5>  <h5> Ref : ' + c + "<br>  " + "Description:  "+d  + '</h5></div>');
      const marker = new Mapboxgl.Marker(el).setLngLat([a, b])
        .addTo(this.mapboxx);
      marker.getElement().addEventListener('click', function() {
       marker.setPopup(popup);
      });
     
     })
     
   
  }
}
