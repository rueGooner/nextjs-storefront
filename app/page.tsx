import Link from "next/link";
import { type SanityDocument } from "next-sanity";

import { client } from "@/sanity/client";

const PRODUCTS_QUERY = `*[
  _type == "product"
  && defined(slug.current)
]|order(publishedAt desc)[0...12]{_id, title, slug, publishedAt}`;

const options = { next: { revalidate: 30 } };

export default async function IndexPage() {
  const products = await client.fetch<SanityDocument[]>(
    PRODUCTS_QUERY,
    {},
    options
  );

  return (
    <main className="container mx-auto min-h-screen max-w-3xl p-8">
      <h1 className="text-4xl font-bold mb-8">Posts</h1>
      <ul className="flex flex-col gap-y-4">
        {products.map((product) => (
          <li className="hover:underline" key={product._id}>
            <Link href={`/${product.slug.current}`}>
              <h2 className="text-xl font-semibold">{product.title}</h2>
              <p>{new Date(product.publishedAt).toLocaleDateString()}</p>
            </Link>
          </li>
        ))}
      </ul>
      {/* Immplement the grid here */}
      <div className="grid grid-cols-2 gap-3">
        {products.slice(0, 5).map((product, index) => {
          // Map indices to grid positions:
          // 0: row 1, col 1
          // 1: row 2, col 1
          // 2: row 1, col 2
          // 3: row 2, col 2
          // 4: row 3, col 2
          const gridClasses = [
            "row-start-1 col-start-1", // index 0
            "row-start-2 col-start-1", // index 1
            "row-start-1 col-start-2", // index 2
            "row-start-2 col-start-2", // index 3
            "row-start-3 col-start-2", // index 4
          ];
          
          return (
            <div
              key={product._id}
              className={`p-4 ${gridClasses[index]} border border-gray-300`}
            >
              <p>{product.title}</p>
            </div>
          );
        })}
      </div>
    </main>
  );
}
