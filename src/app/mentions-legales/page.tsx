import type { Metadata } from "next";

export const metadata: Metadata = {
    title: "Mentions légales | robcz",
    description: "Mentions légales du site robcz.",
};

export default function MentionsLegalesPage() {
    return (
        <main className="min-h-full bg-[radial-gradient(circle_at_top,rgba(64,128,128,0.22),transparent_35%),linear-gradient(180deg,#0f1414_0%,#141919_38%,#101414_100%)] text-foreground">
            <div className="mx-auto flex w-full max-w-4xl flex-col gap-8 px-5 pb-12 pt-32 sm:px-8 lg:px-12">
                <div className="space-y-4">
                    <p className="text-sm uppercase tracking-[0.35em] text-accent">Mentions légales</p>
                    <h1 className="text-4xl font-semibold tracking-tight sm:text-5xl">Informations légales</h1>
                    <p className="max-w-2xl text-base text-foreground/75 sm:text-lg">
                        Cette page rassemble les informations obligatoires du site. Les champs nécessitant des données personnelles ou administratives doivent être complétés avec vos informations réelles.
                    </p>
                </div>

                <section className="space-y-4 border border-border/70 bg-black/20 p-6 shadow-lg shadow-black/15">
                    <h2 className="text-xl font-semibold">Éditeur du site</h2>
                    <div className="space-y-2 text-sm leading-6 text-foreground/75">
                        <p>Nom du site / marque : robcz</p>
                        <p>Éditeur : robcz</p>
                        <p>Contact : rbnmusic.contact@gmail.com</p>
                    </div>
                </section>

                <section className="space-y-4 border border-border/70 bg-black/20 p-6 shadow-lg shadow-black/15">
                    <h2 className="text-xl font-semibold">Hébergement</h2>
                    <div className="space-y-2 text-sm leading-6 text-foreground/75">
                        <p>Hébergeur : Vercel Inc.</p>
                        <p>Adresse de l’hébergeur : 340 S Lemon Ave #4133
                            Walnut, CA 91789
                            États-Unis</p>
                        <p>Site de l’hébergeur : vercel.com</p>
                    </div>
                </section>

                <section className="space-y-4 border border-border/70 bg-black/20 p-6 shadow-lg shadow-black/15">
                    <h2 className="text-xl font-semibold">Propriété intellectuelle</h2>
                    <div className="space-y-2 text-sm leading-6 text-foreground/75">
                        <p>
                            L’ensemble des contenus présents sur ce site, notamment les visuels, textes, pochettes et éléments graphiques, est protégé par le droit de la propriété intellectuelle.
                        </p>
                        <p>
                            Toute reproduction, représentation, modification ou exploitation non autorisée est interdite sans accord préalable.
                        </p>
                    </div>
                </section>

                <section className="space-y-4 border border-border/70 bg-black/20 p-6 shadow-lg shadow-black/15">
                    <h2 className="text-xl font-semibold">Données personnelles</h2>
                    <div className="space-y-2 text-sm leading-6 text-foreground/75">
                        <p>
                            Ce site ne collecte pas de données personnelles via formulaire à ce jour. Si des services tiers sont ajoutés, cette section devra être mise à jour.
                        </p>
                        <p>
                            Pour toute demande relative aux données, contactez l’éditeur à l’adresse indiquée ci-dessus.
                        </p>
                    </div>
                </section>
            </div>
        </main>
    );
}