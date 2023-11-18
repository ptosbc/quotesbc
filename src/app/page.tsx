import Image from "next/image";
import Link from "next/link";

async function getQuoteData() {
  // Credit: https://github.com/lukePeavey/quotable
  const res = await fetch("https://api.quotable.io/quotes/random", {
    next: {
      revalidate: 0,
    },
  });

  if (!res.ok) {
    throw new Error("Failed to fetch quote data");
  }

  return res.json();
}

export default async function Home() {
  const quoteData = await getQuoteData();

  return (
    <main className="flex min-h-screen flex-col items-center justify-between p-24">
      <figure className="max-w-screen-md mx-auto text-center">
        <svg
          className="w-10 h-10 mx-auto mb-3"
          aria-hidden="true"
          xmlns="http://www.w3.org/2000/svg"
          fill="currentColor"
          viewBox="0 0 18 14"
        >
          <path d="M6 0H2a2 2 0 0 0-2 2v4a2 2 0 0 0 2 2h4v1a3 3 0 0 1-3 3H2a1 1 0 0 0 0 2h1a5.006 5.006 0 0 0 5-5V2a2 2 0 0 0-2-2Zm10 0h-4a2 2 0 0 0-2 2v4a2 2 0 0 0 2 2h4v1a3 3 0 0 1-3 3h-1a1 1 0 0 0 0 2h1a5.006 5.006 0 0 0 5-5V2a2 2 0 0 0-2-2Z" />
        </svg>
        <blockquote>
          <p className="text-2xl italic font-medium">{quoteData[0].content}</p>
        </blockquote>
        <figcaption className="flex items-center justify-center mt-6 space-x-3 rtl:space-x-reverse">
          <div className="flex items-center divide-x-2 rtl:divide-x-reverse divide-gray-500 dark:divide-gray-700">
            <cite className="pe-3 font-medium">{quoteData[0].author}</cite>
          </div>
        </figcaption>
      </figure>

      <h5 className="text-base">
        Made with{" "}
        <Image
          className="inline-block mx-1"
          alt="love"
          src="/red-heart.png"
          width={25}
          height={25}
          priority
        />{" "}
        by{" "}
        <Link
          className="inline-block text-blue-500 mx-1"
          href="https://github.com/ptosbc"
        >
          PTOS B. C.
        </Link>
      </h5>
    </main>
  );
}
