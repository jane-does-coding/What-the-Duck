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
				<Marquee speed={100} pauseOnHover={true}>
					<p className="text-[2.5vh] w-full font-extrabold mx-[1vw]">
						Lorem, ipsum dolor sit amet consectetur adipisicing elit. Omnis cum
						ducimus vel quibusdam nulla repellat.
					</p>
					<p className="text-[2.5vh] w-full font-extrabold mx-[1vw]">
						Lorem, ipsum dolor sit amet consectetur adipisicing elit. Omnis cum
						ducimus vel quibusdam nulla repellat.
					</p>
				</Marquee>
			</div>
			<div className="flex flex-col w-5/10">
				<h2 className="hand text-[10vh] leading-[8vh] mt-[1vh] flex items-center gap-[1vw]">
					<img src="/ducky.png" className="w-[10vw]" alt="Ducky logo" />
					Lorem ipsum.
				</h2>
				<p className="handlee font-extrabold text-[3vh] mt-[1.5vh]">
					Lorem ipsum dolor sit, amet consectetur adipisicing elit. Nulla soluta
					necessitatibus inventore nostrum reiciendis nam.
				</p>
			</div>
			<div className="flex flex-col w-2/10 z-50 ml-auto pt-[2vh]">
				<h2 className="hand text-[9vh] leading-[8vh] mt-[1vh] mb-[2vh]">
					Links
				</h2>
				<Link className="w-fit text-[2.25vh]" href={"/platform"}>
					Platform
				</Link>
				<Link className="w-fit text-[2.25vh]" href={"/about"}>
					About
				</Link>
				<Link className="w-fit text-[2.25vh]" href={"/faq"}>
					FAQ
				</Link>
			</div>
			<div className="flex flex-col w-2/10 z-50 pt-[2vh]">
				<h2 className="hand text-[9vh] leading-[8vh] mb-[2vh] mt-[1vh]">
					Socials
				</h2>
				<Link className="w-fit text-[2.25vh]" href={"/"}>
					Email
				</Link>
				<Link className="w-fit text-[2.25vh]" href={"/"}>
					Youtube
				</Link>
				<Link className="w-fit text-[2.25vh]" href={"/"}>
					Linkedin
				</Link>
			</div>
		</div>
	);
};

export default Footer;
