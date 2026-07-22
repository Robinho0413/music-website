import LastRelease from "@/components/cards/lastRelease";

export default function Home() {
  return (
    <div className="flex min-h-full flex-1 bg-background text-foreground">
      <main className="mx-auto flex flex-col w-full max-w-7xl flex-1 items-center px-5 py-8 sm:px-8 lg:px-12 mt-14 gap-12">
        <LastRelease
          title="Le sel peut brûler"
          artistName="robcz"
          releaseDate="01 juillet 2026"
          releaseType="EP"
          nbTitres={3}
          coverSrc="/images/Cover_le-sel-peut-bruler-3.png"
          coverAlt="Cover de Le sel peut brûler"
        />
        <LastRelease
          title="Le sel peut brûler"
          artistName="robcz"
          releaseDate="01 juillet 2026"
          releaseType="EP"
          nbTitres={3}
          coverSrc="/images/Cover_le-sel-peut-bruler-3.png"
          coverAlt="Cover de Le sel peut brûler"
        />
      </main>
    </div>
  );
}
