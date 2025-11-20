"use client";

import React, { useState } from "react";
import { BarChart, Bar, XAxis, YAxis, Tooltip } from "recharts";

export default function SimulatorPage() {
	const [results, setResults] = useState<any>(null);
	const [loading, setLoading] = useState(false);

	async function runSim() {
		setLoading(true);
		const res = await fetch("/api/simulator?userId=123"); // replace with real user id
		const json = await res.json();
		setResults(json);
		setLoading(false);
	}

	const binData = () => {
		if (!results?.distribution) return [];

		const bins = Array(10).fill(0); // 10 bins -> 0–10, 10–20, ..., 90–100

		results.distribution.forEach((score: number) => {
			const bin = Math.min(9, Math.floor(score / 10));
			bins[bin]++;
		});

		return bins.map((count, i) => ({
			range: `${i * 10}-${i * 10 + 10}`,
			count,
		}));
	};

	return (
		<div className="p-10 space-y-10 px-[25vw]">
			<h1 className="text-3xl font-bold">Monte Carlo Sprint Simulation</h1>

			<button
				onClick={runSim}
				className="px-6 py-3 bg-blue-600 text-white rounded-xl"
			>
				{loading ? "Running..." : "Run 1,000 Simulations"}
			</button>

			{results && (
				<div className="space-y-8">
					{/* Scores */}
					<div className="grid grid-cols-3 gap-4 text-center">
						<div className="p-6 rounded-2xl bg-gray-800 text-white">
							<h2 className="text-lg font-bold">Best Outcome</h2>
							<p className="text-4xl">{results.best}</p>
						</div>

						<div className="p-6 rounded-2xl bg-gray-800 text-white">
							<h2 className="text-lg font-bold">Most Likely</h2>
							<p className="text-4xl">{results.mostLikely}</p>
						</div>

						<div className="p-6 rounded-2xl bg-gray-800 text-white">
							<h2 className="text-lg font-bold">Worst Outcome</h2>
							<p className="text-4xl">{results.worst}</p>
						</div>
					</div>

					{/* Histogram */}
					<div className="bg-gray-900 p-8 rounded-2xl">
						<h2 className="text-xl mb-4 font-semibold text-white">
							Score Distribution (1000 runs)
						</h2>

						<BarChart width={700} height={300} data={binData()}>
							<XAxis dataKey="range" stroke="#fff" />
							<YAxis stroke="#fff" />
							<Tooltip />
							<Bar dataKey="count" />
						</BarChart>
					</div>
				</div>
			)}
		</div>
	);
}
