import { Component, OnInit } from '@angular/core';
import { CurrentportfolioService } from 'src/app/Services/CurrentPortFolio/currentportfolio.service';
import{DbsecurityService}from 'src/app/Services/dbsecurity.service';
import { Router, ActivatedRoute } from '@angular/router';
import { FormsModule, FormBuilder, FormControl, FormGroup, Validators } from '@angular/forms';
import {Currentportfolio} from '../../../Models/CurrentPortfolio/currentportfolio';



@Component({
  selector: 'app-current-portfolio',
  templateUrl: './current-portfolio.component.html',
  styleUrls: ['./current-portfolio.component.css']
})
export class CurrentPortfolioComponent implements OnInit {
  divMainGrid :boolean=false;
  isShowLoader:boolean=false;CurrentPortfolioForm : FormGroup;loading: boolean = false;
  CurrentportfolioList : Currentportfolio;
  constructor(private router: Router, private formBuilder: FormBuilder,private _CurrentportfolioService: CurrentportfolioService,private Dbsecurity: DbsecurityService) { }
  CurrentDate = new Date();

  ngOnInit() {
    this.CurrentPortfolioForm = this.formBuilder.group({  
      FromDate :[''], ToDate : ['']
  });
  }

  BindCurrentPortFolioReport(FromDate,ToDate) {

    debugger;
    this.loading = true;
    var currentContext = this;

    // this.FromDate = this.datepipe.transform(FromDate, 'dd-MM-yyyy');
    // this.ToDate = this.datepipe.transform(ToDate, 'dd-MM-yyyy');
    this.divMainGrid=true;
    let Sessionvalue = JSON.parse(sessionStorage.getItem('User'));
    var UserId = Sessionvalue.UserId;
    var JsonData ={
      "UserId" : UserId,
      "FromDate" :   FromDate,   
      "ToDate" :  ToDate         
    }
 
    this._CurrentportfolioService.BindGridAllFields(JsonData).
        subscribe((data) => {
          debugger;
          this.CurrentportfolioList = data.Table;

            // currentContext.gridAllFields = data.Table;
            // currentContext.gridAllFields1 = data.Table1;
            // currentContext.gridAllFields2 = data.Table2;
            // currentContext.gridAllFields3 = data.Table3;
            // currentContext.gridAllFields4 = data.Table4;   
            // currentContext.gridAllFields5 = data.Table5;    
              
            // if(data.Table.length>0)      
            // {
            //   this.IsEquity=true;
            // }
            // else
            // {
            //   this.IsEquity=false;
            // }
            // if(data.Table2.length>0)      
            // {
            //   this.IsCashAndEquiv=true;
            // }
            // else
            // {
            //   this.IsCashAndEquiv=false;
            // }
        });
    // console.log(sessionStorage.getItem('ID'));
    this.loading = false;
  }

}
