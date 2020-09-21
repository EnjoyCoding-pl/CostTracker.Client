export interface Part {
    id: string,
    name: string,
    budget: number,
    startDate: string,
    endDate: string,
    totalCost?: number,
    budgetReserve?: number
}