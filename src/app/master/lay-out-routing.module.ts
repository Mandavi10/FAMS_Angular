import { NgModule } from '@angular/core';
import { Routes, RouterModule } from '@angular/router';

import { MainLayoutComponent } from '../main-layout/main-layout.component';
import { LoginComponent } from '../login/login.component';
import { ForgotPasswordComponent } from '../forgot-password/forgot-password.component';
import { ChangePasswordComponent } from '../change-password/change-password.component';
import {AuthGuardService } from '../Services/auth-guard.service';
import {AppSettings} from '../app-settings';
const routes: Routes = [
  { path: '', redirectTo: 'Login', pathMatch: 'full' },
  { path: 'Login', component: LoginComponent },
  { path: 'ForgotPassword', component: ForgotPasswordComponent },
  { path: 'ChangePassword', redirectTo: 'Login', pathMatch: 'full' },
  { path: 'ChangePassword/:Id', component: ChangePasswordComponent },
  {
    path: '',
        component: MainLayoutComponent,
        children: [
{path: 'Home', loadChildren: './home/home.module#HomeModule'},
{path: 'Dashboard', loadChildren: './dashboard/dashboard.module#DashboardModule'},
{path: 'NachMandate', loadChildren: './nach-mandate/nach-mandate.module#NachMandateModule'},
{path: 'UserCreation', loadChildren: './user-creation/user-creation.module#UserCreationModule'},
{path: 'CorporateRoles', loadChildren: './corporate-roles/corporate-roles.module#CorporateRolesModule'},
{path: 'CreateRequest', loadChildren: './create-request/create-request.module#CreateRequestModule'},
{path: 'BulkEmandate', loadChildren: './bulk-emandate/bulk-emandate.module#BulkEMandateModule'},
// tslint:disable-next-line:max-line-length
{path: 'StateMaster', loadChildren: './state-master/state-master.module#StateMasterModule'},
{path: 'SectorMaster', loadChildren: './sector-master/sector-master.module#SectorMasterModule'},
{path: 'DesignationMaster', loadChildren: './designation-master/designation-master.module#DesignationMasterModule'},
{path: 'CityMaster', loadChildren: './city-master/city-master.module#CityMasterModule'},
{path: 'CountryMaster', loadChildren: './country-master/country-master.module#CountryMasterModule'},
// tslint:disable-next-line:max-line-length
{path: 'DownloadMandate', loadChildren: './download-mandate/download-mandate.module#DownloadMandateModule'},

        ]
  }
];
@NgModule({
  imports: [RouterModule.forChild(routes)],
  exports: [RouterModule], providers: [
    AuthGuardService,
      { provide: 'BASE_URL', useFactory: getBaseUrl }
]
})
export class LayOutRoutingModule { }
export function getBaseUrl() {
  const BASE_URL = AppSettings.Login_URL;
    return BASE_URL;
}
