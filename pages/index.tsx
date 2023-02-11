import Head from "next/head";
import { useState } from "react";
import { Toaster, toast } from "react-hot-toast";
import { AnimatePresence, motion } from "framer-motion";
import ResizablePanel from "../components/ResizablePanel";

import Header from "../components/Header";
import Footer from "../components/Footer";

export default function Home() {
  const [loading, setLoading] = useState(false);
  const [recommendationResult, setRecommendationResult] = useState("");
  const [query, setQuery] = useState("");
  const [recommendationCount, setRecommendationCount] = useState("2");
  const [recommendationType, setRecommendationType] = useState("movie");

  const moviePrompt = `Generate a list of up to ${recommendationCount} recommended movies that a user might enjoy, based on their interest in ${query}. Label each movie with a sequential number, such as "1.", "2.", and so on.
Include a brief description of each movie and the year it was released. The format should be as follows:
[#. Movie Title (Release Year): Description]`;

  const bookPrompt = `Generate a list of up to ${recommendationCount} recommended books that a user might enjoy, based on their interest in ${query}. Label each book with a sequential number, such as "1.", "2.", and so on.
Include a brief description of each book and the author. The format should be as follows:
[#. Book Title by Author: Description]`;

  const prompt = recommendationType == "movie" ? moviePrompt : bookPrompt;

  const generateRecommendations = async (e: any) => {
    e.preventDefault();

    if (!query) {
      toast.error("Input your favourite movie or book.");
      return;
    }

    setRecommendationResult("");
    setLoading(true);

    const response = await fetch("/api/generate", {
      method: "POST",
      headers: {
        "Content-Type": "application/json",
      },
      body: JSON.stringify({
        prompt,
      }),
    });

    if (!response.ok) {
      setLoading(false);
      console.error(response.statusText);
      return;
    }

    const data = response.body;

    if (!data) {
      return;
    }

    const reader = data.getReader();

    const decoder = new TextDecoder();
    let done = false;

    while (!done) {
      const { value, done: doneReading } = await reader.read();
      done = doneReading;
      const chunkValue = decoder.decode(value);
      setRecommendationResult((prev) => prev + chunkValue);
    }

    setLoading(false);
  };

  const recommendationResultArray = recommendationResult
    .split("\n")
    .filter((recommendation) => recommendation.length > 10);

  return (
    <>
      <div className="m-0 flex min-h-screen flex-col items-center">
        <Head>
          <title>Movie & Book Recommender </title>
          <meta
            name="description"
            content="Movie/Book Recommender: Find Your Next Favourite Movie or Book: Get Your Recommendations Now"
          />
          <meta name="viewport" content="width=device-width, initial-scale=1" />
          <link rel="icon" href="/favicon.ico" />
        </Head>

        <Header />

        <main
          className="mx-auto mt-5 flex w-full max-w-7xl  flex-1 flex-col
        items-center px-2 text-center sm:px-6 lg:px-8
        "
        >
          <h1
            className="mb-4 max-w-2xl text-3xl font-bold text-gray-900 dark:text-white
          sm:text-5xl
          "
          >
            Movie/Book Recommender
          </h1>

          <h4 className="max-w-2xl text-xl text-gray-700 dark:text-gray-300">
            Find Your Next Favourite Movie or Book: Get Your Recommendations Now
          </h4>

          <form
            onSubmit={(e) => generateRecommendations(e)}
            className="mt-10 flex w-4/5 flex-col items-center gap-3"
          >
            <div className=" flex w-full flex-col sm:max-w-xl lg:max-w-2xl">
              <label
                htmlFor="search"
                className="
              mb-2
              self-start font-medium
              
              text-gray-900
              dark:text-gray-200 "
              >
                Favourite Movie or Book.
              </label>
              <input
                onChange={(e) => setQuery(e.target.value)}
                type="text"
                className="
              
              mb-5 w-full
          max-w-md  rounded-xl border
            border-gray-300 bg-white px-5 py-3 text-gray-700 shadow-sm focus:outline-none dark:border-gray-400 dark:bg-black dark:text-white sm:max-w-xl sm:text-sm lg:max-w-2xl
             
            "
                placeholder="
                What's your favourite movie or book?
                "
                id="search-box"
              />

              <label
                htmlFor="recommendation-type"
                className="
              mb-2
              self-start font-medium
              text-gray-900
              
              dark:text-gray-200 "
              >
                Select a recommender.
              </label>
              <select
                className="
              mb-4
              w-full max-w-md
          cursor-pointer  rounded-xl  border
            border-gray-300 bg-white px-5 py-3 text-gray-700 shadow-sm focus:outline-none dark:border-gray-400 dark:bg-black dark:text-white sm:max-w-xl sm:text-sm lg:max-w-2xl
             
            "
                onChange={(e) => setRecommendationType(e.target.value)}
              >
                <option value="movie">Movie Recommender</option>
                <option value="book">Book Recommender</option>
              </select>

              <label
                htmlFor="recommendation-count"
                className="
              mb-2
              self-start font-medium
             text-gray-900
              dark:text-gray-200 "
              >
                Number of Recommendations
              </label>

              <select
                className="
              

                
              mb-4
              w-full max-w-md
          cursor-pointer rounded-xl border 
            border-gray-300 bg-white px-5 py-3 text-gray-700 shadow-sm focus:outline-none dark:border-gray-400 dark:bg-black dark:text-white sm:max-w-xl sm:text-sm lg:max-w-2xl
            
            "
                onChange={(e) => setRecommendationCount(e.target.value)}
              >
                <option value="2">2</option>

                <option value="4">4</option>
                <option value="5">5</option>
                <option value="6">6</option>

                <option value="8">8</option>

                <option value="10">10</option>
              </select>
            </div>

            <button
              className="
          w-full max-w-md   items-center justify-center gap-10
          rounded-xl  border 
          border-gray-300 bg-black px-5 py-2 text-white shadow-sm focus:outline-none dark:border-gray-700 dark:bg-white dark:text-black sm:max-w-xl sm:text-sm lg:max-w-2xl
          
        "
              disabled={loading}
            >
              <span
                className="text-center text-lg font-bold text-white
            dark:text-black
            "
              >
                {loading ? (
                  <>
                    <span className="flex items-center justify-center gap-3">
                      <span>Loading...</span>
                      <svg
                        className="-ml-1 mr-3 h-6 w-6 animate-spin text-white"
                        xmlns="http://www.w3.org/2000/svg"
                        fill="none"
                        viewBox="0 0 24 24"
                      >
                        <circle
                          cx="12"
                          cy="12"
                          r="10"
                          stroke="currentColor"
                          stroke-width="4"
                        ></circle>
                        <path
                          className="opacity-75"
                          fill="black"
                          d="M4 12a8 8 0 018-8V0C5.373 0 0 5.373 0 12h4zm2 5.291A7.962 7.962 0 014 12H0c0 3.042 1.135 5.824 3 7.938l3-2.647z"
                        ></path>
                      </svg>
                    </span>
                  </>
                ) : (
                  "Generate →"
                )}
              </span>
            </button>
          </form>

          <div
            className="sm:space-x-4sm:flex-row mt-8 flex w-1/2 flex-col justify-center space-y-2 sm:flex-row sm:space-y-0"
            style={{
              display: "flex",
              flexDirection: "row",
              flexWrap: "wrap",
              alignItems: "center",
              width: "100%",
              gap: "1rem",
            }}
          ></div>
          <Toaster
            position="bottom-center"
            reverseOrder={false}
            toastOptions={{ duration: 3000 }}
          />
          <hr className="h-px border bg-gray-700 dark:bg-gray-700" />
          <ResizablePanel>
            <AnimatePresence mode="wait">
              <motion.div className="my-5 space-y-4">
                {recommendationResult && (
                  <>
                    <h2
                      className="mx-auto mb-10 max-w-2xl px-4
                    text-center text-sm text-gray-600 dark:text-gray-400 sm:px-6 sm:text-xl lg:px-8
                    lg:text-2xl
                    "
                    >
                      Your{" "}
                      <span>
                        {recommendationType === "book" ? "book " : "movie "}
                        recommendations.
                      </span>
                      (Click on any{" "}
                      <span>
                        {recommendationType === "book" ? "book " : "movie "}
                      </span>
                      to copy its title. )
                    </h2>

                    <div className=" mx-3 flex max-w-xl flex-col items-center justify-center space-y-3 sm:grid sm:max-w-none sm:grid-cols-2 sm:gap-4 sm:space-y-0 lg:max-w-full lg:grid-cols-3">
                      {recommendationResultArray.map((result, index) => {
                        return (
                          <div
                            className="cursor-copy rounded-xl  border bg-white p-3 shadow-md transition hover:bg-gray-100 dark:bg-gray-200 dark:text-gray-100  "
                            onClick={() => {
                              navigator.clipboard.writeText(
                                result
                                  .slice(0, result.lastIndexOf(":"))
                                  .replace(/^[0-9]+\. /g, "")
                                  .trim()
                              );
                              toast.success("Copied to clipboard");
                            }}
                            key={index}
                          >
                            <h3 className="mb-2 text-left font-semibold dark:text-gray-800">
                              {result
                                .slice(0, result.lastIndexOf(":"))
                                .replace(/^[0-9]+\. /g, "")
                                .trim()}
                            </h3>
                            <p className="text-left dark:text-gray-800">
                              {result
                                .slice(result.lastIndexOf(":") + 1)
                                .replace(/^"|"$|[0-9]+. /g, "")
                                .trim()}
                            </p>
                          </div>
                        );
                      })}
                    </div>
                  </>
                )}
              </motion.div>
            </AnimatePresence>
          </ResizablePanel>
        </main>
        <Footer />
      </div>
    </>
  );
}
