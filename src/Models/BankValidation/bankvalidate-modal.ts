export class BankvalidateModal {
    IFSCResult: string;
}
export class MICRResultModal {
    MICRResult: string;
}
export class BankNameModal {
    BankName: string;
}

export class MandateDataModal {
    MandateId: string;
    Description: string;
    Status: string;
    Date: string;
    Time: string;
}
export class MandateActivityDataModal {
    
    MandateId: string;
    ActivityId: any;
    IFSC: string;
}
export class IsLiveInNACHModal {
    IsLiveInNACH: any;
}

export class EMandateDataModal {
    
     IsLiveIMPS: any;
     IsNachLive: any;
     is_enach_live: any;//emandate
     FullBank: string;
     DebitCard: string;
     NetBanking: string;
}
export class EMandateTypeDataModal {
    
     Emailid: string;
     PhoneNumber: string;
     IsPhysical: any;
     Enach: any;
     EMandatetype: string;
}
export class PostJsondata {
    AppId: string;
    MandateId: string;
    UserId: string;
}


