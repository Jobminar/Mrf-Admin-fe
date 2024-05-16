import { HttpClient, HttpHeaders } from '@angular/common/http';
import { Component } from '@angular/core';
import { FormBuilder, FormGroup } from '@angular/forms';
import { DataTransferService } from '../data-transfer.service';
import { LogInService } from '../log-in.service';
import { Location } from '@angular/common';
import { ToastrService } from 'ngx-toastr';
import { Printer } from '@bcyesil/capacitor-plugin-printer';

@Component({
  selector: 'app-existing-stock',
  templateUrl: './existing-stock.component.html',
  styleUrl: './existing-stock.component.css'
})
export class ExistingStockComponent {
  data:any []=[];
  dates:FormGroup
  userToken:any;
  maxDate:any;
  sellingTotalAmount:number=0
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
  }

  gettingDate()
  {
    this.loading=true;
    console.log(this.dates);
    this.getingData(this.dates.value);
  }

  getingData(enteredDate:any)
  {
    this.sellingTotalAmount=0
    this.data=[]
    console.log(enteredDate);
    this.loading=true;
    this.userToken=this.logInService.get('tocken');
    console.log(this.userToken,"tocken");
    // console.log(date.date,"date");
    const api='https://mrf-tyres-be.onrender.com/existing-stock';
    const headers = new HttpHeaders({
      'Content-Type': 'application/json',
      'Authorization': `Bearer ${this.userToken}`
      // Add more headers as needed
    });

    this.http.get<any>(api,{headers}).subscribe(
      (response)=>{
        console.log(response.existingStock);
       
        //filtering according to location
       response.existingStock.forEach((element: { date: any;location:any ;totalAmount:any}) => {
          
        if (element.location===this.logInService.getFromLocalStorage('location') && element.date.split('T')[0]===enteredDate.date) {
            this.data.push(element)
            this.sellingTotalAmount +=element.totalAmount
          }
        });
        // this.data=response.existingStock;
        if (this.data.length<=0) {
          this.toaster.error('Existing stock was not found for this date', 'Error');
        }
        console.log(this.data);
        this.loading=false;
      },
      (error)=>
        {
          console.log(error);

          this.loading=false
          if (error.error.message=== 'Closed-stock report not found for the given date') {
            this.toaster.error('Closing stock was not found for this date', 'Error');
          }
        }
    )
  }

  
  print() {
    let printContent = `<table style="width: 100%;border-collapse: collapse;">
      <thead>
        <tr>
          <th style="border: 1px solid black;">Tyre Size</th>
          <th style="border: 1px solid black;" >Quantity</th>
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
        <td style="border: 1px solid black;" >${item.SSP}</td>
      
        <td style="border: 1px solid black;">${item.pricePerUnit}</td>
        <td style="border: 1px solid black;">${item.totalAmount}</td>
      </tr>`;
    });
  
    // // Close the table body and table
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
    Printer.print({ content: printContent, name: 'Existing Stock', orientation: 'landscape' });
  }

}
