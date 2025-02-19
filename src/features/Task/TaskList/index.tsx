import { useMutation } from "@tanstack/react-query";
import StatusToLabel from "@/features/Task/StatusToLabel";
import PriorityToLabel from "@/features/Task/PriorityToLabel";
import { twMerge } from "tailwind-merge";
import DragList from "@/stories/DragList";
import { TaskType } from "../type";

export default function TaskList({
  isShowUser = false,
  initialTasks,
}: {
  isShowUser?: boolean;
  initialTasks: TaskType[];
}) {

  const saveTasks = useMutation({
    mutationFn: async (tasks: TaskType[]) => {
      // 실제 서버에 저장하는 로직이 여기에 들어가야 합니다.
      // 예를 들어, fetch API를 사용하여 서버에 요청을 보낼 수 있습니다.
      return Promise.resolve(tasks);
    },
  });

  if (initialTasks.length > 0) {
    return (
      <DragList
        initialTasks={initialTasks}
        className={(task: TaskType) =>
          twMerge(
            "flex gap-2 items-center text-sm px-2 py-1 hover:bg-gray-100 cursor-pointer bg-white rounded-sm",
            task?.status === "COMPLETED" || task?.status === "PENDING"
              ? "text-gray-400"
              : ""
          )
        }
        ListItem={(task: TaskType) => (
          <>
            <StatusToLabel status={task.status} />
            <PriorityToLabel priority={task.priority} />
            <h3
              className={twMerge(
                "line-clamp-1 flex items-center gap-2 flex-1 justify-between",
                task?.status === "COMPLETED" || task?.status === "PENDING"
                  ? "line-through"
                  : ""
              )}
            >
              {task.title}
              {isShowUser && (
                <span className="w-8 h-8 rounded-full bg-gray-200 overflow-hidden">
                  <img
                    src={task.assignee?.thumbnail || "https://placehold.co/400"}
                    alt={task.assignee?.username}
                    className="w-full h-full object-cover"
                  />
                </span>
              )}
            </h3>
          </>
        )}
        onUpdate={(updatedLists) => {
          saveTasks.mutate(updatedLists);
        }}
      />
    );
  }
  return <div className="text-gray-500 text-center py-20">업무가 없습니다.</div>;
}

