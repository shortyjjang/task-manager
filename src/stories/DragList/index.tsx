import React, { useRef, useState } from "react";
import { twMerge } from "tailwind-merge";

export default function DragList({
  initialTasks,
  className,
  ListItem,
  onUpdate,
}: {
  initialTasks: any[];
  className: (item: any) => string;
  ListItem: (item: any) => React.ReactNode;
  onUpdate: (updatedLists: any[]) => void;
}) {
  const [lists, setLists] = useState<any[]>(initialTasks || []);
  const [draggedItemIndex, setDraggedItemIndex] = useState<number | null>(null);
  const [draggingStyle, setDraggingStyle] = useState<React.CSSProperties>({});
  const listRef = useRef<HTMLUListElement | null>(null);
  const placeholderRef = useRef<HTMLLIElement | null>(null);

  const handleDragStart = (index: number) => {
    setDraggedItemIndex(index);
    // 드래그 시작 시 추가적인 로직이 필요하다면 여기에 추가
  };

  const handleDragOver = (index: number) => {
    if (draggedItemIndex === null || draggedItemIndex === index) return;

    const updatedLists = [...lists];
    const [movedItem] = updatedLists.splice(draggedItemIndex, 1);
    updatedLists.splice(index, 0, movedItem);

    setDraggedItemIndex(index);
    setLists(updatedLists);
    onUpdate(updatedLists);
  };

  const handleDragEnd = () => {
    setDraggedItemIndex(null);
  };

  const handleTouchStart = (index: number) => {
    setDraggedItemIndex(index);
  };

  const handleMove = (clientX: number, clientY: number) => {
    const listRect = listRef.current?.getBoundingClientRect();
    if (!listRect) return;

    const offsetY = clientY - listRect.top;
    setDraggingStyle({
      position: "absolute",
      top: `${offsetY}px`,
      left: "0",
      right: "0",
      zIndex: 1000,
      pointerEvents: "none",
    });

    const target = document.elementFromPoint(clientX, clientY);
    if (!target) return;
    const targetRect = target.getBoundingClientRect();
    const targetMiddleY = targetRect.top + targetRect.height / 2;
    const touchY = clientY;

    // 드래그 중인 항목이 대상 항목의 높이의 가운데 20%를 넘었을 때만 인덱스를 변경
    if (
      touchY > targetMiddleY - targetRect.height * 0.1 &&
      touchY < targetMiddleY + targetRect.height * 0.1
    ) {
      const newIndex = Array.from(target.parentNode!.children).indexOf(target);
      if (newIndex !== -1 && newIndex !== draggedItemIndex) {
        handleDragOver(newIndex);
      }
    }
  };

  const handleMouseMove = (e: React.MouseEvent<HTMLLIElement>) => {
    e.preventDefault();
    if (draggedItemIndex === null) return;
    const { clientX, clientY } = e;
    handleMove(clientX, clientY);
  };

  const handleTouchMove = (e: React.TouchEvent<HTMLLIElement>) => {
    e.preventDefault();
    if (draggedItemIndex === null) return;

    const touch = e.touches[0];
    handleMove(touch.clientX, touch.clientY);
  };

  const handleTouchEnd = () => {
    setDraggedItemIndex(null);
    setDraggingStyle({});
  };
  return (
    <ul className="flex flex-col gap-px relative" ref={listRef}>
      {lists.map((list, index) => (
        <React.Fragment key={list.id}>
          <li
            key={list.id}
            ref={draggedItemIndex === index ? placeholderRef : null}
            onMouseDown={() => handleDragStart(index)}
            onMouseMove={(e) => handleMouseMove(e)}
            onMouseUp={handleDragEnd}
            onTouchStart={() => handleTouchStart(index)}
            onTouchMove={(e) => handleTouchMove(e)}
            onTouchEnd={handleTouchEnd}
            className={twMerge(
              className(list),
              draggedItemIndex === index ? "bg-gray-100 absolute w-full" : ""
            )}
            style={draggedItemIndex === index ? draggingStyle : {}}
          >
            {ListItem(list)}
          </li>
          {draggedItemIndex === index && (
            <li
              className={twMerge(className(list), "bg-opacity-50 bg-white")}
              style={{
                height: placeholderRef.current?.offsetHeight,
              }}
            >
              {ListItem(list)}
            </li>
          )}
        </React.Fragment>
      ))}
    </ul>
  );
}
