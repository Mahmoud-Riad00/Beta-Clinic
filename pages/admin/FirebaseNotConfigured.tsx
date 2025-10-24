import React from 'react';
import { ShieldCheckIcon } from '../../components/icons/Icons';

const FirebaseNotConfigured: React.FC = () => {
    const codeBlock = `
const localConfig = {
  apiKey: "YOUR_API_KEY",
  authDomain: "your-project.firebaseapp.com",
  projectId: "your-project-id",
  storageBucket: "your-project.appspot.com",
  messagingSenderId: "1234567890",
  appId: "1:123456:web:abcdef123456"
};
    `.trim();

    return (
        <div className="container mx-auto text-center py-10">
            <div className="max-w-2xl mx-auto bg-surface-light dark:bg-surface-dark p-8 rounded-xl shadow-lg border border-yellow-500/30">
                <ShieldCheckIcon className="h-16 w-16 mx-auto text-yellow-500" />
                <h2 className="text-2xl font-bold mt-4 text-primary-dark dark:text-primary-light">
                    Firebase Not Configured
                </h2>
                <p className="mt-2 text-secondary dark:text-gray-400">
                    The admin panel requires a connection to Firebase. To enable it for local development, you need to add your credentials.
                </p>
                <div className="mt-6 text-left bg-background-light dark:bg-background-dark p-4 rounded-lg">
                    <p className="font-semibold text-text-light dark:text-text-dark">How to fix this:</p>
                    <ol className="list-decimal list-inside mt-2 space-y-2 text-sm text-secondary dark:text-gray-400">
                        <li>Open the file: <code className="bg-gray-200 dark:bg-gray-900 px-1 py-0.5 rounded">firebase/config.ts</code> in your editor.</li>
                        <li>
                            Inside that file, you will find a commented-out <code className="bg-gray-200 dark:bg-gray-900 px-1 py-0.5 rounded">localConfig</code> object.
                        </li>
                        <li>Uncomment the object and replace the placeholder values with your actual Firebase project credentials.</li>
                    </ol>
                    <pre className="w-full bg-gray-200 dark:bg-gray-900 text-text-light dark:text-text-dark p-4 rounded-md mt-4 overflow-x-auto text-xs">
                        <code>{codeBlock}</code>
                    </pre>
                     <p className="mt-4 text-sm text-red-500 font-bold">
                        Warning: Do not commit your credentials to your version control (e.g., Git). This method is for local development only.
                    </p>
                </div>
                 <p className="mt-6 text-xs text-gray-400 dark:text-gray-500">
                    For production deployment, the application will automatically use the environment variables you set in your hosting provider's settings.
                </p>
            </div>
        </div>
    );
};

export default FirebaseNotConfigured;