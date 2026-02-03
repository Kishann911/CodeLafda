import type { Metadata } from "next";

export const metadata: Metadata = {
    title: "Lobby",
    description: "Join or create a game room.",
};

export default function LobbyLayout({
    children,
}: {
    children: React.ReactNode;
}) {
    return <>{children}</>;
}
