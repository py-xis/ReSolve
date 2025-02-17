import { auth } from "../firebaseConfig";
import { GoogleAuthProvider, signInWithPopup } from "firebase/auth";
import GoogleIcon from "./GoogleIcon";
import { Button } from "./ui/button";
import axios from "axios";
import { useNavigate } from "react-router-dom";

export default function SignInWithGoogle() {
  const navigate = useNavigate();
  const handleGoogleSignIn = async () => {
    try {
      // Firebase Sign-In Popup
      const provider = new GoogleAuthProvider()
      const result = await signInWithPopup(auth, provider);
      const idToken = await result.user.getIdToken(); // Get Firebase token

      // Sending the token to backend. It will return the userId of the user.
      // Storing the userId of the user along with the token in the local storage.

      const response = await axios.post("http://localhost:3000/api/v1/auth/google", {}, {
         headers: {
          Authorization: `Bearer ${idToken}`
         }
      });

      localStorage.setItem("uid", response.data.uid);
      localStorage.setItem("authToken", idToken);
      navigate("/dashboard");

    } catch (error) {
      console.error("Error signing in:", error);
    }
  };

  return (
    <div className="flex justify-center mt-10">
      {/* <button
        onClick={handleGoogleSignIn}
        className="px-4 py-2 bg-blue-600 text-white rounded-lg shadow-md hover:bg-blue-700"
      >
        Sign in with Google
      </button> */}
      <Button onClick={handleGoogleSignIn}
        className="px-4 py-2 bg-blue-600 text-white rounded-lg shadow-md hover:bg-blue-700">
        <GoogleIcon /> Sign In With Google
      </Button>
    </div>
  );
}