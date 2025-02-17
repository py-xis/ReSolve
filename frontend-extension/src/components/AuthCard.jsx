import SignInWithGoogle from "./SignInWithGoogle";

// eslint-disable-next-line react/prop-types
export function LoginCard({ isDarkMode }) { // ✅ Accept isDarkMode prop
    return (
        <div className={`min-h-screen ${isDarkMode ? "dark" : ""} flex items-center justify-center p-4`}>
            <div className="w-full max-w-md space-y-8 bg-gray-900 p-6 rounded-2xl">
                <h1 className="text-2xl md:text-4xl font-bold dark:text-white flex justify-center items-center">
                    <span className="bg-gradient-to-r from-blue-500 to-blue-600 bg-clip-text text-transparent">Re</span>
                    <span className="text-white">Solve.</span>
                </h1>
                {/* Google Sign-in Button */}
                <SignInWithGoogle />
                <div className="pt-4 border-t border-gray-800"> </div>
            </div>
        </div>
    );
}