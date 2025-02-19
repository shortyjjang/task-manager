import BarChartComponent from "@/features/Chart/BarChart";
import ShapePieChart from "@/features/Chart/ShapePieChart";
import ProjectList from "@/features/Project/ProjectList";
import { statusType } from "@/features/Task/StatusToLabel";
import TaskList from "@/features/Task/TaskList";
import { StatusType } from "@/features/Task/type";
import { useQuery } from "@tanstack/react-query";
import React, { useEffect, useRef, useState } from "react";
import useDebounce from '@/hooks/useDebounce';

function Home() {
  const graphTitleRef = useRef<HTMLHeadingElement>(null);
  const [graphTitleWidth, setGraphTitleWidth] = useState(0);
  const { data: monthlyReportData, isSuccess: isMonthlyReportDataSuccess } =
    useQuery({
      queryKey: ["monthlyReportData"],
      queryFn: () => {
        return dummyMonthlyReportData.map((item) => ({
          name: statusType[item.name as StatusType],
          value: item?.value || 0,
        }));
      },
    });
  const { data: userTaskData, isSuccess: isUserTaskDataSuccess } = useQuery({
    queryKey: ["userTaskData"],
    queryFn: () => {
      return dummyUserTaskData;
    },
  });

  const updateGraphTitleWidth = () => {
    if (graphTitleRef.current) {
      setGraphTitleWidth((graphTitleRef.current.offsetWidth - 90) / 2);
    }
  };

  const debouncedUpdateGraphTitleWidth = useDebounce(updateGraphTitleWidth, 100);

  useEffect(() => {
    updateGraphTitleWidth();

    window.addEventListener('resize', debouncedUpdateGraphTitleWidth);
    return () => {
      window.removeEventListener('resize', debouncedUpdateGraphTitleWidth);
    };
  }, [debouncedUpdateGraphTitleWidth]);

  return (
    <div className="min-h-screen p-6 lg:grid grid-cols-[auto_300px] gap-6">
      <div
        className="flex flex-col gap-6 flex-1 overflow-hidden max-w-full"
      >
        <div className="flex gap-6 w-full" ref={graphTitleRef}>
          <div className="shadow border border-gray-200 rounded-md w-full p-4 overflow-hidden">
            <h3 className="text-lg font-bold">이번달 업무 리포트</h3>
            {isMonthlyReportDataSuccess && graphTitleWidth > 0 && (
              <ShapePieChart
                data={monthlyReportData}
                height={240}
                width={graphTitleWidth}
              />
            )}
          </div>
          <div className="shadow border border-gray-200 rounded-md w-full p-4 overflow-hidden">
            <h3 className="text-lg font-bold">직원별 업무 할당</h3>
            <div className="pt-8">
              {isUserTaskDataSuccess && graphTitleWidth > 0 && (
                <BarChartComponent
                  data={userTaskData}
                  colors={['#8884d8', '#82ca9d', '#ffc658']}
                  height={200}
                  width={graphTitleWidth}
                  margin={{ top: 0, right: 0, left: 0, bottom: 0 }}
                />
              )}
            </div>
          </div>
        </div>
        <ProjectList />
      </div>
      <div className="flex flex-col gap-2">
        <h3 className="text-lg font-bold">내 업무 목록</h3>
        <div className="shadow border border-gray-200 rounded-md">
          <TaskList isShowUser={true} initialTasks={[]} />
        </div>
      </div>
    </div>
  );
}

export default Home;

const dummyMonthlyReportData: {
  name: StatusType;
  value: number;
}[] = [
  {
    name: "REQUEST",
    value: 500,
  },
  {
    name: "IN_PROGRESS",
    value: 1400,
  },
  {
    name: "FEEDBACK",
    value: 50,
  },
  {
    name: "COMPLETED",
    value: 400,
  },
  {
    name: "PENDING",
    value: 200,
  },
];

const dummyUserTaskData = [
  {
    name: "Jane",
    project1: 4000,
    project2: 2400,
    project3: 2400,
  },
  {
    name: "John",
    project1: 3000,
    project2: 1398,
    project3: 2210,
  },
  {
    name: "Mike",
    project1: 2000,
    project2: 9800,
    project3: 2290,
  },
  {
    name: "Alex",
    project1: 2780,
    project2: 3908,
    project3: 2000,
  },
  {
    name: "Danny",
    project1: 1890,
    project2: 4800,
    project3: 2181,
  },
  {
    name: "Tomy",
    project1: 2390,
    project2: 3800,
    project3: 2500,
  },
  {
    name: "Assum",
    project1: 3490,
    project2: 4300,
    project3: 2100,
  },
];
