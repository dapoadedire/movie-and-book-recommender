"use client";
import { Tabs, TabsContent, TabsList, TabsTrigger } from "@/components/ui/tabs";
import { Button } from "@/components/ui/button";
import {
  Card,
  CardContent,
  CardDescription,
  CardFooter,
  CardHeader,
  CardTitle,
} from "@/components/ui/card";
import { Input } from "@/components/ui/input";
import { Label } from "@/components/ui/label";
import { useState } from "react";


interface BookRecommendation {
  name: string;
  author: string;
  genre: string;
  summary: string;
  link: string;
}

interface MovieRecommendation {
  title: string;
  director: string;
  genre: string;
  summary: string;
  link: string;
}

interface Recommendation {
  book?: BookRecommendation;
  movie?: MovieRecommendation;
}

export default function New() {
  const [favorites, setFavorites] = useState("");
  const [count, setCount] = useState("3");
  const [recommendations, setRecommendations] = useState<Recommendation[]>([]);
  const [loading, setLoading] = useState(false);
  const [activeTab, setActiveTab] = useState("books");

  const handleSubmit = async (e: React.FormEvent, type: "book" | "movie") => {
    e.preventDefault();
    setLoading(true);

    try {
      const response = await fetch("/api/recommendations", {
        method: "POST",
        headers: {
          "Content-Type": "application/json",
        },
        body: JSON.stringify({
          favorites: favorites
            .split(",")
            .map((f) => f.trim())
            .filter((f) => f),
          count: parseInt(count),
          type,
        }),
      });

      const data = await response.json();
      if (response.ok) {
        setRecommendations(data.recommendations);
      } else {
        console.error("Error:", data.error);
      }
    } catch (error) {
      console.error("Error:", error);
    } finally {
      setLoading(false);
    }
  };

  const RecommendationCard = ({ rec }: { rec: Recommendation }) => {
    if (rec.book) {
      const { name, author, genre, summary, link } = rec.book;
      return (
        <Card className="w-full">
          <CardHeader>
            <CardTitle className="text-lg">{name}</CardTitle>
            <CardDescription>by {author}</CardDescription>
          </CardHeader>
          <CardContent>
            <p className="text-sm text-muted-foreground mb-2">
              <strong>Genre:</strong> {genre}
            </p>
            <p className="text-sm">{summary}</p>
          </CardContent>
          <CardFooter>
            <Button variant="outline" size="sm" asChild>
              <a href={link} target="_blank" rel="noopener noreferrer">
                View Book
              </a>
            </Button>
          </CardFooter>
        </Card>
      );
    }

    if (rec.movie) {
      const { title, director, genre, summary, link } = rec.movie;
      return (
        <Card className="w-full">
          <CardHeader>
            <CardTitle className="text-lg">{title}</CardTitle>
            <CardDescription>directed by {director}</CardDescription>
          </CardHeader>
          <CardContent>
            <p className="text-sm text-muted-foreground mb-2">
              <strong>Genre:</strong> {genre}
            </p>
            <p className="text-sm">{summary}</p>
          </CardContent>
          <CardFooter>
            <Button variant="outline" size="sm" asChild>
              <a href={link} target="_blank" rel="noopener noreferrer">
                View Movie
              </a>
            </Button>
          </CardFooter>
        </Card>
      );
    }

    return null;
  };

  return (
    <div className="container mx-auto py-8 px-4">
      <div className="max-w-4xl mx-auto">
        <h1 className="text-3xl font-bold text-center mb-8">
          Movie & Book Recommender
        </h1>

        <Tabs value={activeTab} onValueChange={setActiveTab} className="w-full">
          <TabsList className="grid w-full grid-cols-2">
            <TabsTrigger value="books">📚 Book Recommender</TabsTrigger>
            <TabsTrigger value="movies">🎬 Movie Recommender</TabsTrigger>
          </TabsList>

          <TabsContent value="books" className="space-y-6">
            <Card className="w-full max-w-md mx-auto">
              <CardHeader>
                <CardTitle>Get Book Recommendations</CardTitle>
                <CardDescription>
                  Enter your favorite books and get personalized recommendations
                </CardDescription>
              </CardHeader>
              <CardContent>
                <form onSubmit={(e) => handleSubmit(e, "book")}>
                  <div className="flex flex-col gap-4">
                    <div className="grid gap-2">
                      <Label htmlFor="books-favorites">
                        Your favorite books (comma separated)
                      </Label>
                      <Input
                        id="books-favorites"
                        type="text"
                        placeholder="The Great Gatsby, 1984, To Kill a Mockingbird"
                        value={favorites}
                        onChange={(e) => setFavorites(e.target.value)}
                        required
                      />
                    </div>
                    <div className="grid gap-2">
                      <Label htmlFor="books-count">
                        Number of recommendations (1-10)
                      </Label>
                      <Input
                        id="books-count"
                        type="number"
                        min="1"
                        max="10"
                        value={count}
                        onChange={(e) => setCount(e.target.value)}
                        required
                      />
                    </div>
                  </div>
                  <CardFooter className="px-0 pt-4">
                    <Button type="submit" className="w-full" disabled={loading}>
                      {loading ? "Generating..." : "Generate Recommendations"}
                    </Button>
                  </CardFooter>
                </form>
              </CardContent>
            </Card>

            {recommendations.length > 0 && (
              <div className="space-y-4">
                <h2 className="text-2xl font-semibold text-center">
                  Your Book Recommendations
                </h2>
                <div className="grid gap-4 md:grid-cols-2 lg:grid-cols-3">
                  {recommendations.map((rec, index) => (
                    <RecommendationCard key={index} rec={rec} />
                  ))}
                </div>
              </div>
            )}
          </TabsContent>

          <TabsContent value="movies" className="space-y-6">
            <Card className="w-full max-w-md mx-auto">
              <CardHeader>
                <CardTitle>Get Movie Recommendations</CardTitle>
                <CardDescription>
                  Enter your favorite movies and get personalized
                  recommendations
                </CardDescription>
              </CardHeader>
              <CardContent>
                <form onSubmit={(e) => handleSubmit(e, "movie")}>
                  <div className="flex flex-col gap-4">
                    <div className="grid gap-2">
                      <Label htmlFor="movies-favorites">
                        Your favorite movies (comma separated)
                      </Label>
                      <Input
                        id="movies-favorites"
                        type="text"
                        placeholder="Inception, The Matrix, Interstellar"
                        value={favorites}
                        onChange={(e) => setFavorites(e.target.value)}
                        required
                      />
                    </div>
                    <div className="grid gap-2">
                      <Label htmlFor="movies-count">
                        Number of recommendations (1-10)
                      </Label>
                      <Input
                        id="movies-count"
                        type="number"
                        min="1"
                        max="10"
                        value={count}
                        onChange={(e) => setCount(e.target.value)}
                        required
                      />
                    </div>
                  </div>
                  <CardFooter className="px-0 pt-4">
                    <Button type="submit" className="w-full" disabled={loading}>
                      {loading ? "Generating..." : "Generate Recommendations"}
                    </Button>
                  </CardFooter>
                </form>
              </CardContent>
            </Card>

            {recommendations.length > 0 && (
              <div className="space-y-4">
                <h2 className="text-2xl font-semibold text-center">
                  Your Movie Recommendations
                </h2>
                <div className="grid gap-4 md:grid-cols-2 lg:grid-cols-3">
                  {recommendations.map((rec, index) => (
                    <RecommendationCard key={index} rec={rec} />
                  ))}
                </div>
              </div>
            )}
          </TabsContent>
        </Tabs>
      </div>
    </div>
  );
}
