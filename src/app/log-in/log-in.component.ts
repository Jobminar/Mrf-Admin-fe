import { Component } from '@angular/core';
import { HttpClient } from '@angular/common/http';
import { Router } from '@angular/router';
import { FormBuilder,Validators } from '@angular/forms';
import { LogInService } from '../log-in.service';
import { ToastrService } from 'ngx-toastr';

@Component({
  selector: 'app-log-in',
  templateUrl: './log-in.component.html',
  styleUrl: './log-in.component.css'
})
export class LogInComponent {

  logInForm: any;
  passwordVisible = false;
  loading:boolean=false;
  constructor(private http: HttpClient,
    private router: Router,
    private fb: FormBuilder,
  private logInservice:LogInService,
  private toaster:ToastrService) {
      this.logInForm = this.fb.group({
       
        phoneNumber: ['', [Validators.required, Validators.pattern(/^\d{10}$/)]],
        password: ['', [Validators.required, Validators.minLength(6)]],
        
      });
    }

  
  login() {
    this.loading=true;
    console.log(this.logInForm.value);
    // Send login data to backend
    const apiUrl = 'https://mrf-tyres-be.onrender.com/owner/login';
  
    this.http.post(apiUrl, this.logInForm.value)
      .subscribe(
        (response) => {
          this.loading=false;
          console.log('Login successful', response);
          this.logInservice.set(response);
          this.router.navigate(['/location']);
          this.toaster.success("log in sucessFull",'success')
          // Handle success, e.g., redirect to home page
        },
        (error) => {
           this.toaster.error("User not Found or invalid password",'error')
          this.loading=false;
          if (error.status === 401) {
            console.error('Login failed: User not found or invalid password');
            this.toaster.error("User not Found or invalid password",'error')
            // Handle 401 error, e.g., display error message to user
          } else {
            console.error('Login failed:', error);
            // Handle other errors, e.g., display generic error message
          }
        }
      );
  }
  togglePasswordVisibility() {
    this.passwordVisible = !this.passwordVisible;
  }

  navToSignUp()
  {
    this.router.navigate(['/signUp']);
  }

}
