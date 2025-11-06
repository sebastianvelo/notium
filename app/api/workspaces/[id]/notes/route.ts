import { APIResponse, ParamsId } from "@/app/api/types";
import NoteService from "@/lib/service/NoteService";
import Note from "@/types/model/Note";
import NotesListSectionView from "@/types/view/NotesListSectionView";
import { NextResponse } from "next/server";

export async function GET(request: Request, { params }: ParamsId): APIResponse<NotesListSectionView[]> {
    const { id: workspaceId } = await params;
    const { searchParams } = new URL(request.url);
    const query = searchParams.get('query') || '';

    try {
        const sections = await NoteService.getNotesView(workspaceId, query);
        return NextResponse.json(sections);
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
