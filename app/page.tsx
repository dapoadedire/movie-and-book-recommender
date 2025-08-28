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
  const [error, setError] = useState<string | null>(null);

  const handleSubmit = async (e: React.FormEvent, type: "book" | "movie") => {
    e.preventDefault();
    setLoading(true);
    setError(null);

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
        setError(data.error || "Failed to get recommendations");
      }
    } catch (error) {
      setError("Network error. Please try again.");
      console.error("Error:", error);
    } finally {
      setLoading(false);
    }
  };

  const clearRecommendations = () => {
    setRecommendations([]);
    setError(null);
  };

  const handleTabChange = (value: string) => {
    setActiveTab(value);
    setRecommendations([]);
    setError(null);
  };

  const RecommendationCard = ({ rec }: { rec: Recommendation }) => {
    if (rec.book) {
      const { name, author, genre, summary, link } = rec.book;
      return (
        <Card className="w-full hover:shadow-lg transition-shadow duration-300">
          <CardHeader className="pb-3">
            <div className="flex items-start justify-between">
              <div className="flex-1">
                <CardTitle className="text-lg font-semibold text-gray-900 mb-1">
                  {name}
                </CardTitle>
                <CardDescription className="text-sm text-gray-600">
                  by {author}
                </CardDescription>
              </div>
              <span className="text-xs bg-blue-100 text-blue-800 px-2 py-1 rounded-full font-medium">
                {genre}
              </span>
            </div>
          </CardHeader>
          <CardContent className="pt-0">
            <p className="text-sm text-gray-700 leading-relaxed">{summary}</p>
          </CardContent>
          <CardFooter className="pt-4">
            <Button
              variant="outline"
              size="sm"
              asChild
              className="w-full hover:bg-blue-50"
            >
              <a
                href={link}
                target="_blank"
                rel="noopener noreferrer"
                className="flex items-center justify-center gap-2"
              >
                📖 View Book
              </a>
            </Button>
          </CardFooter>
        </Card>
      );
    }

    if (rec.movie) {
      const { title, director, genre, summary, link } = rec.movie;
      return (
        <Card className="w-full hover:shadow-lg transition-shadow duration-300">
          <CardHeader className="pb-3">
            <div className="flex items-start justify-between">
              <div className="flex-1">
                <CardTitle className="text-lg font-semibold text-gray-900 mb-1">
                  {title}
                </CardTitle>
                <CardDescription className="text-sm text-gray-600">
                  directed by {director}
                </CardDescription>
              </div>
              <span className="text-xs bg-red-100 text-red-800 px-2 py-1 rounded-full font-medium">
                {genre}
              </span>
            </div>
          </CardHeader>
          <CardContent className="pt-0">
            <p className="text-sm text-gray-700 leading-relaxed">{summary}</p>
          </CardContent>
          <CardFooter className="pt-4">
            <Button
              variant="outline"
              size="sm"
              asChild
              className="w-full hover:bg-red-50"
            >
              <a
                href={link}
                target="_blank"
                rel="noopener noreferrer"
                className="flex items-center justify-center gap-2"
              >
                🎬 View Movie
              </a>
            </Button>
          </CardFooter>
        </Card>
      );
    }

    return null;
  };

  return (
    <div className="min-h-screen bg-gradient-to-br from-blue-50 via-white to-red-50">
      <div className="container mx-auto py-8 px-4">
        <div className="max-w-6xl mx-auto">
          <div className="text-center mb-8">
            <h1 className="text-4xl font-bold bg-gradient-to-r from-blue-600 to-red-600 bg-clip-text text-transparent mb-2">
              Movie & Book Recommender
            </h1>
            <p className="text-gray-600 text-lg">
              Discover your next favorite book or movie based on what you love
            </p>
          </div>

          <Tabs
            value={activeTab}
            onValueChange={handleTabChange}
            className="w-full"
          >
            <div className="flex justify-center mb-6">
              <TabsList className="grid w-full max-w-md grid-cols-2 bg-white shadow-lg border-0 p-1 rounded-xl">
                <TabsTrigger
                  value="books"
                  className="rounded-lg data-[state=active]:bg-blue-500 data-[state=active]:text-white transition-all duration-200 flex items-center gap-2"
                >
                  📚 Books
                </TabsTrigger>
                <TabsTrigger
                  value="movies"
                  className="rounded-lg data-[state=active]:bg-red-500 data-[state=active]:text-white transition-all duration-200 flex items-center gap-2"
                >
                  🎬 Movies
                </TabsTrigger>
              </TabsList>
            </div>

            <TabsContent value="books" className="space-y-6">
              <div className="flex justify-center">
                <Card className="w-full max-w-lg shadow-xl border-0 bg-white/80 backdrop-blur-sm">
                  <CardHeader className="text-center pb-4">
                    <CardTitle className="text-2xl text-blue-700">
                      📚 Book Recommendations
                    </CardTitle>
                    <CardDescription className="text-gray-600">
                      Tell us about your favorite books and we'll suggest
                      similar ones
                    </CardDescription>
                  </CardHeader>
                  <CardContent>
                    <form
                      onSubmit={(e) => handleSubmit(e, "book")}
                      className="space-y-4"
                    >
                      <div className="space-y-2">
                        <Label
                          htmlFor="books-favorites"
                          className="text-sm font-medium"
                        >
                          Your favorite books
                        </Label>
                        <Input
                          id="books-favorites"
                          type="text"
                          placeholder="e.g., The Great Gatsby, 1984, To Kill a Mockingbird"
                          value={favorites}
                          onChange={(e) => setFavorites(e.target.value)}
                          required
                          className="transition-all duration-200 focus:ring-2 focus:ring-blue-500"
                        />
                        <p className="text-xs text-gray-500">
                          Separate multiple books with commas
                        </p>
                      </div>
                      <div className="space-y-2">
                        <Label
                          htmlFor="books-count"
                          className="text-sm font-medium"
                        >
                          Number of recommendations
                        </Label>
                        <Input
                          id="books-count"
                          type="number"
                          min="1"
                          max="10"
                          value={count}
                          onChange={(e) => setCount(e.target.value)}
                          required
                          className="transition-all duration-200 focus:ring-2 focus:ring-blue-500"
                        />
                      </div>
                      <Button
                        type="submit"
                        className="w-full bg-blue-600 hover:bg-blue-700 transition-colors duration-200"
                        disabled={loading}
                      >
                        {loading ? (
                          <div className="flex items-center gap-2">
                            <div className="w-4 h-4 border-2 border-white border-t-transparent rounded-full animate-spin"></div>
                            Generating...
                          </div>
                        ) : (
                          "Get Book Recommendations"
                        )}
                      </Button>
                    </form>
                  </CardContent>
                </Card>
              </div>

              {error && (
                <div className="flex justify-center">
                  <div className="bg-red-50 border border-red-200 text-red-700 px-4 py-3 rounded-lg max-w-lg">
                    <div className="flex items-center gap-2">
                      <span className="text-red-500">⚠️</span>
                      <p className="text-sm">{error}</p>
                    </div>
                  </div>
                </div>
              )}

              {recommendations.length > 0 && (
                <div className="space-y-6">
                  <div className="text-center">
                    <h2 className="text-2xl font-semibold text-blue-700 mb-2">
                      Your Book Recommendations
                    </h2>
                    <p className="text-gray-600 mb-4">
                      Based on your favorite books
                    </p>
                    <Button
                      variant="outline"
                      onClick={clearRecommendations}
                      className="hover:bg-blue-50"
                    >
                      Clear Results
                    </Button>
                  </div>
                  <div className="grid gap-6 md:grid-cols-2 lg:grid-cols-3">
                    {recommendations.map((rec, index) => (
                      <RecommendationCard key={index} rec={rec} />
                    ))}
                  </div>
                </div>
              )}
            </TabsContent>

            <TabsContent value="movies" className="space-y-6">
              <div className="flex justify-center">
                <Card className="w-full max-w-lg shadow-xl border-0 bg-white/80 backdrop-blur-sm">
                  <CardHeader className="text-center pb-4">
                    <CardTitle className="text-2xl text-red-700">
                      🎬 Movie Recommendations
                    </CardTitle>
                    <CardDescription className="text-gray-600">
                      Tell us about your favorite movies and we'll suggest
                      similar ones
                    </CardDescription>
                  </CardHeader>
                  <CardContent>
                    <form
                      onSubmit={(e) => handleSubmit(e, "movie")}
                      className="space-y-4"
                    >
                      <div className="space-y-2">
                        <Label
                          htmlFor="movies-favorites"
                          className="text-sm font-medium"
                        >
                          Your favorite movies
                        </Label>
                        <Input
                          id="movies-favorites"
                          type="text"
                          placeholder="e.g., Inception, The Matrix, Interstellar"
                          value={favorites}
                          onChange={(e) => setFavorites(e.target.value)}
                          required
                          className="transition-all duration-200 focus:ring-2 focus:ring-red-500"
                        />
                        <p className="text-xs text-gray-500">
                          Separate multiple movies with commas
                        </p>
                      </div>
                      <div className="space-y-2">
                        <Label
                          htmlFor="movies-count"
                          className="text-sm font-medium"
                        >
                          Number of recommendations
                        </Label>
                        <Input
                          id="movies-count"
                          type="number"
                          min="1"
                          max="10"
                          value={count}
                          onChange={(e) => setCount(e.target.value)}
                          required
                          className="transition-all duration-200 focus:ring-2 focus:ring-red-500"
                        />
                      </div>
                      <Button
                        type="submit"
                        className="w-full bg-red-600 hover:bg-red-700 transition-colors duration-200"
                        disabled={loading}
                      >
                        {loading ? (
                          <div className="flex items-center gap-2">
                            <div className="w-4 h-4 border-2 border-white border-t-transparent rounded-full animate-spin"></div>
                            Generating...
                          </div>
                        ) : (
                          "Get Movie Recommendations"
                        )}
                      </Button>
                    </form>
                  </CardContent>
                </Card>
              </div>

              {error && (
                <div className="flex justify-center">
                  <div className="bg-red-50 border border-red-200 text-red-700 px-4 py-3 rounded-lg max-w-lg">
                    <div className="flex items-center gap-2">
                      <span className="text-red-500">⚠️</span>
                      <p className="text-sm">{error}</p>
                    </div>
                  </div>
                </div>
              )}

              {recommendations.length > 0 && (
                <div className="space-y-6">
                  <div className="text-center">
                    <h2 className="text-2xl font-semibold text-red-700 mb-2">
                      Your Movie Recommendations
                    </h2>
                    <p className="text-gray-600 mb-4">
                      Based on your favorite movies
                    </p>
                    <Button
                      variant="outline"
                      onClick={clearRecommendations}
                      className="hover:bg-red-50"
                    >
                      Clear Results
                    </Button>
                  </div>
                  <div className="grid gap-6 md:grid-cols-2 lg:grid-cols-3">
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
    </div>
  );
}
