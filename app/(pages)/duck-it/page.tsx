"use client";

import { useState } from "react";

export default function UnclearAnalysisPage() {
	const [loading, setLoading] = useState(false);
	const [result, setResult] = useState<any | null>(null);
	const [error, setError] = useState<string | null>(null);

	async function analyze() {
		setLoading(true);
		setError(null);
		setResult(null);

		try {
			const res = await fetch("/api/unclear", { method: "GET" });
			const data = await res.json();

			if (data.error) {
				setError(data.error);
			} else {
				setResult(data.unclearAnalysis);
			}
		} catch (e: any) {
			setError(e.message || "Something went wrong");
		}

		setLoading(false);
	}

	return (
		<div className="min-h-screen p-10 flex flex-col items-center">
			<h1 className="text-[10vh] mb-4 text-center hand">
				Duck It, It's Unclear
			</h1>

			<p className="text-neutral-800 font-extrabold mb-0 text-center max-w-xl text-[2.5vh]">
				Identify vague sprint descriptions, missing details, contradictions, and
				SDLC anti-practices.
			</p>

			{/* Button OR Loader */}
			<div className="mt-[1vh] flex items-center justify-center">
				{loading ? (
					<img src="/loader.gif" className="w-[10vh] h-[10vh]" alt="loading" />
				) : !result ? (
					<button onClick={analyze} className="pushable">
						<span className="front front-blue text-[2.5vh] flex items-center justify-center gap-[1vw] font-extrabold text-black">
							Analyze Sprint
						</span>
					</button>
				) : null}
			</div>

			{/* Error */}
			{error && (
				<div className="mt-6 bg-red-900 text-red-300 p-4 rounded-lg max-w-3xl w-full">
					Error: {error}
				</div>
			)}

			{/* Results */}
			{result && (
				<div className="w-[80vw] gap-x-[5vw] gap-y-[3vw] grid grid-cols-2 mt-[3vh]">
					<Section title="Anti-Practices" items={result.antiPractices} />
					<Section
						title="Unclear Descriptions"
						items={result.unclearDescriptions}
					/>
					<Section
						title="Missing Information"
						items={result.missingInformation}
					/>
					<Section title="Risk Amplifiers" items={result.riskAmplifiers} />
					<Section title="Inconsistencies" items={result.inconsistencies} />
					<Section title="Recommendations" items={result.recommendations} />
				</div>
			)}
		</div>
	);
}

function Section({ title, items }: { title: string; items?: string[] }) {
	if (!items || items.length === 0) return null;

	return (
		<div className="rounded-xl relative w-full aspect-3/2 p-[1vw] overflow-visible">
			{/* Text on top */}
			<div className="relative z-10 p-[2vw]">
				<h2 className="text-2xl font-semibold mb-3">{title}</h2>
				<ul className="list-disc list-inside space-y-2 font-extrabold text-[2vh]">
					{items.map((i, idx) => (
						<li key={idx}>{i}</li>
					))}
				</ul>
			</div>

			{/* Panel BEHIND content */}
			<img
				src="/panel.png"
				className="absolute top-0 left-0 w-full h-full z-0"
				alt=""
			/>
		</div>
	);
}
