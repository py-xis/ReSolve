import { Avatar, AvatarFallback, AvatarImage } from "@/components/ui/avatar"
import { useRecoilValue } from "recoil";
import { userAtom } from "@/store/atoms/userDetails";

export default function AvatarComponent() {

    const user = useRecoilValue(userAtom);

    return (
        <div>
            <Avatar>
                <AvatarImage src={user.profilePicture} />
                <AvatarFallback>{user.name}</AvatarFallback>
            </Avatar>
        </div>
    );
}