"use client";

import { Pause, Play } from "lucide-react";
import { usePlayer } from "@/components/player/AudioPlayerProvider";

type ReleaseActionsProps = {
	releaseSlug: string;
};

export default function ReleaseActions({ releaseSlug }: ReleaseActionsProps) {
	const { currentReleaseSlug, isPlaying, playRelease, togglePlayback } = usePlayer();
	const isActiveRelease = currentReleaseSlug === releaseSlug;
	const isActivePlaying = isActiveRelease && isPlaying;

	return (
		<button
			onClick={() => {
				if (isActiveRelease) {
					togglePlayback();
					return;
				}

				playRelease(releaseSlug);
			}}
			className="w-full sm:w-auto justify-center inline-flex items-center gap-2 rounded-full bg-primary px-6 py-3 text-sm font-semibold text-black transition hover:scale-[1.02] cursor-pointer"
		>
			{isActivePlaying ? <Pause className="h-4 w-4" /> : <Play className="h-4 w-4 fill-black" />}
			{isActivePlaying ? "Pause" : "Lecture"}
		</button>
	);
}