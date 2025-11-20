"use client";

import { useState } from "react";

export default function UploadPage() {
	const [file, setFile] = useState<File | null>(null);
	const [loading, setLoading] = useState(false);
	const [result, setResult] = useState("");

	async function handleUpload() {
		if (!file) return;

		setLoading(true);
		const formData = new FormData();
		formData.append("file", file);

		const res = await fetch("/api/upload", {
			method: "POST",
			body: formData,
		});

		const data = await res.json();
		setResult(JSON.stringify(data, null, 2));
		setLoading(false);
	}

	return (
		<div className="min-h-screen flex flex-col items-center justify-center p-6">
			<div className="flex flex-col translate-y-[-10vh] items-center justify-center">
				<h1 className="text-[10vh] leading-[10vh] mb-6 hand">
					Upload Sprint Plan
				</h1>
				<p className="text-[2.5vh] font-extrabold mb-[3vh]">
					Supported file types: .csv, .json, .pdf, .txt
				</p>
				<div className="border p-6 rounded-xl bg-white shadow-md w-full max-w-lg">
					<input
						type="file"
						accept=".json,.pdf,.txt,.csv"
						onChange={(e) => setFile(e.target.files?.[0] || null)}
						className="border p-3 rounded-md w-full mb-4"
					/>

					<button
						onClick={handleUpload}
						disabled={loading || !file}
						className="pushable w-full"
					>
						<span className="front front-blue text-[2.5vh] flex items-center justify-center gap-[1vw] font-extrabold text-black">
							{loading ? "Uploading..." : "Upload File"}
						</span>
					</button>
				</div>
			</div>

			<img
				src="/bottom-art.png"
				className="w-[100vw] absolute bottom-0 left-0"
				alt=""
			/>
			{result && (
				<>
					{/* <pre className="mt-6 p-4 bg-neutral-900 text-white rounded-xl w-full max-w-2xl overflow-auto text-sm">
					{result}
				</pre> */}
					<h3 className="text-[2.5vh] font-extrabold">
						File Uploaded Successfully!
					</h3>
				</>
			)}
		</div>
	);
}
