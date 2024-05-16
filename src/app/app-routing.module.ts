import { NgModule } from '@angular/core';
import { RouterModule, Routes } from '@angular/router';
import { LandingPageComponent } from './landing-page/landing-page.component';
import { LanguageComponent } from './language/language.component';
import { LocationComponent } from './location/location.component';
import { OpeningStockComponent } from './opening-stock/opening-stock.component';
import { SalesReportComponent } from './sales-report/sales-report.component';
import { SpecialRequestComponent } from './special-request/special-request.component';
import { StockUpdateComponent } from './stock-update/stock-update.component';
import { ClosingStockComponent } from './closing-stock/closing-stock.component';
import { LogInComponent } from './log-in/log-in.component';
import { SignUpComponent } from './sign-up/sign-up.component';
import { SearchComponent } from './search/search.component';
import { UpdateComponent } from './update/update.component';
import { AddUserComponent } from './add-user/add-user.component';
import { ExistingStockComponent } from './existing-stock/existing-stock.component';

const routes: Routes = [
  {path:'',component:LandingPageComponent},
  {path:'logIn',component:LogInComponent},
  {path:'signUp',component:SignUpComponent},
  {path :'landing',component:LandingPageComponent},
  {path:'language',component:LanguageComponent},
  {path:'location',component:LocationComponent},
  {path:'opening-stock',component:OpeningStockComponent},
  {path:'sales-report',component:SalesReportComponent},
  {path:'special-request',component:SpecialRequestComponent},
  {path:'stock-update',component:StockUpdateComponent},
  {path:'closing-stock',component:ClosingStockComponent},
  {path:'scearch',component:SearchComponent},
  {path:'update',component:UpdateComponent},
  {path:'addUser',component:AddUserComponent},
  {path:'existingStock',component:ExistingStockComponent}
];

@NgModule({
  imports: [RouterModule.forRoot(routes)],
  exports: [RouterModule]
})
export class AppRoutingModule { }
