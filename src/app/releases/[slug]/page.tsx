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

	if (!release) {
		notFound();
	}

	return (
		<main className="min-h-full bg-[radial-gradient(circle_at_top,rgba(64,128,128,0.22),transparent_38%),linear-gradient(180deg,#0f1414_0%,#141919_36%,#101414_100%)] text-foreground">
			<div className="mx-auto flex w-full max-w-7xl flex-col gap-8 px-5 pb-12 pt-28 sm:px-8 lg:px-12">
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
								className="w-full sm:w-auto rounded-full border border-border/70 bg-black/20 px-5 py-3 text-sm text-foreground/70 transition hover:border-primary/60 hover:text-foreground"
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
								<p>Artiste-Interprète : {release.artistName}</p>
								<p>Beatmaker : {release.beatmaker}</p>
							</div>
						</div>
					</aside>
				</section>
			</div>
		</main>
	);
}