import { atom } from "jotai";

// 모달의 열림/닫힘 상태
export const modalAtom = atom(false);

// 모달의 제목과 메시지
export const modalContentAtom = atom<ModalContentProps>({
  title: "",
  message: "",
});

interface ModalContentProps {
  title?: string;
  message: string;
}
