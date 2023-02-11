import Link from "next/link";

export default function Footer() {
  return (
    <footer
      className=" sticky top-[calc(100vh-4rem)] flex w-full items-center justify-center border-t bg-white p-5 px-3  dark:border-gray-700 dark:bg-black dark:text-gray-100
    sm:mb-0 
    sm:flex-row sm:pt-2
    "
    >
      <div>
        Built by{" "}
        <Link
          href="https://twitter.com/dapo_adedire"
          className="font-bold underline-offset-2 transition hover:underline"
          aria-label="Dapo Adedire on Twitter"
        >
          Dapo Adedire
        </Link>
        {", "}
        Template from{" "}
        <Link
          href="https://vercel.com/templates/ai"
          className="font-bold underline-offset-2 transition hover:underline"
          aria-label="Vercel AI Templates"
        >
          {" "}
          Vercel AI Templates,
        </Link>{" "}
        Powered by{" "}
        <a
          href="https://openai.com/"
          target="_blank"
          rel="noreferrer"
          className="font-bold underline-offset-2 transition hover:underline"
        >
          OpenAI.{" "}
        </a>
      </div>
    </footer>
  );
}
