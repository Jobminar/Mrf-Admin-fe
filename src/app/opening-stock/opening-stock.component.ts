import { HttpClient, HttpHeaders } from '@angular/common/http';
import { Component } from '@angular/core';
import { FormBuilder, FormGroup } from '@angular/forms';
import { DataTransferService } from '../data-transfer.service';
import { LogInService } from '../log-in.service';
import { Location } from '@angular/common';
import { ToastrService } from 'ngx-toastr';
import { Printer } from '@bcyesil/capacitor-plugin-printer';
import { Router } from '@angular/router';
@Component({
  selector: 'app-opening-stock',
  templateUrl: './opening-stock.component.html',
  styleUrl: './opening-stock.component.css'
})
export class OpeningStockComponent {
  data:any []=[];
  dates:FormGroup
  userToken:any;
  sellingTotalAmount:number=0
  maxDate:any;
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
    var currentDateIST = new Date().toLocaleString("en-US", {timeZone: "Asia/Kolkata"});
    var currentDate = new Date(currentDateIST);
    var year = currentDate.getFullYear();
    var month = ('0' + (currentDate.getMonth() + 1)).slice(-2); // Adding 1 to month since it's zero-based
    var day = ('0' + currentDate.getDate()).slice(-2);
    var formattedDate = year + '-' + month + '-' + day;
    this.maxDate=formattedDate
   
    this.dates=this.fb.group({
      date:''
    })

    console.log(this.dataTransferService.location);
    this.getingData();
  }

  gettingDate()
  {
    // this.loading=true;
    console.log(this.dates);
    this.filterData(this.dates)
  }

  filterData(dates:any)
  {
    console.log(dates.value.date);
    const filter:any=[];
    this.data.forEach((element: { location: any;date:any } ) => {
          if ( element.date.split('T')[0]===dates.value.date) {
            filter.push(element)
            // console.log(element);
          }
        });
        this.data=filter
  }
  getingData()
  {
    this.data=[];
    this.sellingTotalAmount=0
    this.loading=true;
    this.userToken=this.logInService.get('tocken');
    console.log(this.userToken,"tocken");
    // console.log(date.date,"date");
    const api='https://mrf-tyres-be.onrender.com/open-stock';
    const headers = new HttpHeaders({
      'Content-Type': 'application/json',
      'Authorization': `Bearer ${this.userToken}`
      // Add more headers as needed
    });

    this.http.get<any>(api,{headers}).subscribe(
      (response)=>{
        this.loading=false
       
        // console.log(response);
        console.log(response.openStock);
        const filter:any=response.openStock;
        filter.forEach((element: { location: any;date:any;totalAmount:any } ) => {
          console.log(element.location);
          if (element.location===this.logInService.getFromLocalStorage('location') ) {
            this.data.push(element)
            this.sellingTotalAmount+=element.totalAmount;
            // console.log(element);
          }
        });
        // this.data=response.openStock;
        
        
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

 

  print() {
    let printContent = `<table style="width: 100%;border-collapse: collapse;">
      <thead>
        <tr>
          <th style="border: 1px solid black;">Tyre Size</th>
          <th style="border: 1px solid black;">Quantity</th>
          <th style="border: 1px solid black;">SSP</th>
         
          <th style="border: 1px solid black;">Price Per Unit</th>
          <th style="border: 1px solid black;">Total Amount</th>
        </tr>
      </thead>
      <tbody>`;
  
    // Iterate over the data and add rows to the printContent
    this.data.forEach(item => {
      printContent += `<tr>
        <td style="border: 1px solid black;">${item.tyreSize}</td>
        <td style="border: 1px solid black;">${item.quantity}</td>
        <td style="border: 1px solid black;">${item.SSP}</td>
        
        <td style="border: 1px solid black;">${item.pricePerUnit}</td>
        <td style="border: 1px solid black;">${item.totalAmount}</td>
      </tr>`;
    });
  
    // // Close the table body and table
    // printContent += `</tbody>
    //   </table>`;

    // Close the table body
    printContent += `</tbody>`;

    // Add the additional thead row for total amount
    printContent += `<thead >
      
        <th style="border: 1px solid black;">Total</th>
        <th style="border: 1px solid black;"></th>
        <th style="border: 1px solid black;"></th>
        <th style="border: 1px solid black;"></th>
        <th style="border: 1px solid black;">${this.sellingTotalAmount}</th>
     
    </thead>`;

    // Close the table
    printContent += `</table>`;
      
    // Print the content
    Printer.print({ content: printContent, name: 'opening stock', orientation: 'landscape' });
  }
  

}
