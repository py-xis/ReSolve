import { Avatar, AvatarFallback, AvatarImage } from "@/components/ui/avatar"
import { Card, CardContent } from "@/components/ui/card"
import { useRecoilValue } from "recoil"
import { userAtom } from "@/store/atoms/userDetails"


export default function ProfilePage() {

    const user = useRecoilValue(userAtom);
    console.log(user);

  return (
    <div className="min-h-screen bg-[#0C0D10] flex items-center justify-center p-4">
      <Card className="w-full max-w-md bg-[#1C1D20] border-neutral-800">
        <CardContent className="pt-6">
          <div className="flex items-center gap-4">
            <Avatar className="h-16 w-16 border-2 border-[#4285F4]">
              <AvatarImage src={user.profilePicture} alt={user.name} />
              <AvatarFallback className="bg-[#4285F4] text-white">
                {user.name
                  .split(" ")
                  .map((n) => n[0])
                  .join("")}
              </AvatarFallback>
            </Avatar>
            <div className="space-y-1">
              <h2 className="text-xl font-semibold text-white">{user.name}</h2>
              <p className="text-sm text-neutral-400">{user.email}</p>
            </div>
          </div>
        </CardContent>
      </Card>
    </div>
  )
}