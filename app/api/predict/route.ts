import { NextResponse } from "next/server";
import prisma from "@/app/libs/prismadb";
import { GoogleGenerativeAI } from "@google/generative-ai";
import getCurrentUser from "@/app/actions/getCurrentUser";

export async function GET() {
	try {
		const curentUser = await getCurrentUser();
		if (!curentUser) {
			return NextResponse.json({ error: "Unauthorized" }, { status: 401 });
		}
		const USER_ID = curentUser.id;

		const upload = await prisma.fileUpload.findFirst({
			where: { userId: USER_ID },
			orderBy: { createdAt: "desc" },
		});

		if (!upload) {
			return NextResponse.json(
				{ error: "No uploads found for this user." },
				{ status: 404 }
			);
		}

		const sprintJson = upload.jsonData;

		const genAI = new GoogleGenerativeAI(process.env.GEMINI_API_KEY!);
		const model = genAI.getGenerativeModel({ model: "gemini-2.5-pro" });

		const prompt = `
You are QuackCast, the Chaos & Disaster Forecast AI.

Analyze this sprint plan and return ONLY valid JSON:

majorRisks has to have 4 items and each one should be 15-20 words long.
Tasks at risk should have 3 tasks with task id and then no higher than 6 words description for each one.
Likely Blockers should have 3 items make it so each one is like 10-15 words long.
Recommendations should have 4 items and each one should be 15-20 words long.

{
  "riskScore": number,
  "riskLevel": "Low" | "Medium" | "High" | "Extremely High",
  "majorRisks": string[],
  "likelyBlockers": string[],
  "timelineConfidence": "Low" | "Medium" | "High" | "Extremely High",
  "bottlenecks": string[],
  "atRiskTasks": string[],
  "recommendations": string[]
}

Sprint Data:
${JSON.stringify(sprintJson)}
    `;

		const result = await model.generateContent(prompt);
		const response = await result.response;
		const rawText = response.text();

		const clean = rawText.replace(/```json|```/g, "");

		return NextResponse.json({
			analyzedFile: upload.originalName,
			prediction: JSON.parse(clean),
		});
	} catch (err: any) {
		console.error("Prediction Error:", err);
		return NextResponse.json(
			{ error: err.message || "Prediction failed" },
			{ status: 500 }
		);
	}
}
