import { Component } from '@angular/core';
import { NavController, IonicPage } from 'ionic-angular';
import { AuthserviceProvider } from '../../providers/authservice/authservice';
 
@IonicPage()
@Component({
  selector: 'page-home',
  templateUrl: 'home.html'
})
export class HomePage {
  username = '';
  email = '';
  constructor(private nav: NavController, private auth: AuthserviceProvider) {
    let info = this.auth.getUserInfo();
    if(info != null)
    {
      this.username = info['name'];
      this.email = info['email'];
    }

  }
 
  public logout() {
    this.auth.logout().subscribe(succ => {
      this.nav.setRoot('LoginPage')
    });
  }
}