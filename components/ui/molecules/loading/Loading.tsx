import Text from "@/components/ui/atoms/text/Text";

interface LoadingProps {
    isLoading: boolean;
    children?: React.ReactNode;
    loadingText?: string;
}

const Loading: React.FC<LoadingProps> = ({ isLoading, children, loadingText = "Loading..." }) => {
    if (isLoading) {
        return (
            <div className="flex items-center justify-center min-h-screen flex-col gap-4">
                <div className="animate-spin rounded-full h-12 w-12 border-b-2 border-primary-600"></div>
                <Text t={loadingText} />
            </div>
        );
    }

    return <>{children}</>;
};

export default Loading;