import { FaArrowUp, FaArrowDown } from "react-icons/fa";
import { PriorityType } from "@/features/Task/type";
import { twMerge } from "tailwind-merge";

const PriorityToLabel = ({ priority }: { priority: PriorityType }) => {
    const priorityClass = 'font-medium flex items-center gap-1 text-xs'
  switch (priority) {
    case "NORMAL":
      return (
        <span className={twMerge(priorityClass, '')}>
          <span className="w-2 h-2 rounded-full bg-[currentColor]"></span>
          보통
        </span>
      );
    case "LOW":
      return (
        <span className={twMerge(priorityClass, '')}>
          <FaArrowDown size={7} />
          낮음
        </span>
      );
    case "URGENT":
      return (
        <span className={twMerge(priorityClass, 'text-red-500')}>
          <FaArrowUp size={7} />
          긴급
        </span>
      );
    default:
      return null;
  }
};

export default PriorityToLabel;
