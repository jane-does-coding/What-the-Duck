import { NextResponse } from "next/server";
import prisma from "@/app/libs/prismadb";
import { getServerSession } from "next-auth";
import { authOptions } from "@/pages/api/auth/[...nextauth]";

export async function GET() {
	const session = await getServerSession(authOptions);
	if (!session)
		return NextResponse.json({ error: "Unauthorized" }, { status: 401 });

	const user = await prisma.user.findUnique({
		where: { email: session.user?.email! },
		include: { uploads: true },
	});

	return NextResponse.json(user);
}

export async function POST(req: Request) {
	const session = await getServerSession(authOptions);
	if (!session)
		return NextResponse.json({ error: "Unauthorized" }, { status: 401 });

	const { name, username } = await req.json();

	const updated = await prisma.user.update({
		where: { email: session.user?.email! },
		data: { name, username },
	});

	return NextResponse.json(updated);
}
