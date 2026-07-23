"use client";

import { Pause, Play } from "lucide-react";
import { usePlayer } from "@/components/player/AudioPlayerProvider";

type TrackRowActionProps = {
	releaseSlug: string;
	trackIndex: number;
	trackNumber: number;
	title: string;
	duration: string;
};

export default function TrackRowAction({
	releaseSlug,
	trackIndex,
	trackNumber,
	title,
	duration,
}: TrackRowActionProps) {
	const { currentReleaseSlug, currentTrackIndex, isPlaying, playTrack, togglePlayback } = usePlayer();

	const isCurrentTrack = currentReleaseSlug === releaseSlug && currentTrackIndex === trackIndex;
	const isCurrentTrackPlaying = isCurrentTrack && isPlaying;

	return (
		<button
			onClick={() => {
				if (isCurrentTrack) {
					togglePlayback();
					return;
				}

				playTrack(releaseSlug, trackIndex);
			}}
			className="cursor-pointer flex w-full items-center gap-4 px-5 py-4 text-left transition hover:bg-white/5 sm:px-6"
		>
			<div className="w-8 text-sm text-foreground/50">{trackNumber.toString().padStart(2, "0")}</div>
			<div className="min-w-0 flex-1">
				<p className="truncate text-base font-medium text-foreground">{title}</p>
			</div>
			<div className="inline-flex items-center gap-3">
				<div className="inline-flex h-8 w-8 items-center justify-center rounded-full border border-border/70 bg-black/20 text-foreground/85">
					{isCurrentTrackPlaying ? <Pause className="h-4 w-4" /> : <Play className="h-4 w-4 fill-foreground/85" />}
				</div>
				<div className="text-sm text-foreground/50">{duration}</div>
			</div>
		</button>
	);
}