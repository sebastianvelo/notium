import Input from "@/components/ui/atoms/input/Input";
import Textarea from "@/components/ui/atoms/textarea/Textarea";

interface NoteEditorFormProps {
  title: string;
  content: string;
  setTitle: (value: string) => void;
  setContent: (value: string) => void;
}

const NoteEditorForm: React.FC<NoteEditorFormProps> = ({ title, content, setTitle, setContent }) => {
  return (
    <>
      <div className="p-6 border-b border-secondary-200 dark:border-secondary-900">
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
    </>
  );
}

export default NoteEditorForm;