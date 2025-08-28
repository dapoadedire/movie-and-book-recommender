// app/api/recommendations/route.ts (for App Router)
// OR pages/api/recommendations.ts (for Pages Router)

import { openai } from "@ai-sdk/openai";
import { generateObject } from "ai";
import { z } from "zod";
import { NextRequest, NextResponse } from "next/server";

// Response schemas - individual items
const bookSchema = z.object({
  name: z.string(),
  author: z.string(),
  genre: z.string(),
  summary: z.string(),
  link: z.string(),
});

const movieSchema = z.object({
  title: z.string(),
  director: z.string(),
  genre: z.string(),
  summary: z.string(),
  link: z.string(),
});

// Single recommendation schemas (wrapped in object)
const singleBookRecommendationSchema = z.object({
  book: bookSchema,
});

const singleMovieRecommendationSchema = z.object({
  movie: movieSchema,
});

// Multiple recommendations schemas (wrapped in object with array)
const multipleBooksRecommendationSchema = z.object({
  books: z.array(bookSchema),
});

const multipleMoviesRecommendationSchema = z.object({
  movies: z.array(movieSchema),
});

// Request body validation schema
const requestSchema = z.object({
  favorites: z.array(z.string()),
  count: z.coerce.number().int().min(1).max(10),
  type: z.enum(["movie", "book"]),
});

export async function POST(req: NextRequest) {
  try {
    // Parse and validate request body
    const body = await req.json();
    const { favorites, count, type } = requestSchema.parse(body);

    // Check for API key
    if (!process.env.OPENAI_API_KEY) {
      return NextResponse.json(
        { error: "OpenAI API key is not configured" },
        { status: 500 }
      );
    }

    // Generate the prompt based on user input
    const prompt = `Generate ${count} ${type} recommendation${
      count > 1 ? "s" : ""
    } based on the following favorite ${type}${
      favorites.length > 1 ? "s" : ""
    }: ${favorites.join(", ")}.

For each recommendation, include:
- ${
      type === "book"
        ? "name, author, genre, summary"
        : "title, director, genre, summary"
    }
- link: A valid URL to the ${type} on ${
      type === "book" ? "Goodreads or Amazon" : "IMDb or TMDB"
    }

Please provide detailed and accurate information for each recommendation.`;

    let recommendations;

    if (type === "book") {
      if (count === 1) {
        const { object: bookRec } = await generateObject({
          model: openai("gpt-4o"),
          schema: singleBookRecommendationSchema,
          prompt,
        });
        recommendations = [{ book: bookRec.book }];
      } else {
        const { object: bookRecs } = await generateObject({
          model: openai("gpt-4o"),
          schema: multipleBooksRecommendationSchema,
          prompt,
        });
        recommendations = bookRecs.books.map((book) => ({ book }));
      }
    } else {
      if (count === 1) {
        const { object: movieRec } = await generateObject({
          model: openai("gpt-4o"),
          schema: singleMovieRecommendationSchema,
          prompt,
        });
        recommendations = [{ movie: movieRec.movie }];
      } else {
        const { object: movieRecs } = await generateObject({
          model: openai("gpt-4o"),
          schema: multipleMoviesRecommendationSchema,
          prompt,
        });
        recommendations = movieRecs.movies.map((movie) => ({ movie }));
      }
    }

    return NextResponse.json({ recommendations });
  } catch (error) {
    console.error("Error generating recommendations:", error);

    if (error instanceof z.ZodError) {
      return NextResponse.json(
        { error: "Invalid request data", details: error.message },
        { status: 400 }
      );
    }

    return NextResponse.json(
      { error: "Failed to generate recommendations" },
      { status: 500 }
    );
  }
}
