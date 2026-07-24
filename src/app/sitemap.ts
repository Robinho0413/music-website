import type { MetadataRoute } from "next";
import { releases } from "@/lib/releases";

export default function sitemap(): MetadataRoute.Sitemap {
	const siteUrl = process.env.NEXT_PUBLIC_SITE_URL ?? "https://robcz.com";

	const staticRoutes = ["", "/platforms", "/mentions-legales"];
	const releaseRoutes = releases.flatMap((release) => [
		`/releases/${release.slug}`,
		`/releases/${release.slug}/streaming`,
	]);

	return [...staticRoutes, ...releaseRoutes].map((path) => ({
		url: `${siteUrl}${path}`,
		lastModified: new Date(),
	}));
}