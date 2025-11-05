import Button from "@/components/ui/atoms/button/Button";
import Link from "next/link";

const WorkspacesLayoutHeader: React.FC = () => {
    return (
        <div className="flex justify-between items-center mb-8">
            <div>
                <h1 className="text-3xl font-bold text-secondary-900">My Workspaces</h1>
                <p className="text-secondary-600 mt-1">Select a workspace to get started</p>
            </div>
            <Link href="/workspaces/new">
                <Button className="flex items-center">
                    <svg className="w-5 h-5 mr-2" fill="none" stroke="currentColor" viewBox="0 0 24 24">
                        <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2} d="M12 4v16m8-8H4" />
                    </svg>
                    New Workspace
                </Button>
            </Link>
        </div>
    );
};

export default WorkspacesLayoutHeader;