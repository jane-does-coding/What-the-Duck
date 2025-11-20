"use client";
import React, { useState } from "react";
import { motion } from "framer-motion";

const DoomedDuckCarousel = () => {
	const [index, setIndex] = useState(0);
	const [loading, setLoading] = useState(false);
	const [result, setResult] = useState<any>(null);

	async function runPrediction() {
		setLoading(true);
		const res = await fetch("/api/predict");
		const data = await res.json();
		setResult(data);
		setLoading(false);
	}

	const ducks = [
		{ title: "Doomed Duck 1", img: "/wooden-frame.png" },
		{ title: "Doomed Duck 2", img: "/wooden-frame.png" },
		{ title: "Doomed Duck 3", img: "/warning-frame.png" },
	];

	const next = () => setIndex((prev) => (prev + 1) % ducks.length);
	const prev = () =>
		setIndex((prev) => (prev - 1 + ducks.length) % ducks.length);

	return (
		<div className="h-screen w-full flex items-center justify-center relative overflow-hidden">
			{/* Moving Rope */}
			<motion.img
				src="/rope-long.png"
				className="absolute top-[5vh] left-[-4vw] min-w-[300vw] h-auto"
				alt=""
				animate={{ x: `-${index * 75}vw` }}
				transition={{ type: "spring", stiffness: 80, damping: 20 }}
			/>

			{/* Carousel track */}
			<motion.div
				className="flex items-center justify-center gap-[5vw] absolute top-[4vh] left-[15vw]"
				animate={{ x: `-${index * 75}vw` }}
				transition={{ type: "spring", stiffness: 80, damping: 20 }}
			>
				{ducks.map((duck, i) => {
					const isActive = i === index;
					return (
						<motion.div
							key={i}
							className="relative w-[70vw] aspect-[3/2] flex flex-col items-center justify-center flex-shrink-0"
							animate={{
								scale: isActive ? 1 : 0.95,
								opacity: isActive ? 1 : 0.95,
							}}
							transition={{ type: "spring", stiffness: 120, damping: 15 }}
						>
							<img
								src={duck.img}
								className="w-full aspect-[3/2] pb-[2vh]"
								alt=""
							/>
							<div className="flex flex-col absolute top-[40%]">
								<h1 className="hand text-[10vh]">{duck.title}</h1>
								<h2>{result ? result.prediction.riskScore : ""}</h2>
								<button
									onClick={runPrediction}
									disabled={loading}
									className="px-8 py-4 bg-orange-600 text-white text-xl font-semibold rounded-xl shadow-lg hover:bg-orange-700 transition"
								>
									{loading ? "Predicting..." : "Predict"}
								</button>
							</div>
						</motion.div>
					);
				})}
			</motion.div>

			{/* Left Arrow */}
			<button
				onClick={prev}
				className="absolute left-[4vw] top-1/2 -translate-y-1/2 text-[5vh] z-10 font-extrabold"
			>
				‹
			</button>

			{/* Right Arrow */}
			<button
				onClick={next}
				className="absolute right-[4vw] top-1/2 -translate-y-1/2 text-[5vh] z-10 font-extrabold"
			>
				›
			</button>

			{/* Dots */}
			<div className="absolute bottom-[10vh] flex justify-center gap-[0.75vw] w-full">
				{ducks.map((_, i) => (
					<div
						key={i}
						onClick={() => setIndex(i)}
						className={`rounded-full cursor-pointer w-[1vh] h-[1vh] ${
							i === index ? "bg-gray-700 scale-150" : "bg-gray-400"
						}`}
					/>
				))}
			</div>
		</div>
	);
};

export default DoomedDuckCarousel;
