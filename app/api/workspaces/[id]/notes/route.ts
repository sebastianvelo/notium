import { ParamsId } from "@/app/api/types";
import NoteService from "@/lib/service/NoteService";
import { NextResponse } from "next/server";

export async function GET(request: Request, { params }: ParamsId) {
    const { id: workspaceId } = await params;
    
    try {
        const notes = await NoteService.getNotesByWorkspace(workspaceId);
        return NextResponse.json(notes);
    } catch {
        return NextResponse.json({ error: "Failed" }, { status: 500 });
    }
}

export async function POST(request: Request, { params }: ParamsId) {
    const { id: workspaceId } = await params;

    try {
        const body = await request.json();
        const newNote = await NoteService.createNote({ ...body, workspaceId });
        return NextResponse.json(newNote, { status: 201 });
    } catch {
        return NextResponse.json({ error: "Failed to create" }, { status: 500 });
    }
}
