import { NextResponse } from "next/server";
import prisma from "@/app/libs/prismadb";
import { ObjectId } from "mongodb";

export async function DELETE(
	req: Request,
	context: { params: Promise<{ id: string }> }
) {
	const { id } = await context.params; // <- FIX HERE

	if (!id || !ObjectId.isValid(id)) {
		return NextResponse.json({ error: "Invalid ID format" }, { status: 400 });
	}

	try {
		const deleted = await prisma.fileUpload.delete({
			where: { id },
		});

		return NextResponse.json(deleted, { status: 200 });
	} catch (error) {
		console.error("Error deleting file:", error);
		return NextResponse.json(
			{ error: "Failed to delete file" },
			{ status: 500 }
		);
	}
}
