import Image from "next/image";
import Link from "next/link";

type ReleaseItem = {
	slug: string;
	title: string;
	coverSrc: string;
	coverAlt?: string;
};

type AllReleasesProps = {
	releases: ReleaseItem[];
};

export default function AllReleases({ releases }: AllReleasesProps) {
	return (
		<section className="w-full max-w-6xl space-y-5">
			<div className="flex items-end justify-between gap-4">
				<div>
					<p className="text-xs uppercase tracking-[0.35em] text-accent">
						All releases
					</p>
					<h2 className="mt-2 text-2xl font-semibold tracking-tight text-foreground sm:text-3xl">
						Toutes les sorties
					</h2>
				</div>
			</div>

			<div className="grid gap-6 sm:gap-12 grid-cols-2 lg:grid-cols-3">
				{releases.map((release) => (
					<Link
						key={release.title}
						href={`/releases/${release.slug}`}
						aria-label={`Ouvrir ${release.title}`}
						className="group relative block h-full overflow-hidden border border-border/70 bg-black/20 shadow-lg shadow-black/15 transition-transform duration-300 hover:-translate-y-1"
					>
						<div className="relative aspect-square">
							<Image
								src={release.coverSrc}
								alt={release.coverAlt ?? `Cover de ${release.title}`}
								fill
								className="object-cover transition duration-300 group-hover:scale-102"
							/>
							<div className="absolute inset-0 bg-linear-to-t from-black/35 via-transparent to-transparent opacity-90" />
						</div>
					</Link>
				))}
			</div>
		</section>
	);
}
