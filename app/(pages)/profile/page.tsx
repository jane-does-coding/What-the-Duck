"use client";

import Link from "next/link";
import React, { useEffect, useState } from "react";
import { VscTools } from "react-icons/vsc";

export default function ProfilePage() {
	const [profile, setProfile] = useState<any>(null);
	const [loading, setLoading] = useState(true);

	const [name, setName] = useState("");
	const [username, setUsername] = useState("");

	async function loadProfile() {
		const res = await fetch("/api/profile");
		const json = await res.json();
		setProfile(json);
		setName(json.name);
		setUsername(json.username);
		setLoading(false);
	}

	useEffect(() => {
		loadProfile();
	}, []);

	async function saveProfile() {
		await fetch("/api/profile", {
			method: "POST",
			body: JSON.stringify({ name, username }),
		});
		loadProfile();
	}

	async function deleteFile(id: string) {
		await fetch(`/api/uploads/${id}`, { method: "DELETE" });
		loadProfile();
	}

	if (loading) return <div className="p-10">Loading...</div>;

	return (
		<div className="p-10 max-w-[60vw] mx-auto flex flex-col items-center justify-center text-black">
			<h1 className="text-[10vh] mb-6 hand ">My Profile</h1>

			{/* Profile Editor */}
			<div className="bg-white p-6 rounded-xl shadow-md border mb-10 w-full">
				<h2 className="text-[2.5vh] font-semibold mb-4">Edit Profile</h2>

				<div className="mb-4">
					<label className="block font-medium mb-1">Name</label>
					<input
						className="border p-2 rounded w-full"
						value={name}
						onChange={(e) => setName(e.target.value)}
					/>
				</div>

				<div className="mb-4">
					<label className="block font-medium mb-1">Username</label>
					<input
						className="border p-2 rounded w-full"
						value={username}
						onChange={(e) => setUsername(e.target.value)}
					/>
				</div>

				<button
					onClick={saveProfile}
					className="px-6 py-2 bg-blue-600 text-white rounded-lg"
				>
					Save
				</button>
			</div>

			{/* Uploaded Files */}
			<div className="bg-white p-6 w-full rounded-xl shadow-md border relative">
				<h2 className="text-[2.5vh] font-semibold mb-4">Your Uploaded Files</h2>

				{profile.uploads.length === 0 && (
					<Link href={"/upload"} className="my-[2vh] text-[2vh] underline">
						No uploaded files. upload a file
					</Link>
				)}

				<ul className="space-y-3">
					{profile.uploads.map((file: any) => (
						<li
							key={file.id}
							className="flex justify-between items-center p-3 bg-gray-100 rounded-lg border"
						>
							<div>
								<p className="font-medium">{file.originalName}</p>
								<p className="text-sm text-gray-500">
									{file.mimeType} — {Math.round(file.size / 1024)} KB
								</p>
							</div>

							<button
								onClick={() => deleteFile(file.id)}
								className="px-4 py-2 bg-red-600 text-white rounded-lg"
							>
								Delete
							</button>
						</li>
					))}
				</ul>
			</div>
		</div>
	);
}
