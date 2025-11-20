"use client";
import React, { useEffect, useState } from "react";
import { motion } from "framer-motion";
import getCurrentUser from "@/app/actions/getCurrentUser";
import { redirect, useRouter } from "next/navigation";

const DoomedDuckCarousel = () => {
	const [index, setIndex] = useState(0);
	const [loading, setLoading] = useState(false);
	const [result, setResult] = useState<any>(null);
	const [checkingAuth, setCheckingAuth] = useState(true);
	/* 
	const router = useRouter();

	useEffect(() => {
		// Check authentication
		const checkAuth = async () => {
			const user = await getCurrentUser();
			if (!user) {
				// redirect to login if not logged in
				router.push("/login");
			} else {
				setCheckingAuth(false);
			}
		};
		checkAuth();
	}, [router]);

	// Show loading while checking auth
	if (checkingAuth) {
		return (
			<div className="flex items-center justify-center h-screen">
				<p className="text-2xl">Checking authentication...</p>
			</div>
		);
	} */

	async function runPrediction() {
		setLoading(true);
		setResult(null); // clear old result
		try {
			const res = await fetch("/api/predict");

			if (!res.ok) {
				// non-200 HTTP status
				const err = await res.json();
				setResult({ error: err.error || "Unknown server error" });
				return;
			}

			const data = await res.json();

			// handle backend returning { error: "..." }
			if (data.error) {
				setResult({ error: data.error });
				return;
			}

			// success
			setResult(data);
		} catch (e) {
			setResult({ error: "Network error. Please try again." });
		} finally {
			setLoading(false);
		}
	}

	const frames = [
		"/wooden-frame.png",
		"/warning-frame.png",
		"/frame-flowers.png",
	];

	const next = () => setIndex((prev) => (prev + 1) % frames.length);
	const prev = () =>
		setIndex((prev) => (prev - 1 + frames.length) % frames.length);

	return (
		<div className="h-screen w-full flex items-center justify-center relative overflow-hidden">
			<motion.img
				src="/rope-long.png"
				className="absolute top-[5vh] left-[-4vw] min-w-[300vw] h-auto"
				alt=""
				animate={{ x: `-${index * 75}vw` }}
				transition={{ type: "spring", stiffness: 80, damping: 20 }}
			/>

			<motion.div
				className="flex items-center justify-center gap-[5vw] absolute top-[4vh] left-[15vw]"
				animate={{ x: `-${index * 75}vw` }}
				transition={{ type: "spring", stiffness: 80, damping: 20 }}
			>
				{frames.map((img, i) => {
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
							<img src={img} className="w-full aspect-[3/2] pb-[2vh]" alt="" />

							<div className="flex flex-col absolute top-[13vh] w-[60vw] h-[34vw] items-center justify-center pt-[3vh] items-center text-center px-[3vw]">
								{/* FRAME 1 — OVERVIEW */}
								{i === 0 && (
									<div className="flex flex-col items-center gap-[1.5vh]">
										<h1 className="hand text-[10vh] leading-[10vh]">
											Sprint Overview
										</h1>

										{result?.error && (
											<p className="text-red-600 text-[2.5vh] font-semibold">
												{result.error}
											</p>
										)}

										{/* INITIAL MESSAGE */}
										{!result && !loading && !result?.error && (
											<p className="text-[3vh] font-semibold">
												Run prediction to load sprint analysis.
											</p>
										)}

										{/* LOADING SPINNER */}
										{loading && (
											<img
												src="/loader.gif"
												className="w-[12vh] h-[12vh] mx-auto"
												alt="loading"
											/>
										)}

										{/* CONTENT WHEN DONE */}
										{result && !loading && !result?.error && (
											<div className="flex flex-col w-full">
												<div className="flex mt-[1.5vh] items-center justify-between w-[90%] mx-auto gap-[1vh] text-[2.5vh] font-medium whitespace-pre-line">
													<div className="flex gap-[1vw] items-center justify-center">
														<p className="font-bold text-[2.75vh]">
															Risk Level:
														</p>
														<p>{result.prediction.riskLevel}</p>
													</div>

													<div className=" flex gap-[1vw] items-center justify-center">
														<p className="font-bold text-[2.75vh]">
															Overall Risk Score:
														</p>
														<p>{result.prediction.riskScore}</p>
													</div>
													<div className="flex items-center justify-center gap-[1vw] text-[2.75vh]">
														<p className="font-bold text-[2.75vh]">
															Timeline Confidence:
														</p>
														<p>{result.prediction.timelineConfidence}</p>
													</div>
												</div>

												<div className="flex items-center mt-[2vh] gap-[1vw]">
													<div className="w-3/5">
														<p className="font-bold text-[3vh] mb-[0.5vh]">
															Likely Blockers:
														</p>
														{result.prediction.likelyBlockers.map(
															(b: string, idx: number) => (
																<p key={idx} className="my-[0.75vh] text-[2vh]">
																	{b}
																</p>
															)
														)}
													</div>

													<div className="w-2/5">
														<p className="font-bold text-[3vh] mb-[0.5vh]">
															Tasks at Risk:
														</p>
														{result.prediction.atRiskTasks.map(
															(t: string, idx: number) => (
																<p key={idx} className="text-[2vh]">
																	{t}
																</p>
															)
														)}
													</div>
												</div>
											</div>
										)}
									</div>
								)}

								{/* FRAME 2 — RISKS */}
								{i === 1 && (
									<div className="flex flex-col items-center gap-[1.5vh]">
										<h1 className="hand text-[10vh] leading-[10vh]">
											Major Risks
										</h1>

										{!result && !loading && !result?.error && (
											<p className="text-[3vh] font-semibold">
												Run prediction to see sprint risks.
											</p>
										)}

										{loading && (
											<img
												src="/loader.gif"
												className="w-[12vh] h-[12vh] mx-auto"
												alt="loading"
											/>
										)}

										{result && !loading && !result?.error && (
											<div className="flex flex-col gap-[2vh] text-[2.5vh] font-medium whitespace-pre-line px-[1vw]">
												{/* <p className="font-bold text-[3vh] mb-[0.5vh]">
													Major Risks:
												</p> */}
												{result.prediction.majorRisks.map(
													(r: string, idx: number) => (
														<div key={idx}>
															<p>{r}</p>
															<div className="w-full h-[0.15vh] bg-neutral-300"></div>
														</div>
													)
												)}
											</div>
										)}
									</div>
								)}

								{/* FRAME 3 — RECOMMENDATIONS */}
								{i === 2 && (
									<div className="flex flex-col items-center gap-[1.5vh]">
										<h1 className="hand text-[10vh] leading-[10vh]">
											Recommendations
										</h1>

										{!result && !loading && !result?.error && (
											<p className="text-[3vh] font-semibold">
												Run prediction to load recommendations.
											</p>
										)}

										{loading && (
											<img
												src="/loader.gif"
												className="w-[12vh] h-[12vh] mx-auto"
												alt="loading"
											/>
										)}

										{result && !loading && !result?.error && (
											<div className="flex flex-col gap-[1.5vh] text-[2.5vh] font-medium whitespace-pre-line">
												{result.prediction.recommendations.map(
													(r: string, idx: number) => (
														<div key={idx}>
															<p>{r}</p>
															<div className="w-full h-[0.15vh] bg-neutral-300"></div>
														</div>
													)
												)}
											</div>
										)}
									</div>
								)}

								{/* BUTTON — ONLY SHOW IF NOT LOADING & NO RESULT YET */}
								{!loading && !result && (
									<div className="mt-[2vh]">
										<button onClick={runPrediction} className="pushable">
											<span className="front front-blue text-[2.5vh] flex items-center justify-center gap-[1vw] font-extrabold text-black">
												Predict
											</span>
										</button>
									</div>
								)}
							</div>
						</motion.div>
					);
				})}
			</motion.div>

			<button
				onClick={prev}
				className="absolute left-[4vw] top-1/2 -translate-y-1/2 text-[5vh] z-10 font-extrabold"
			>
				‹
			</button>

			<button
				onClick={next}
				className="absolute right-[4vw] top-1/2 -translate-y-1/2 text-[5vh] z-10 font-extrabold"
			>
				›
			</button>

			<div className="absolute bottom-[10vh] flex justify-center gap-[0.75vw] w-full">
				{frames.map((_, i) => (
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
