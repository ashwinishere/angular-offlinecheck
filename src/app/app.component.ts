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
  constructor() {
this.createOnline$().subscribe( (eve) => {
  this.fillColorClass = eve ? 'fillGreen' :  'fillRed';
  console.log(eve,this.fillColorClass);
});
  }
  name = 'Angular';
getColor() {
  return this.fillColorClass;
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
}
