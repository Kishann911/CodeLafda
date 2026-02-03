import type { Metadata } from "next";

export const metadata: Metadata = {
    title: "Game Room",
    description: "Code, Betray, Debug.",
};

export default function RoomLayout({
    children,
}: {
    children: React.ReactNode;
}) {
    return <>{children}</>;
}
