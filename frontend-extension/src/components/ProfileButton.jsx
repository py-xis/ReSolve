import {
    DropdownMenu,
    DropdownMenuContent,
    DropdownMenuItem,
    DropdownMenuSeparator,
    DropdownMenuTrigger,
  } from "@/components/ui/dropdown-menu"
import { useNavigate } from "react-router-dom";
import AvatarComponent from "./Avatar";

export default function ProfileButton() {
    const navigate = useNavigate();
    return (
        <DropdownMenu>
            <DropdownMenuTrigger>
                <AvatarComponent />
        </DropdownMenuTrigger>
            <DropdownMenuContent>
                <DropdownMenuItem onClick={() => {navigate("/profile")}}>Profile</DropdownMenuItem>
                <DropdownMenuSeparator />
                <DropdownMenuItem onClick={() => {localStorage.removeItem("authToken"); localStorage.removeItem("uid");navigate("/")}} >Log out</DropdownMenuItem>
            </DropdownMenuContent>
        </DropdownMenu>
    )
}