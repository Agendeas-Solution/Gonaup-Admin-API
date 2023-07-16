export interface addProjectCommission {
  projectId: number
  budgetType: number
  commission: number
}

export interface candidateListByStatus {
  hiringStatus: number
  projectId: number
  page: number
  size: number
}
