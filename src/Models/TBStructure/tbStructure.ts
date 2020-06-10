export class TBStructure{
    SrNo: number;
    Result: number;
    CountryCode: string;
    CountryName: string;
    CustodianCode: string;
    CustodianName: string;
    ListCode: string;
    ListName: string;
    IsActive: boolean;
    TBStructureId:any;
    CustodianId:any;

    TBHeadCode: string;
    TBHeadName: string;
    ParentCode: string;
}

export class  Custodian{
    CustodianCode: string;
    CustodianName: string;
}

export class Country{
    CountryCode: string;
    CountryName: string;
}
// export class Security{
//     SrNo:any;
//     SecurityCode: string;
//     SecurityName: string;
//     SectorCode:string;
// }
export class Parent{
    ParentCode: string;
    ParentName: string;
}


