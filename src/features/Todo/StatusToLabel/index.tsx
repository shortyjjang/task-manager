
import { StatusType } from "@/features/Todo/interface";
import { twMerge } from "tailwind-merge";
const StatusToLabel = ({ status }: { status: StatusType }) => {
  const statusClass = 'text-white px-2 py-1 rounded-md text-xs w-12 flex justify-center items-center'
    switch (status) {
      case "REQUEST":
        return <span className={twMerge(statusClass, 'bg-blue-500')}>요청</span>;
      case "IN_PROGRESS":
        return <span className={twMerge(statusClass, 'bg-green-500')}>진행중</span>;
      case "FEEDBACK":
        return <span className={twMerge(statusClass, 'bg-orange-500')}>피드백</span>;
      case "COMPLETED":
        return <span className={twMerge(statusClass, 'bg-sky-900')}>완료</span>;
      case "PENDING":
        return <span className={twMerge(statusClass, 'bg-gray-300')}>보류</span>;
      default:
        return null;
    }
  };

export default StatusToLabel;
