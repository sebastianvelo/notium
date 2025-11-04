"use client"
import useI18N from "@/hooks/app/useI18N";

const Footer: React.FC = () => {
    const { t } = useI18N();

    return (
        <footer className="backdrop-blur-lg sticky bottom-0 border-t border-primary-200/50 dark:border-primary-900/50 shadow-lg dark:bg-black/90 text-white py-4">
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