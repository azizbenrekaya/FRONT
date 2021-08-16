import { Component , Inject , NgModule} from '@angular/core';
import {LOCAL_STORAGE, WebStorageService} from "ngx-webstorage-service";
import {HttpClient} from '@angular/common/http';
import {AuthentificationService} from "../../Services/authentification.service";
import {Router} from "@angular/router";
import {FormControl, FormGroup, Validators,FormsModule} from "@angular/forms";
import jwt_decode from 'jwt-decode';
@Component({
  selector: 'app-dashboard',
  templateUrl: 'login.component.html'
})
export class LoginComponent { 
  User :JSON;
  Res:JSON;
  form: any = {
    email: null,
    password: null
  };
 
  constructor(@Inject(LOCAL_STORAGE) private storage: WebStorageService, public authService: AuthentificationService,  private router: Router ) { }


  userlogin() {
    const { username, email, password } = this.form;
    this.authService.logIn(email,password).subscribe(data => {console.log(data)
      this.storage.set('email', data.email);
      this.storage.set('nom', data.nom);
      this.storage.set('prenom', data.prenom);
      this.storage.set('id', data.id);
      this.storage.set('token', data.accessToken);
    });
    console.log(this.storage.get('email'))
    
    this.router.navigate(['dashboard']);
    alert("Welcome")
    
  
  }
  reloadPage(): void {
    window.location.reload();
  }
  reg(): void {
    this.router.navigate(['register']);
  }

}



