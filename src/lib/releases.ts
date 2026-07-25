export type ReleaseTrack = {
	index: number;
	title: string;
	duration: string;
	audioSrc: string;
};

export type Release = {
	slug: string;
	title: string;
	artistName: string;
	releaseDate: string;
	releaseType: string;
	nbTitres: number;
	coverSrc: string;
	coverAlt: string;
	beatmaker: string;
	youtubeVideoUrl?: string;
	streamingLinks?: Partial<Record<string, string>>;
	tracks: ReleaseTrack[];
};

export const releases: Release[] = [
	{
		slug: "le-sel-peut-bruler",
		title: "Le sel peut brûler",
		artistName: "robcz",
		releaseDate: "01 juillet 2026",
		releaseType: "EP",
		nbTitres: 3,
		coverSrc: "/images/Cover_le-sel-peut-bruler-3.png",
		coverAlt: "Cover de Le sel peut brûler",
		beatmaker: "Spleen",
		streamingLinks: {
			Spotify: "https://open.spotify.com/intl-fr/album/5B2CQu635oiLtKiDsOP0fe?si=PKhbdu6zRVyUxnx6VTzc2Q",
			Deezer: "https://link.deezer.com/s/33UEyZ4dEmSJEIBzoO3kj",
			"Apple Music": "https://music.apple.com/fr/album/le-sel-peut-br%C3%BBler-single/6786470028",
			YouTube: "https://www.youtube.com/playlist?list=OLAK5uy_kVzmuuoNSAD3azEC3Hq7-UZNXu8t0n8aA",
			"Youtube Music": "https://music.youtube.com/playlist?list=OLAK5uy_kVzmuuoNSAD3azEC3Hq7-UZNXu8t0n8aA",
			"Amazon Music": "https://music.amazon.com/albums/B0H73MTH4X?marketplaceId=ATVPDKIKX0DER&musicTerritory=FR&ref=dm_sh_xz66rjdx149tsI6mjbTPsliOS",
			Tidal: "https://tidal.com/album/538950367/",
			Qobuz: "https://www.qobuz.com/fr-fr/album/le-sel-peut-bruler-robcz/bl88vp1o9f6zk",
		},
		tracks: [
			{
				index: 1,
				title: "No Stress",
				duration: "1:44",
				audioSrc: "/audio/Nostress.mp3",
			},
			{
				index: 2,
				title: "J'Attends l'Eclaircie",
				duration: "2:58",
				audioSrc: "/audio/J'attends l'Eclaircie.mp3",
			},
			{
				index: 3,
				title: "Burning",
				duration: "2:16",
				audioSrc: "/audio/Burning.mp3",
			},
		],
	},
	{
		slug: "vide",
		title: "Vide",
		artistName: "robcz",
		releaseDate: "26 avril 2024",
		releaseType: "Single",
		nbTitres: 1,
		coverSrc: "/images/Cover_Vide.png",
		coverAlt: "Cover de Vide",
		beatmaker: "Spleen",
		youtubeVideoUrl: "https://youtu.be/xpjxokK9hCo",
		streamingLinks: {
			Spotify: "https://open.spotify.com/intl-fr/album/4KGNmVd5QHKCdPVbzSnDFx?si=y-OdWyp6S26d_Ml1xiAMEw",
			Deezer: "https://link.deezer.com/s/33UER0FOhiUdzVehGAu92",
			"Apple Music": "https://music.apple.com/fr/album/vide-single/1743481737",
			YouTube: "https://www.youtube.com/playlist?list=OLAK5uy_nebJpiAjtEa5ZAx1OrakQIwLhng-8cGiw",
			"Youtube Music": "https://music.youtube.com/playlist?list=OLAK5uy_nebJpiAjtEa5ZAx1OrakQIwLhng-8cGiw",
			"Amazon Music": "https://music.amazon.com/albums/B0D2QKHVTF?marketplaceId=ATVPDKIKX0DER&musicTerritory=FR&ref=dm_sh_iKTBoXrp6Nwfs5CQ6gBryFSxx",
			Tidal: "https://tidal.com/album/359988073/",
		},
		tracks: [
			{
				index: 1,
				title: "Vide",
				duration: "2:27",
				audioSrc: "/audio/Vide.mp3",
			},
		],
	},
];

export function getReleaseBySlug(slug: string) {
	return releases.find((release) => release.slug === slug);
}