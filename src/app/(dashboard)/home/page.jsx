import "./home.css";

function MainContent() {
  return (
    <div className="main-content">
      <img src="/assets/furniture.jpg" alt="logo" />
      <div className="categories">
        {[
          { label: "Chair", img: "/assets/chair.jpg" },
          { label: "Table", img: "/assets/table.jpg" },
          { label: "Closet", img: "/assets/closet.jpg" },
          { label: "Chandelier", img: "/assets/chandelier.jpg" },
          { label: "Bed", img: "/assets/bed.jpg" },
          { label: "Armchair", img: "/assets/armchair.jpg" },
        ].map((category, index) => (
          <div className="category-item" key={index}>
            <img src={category.img} alt={category.label} />
            <div className="label">{category.label}</div>
          </div>
        ))}
      </div>
    </div>
  );
}

export default MainContent;
