import React from "react";
import { Link } from "react-router-dom";
import { samplePosts } from "../samplePosts";
import "./Home.css";

// PUBLIC_INTERFACE
function Home() {
  /** Blog homepage: shows static listing of all posts. */
  return (
    <main className="home-main">
      <h1 className="home-title">Latest Posts</h1>
      <section className="post-list">
        {samplePosts.map((post) => (
          <Link key={post.id} to={`/posts/${post.id}`} className="post-preview">
            <div className="post-meta">
              <span className="post-date">{(new Date(post.date)).toLocaleDateString()}</span>
            </div>
            <h2 className="post-title">{post.title}</h2>
            <p className="post-excerpt">{post.excerpt}</p>
          </Link>
        ))}
      </section>
    </main>
  );
}

export default Home;
