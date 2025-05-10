import { PhilosophicalEra } from "@/prisma/generated/prisma";

export function getPhilosophicalEra(era: PhilosophicalEra): string {
  switch (era) {
    case PhilosophicalEra.ANCIENT_EAST:
      return "Ancient Eastern (3000-500 BCE)";
    case PhilosophicalEra.PRE_SOCRATIC:
      return "Pre-Socratic (600-400 BCE)";
    case PhilosophicalEra.CLASSICAL_GREEK:
      return "Classical Greek (470-322 BCE)";
    case PhilosophicalEra.HELLENISTIC:
      return "Hellenistic (322-31 BCE)";
    case PhilosophicalEra.ROMAN:
      return "Roman (31 BCE-476 CE)";
    case PhilosophicalEra.MEDIEVAL_EARLY:
      return "Early Medieval (476-1000)";
    case PhilosophicalEra.MEDIEVAL_HIGH:
      return "High Medieval (1000-1300)";
    case PhilosophicalEra.MEDIEVAL_LATE:
      return "Late Medieval (1300-1453)";
    case PhilosophicalEra.RENAISSANCE:
      return "Renaissance (1453-1600)";
    case PhilosophicalEra.EARLY_MODERN:
      return "Early Modern (1600-1750)";
    case PhilosophicalEra.ENLIGHTENMENT:
      return "Enlightenment (1750-1800)";
    case PhilosophicalEra.ROMANTICISM:
      return "Romanticism (1800-1850)";
    case PhilosophicalEra.LATE_MODERN:
      return "Late Modern (1850-1920)";
    case PhilosophicalEra.EARLY_CONTEMPORARY:
      return "Early Contemporary (1920-1960)";
    case PhilosophicalEra.POSTMODERN:
      return "Postmodern (1960-2000)";
    case PhilosophicalEra.CONTEMPORARY:
      return "Contemporary (2000-present)";
    default:
      return "Unknown";
  }
}
