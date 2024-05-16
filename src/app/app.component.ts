import { Component,OnInit } from '@angular/core';
import { Location } from '@angular/common';
import { Plugins } from '@capacitor/core';
import { App } from '@capacitor/app';
@Component({
  selector: 'app-root',
  templateUrl: './app.component.html',
  styleUrl: './app.component.css'
})
export class AppComponent implements OnInit {
  title = 'MrfAdmin';
  constructor(private location:Location)
{

}
  ngOnInit(): void {
      this.registerBackButtonListener();
  }
  registerBackButtonListener() {
    App['addListener']('backButton', (event: any) => {
      if (event.canGoBack) {
        // If there is a page to go back to, let the app handle it
        this.location.back();
        console.log('Back button pressed, navigating back');
      } else {
        // If there's no page to go back to, exit the app
        console.log('Back button pressed, exiting app');
        App['exitApp'](); // Close the app
      }
    });
  }

}
