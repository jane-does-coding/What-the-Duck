"use client";

import { useState } from "react";

export default function PredictPage() {
	const [loading, setLoading] = useState(false);
	const [result, setResult] = useState<any>(null);

	async function runPrediction() {
		setLoading(true);
		const res = await fetch("/api/predict");
		const data = await res.json();
		setResult(data);
		setLoading(false);
	}

	return (
		<div className="min-h-screen p-10 flex flex-col items-center">
			<h1 className="text-[10vh] mb-4 text-center hand">Doomed Duck</h1>

			<p className="text-neutral-800 font-extrabold mb-8 text-center max-w-xl text-[2.5vh]">
				Chaos Predictor
			</p>
			<button
				onClick={runPrediction}
				disabled={loading}
				className="px-8 py-4 bg-orange-600 text-white text-xl font-semibold rounded-xl shadow-lg hover:bg-orange-700 transition"
			>
				{loading ? "Predicting..." : "Predict"}
			</button>

			{result && (
				<pre className="mt-10 bg-neutral-900 text-white p-6 rounded-xl w-full max-w-3xl text-sm overflow-x-auto">
					{JSON.stringify(result, null, 2)}
				</pre>
			)}
		</div>
	);
}
