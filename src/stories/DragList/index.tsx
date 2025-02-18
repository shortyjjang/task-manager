import React, { useEffect, useState } from "react";

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
  const [isTouchDevice, setIsTouchDevice] = useState<boolean>(false);

  useEffect(() => {
    const mediaQuery = window.matchMedia("(pointer: coarse)");
    setIsTouchDevice(mediaQuery.matches);

    const handleMediaChange = (e: MediaQueryListEvent) => {
      setIsTouchDevice(e.matches);
    };

    mediaQuery.addEventListener("change", handleMediaChange);
    return () => mediaQuery.removeEventListener("change", handleMediaChange);
  }, []);

  const handleDragStart = (index: number) => {
    setDraggedItemIndex(index);
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

  const handleTouchMove = (e: React.TouchEvent) => {
    e.preventDefault();
    if (draggedItemIndex === null) return;

    const touch = e.touches[0];
    const target = document.elementFromPoint(touch.clientX, touch.clientY);
    if (!target) return;

    const newIndex = Array.from(target.parentNode!.children).indexOf(target);
    if (newIndex !== -1 && newIndex !== draggedItemIndex) {
      handleDragOver(newIndex);
    }
  };

  const handleTouchEnd = () => {
    setDraggedItemIndex(null);
  };
  return (
    <ul className="flex flex-col gap-px">
      {lists.map((list, index) => (
        <li
          key={list.id}
          draggable={!isTouchDevice}
          onDragStart={() => handleDragStart(index)}
          onDragOver={(e) => {
            e.preventDefault();
            handleDragOver(index);
          }}
          onDragEnd={handleDragEnd}
          onTouchStart={() => handleTouchStart(index)}
          onTouchMove={handleTouchMove}
          onTouchEnd={handleTouchEnd}
          className={className(list)}
        >
          {ListItem(list)}
        </li>
      ))}
    </ul>
  );
}
