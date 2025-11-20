// app/api/simulator/[sprintId]/route.ts
import { NextResponse } from "next/server";
import prisma from "@/app/libs/prismadb";
import getCurrentUser from "@/app/actions/getCurrentUser";

export async function GET(req: Request) {
	const currentUser = await getCurrentUser();
	if (!currentUser)
		return NextResponse.json({ error: "Unauthorized" }, { status: 401 });

	const url = new URL(req.url);
	const sprintId = url.pathname.split("/").pop();

	if (!sprintId)
		return NextResponse.json({ error: "Missing sprintId" }, { status: 400 });

	const upload = await prisma.fileUpload.findUnique({
		where: { id: sprintId },
	});

	if (!upload)
		return NextResponse.json({ error: "Sprint not found" }, { status: 404 });

	const sprintData =
		typeof upload.jsonData === "object" && upload.jsonData !== null
			? upload.jsonData
			: {};

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
		const chaos = Math.random() * 15 - 7.5;
		return Math.max(0, Math.min(100, Math.round(baseScore + chaos)));
	}

	const scenarios = [{ name: "Base Case", adjust: {} }];

	const results: Record<string, number[]> = {};
	for (const scenario of scenarios) {
		const dist: number[] = [];
		for (let i = 0; i < 1000; i++) {
			const sprint = { ...sprintData, ...scenario.adjust };
			dist.push(simulateScore(sprint));
		}
		results[scenario.name] = dist;
	}

	return NextResponse.json(results);
}
