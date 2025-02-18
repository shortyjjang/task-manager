import React from "react";
import { TaskType } from "@/features/Task/interface";
import { useQuery } from "@tanstack/react-query";
import StatusToLabel from "@/features/Task/StatusToLabel";
import PriorityToLabel from "@/features/Task/PriorityToLabel";
import TaskList from "../Task/TaskList";
import { IoMdTime } from "react-icons/io";

export default function Project() {
  const { data: project } = useQuery<TaskType>({
    queryKey: ["project"],
    queryFn: () => {
      return dummyProjects;
    },
  });
  if (project) {
    return (
      <div>
        <h2 className="text-2xl font-bold pb-2">
          <PriorityToLabel priority={project?.priority} /> {project?.title}
        </h2>
        <div className="h-2 w-full bg-gray-200 rounded-s-full rounded-e-full mb-4">
          {((project.children || []).length || 0) > 0 && (
            <div
              className="h-2 bg-blue-500 rounded-s-full rounded-e-full"
              style={{
                width:
                  ((project.children || []).filter(
                    (child) => child.status === "COMPLETED"
                  ).length || 0) / ((project.children || []).length || 0) * 100,
              }}
            ></div>
          )}
        </div>
        <StatusToLabel status={project?.status} />
        <ul className="flex flex-col gap-1 pt-4 text-gray-500 text-sm">
          <li className="flex items-center gap-2">
            <IoMdTime /> 생성일: {project?.createdAt}
          </li>
          <li className="flex items-center gap-2">
            <IoMdTime /> 마감일: {project?.dueDate}
          </li>
        </ul>
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
  assigneeHistory: [],
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
