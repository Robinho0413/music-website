import Image from "next/image";

type LastReleaseProps = {
	title: string;
	artistName: string;
	releaseDate: string;
	releaseType: string;
	nbTitres: number;
	coverSrc?: string;
	coverAlt?: string;
};

export default function LastRelease({
	title,
	artistName,
	releaseDate,
	releaseType,
	nbTitres,
	coverSrc,
	coverAlt,
}: LastReleaseProps) {
	return (
		<section className="w-full max-w-6xl overflow-hidden rounded-lg border border-border/70 bg-[linear-gradient(135deg,rgba(64,128,128,0.24),rgba(20,25,25,0.94)_55%)] shadow-2xl shadow-black/20">
			<div className="flex flex-col md:flex-row gap-0">
				<div className="relative aspect-square w-full overflow-hidden bg-black/20">
					{coverSrc ? (
						<Image
							src={coverSrc}
							alt={coverAlt ?? `Cover de ${title}`}
							fill
							className="object-cover aspect-square"
							priority
						/>
					) : (
						<div className="absolute inset-0 bg-[radial-gradient(circle_at_top_left,rgba(64,128,128,0.48),transparent_42%),linear-gradient(145deg,#273232_0%,#141919_45%,#0c1010_100%)]" />
					)}

					<div className="absolute inset-0 bg-linear-to-t from-black/70 via-black/20 to-transparent" />

					<div className="absolute left-5 top-5 rounded-full border border-white/20 bg-black/35 px-4 py-2 text-xs font-semibold uppercase tracking-[0.28em] text-foreground backdrop-blur-md sm:left-7 sm:top-7">
						Dernière sortie
					</div>

					{/* <div className="absolute inset-x-0 bottom-0 p-5 sm:p-7 md:p-8">
						<p className="text-sm tracking-[0.35em] text-white/70">
							{artistName}
						</p>
						<h1 className="mt-3 max-w-xl text-3xl font-semibold tracking-tight text-white sm:text-5xl">
							{title}
						</h1>
					</div> */}
				</div>

				<div className="flex flex-col w-full justify-end gap-8 p-5 sm:p-7 md:p-10">
					<div>
						<p className="text-base tracking-[0.35em] text-accent">	
							{artistName}
						</p>
						<h1 className="mt-3 max-w-xl text-3xl font-semibold tracking-tight text-foreground sm:text-5xl">
							{title}
						</h1>
					</div>

					<dl className="grid gap-4 sm:grid-cols-2">
						<div className="rounded-xl border border-border/70 bg-black/20 p-4 backdrop-blur-sm">
							<dd className="text-lg font-medium text-foreground">
								{releaseType} · {nbTitres} titres
							</dd>
						</div>
						<div className="rounded-xl border border-border/70 bg-black/20 p-4 backdrop-blur-sm">
							<dd className="text-lg font-medium text-foreground">
								{releaseDate}
							</dd>
						</div>


						<div className="rounded-xl border border-border/70 bg-black/20 p-4 backdrop-blur-sm sm:col-span-2">
							<dt className="text-xs uppercase tracking-[0.3em] text-foreground/55">
								Lecture
							</dt>
							<dd className="mt-2 text-lg font-medium text-foreground">
								barre de lecture
							</dd>
						</div>
					</dl>
				</div>
			</div>
		</section>
	);
}
