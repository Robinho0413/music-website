import Image from "next/image";
import Link from "next/link";
import ReleaseActions from "@/components/cards/ReleaseActions";

type LastReleaseProps = {
	releaseSlug: string;
	title: string;
	artistName: string;
	releaseDate: string;
	releaseType: string;
	nbTitres: number;
	coverSrc?: string;
	coverAlt?: string;
};

export default function LastRelease({
	releaseSlug,
	title,
	artistName,
	releaseDate,
	releaseType,
	nbTitres,
	coverSrc,
	coverAlt,
}: LastReleaseProps) {
	return (
		<section className="w-full max-w-6xl overflow-hidden border border-border/70 bg-[linear-gradient(135deg,rgba(64,128,128,0.24),rgba(20,25,25,0.94)_55%)] shadow-2xl shadow-black/20">
			<div className="flex flex-col md:flex-row gap-0">
				<Link
					href={`/releases/${releaseSlug}`}
					aria-label={`Ouvrir la page de ${title}`}
					className="group relative aspect-square w-full overflow-hidden bg-black/20"
				>
					{coverSrc ? (
						<Image
							src={coverSrc}
							alt={coverAlt ?? `Cover de ${title}`}
							fill
							className="object-cover aspect-square transition-transform duration-300 group-hover:scale-102"
							priority
						/>
					) : (
						<div className="absolute inset-0 bg-[radial-gradient(circle_at_top_left,rgba(64,128,128,0.48),transparent_42%),linear-gradient(145deg,#273232_0%,#141919_45%,#0c1010_100%)]" />
					)}

					<div className="absolute inset-0 bg-linear-to-t from-black/70 via-black/20 to-transparent" />

					<div className="absolute left-5 top-5 rounded-full border border-white/20 bg-black/35 px-4 py-2 text-xs font-semibold uppercase tracking-[0.28em] text-foreground backdrop-blur-md sm:left-7 sm:top-7">
						Dernière sortie
					</div>
				</Link>

				<div className="flex flex-col w-full justify-end gap-8 p-5 sm:p-7 md:p-10">
					<div>
						<p className="text-base tracking-[0.35em] text-accent">
							{artistName}
						</p>
						<Link
							href={`/releases/${releaseSlug}`}
							className="mt-3 inline-block max-w-xl text-3xl font-semibold tracking-tight text-foreground transition-opacity hover:opacity-80 sm:text-5xl"
						>
							{title}
						</Link>
					</div>

					<dl className="flex flex-col gap-4">
						<div className="rounded-xl border border-border/70 bg-black/20 p-4 backdrop-blur-sm">
							<dd className="flex text-base font-medium text-foreground gap-3">
								<span>{releaseType}</span>
								<span>•</span>
								<span>{releaseDate}</span>
								<span>•</span>
								<span>{nbTitres} titres</span>
							</dd>
						</div>


						<div className="flex flex-col sm:flex-row items-center gap-3 mt-3">
							<ReleaseActions releaseSlug={releaseSlug} />
							<Link
								href={`/releases/${releaseSlug}/streaming`}
								className="w-full sm:w-auto text-center min-w-40 rounded-full border border-border/70 bg-black/20 px-5 py-3 text-sm text-foreground/70 transition hover:border-primary/60 hover:text-foreground"
							>
								Ecouter en streaming
							</Link>
						</div>
					</dl>
				</div>
			</div>
		</section>
	);
}
