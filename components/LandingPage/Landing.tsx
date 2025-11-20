import Link from "next/link";
import { FiLink, FiLinkedin } from "react-icons/fi";
import { RiGithubLine } from "react-icons/ri";
import ParallaxDivider from "./ParallaxDivider";

const Landing = () => {
	return (
		<div className="h-[77.5vh] pt-[1vh]">
			<ParallaxDivider />
			<br />
			<br />
			<h3 className="hand text-center mx-auto text-[17vh] leading-[17vh]">
				What the Duck?!
			</h3>
			<div className="w-fit relative mx-auto mt-[2.5vh]">
				<img
					src="/ducky-mail.png"
					className="w-[12vw] absolute bottom-[-10vh] left-[-13vw] rotate-[-15deg]"
					alt=""
				/>
				<img
					src="/ducky-bowtime.png"
					className="w-[12vw] absolute bottom-[-10vh] right-[-13vw] rotate-[15deg] scale-x-[-1]"
					alt=""
				/>
				<p className="text-center text-[3.5vh] font-extrabold max-w-[50vw] mx-auto">
					Make sure to have less of "What the Duck?!" moments when planning your
					sprints, with the power of AI to help you with it!
				</p>
			</div>
			<div className="flex gap-[1vw] mt-[5vh] mx-auto items-center justify-center">
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

export default Landing;
