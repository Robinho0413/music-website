import type { Metadata } from "next";
import Link from "next/link";
import { notFound } from "next/navigation";
import { BsArrowUpRight } from "react-icons/bs";
import { FaSpotify, FaYoutube, FaInstagram, FaSoundcloud } from "react-icons/fa";
import { ImAmazon } from "react-icons/im";
import { LuMusic } from "react-icons/lu";
import { SiApplemusic, SiDeezer, SiTidal, SiYoutubemusic } from "react-icons/si";
import { getReleaseBySlug, releases } from "@/lib/releases";
import { platformLinks } from "@/lib/platformLinks";

type StreamingPageProps = {
	params: Promise<{ slug: string }>;
};

export function generateStaticParams() {
	return releases.map((release) => ({ slug: release.slug }));
}

export async function generateMetadata({ params }: StreamingPageProps): Promise<Metadata> {
	const { slug } = await params;
	const release = getReleaseBySlug(slug);

	if (!release) {
		return { title: "Sortie introuvable" };
	}

	return {
		title: `Streaming | ${release.title} | robcz`,
		description: `Liens de streaming pour ${release.title}.`,
	};
}

const platformIcons: Record<string, React.ComponentType<{ className?: string }>> = {
	Spotify: FaSpotify,
	Deezer: SiDeezer,
	"Apple Music": SiApplemusic,
	YouTube: FaYoutube,
	"Youtube Music": SiYoutubemusic,
	Instagram: FaInstagram,
	"Amazon Music": ImAmazon,
	Tidal: SiTidal,
	Qobuz: LuMusic,
	SoundCloud: FaSoundcloud,
};

export default async function StreamingPage({ params }: StreamingPageProps) {
	const { slug } = await params;
	const release = getReleaseBySlug(slug);

	if (!release) {
		notFound();
	}

	const releasePlatforms = platformLinks.filter((platform) => release.streamingLinks?.[platform.name]);

	return (
		<main className="min-h-full bg-[radial-gradient(circle_at_top,rgba(64,128,128,0.22),transparent_35%),linear-gradient(180deg,#0f1414_0%,#141919_38%,#101414_100%)] text-foreground">
			<div className="mx-auto flex w-full max-w-7xl flex-col gap-8 px-5 pb-12 pt-28 sm:px-8 lg:px-12">
				<div className="max-w-3xl space-y-4">
					<p className="text-sm uppercase tracking-[0.35em] text-accent">Streaming</p>
					<h1 className="text-4xl font-semibold tracking-tight sm:text-5xl">{release.title}</h1>
					<p className="text-base text-foreground/75 sm:text-lg">
						Choisis la plateforme pour ouvrir directement la sortie.
					</p>
				</div>

				<section className="grid gap-4 sm:grid-cols-2 lg:grid-cols-3">
					{releasePlatforms.map((platform) => {
						const Icon = platformIcons[platform.name] ?? BsArrowUpRight;
						const releaseHref = release.streamingLinks?.[platform.name];

						return (
							<Link
								key={platform.name}
								href={releaseHref}
								target="_blank"
								rel="noreferrer"
								className="group flex min-h-40 flex-col justify-between border border-border/70 bg-black/20 p-5 shadow-lg shadow-black/15 transition hover:-translate-y-1 hover:border-primary/60"
							>
								<div className="flex items-start justify-between gap-4">
									<div>
										<p className="text-xl font-semibold text-foreground">{platform.name}</p>
										<p className="mt-1 text-sm text-foreground/65">{platform.handle}</p>
									</div>
									<Icon className="h-6 w-6 text-foreground/80" />
								</div>

								<div className="space-y-2">
									<p className="inline-flex items-center gap-2 text-sm text-primary">
										Ouvrir la sortie
										<BsArrowUpRight className="h-4 w-4 transition-transform group-hover:-translate-y-0.5 group-hover:translate-x-0.5" />
									</p>
								</div>
							</Link>
						);
					})}
				</section>
			</div>
		</main>
	);
}