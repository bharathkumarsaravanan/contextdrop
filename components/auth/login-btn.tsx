"use client";
import { useRouter } from "next/navigation";

type Props = {
    children: React.ReactElement;
}

export function LoginBtn({ children }: Props) {
    const router = useRouter();

    function handleLogin() {
        router.push("/login")
    } 

    return (
        <div onClick={handleLogin}>
            {children}
        </div>
    )
}