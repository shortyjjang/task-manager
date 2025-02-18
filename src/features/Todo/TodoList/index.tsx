import { useState } from "react";
import { useMutation, useQuery } from "@tanstack/react-query";
import StatusToLabel from "@/features/Todo/StatusToLabel";
import PriorityToLabel from "@/features/Todo/PriorityToLabel";
import { Todo } from "@/features/Todo/interface";
import { twMerge } from "tailwind-merge";
import DragList from "@/stories/DragList";

export default function TodoList() {
  const { data: initialTodos, refetch } = useQuery<Todo[]>({
    queryKey: ["todos"],
    queryFn: () => {
      setTodos(dummyTodos);
      return dummyTodos;
    },
  });

  const [todos, setTodos] = useState<Todo[]>(initialTodos || []);

  const saveTodos = useMutation({
    mutationFn: async (todos: Todo[]) => {
      // 실제 서버에 저장하는 로직이 여기에 들어가야 합니다.
      // 예를 들어, fetch API를 사용하여 서버에 요청을 보낼 수 있습니다.
      return Promise.resolve(todos);
    },
    onSuccess: () => {
      refetch();
    },
  });

  if (todos.length > 0) {
    return (
      <DragList
        initialTodos={todos || []}
        className={(todo: Todo) =>
          twMerge(
            "flex gap-2 items-center text-sm px-2 py-1 hover:bg-gray-100 cursor-pointer bg-white",
            todo?.status === "COMPLETED" || todo?.status === "PENDING"
              ? "text-gray-400"
              : ""
          )
        }
        ListItem={(todo: Todo) => (
          <>
            <StatusToLabel status={todo.status} />
            <PriorityToLabel priority={todo.priority} />
            <h3
              className={twMerge(
                "line-clamp-1",
                todo?.status === "COMPLETED" || todo?.status === "PENDING"
                  ? "line-through"
                  : ""
              )}
            >
              {todo.title}
            </h3>
          </>
        )}
        onUpdate={(updatedLists) => {
          saveTodos.mutate(updatedLists);
        }}
      />
    );
  }
  return null;
}

const dummyTodos: Todo[] = [
  {
    id: "1",
    title: "로그인 페이지 구현",
    status: "IN_PROGRESS",
    priority: "NORMAL",
    createdAt: "2024-01-01",
    updatedAt: "2024-01-01",
  },
  {
    id: "2",
    title: "로그아웃 기능 구현",
    status: "REQUEST",
    priority: "LOW",
    createdAt: "2024-01-01",
    updatedAt: "2024-01-01",
  },
  {
    id: "3",
    title: "회원가입 페이지 구현",
    status: "FEEDBACK",
    priority: "URGENT",
    createdAt: "2024-01-01",
    updatedAt: "2024-01-01",
  },
  {
    id: "4",
    title: "회원가입 페이지 구현",
    status: "COMPLETED",
    priority: "NORMAL",
    createdAt: "2024-01-01",
    updatedAt: "2024-01-01",
  },
  {
    id: "5",
    title: "회원가입 페이지 구현",
    status: "PENDING",
    priority: "NORMAL",
    createdAt: "2024-01-01",
    updatedAt: "2024-01-01",
  },
];
