import { HttpClient, HttpHeaders } from '@angular/common/http';
import { Component } from '@angular/core';
import { FormBuilder, FormGroup } from '@angular/forms';
import { DataTransferService } from '../data-transfer.service';
import { LogInService } from '../log-in.service';
import { Location } from '@angular/common';
import { Printer } from '@bcyesil/capacitor-plugin-printer';
import { ToastrService } from 'ngx-toastr';

@Component({
  selector: 'app-sales-report',
  templateUrl: './sales-report.component.html',
  styleUrl: './sales-report.component.css'
})
export class SalesReportComponent {
  data:any []=[];
  dates:FormGroup
  userToken:any;
  maxDate:any;
  sellingTotalAmount:number=0;
  responseData:any[]=[]
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
              private toaster:ToastrService
  )
  {
    this.dates=this.fb.group({
      date:''
    })

    var currentDateIST = new Date().toLocaleString("en-US", {timeZone: "Asia/Kolkata"});
    var currentDate = new Date(currentDateIST);
    var year = currentDate.getFullYear();
    var month = ('0' + (currentDate.getMonth() + 1)).slice(-2); // Adding 1 to month since it's zero-based
    var day = ('0' + currentDate.getDate()).slice(-2);
    var formattedDate = year + '-' + month + '-' + day;
    this.maxDate=formattedDate
      console.log(formattedDate);
    this.getingData()
  }

  gettingDate()
  {
    this.sellingTotalAmount=0
    this.data=[];
    // this.loading=true;
    
    const date=this.dates.value.date
    
    const filterDate = this.responseData.filter(element => {
     
      const elementDate = element.date;

      if (elementDate.split('T')[0] === date && element.location=== this.logInService.getFromLocalStorage('location')) {
        this.data.push(element)
        this.sellingTotalAmount+=element.totalAmount

      }
      // else{
      //   this.toaster.error("no sells report for the this date","error")
      // }
      
    });
    if (this.data.length<=0) {
      this.toaster.error("no sells report for the this date","error")
    }
    
  }

  getingData()
  {
    this.sellingTotalAmount=0
    this.loading=true
    this.userToken=this.logInService.get('tocken');
    console.log(this.userToken,"tocken");
  
    const api='https://mrf-tyres-be.onrender.com/sales';
    const headers = new HttpHeaders({
      'Content-Type': 'application/json',
      'Authorization': `Bearer ${this.userToken}`
      // Add more headers as needed
    });

    this.http.get<any>(api, { headers }).subscribe(
      (response) => {
        console.log(response);
        this.loading=false
        if (response && response.salesRecords) { // Check if existingStock exists
          response.salesRecords.forEach((element: { date: any;location:any ;totalAmount:number}) => {
            if (element.location=== this.logInService.getFromLocalStorage('location')) {
              this.responseData.push(element)
              this.sellingTotalAmount +=element.totalAmount
              console.log(element);
            }
          });
          this.data=this.responseData
          this.responseData=response.salesRecords
          console.log(this.data);
          this.loading = false;
        } else {
          console.log('Existing stock not found in the response');
          this.loading = false;
        }
        // this.data=this.responseData;
      },
      (error) => {
        this.loading=false
        console.log(error);
        this.loading = false;
        if (error.error.message=== 'Sales report not found for the given date') {
          // this.toaster.error('sales report was not found for the given date')
          alert("sales report was not found for the given date")
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
  
    // Close the table body and table
    // printContent += `</tbody>
    //   </table>`;
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
    Printer.print({ content: printContent, name: 'sells report', orientation: 'landscape' });
  }
}
