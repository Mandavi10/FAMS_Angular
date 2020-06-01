export class SecurityDetails{
    SrNo: number;
    Result: number;
    CountryCode: string;
    CountryName: string;
    CustodianCode: string;
    CustodianName: string;
    ListCode: string;
    ListName: string;
    IsActive: boolean;
    SecurityDetailId:any;
    CustodianId:any;
}

export class  Custodian{
    CustodianCode: string;
    CustodianName: string;
}

export class Country{
    CountryCode: string;
    CountryName: string;
}

export class SecurityCodeDetails{
    SecurityCode: string;
    SecurityName: string;
    // SectorCode:string;
}

export class Security{
    SrNo:any;
    SecurityCode: string;
    SecurityName: string;
    SectorCode:string;
}
export class Sector{
    SectorCode: string;
    SectorName: string;
}


