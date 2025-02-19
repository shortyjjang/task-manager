import { setUser } from "@/store/reducer/userReducer";
import { Button } from "@/stories/Button";
import Input from "@/stories/Input";
import { useMutation } from "@tanstack/react-query";
import { useForm } from "react-hook-form";
import { useDispatch } from "react-redux";
import { useNavigate } from "react-router-dom";

export default function Login() {
  const { register, handleSubmit,  } = useForm();
  const dispatch = useDispatch();
  const navigate = useNavigate();
  const handleLogin = useMutation({
    mutationFn: async (data: any) => {
        const { username } = data;
        return ({
            id: username,
            username: username,
            email: username + "@gmail.com",
            thumbnail: "https://placehold.co/400",
        })
    },
    onSuccess: (data) => {
      dispatch(setUser(data));
      navigate("/");
    },
    onError: (error) => {
      console.log(error);
    },
  });
  return (
    <div className="flex-1 flex items-center justify-center">
      <form onSubmit={handleSubmit((data) => handleLogin.mutate(data))} className="w-full max-w-[calc(100vw-2rem)] md:max-w-[400px] flex flex-col gap-4">
        <Input {...register("username")} size="large" />
        <Input type="password" {...register("password")} size="large" />
        <Button type="submit" label="Login" variant="primary" size="large" />
      </form>
    </div>
  );
}
