import Link from "next/link";

export default function Footer() {
  return (
    <footer
      className=" bg-white border-t w-full sm:pt-2 p-5 flex sm:flex-row justify-center items-center px-3  sm:mb-0 dark:bg-black dark:text-gray-100
    dark:border-gray-700 
    sticky top-[calc(100vh-4rem)]
    "
    >
      <div>
        Built by{" "}
        <Link
          href="https://twitter.com/dapo_adedire"
          className="font-bold hover:underline transition underline-offset-2"
          aria-label="Dapo Adedire on Twitter"
        >
          Dapo Adedire
        </Link>
        {", "}
        Template from{" "}
        <Link
          href="https://vercel.com/templates/ai"
          className="font-bold hover:underline transition underline-offset-2"
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
          className="font-bold hover:underline transition underline-offset-2"
        >
          OpenAI.{" "}
        </a>
      </div>
    </footer>
  );
}
