"use client";

import React, { useState } from "react";
import {
	BarChart,
	Bar,
	XAxis,
	YAxis,
	Tooltip,
	Legend,
	ResponsiveContainer,
} from "recharts";

const COLORS = [
	"#8884d8",
	"#82ca9d",
	"#ffc658",
	"#ff8042",
	"#a4de6c",
	"#d0ed57",
];

export default function SimulatorPage() {
	const [results, setResults] = useState<any>(null);
	const [loading, setLoading] = useState(false);

	async function runSim() {
		setLoading(true);
		try {
			const res = await fetch("/api/simulator"); // userId handled by backend
			const json = await res.json();
			setResults(json);
		} catch (err) {
			console.error(err);
		} finally {
			setLoading(false);
		}
	}

	const binData = (dist: number[] | any) => {
		if (!Array.isArray(dist)) return [];
		const bins = Array(10).fill(0);
		dist.forEach((score: number) => {
			const bin = Math.min(9, Math.floor(score / 10));
			bins[bin]++;
		});
		return bins.map((count, i) => ({
			range: `${i * 10}-${i * 10 + 10}`,
			count,
		}));
	};

	const getStats = (dist: number[] | any) => {
		if (!Array.isArray(dist) || dist.length === 0)
			return { best: 0, worst: 0, mostLikely: 0 };
		const best = Math.max(...dist);
		const worst = Math.min(...dist);
		const mostLikely = Math.round(
			dist.reduce((a, b) => a + b, 0) / dist.length
		);
		return { best, worst, mostLikely };
	};

	return (
		<div className="p-10 space-y-10 px-[10vw] bg-white text-black min-h-screen flex flex-col items-center justify-center">
			<h1 className="text-[10vh] mb-6 hand">Sprint Monte Carlo Simulator</h1>

			<p className="mb-4 text-black font-extrabold text-[2.25vh] text-center w-[60%] mx-auto">
				This simulator runs 1,000 “what-if” scenarios for your sprint based on
				the uploaded data. Each chart shows the probability distribution of
				sprint scores under different conditions.
			</p>

			<button onClick={runSim} className="pushable">
				<span className="front front-blue text-[2.5vh] flex items-center justify-center gap-[1vw] font-extrabold text-black">
					{loading ? "Running..." : "Run 1,000 Simulations"}
				</span>
			</button>

			{results && (
				<div className="mt-8 grid grid-cols-2 gap-x-[4vw] gap-y-[4vw]">
					{/* Summary Stats for Each Scenario */}
					{Object.keys(results).map((scenario, idx) => {
						const dist = results[scenario] as number[];
						const stats = getStats(dist);
						return (
							<div key={scenario} className="space-y-4">
								<h2 className="text-xl font-semibold">{scenario}</h2>

								<p className="text-gray-700 text-sm">
									This chart shows how the sprint score might vary under the "
									{scenario}" scenario. Higher bars indicate more likely scores.
								</p>

								<div className="grid grid-cols-3 gap-4 text-center mb-4">
									<div className="p-4 rounded-xl bg-gray-100 border">
										<h3 className="font-bold">Best Outcome</h3>
										<p className="text-2xl">{stats.best}</p>
										<p className="text-sm text-gray-600">
											The highest possible score observed in the simulation.
										</p>
									</div>
									<div className="p-4 rounded-xl bg-gray-100 border">
										<h3 className="font-bold">Most Likely</h3>
										<p className="text-2xl">{stats.mostLikely}</p>
										<p className="text-sm text-gray-600">
											The average/expected score from all simulations.
										</p>
									</div>
									<div className="p-4 rounded-xl bg-gray-100 border">
										<h3 className="font-bold">Worst Outcome</h3>
										<p className="text-2xl">{stats.worst}</p>
										<p className="text-sm text-gray-600">
											The lowest possible score observed in the simulation.
										</p>
									</div>
								</div>

								{/* Histogram */}
								<div className="bg-gray-50 p-6 rounded-2xl border">
									<ResponsiveContainer width="100%" height={300}>
										<BarChart data={binData(dist)}>
											<XAxis dataKey="range" stroke="#333" />
											<YAxis stroke="#333" />
											<Tooltip
												contentStyle={{
													backgroundColor: "#fff",
													borderColor: "#ccc",
												}}
											/>
											<Bar
												dataKey="count"
												fill={COLORS[idx % COLORS.length]}
												name={scenario}
											/>
										</BarChart>
									</ResponsiveContainer>
								</div>
							</div>
						);
					})}
				</div>
			)}
		</div>
	);
}
