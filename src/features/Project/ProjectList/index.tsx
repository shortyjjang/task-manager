import React from "react";
import { PriorityType, StatusType, TaskType } from "@/features/Task/type";
import { useQuery } from "@tanstack/react-query";
import StatusToLabel, { statusType } from "@/features/Task/StatusToLabel";
import PriorityToLabel from "@/features/Task/PriorityToLabel";
import { useNavigate } from "react-router-dom";

export default function ProjectList() {
  const { data: projects } = useQuery<TaskType[]>({
    queryKey: ["project"],
    queryFn: () => {
      return Array.from({ length: 10 }, (_, index) => ({
        ...dummyProjects,
        id: `${index}`,
        title: `Project ${index + 1}`,
        status: (Object.keys(statusType) || [])[index % (Object.keys(statusType) || [])?.length] as StatusType,
        priority: (index % 3 === 0 ? "URGENT" : index % 3 === 1 ? "LOW" : "NORMAL") as PriorityType,
      }));
    },
  });
  const navigate = useNavigate();
  return (
    <div className="flex flex-col gap-2 flex-1">
      <h3 className="text-lg font-bold">프로젝트 목록</h3>
      <div className="flex flex-col gap-2 text-sm text-gray-700 flex-1 overflow-y-auto shadow border border-gray-200 rounded-md p-4">
        {(projects || []).length > 0 ? (
          projects?.map((project) => (
            <div
              key={project.id}
              onClick={() => navigate(`/project/${project.id}`)}
              className="grid grid-cols-[90px_auto_100px_100px] gap-2 cursor-pointer"
            >
              <div className="flex items-center gap-2">
                <StatusToLabel status={project.status} />
                <PriorityToLabel priority={project.priority} />
              </div>
              <div>
                <h4 className="text-black font-bold">
                  {project.title}
                </h4>
                <p className="text-gray-500 text-xs">{project.description}</p>
              </div>
              <p>{project.createdAt}</p>
              <p>{project.dueDate}</p>
            </div>
          ))
        ) : (
          <div className="text-center text-gray-500">프로젝트가 없습니다.</div>
        )}
      </div>
    </div>
  );
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
