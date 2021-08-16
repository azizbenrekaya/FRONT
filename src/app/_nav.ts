import { INavData } from '@coreui/angular';
import { Component, OnInit,Inject } from '@angular/core';


export const navItems: INavData[] = [

  {
    title: true,
    name: ''
  },
  {
    name: 'Dashboard',
    url: '/dashboard',
    icon: 'cil-screen-desktop'
  },
  // {
  //   name: 'Station',
  //   url: '/station',
  //   icon: 'icon-drop'
  // },
  {
    name: 'My Sites',
    url: '/charts',
    icon: 'icon-pencil',
    children: [  {
      name: 'Add Site',
      url: '/charts',
      icon: 'cil-plus'
    },
      {
        name: 'Handle Sites',
        url: '/station',
        icon: 'icon-pencil'
      }]
  },
  {
    name: 'My Stations',
    url: '/stations',
    icon: 'icon-pencil'
  },
  {
    name: 'Alerts',
    url: '/alertclient',
    icon: 'icon-bell'
  },
  {
    name: 'My Devices',
    url: '/theme/colors',
    icon: 'icon-drop',
    children: [
      {
        name: 'Add Device',
        url: '/theme/colors',
        icon: 'cil-plus'
      },
      {
        name: 'Handle Device',
        url: '/theme/typography',
        icon: 'icon-pencil'}
      
    
    ]
  }

 

 

  
 

 
];
