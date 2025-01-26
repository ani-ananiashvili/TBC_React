"use client";

import { useState } from "react";

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

const coverImages = [
  "https://static.vecteezy.com/system/resources/previews/037/349/562/non_2x/ai-generated-a-blue-sofa-and-a-wooden-table-free-photo.jpg",
  "https://www.brillianthomeliving.com.au/cdn/shop/files/Furniture_Protection_1000x500_0096b3ca-3d38-4df1-af60-86024ce54e0b.jpg?v=1658799058&width=2084",
  "https://www.covermyfurniture.com/wp-content/uploads/2022/08/blue-sofa-3.jpg",
];

function Home(): JSX.Element {
  const [mainImage, setMainImage] = useState<string>(coverImages[0]);

  const handleDotClick = (img: string) => {
    setMainImage(img);
  };

  return (
    <div className="text-center space-y-10 mb-10">
      <div className="relative">
        <img
          src={mainImage}
          alt="Main cover image"
          className="w-full h-full object-cover"
        />

        <div className="absolute bottom-4 left-1/2 transform -translate-x-1/2 flex space-x-4">
          {coverImages.map((img, index) => (
            <div
              key={index}
              className={`w-3 h-3 border-2 rounded-full cursor-pointer transition-all duration-300 ${
                mainImage === img ? "bg-white" : "border-white"
              }`}
              onClick={() => handleDotClick(img)}
            />
          ))}
        </div>
      </div>

      <div className="grid grid-cols-2 gap-5 sm:grid-cols-2 md:grid-cols-6">
        {categories.map((category) => (
          <a
            href={`/${category.label.toLowerCase().replace(/\s+/g, "-")}`}
            className="block rounded-lg overflow-hidden shadow-lg cursor-pointer"
            key={category.label}
          >
            <img
              src={category.img}
              alt={`Category: ${category.label}`}
              className="w-auto h-full object-contain hover:scale-105 transition-transform duration-300"
            />
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
