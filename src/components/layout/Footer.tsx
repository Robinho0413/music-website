import Link from "next/link";
import { BsArrowUpRight } from "react-icons/bs";
import { FaInstagram, FaSpotify, FaYoutube } from "react-icons/fa";
import { SiDeezer } from "react-icons/si";
import { platformLinks } from "@/lib/platformLinks";
import { LuInstagram } from "react-icons/lu";

const instagramHref = "https://www.instagram.com/lerobcz/";

const footerPlatformOrder = ["Spotify", "Deezer", "YouTube"] as const;

const footerPlatformIcons: Record<string, React.ComponentType<{ className?: string }>> = {
    Spotify: FaSpotify,
    Deezer: SiDeezer,
    YouTube: FaYoutube,
    Instagram: FaInstagram,
};

export default function Footer() {
    const currentYear = new Date().getFullYear();
    const footerLinks = footerPlatformOrder
        .map((platformName) => platformLinks.find((platform) => platform.name === platformName))
        .filter((platform): platform is NonNullable<typeof platform> => Boolean(platform));

    return (
        <footer className="relative overflow-hidden border-t border-border/70 bg-background text-foreground">
            <div className="absolute inset-x-0 top-0 h-px bg-linear-to-r from-transparent via-primary/60 to-transparent" />
            <div className="absolute inset-0 bg-[radial-gradient(circle_at_top_left,rgba(64,128,128,0.12),transparent_34%),radial-gradient(circle_at_bottom_right,rgba(255,255,255,0.04),transparent_28%)]" />
            <div className="relative mx-auto flex w-full max-w-7xl flex-col gap-8 px-5 py-10 sm:px-8 lg:px-12">
                <div className="grid gap-8 lg:grid-cols-[1.2fr_1fr] lg:items-end">
                    <div className="space-y-4">
                        <p className="text-sm font-semibold tracking-[0.4em] text-foreground/70">robcz</p>
                        <h2 className="max-w-xl text-2xl font-semibold tracking-tight sm:text-3xl">
                            Sorties, plateformes et lecture globale réunies dans un seul espace.
                        </h2>
                        <p className="max-w-2xl text-sm leading-6 text-foreground/65 sm:text-base">
                            Explore les dernières sorties, ouvre les liens de streaming et retrouve mes profils sur les différentes plateformes.
                        </p>
                    </div>

                    <div className="flex justify-end items-start self-start gap-3">
                        <Link
                            href={instagramHref}
                            aria-label="Instagram"
                            target="_blank"
                            rel="noreferrer"
                            className="inline-flex items-center justify-center gap-3 text-foreground transition-opacity hover:opacity-70"
                        >
                            <LuInstagram className="h-5 w-5" /><span className="text-sm font-medium">Instagram</span>
                        </Link>
                    </div>
                </div>

                <div className="grid gap-3 sm:grid-cols-2 lg:grid-cols-4">
                    {footerLinks.map((platform) => {
                        const Icon = footerPlatformIcons[platform.name] ?? BsArrowUpRight;

                        return (
                            <Link
                                key={platform.name}
                                href={platform.href}
                                target="_blank"
                                rel="noreferrer"
                                className="group flex items-center justify-between border border-border/70 bg-black/15 px-4 py-4 transition hover:-translate-y-0.5 hover:border-primary/60 hover:bg-white/5"
                            >
                                <div>
                                    <p className="text-sm font-medium text-foreground">{platform.name}</p>
                                    <p className="mt-1 text-xs text-foreground/55">{platform.handle}</p>
                                </div>
                                <Icon className="h-5 w-5 text-foreground/80 transition-transform group-hover:-translate-y-0.5 group-hover:translate-x-0.5" />
                            </Link>
                        );
                    })}
                    <Link
                        href="/platforms"
                        target="_blank"
                        rel="noreferrer"
                        className="group flex items-center justify-between border border-border/70 bg-black/15 px-4 py-4 transition hover:-translate-y-0.5 hover:border-primary/60 hover:bg-white/5"
                    >
                        <div>
                            <p className="text-sm font-medium text-foreground">Toutes les plateformes</p>
                            <p className="mt-1 text-xs text-foreground/55">Découvre tous mes profils</p>
                        </div>
                        <BsArrowUpRight className="h-5 w-5 text-foreground/80 transition-transform group-hover:-translate-y-0.5 group-hover:translate-x-0.5" />
                    </Link>
                </div>

                <div className="flex gap-3 border-t border-border/70 pt-5 text-sm text-foreground/60 flex-row sm:items-center justify-between">
                    <p>© {currentYear} robcz</p>
                    <Link href="/mentions-legales" className="transition hover:text-foreground">
                        Mentions légales
                    </Link>
                </div>
            </div>
        </footer>
    );
}