"use client";
import { Note } from "@/types";
import { useState } from "react";
import NoteEditorActions from "./NoteEditorActions";
import NoteEditorForm from "./NoteEditorForm";
import NoteEditorUsersList from "./NoteEditorUsersList";

interface NoteEditorProps {
  note?: Note;
  onSave: (data: { title: string; content: string }) => void;
  onDelete?: () => void;
}

const NoteEditor: React.FC<NoteEditorProps> = ({ note, onSave, onDelete }) => {
  const [title, setTitle] = useState(note?.title || "");
  const [content, setContent] = useState(note?.content || "");

  const handleSave = () => {
    onSave({ title, content });
  };

  return (
    <div className="h-full flex flex-col">
      <NoteEditorForm title={title} content={content} setTitle={setTitle} setContent={setContent} />
      <NoteEditorUsersList note={note} />
      <NoteEditorActions onDelete={onDelete} handleSave={handleSave} />
    </div>
  );
}

export default NoteEditor;