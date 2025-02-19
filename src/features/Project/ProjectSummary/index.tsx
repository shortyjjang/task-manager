import PriorityToLabel from '@/features/Task/PriorityToLabel'
import StatusToLabel, { statusType } from '@/features/Task/StatusToLabel'
import { StatusType, TaskType } from '@/features/Task/type'
import Badge from '@/stories/Badge'
import { IoMdTime } from 'react-icons/io'
export default function ProjectSummary({
    project,
}:{
    project: TaskType
}) {
  return (
    <>
    <h2 className="text-2xl font-bold pb-2">
      <PriorityToLabel priority={project?.priority} /> {project?.title}
    </h2>
    <div className="h-2 w-full bg-gray-200 rounded-s-full rounded-e-full mb-4">
      {((project.children || []).length || 0) > 0 && (
        <div
          className="h-2 bg-blue-500 rounded-s-full rounded-e-full"
          style={{
            width:
              (((project.children || []).filter(
                (child) => child.status === "COMPLETED"
              ).length || 0) /
                ((project.children || []).length || 0)) *
              100,
          }}
        ></div>
      )}
    </div>
    <div className="flex gap-2 flex-wrap">
      {Object.entries(statusType).map(([status, label]) =>
        status === project?.status ? (
          <StatusToLabel
            key={status}
            status={status as StatusType}
            size="md"
            className="w-auto"
          />
        ) : (
          <Badge key={status} variant="default" size="md">
            {label}
          </Badge>
        )
      )}
    </div>
    <ul className="flex flex-col gap-1 pt-4 text-gray-500 text-sm">
      <li className="flex items-center gap-2">
        <IoMdTime /> 생성일: {project?.createdAt}
      </li>
      <li className="flex items-center gap-2">
        <IoMdTime /> 마감일: {project?.dueDate}
      </li>
    </ul>
    <h4 className="font-bold pt-4 pb-1">참여자</h4>
    <div className="flex items-center gap-2 flex-wrap">
      {(project?.assigneeHistory || []).map(
        (assignee, index, _self) =>
          (_self || []).findIndex(
            (assign) =>
              assign.fromUser?.username === assignee.fromUser?.username
          ) === index && (
              <img
              key={assignee.id} 
                src={assignee.fromUser?.thumbnail}
                alt={assignee.fromUser?.username}
                className="w-10 h-10 rounded-full"
              />
          )
      )}
    </div></>
  )
}
