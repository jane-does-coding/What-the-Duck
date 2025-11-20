import Link from "next/link";
import React from "react";

const page = () => {
	return (
		<div>
			<div className="h-screen w-full flex items-center justify-center">
				<div className="grid grid-cols-2 w-fit mx-auto gap-[1vw]">
					<Link
						href={"/doomed-duck"}
						className="relative w-[35vw] h-[25vw] flex items-center justify-center group"
					>
						<div className="absolute duck-shadow top-[-2vh] left-[-2vw] rotate-12 z-20transition-all duration-300 ease-in-out group-hover:-translate-y-[1vh] group-hover:rotate-[-10deg] group-hover:left-[-4vw] z-30">
							<img src="/doomed-duck.png" className="w-[10vw] left-0" alt="" />
						</div>
						<img
							src="/leaf-frame.png"
							className="w-[35vw] absolute top-0 left-0"
							alt=""
						/>
						<div className="flex flex-col items-center justify-center">
							<h2 className="hand text-[8vh] max-w-[30vw] leading-[7vh]">
								Doomed Duck
							</h2>
							<p className="font-extrabold text-[2.5vh] mt-[1vh]">
								Chaos & Disaster Prediction
							</p>
						</div>
					</Link>
					<Link
						href={"/"}
						className="relative w-[35vw] h-[25vw] flex items-center justify-center group"
					>
						<div className="absolute bottom-[-2vh] duck-shadow right-[-2vw] rotate-12 z-20 transition-all duration-300 ease-in-out group-hover:-translate-y-10 group-hover:rotate-[20deg] group-hover:right-[0vw]">
							<img src="/duck-read.png" className="w-[10vw]" alt="" />
						</div>
						<img
							src="/leaf-frame.png"
							className="w-[35vw] absolute top-0 left-0"
							alt=""
						/>
						<div className="flex flex-col items-center justify-center">
							<h2 className="hand text-[8vh] max-w-[30vw] leading-[7vh] text-center">
								Duck Probability
							</h2>
							<p className="font-extrabold text-[2.5vh] max-w-[20vw] text-center mt-[1vh]">
								Best, Worst, and Most likely outcome prediction
							</p>
						</div>
					</Link>
					<Link
						href={"/duck-it"}
						className="relative w-[35vw] h-[25vw] flex items-center justify-center group"
					>
						<div
							className="absolute bottom-[2vh] left-[7.5vw] duck-shadow rotate-12 z-20 transition-all duration-300 group-hover:-translate-y-8 group-hover:rotate-[20deg] group-hover:left-[4vw] opacity-100
"
						>
							<img
								src="/duck-boat.png"
								className="w-[10vw] scale-x-[-1]"
								alt=""
							/>
						</div>
						<div
							className="absolute top-[2vh] right-[2vw] duck-shadow rotate-12 z-20 transition-all duration-300 group-hover:-translate-y-6  group-hover:right-[0vw] group-hover:rotate-[-10deg] opacity-100
"
						>
							<img src="/fish.png" className="w-[7vw]" alt="" />
						</div>
						<img
							src="/leaf-frame.png"
							className="w-[35vw] absolute top-0 left-0"
							alt=""
						/>
						<div className="flex flex-col items-center justify-center">
							<h2 className="hand text-[8vh] max-w-[30vw] leading-[7vh] text-center">
								Duck it, it's unclear
							</h2>
							<p className="font-extrabold text-[2.5vh] max-w-[20vw] text-center mt-[1vh]">
								Detect anti-practices
							</p>
						</div>
					</Link>
					<Link
						href={"/"}
						className="relative w-[35vw] h-[25vw] flex items-center justify-center group"
					>
						<div className="absolute bottom-[2vh] right-[5vw] duck-shadow rotate-12 z-20 transition-all duration-300 ease-in-out group-hover:-translate-y-8 group-hover:rotate-[20deg] group-hover:right-[2vw]">
							<img src="/duck-skate.png" className="w-[8vw]" alt="" />
						</div>

						<div className="absolute top-[-2vh] left-[2vw] duck-shadow rotate-12 z-20 transition-all duration-300 ease-in-out group-hover:-translate-y-[1vh] group-hover:rotate-[-10deg] group-hover:left-[0vw]">
							<img src="/ducky-stamp.png" className="w-[8vw]" alt="" />
						</div>

						<img
							src="/leaf-frame.png"
							className="w-[35vw] absolute top-0 left-0"
							alt=""
						/>
						<div className="flex flex-col items-center justify-center">
							<h2 className="hand text-[8vh] max-w-[30vw] leading-[7vh] text-center">
								Duck 2 Duck
							</h2>
							<p className="font-extrabold text-[2.5vh] max-w-[20vw] text-center mt-[1vh]">
								Sprint to Sprint risk Comparison
							</p>
						</div>
					</Link>
				</div>
				<div className="absolute right-[5vw] top-[50%] translate-y-[-50%] ">
					<h1 className="hand text-[14vh] leading-[13vh]">T</h1>
					<h1 className="hand text-[14vh] leading-[13vh]">O</h1>
					<h1 className="hand text-[14vh] leading-[13vh]">O</h1>
					<h1 className="hand text-[14vh] leading-[13vh]">L</h1>
					<h1 className="hand text-[14vh] leading-[13vh]">S</h1>
				</div>
				<div className="absolute left-[5vw] top-[50%] translate-y-[-50%] ">
					<h1 className="hand text-[14vh] leading-[13vh]">T</h1>
					<h1 className="hand text-[14vh] leading-[13vh]">O</h1>
					<h1 className="hand text-[14vh] leading-[13vh]">O</h1>
					<h1 className="hand text-[14vh] leading-[13vh]">L</h1>
					<h1 className="hand text-[14vh] leading-[13vh]">S</h1>
				</div>
			</div>
		</div>
	);
};

export default page;
