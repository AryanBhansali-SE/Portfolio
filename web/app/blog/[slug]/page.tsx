import fs from "fs";
import path from "path";
import matter from "gray-matter";
import { remark } from "remark";
import html from "remark-html";

// Define the type for the frontmatter data for better type safety
interface PostData {
  title: string;
  date: string;
  // Add any other expected frontmatter fields here (e.g., author, tags)
}

// The function component for the blog post page
export default async function BlogPost({
  params,
}: {
  params: { slug: string };
}) {
  // 1. Read the Markdown file
  // process.cwd() is the current working directory, typically the root of your project
  const filePath = path.join(process.cwd(), "posts", `${params.slug}.md`);
  const fileContents = fs.readFileSync(filePath, "utf-8");

  // 2. Parse frontmatter (data) and content
  const { data, content } = matter(fileContents);
  const postData = data as PostData; // Cast data to the defined interface

  // 3. Convert Markdown content to HTML
  const processedContent = await remark().use(html).process(content);
  const contentHtml = processedContent.toString();

  // 4. Render the component with the post data
  return (
    <article className="blog-post-container">
      {/* Set the title dynamically from frontmatter */}
      <h1 className="post-title">{postData.title}</h1>
      {/* Display the date, you might want to format this with a utility */}
      <p className="post-date">Published on: {postData.date}</p>

      <hr />

      {/* The dangerouslySetInnerHTML prop is required to render raw HTML strings.
        Ensure that the markdown content is trusted, as it can expose XSS vulnerabilities 
        if it comes from an untrusted source.
      */}
      <div
        className="post-content"
        dangerouslySetInnerHTML={{ __html: contentHtml }}
      />

      {/* You could add navigation links or a back button here */}
    </article>
  );
}

// -----------------------------------------------------------------------------

/**
 * OPTIONAL: Add a function to generate static paths (required for Next.js Static Site Generation (SSG))
 * This function tells Next.js which slugs (files) to pre-render at build time.
 * If you're using App Router and not relying on SSG, you might omit this or use dynamic rendering.
 */
/*
export async function generateStaticParams() {
  const postsDirectory = path.join(process.cwd(), 'posts');
  // Get all filenames in the 'posts' directory
  const filenames = fs.readdirSync(postsDirectory);

  return filenames.map((filename) => ({
    slug: filename.replace(/\.md$/, ''), // Extract the slug by removing the '.md' extension
  }));
}
*/
