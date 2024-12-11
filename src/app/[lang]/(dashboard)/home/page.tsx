import "./home.css";

interface Category {
  label: string;
  img: string;
}

const categories: Category[] = [
  { label: "Ashley", img: "/assets/ashley.jpg" },
  { label: "BoConcept", img: "/assets/boconcept.png" },
  { label: "Herman Miller", img: "/assets/herman_miller.webp" },
  { label: "Knoll", img: "/assets/knoll.svg" },
  { label: "IKEA", img: "/assets/ikea.jpg" },
  { label: "Natuzzi", img: "/assets/natuzzi.jpg" },
  { label: "Restoration Hardware", img: "/assets/rh.jpg" },
  { label: "Cassina", img: "/assets/cassina.jpg" },
  { label: "Roche Bobois", img: "/assets/roche_bobois.png" },
  { label: "West Elm", img: "/assets/west_elm.png" },
  { label: "Flexform", img: "/assets/flexform.png" },
  { label: "Vitra", img: "/assets/vitra.jpg" },
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
          <a
            href={`/${category.label.toLowerCase().replace(/\s+/g, "-")}`}
            className="category-link"
            key={category.label}
          >
            <article className="category-item">
              <img
                src={category.img}
                alt={`Category: ${category.label}`}
                className="category-img"
              />
              <div className="label">{category.label}</div>
            </article>
          </a>
        ))}
      </div>
    </div>
  );
}

export default MainContent;
