"use client";

import Link from "next/link";
import { BsArrowUpRight } from "react-icons/bs";
import { LuInstagram } from "react-icons/lu";
import { ChevronLeft, ChevronRight, Pause, Play } from "lucide-react";
import { usePlayer } from "@/components/player/AudioPlayerProvider";

const instagramHref = "https://www.instagram.com/lerobcz/";

export default function NavBar() {
	const {
		currentReleaseTitle,
		currentTrackTitle,
		currentReleaseSlug,
		isPlaying,
		hasActiveTrack,
		playNext,
		playPrevious,
		togglePlayback,
	} = usePlayer();

	return (
		<header className="fixed z-50 w-full bg-background text-foreground">
			<nav className="mx-auto flex w-full max-w-7xl items-center gap-4 px-5 py-6 sm:px-8 lg:px-12">
				<Link href="/" className="text-sm tracking-[0.35em] drop-shadow-sm drop-shadow-foreground">
					robcz
				</Link>

				<div className="flex flex-1 items-center justify-center">
					<div className="flex w-full max-w-2xl items-center justify-between gap-3 rounded-full border border-border/70 bg-black/20 px-4 py-2 shadow-lg shadow-black/10 backdrop-blur-md">
						<div className="flex items-center gap-1">
							<button
								onClick={playPrevious}
								disabled={!hasActiveTrack}
								aria-label="Musique précédente"
								className="cursor-pointer inline-flex h-9 w-9 items-center justify-center rounded-full text-foreground transition hover:bg-white/10 disabled:cursor-not-allowed disabled:opacity-40"
							>
								<ChevronLeft className="h-5 w-5" />
							</button>
							<button
								onClick={togglePlayback}
								disabled={!hasActiveTrack}
								aria-label={isPlaying ? "Mettre en pause" : "Lire la musique"}
								className="cursor-pointer inline-flex h-10 w-10 items-center justify-center rounded-full bg-primary text-black transition hover:scale-105 disabled:cursor-not-allowed disabled:opacity-40"
							>
								{isPlaying ? <Pause className="h-5 w-5" /> : <Play className="h-5 w-5 fill-black" />}
							</button>
							<button
								onClick={playNext}
								disabled={!hasActiveTrack}
								aria-label="Musique suivante"
								className="cursor-pointer inline-flex h-9 w-9 items-center justify-center rounded-full text-foreground transition hover:bg-white/10 disabled:cursor-not-allowed disabled:opacity-40"
							>
								<ChevronRight className="h-5 w-5" />
							</button>
						</div>

						<div className="min-w-0 flex-1 text-center">
							<p className="truncate text-xs uppercase tracking-[0.3em] text-foreground/45">
								{currentReleaseTitle ?? "Aucune lecture"}
							</p>
							<p className="truncate text-sm text-foreground/80">
								{currentTrackTitle ?? (currentReleaseSlug ? "Lecture en cours" : "Sélectionne une sortie")}
							</p>
						</div>
					</div>
				</div>

				<div className="flex items-center gap-4">
					<Link
						href={instagramHref}
						aria-label="Instagram"
						target="_blank"
						rel="noreferrer"
						className="inline-flex items-center justify-center text-foreground transition-opacity hover:opacity-70"
					>
						<LuInstagram className="h-5 w-5" />
					</Link>
					<Link
						href="/platforms"
						aria-label="Plateformes"
						className="inline-flex items-center justify-center text-foreground transition-opacity hover:opacity-70"
					>
						<BsArrowUpRight className="h-5 w-5" />
					</Link>
				</div>
			</nav>
		</header>
	);
}
