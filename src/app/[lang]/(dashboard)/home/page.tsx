"use client";

import { useState } from "react";

interface Category {
  label: string;
  img: string;
}

const categories: Category[] = [
  { label: "Ashley", img: "https://i.postimg.cc/7LBSyfxL/ashely.jpg" },
  { label: "BoConcept", img: "https://i.postimg.cc/d0QGX8cX/boconcept.jpg" },
  {
    label: "Herman Miller",
    img: "https://i.postimg.cc/PrGYhGk1/herman-miller.jpg",
  },
  { label: "Knoll", img: "https://i.postimg.cc/XY45GwqJ/knoll.jpg" },
  { label: "IKEA", img: "https://i.postimg.cc/Qxp5d6Xw/Ikea.jpg" },
  { label: "Natuzzi", img: "https://i.postimg.cc/RZdHcNJT/natuzzi.jpg" },
  {
    label: "Restoration Hardware",
    img: "https://i.postimg.cc/cJJ8T0QG/rh.jpg",
  },
  { label: "Cassina", img: "https://i.postimg.cc/Y9hY2M9z/cassina.jpg" },
  {
    label: "Roche Bobois",
    img: "https://i.postimg.cc/wBbRGZVy/roche-bobois.jpg",
  },
  { label: "West Elm", img: "https://i.postimg.cc/hjkzSmNK/west-elm.jpg" },
  { label: "Flexform", img: "https://i.postimg.cc/63gRyg4J/flexfirm.jpg" },
  { label: "Vitra", img: "https://i.postimg.cc/0QMKRnWt/vitra.jpg" },
];

const coverImages = [
  "https://i.postimg.cc/nc7KQF1d/cover-1.jpg",
  "https://i.postimg.cc/4xg66DLX/cover-2.jpg",
  "https://i.postimg.cc/fRfxB8pm/cover-3.jpg",
];

function Home(): JSX.Element {
  const [mainImage, setMainImage] = useState<string>(coverImages[0]);

  const handleDotClick = (img: string) => {
    setMainImage(img);
  };

  return (
    <div className="pt-16 text-center min-h-screen bg-light-gradient dark:bg-dark-gradient">
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

      <div className="grid grid-cols-2 gap-5 sm:grid-cols-2 md:grid-cols-6 p-10">
        {categories.map((category) => (
          <div
            key={category.label}
            className="relative block rounded-lg overflow-hidden shadow-lg cursor-pointer group"
          >
            <img
              src={category.img}
              alt={`Category: ${category.label}`}
              className="w-auto h-full object-contain transition-transform duration-300 group-hover:scale-105"
            />

            <div className="absolute bottom-0 left-1/2 transform -translate-x-1/2 w-full text-center bg-slate-600 bg-opacity-60 text-white text-sm font-semibold py-2 opacity-0 group-hover:opacity-100 transition-opacity duration-300">
              {category.label}
            </div>
          </div>
        ))}
      </div>
    </div>
  );
}

export default Home;
