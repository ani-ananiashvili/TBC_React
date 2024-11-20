import "./home.css";

interface Category {
  label: string;
  img: string;
}

const categories: Category[] = [
  { label: "Chair", img: "/assets/chair.jpg" },
  { label: "Table", img: "/assets/table.jpg" },
  { label: "Closet", img: "/assets/closet.jpg" },
  { label: "Chandelier", img: "/assets/chandelier.jpg" },
  { label: "Bed", img: "/assets/bed.jpg" },
  { label: "Armchair", img: "/assets/armchair.jpg" },
];

function MainContent(): JSX.Element {
  return (
    <div className="main-content">
      <img
        src="/assets/furniture.jpg"
        alt="Furniture logo"
        className="main-logo"
      />
      <div className="categories">
        {categories.map((category) => (
          <article className="category-item" key={category.label}>
            <img
              src={category.img}
              alt={`Category: ${category.label}`}
              className="category-img"
            />
            <div className="label">{category.label}</div>
          </article>
        ))}
      </div>
    </div>
  );
}

export default MainContent;
