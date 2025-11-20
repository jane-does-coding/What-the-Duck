// app/api/simulator/route.ts
import { NextResponse } from "next/server";
import prisma from "@/app/libs/prismadb";

export async function GET() {
	// Get userId from auth or query
	// const { searchParams } = new URL(req.url);

	const USER_ID = "675f00000000000000000000"; // TEMP STATIC

	const upload = await prisma.fileUpload.findFirst({
		where: { userId: USER_ID },
		orderBy: { createdAt: "desc" },
	});

	if (!upload) {
		return NextResponse.json(
			{ error: "No uploaded sprint data found." },
			{ status: 404 }
		);
	}

	const sprintData = upload.jsonData; // Already parsed JSON

	function simulateScore(sprint: any): number {
		// example “realistic chaos model”
		const complexity = sprint.complexity ?? 5;
		const teamExperience = sprint.teamExperience ?? 5;
		const blockers = sprint.blockers ?? 0;

		// randomness for chaos
		const randomFactor = Math.random() * 20 - 10; // -10 to +10 swing

		let score =
			50 + teamExperience * 5 - complexity * 3 - blockers * 4 + randomFactor;

		return Math.max(0, Math.min(100, Math.round(score)));
	}

	const distribution: number[] = [];

	for (let i = 0; i < 1000; i++) {
		distribution.push(simulateScore(sprintData));
	}

	const best = Math.max(...distribution);
	const worst = Math.min(...distribution);
	const mostLikely = Math.round(
		distribution.reduce((a, b) => a + b, 0) / distribution.length
	);

	return NextResponse.json({
		distribution,
		best,
		worst,
		mostLikely,
	});
}
