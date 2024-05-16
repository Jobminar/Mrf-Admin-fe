import { Component } from '@angular/core';
import { Router } from '@angular/router';

@Component({
  selector: 'app-landing-page',
  templateUrl: './landing-page.component.html',
  styleUrl: './landing-page.component.css'
})
export class LandingPageComponent {
  ngOnInit(): void {
    setTimeout(()=>{
      if (localStorage.getItem('tocken')) {
        this.router.navigate(['location']);
      } else {
        this.router.navigate(['logIn'])
      }
      
    },4000)
}
constructor(private router:Router)
{

}
}
