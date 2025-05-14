import { NextResponse } from "next/server";

import { PhilosophicalEra } from "@/prisma/generated/prisma";
import { prisma } from "@/src/lib/prisma";
import {
  BadRequestError,
  ConflictError,
  handleApiError,
} from "@/src/utils/api/handle-api-error";
import { slugify } from "@/src/utils/string/slugify";
import { z } from "zod";

const PhilosopherSchema = z.object({
  imageUrl: z
    .string()
    .url("Image URL must be a valid URL")
    .min(1, "Image URL is required")
    .trim()
    .refine(
      (url) => url.startsWith("https://"),
      "Image URL must use HTTPS for security",
    ),
  name: z
    .string()
    .min(2, "Name must be at least 2 characters")
    .max(100, "Name cannot exceed 100 characters")
    .trim()
    .refine(
      (name) => /^[A-Za-z\s\-.']+$/.test(name),
      "Name can only contain letters, spaces, hyphens, apostrophes and periods",
    ),
  description: z
    .string()
    .min(50, "Description must be at least 50 characters")
    .max(2000, "Description cannot exceed 2000 characters")
    .trim(),
  era: z.nativeEnum(PhilosophicalEra, {
    errorMap: () => ({ message: "Era is required" }),
  }),
  systemPrompt: z
    .string()
    .min(50, "System prompt must be at least 50 characters")
    .max(2000, "System prompt cannot exceed 2000 characters")
    .trim(),
});

export async function POST(request: Request) {
  try {
    const formData = await request.formData();

    const philosopherBody = PhilosopherSchema.parse({
      imageUrl: formData.get("imageUrl"),
      name: formData.get("name"),
      description: formData.get("description"),
      era: formData.get("era"),
      systemPrompt: formData.get("systemPrompt"),
    });

    const slug = slugify(philosopherBody.name);

    const philosopherExists = await prisma.philosopher.findUnique({
      where: {
        slug,
        name: philosopherBody.name,
      },
      select: {
        id: true,
      },
    });

    if (philosopherExists) {
      throw new ConflictError("Philosopher already exists");
    }

    const philosopher = await prisma.philosopher.create({
      data: {
        imageUrl: philosopherBody.imageUrl,
        name: philosopherBody.name,
        slug,
        systemPrompt: philosopherBody.systemPrompt,
        description: philosopherBody.description,
        era: philosopherBody.era,
      },
    });

    if (!philosopher) {
      throw new BadRequestError("Failed to create philosopher");
    }

    return NextResponse.json(philosopher);
  } catch (error: unknown) {
    return handleApiError(error);
  }
}
