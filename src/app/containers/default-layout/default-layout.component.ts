import {Component,Inject} from '@angular/core';
import { navItems } from '../../_nav';
import {LOCAL_STORAGE, WebStorageService} from "ngx-webstorage-service";
import {Router} from "@angular/router";
@Component({
  selector: 'app-dashboard',
  templateUrl: './default-layout.component.html'
})


export class DefaultLayoutComponent {
  nom:any;
  prenom:any;
  constructor(@Inject(LOCAL_STORAGE) private storage: WebStorageService,private router: Router){
  }
  ngOnInit() {
    this.nom = this.storage.get('nom'); 
    this.prenom = this.storage.get('prenom');
   
    
  }
  public sidebarMinimized = false;
  public navItems = navItems;

  toggleMinimize(e) {
    this.sidebarMinimized = e;
  }
 

  logout() {
    this.storage.clear();
    this.router.navigate(['login']);
  }
}
