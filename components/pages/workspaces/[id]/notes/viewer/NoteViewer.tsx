import Text from "@/components/ui/atoms/text/Text";
import Title from "@/components/ui/atoms/title/Title";
import { Pen } from "lucide-react";

interface NoteViewerProps {
  title?: string;
  content?: string;
}

const NoteViewer: React.FC<NoteViewerProps> = ({ title, content }) => {
  return (
    <div className="h-full flex flex-col">
      <div className="px-6 py-4 border-b border-secondary-200 dark:border-secondary-900 flex items-center space-x-1">
        <Title
          t={title}
          className="text-2xl font-bold border-0 p-0 focus:ring-0"
        />
      </div>

      <div className="flex-1 p-6">
        <Text
          t={content}
          className="h-full min-h-96"
        />
      </div>
    </div>
  );
}

export default NoteViewer;