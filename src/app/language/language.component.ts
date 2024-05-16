import { Component } from '@angular/core';
import { FormBuilder, FormGroup,Validators } from '@angular/forms';
import { Router } from '@angular/router';
import { Location } from '@angular/common';
import { HttpClient, HttpHeaders } from '@angular/common/http';
import { LogInService } from '../log-in.service';
@Component({
  selector: 'app-language',
  templateUrl: './language.component.html',
  styleUrl: './language.component.css'
})
export class LanguageComponent {
  goBack()
  {
    this.location.back();
  }
  buttons=[
    {
      name:'Scearch stock',
      navTo:'scearch stock'
    },
    {
    name:'Opening Stock',
    navTo:'opening-stock'
  },{
    name:'Stock Update',
    navTo:'stock-update'
  },
  {
    name:'Existing Stock',
    navTo:'existingStock'
  },
  {
    name:'Sales Reports',
    navTo:'sales-report'
  },{
    name:'closing stock',
    navTo:'closing-stock'
  }
  ,{
    name:'Special Request',
    navTo:'special-request'
  },
  {
    name:'Add User',
    navTo:'addUser'
  },
  {
    name:'Log out',
    navTo:'log out'
  }
  
]

userToken:any;
form: FormGroup;

  constructor(private fb: FormBuilder,
              private router:Router,
              private location:Location,
              private http:HttpClient,
              private logInSerive:LogInService
  ) {
    // Initialize the form group with three checkboxes
    this.form = this.fb.group({
      eng: [false],
      tel: [false],
      hin: [false]
    });
    this.userToken=this.logInSerive.get('tocken');
  }

  ngOnInit() {
    // No need to subscribe to value changes in ngOnInit because we handle the event in onCheckboxChange
  }

  onCheckboxChange(changedCheckbox: string) {
    // Iterate through each control in the form group
    for (const controlName in this.form.controls) {
      if (controlName === changedCheckbox) {
        // If the control matches the changedCheckbox, console log its value
        if (this.form.get(controlName)?.value) {
          console.log(controlName.toUpperCase());
        }
      } else {
        // Otherwise, uncheck the other checkboxes
        this.form.get(controlName)?.setValue(false, { emitEvent: false });
      }
    }
  }


  navigateTo(nav:string)
  {
    switch(nav)
    {
      case 'scearch stock':
       this.router.navigate(['scearch']);
        break;
      case 'opening-stock':
       this.router.navigate(['opening-stock']);
        break;
        
      case 'stock-update':
       this.router.navigate(['stock-update']);
        break;

      case 'existingStock':
        this.router.navigate(['existingStock']);
        break;
      case 'sales-report':
       this.router.navigate(['sales-report']);
        break;
      
        case 'closing-stock':
          this.router.navigate(['closing-stock']);
          break;
        
        case 'special-request':
          this.router.navigate(['special-request']);
          break;
        case 'addUser':
          this.router.navigate(['addUser']);
          break;
        case 'log out':
          this.logOut();
        break;
    }
  }

  logOut()
  {
    const date=new Date().toISOString().split('T')[0]
    const apiUrl='https://mrf-tyres-be.onrender.com/admin-logout'
    const headers = new HttpHeaders({
      'Content-Type': 'application/json',
      'Authorization': `Bearer ${this.userToken}`
      // Add more headers as needed
    });
    const requestBody={
      date:date
    }
    console.log(requestBody);
    this.http.post(apiUrl,requestBody,{headers}).subscribe(
      (response)=>{
        console.log(response);
      },
      (error)=>{
        console.log(error);
      }
    )
    localStorage.removeItem('tocken');
    this.router.navigate(['logIn'])
  }
 }
