import { NextResponse } from "next/server";
import prisma from "@/app/libs/prismadb";
import csv from "csvtojson";
import { PdfReader } from "pdfreader";
import getCurrentUser from "@/app/actions/getCurrentUser";
import { UploadType } from "@prisma/client";

export async function POST(req: Request) {
	let uploadType: UploadType;

	try {
		const currentUser = await getCurrentUser();
		if (!currentUser) {
			return NextResponse.json({ error: "Unauthorized" }, { status: 401 });
		}

		const formData = await req.formData();
		const file = formData.get("file") as File;

		if (!file) {
			return NextResponse.json({ error: "No file uploaded" }, { status: 400 });
		}

		const buffer = Buffer.from(await file.arrayBuffer());
		const fileName = file.name.toLowerCase();
		const mimeType = file.type;
		const size = file.size;

		let jsonOutput: any = {};
		let uploadType = "json";

		/* Handle JSON file */
		if (fileName.endsWith(".json")) {
			uploadType = "json";
			jsonOutput = JSON.parse(buffer.toString());
		} else if (fileName.endsWith(".txt")) {
			/* Handle TXT file */
			uploadType = "text";
			const textContent = buffer.toString("utf-8");
			jsonOutput = { text: textContent }; // stored as JSON object
		} else if (fileName.endsWith(".csv")) {
			/* Handle CSV file */
			uploadType = "csv";
			jsonOutput = await csv().fromString(buffer.toString());
		} else if (fileName.endsWith(".pdf")) {
			/* Handle PDF file */
			uploadType = "pdf";
			jsonOutput = await new Promise((resolve) => {
				let textContent = "";
				new PdfReader().parseBuffer(buffer, (err, item) => {
					if (err) resolve({ text: "" });
					if (item && item.text) textContent += item.text + " ";
					if (!item) resolve({ text: textContent }); // JSON object
				});
			});
		} else {
			/* Unsupported file types */
			return NextResponse.json(
				{ error: "Unsupported file type" },
				{ status: 400 }
			);
		}

		/* Store in database */
		const upload = await prisma.fileUpload.create({
			data: {
				originalName: file.name,
				mimeType,
				size,
				uploadType: uploadType as UploadType,
				jsonData: jsonOutput,
				userId: currentUser.id,
			},
		});

		return NextResponse.json({
			message: "File stored successfully",
			uploadId: upload.id,
			parsed: jsonOutput,
		});
	} catch (err) {
		console.error("UPLOAD ERROR:", err);
		return NextResponse.json(
			{ error: "Internal server error" },
			{ status: 500 }
		);
	}
}
