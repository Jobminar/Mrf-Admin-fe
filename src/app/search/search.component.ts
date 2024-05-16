import { Component } from '@angular/core';
import { Location } from '@angular/common';
import { HttpClient, HttpHeaders } from '@angular/common/http';
import { ToastrService } from 'ngx-toastr';
import { LogInService } from '../log-in.service';
import { DataTransferService } from '../data-transfer.service';
@Component({
  selector: 'app-search',
  templateUrl: './search.component.html',
  styleUrl: './search.component.css'
})
export class SearchComponent {
  goBack()
  {
    this.location.back();
  }
  loading:boolean=false;
  userToken:any;
  data:any[]=[];
  filterData:any[]=[];
  selectedLocation:any;
  showFilter:boolean=false
  constructor(private location:Location,
              private http:HttpClient,
              private toaster:ToastrService,
              private logInService:LogInService,
              private dataTransferService:DataTransferService
             )
  {
    this.getingData();
    this.selectedLocation=localStorage.getItem('')
  }

  getingData()
  {
    this.userToken=this.logInService.get('tocken');
    console.log(this.userToken,"tocken");
    
    const api='https://mrf-tyres-be.onrender.com/existing-stock';
    const headers = new HttpHeaders({
      'Content-Type': 'application/json',
      'Authorization': `Bearer ${this.userToken}`
      // Add more headers as needed
    });

    this.http.get<any>(api,{headers}).subscribe(
      (response)=>{
        console.log(response);
        console.log(response.existingStock );
        //filtering according to location
      //  response.existingStock.forEach((element: { location: any; }) => {
      //     if (element.location===this.dataTransferService.location) {
      //       this.data.push(element)
      //       console.log(element);
      //     }
      //   });
        // this.data=response.existingStock;
       
        for (let index = 0; index < response.existingStock.length; index++) {
          const element = response.existingStock[index];
          if (element.location===this.logInService.getFromLocalStorage('location')) {
                  this.data.push(element)
                  console.log(element);
            }
         
        }
        this.filterData=this.data

        console.log(this.filterData);
        this.loading=false;
      },
      (error)=>
        {
          console.log(error);
          if (error.error.message=== 'No existing stock found for the given date') {
            this.toaster.error('No existing stock found for the given date','error')
          }
          this.loading=false
        }
    )
  }
  search(event:any)
  {
    this.showFilter=true;
    const searchTerm: string = event.target.value.toLowerCase(); // Convert the search term to lowercase for case-insensitive matching
    console.log('Search Term:', searchTerm);
  
  // // Filtering the data based on the entered search term
  //   this.filterData = this.data.filter(item => {
  //   // Convert tyreSize to lowercase and check if it contains the search term
  //   return item.tyreSize.toLowerCase().includes(searchTerm);
  // });

  if (searchTerm.trim() === '') {
    this.filterData = this.data;
  } else {
    // Filtering the data based on the entered search term
    this.filterData = this.data.filter(item => {
      // Convert tyreSize to lowercase and check if it contains the search term
      return item.tyreSize.toLowerCase().includes(searchTerm);
    });
  }
  
  console.log('Filtered Data:', this.filterData);
  }

}
