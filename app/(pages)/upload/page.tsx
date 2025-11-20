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
			<h1 className="text-4xl font-bold mb-6">Upload Sprint Plan</h1>

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
					className="px-4 py-2 bg-black text-white rounded-md"
				>
					{loading ? "Uploading..." : "Upload File"}
				</button>
			</div>

			{result && (
				<pre className="mt-6 p-4 bg-neutral-900 text-white rounded-xl w-full max-w-2xl overflow-auto text-sm">
					{result}
				</pre>
			)}
		</div>
	);
}
