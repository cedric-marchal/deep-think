import { prisma } from "@/src/lib/prisma";

export const main = async () => {
  await prisma.philosopher.createMany({
    data: [
      {
        name: "Confucius",
        slug: "confucius",
        era: "ANCIENT_EAST",
        imageUrl:
          "https://upload.wikimedia.org/wikipedia/commons/thumb/4/4f/Konfuzius-1770.jpg/960px-Konfuzius-1770.jpg",
        description:
          "Philosophe chinois du VIe siècle av. J.-C., fondateur du confucianisme, il a prôné l’ordre moral, la piété filiale et le gouvernement vertueux.",
        birthDate: new Date("0551-09-28"),
        deathDate: new Date("0479-01-01"),
        birthPlace: "Zou, État de Lu (actuelle province du Shandong, Chine)",
        deathPlace: "Lu, Chine",
        schoolOfThought: "Confucianisme",
        notableWorks: ["Les Entretiens (Analectes)"],
        mainIdeas: [
          "Vertu (Ren)",
          "Piété filiale",
          "Ordre social",
          "Éthique personnelle",
        ],
        influences: ["Laozi"],
        influenced: ["Mencius", "Zhu Xi", "Wang Yangming"],
        quotes: [
          "« Ne fais pas à autrui ce que tu ne veux pas qu'on te fasse. »",
        ],
        wikipediaUrl: "https://fr.wikipedia.org/wiki/Confucius",
      },
      {
        name: "Thalès de Milet",
        slug: "thales-de-milet",
        era: "PRE_SOCRATIC",
        imageUrl:
          "https://upload.wikimedia.org/wikipedia/commons/f/f2/Thales.jpg",
        description:
          "Considéré comme le premier philosophe grec, Thalès a proposé une explication naturelle du monde, identifiant l’eau comme principe fondamental.",
        birthDate: new Date("0624-01-01"),
        deathDate: new Date("0546-01-01"),
        birthPlace: "Milet, Ionie (actuelle Turquie)",
        deathPlace: "Milet, Ionie",
        schoolOfThought: "École milésienne",
        notableWorks: [],
        mainIdeas: [
          "L'eau comme principe de toutes choses",
          "Cosmologie",
          "Géométrie",
        ],
        influences: [],
        influenced: ["Anaximandre", "Anaximène", "Aristote"],
        quotes: ["« Tout est plein de dieux. »"],
        wikipediaUrl: "https://fr.wikipedia.org/wiki/Thalès_de_Milet",
      },
      {
        name: "Socrate",
        slug: "socrate",
        era: "CLASSICAL_GREEK",
        imageUrl:
          "https://upload.wikimedia.org/wikipedia/commons/5/5c/Socrate_du_Louvre.jpg",
        description:
          "Philosophe grec célèbre pour sa méthode dialectique, il n’a rien écrit, mais ses idées ont marqué la pensée occidentale à travers Platon.",
        birthDate: new Date("0470-01-01"),
        deathDate: new Date("0399-01-01"),
        birthPlace: "Athènes, Grèce",
        deathPlace: "Athènes, Grèce",
        schoolOfThought: "Philosophie socratique",
        notableWorks: [],
        mainIdeas: [
          "Maïeutique",
          "Connaissance de soi",
          "Éthique",
          "Ironie socratique",
        ],
        influences: ["Anaxagore", "Parménide"],
        influenced: ["Platon", "Xénophon", "Antisthène"],
        quotes: [
          "« Connais-toi toi-même. »",
          "« Je sais que je ne sais rien. »",
        ],
        wikipediaUrl: "https://fr.wikipedia.org/wiki/Socrate",
      },
      {
        name: "Épictète",
        slug: "epictete",
        era: "ROMAN",
        imageUrl:
          "https://upload.wikimedia.org/wikipedia/commons/3/31/Epictetus.jpg",
        description:
          "Stoïcien romain d’origine grecque, esclave affranchi, il enseigna l’acceptation du destin et la maîtrise de soi.",
        birthDate: new Date("050-01-01"),
        deathDate: new Date("0135-01-01"),
        birthPlace: "Hiérapolis, Phrygie (actuelle Pamukkale, Turquie)",
        deathPlace: "Nicopolis, Épire (actuelle Grèce)",
        schoolOfThought: "Stoïcisme",
        notableWorks: ["Manuel", "Entretiens"],
        mainIdeas: [
          "Contrôle de soi",
          "Acceptation du destin",
          "Dichotomie du contrôle",
        ],
        influences: ["Socrate", "Zénon de Kition"],
        influenced: ["Marc Aurèle", "Sénèque"],
        quotes: [
          "« Ce qui trouble les hommes, ce ne sont pas les choses, mais les jugements qu'ils portent sur les choses. »",
        ],
        wikipediaUrl: "https://fr.wikipedia.org/wiki/%C3%89pict%C3%A8te",
      },
      {
        name: "Avicenne",
        slug: "avicenne",
        era: "MEDIEVAL_HIGH",
        imageUrl:
          "https://upload.wikimedia.org/wikipedia/commons/c/c0/Avicenna-miniature-2.jpg",
        description:
          "Philosophe et médecin persan, il a synthétisé la pensée aristotélicienne avec l’islam et influencé la scolastique médiévale.",
        birthDate: new Date("0980-01-01"),
        deathDate: new Date("1037-01-01"),
        birthPlace: "Afshana, près de Boukhara (actuel Ouzbékistan)",
        deathPlace: "Hamadan, Iran",
        schoolOfThought: "Philosophie islamique",
        notableWorks: ["Le Livre de la guérison", "Le Canon de la médecine"],
        mainIdeas: ["Essence et existence", "Intellect agent", "Médecine"],
        influences: ["Aristote", "Al-Farabi"],
        influenced: ["Thomas d'Aquin", "Averroès"],
        quotes: [
          "« L'ignorance mène à la peur, la peur mène à la haine, et la haine conduit à la violence. »",
        ],
        wikipediaUrl: "https://fr.wikipedia.org/wiki/Avicenne",
      },
      {
        name: "Giordano Bruno",
        slug: "giordano-bruno",
        era: "RENAISSANCE",
        imageUrl:
          "https://upload.wikimedia.org/wikipedia/commons/6/6d/Giordano_Bruno.jpg",
        description:
          "Philosophe italien brûlé pour hérésie, il a défendu l’infinité de l’univers et une vision panthéiste de la nature.",
        birthDate: new Date("1548-01-01"),
        deathDate: new Date("1600-02-17"),
        birthPlace: "Nola, Royaume de Naples (Italie)",
        deathPlace: "Rome, États pontificaux",
        schoolOfThought: "Hermétisme, Néoplatonisme",
        notableWorks: [
          "De l'infini, de l'univers et des mondes",
          "La Cène des cendres",
        ],
        mainIdeas: [
          "Infinité de l'univers",
          "Pluralité des mondes",
          "Panthéisme",
        ],
        influences: ["Copernic", "Plotin"],
        influenced: ["Spinoza", "Leibniz"],
        quotes: ["« L'univers est infini et il y a une infinité de mondes. »"],
        wikipediaUrl: "https://fr.wikipedia.org/wiki/Giordano_Bruno",
      },
      {
        name: "Baruch Spinoza",
        slug: "baruch-spinoza",
        era: "EARLY_MODERN",
        imageUrl:
          "https://upload.wikimedia.org/wikipedia/commons/3/3a/Spinoza.jpg",
        description:
          "Penseur rationaliste hollandais, il a élaboré un système philosophique fondé sur l’unité de Dieu et de la nature.",
        birthDate: new Date("1632-11-24"),
        deathDate: new Date("1677-02-21"),
        birthPlace: "Amsterdam, Provinces-Unies (Pays-Bas)",
        deathPlace: "La Haye, Provinces-Unies",
        schoolOfThought: "Rationalisme, Spinozisme",
        notableWorks: ["Éthique", "Traité théologico-politique"],
        mainIdeas: ["Monisme", "Déterminisme", "Liberté par la raison"],
        influences: ["Descartes", "Maïmonide"],
        influenced: ["Hegel", "Nietzsche", "Einstein"],
        quotes: ["« Dieu, c’est-à-dire la Nature. »"],
        wikipediaUrl: "https://fr.wikipedia.org/wiki/Baruch_Spinoza",
      },
      {
        name: "Jean-Jacques Rousseau",
        slug: "jean-jacques-rousseau",
        era: "ENLIGHTENMENT",
        imageUrl:
          "https://upload.wikimedia.org/wikipedia/commons/9/99/Jean-Jacques_Rousseau_%28painted_portrait%29.jpg",
        description:
          "Philosophe genevois, il a influencé la Révolution française par ses théories sur le contrat social, la liberté et l’éducation.",
        birthDate: new Date("1712-06-28"),
        deathDate: new Date("1778-07-02"),
        birthPlace: "Genève, République de Genève",
        deathPlace: "Ermenonville, Royaume de France",
        schoolOfThought: "Contrat social, Romantisme",
        notableWorks: [
          "Du contrat social",
          "Émile ou De l’éducation",
          "Les Confessions",
        ],
        mainIdeas: [
          "Volonté générale",
          "État de nature",
          "Éducation naturelle",
        ],
        influences: ["Locke", "Montesquieu"],
        influenced: ["Kant", "Robespierre", "Tolstoï"],
        quotes: ["« L’homme est né libre, et partout il est dans les fers. »"],
        wikipediaUrl: "https://fr.wikipedia.org/wiki/Jean-Jacques_Rousseau",
      },
      {
        name: "Friedrich Nietzsche",
        slug: "friedrich-nietzsche",
        era: "LATE_MODERN",
        imageUrl:
          "https://upload.wikimedia.org/wikipedia/commons/1/1b/Nietzsche1882.jpg",
        description:
          "Philosophe allemand du XIXe siècle, critique de la morale chrétienne, il a introduit les concepts de volonté de puissance et d’éternel retour.",
        birthDate: new Date("1844-10-15"),
        deathDate: new Date("1900-08-25"),
        birthPlace: "Röcken, Royaume de Prusse (Allemagne actuelle)",
        deathPlace: "Weimar, Empire allemand",
        schoolOfThought: "Philosophie du soupçon, Nihilisme, Existentialisme",
        notableWorks: [
          "Ainsi parlait Zarathoustra",
          "Par-delà bien et mal",
          "La Généalogie de la morale",
        ],
        mainIdeas: [
          "Volonté de puissance",
          "Éternel retour",
          "Surhomme",
          "Critique de la morale",
        ],
        influences: ["Schopenhauer", "Héraclite"],
        influenced: ["Heidegger", "Foucault", "Deleuze", "Camus"],
        quotes: ["« Dieu est mort. »", "« Deviens ce que tu es. »"],
        wikipediaUrl: "https://fr.wikipedia.org/wiki/Friedrich_Nietzsche",
      },
      {
        name: "Judith Butler",
        slug: "judith-butler",
        era: "CONTEMPORARY",
        imageUrl:
          "https://upload.wikimedia.org/wikipedia/commons/4/45/JudithButler.jpg",
        description:
          "Théoricienne américaine du genre, elle a développé la notion de performativité du genre et influencé la pensée queer contemporaine.",
        birthDate: new Date("1956-02-24"),
        deathDate: null,
        birthPlace: "Cleveland, Ohio, États-Unis",
        deathPlace: null,
        schoolOfThought: "Féminisme poststructuraliste, Théorie queer",
        notableWorks: ["Gender Trouble", "Bodies That Matter"],
        mainIdeas: [
          "Performativité du genre",
          "Déconstruction du sexe et du genre",
        ],
        influences: ["Foucault", "Derrida", "Simone de Beauvoir"],
        influenced: ["Jack Halberstam", "Paul B. Preciado"],
        quotes: [
          "« Le genre est une performance, ce n’est pas ce que l’on est, c’est ce que l’on fait. »",
        ],
        wikipediaUrl: "https://fr.wikipedia.org/wiki/Judith_Butler",
      },
    ],
  });

  console.log("Seed completed.");
};

main()
  .then(() => prisma.$disconnect())
  .catch((error) => {
    console.error(error);
    prisma.$disconnect();
    process.exit(1);
  });
