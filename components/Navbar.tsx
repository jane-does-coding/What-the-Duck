"use client";
import { signOut } from "next-auth/react";
import Link from "next/link";
import React, { useState } from "react";
import Marquee from "react-fast-marquee";

const Navbar = ({ currentUser }: any) => {
	const [open, setOpen] = useState(false);

	return (
		<>
			{/* Trigger button */}
			<div
				onClick={() => setOpen(!open)}
				className={`fixed left-[5vw] w-[8vh] shadow-2xl cursor-pointer bg-[#FF8040] rounded-b-[10vh] h-[11vh] border-b-4 border-black z-79 flex items-end justify-center transition-all duration-400 ease-in-out ${
					open ? "top-[44vh] hover:h-[12.5vh]" : "top-[-1vh] hover:h-[12.5vh]"
				}`}
			>
				<img src="/ducky.png" className="h-[8vh] mb-[1.5vh]" alt="ducky" />
			</div>

			{/* Sliding content */}
			<div
				className={`w-full bg-[#FF8040] fixed left-0 rounded-b-[8vh] border-b-[3px] border-black z-78 shadow-2xl transition-all duration-400 ease-in-out flex flex-col ${
					open ? "top-0 h-[45vh]" : "-top-[50vh] h-[50vh]"
				}`}
			>
				<div className="bg-white border-y-[2px] border-black h-[6.5vh] flex items-center justify-center w-full">
					<Marquee speed={50} pauseOnHover={true}>
						<img
							src="/ducky.png"
							className="h-[5vh] mb-[1.5vh] mx-[0.25vw]"
							alt="ducky"
						/>
						<p className="text-[2vh] w-full font-extrabold mx-[1vw]">
							The sprint rollover percentages are 30%, let's fix it!
						</p>
						<img
							src="/ducky.png"
							className="h-[5vh] mb-[1.5vh] mx-[0.25vw]"
							alt="ducky"
						/>
						<p className="text-[2vh] w-full font-extrabold mx-[1vw]">
							The sprint rollover percentages are 30%, let's fix it!
						</p>
						<img
							src="/ducky.png"
							className="h-[5vh] mb-[1.5vh] mx-[0.25vw]"
							alt="ducky"
						/>
						<p className="text-[2vh] w-full font-extrabold mx-[1vw]">
							The sprint rollover percentages are 30%, let's fix it!
						</p>
						<img
							src="/ducky.png"
							className="h-[5vh] mb-[1.5vh] mx-[0.25vw]"
							alt="ducky"
						/>
						<p className="text-[2vh] w-full font-extrabold mx-[1vw]">
							The sprint rollover percentages are 30%, let's fix it!
						</p>
						<img
							src="/ducky.png"
							className="h-[5vh] mb-[1.5vh] mx-[0.25vw]"
							alt="ducky"
						/>
						<p className="text-[2vh] w-full font-extrabold mx-[1vw]">
							The sprint rollover percentages are 30%, let's fix it!
						</p>
						<img
							src="/ducky.png"
							className="h-[5vh] mb-[1.5vh] mx-[0.25vw]"
							alt="ducky"
						/>
						<p className="text-[2vh] w-full font-extrabold mx-[1vw]">
							The sprint rollover percentages are 30%, let's fix it!
						</p>
						<img
							src="/ducky.png"
							className="h-[5vh] mb-[1.5vh] mx-[0.25vw]"
							alt="ducky"
						/>
						<p className="text-[2vh] w-full font-extrabold mx-[1vw]">
							The sprint rollover percentages are 30%, let's fix it!
						</p>
					</Marquee>
				</div>
				<div className="w-full flex items-center justify-center px-[4vw] mt-[1vh]">
					<div className="flex flex-col w-[50%]">
						<h2 className="hand text-[9vh] leading-[7vh] mt-[1vh] flex items-center gap-[1vw]">
							<img src="/ducky.png" className="w-[8vw]" alt="Ducky logo" />
							What the Duck?!
						</h2>
						<p className="handlee font-extrabold text-[3vh] mt-[1.5vh]">
							Make sure to have less of What the Duck?! moments in your workflow
							by planning sprints smart with AI!
						</p>
					</div>
					<div className="flex flex-col w-[17.5%] z-50 ml-auto pt-[2vh]">
						<h2 className="hand text-[9vh] leading-[8vh] mt-[1vh] mb-[2vh]">
							Links
						</h2>
						<Link
							className="w-fit text-[2.5vh] font-extrabold"
							href={"/doomed-duck"}
						>
							Doomed Duck
						</Link>
						<Link
							className="w-fit text-[2.5vh] font-extrabold"
							href={"/duck-it"}
						>
							Duck it, it's Unclear
						</Link>
						<Link
							className="w-fit text-[2.5vh] font-extrabold"
							href={"/duck-2-duck"}
						>
							Duck 2 Duck
						</Link>
						<Link
							className="w-fit text-[2.5vh] font-extrabold"
							href={"/duck-2-duck"}
						>
							Duck Probability
						</Link>
					</div>
					<div className="flex flex-col w-fit z-50 pt-[2vh]">
						<h2 className="hand text-[9vh] leading-[8vh] mb-[2vh] mt-[1vh]">
							Platform
						</h2>
						{currentUser ? (
							<>
								<Link
									className="w-fit text-[2.5vh] font-extrabold"
									href={"/upload"}
								>
									File Upload
								</Link>
								<Link
									className="w-fit text-[2.5vh] font-extrabold"
									href={"/tools"}
								>
									Tools
								</Link>
								<Link
									onClick={() => signOut()}
									className="w-fit text-[2.5vh] font-extrabold"
									href={"/"}
								>
									Logout
								</Link>
							</>
						) : (
							<>
								<Link className="w-fit text-[2.5vh] font-extrabold" href={"/"}>
									Learn More
								</Link>
								<Link
									className="w-fit text-[2.5vh] font-extrabold"
									href={"/register"}
								>
									Register
								</Link>
								<Link
									className="w-fit text-[2.5vh] font-extrabold"
									href={"/login"}
								>
									Login
								</Link>
							</>
						)}
					</div>
				</div>
			</div>

			{/* Overlay */}
			<div
				className={`w-full bg-linear-to-b from-neutral-900/50 to-neutral-600/10 fixed left-0 border-b-[3px] backdrop-blur-[4px] border-black z-77 shadow-2xl transition-all duration-600 ease-in-out top-0 h-screen
					${open ? "opacity-100" : "opacity-0 pointer-events-none"}		
				`}
			></div>
		</>
	);
};

export default Navbar;
