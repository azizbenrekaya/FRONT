import { Component ,Inject} from '@angular/core';
import {LOCAL_STORAGE, WebStorageService} from "ngx-webstorage-service";
import {HttpClient} from '@angular/common/http';
import {AuthentificationService} from "../../Services/authentification.service";
import {Router} from "@angular/router";
@Component({
  selector: 'app-dashboard',
  templateUrl: 'register.component.html'
})
export class RegisterComponent {
  form: any = {
    nom:null,
    prenom:null,
    email: null,
    password: null
  };
  constructor(@Inject(LOCAL_STORAGE) private storage: WebStorageService, public authService: AuthentificationService,  private router: Router ) { }
  Register() {
    const { nom,prenom, email, password } = this.form;
    this.authService.Register(nom,prenom,email,password).subscribe(data => {console.log(data)});
   this.router.navigate(['login']);
    
  
  }
}
