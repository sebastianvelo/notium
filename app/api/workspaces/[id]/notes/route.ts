import { APIResponse, ParamsId } from "@/app/api/types";
import NoteService from "@/lib/service/NoteService";
import Note from "@/types/model/Note";
import { NextResponse } from "next/server";

export async function GET(request: Request, { params }: ParamsId): APIResponse<Note[]> {
    const { id: workspaceId } = await params;
    
    try {
        const notes: Note[] = await NoteService.getNotesByWorkspace(workspaceId);
        return NextResponse.json(notes);
    } catch {
        return NextResponse.json({ error: "Failed" }, { status: 500 });
    }
}

export async function POST(request: Request, { params }: ParamsId): APIResponse<Note> {
    const { id: workspaceId } = await params;

    try {
        const body = await request.json();
        const newNote: Note = await NoteService.createNote({ ...body, workspaceId });
        return NextResponse.json(newNote, { status: 201 });
    } catch {
        return NextResponse.json({ error: "Failed to create" }, { status: 500 });
    }
}
