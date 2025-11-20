import { signOut } from "next-auth/react";
import Link from "next/link";
import React from "react";
import Marquee from "react-fast-marquee";

const Footer = () => {
	return (
		<div className="bg-[#FF8040] w-full py-[2vh] text-[3vh] px-[4vw] pt-[8vh] pb-[12vh] relative mt-[8vh] flex justify-center items-center z-30">
			<div className="absolute left-0 w-full bg-white h-[15vh] top-[-8vh] rounded-[15vh] -z-10 border-b-4"></div>
			<img
				src="/ducky-peeking.png"
				className="w-[8vw] absolute bottom-[6.5vh] right-0"
				alt="Ducky Peaking in the corner"
			/>
			<div className="absolute bottom-0 left-0 bg-white border-t-[3px] border-black h-[6.5vh] flex items-center justify-center w-full">
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
			<div className="flex flex-col w-5/10">
				<h2 className="hand text-[9vh] leading-[8vh] mt-[1vh] flex items-center gap-[1vw]">
					<img src="/ducky.png" className="w-[9vw]" alt="Ducky logo" />
					What the Duck?!
				</h2>
				<p className="handlee font-extrabold text-[3vh] mt-[1.5vh]">
					Make sure to have less of What the Duck?! moments in your workflow by
					planning sprints smart with AI!
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
				<Link className="w-fit text-[2.5vh] font-extrabold" href={"/duck-it"}>
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
				<>
					<Link className="w-fit text-[2.5vh] font-extrabold" href={"/upload"}>
						File Upload
					</Link>
					<Link className="w-fit text-[2.5vh] font-extrabold" href={"/tools"}>
						Tools
					</Link>
					<Link
						className="w-fit text-[2.5vh] font-extrabold"
						href={"https://github.com/jane-does-coding/What-the-Duck"}
					>
						Github
					</Link>
				</>
			</div>
		</div>
	);
};

export default Footer;
