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


{path: 'StateMaster', loadChildren: './state-master/state-master.module#StateMasterModule'},
{path: 'SectorMaster', loadChildren: './sector-master/sector-master.module#SectorMasterModule'},
{path: 'DesignationMaster', loadChildren: './designation-master/designation-master.module#DesignationMasterModule'},
{path: 'CityMaster', loadChildren: './city-master/city-master.module#CityMasterModule'},
{path: 'CountryMaster', loadChildren: './country-master/country-master.module#CountryMasterModule'},
{path: 'CustodianMaster', loadChildren: './custodian-master/custodian-master.module#CustodianMasterModule'},
{path: 'SecuritiesMaster', loadChildren: './securities-master/securities-master.module#SecuritiesMasterModule'},
{path: 'PMSEmployees', loadChildren: './pmsemployees/pmsemployees.module#PMSEmployeesModule'},
{path: 'PMSCustomersList', loadChildren: './psmcustomers-list/psmcustomers-list.module#PSMCustomersListModule'},
{path: 'AllCustomers', loadChildren: './all-customers/all-customers.module#AllCustomersModule'},
{path: 'NotesMaster', loadChildren: './notes-master/notes-master.module#NotesMasterModule'},
{path: 'TBStructure', loadChildren: './tbstructure/tbstructure.module#TBstructureModule'},
{path: 'PMSProvider', loadChildren: './pmsprovider/pmsprovider.module#PMSproviderModule'},
{path: 'HoldingReport', loadChildren: './holding-report/holding-report.module#HoldingReportModule'},
{path: 'SummaryReport', loadChildren: './summary-report/summary-report.module#SummaryReportModule'},
{path: 'TBReport', loadChildren: './tbreport/tbreport.module#TBReportModule'},
{path: 'UserSetup', loadChildren: './user-setup/user-setup.module#UserSetupModule'},
{path: 'TransactionStatement', loadChildren: './transaction-statement/transaction-statement.module#TransactionStatementModule'},
{path: 'CashEquivalent', loadChildren: './cash-equivalent/cash-equivalent.module#CashEquivalentModule'},
{path: 'Customer', loadChildren: './customer/customer.module#CustomerModule'},
{path: 'Entity', loadChildren: './entity/entity.module#EntityModule'},
{path: 'TrialBalanceReport', loadChildren: './trial-balance-report/trial-balance-report.module#TrialBalanceReportModule'},
{path: 'SecuritiesCustomer', loadChildren: './securities-customer/securities-customer.module#SecuritiesCustomerModule'},
{path: 'MyNotes', loadChildren: './my-notes/my-notes.module#MynotesModule'},
{path: 'OrderProcessing', loadChildren: './order-processing/order-processing.module#OrderProcessingModule'},
{path: 'OrderProcessingNew', loadChildren: './order-processing-new/order-processing-new.module#OrderProcessingNewModule'},
{path: 'BrokerMaster', loadChildren: './broker-master/broker-master.module#BrokerMasterModule'},
{path: 'DistributorMaster', loadChildren: './distributor-master/distributor-master.module#DistributorMasterModule'},
{path: 'CapitalStatement', loadChildren: './capital-statement/capital-statement.module#CapitalStatementModule'},



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
