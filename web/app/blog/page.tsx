import fs from "fs";
import path from "path";
import matter from "gray-matter";
import Link from "next/link";

export default function BlogPage() {
  const postsDir = path.join(process.cwd(), "posts");
  const files = fs.readdirSync(postsDir);
  const posts = files.map((filename) => {
    const markdownWithMeta = fs.readFileSync(
      path.join(postsDir, filename),
      "utf-8"
    );
    const { data } = matter(markdownWithMeta);
    return {
      meta: data,
      slug: filename.replace(".md", ""),
    };
  });

  const sortedPosts = posts.sort(
    (a, b) => new Date(b.meta.date).getTime() - new Date(a.meta.date).getTime()
  );

  return (
    <main className="max-w-3xl mx-auto p-6">
      <h1 className="text-3xl font-bold mb-6">Blog</h1>
      <div className="space-y-6">
        {sortedPosts.map(({ meta, slug }) => (
          <div key={slug} className="border-b pb-4">
            <Link
              href={`/blog/${slug}`}
              className="text-xl font-semibold hover:underline"
            >
              {meta.title}
            </Link>
            <p className="text-gray-500 text-sm">{meta.date}</p>
            <p className="mt-2 text-gray-700">{meta.excerpt}</p>
          </div>
        ))}
      </div>
    </main>
  );
}
