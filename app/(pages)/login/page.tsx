"use client";

import { useState } from "react";
import { FieldValues, useForm, SubmitHandler } from "react-hook-form";
import { signIn } from "next-auth/react";
import { useRouter } from "next/navigation";
import toast from "react-hot-toast";
import Input from "@/components/Inputs/Input";
import Link from "next/link";

const LoginPage = () => {
	const [isLoading, setIsLoading] = useState(false);
	const router = useRouter();

	const {
		register,
		handleSubmit,
		formState: { errors },
	} = useForm<FieldValues>({
		defaultValues: {
			email: "",
			password: "",
		},
	});

	const onSubmit: SubmitHandler<FieldValues> = async (data) => {
		setIsLoading(true);

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
	};

	return (
		<div className="relative flex items-center justify-center min-h-screen max-h-screen h-screen overflow-hidden px-4 bg-white">
			{/* background leaf decorations */}
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

			{/* card */}
			<div className="relative w-[40vw] max-w-[40vw] bg-[#F7F4EA] border-2 border-black rounded-[3vh] p-[4vh] px-0 shadow-[6px_6px_0px_rgba(0,0,0,1)]">
				{/* duck decorations */}
				<img
					src="/ducky-guitar.png"
					className="w-[10vw] absolute top-[-10vh] left-[-10vh] rotate-[5deg]"
				/>
				<img
					src="/ducky-mail.png"
					className="w-[10vw] absolute bottom-[-8vh] right-[-13vh] rotate-[15deg] scale-x-[-1]"
				/>
				<img
					src="/ducky-bday.png"
					className="w-[10vw] absolute bottom-[-8vh] left-[-13vh] rotate-[-15deg]"
				/>

				<h2 className="hand text-[10vh] leading-[9vh] text-center mb-[2vh]">
					Login
				</h2>
				<p className="text-center text-[2.5vh] mb-[3vh] font-bold">
					Welcome back! Time to duck in.
				</p>

				<form
					onSubmit={handleSubmit(onSubmit)}
					className="flex flex-col gap-[1vh] "
				>
					<div className="mx-[4vh]">
						<Input
							id="email"
							label="Email"
							disabled={isLoading}
							errors={errors}
							required
							register={register}
						/>
					</div>

					<div className="mx-[4vh]">
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
							className="pushable w-full "
						>
							<span className="front front-blue text-[2.5vh] font-extrabold py-[1.2vh]">
								Login
							</span>
						</button>
					</div>
				</form>

				<p className="text-center mt-[3vh] text-[2vh] font-semibold">
					Don&apos;t have an account?{" "}
					<Link
						href="/register"
						className="text-blue-700 hover:underline underline-offset-2"
					>
						Sign up
					</Link>
				</p>
			</div>
		</div>
	);
};

export default LoginPage;
