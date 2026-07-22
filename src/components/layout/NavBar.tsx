import Link from "next/link";

const instagramHref = "https://www.instagram.com/lerobcz/";
import { LuInstagram } from "react-icons/lu";

export default function NavBar() {
	return (
		<header className="fixed z-50 w-full bg-background text-foreground">
			<nav className="mx-auto flex w-full max-w-7xl items-center justify-between px-5 py-6 sm:px-8 lg:px-12">
				<Link href="/" className="text-sm tracking-[0.35em] drop-shadow-sm drop-shadow-foreground">
					robcz
				</Link>

				<Link
					href={instagramHref}
					aria-label="Instagram de robcz"
					target="_blank"
					rel="noreferrer"
					className="inline-flex items-center justify-center text-foreground transition-opacity hover:opacity-70"
				>
					<LuInstagram className="h-5 w-5" />
				</Link>
			</nav>
		</header>
	);
}
