"use client";
import NoteItem from "@/components/pages/workspaces/note-item/NoteItem";
import MemberList from "@/components/pages/workspaces/member-list/MemberList";
import NoteEditor from "@/components/pages/workspaces/note-editor/NoteEditor";
import Button from "@/components/ui/atoms/button/Button";
import Tabs from "@/components/ui/molecules/tabs/Tabs";
import { Member, Note } from "@/types";
import { useParams } from "next/navigation";
import { useState } from "react";

const WorkspacePage: React.FC = () => {
    const params = useParams();
    const workspaceId = params.id as string;

    // Mock data
    const [workspace] = useState({
        id: workspaceId,
        name: "Personal Projects",
        description: "My personal notes and ideas",
    });

    const [notes, setNotes] = useState<Note[]>([
        {
            id: "1",
            title: "Project Ideas",
            content: "List of new project ideas to explore...",
            workspaceId,
            createdBy: "user1",
            createdAt: "2024-01-15",
            updatedAt: "2024-01-16",
            sharedWith: [],
        },
        {
            id: "2",
            title: "Meeting Notes",
            content: "Notes from team meeting on Jan 20...",
            workspaceId,
            createdBy: "user1",
            createdAt: "2024-01-20",
            updatedAt: "2024-01-20",
            sharedWith: ["user2"],
        },
    ]);

    const [members] = useState<Member[]>([
        {
            id: "1",
            email: "john@example.com",
            name: "John Doe",
            role: "owner",
            joinedAt: "2024-01-01",
        },
        {
            id: "2",
            email: "jane@example.com",
            name: "Jane Smith",
            role: "editor",
            joinedAt: "2024-01-10",
        },
    ]);

    const [selectedNote, setSelectedNote] = useState<Note | null>(notes[0] || null);
    const [searchQuery, setSearchQuery] = useState("");

    const filteredNotes = notes.filter(note =>
        note.title.toLowerCase().includes(searchQuery.toLowerCase()) ||
        note.content.toLowerCase().includes(searchQuery.toLowerCase())
    );

    const myNotes = filteredNotes.filter(note => note.createdBy === "user1");
    const sharedNotes = filteredNotes.filter(note => note.sharedWith.length > 0);

    const handleCreateNote = () => {
        const newNote: Note = {
            id: Date.now().toString(),
            title: "New Note",
            content: "",
            workspaceId,
            createdBy: "user1",
            createdAt: new Date().toISOString(),
            updatedAt: new Date().toISOString(),
            sharedWith: [],
        };
        setNotes([newNote, ...notes]);
        setSelectedNote(newNote);
    };

    const handleSaveNote = (data: { title: string; content: string }) => {
        console.log("Saving note:", data);
        // TODO: Call API to save note
    };

    const handleDeleteNote = () => {
        if (selectedNote) {
            setNotes(notes.filter(n => n.id !== selectedNote.id));
            setSelectedNote(notes[0] || null);
        }
    };

    const notesContent = (
        <div className="flex h-[calc(100vh-12rem)]">
            <div className="w-80 border-r border-secondary-200 flex flex-col">
                <div className="p-4 border-b border-secondary-200">
                    <input
                        type="text"
                        placeholder="Search notes..."
                        value={searchQuery}
                        onChange={(e) => setSearchQuery(e.target.value)}
                        className="w-full px-3 py-2 border border-secondary-300 rounded-lg focus:outline-none focus:ring-2 focus:ring-primary-500"
                    />
                    <Button className="w-full mt-3 flex items-center" onClick={handleCreateNote}>
                        <svg className="w-5 h-5 mr-2" fill="none" stroke="currentColor" viewBox="0 0 24 24">
                            <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2} d="M12 4v16m8-8H4" />
                        </svg>
                        New Note
                    </Button>
                </div>

                <div className="flex-1 overflow-y-auto">
                    <div className="py-2">
                        <div className="px-4 py-2">
                            <h3 className="text-xs font-semibold text-secondary-500 uppercase">My Notes</h3>
                        </div>
                        {myNotes.map(note => (
                            <NoteItem
                                key={note.id}
                                note={note}
                                active={selectedNote?.id === note.id}
                                onClick={() => setSelectedNote(note)}
                            />
                        ))}
                    </div>

                    {sharedNotes.length > 0 && (
                        <div className="py-2 border-t border-secondary-200">
                            <div className="px-4 py-2">
                                <h3 className="text-xs font-semibold text-secondary-500 uppercase">Shared with me</h3>
                            </div>
                            {sharedNotes.map(note => (
                                <NoteItem
                                    key={note.id}
                                    note={note}
                                    active={selectedNote?.id === note.id}
                                    onClick={() => setSelectedNote(note)}
                                />
                            ))}
                        </div>
                    )}

                    {filteredNotes.length === 0 && (
                        <div className="text-center py-8 text-secondary-500 text-sm">
                            No notes found
                        </div>
                    )}
                </div>
            </div>

            <div className="flex-1">
                {selectedNote ? (
                    <NoteEditor
                        note={selectedNote}
                        onSave={handleSaveNote}
                        onDelete={handleDeleteNote}
                    />
                ) : (
                    <div className="h-full flex items-center justify-center text-secondary-500">
                        <div className="text-center">
                            <svg className="w-16 h-16 mx-auto mb-4 text-secondary-400" fill="none" stroke="currentColor" viewBox="0 0 24 24">
                                <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2} d="M9 12h6m-6 4h6m2 5H7a2 2 0 01-2-2V5a2 2 0 012-2h5.586a1 1 0 01.707.293l5.414 5.414a1 1 0 01.293.707V19a2 2 0 01-2 2z" />
                            </svg>
                            <p>Select a note or create a new one</p>
                        </div>
                    </div>
                )}
            </div>
        </div>
    );

    const membersContent = (
        <MemberList
            members={members}
            onInvite={() => console.log("Invite member")}
        />
    );

    const tabs = [
        { id: "notes", label: "Notes", content: notesContent },
        { id: "members", label: "Members", content: membersContent },
    ];

    return (
        <div className="min-h-screen bg-secondary-50">
            <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8 py-8">
                <div className="mb-6">
                    <h1 className="text-3xl font-bold text-secondary-900">{workspace.name}</h1>
                    {workspace.description && (
                        <p className="text-secondary-600 mt-1">{workspace.description}</p>
                    )}
                </div>

                <Tabs tabs={tabs} defaultTab="notes" />
            </div>
        </div>
    );
}

export default WorkspacePage;