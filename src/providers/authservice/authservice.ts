import { HttpClient } from '@angular/common/http';
import { Injectable } from '@angular/core';
import { Observable } from 'rxjs/RX';
import { Response }          from '@angular/http';

import 'rxjs/add/operator/map';
import 'rxjs/add/operator/catch';

export class User {
  name: string;
  email: string;
 
  constructor(name: string, email: string) {
    this.name = name;
    this.email = email;
  }
}
/*
  Generated class for the AuthserviceProvider provider.

  See https://angular.io/guide/dependency-injection for more info on providers
  and Angular DI.
*/
@Injectable()
export class AuthserviceProvider {

  currentUser: User;
  constructor(public http: HttpClient) {
    console.log('Hello AuthserviceProvider Provider');
  }


  
  private extractData(res: Response|any) {
    if(res != null)
    {
      let body = res.userName;
      if(body != undefined)
      return body || { };
      else res.status;
    }
    else{
      'successful';
    }

  }
  
  private handleError (error: Response | any) {
    let errMsg: string;
    if (error instanceof Response) {
      const err = error || '';
      errMsg = `${error.status} - ${error.statusText || ''} ${err}`;
    } else {
      errMsg = error.message ? error.message : error.toString();
    }
    //console.error(errMsg);
    return Observable.throw(errMsg);
  }
  
   public login(credentials) {
     if (credentials.email === null || credentials.password === null) {
       return Observable.throw("Please insert credentials");
     } else {
      let data = `grant_type=password&username=${credentials.email}&password=${credentials.password}`;
       return  this.http.post("http://localhost:50018/token", data)
        .map(this.extractData)
        .catch(this.handleError);
        //  // At this point make a request to your backend to make a real check!
        //  let access = (credentials.password === "pass" && credentials.email === "email");
        //  this.currentUser = new User('Simon', 'saimon@devdactic.com');
        //  observer.next(access);
        //  observer.complete();
      // });
     }
   }
  
   public register(credentials) {
    //let headers = new Headers({ 'Content-Type': 'application/json' });
   // let options = new RequestOptions({ headers: headers });
 
     if (credentials.email === null || credentials.password === null) {
       return Observable.throw("Please insert credentials");
     } else {
       // At this point store the credentials to your backend!
       return this.http.post("http://localhost:50018/api/Account/Register", { Email: credentials.email, Password:credentials.password, ConfirmPassword:credentials.password}
       , {headers:{'Content-Type': 'application/json; charset=utf-8'}, responseType:'text' }).map(this.extractData)
        .catch(this.handleError);
      
     }
   }
  
   public getUserInfo() : User {
     return this.currentUser;
   }

   public setUserInfo(info)  {
    this.currentUser = new User(info, info);
  }
   public logout() {
     return Observable.create(observer => {
       this.currentUser = null;
       observer.next(true);
       observer.complete();
     });

     
   }

}
