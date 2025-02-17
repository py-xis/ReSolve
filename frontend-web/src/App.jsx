import {BrowserRouter, Routes, Route} from 'react-router-dom';
import LandingPage from './pages/LandingPage';
import AuthPage from './pages/AuthPage';
import DashboardPage from './pages/DashboardPage';
import ProfilePage from './pages/ProfilePage';

export default function App(){
    return (
        <BrowserRouter>
            <Routes>
                <Route path='/' element={<LandingPage/>}></Route>
                <Route path='/auth' element={<AuthPage/>}></Route>
                <Route path='/dashboard' element={<DashboardPage/>}></Route>
                <Route path='/profile' element={<ProfilePage/>}></Route>
            </Routes>
        </BrowserRouter>
    );
}