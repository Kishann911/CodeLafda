import type { Metadata } from "next";

export const metadata: Metadata = {
    title: "Leaderboard",
    description: "View the top hackers and impostors.",
};

export default function LeaderboardLayout({
    children,
}: {
    children: React.ReactNode;
}) {
    return <>{children}</>;
}
