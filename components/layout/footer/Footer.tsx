"use client"
import useI18N from "@/hooks/app/useI18N";

const Footer: React.FC = () => {
    const { t } = useI18N();

    return (
        <footer className="bg-gradient-to-l from-secondary-200 via-white to-secondary-200 dark:from-secondary-950 dark:via-secondary-900 dark:to-secondary-950 border-b border-secondary-300 dark:border-secondary-800 backdrop-blur-lg sticky bottom-0 border-t shadow-lg py-4">
            <div className="max-w-6xl mx-auto px-4 sm:px-6 lg:px-8">
                <div className="flex flex-row justify-between items-center">
                    <div className="flex flex-col sm:flex-row sm:items-center sm:space-x-4 space-y-1 sm:space-y-0">
                        <p className="font-bold text-sm">
                            <a className="text-primary-700 hover:text-primary-900 dark:text-primary-300 dark:hover:text-primary-200 transition-all duration-200 hover:no-underline" href="https://sebastian-velo.web.app/" target="_blank" rel="noreferrer">

                            </a>
                        </p>
                        <span className="hidden sm:inline text-primary-400 text-xs">•</span>
                        <p className="text-xs">
                            <a className="text-primary-700 hover:text-primary-900 dark:text-primary-300 dark:hover:text-primary-200 transition-all duration-200 hover:underline">
                            </a>
                        </p>
                    </div>
                </div>
            </div>
        </footer>
    );
};

export default Footer;