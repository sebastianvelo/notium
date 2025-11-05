import NewWorkspaceLayoutForm from "./form/NewWorkspaceLayoutForm";
import NewWorkspaceLayoutHeader from "./header/NewWorkspaceLayoutHeader";

const NewWorkspaceLayout: React.FC = () => {
    return (
        <div className="min-h-screen bg-gradient-to-br from-primary-50 to-primary-100 dark:from-secondary-950 dark:via-primary-950 dark:to-secondary-950 ">
            <div className="max-w-2xl mx-auto px-4 sm:px-6 lg:px-8 py-8 space-y-4">
                <NewWorkspaceLayoutHeader />
                <NewWorkspaceLayoutForm />
            </div>
        </div>
    );
}

export default NewWorkspaceLayout;