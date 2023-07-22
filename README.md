## [Movie/Book Recommender](https://movie-and-book-recommender.vercel.app/)

This simple tool uses [OpenAI GPT-3 API](https://openai.com/api/) to generate movie/book recommendations based on your favorite movie/book.

[![Movie/Book Recommender](./public/screenshot-1.png)](https://movie-and-book-recommender.vercel.app/)
[![Movie/Book Recommender](./public/screenshot-2.png)](https://movie-and-book-recommender.vercel.app/)

## How to use

1. Visit [https://movie-and-book-recommender.vercel.app/](https://movie-and-book-recommender.vercel.app/)
2. In the Favourite Movie or Book input field, enter your favourite book.
3. Select the type of recommendation you want (movie or book) from the Select a Recommender dropdown menu.
4. Choose the number of recommendations you want from the Number of Recommendations dropdown menu.
5. Click the Generate button to get your recommendations.
6. Click on any of the recommendations to copy the title.

## How it works

The [OpenAI GPT-3 API](https://openai.com/api/) (text-davinci-003) and [Vercel Edge streaming](https://vercel.com/features/edge-functions) features are used in this application. Based on the user's input, it creates a prompt, sends it to the GPT-3 API using a Vercel Edge function, and streams the response back to the application.

## Running Project Locally

1. Fork the repo
2. Clone the repo
3. After cloning the repo, go to [OpenAI](https://beta.openai.com/account/api-keys) to make an account and generate your API key
4. Rename the `.env.example` file on the root of the project to `.env`, then paste your API key in the `.env` file
5. Run `npm install` to install all the dependencies.
6. Run `npm run dev` to start the project.
7. Go to [http://localhost:3000](http://localhost:3000) to see the project running.

## Contributing

If you want to contribute to this project, please read the [contributing guide](./CONTRIBUTING.md). If you have any ideas or suggestions, feel free to open an issue or a pull request.

If you like this project, please give it a star ⭐️

## Acknowledgement

Built by [Dapo Adedire](https://twitter.com/dapo_adedire).
Templates from [Vercel AI Templates](https://vercel.com/templates/ai), powered by [Open AI](https://openai.com/) & [Vercel Edge Functions](https://vercel.com).
