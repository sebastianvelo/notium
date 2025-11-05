import NewWorkspaceLayoutForm from "./form/NewWorkspaceLayoutForm";
import NewWorkspaceLayoutHeader from "./header/NewWorkspaceLayoutHeader";

const NewWorkspaceLayout: React.FC = () => {
    return (
        <div className="min-h-screen">
            <div className="max-w-2xl mx-auto px-4 sm:px-6 lg:px-8 py-8 space-y-4">
                <NewWorkspaceLayoutHeader />
                <NewWorkspaceLayoutForm />
            </div>
        </div>
    );
}

export default NewWorkspaceLayout;