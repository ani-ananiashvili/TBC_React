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
  "/assets/cover-1.avif",
  "/assets/cover-2.jpg",
  "/assets/cover-3.jpg",
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
