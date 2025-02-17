import { HashRouter, Routes, Route} from "react-router-dom"
import LandingPage from "./Pages/LandingPage"
import AuthPage from "./pages/AuthPage"
export default function App(){
    return (
        <div>
            <HashRouter>
                <Routes>
                    <Route path="/" element={<LandingPage />} />
                    <Route path="/auth" element={<AuthPage/>} />
                </Routes>
            </HashRouter>
        </div>
    )
}