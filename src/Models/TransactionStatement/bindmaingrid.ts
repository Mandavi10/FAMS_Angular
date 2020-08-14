export class BindmaingridHeader {
    Date:any;
}

export class BindmaingridDetails {
    TransactionDesc: string;
    TransactionDate: string;
    SettlementDate: string;
    Security: string;
    Exchange: string;
    Quantity: string;
    UnitPrice: string;
    Brkg: string;
    STT: string;
    SettlementAmount: string;
}

export class BindmaingridDetailsSummary {
    TransactionDesc: string;
    PreviousPeriodTranNotSettle: string;
    PreviousPeriodTranSettledCurrentPeriod: string;
    CurrentPeriodTranSettledDuringPeriod: string;
    CurrentPeriodTranNotSettled: string;
    TotalCurrentPeriodTran: string;
    TotalCurrentPeriodSettled: string;
}

export class TransactionStatementView {
    SrNo : string;
    FromDate : string;
    ToDate : string;
    CustomerAccount : string;
    Scheme : string;
    DownloadLink : string;
    ReportType : string;
    ReportName : string;
}

