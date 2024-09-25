import React from "react";
import "./MainContent.css"; 

function MainContent() {
  return (
    <main className="main-content">
      <section>
        <h2>More of what you like</h2>
        <div className="images-grid">
          <div className="photo-container">
            <img src="/public/music3.png" alt="image" />
            <div className="play-icon">
              <img src="/public/play.png" alt="play-icon" />
            </div>
          </div>
          <div className="photo-container">
            <img src="/public/music2.png" alt="image" />
            <div className="play-icon">
              <img src="/public/play.png" alt="play-icon" />
            </div>
          </div>
          <div className="photo-container">
            <img src="/public/music3.png" alt="image" />
            <div className="play-icon">
              <img src="/public/play.png" alt="play-icon" />
            </div>
          </div>
          <div className="photo-container">
            <img src="/public/music2.png" alt="image" />
            <div className="play-icon">
              <img src="/public/play.png" alt="play-icon" />
            </div>
          </div>
          <div className="photo-container">
            <img src="/public/music3.png" alt="image" />
            <div className="play-icon">
              <img src="/public/play.png" alt="play-icon" />
            </div>
          </div>
        </div>
      </section>

      <hr className="divider" />

      <section>
        <h2>Recently Played</h2>
        <div className="images-grid">
          <div className="photo-container">
            <img src="/public/music1.png" alt="image" />
            <div className="play-icon">
              <img src="/public/play.png" alt="play-icon" />
            </div>
          </div>
          <div className="photo-container">
            <img src="/public/music2.png" alt="image" />
            <div className="play-icon">
              <img src="/public/play.png" alt="play-icon" />
            </div>
          </div>
          <div className="photo-container">
            <img src="/public/music1.png" alt="image" />
            <div className="play-icon">
              <img src="/public/play.png" alt="play-icon" />
            </div>
          </div>
          <div className="photo-container">
            <img src="/public/music2.png" alt="image" />
            <div className="play-icon">
              <img src="/public/play.png" alt="play-icon" />
            </div>
          </div>
          <div className="photo-container">
            <img src="/public/music1.png" alt="image" />
            <div className="play-icon">
              <img src="/public/play.png" alt="play-icon" />
            </div>
          </div>
        </div>
      </section>
    </main>
  );
}

export default MainContent;
