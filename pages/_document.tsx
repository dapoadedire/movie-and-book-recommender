/* eslint-disable @next/next/no-sync-scripts */
import { Html, Head, Main, NextScript } from "next/document";

export default function Document() {
  return (
    <Html lang="en">
      <Head>
        <meta charSet="utf-8" />

        <script data-name="BMC-Widget" data-cfasync="false" src="https://cdnjs.buymeacoffee.com/1.0.0/widget.prod.min.js" data-id="dapoadedire" data-description="Support me on Buy me a coffee!" data-message="" data-color="#FFFFFF" data-position="Right" data-x_margin="18" data-y_margin="18"></script>
        <link rel="preconnect" href="https://fonts.googleapis.com" />
        <link
          rel="preconnect"
          href="https://fonts.gstatic.com"
          crossOrigin="anonymous"
        />
        <link
          href="https://fonts.googleapis.com/css2?family=Open+Sans&display=swap"
          rel="stylesheet"
        />
        <link rel="icon" href="/favicon.ico" />
        <meta
          name="description"
          content="Movie/Book Recommender
Find Your Next Favourite Movie or Book: Get Your Recommendations Now
Favourite Movie or Book"
        />

        {/* <!-- Google / Search Engine Tags --> */}
        <meta
          itemProp="name"
          content="Movie/Book Recommender
"
        />
        <meta
          itemProp="description"
          content="Movie/Book Recommender
Find Your Next Favourite Movie or Book: Get Your Recommendations Now
Favourite Movie or Book"
        />
        <meta
          property="og:site_name"
          content="https://movie-and-book-recommender.vercel.app/"
        />
        <meta
          itemProp="image"
          content="https://movie-and-book-recommender.vercel.app/og-image.png"
        />

        {/* <!-- Facebook Meta Tags --> */}
        <meta
          property="og:url"
          content="https://movie-and-book-recommender.vercel.app/"
        />
        <meta property="og:type" content="website" />
        <meta
          property="og:title"
          content="Movie/Book Recommender
"
        />
        <meta
          property="og:description"
          content="Movie/Book Recommender
Find Your Next Favourite Movie or Book: Get Your Recommendations Now
Favourite Movie or Book"
        />
        <meta
          property="og:image"
          content="https://movie-and-book-recommender.vercel.app/og-image.png"
        />

        {/* <!-- Twitter Meta Tags --> */}
        <meta name="twitter:card" content="summary_large_image" />
        <meta
          name="twitter:title"
          content="Movie/Book Recommender
"
        />
        <meta
          name="twitter:description"
          content="Movie/Book Recommender
Find Your Next Favourite Movie or Book: Get Your Recommendations Now
Favourite Movie or Book"
        />
        <meta
          property="og:image"
          content="https://movie-and-book-recommender.vercel.app/og-image.png"
        />
        <meta
          name="twitter:image"
          content="https://movie-and-book-recommender.vercel.app/og-image.png"
        />
      </Head>
      <body>
        <Main />
        <NextScript />
      </body>
    </Html>
  );
}
