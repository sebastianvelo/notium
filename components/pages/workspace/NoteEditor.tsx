"use client";
import Input from "@/components/ui/atoms/Input";
import Textarea from "@/components/ui/atoms/Textarea";
import Button from "@/components/ui/atoms/button/Button";
import { Note } from "@/types";
import { useState } from "react";

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
      <div className="p-6 border-b border-gray-200">
        <Input
          value={title}
          onChange={(e) => setTitle(e.target.value)}
          placeholder="Note title..."
          className="text-2xl font-bold border-0 p-0 focus:ring-0"
        />
      </div>
      
      <div className="flex-1 p-6">
        <Textarea
          value={content}
          onChange={(e) => setContent(e.target.value)}
          placeholder="Start typing..."
          className="h-full min-h-96"
        />
      </div>
      
      {note && note.sharedWith && note.sharedWith.length > 0 && (
        <div className="px-6 py-4 bg-gray-50 border-t border-gray-200">
          <h4 className="text-sm font-medium text-gray-700 mb-2">Shared with</h4>
          <div className="flex flex-wrap gap-2">
            {note.sharedWith.map((userId, idx) => (
              <span key={idx} className="px-2 py-1 bg-blue-100 text-blue-700 text-xs rounded-full">
                User {userId}
              </span>
            ))}
          </div>
        </div>
      )}
      
      <div className="p-6 border-t border-gray-200 flex justify-between">
        <div className="flex space-x-2">
          <Button onClick={handleSave}>
            Save Changes
          </Button>
          <Button variant="secondary">
            Share
          </Button>
        </div>
        {onDelete && (
          <Button variant="danger" onClick={onDelete}>
            Delete Note
          </Button>
        )}
      </div>
    </div>
  );
}

export default NoteEditor;