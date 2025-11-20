// app/api/simulator/route.ts
import { NextResponse } from "next/server";
import prisma from "@/app/libs/prismadb";
import getCurrentUser from "@/app/actions/getCurrentUser";

export async function GET(req: Request) {
	const currentUser = await getCurrentUser();
	if (!currentUser) {
		return NextResponse.json({ error: "Unauthorized" }, { status: 401 });
	}
	const USER_ID = currentUser.id;

	// Fetch the latest sprint upload
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

	// Ensure jsonData is an object
	const sprintDataRaw = upload.jsonData;
	const sprintData =
		typeof sprintDataRaw === "object" && sprintDataRaw !== null
			? sprintDataRaw
			: {};

	// Define some “what-if” scenarios (safe, finite number)
	const scenarios = [
		{ name: "Base Case", adjust: {} },
		{ name: "High Complexity", adjust: { complexity: 8 } },
		{ name: "Low Team Experience", adjust: { teamExperience: 2 } },
		{ name: "Many Blockers", adjust: { blockers: 5 } },
		{ name: "High Risk", adjust: { riskFactor: 8 } },
		{ name: "Fast Velocity", adjust: { velocity: 8 } },
	];

	// Simulation function
	function simulateScore(sprint: Record<string, any>) {
		const complexity = sprint.complexity ?? 5;
		const teamExperience = sprint.teamExperience ?? 5;
		const blockers = sprint.blockers ?? 0;
		const velocity = sprint.velocity ?? 5;
		const riskFactor = sprint.riskFactor ?? 5;

		const baseScore =
			50 +
			teamExperience * 4 -
			complexity * 3 -
			blockers * 4 +
			velocity * 2 -
			riskFactor * 2;

		const chaos = Math.random() * 15 - 7.5; // random swing
		const score = baseScore + chaos;

		return Math.max(0, Math.min(100, Math.round(score)));
	}

	// Run simulations
	const results: Record<string, number[]> = {};
	for (const scenario of scenarios) {
		const dist: number[] = [];
		for (let i = 0; i < 1000; i++) {
			const sprint = {
				...(sprintData as Record<string, any>),
				...scenario.adjust,
			};
			dist.push(simulateScore(sprint));
		}
		results[scenario.name] = dist;
	}

	return NextResponse.json(results);
}
