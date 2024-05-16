import { Component } from '@angular/core';
import { DataTransferService } from '../data-transfer.service';
import { Router } from '@angular/router';
import { LogInService } from '../log-in.service';

@Component({
  selector: 'app-location',
  templateUrl: './location.component.html',
  styleUrl: './location.component.css'
})
export class LocationComponent {
  constructor(private dataTransferService: DataTransferService,
    private router: Router  ,
    private logInService:LogInService
)
{

}

location(location: string)
{
this.dataTransferService.setLocation(location);
this.logInService.setLocation(location);
this.router.navigate(['language']);
}

}
