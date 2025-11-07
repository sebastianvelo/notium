import { APIResponse, ParamsId } from "@/app/api/types";
import NoteService from "@/lib/service/NoteService";
import Note from "@/types/model/Note";
import NotesListSectionView from "@/types/view/NotesListSectionView";
import { NextResponse } from "next/server";

export async function GET(request: Request, { params }: ParamsId): APIResponse<NotesListSectionView[]> {
    const { id: workspaceId } = await params;
    const { searchParams } = new URL(request.url);
    const query = searchParams.get("query") || "";

    try {
        console.log("━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━");
        console.log("🔵 [GET Notes] Inicio");
        console.log("  ├─ Workspace ID:", workspaceId);
        console.log("  └─ Query:", query);

        const { createClient } = await import("@/lib/db/supabase/SupabaseServer");
        const supabase = await createClient();
        const { data: { user }, error: authError } = await supabase.auth.getUser();

        if (authError || !user) {
            console.error("❌ Usuario no autenticado:", authError);
            console.log("━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━");
            return NextResponse.json(
                { error: "No autorizado" },
                { status: 401 }
            );
        }
        
        const sections = await NoteService.getNotesView(workspaceId, user?.id, query);

        console.log("✅ Notas obtenidas:", sections.length, "secciones");
        console.log("━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━");

        return NextResponse.json(sections);
    } catch (error) {
        console.log("━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━");
        console.error("❌ [GET Notes] Error:");
        console.error("  ├─ Type:", error instanceof Error ? error.constructor.name : typeof error);
        console.error("  ├─ Message:", error instanceof Error ? error.message : String(error));
        console.error("  └─ Stack:", error instanceof Error ? error.stack : "N/A");
        console.log("━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━");

        return NextResponse.json(
            { error: "Failed to get notes", details: error instanceof Error ? error.message : String(error) },
            { status: 500 }
        );
    }
}

export async function POST(request: Request, { params }: ParamsId): APIResponse<Note> {
    const { id: workspaceId } = await params;

    try {
        console.log("━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━");
        console.log("🔵 [POST Note] Inicio");
        console.log("  └─ Workspace ID:", workspaceId);

        // Obtener usuario autenticado
        const { createClient } = await import("@/lib/db/supabase/SupabaseServer");
        const supabase = await createClient();
        const { data: { user }, error: authError } = await supabase.auth.getUser();

        if (authError || !user) {
            console.error("❌ Usuario no autenticado:", authError);
            console.log("━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━");
            return NextResponse.json(
                { error: "No autorizado" },
                { status: 401 }
            );
        }

        console.log("✅ Usuario autenticado:", user.id);

        const body = await request.json();
        console.log("📦 Body recibido:", JSON.stringify(body, null, 2));

        if (body.title === undefined) {
            console.log("⚠️ Warning: title no está definido, usando string vacío");
        }
        if (body.content === undefined) {
            console.log("⚠️ Warning: content no está definido, usando string vacío");
        }

        const noteData = {
            ...body,
            workspaceId,
            createdBy: user.id
        };

        console.log("📝 Datos para crear nota:", JSON.stringify(noteData, null, 2));
        console.log("🔄 Llamando a NoteService.createNote...");

        const newNote = await NoteService.createNote(noteData);

        console.log("✅ Nota creada exitosamente:", JSON.stringify(newNote, null, 2));
        console.log("━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━");

        return NextResponse.json(newNote, { status: 201 });
    } catch (error) {
        console.log("━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━");
        console.error("❌ [POST Note] Error:");
        console.error("  ├─ Type:", error instanceof Error ? error.constructor.name : typeof error);
        console.error("  ├─ Message:", error instanceof Error ? error.message : String(error));
        console.error("  └─ Stack:", error instanceof Error ? error.stack : "N/A");

        // Si es un error de Supabase
        if (error && typeof error === 'object') {
            if ('code' in error) {
                console.error("  ├─ Supabase Error Code:", (error as any).code);
            }
            if ('details' in error) {
                console.error("  ├─ Supabase Details:", (error as any).details);
            }
            if ('hint' in error) {
                console.error("  └─ Supabase Hint:", (error as any).hint);
            }
        }
        console.log("━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━");

        return NextResponse.json(
            {
                error: "Failed to create note",
                details: error instanceof Error ? error.message : String(error)
            },
            { status: 500 }
        );
    }
}