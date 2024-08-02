export interface taskData {
    title: string, 
    completed: boolean,
    _id: string,
    createdAt: Date
}

export interface taskType {
    title: string, 
    completed: boolean
}

export interface ApiType {
  status: "fulfilled" | "pending" | "rejected",
  error: unknown
}
