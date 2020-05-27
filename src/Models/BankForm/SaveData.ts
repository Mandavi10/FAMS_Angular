export interface SaveData {
       
    dataList: any;
    Flag: string;
    FlagValue: string;
    MandateMode: string;
    Bankaccountno: string;
    Catagorycode: string;
    Mandatetype: string;
    UMRN: string;
    UMRNDATE: string;
    Sponsorcode: string;
    Utilitycode: string;
    Authrizename: string;
    Todebit: string; 
    Withbank: string;
    Debittype: string;
    IFSC: string;
    MICR: string;
    Frequency: string;
    Amountrupees: string;
    Amount: string;     
    Email: string;
    Phoneno: string;
    Refrence1: string;
    Refrence2: string;
    PeriodFrom: string;
    PeriodTo: string;
    Untillcancelled: string;
    Customer1: string;
    Customer2: string;
    Customer3: string;

}
export interface SaveData0{

    IFSCResult:string;
}
export interface SaveData1{

    MICRResult:string;
}

export interface SaveData2{

    MandateId:string;
    Description:string;
    Status:string;
    Date:string;
    Time:string;
    result:number;
    
}
export interface SaveData3{

    Bank:string; 
    Bankname:string;    
}
export interface SaveData4{

    mandateid:string;
    MandateFreshId:string;
    ActivityId:string;
    IFSC:string;      
}
export interface SaveData5{

    IsLiveInNACH:Boolean;
  
}
export interface SaveData6{
    IsLiveIMPS:Boolean
    IsNachLive:Boolean;
    is_enach_live:Boolean; 
    FullBank:string;     
}
export interface SaveData16{
    Emailid:string;
    PhoneNumber:string;
    IsPhysical:Boolean;
    Enach:Boolean;    
    EMandatetype:string;     
}
export interface SaveData7{

    IsPhysical:Boolean;
    Enach:Boolean;
  
}
export interface SaveData8{

    result:number;
  
}
export interface EditData0{

        MandateFreshId:string;
        xmlpath:string;
        isphysical:Boolean;
        iscancel:Boolean;
        status:string;
        MandateMode:string;
        autorejectreason:string;
        IsFinalReject:Boolean;
        BankValidationAdminCount:string;
        AcValidationAdminCount:string;
        BankValidationUserCount:string;
        AcValidationUserCount:string;
        MandateId:string;
        IsNachLive:Boolean;
        IsFirstValidation:Boolean;
        IsSecondValidation:Boolean;
        enach:Boolean;
        SponsorbankCode:string;
        UtilityCode:string;
        IsScan:string;
        IsPrint:string;
        jpgpath:string;
        DateOnMandate:string;
        Customer1:string;
        Customer2:string;
        Customer3:string;
        DebitType:string;
        FrequencyType:string;
        EntityId:string;
        ToDebit:string;
        AcNo:string;
        BankName:string;
        IFSC:string;
        MICR:string;
        AmountRupees:string;
        Amount:string;
        Refrence1:string;
        Refrence2:string;
        IsSendToBank:Boolean;
        PhoneNumber:string;
        MandateStatus:string;
        AcceptRefNo:string;
        EmailId:string;
        FromDate:string;
        Todate:string;
        Enach:Boolean;
        isAccountValidation:Boolean;
        CategoryCode:string;
        EmandateBankLive:string;

}
export interface EditData1{
    MandateId :string;
   Description:string;
   Status:string;
   Date:string;
    Time :string;
}

export interface EditData2{
     amount:number;
   type :string;
}
export interface EditData3{
    amount:string;
}
export interface EditData4{
     show :string;
}