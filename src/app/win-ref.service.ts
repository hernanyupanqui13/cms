import { Injectable } from '@angular/core';

@Injectable({
  providedIn: 'root'
})
export class WinRefService {

  constructor() { }

  getNativeWindow() : any {
    return window;
 }
}




