import { NextResponse } from "next/server";
import prisma from "@/app/libs/prismadb";
import csv from "csvtojson";
import { PdfReader } from "pdfreader";

export async function POST(req: Request) {
	try {
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
		let uploadType: any = "json";

		/* JSON */
		if (fileName.endsWith(".json")) {
			uploadType = "json";
			jsonOutput = JSON.parse(buffer.toString());
		} else if (fileName.endsWith(".txt")) {
			/* TXT */
			uploadType = "text";
			jsonOutput = { text: buffer.toString("utf-8") };
		} else if (fileName.endsWith(".csv")) {
			/* CSV */
			uploadType = "csv";
			jsonOutput = await csv().fromString(buffer.toString());
		} else if (fileName.endsWith(".pdf")) {
			/* PDF */
			uploadType = "pdf";

			jsonOutput = await new Promise((resolve) => {
				let textContent = "";
				new PdfReader().parseBuffer(buffer, (err, item) => {
					if (err) resolve({ text: "" });
					if (item && item.text) textContent += item.text + " ";
					if (!item) resolve({ text: textContent });
				});
			});
		} else {
			/* Unsupported */
			return NextResponse.json(
				{ error: "Unsupported file type" },
				{ status: 400 }
			);
		}

		// TODO: replace with real session user
		const dummyUserId = "675f00000000000000000000";

		const upload = await prisma.fileUpload.create({
			data: {
				originalName: file.name,
				mimeType,
				size,
				uploadType,
				jsonData: jsonOutput,
				userId: dummyUserId,
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
