import type { Metadata } from "next";
import { TRPCReactProvider } from "~/trpc/react";
import "../styles/globals.css";
import { Header } from "./_components/Header/header";

export const metadata: Metadata = {
    title: "Nook",
    description: "Review all your books!",
};

export default function RootLayout({
    children,
}: {
    children: React.ReactNode;
}) {
    return (
        <html lang="en">
            <TRPCReactProvider>
                <body>
                    <Header />
                    <main>{children}</main>
                </body>
            </TRPCReactProvider>
        </html>
    );
}
