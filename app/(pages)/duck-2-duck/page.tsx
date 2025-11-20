"use client";

import React, { useEffect, useState } from "react";
import {
	BarChart,
	Bar,
	XAxis,
	YAxis,
	Tooltip,
	ResponsiveContainer,
	Legend,
} from "recharts";

const COLORS = ["#8884d8", "#82ca9d", "#ff6b6b"];

export default function SprintComparisonPage() {
	const [sprints, setSprints] = useState<any[]>([]);
	const [firstSprint, setFirstSprint] = useState<string>("");
	const [secondSprint, setSecondSprint] = useState<string>("");
	const [results, setResults] = useState<any>(null);
	const [loading, setLoading] = useState(false);

	useEffect(() => {
		fetch("/api/sprints")
			.then((res) => res.json())
			.then(setSprints)
			.catch(console.error);
	}, []);

	async function runComparison() {
		if (!firstSprint || !secondSprint) return;
		setLoading(true);

		try {
			const [res1, res2] = await Promise.all([
				fetch(`/api/simulator/${firstSprint}`),
				fetch(`/api/simulator/${secondSprint}`),
			]);
			const [json1, json2] = await Promise.all([res1.json(), res2.json()]);
			setResults({ first: json1, second: json2 });
		} catch (err) {
			console.error(err);
		} finally {
			setLoading(false);
		}
	}

	const binData = (dist: number[]) => {
		const bins = Array(10).fill(0);
		dist.forEach((score) => {
			const bin = Math.min(9, Math.floor(score / 10));
			bins[bin]++;
		});
		return bins.map((count, i) => ({
			range: `${i * 10}-${i * 10 + 10}`,
			count,
		}));
	};

	const differenceData = () => {
		if (!results) return [];
		const bin1 = binData(results.first["Base Case"]);
		const bin2 = binData(results.second["Base Case"]);
		return bin1.map((b, i) => ({
			range: b.range,
			difference: bin2[i].count - b.count,
		}));
	};

	return (
		<div className="min-h-screen bg-gray-50 p-8">
			<h1 className="text-[9vh] w-[80%] leading-[9vh] hand mx-auto text-center mb-6 text-black mt-[3vh]">
				Duck-2-Duck {"(Sprint-2-Sprint)"} Comparison
			</h1>

			{/* Selection Panel */}
			{/* Selection Panel */}
			<div className="flex flex-wrap gap-6 items-end mb-[4vh] mx-auto w-fit mt-[4vh]">
				{["First Sprint", "Second Sprint"].map((label, idx) => {
					const value = idx === 0 ? firstSprint : secondSprint;
					const setValue = idx === 0 ? setFirstSprint : setSecondSprint;
					return (
						<div key={label} className="flex flex-col">
							<label className="mb-1 text-black font-extrabold text-[2vh]">
								{label}
							</label>
							<select
								value={value}
								onChange={(e) => setValue(e.target.value)}
								className="border-[1.5px] border-gray-500 rounded-lg p-2 hover:border-gray-400 text-[2vh]"
							>
								<option value="">Select Sprint</option>
								{sprints.map((s) => {
									// Disable option if it's already selected in the other dropdown
									const isDisabled =
										(idx === 0 && s.id === secondSprint) ||
										(idx === 1 && s.id === firstSprint);
									return (
										<option key={s.id} value={s.id} disabled={isDisabled}>
											{s.originalName || s.id}
										</option>
									);
								})}
							</select>
						</div>
					);
				})}

				<button
					onClick={runComparison}
					className="pushable ml-[1vw]"
					disabled={
						!firstSprint || !secondSprint || firstSprint === secondSprint
					} // extra safety
				>
					<span className="front front-blue text-[2vh] flex items-center justify-center gap-[1vw] font-extrabold text-black">
						{loading ? "Comparing..." : "Compare"}
					</span>
				</button>
			</div>

			{/* Charts */}
			{results && (
				<div className="space-y-12 w-[80vw] mx-auto">
					<div className="grid grid-cols-1 md:grid-cols-2 gap-8">
						{["first", "second"].map((key, idx) => {
							const scenario = results[key]["Base Case"];
							return (
								<div
									key={key}
									className="bg-white rounded-xl p-4 shadow-lg border-[1px] border-neutral-400"
								>
									<h2 className="text-xl font-semibold mb-2">
										{key === "first" ? "Sprint 1" : "Sprint 2"}
									</h2>
									<ResponsiveContainer width="100%" height={300}>
										<BarChart data={binData(scenario)}>
											<XAxis dataKey="range" stroke="#555" />
											<YAxis stroke="#555" />
											<Tooltip
												contentStyle={{
													backgroundColor: "#fff",
													borderColor: "#ccc",
												}}
											/>
											<Bar dataKey="count" fill={COLORS[idx % COLORS.length]} />
										</BarChart>
									</ResponsiveContainer>
								</div>
							);
						})}
					</div>

					{/* Difference Chart */}
					<div className="bg-white rounded-xl p-4 shadow-lg mb-[7vh] border-[1px] border-neutral-400">
						<h2 className="text-xl font-semibold mb-2">
							Difference (Sprint 2 - Sprint 1)
						</h2>
						<ResponsiveContainer width="100%" height={300}>
							<BarChart data={differenceData()}>
								<XAxis dataKey="range" stroke="#555" />
								<YAxis stroke="#555" />
								<Tooltip
									contentStyle={{
										backgroundColor: "#fff",
										borderColor: "#ccc",
									}}
									formatter={(value) => [value, "Difference"]}
								/>
								<Bar dataKey="difference" fill={COLORS[2]} />
							</BarChart>
						</ResponsiveContainer>
					</div>
				</div>
			)}
		</div>
	);
}
