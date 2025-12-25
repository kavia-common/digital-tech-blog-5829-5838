import React from "react";
import { useParams, Link } from "react-router-dom";
import { samplePosts } from "../samplePosts";
import "./PostDetail.css";

// PUBLIC_INTERFACE
function PostDetail() {
  /** Show the requested blog post. Render markdown, fallback if not found. */
  const { postId } = useParams();
  const post = samplePosts.find(p => p.id === postId);

  // Simple markdown renderer supporting **bold** and [links](url)
  function renderMarkdown(md) {
    if (!md) return "";
    // Basic: **bold**, [link](url), line breaks
    let html = md
      .replace(/\*\*(.+?)\*\*/g, '<strong>$1</strong>')
      .replace(/\[([^\]]+)\]\(([^)]+)\)/g, '<a href="$2" target="_blank" rel="noopener noreferrer">$1</a>')
      .replace(/\n/g, '<br/>');
    return html;
  }

  if (!post) {
    return (
      <main className="post-main">
        <div className="post-notfound">Post not found.</div>
        <Link className="btn-back" to="/">Back to Home</Link>
      </main>
    );
  }

  return (
    <main className="post-main">
      <h1 className="post-title">{post.title}</h1>
      <div className="post-meta">{(new Date(post.date)).toLocaleDateString()}</div>
      <div
        className="post-content"
        dangerouslySetInnerHTML={{ __html: renderMarkdown(post.content) }}
      />
      <Link className="btn-back" to="/">← Back to Posts</Link>
    </main>
  );
}

export default PostDetail;
