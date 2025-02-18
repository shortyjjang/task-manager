export interface Todo {
  id: string;
  title: string;
  status: StatusType;
  priority: PriorityType;
  createdAt: string;
  updatedAt: string;
}
export type StatusType =  "REQUEST" | "IN_PROGRESS" | "FEEDBACK" | "COMPLETED" | "PENDING";
export type PriorityType = "NORMAL" | "LOW" | "URGENT";