import { NextResponse } from "next/server";
import prisma from "@/app/libs/prismadb";
import { GoogleGenerativeAI } from "@google/generative-ai";

export async function GET() {
	try {
		const USER_ID = "675f00000000000000000000";

		const upload = await prisma.fileUpload.findFirst({
			where: { userId: USER_ID },
			orderBy: { createdAt: "desc" },
		});

		if (!upload) {
			return NextResponse.json(
				{ error: "No sprint file found for this user" },
				{ status: 404 }
			);
		}

		const sprintJson = upload.jsonData;

		const genAI = new GoogleGenerativeAI(process.env.GEMINI_API_KEY!);
		const model = genAI.getGenerativeModel({ model: "gemini-2.5-pro" });

		const prompt = `
You are "Duck It, It’s Unclear" — an AI that finds vague sprint descriptions,
missing details, anti-practices, and unclear planning behavior.

Return ONLY JSON in this exact format:

make sure it has 4 items in each array and each item is 15-20 words long.

{
  "antiPractices": string[],
  "unclearDescriptions": string[],
  "missingInformation": string[],
  "riskAmplifiers": string[],
  "inconsistencies": string[],
  "recommendations": string[]
}

Analyze the sprint plan and detect:
- Vague or ambiguous feature descriptions
- Missing acceptance criteria
- Missing deadlines, owners, or task dependencies
- Overloaded team members
- No definition of done
- Missing risk identification
- Tasks that are too large or too small
- Non-SMART objectives
- Missing test plans
- Dependencies not documented
- Any unclear or confusing wording
- Logical contradictions in the sprint

Sprint Data:
${JSON.stringify(sprintJson)}
    `;

		const result = await model.generateContent(prompt);
		const response = await result.response;
		const raw = response.text();
		const clean = raw.replace(/```json|```/g, "");

		return NextResponse.json({
			analyzedFile: upload.originalName,
			unclearAnalysis: JSON.parse(clean),
		});
	} catch (err: any) {
		console.error("Unclear Analysis Error:", err);
		return NextResponse.json(
			{ error: err.message || "Failed to analyze sprint" },
			{ status: 500 }
		);
	}
}
