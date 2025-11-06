import { APIResponse, ParamsNoteId } from "@/app/api/types";
import NoteService from "@/lib/service/NoteService";
import Note from "@/types/model/Note";
import { NextResponse } from "next/server";

export async function GET(request: Request, { params }: ParamsNoteId): APIResponse<Note> {
    const { noteId } = await params;
    try {
        const note: Note | null = await NoteService.getNoteById(noteId);
        if (!note) return NextResponse.json({ error: "Not found" }, { status: 404 });
        return NextResponse.json(note);
    } catch (err) {
        console.error("GET /api/notes/[noteId] error:", err);
        return NextResponse.json({ error: "Failed to fetch" }, { status: 500 });
    }
}

export async function PUT(request: Request, { params }: ParamsNoteId): APIResponse<Note> {
    const { noteId } = await params;
    try {
        const body = await request.json();
        const updated: Note | null = await NoteService.updateNote(noteId, body);
        console.log(updated)
        if (!updated) return NextResponse.json({ error: "Not found" }, { status: 404 });
        return NextResponse.json(updated);
    } catch (err) {
        console.error("PUT /api/notes/[noteId] error:", err);
        return NextResponse.json({ error: "Failed to update" }, { status: 500 });
    }
}

export async function DELETE(request: Request, { params }: ParamsNoteId): APIResponse {
    const { noteId } = await params;
    try {
        const ok = await NoteService.deleteNote(noteId);
        return NextResponse.json({ success: ok });
    } catch (err) {
        console.error("DELETE /api/notes/[noteId] error:", err);
        return NextResponse.json({ error: "Failed to delete" }, { status: 500 });
    }
}
