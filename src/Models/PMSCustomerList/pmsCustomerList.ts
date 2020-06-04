export class  Custodian{
    CustodianCode: string;
    CustodianName: string;
}

export class PortFolio{
    PortfolioCode: string;
    PortfolioName: string;
}

export class LinkedPMSEmployee{
    EmployeeCode: string;
    EmployeeName: string;
    // SectorCode:string;
}

export class PMSCustomerListDetails{
    SrNo:any;
    CustomerListId: any;
    CustodianCode: string;
    CustodianName:string;
    ListCode:string;
    Enable:boolean;
    CustomerAccount: string;
    CustomerName: string;
}
export class PMSCustomerListCodeDetails{
    SrNo: any;
    CustomerAccount: string;
    CustomerName: string;
    PortfolioName: string;    
    InceptionDate: any;    
    EmployeeName: string;
}


export class PMSCustomerList{
    SrNo: number;
    Result: number;
    CustodianCode: string;
    ListCode: string;
    Enable: boolean;
    CustomerAccount: string;
    CustomerName: string;
    PortfolioCode: string;
   
    InceptionDate:any;
    EmployeeCode:any;
    CustomerListId:any;
}



