import Link from "next/link";
import { FiLink, FiLinkedin } from "react-icons/fi";
import { RiGithubLine } from "react-icons/ri";

const HowItWorks = () => {
	return (
		<div className="flex flex-col items-center justify-center mt-[10vh] mb-[5vh]">
			<div className="flex flex-col items-center justify-center">
				<h2 className="text-[5vh]">Powered by</h2>
				<h1 className="hand text-[20vh] leading-[20vh]">Gemini AI</h1>
			</div>
			<div className="flex items-center justify-center mt-[3vh]">
				<div className="w-[17vw]">
					<h1 className=" text-[5vh] leading-[5vh]">Built with:</h1>
				</div>
				<div className="flex flex-col items-center justify-center">
					<img
						src="https://skillicons.dev/icons?i=html,css,ts,tailwind,mongodb,nodejs,express,react,nextjs,prisma,figma,git,github,postman&perline=7"
						alt=""
						className="w-[35vw]"
					/>
				</div>
			</div>
			<div className="flex gap-[1vw] mt-[5vh]">
				<Link href={"/"} className="pushable">
					<span className="front front-blue text-[2.5vh] flex items-center justify-center gap-[1vw] font-extrabold text-black">
						<RiGithubLine />
						Github
					</span>
				</Link>
				<Link href={"/"} className="pushable">
					<span className="front front-orange text-[2.5vh] flex items-center justify-center gap-[1vw] font-extrabold">
						<FiLinkedin />
						Linkedin
					</span>
				</Link>
				<Link href={"/"} className="pushable">
					<span className="front front-white text-[2.5vh] flex items-center justify-center gap-[1vw] font-extrabold">
						<FiLink />
						The Platform
					</span>
				</Link>
			</div>
		</div>
	);
};

export default HowItWorks;
