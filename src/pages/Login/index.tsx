import { modalAtom, modalContentAtom } from "@/atoms/modalAtom";
import { setUser } from "@/store/reducer/userReducer";
import { Button } from "@/stories/Button";
import Input from "@/stories/Input";
import { useSetAtom } from "jotai";
import { useForm } from "react-hook-form";
import { useDispatch } from "react-redux";
import { useNavigate } from "react-router-dom";

export default function Login() {
  const { register, handleSubmit } = useForm();
  const dispatch = useDispatch();
  const navigate = useNavigate();
  const setModalContent = useSetAtom(modalContentAtom);
  const toggleModal = useSetAtom(modalAtom);
  const handleLogin = async (data: any) => {
    const { username, password } = data;
    if (!username || !password) {
      setModalContent({
        message: "아이디와 비밀번호를 입력해주세요.",
      });
      toggleModal(true);
      return;
    }
    const response = {
      id: username,
      username: username,
      email: username + "@gmail.com",
      thumbnail: "https://placehold.co/400",
    };
    dispatch(setUser(response));
    navigate("/");
  };
  return (
    <div className="flex-1 flex items-center justify-center">
      <form
        onSubmit={handleSubmit(handleLogin)}
        className="w-full max-w-[calc(100vw-2rem)] md:max-w-[400px] flex flex-col gap-4"
      >
        <Input {...register("username")} size="large" />
        <Input type="password" {...register("password")} size="large" />
        <Button type="submit" label="Login" variant="primary" size="large" />
      </form>
    </div>
  );
}
