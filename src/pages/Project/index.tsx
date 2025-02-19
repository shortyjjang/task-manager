import { TaskType } from "@/features/Task/type";
import { useQuery } from "@tanstack/react-query";
import TaskList from "@/features/Task/TaskList"
import { useParams } from "react-router-dom";
import ProjectSummary from "@/features/Project/ProjectSummary";

export default function Project() {
  const { id } = useParams();
  const { data: project } = useQuery<TaskType>({
    queryKey: ["project", id],
    queryFn: () => {
      return dummyProjects;
    },
  });
  if (project) {
    return (
      <div className="p-4">
        <ProjectSummary project={project} />
        <h3 className="text-lg font-bold pt-4 pb-2">하위 테스트</h3>
        <div className="shadow border border-gray-200 rounded-md p-4">
          <TaskList isShowUser={true} initialTasks={project?.children || []} />
        </div>
      </div>
    );
  }
  return null;
}

const dummyProjects: TaskType = {
  id: "1",
  title: "Project 1",
  description: "Project 1 description",
  status: "REQUEST",
  priority: "NORMAL",
  createdAt: "2024-01-01",
  updatedAt: "2024-01-01",
  dueDate: "2024-01-01",
  assigneeHistory: [
    {
      id: "1",
      fromUser: {
        id: "1",
        username: "John Doe",
        email: "john.doe@example.com",
        thumbnail: "https://placehold.co/400",
      },
      toUser: {
        id: "2",
        username: "Hong Gil Dong",
        email: "hong.gil.dong@example.com",
        thumbnail: "https://placehold.co/400",
      },
      updatedAt: "2024-01-01",
    },
  ],
  comments: [],
  children: [
    {
      id: "1",
      title: "로그인 페이지 구현",
      status: "IN_PROGRESS",
      priority: "NORMAL",
      createdAt: "2024-01-01",
      updatedAt: "2024-01-01",
      dueDate: "2024-01-01",
      assigneeHistory: [],
      comments: [],
      children: [],
    },
    {
      id: "2",
      title: "로그아웃 기능 구현",
      status: "REQUEST",
      priority: "LOW",
      createdAt: "2024-01-01",
      updatedAt: "2024-01-01",
      dueDate: "2024-01-01",
      assigneeHistory: [],
      comments: [],
      children: [],
    },
    {
      id: "3",
      title: "회원가입 페이지 구현",
      status: "FEEDBACK",
      priority: "URGENT",
      createdAt: "2024-01-01",
      updatedAt: "2024-01-01",
      dueDate: "2024-01-01",
      assigneeHistory: [],
      comments: [],
      children: [],
    },
    {
      id: "4",
      title: "회원가입 페이지 구현",
      status: "COMPLETED",
      priority: "NORMAL",
      createdAt: "2024-01-01",
      updatedAt: "2024-01-01",
      dueDate: "2024-01-01",
      assigneeHistory: [],
      comments: [],
      children: [],
    },
    {
      id: "5",
      title: "회원가입 페이지 구현",
      status: "PENDING",
      priority: "NORMAL",
      createdAt: "2024-01-01",
      updatedAt: "2024-01-01",
      dueDate: "2024-01-01",
      assigneeHistory: [],
      comments: [],
      children: [],
    },
  ],
};
