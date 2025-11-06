"use client";
import NoteUpdateDTO from "@/lib/dto/NoteUpdateDTO";
import NoteItemView from "@/types/view/NoteItemView";
import { useEffect, useState } from "react";
import NoteEditorActions from "./NoteEditorActions";
import NoteEditorForm from "./NoteEditorForm";
import NoteEditorUsersList from "./NoteEditorUsersList";

export interface NoteEditorFormWrapperProps {
  note?: NoteItemView | null;
  onSave: (data: NoteUpdateDTO) => void;
  onDelete?: () => void;
}

const NoteEditorFormWrapper: React.FC<NoteEditorFormWrapperProps> = ({ note, onSave, onDelete }) => {
  const [title, setTitle] = useState(note?.title || "");
  const [content, setContent] = useState(note?.content || "");

  useEffect(() => {
    setTitle(note?.title || "");
    setContent(note?.content || "");
  }, [note?.id]);

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

export default NoteEditorFormWrapper;