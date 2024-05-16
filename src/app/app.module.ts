import { NgModule } from '@angular/core';
import { BrowserModule } from '@angular/platform-browser';
import { FormsModule,ReactiveFormsModule } from '@angular/forms';
import { HttpClientModule } from '@angular/common/http';


import { AppRoutingModule } from './app-routing.module';
import { AppComponent } from './app.component';
import { LandingPageComponent } from './landing-page/landing-page.component';
import { LanguageComponent } from './language/language.component';
import { LocationComponent } from './location/location.component';
import { OpeningStockComponent } from './opening-stock/opening-stock.component';

import { SalesReportComponent } from './sales-report/sales-report.component';
import { ClosingStockComponent } from './closing-stock/closing-stock.component';
import { SpecialRequestComponent } from './special-request/special-request.component';
import { LogInComponent } from './log-in/log-in.component';
import { SignUpComponent } from './sign-up/sign-up.component';
import { StockUpdateComponent } from './stock-update/stock-update.component';

import { BrowserAnimationsModule } from '@angular/platform-browser/animations';
import { ToastrModule } from 'ngx-toastr';
import { MatProgressSpinnerModule } from '@angular/material/progress-spinner';
import { provideAnimationsAsync } from '@angular/platform-browser/animations/async';
import { SearchComponent } from './search/search.component';
import { UpdateComponent } from './update/update.component';
import { AddUserComponent } from './add-user/add-user.component';
import { ExistingStockComponent } from './existing-stock/existing-stock.component';
@NgModule({
  declarations: [
    AppComponent,
    LandingPageComponent,
    LanguageComponent,
    LocationComponent,
    OpeningStockComponent,
   
    SalesReportComponent,
    ClosingStockComponent,
    SpecialRequestComponent,
    LogInComponent,
    SignUpComponent,
    StockUpdateComponent,
    SearchComponent,
    UpdateComponent,
    AddUserComponent,
    ExistingStockComponent
  ],
  imports: [
    BrowserModule,
    AppRoutingModule,
    FormsModule,
    HttpClientModule,
    ReactiveFormsModule,
    BrowserAnimationsModule,
    ToastrModule.forRoot(),
    MatProgressSpinnerModule
  ],
  providers: [
    provideAnimationsAsync()
  ],
  bootstrap: [AppComponent]
})
export class AppModule { }
