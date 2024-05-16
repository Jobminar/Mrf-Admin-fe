import { HttpClient, HttpHeaders } from '@angular/common/http';
import { Component } from '@angular/core';
import { LogInService } from '../log-in.service';
import { DataTransferService } from '../data-transfer.service';
import { Location } from '@angular/common';
import { ToastrService } from 'ngx-toastr';
import { Router } from '@angular/router';
@Component({
  selector: 'app-stock-update',
  templateUrl: './stock-update.component.html',
  styleUrl: './stock-update.component.css'
})
export class StockUpdateComponent {
  userToken:any
  loading:boolean=false
  maxDate: string;
  minDate: string;
  selectedLocation:any=this.loginService.getFromLocalStorage('location')
  constructor(private http : HttpClient,
              private router:Router,
                private location: Location,
                private toastr: ToastrService,
                private loginService:LogInService,
                private dataTransferService:DataTransferService
  )
  {
   console.log( this.loginService.get('tocken'));
    this.loginService.get('tocken')
    this.userToken=this.loginService.get('tocken');
    const currentDate = new Date();
    const oneWeekAgo = new Date();
    oneWeekAgo.setDate(currentDate.getDate() - 7);

    var currentDateIST = new Date().toLocaleString("en-US", {timeZone: "Asia/Kolkata"});
    var currentDates = new Date(currentDateIST);
    var year = currentDates.getFullYear();
    var month = ('0' + (currentDates.getMonth() + 1)).slice(-2); // Adding 1 to month since it's zero-based
    var day = ('0' + currentDates.getDate()).slice(-2);
    var formattedDate = year + '-' + month + '-' + day;
    this.maxDate=formattedDate
    this.minDate = oneWeekAgo.toISOString().split('T')[0];

    console.log(this.maxDate); // Output: "2024-05-11"
    console.log(this.minDate); 
    this.selectedLocation=this.loginService.getFromLocalStorage('location')
   console.log(this.selectedLocation,"selected ");
  }
  calculatePricePerUnit() {
    // Calculate price per unit
    if (this.formData.quantity && this.formData.totalAmount) {
      let pricePerUnit=this.formData.totalAmount/this.formData.quantity
      pricePerUnit = Math.round(pricePerUnit * 1000) / 1000;
      this.formData.pricePerUnit=pricePerUnit
    }
}
  goBack()
  {
    this.location.back();
  }
  formData = {
    date: "",
    comment: '',
    tyreSize: '',
    quantity: 0,
    SSP: '',
    totalAmount:0,
    pricePerUnit:0,
    location:this.selectedLocation
  };

  submitForm() {
    this.loading=true;
    // Here you can send the form data to your backend API
    console.log(this.formData);
    const api='https://mrf-tyres-be.onrender.com/add-stock';
    const headers = new HttpHeaders({
      'Content-Type': 'application/json',
      'Authorization': `Bearer ${this.userToken}`
      // Add more headers as needed
    });
    this.http.post(api, this.formData, { headers }).subscribe((response) => {
      console.log(response);
      this.loading=false;
      this.toastr.success('product added successfully!', 'success');
    },
    (error) => {
      console.log(error);
      this.loading=false;
      // this.toastr.error('Oops! Something went wrong.', 'Error');
      if (error.error.message==='Open stock already exists for this tyreSize and location. Please update the existing open stock.') {
        const result = window.confirm("this Stock was prasent do you want to update.");
        if (result) {
          // Redirect to update page if the user clicked OK
        this.router.navigate(['update'])
        } else {
          // No need to redirect if the user clicked Cancel
        }
      }
    });
  }
}
