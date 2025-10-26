import fs from "fs";
import path from "path";
import matter from "gray-matter";
import { remark } from "remark";
import html from "remark-html";

// Define the type for the frontmatter data for better type safety
interface PostData {
  title: string;
  date: string;
  // Add any other expected frontmatter fields here
}

// ------------------------------------------------------------------
// 1. GENERATE STATIC PARAMS (CRITICAL FOR output: 'export')
// This function tells Next.js which pages to build during 'npm run build'.
// ------------------------------------------------------------------
export async function generateStaticParams() {
  // NOTE: Adjusting path to correctly find posts inside the web/app/blog/posts folder.
  const postsDirectory = path.join(process.cwd(), "app", "blog", "posts");

  // Get all file names in the directory
  const filenames = fs.readdirSync(postsDirectory);

  // Map the filenames to the required { slug: string } format
  return filenames
    .filter((filename) => filename.endsWith(".md")) // Only process markdown files
    .map((filename) => ({
      // The slug is the file name without the .md extension
      slug: filename.replace(/\.md$/, ""),
    }));
}

// ------------------------------------------------------------------
// 2. BLOG POST COMPONENT
// ------------------------------------------------------------------
export default async function BlogPost({
  params,
}: {
  params: { slug: string };
}) {
  // Adjusting path to correctly find the specific post file
  const filePath = path.join(
    process.cwd(),
    "app",
    "blog",
    "posts",
    `${params.slug}.md`
  );

  // Your existing logic starts here:
  const fileContents = fs.readFileSync(filePath, "utf-8");
  const { data, content } = matter(fileContents);
  const processedContent = await remark().use(html).process(content);
  const contentHtml = processedContent.toString();
  const postData = data as PostData; // Cast data to the defined interface

  return (
    <article className="blog-post-container">
      {/* Set the title dynamically from frontmatter */}
      <h1 className="post-title">{postData.title}</h1>
      {/* Display the date */}
      <p className="post-date">Published on: {postData.date}</p>

      <hr />

      {/* Renders the HTML converted from Markdown */}
      <div
        className="post-content"
        dangerouslySetInnerHTML={{ __html: contentHtml }}
      />
    </article>
  );
}
