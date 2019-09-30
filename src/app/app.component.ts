import { Component } from '@angular/core';
import {fromEvent,merge , Observable , Observer} from 'rxjs';
import { map} from 'rxjs/operators';
@Component({
  selector: 'my-app',
  templateUrl: './app.component.html',
  styleUrls: [ './app.component.css' ]
})
export class AppComponent  {
  fillColorClass: string;
  fillBGClass: string;
  showToast = false;
  constructor() {
this.createOnline$().subscribe( (eve) => {
  this.fillColorClass = eve ? 'fillGreen' :  'fillRed';
  this.fillBGClass = eve ? 'bgGreen' :  'bgRed';
});
  }
  name = 'Angular';
getColor() {
  return this.fillColorClass;
}
getBGColor() {
  return this.fillBGClass;
}
  createOnline$() {
    return merge<boolean>(
      fromEvent(window, 'offline').pipe(map(() => false)),
      fromEvent(window, 'online').pipe(map(() => true)),
      new Observable((sub: Observer<boolean>) => {
        sub.next(navigator.onLine);
        sub.complete();
      }));
  }
  check() {
    console.log(navigator.onLine);
this.showToast =true;    
    setTimeout(() => {
this.showToast =false;
    },1000)
  }
}
