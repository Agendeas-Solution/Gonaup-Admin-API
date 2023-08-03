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

export interface updateCandidateStatus {
  finalRate?: number
  status: number
  hRecordId: number
  userId?: number
  projectId?: number
  clientUserId?: number
}

export interface saveProjectNotification {
  projectId: number
  title: string
  content: string
}
