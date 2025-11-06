import { NextResponse } from "next/server";
import NoteService from "@/lib/service/NoteService";

export async function GET(request: Request, { params }: { params: { id: string } }) {
    const workspaceId = params.id;
    try {
        const notes = await NoteService.getNotesByWorkspace(workspaceId);
        return NextResponse.json(notes);
    } catch {
        return NextResponse.json({ error: "Failed" }, { status: 500 });
    }
}

export async function POST(request: Request, { params }: { params: { id: string } }) {
    const workspaceId = params.id;
    try {
        const body = await request.json();
        const newNote = await NoteService.createNote({ ...body, workspaceId });
        return NextResponse.json(newNote, { status: 201 });
    } catch {
        return NextResponse.json({ error: "Failed to create" }, { status: 500 });
    }
}
