import { Injectable } from '@angular/core';

@Injectable({
  providedIn: 'root'
})
export class LogInService {
  userToken:any;
  logInStatus:boolean=false;
  constructor() { }
  set(response:any): void {
  const key="tocken";
  const value=response.token;
  this.userToken=response.token;
  this.logInStatus=true;
  localStorage.setItem(key, JSON.stringify(value));
    
  }
  setLocation(location:any)
  {
    const key='location';
    const value=location
    localStorage.setItem(key, JSON.stringify(value));
    
  }
  get(key: string): any {

    return this.getFromLocalStorage(key);
  }

  remove(key: string): void {
    this.logInStatus=false;
      localStorage.removeItem(key);
    
  }
  getFromLocalStorage(key: string): any {
  
      const storedValue = localStorage.getItem(key);
      return storedValue ? JSON.parse(storedValue) : null;
    
  }


}
