import { Component } from '@angular/core';
import { FormBuilder, FormGroup, Validators } from '@angular/forms';
import { HttpClient } from '@angular/common/http';
import { Location } from '@angular/common';
import { Router } from '@angular/router';
import { ToastrService } from 'ngx-toastr';

@Component({
  selector: 'app-sign-up',
  templateUrl: './sign-up.component.html',
  styleUrl: './sign-up.component.css'
})
export class SignUpComponent {
  signUpForm: FormGroup;
  passwordVisible = false;
  loading:boolean=false;
  goBack()
  {
    this.location.back();
  }
  constructor(private fb: FormBuilder, 
              private location: Location,
              private router: Router,
              private toaster:ToastrService,
              private http: HttpClient) {
    // Initialize the form with name, phone, password, and terms controls
    this.signUpForm = this.fb.group({
      
      phone: ['', [Validators.required, Validators.pattern(/^\d{10}$/)]],
      password: ['', [Validators.required, Validators.minLength(6)]],
      terms: [false, [Validators.requiredTrue]]
    });
  }

  // Function to toggle password visibility
  togglePasswordVisibility() {
    this.passwordVisible = !this.passwordVisible;
  }

  // Function to handle form submission
  onSubmit() {
    this.loading=true;
    if (this.signUpForm.valid) {
      // Send form data to backend server
      console.log(this.signUpForm.value)
      const formData = this.signUpForm.value;
      const requestBody={
        // name:formData.name,
        phoneNumber:formData.phone,
        password:formData.password,
        role:'owner'
      }
      console.log(requestBody,'request body');
      const apiUrl='https://mrf-tyres-be.onrender.com/owner/signup'
      this.http.post(apiUrl,requestBody).subscribe(
        response => {
          this.toaster.success("sign up",'success')
          this.loading=false;
          console.log('Form submitted successfully:', response);
          // Handle success case
        },
        error => {
          this.loading=false;
          console.error('Form submission failed:', error);
          this.toaster.error("User not Found or invalid password",'error')
          // Handle error case
        }
      );
    }
    
  }

  navToLogIn(){
    this.router.navigate(['/logIn']);

  }

}
