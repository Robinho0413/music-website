import type { Metadata } from "next";
import LastRelease from "@/components/cards/lastRelease";
import AllReleases from "@/components/cards/allReleases";
import { releases } from "@/lib/releases";

export const metadata: Metadata = {
  title: "Accueil",
  description: "Site officiel de robcz: dernières sorties, streaming et plateformes.",
};

export default function Home() {
  return (
    <div className="flex min-h-full flex-1 bg-background text-foreground">
      <main className="mx-auto flex flex-col w-full max-w-7xl flex-1 items-center px-5 py-8 sm:px-8 lg:px-12 mt-24 gap-12">
        <LastRelease
          releaseSlug={releases[0].slug}
          title={releases[0].title}
          artistName={releases[0].artistName}
          releaseDate={releases[0].releaseDate}
          releaseType={releases[0].releaseType}
          nbTitres={releases[0].nbTitres}
          coverSrc={releases[0].coverSrc}
          coverAlt={releases[0].coverAlt}
        />
        <AllReleases
          releases={releases.map(({ slug, title, coverSrc, coverAlt }) => ({
            slug,
            title,
            coverSrc,
            coverAlt,
          }))}
        />
      </main>
    </div>
  );
}
