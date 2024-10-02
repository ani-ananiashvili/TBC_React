import "./Blog.css";

function Blog() {
  const posts = [
    {
      title: "WHAT'S NEW WITH SOUNDCLOUD - September 2024",
      content:
        "It's September and as we embrace the change of seasons and the return to busy schedules, we're excited to announce new features that keep you connected to your favorite artists and tracks. Whether you’re settling into a new routine, discovering fresh sounds, or just returning to normal, read on to discover what’s new this month.",
      imageURL:
        "https://cdn.prod.website-files.com/62a0a0168756b7e12bbc65d3/66fb374fe50927d0676a8d38_PMM_ProductUpdate_Sep_Blog_Editorialthumbnail-wLogo.jpg",
    },
    {
      title: "WHAT'S NEW WITH SOUNDCLOUD - August 2024",
      content:
        "This August, we launched a range of new features on SoundCloud. Whether you're squeezing in a last-minute vacation, gearing up for the new school year, or just keeping to your routine, here are some product highlights from this month to help you stay connected to the music and artists you love.",
      imageURL:
        "https://cdn.prod.website-files.com/62a0a0168756b7e12bbc65d3/66d73cd18e43dd2d599398a9_PMM_ProductUpdate_Aug_Blog_Editorialthumbnail-wLogo-p-500.jpg",
    },
    {
      title: "WHAT'S NEW WITH SOUNDCLOUD - July 2024",
      content:
        "This July, we’re bringing the sunshine to your SoundCloud experience. Read on to explore new features that are sure to light up your summer sound.",
      imageURL:
        "https://cdn.prod.website-files.com/62a0a0168756b7e12bbc65d3/66aacf07ecd2dd631f8b965b_PMM_ProductUpdate_July_Blog_Editorialthumbnail-wLogo%20(1)-p-500.jpg",
    },
  ];

  return (
    <div className="blog-container">
      {posts.map((post, index) => (
        <div key={index} className="blog-post">
          <img src={post.imageURL} alt={post.title} className="post-image" />
          <div className="post-content">
            <h2>{post.title}</h2>
            <p>{post.content}</p>
          </div>
        </div>
      ))}
    </div>
  );
}

export default Blog;
