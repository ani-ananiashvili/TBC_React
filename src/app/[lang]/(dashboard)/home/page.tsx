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

function Home(): JSX.Element {
  return (
    <div className="text-center space-y-10 mb-10">
      <img src="/assets/furniture.jpg" alt="Furniture logo" className="max-w-full h-auto" />
      <div className="grid grid-cols-2 gap-5 sm:grid-cols-2 md:grid-cols-6">
        {categories.map((category) => (
          <a
            href={`/${category.label.toLowerCase().replace(/\s+/g, "-")}`}
            className="block rounded-lg overflow-hidden shadow-lg cursor-pointer"
            key={category.label}
          >
            <img src={category.img} alt={`Category: ${category.label}`} className="w-auto h-full object-contain hover:scale-105 transition-transform duration-300" />
            <div className="bg-black bg-opacity-60 text-white text-center p-2 ">
              {category.label}
            </div>
          </a>
        ))}
      </div>
    </div>
  );
}

export default Home;
