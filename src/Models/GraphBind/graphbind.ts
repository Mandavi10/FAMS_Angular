export interface Employee {
    PMSEmpId:string;
    EmployeeCode:string;
    EmployeeName:string;
    PMSId:string;
}
export interface Customer {
    CustId:string;
    PMSEmpId:string;
    CustomerCode:string;
    CustomerName:string;
    CustodianId:string;
}
export interface ReportLink {
    LinkID:string;
    LinkName:string;
}


export interface BindCapitalpie1 {
    ST:string;
    LT:string;
}

export interface BindCapitalpie1column {
    row_num:string;
    NAME:string;
}
