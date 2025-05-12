import { prisma } from "@/src/lib/prisma";

async function main() {
  await prisma.philosopher.create({
    data: {
      name: "Confucius",
      slug: "confucius",
      era: "ANCIENT_EAST",
      imageUrl:
        "https://upload.wikimedia.org/wikipedia/commons/thumb/4/4f/Konfuzius-1770.jpg/960px-Konfuzius-1770.jpg",
      description:
        "Philosophe chinois du VIe siècle av. J.-C., fondateur du confucianisme, il a prôné l'ordre moral, la piété filiale et le gouvernement vertueux.",
    },
  });
}

main()
  .catch((error) => {
    console.error(error);
    process.exit(1);
  })
  .finally(async () => {
    await prisma.$disconnect();
  });
