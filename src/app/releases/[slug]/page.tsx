import type { Metadata } from "next";
import Image from "next/image";
import Link from "next/link";
import { notFound } from "next/navigation";
import { ArrowLeft } from "lucide-react";
import ReleaseActions from "@/components/cards/ReleaseActions";
import TrackRowAction from "@/components/cards/TrackRowAction";
import { getReleaseBySlug, releases } from "@/lib/releases";

type ReleasePageProps = {
	params: Promise<{ slug: string }>;
};

export function generateStaticParams() {
	return releases.map((release) => ({ slug: release.slug }));
}

function getYoutubeEmbedUrl(youtubeUrl: string) {
	try {
		const parsedUrl = new URL(youtubeUrl);
		const hostname = parsedUrl.hostname.replace(/^www\./, "");

		if (hostname === "youtu.be") {
			const videoId = parsedUrl.pathname.replace(/^\//, "");
			return videoId ? `https://www.youtube.com/embed/${videoId}` : null;
		}

		if (hostname === "youtube.com" || hostname === "m.youtube.com") {
			if (parsedUrl.pathname === "/watch") {
				const videoId = parsedUrl.searchParams.get("v");
				if (videoId) {
					return `https://www.youtube.com/embed/${videoId}`;
				}
			}

			if (parsedUrl.pathname === "/playlist") {
				const playlistId = parsedUrl.searchParams.get("list");
				if (playlistId) {
					return `https://www.youtube.com/embed/videoseries?list=${playlistId}`;
				}
			}

			if (parsedUrl.pathname.startsWith("/shorts/")) {
				const videoId = parsedUrl.pathname.split("/")[2];
				return videoId ? `https://www.youtube.com/embed/${videoId}` : null;
			}
		}
	} catch {
		return null;
	}

	return null;
}

export async function generateMetadata({ params }: ReleasePageProps): Promise<Metadata> {
	const { slug } = await params;
	const release = getReleaseBySlug(slug);

	if (!release) {
		return {
			title: "Sortie introuvable",
		};
	}

	return {
		title: `${release.title} | robcz`,
		description: `Découvrez ${release.title} par ${release.artistName}, un ${release.releaseType} sorti le ${release.releaseDate}.`,
	};
}

export default async function ReleasePage({ params }: ReleasePageProps) {
	const { slug } = await params;
	const release = getReleaseBySlug(slug);
	const youtubeEmbedUrl = release?.youtubeVideoUrl
		? getYoutubeEmbedUrl(release.youtubeVideoUrl)
		: null;

	if (!release) {
		notFound();
	}

	return (
		<main className="min-h-full bg-[radial-gradient(circle_at_top,rgba(64,128,128,0.22),transparent_38%),linear-gradient(180deg,#0f1414_0%,#141919_36%,#101414_100%)] text-foreground">
			<div className="mx-auto flex w-full max-w-7xl flex-col gap-8 px-5 pb-12 pt-32 sm:px-8 lg:px-12">
				<Link
					href="/"
					className="inline-flex w-fit items-center gap-2 text-sm text-foreground/70 transition hover:text-foreground"
				>
					<ArrowLeft className="h-4 w-4" />
					Retour
				</Link>

				<section className="grid gap-8 lg:grid-cols-[360px_1fr]">
					<div className="relative overflow-hidden border border-border/70 bg-black/25 shadow-2xl shadow-black/25">
						<div className="relative aspect-square">
							<Image
								src={release.coverSrc}
								alt={release.coverAlt}
								fill
								priority
								className="object-cover"
							/>
							<div className="absolute inset-0 bg-linear-to-t from-black/60 via-transparent to-transparent" />
						</div>
					</div>

					<div className="flex flex-col justify-end gap-6">
						<div className="space-y-4">
							<p className="text-sm tracking-[0.35em] text-accent">
								{release.artistName}
							</p>
							<h1 className="text-4xl font-semibold tracking-tight sm:text-6xl">
								{release.title}
							</h1>
							<div className="flex flex-wrap items-center gap-3 text-sm text-foreground/70">
								<span>{release.releaseType}</span>
								<span>•</span>
								<span>{release.releaseDate}</span>
								<span>•</span>
								<span>{release.nbTitres} titres</span>
							</div>
						</div>

						<div className="flex flex-col sm:flex-row items-center gap-3">
							<ReleaseActions releaseSlug={release.slug} />
							<Link
								href={`/releases/${release.slug}/streaming`}
								className="w-full sm:w-auto text-center min-w-40 rounded-full border border-border/70 bg-black/20 px-5 py-3 text-sm text-foreground/70 transition hover:border-primary/60 hover:text-foreground"
							>
								Ecouter en streaming
							</Link>
						</div>
					</div>
				</section>

				<section className="grid gap-6 lg:grid-cols-[1fr_320px]">
					<div className="overflow-hidden border border-border/70 bg-black/20 shadow-lg shadow-black/15">
						<div className="border-b border-border/70 px-5 py-4 sm:px-6">
							<p className="text-xs uppercase tracking-[0.35em] text-accent">Titres</p>
						</div>
						<div className="divide-y divide-border/70">
							{release.tracks.map((track, trackIndex) => (
								<TrackRowAction
									key={track.index}
									releaseSlug={release.slug}
									trackIndex={trackIndex}
									trackNumber={track.index}
									title={track.title}
									duration={track.duration}
								/>
							))}
						</div>
					</div>

					<aside className="space-y-4">
						<div className="border border-border/70 bg-black/20 p-5 shadow-lg shadow-black/15">
							<p className="text-xs uppercase tracking-[0.35em] text-accent">Crédits</p>
							<div className="mt-4 space-y-3 text-sm text-foreground/75">
								{release.credits.map((credit, creditIndex) => (
									<div key={creditIndex} className="space-y-1">
										<p className="font-medium text-base">
											{credit.name}
										</p>
										<p>
											{credit.role}
										</p>
									</div>
								))}
							</div>
						</div>
					</aside>
				</section>

				{youtubeEmbedUrl ? (
					<section className="overflow-hidden border border-border/70 bg-black/20 shadow-lg shadow-black/15">
						<div className="border-b border-border/70 px-5 py-4 sm:px-6">
							<p className="text-xs uppercase tracking-[0.35em] text-accent">Vidéo</p>
						</div>
						<div className="p-3 sm:p-4">
							<div className="overflow-hidden border border-border/60 bg-black">
								<iframe
									title={`Vidéo YouTube de ${release.title}`}
									src={youtubeEmbedUrl}
									className="aspect-video w-full"
									allow="accelerometer; autoplay; clipboard-write; encrypted-media; gyroscope; picture-in-picture; web-share"
									referrerPolicy="strict-origin-when-cross-origin"
									allowFullScreen
								/>
							</div>
						</div>
					</section>
				) : null}
			</div>
		</main>
	);
}