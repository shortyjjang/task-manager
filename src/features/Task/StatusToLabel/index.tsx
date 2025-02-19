
import { StatusType } from "@/features/Task/type";
import Badge from "@/stories/Badge";
import { twMerge } from "tailwind-merge";

const StatusToLabel = ({ status, size = "sm", className }: { status: StatusType, size?: "sm" | "md" | "lg", className?: string }) => {
  switch (status) {
    case "REQUEST":
      return <Badge variant="primary" size={size} className={twMerge('w-12', className)}>요청</Badge>;
      case "IN_PROGRESS":
        return <Badge variant="success" size={size} className={twMerge('w-12', className)}>진행중</Badge>;
      case "FEEDBACK":
        return <Badge variant="warning" size={size} className={twMerge('w-12', className)}>피드백</Badge>;
      case "COMPLETED":
        return <Badge variant="secondary" size={size} className={twMerge('w-12', className)}>완료</Badge>;
      case "PENDING":
        return <Badge variant="default" size={size} className={twMerge('w-12', className)}>보류</Badge>;
      default:
        return null;
    }
  };

export default StatusToLabel;

export const statusType = {
  REQUEST: '요청',
  IN_PROGRESS: '진행중',
  FEEDBACK: '피드백',
  COMPLETED: '완료',
  PENDING: '보류',
}