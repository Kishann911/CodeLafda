import type { Metadata } from "next";

export const metadata: Metadata = {
    title: "Documentation",
    description: "Learn how to play and contribute to CodeLafda.",
};

export default function DocumentationLayout({
    children,
}: {
    children: React.ReactNode;
}) {
    return <>{children}</>;
}
