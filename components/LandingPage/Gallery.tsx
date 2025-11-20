"use client";
import React, { useState } from "react";
import { motion } from "framer-motion";

const Gallery = () => {
	const [index, setIndex] = useState(0);

	const quackSound =
		typeof Audio !== "undefined" ? new Audio("/sounds/ducky-quack.mp3") : null;

	function playQuack() {
		if (!quackSound) return;
		quackSound.currentTime = 0;
		quackSound.play().catch(() => {});
	}

	const items = [
		{
			color: "bg-red-200/70",
			extras: [
				{ src: "/ducky-bday.png", position: "top-left" },
				{ src: "/ducky-bowtime.png", position: "bottom-right" },
			],
		},
		{
			color: "bg-yellow-200/70",
			extras: [
				{ src: "/ducky-guitar.png", position: "top-right" },
				{ src: "/ducky-mail.png", position: "bottom-left" },
			],
		},
		{
			color: "bg-green-200/70",
			extras: [
				{ src: "/ducky-stamp.png", position: "top-left" },
				{ src: "/ducky-buckethat.png", position: "top-right" },
				{ src: "/ducky.png", position: "bottom-left" },
			],
		},
		{
			color: "bg-green-200/70",
			extras: [
				{ src: "https://placehold.co/600x400", position: "bottom-right" },
				{ src: "https://placehold.co/600x400", position: "top-left" },
			],
		},
		{
			color: "bg-green-200/70",
			extras: [
				{ src: "https://placehold.co/600x400", position: "top-right" },
				{ src: "https://placehold.co/600x400", position: "bottom-left" },
			],
		},
	];

	const next = () => {
		playQuack();
		setIndex((prev) => (prev + 1) % items.length);
	};

	const prev = () => {
		playQuack();
		setIndex((prev) => (prev - 1 + items.length) % items.length);
	};

	const posMap: any = {
		"top-left": "top-[-6vw] left-[-6vw] rotate-[7.5deg]",
		"top-right": "top-[-6vw] right-[-6vw] rotate-[-10deg]",
		"bottom-left": "bottom-[-4vw] left-[-6vw] rotate-[-7.5deg]",
		"bottom-right": "bottom-[-4vw] right-[-6vw] rotate-[7.5deg]",
	};

	return (
		<div className="h-[55vw] pt-[6vw] mt-[4vh] mb-[4vh] w-full flex items-start justify-center overflow-hidden relative bg-red-200/0">
			{/* Carousel track */}
			<motion.div
				className="flex items-center justify-center gap-[0vw] pl-[200vw] pt-[1vh]"
				animate={{ x: `-${index * 50}vw` }}
				transition={{ type: "spring", stiffness: 80, damping: 20 }}
			>
				{items.map((item, i) => {
					const isActive = i === index;
					return (
						<motion.div
							key={i}
							className={`${
								item.color
							} w-[50vw] h-[40vw] rounded-[5vh] relative flex-shrink-0
                            ${isActive ? "blur-none" : "blur-[5px]"}`}
							animate={{
								scale: isActive ? 1 : 0.8,
								opacity: isActive ? 1 : 0.7,
							}}
							transition={{ type: "spring", stiffness: 120, damping: 15 }}
						>
							{/* EXTRA IMAGES (Fade + slide in ONLY when active) */}
							{item.extras?.map((extra, j) => {
								const pos = posMap[extra.position];

								return (
									<motion.img
										key={j}
										src={extra.src}
										className={`absolute w-[12vw] max-h-[12vw] h-[12vw] object-cover rounded-[2vw] z-[10] bg-blue-500/0 ${pos}    ${
											extra.position.includes("right") ? "scale-x-[-1]" : ""
										}`}
										animate={{
											opacity: isActive ? 1 : 0,
											scale: isActive ? 1 : 0.75,
											x: isActive
												? 0
												: extra.position.includes("right")
												? 25
												: -25,
											y: isActive
												? 0
												: extra.position.includes("bottom")
												? 25
												: -25,
										}}
										transition={{ duration: 0.6, ease: "easeOut" }}
									/>
								);
							})}

							<h3 className="absolute font-extrabold bottom-[2vh] left-[50%] translate-x-[-50%] text-[2vh] px-[2vw] py-[0.5vh] bg-white border-2 border-black rounded-full w-fit">
								Lorem ipsum dolor sit amet.
							</h3>

							<img
								src="https://placehold.co/600x400"
								className="w-full h-[40vw] object-cover rounded-[5vh] border-2 border-black"
								alt=""
							/>
						</motion.div>
					);
				})}
			</motion.div>

			{/* Left Control */}
			<div className="absolute left-[4vw] top-1/2 -translate-y-1/2 z-10">
				<button onClick={prev} className="pushable">
					<span className="front front-blue text-[4.5vh] pb-[4vh] font-extrabold">
						‹
					</span>
				</button>
			</div>

			{/* Right Control */}
			<div className="absolute right-[4vw] top-1/2 -translate-y-1/2 z-10">
				<button onClick={next} className="pushable">
					<span className="front front-blue text-[4.5vh] pb-[4vh] font-extrabold">
						›
					</span>
				</button>
			</div>

			{/* Dots */}
			<div className="absolute bottom-[4vh] flex justify-center gap-[1vh]">
				{items.map((_, i) => (
					<motion.button
						key={i}
						onClick={() => setIndex(i)}
						className="rounded-full bg-gray-400 cursor-pointer"
						animate={{
							scale: index === i ? 1.5 : 0.8,
							opacity: index === i ? 1 : 0.5,
							backgroundColor: index === i ? "#4B5563" : "#9CA3AF",
						}}
						transition={{ type: "spring", stiffness: 200, damping: 20 }}
						style={{
							width: "1vh",
							height: "1vh",
						}}
					/>
				))}
			</div>
		</div>
	);
};

export default Gallery;
