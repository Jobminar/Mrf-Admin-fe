import { Component } from '@angular/core';
import { HttpClient, HttpHeaders } from '@angular/common/http';

import { FormBuilder, FormGroup } from '@angular/forms';
import { DataTransferService } from '../data-transfer.service';
import { LogInService } from '../log-in.service';
import { Location } from '@angular/common';
import { ToastrService } from 'ngx-toastr';
import { Router } from '@angular/router';
@Component({
  selector: 'app-special-request',
  templateUrl: './special-request.component.html',
  styleUrl: './special-request.component.css'
})
export class SpecialRequestComponent {
  data:any []=[];
  dates:FormGroup
  userToken:any;
  goBack()
  {
    this.location.back();
  }
  loading:boolean=false;
  constructor(private fb:FormBuilder,
              private http:HttpClient,
              private dataTransferService:DataTransferService,
              private logInService:LogInService,
              private location:Location,
              private router:Router,
              private toaster:ToastrService
  )
  {
    this.dates=this.fb.group({
      date:''
    })

    console.log(this.dataTransferService.location);
    this.getingData();
  }

  gettingDate()
  {
    this.loading=true;
    console.log(this.dates);
    // this.getingData(this.dates.value);
  }

  getingData()
  {
    this.loading=true;
    this.userToken=this.logInService.get('tocken');
    console.log(this.userToken,"tocken");
    // console.log(date.date,"date");
    const api='https://mrf-tyres-be.onrender.com/special-reports';
    const headers = new HttpHeaders({
      'Content-Type': 'application/json',
      'Authorization': `Bearer ${this.userToken}`
      // Add more headers as needed
    });

    this.http.get<any>(api,{headers}).subscribe(
      (response)=>{
        this.loading=false
        console.log(response);
        
        
        this.data=response
        console.log(this.data);
        this.loading=false;
      },
      (error)=>
        {
          this.loading=false
          console.log(error);
          if (error.error.message=== 'No existing stock found for the given date') {
            this.toaster.error('No existing stock found for the given date','error')
          }
          
       
        }
    )
  }

}
