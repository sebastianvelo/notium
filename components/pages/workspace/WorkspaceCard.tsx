import Card, { CardBody } from "@/components/ui/molecules/Card";
import { Workspace } from "@/types";
import Link from "next/link";

interface WorkspaceCardProps {
    workspace: Workspace;
}

const WorkspaceCard: React.FC<WorkspaceCardProps> = ({ workspace }) => {
    return (
        <Link href={`/workspaces/${workspace.id}`}>
            <Card hover>
                <CardBody>
                    <h3 className="text-lg font-semibold text-gray-900 mb-2">
                        {workspace.name}
                    </h3>
                    {workspace.description && (
                        <p className="text-sm text-gray-600 mb-3">
                            {workspace.description}
                        </p>
                    )}
                    <div className="flex items-center text-xs text-gray-500">
                        <svg className="w-4 h-4 mr-1" fill="none" stroke="currentColor" viewBox="0 0 24 24">
                            <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2} d="M8 7V3m8 4V3m-9 8h10M5 21h14a2 2 0 002-2V7a2 2 0 00-2-2H5a2 2 0 00-2 2v12a2 2 0 002 2z" />
                        </svg>
                        Created {new Date(workspace.createdAt).toLocaleDateString()}
                    </div>
                </CardBody>
            </Card>
        </Link>
    );
};

export default WorkspaceCard;