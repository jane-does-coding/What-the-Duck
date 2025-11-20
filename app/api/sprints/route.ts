// app/api/sprints/route.ts
import { NextResponse } from "next/server";
import prisma from "@/app/libs/prismadb";
import getCurrentUser from "@/app/actions/getCurrentUser";

export async function GET() {
	const currentUser = await getCurrentUser();
	if (!currentUser) {
		return NextResponse.json({ error: "Unauthorized" }, { status: 401 });
	}

	const uploads = await prisma.fileUpload.findMany({
		where: { userId: currentUser.id },
		orderBy: { createdAt: "desc" },
		select: { id: true, createdAt: true, originalName: true },
	});

	return NextResponse.json(uploads);
}
