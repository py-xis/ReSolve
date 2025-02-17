/* eslint-disable react/prop-types */
import { Button } from "./ui/button"
export function AuthButton({ variant, onClick }) {

    return (
      <Button
        onClick={onClick}
        className={`w-full flex items-center justify-center px-4 py-2 rounded-lg transition-colors ${
          variant === "sign-up"
            ? "bg-blue-600 hover:bg-blue-700 text-white"
            : "bg-transparent border border-blue-600 text-blue-500 hover:bg-blue-600/10"
        }`}
      >
        {variant === "sign-up" ? "Sign Up" : "Sign In"}
      </Button>
    )
}