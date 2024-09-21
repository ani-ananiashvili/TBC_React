import "./MainContent.css";

function MainContent() {
  return (
    <main className="main-content">
      <section>
        <h2>More of what you like</h2>
        <div className="images-grid">
          <img src="/public/music3.png" alt="image" />
          <img src="/public/music2.png" alt="image" />
          <img src="/public/music3.png" alt="image" />
          <img src="/public/music2.png" alt="image" />
          <img src="/public/music3.png" alt="image" />
        </div>
      </section>

      <hr className="divider" />

      <section className="section-recently-played">
        <h2>Recently Played</h2>
        <div className="images-grid">
          <img src="/public/music1.png" alt="image" />
          <img src="/public/music2.png" alt="image" />
          <img src="/public/music1.png" alt="image" />
          <img src="/public/music2.png" alt="image" />
          <img src="/public/music1.png" alt="image" />
        </div>
      </section>
    </main>
  );
}

export default MainContent;
