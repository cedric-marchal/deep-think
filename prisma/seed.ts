import { prisma } from "@/src/lib/prisma";

export async function main() {
  await prisma.philosopher.createMany({
    data: [
      {
        name: "Confucius",
        slug: "confucius",
        era: "ANCIENT_EAST",
        imageUrl:
          "https://upload.wikimedia.org/wikipedia/commons/thumb/4/4f/Konfuzius-1770.jpg/960px-Konfuzius-1770.jpg",
        description:
          "Philosophe chinois du VIe siècle av. J.-C., fondateur du confucianisme, il a prôné l'ordre moral, la piété filiale et le gouvernement vertueux.",
      },
      {
        name: "Thalès de Milet",
        slug: "thales-de-milet",
        era: "PRE_SOCRATIC",
        imageUrl:
          "https://upload.wikimedia.org/wikipedia/commons/thumb/c/c6/Illustrerad_Verldshistoria_band_I_Ill_107.jpg/1024px-Illustrerad_Verldshistoria_band_I_Ill_107.jpg",
        description:
          "Considéré comme le premier philosophe grec, Thalès a proposé une explication naturelle du monde, identifiant l'eau comme principe fondamental.",
      },
      {
        name: "Socrate",
        slug: "socrate",
        era: "CLASSICAL_GREEK",
        imageUrl:
          "https://upload.wikimedia.org/wikipedia/commons/thumb/b/bc/Socrate_du_Louvre.jpg/1280px-Socrate_du_Louvre.jpg",
        description:
          "Philosophe grec célèbre pour sa méthode dialectique, il n'a rien écrit, mais ses idées ont marqué la pensée occidentale à travers Platon.",
      },
      {
        name: "Épictète",
        slug: "epictete",
        era: "ROMAN",
        imageUrl:
          "https://upload.wikimedia.org/wikipedia/commons/3/39/Epictetus_from_L._Annaei_Senecae_philosophi_Opera%2C_1605%2C_title_page_detail.png",
        description:
          "Stoïcien romain d'origine grecque, esclave affranchi, il enseigna l'acceptation du destin et la maîtrise de soi.",
      },
      {
        name: "Avicenne",
        slug: "avicenne",
        era: "MEDIEVAL_HIGH",
        imageUrl:
          "https://upload.wikimedia.org/wikipedia/commons/7/74/Avicenna-miniatur.jpg",
        description:
          "Philosophe et médecin persan, il a synthétisé la pensée aristotélicienne avec l'islam et influencé la scolastique médiévale.",
      },
      {
        name: "Giordano Bruno",
        slug: "giordano-bruno",
        era: "RENAISSANCE",
        imageUrl:
          "https://upload.wikimedia.org/wikipedia/commons/f/f4/Giordano_Bruno_-_Mentzel.jpg",
        description:
          "Philosophe italien brûlé pour hérésie, il a défendu l'infinité de l'univers et une vision panthéiste de la nature.",
      },
      {
        name: "Baruch Spinoza",
        slug: "baruch-spinoza",
        era: "EARLY_MODERN",
        imageUrl:
          "https://upload.wikimedia.org/wikipedia/commons/thumb/e/ea/Spinoza.jpg/1280px-Spinoza.jpg",
        description:
          "Penseur rationaliste hollandais, il a élaboré un système philosophique fondé sur l'unité de Dieu et de la nature.",
      },
      {
        name: "Jean-Jacques Rousseau",
        slug: "jean-jacques-rousseau",
        era: "ENLIGHTENMENT",
        imageUrl:
          "https://upload.wikimedia.org/wikipedia/commons/thumb/b/b7/Jean-Jacques_Rousseau_%28painted_portrait%29.jpg/1024px-Jean-Jacques_Rousseau_%28painted_portrait%29.jpg",
        description:
          "Philosophe genevois, il a influencé la Révolution française par ses théories sur le contrat social, la liberté et l'éducation.",
      },
      {
        name: "Friedrich Nietzsche",
        slug: "friedrich-nietzsche",
        era: "LATE_MODERN",
        imageUrl:
          "https://upload.wikimedia.org/wikipedia/commons/1/1d/Portrait_of_Friedrich_Nietzsche.jpg",
        description:
          "Philosophe allemand du XIXe siècle, critique de la morale chrétienne, il a introduit les concepts de volonté de puissance et d'éternel retour.",
      },
      {
        name: "Judith Butler",
        slug: "judith-butler",
        era: "CONTEMPORARY",
        imageUrl:
          "https://upload.wikimedia.org/wikipedia/commons/4/4a/Judith_Butler_al_CCCB_2018_%28cropped%29.jpg",
        description:
          "Théoricienne américaine du genre, elle a développé la notion de performativité du genre et influencé la pensée queer contemporaine.",
      },
    ],
  });

  console.log("Seed completed.");
}
main()
  .catch((error) => {
    console.error(error);
    process.exit(1);
  })
  .finally(async () => {
    await prisma.$disconnect();
  });
