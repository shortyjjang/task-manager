import { UserType } from "@/store/reducer/userReducer";

export interface TaskType {
  id: string;
  title: string;
  status: StatusType;
  priority: PriorityType;
  createdAt: string;
  updatedAt: string;
  dueDate: string;
  assignee?: UserType; // 현재 할당된 사용자
  assigneeHistory: assigneeHistoryType[]; // 변경 이력 추적
  comments: CommentType[];
  children?: TaskType[];
  description?: string;
}

export type StatusType =
  | "REQUEST"
  | "IN_PROGRESS"
  | "FEEDBACK"
  | "COMPLETED"
  | "PENDING";
export type PriorityType = "NORMAL" | "LOW" | "URGENT";


export interface assigneeHistoryType {
  id: string;
  fromUser: UserType; // 변경을 수행한 사용자
  toUser?: UserType; // 새롭게 할당된 사용자 (할당 변경 시)
  updatedAt: string; // 변경된 시간
}

export interface CommentType {
  id: string;
  content: string;
  createdAt: string;
  updatedAt: string;
}
