export class PortfolioAppraisals {
}
export class Bindemployee {
    PMSEmpId : string;
    EmployeeName : string; 
}


export class Commonfields {
    Result : string;
    UserId : string;
}

export class gridView {
    CustomerAccountNo : string;
    AsOnDate : string;
}






export class PortfolioappraisalModel {
    Security : string;
    Quantity : string;
    UnitCost : string;
    Cost : string;

    Price : string;

    MarketValue : string;
    Gain_Loss : string;
  
    Gain_LossPer : string;
    PerAsstes : string;//PerAsstes

}


export  class SumPortfolioappraisalModel
{
    SumCost:string;
    SumMarketValue:string;
    SumGain_Loss:string;
    SumGain_LossPer:string;
    SumPerAsstes:string;
    
}


export  class cashportfolio{

    Quantity:string;
    UnitCost:string;
    Cost:string;
    Price:string;
    MarketValue:string;
    Gain_Loss:string;
    Gain_LossPer:string;
    PerAsstes:string;
   
}

export class Sumcashportfolio
{
    cash:string;
}


export class HeaderData
{
    Id:string;
    Date:string;
}

