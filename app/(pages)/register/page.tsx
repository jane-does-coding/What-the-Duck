"use client";

import { useState } from "react";
import { FieldValues, useForm, SubmitHandler } from "react-hook-form";
import { signIn } from "next-auth/react";
import { useRouter } from "next/navigation";
import axios from "axios";
import toast from "react-hot-toast";

import checkPassword from "@/app/actions/checkPassword";
import Input from "@/components/Inputs/Input";
import Link from "next/link";

const RegisterPage = () => {
	const [isLoading, setIsLoading] = useState(false);
	const router = useRouter();

	const {
		register,
		handleSubmit,
		formState: { errors },
	} = useForm<FieldValues>({
		defaultValues: {
			name: "",
			username: "",
			email: "",
			password: "",
		},
	});

	const onSubmit: SubmitHandler<FieldValues> = async (data) => {
		setIsLoading(true);

		try {
			const isValidPassword = await checkPassword(data.password);
			if (isValidPassword.error) {
				toast.error(isValidPassword.error);
				setIsLoading(false);
				return;
			}

			await axios.post("/api/register", data);

			const callback = await signIn("credentials", {
				...data,
				redirect: false,
			});

			setIsLoading(false);

			if (callback?.ok) {
				toast.success("Logged in");
				router.push("/");
				router.refresh();
			}

			if (callback?.error) toast.error(callback.error);
		} catch (err) {
			console.log(err);
			toast.error("Something went wrong");
			setIsLoading(false);
		}
	};

	return (
		<div className="flex items-center justify-center min-h-screen max-h-screen h-screen w-full relative overflow-hidden px-4 bg-white">
			<img
				src="/leaf-divider-long.png"
				className="rotate-90 absolute top-[50vh] right-[-70vh] w-[175vh]"
				alt=""
			/>
			<img
				src="/leaf-divider-long.png"
				className="rotate-90 absolute top-[50vh] left-[-70vh] w-[175vh]"
				alt=""
			/>

			<div className="relative w-[40vw] max-w-[40vw] bg-[#F7F4EA] border-2 border-black rounded-[3vh] p-[4vh] px-0 shadow-[6px_6px_0px_rgba(0,0,0,1)]">
				{/* little ducky images for style */}
				<img
					src="/ducky-mail.png"
					className="w-[15vh] absolute top-[-8vh] left-[-8vh] rotate-[-10deg]"
				/>
				<img
					src="/ducky-bowtime.png"
					className="w-[15vh] absolute bottom-[-8vh] right-[-8vh] rotate-[10deg] scale-x-[-1]"
				/>

				<h2 className="hand text-[10vh] leading-[9vh] text-center mb-[2vh]">
					Sign Up
				</h2>
				<p className="text-center text-[2.5vh] mb-[3vh] font-bold">
					Create your account and start ducking around.
				</p>

				<form
					onSubmit={handleSubmit(onSubmit)}
					className="flex flex-col gap-[1vh]"
				>
					<div className="flex gap-[1vh] mx-[4vh]">
						<Input
							id="name"
							label="Full Name"
							disabled={isLoading}
							errors={errors}
							required
							register={register}
						/>

						<Input
							id="username"
							label="Username"
							disabled={isLoading}
							errors={errors}
							required
							register={register}
						/>
					</div>

					<div className="mx-[4vh] flex flex-col gap-[1vh]">
						<Input
							id="email"
							label="Email"
							disabled={isLoading}
							errors={errors}
							required
							register={register}
						/>

						<Input
							id="password"
							label="Password"
							type="password"
							disabled={isLoading}
							errors={errors}
							required
							register={register}
						/>
					</div>

					<img src="/divider.png" className="" alt="" />

					<div className="mx-[4vh]">
						<button
							disabled={isLoading}
							type="submit"
							className="pushable w-full"
						>
							<span className="front front-blue text-[2.5vh] font-extrabold py-[1.2vh] ">
								Register
							</span>
						</button>
					</div>
				</form>

				<p className="text-center mt-[3vh] text-[2vh] font-semibold">
					Already have an account?{" "}
					<Link
						href="/login"
						className="text-blue-700 hover:underline underline-offset-2"
					>
						Login
					</Link>
				</p>
			</div>
		</div>
	);
};

export default RegisterPage;
