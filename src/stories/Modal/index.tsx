import { modalAtom, modalContentAtom } from "@/atoms/modalAtom";
import { useAtomValue, useSetAtom } from "jotai";
import { useCallback, useEffect, useState } from "react";
import { Button } from "../Button";

export default function Modal() {
  const isOpen = useAtomValue(modalAtom); // 읽기 전용
  const toggleModal = useSetAtom(modalAtom); // 상태 변경 전용
  const content = useAtomValue(modalContentAtom); // 읽기 전용
  const [opacity, setOpacity] = useState(0);
  const handleClose = useCallback(() => {
    setOpacity(0);
    setTimeout(() => {
      toggleModal(false);
    }, 300);
  }, [toggleModal]);
  const handleOpen = useCallback(() => {
    setOpacity(1);
    setTimeout(() => {
      toggleModal(true);
    }, 300);
  }, [toggleModal]);
  useEffect(() => {
    if (isOpen) {
      handleOpen();
    }
  }, [handleOpen, isOpen]);
  if (isOpen)
    return (
      <div
        className="fixed inset-0 flex items-center justify-center bg-black bg-opacity-50 transition-opacity duration-300 overflow-y-auto"
        style={{ opacity }}
        onClick={(e) => {
          if (e.target === e.currentTarget) {
            handleClose();
          }
        }}
      >
        <div className="bg-white rounded-md p-6 max-w-screen-sm flex flex-col gap-4">
        <div className="text-sm text-gray-800">
          {content.title && (
            <h3 className="text-base text-black font-bold pb-2">{content.title}</h3>
          )}
            {content.message}
          </div>
          <div className="flex justify-end">
            <Button onClick={handleClose} label="확인" size="small" />
          </div>
        </div>
      </div>
    );
  return null;
}
