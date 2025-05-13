import { prisma } from "@/src/lib/prisma";
import { NextResponse } from "next/server";

export async function POST(
  request: Request,
  { params }: { params: { philosopherId: string } },
) {
  try {
    // Récupérer l'ID du philosophe depuis les paramètres de l'URL
    const { philosopherId } = params;

    // Vérifier que le philosophe existe
    const philosopher = await prisma.philosopher.findUnique({
      where: { id: philosopherId },
      select: {
        id: true,
        name: true,
        era: true,
      },
    });

    if (!philosopher) {
      return NextResponse.json(
        { error: "Philosopher not found" },
        { status: 404 },
      );
    }

    // Récupérer le message de l'utilisateur depuis le corps de la requête
    const body = await request.json();
    const { message } = body;

    if (!message || typeof message !== "string") {
      return NextResponse.json(
        { error: "Message is required and must be a string" },
        { status: 400 },
      );
    }

    // Ici, vous pourriez implémenter une logique pour générer une réponse
    // basée sur le contexte du philosophe, son ère, etc.
    // Pour cet exemple, nous utilisons une réponse simulée basée sur le philosophe

    // Générer une réponse simple basée sur le philosophe
    const philosopherResponse = generatePhilosopherResponse(
      philosopher.name,
      philosopher.era,
      message,
    );

    // Retourner la réponse
    return NextResponse.json({ message: philosopherResponse });
  } catch (error) {
    console.error("Error in chat API:", error);
    return NextResponse.json(
      { error: "An error occurred while processing your request" },
      { status: 500 },
    );
  }
}

// Fonction simple pour générer des réponses basées sur le philosophe
// Dans une vraie application, cela pourrait être remplacé par un appel à un LLM
function generatePhilosopherResponse(
  philosopherName: string,
  philosopherEra: string,
  userMessage: string,
): string {
  // Mots clés qui pourraient déclencher différentes réponses
  const keywords = {
    life: [
      "Life is a mystery to be lived, not a problem to be solved.",
      "The unexamined life is not worth living.",
      "Life must be understood backward, but lived forward.",
    ],
    knowledge: [
      "True knowledge exists in knowing that you know nothing.",
      "Knowledge is the food of the soul.",
      "To know, is to know that you know nothing. That is the meaning of true knowledge.",
    ],
    wisdom: [
      "The only true wisdom is in knowing you know nothing.",
      "Wisdom begins in wonder.",
      "The beginning of wisdom is the definition of terms.",
    ],
    ethics: [
      "Ethics is the aesthetics of the future.",
      "Virtue is knowledge.",
      "The greatest way to live with honor in this world is to be what we pretend to be.",
    ],
  };

  // Déterminer si le message contient des mots clés
  let response = "";
  Object.keys(keywords).some((key) => {
    if (userMessage.toLowerCase().includes(key)) {
      const responses = keywords[key as keyof typeof keywords];
      response = responses[Math.floor(Math.random() * responses.length)];
      return true;
    }
    return false;
  });

  // Si aucun mot clé n'est trouvé, donner une réponse générique
  if (!response) {
    const genericResponses = [
      `As ${philosopherName}, I would encourage you to question that assumption.`,
      `That is an interesting perspective. In my time in ${philosopherEra}, we might have viewed it differently.`,
      `Let me ponder this. The question itself may reveal more than any answer I could provide.`,
      `The pursuit of truth requires us to examine this more deeply.`,
      `I find your inquiry thought-provoking. Let us explore it together.`,
    ];
    response =
      genericResponses[Math.floor(Math.random() * genericResponses.length)];
  }

  return response;
}
