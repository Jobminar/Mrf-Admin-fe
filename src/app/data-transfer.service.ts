import { Injectable } from '@angular/core';

@Injectable({
  providedIn: 'root'
})
export class DataTransferService {
  constructor() { }
  location:any;
  

  setLocation(location:string)
  {
    this.location=location;
  }
 
 }
