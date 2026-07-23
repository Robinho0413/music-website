"use client";

import { createContext, useCallback, useContext, useEffect, useMemo, useRef, useState } from "react";
import { getReleaseBySlug, releases } from "@/lib/releases";

type PlayerContextValue = {
	currentReleaseSlug: string | null;
	currentTrackIndex: number | null;
	isPlaying: boolean;
	currentReleaseTitle: string | null;
	currentTrackTitle: string | null;
	playRelease: (releaseSlug: string) => void;
	playTrack: (releaseSlug: string, trackIndex: number) => void;
	togglePlayback: () => void;
	playNext: () => void;
	playPrevious: () => void;
	hasActiveTrack: boolean;
};

const PlayerContext = createContext<PlayerContextValue | null>(null);

export function AudioPlayerProvider({ children }: { children: React.ReactNode }) {
	const audioRef = useRef<HTMLAudioElement | null>(null);
	const [currentReleaseSlug, setCurrentReleaseSlug] = useState<string | null>(null);
	const [currentTrackIndex, setCurrentTrackIndex] = useState<number | null>(null);
	const [isPlaying, setIsPlaying] = useState(false);

	const currentRelease = currentReleaseSlug ? getReleaseBySlug(currentReleaseSlug) : undefined;
	const currentTrack =
		currentRelease && currentTrackIndex !== null
			? currentRelease.tracks[currentTrackIndex]
			: undefined;

	const hasActiveTrack = Boolean(currentTrack);

	const loadTrack = useCallback(async (releaseSlug: string, trackIndex: number, shouldPlay: boolean) => {
		const audio = audioRef.current;
		const release = getReleaseBySlug(releaseSlug);
		const track = release?.tracks[trackIndex];

		if (!audio || !release || !track) {
			return;
		}

		audio.src = track.audioSrc;
		audio.load();

		if (shouldPlay) {
			try {
				await audio.play();
				setIsPlaying(true);
			} catch {
				setIsPlaying(false);
			}
		} else {
			audio.pause();
			setIsPlaying(false);
		}
	}, []);

	const playTrack = useCallback(
		(releaseSlug: string, trackIndex: number) => {
			const release = getReleaseBySlug(releaseSlug);
			if (!release || !release.tracks[trackIndex]) {
				return;
			}

			setCurrentReleaseSlug(releaseSlug);
			setCurrentTrackIndex(trackIndex);
			void loadTrack(releaseSlug, trackIndex, true);
		},
		[loadTrack],
	);

	const playNext = useCallback(() => {
		if (!currentRelease || currentTrackIndex === null) {
			return;
		}

		const nextIndex = (currentTrackIndex + 1) % currentRelease.tracks.length;
		setCurrentTrackIndex(nextIndex);
		void loadTrack(currentRelease.slug, nextIndex, true);
	}, [currentRelease, currentTrackIndex, loadTrack]);

	const playPrevious = useCallback(() => {
		if (!currentRelease || currentTrackIndex === null) {
			return;
		}

		const previousIndex =
			(currentTrackIndex - 1 + currentRelease.tracks.length) % currentRelease.tracks.length;
		setCurrentTrackIndex(previousIndex);
		void loadTrack(currentRelease.slug, previousIndex, true);
	}, [currentRelease, currentTrackIndex, loadTrack]);

	useEffect(() => {
		const audio = audioRef.current;
		if (!audio) {
			return;
		}

		const handleEnded = () => {
			playNext();
		};

		audio.addEventListener("ended", handleEnded);
		return () => audio.removeEventListener("ended", handleEnded);
	}, [playNext]);

	const playRelease = useCallback((releaseSlug: string) => {
		const release = getReleaseBySlug(releaseSlug);
		if (!release || release.tracks.length === 0) {
			return;
		}

		playTrack(releaseSlug, 0);
	}, [playTrack]);

	const togglePlayback = useCallback(() => {
		if (!currentTrack) {
			const firstRelease = releases[0];
			if (firstRelease) {
				void playRelease(firstRelease.slug);
			}
			return;
		}

		const audio = audioRef.current;

		if (!audio) {
			return;
		}

		if (isPlaying) {
			audio.pause();
			setIsPlaying(false);
			return;
		}

		void audio.play()
			.then(() => setIsPlaying(true))
			.catch(() => setIsPlaying(false));
	}, [currentTrack, isPlaying, playRelease]);

	const value = useMemo<PlayerContextValue>(
		() => ({
			currentReleaseSlug,
			currentTrackIndex,
			isPlaying,
			currentReleaseTitle: currentRelease?.title ?? null,
			currentTrackTitle: currentTrack?.title ?? null,
			playRelease,
			playTrack,
			togglePlayback,
			playNext,
			playPrevious,
			hasActiveTrack,
		}),
		[
			currentReleaseSlug,
			currentTrackIndex,
			isPlaying,
			currentRelease,
			currentTrack,
			playRelease,
			playTrack,
			togglePlayback,
			playNext,
			playPrevious,
			hasActiveTrack,
		],
	);

	return (
		<PlayerContext.Provider value={value}>
			{children}
			<audio ref={audioRef} preload="metadata" />
		</PlayerContext.Provider>
	);
}

export function usePlayer() {
	const context = useContext(PlayerContext);

	if (!context) {
		throw new Error("usePlayer must be used within an AudioPlayerProvider");
	}

	return context;
}