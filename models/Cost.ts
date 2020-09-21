export interface Cost {
    id: string,
    name: string,
    amount: number,
    vatRate: number,
    isRefund: boolean,
    invoiceUrl: string
}