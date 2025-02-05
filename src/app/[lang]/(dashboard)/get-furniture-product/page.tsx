"use client";

import { useEffect, useState } from "react";
import { useCartContext } from "../../../context/CartContext";
import { useLanguageContext } from "../../../context/LanguageContext";
import Link from "next/link";
import Spinner from "../../../components/Spinner/Spinner";
import { FiShoppingCart, FiFilter, FiX } from "react-icons/fi";

interface Product {
  id: string;
  name: string;
  brand: string;
  price: number;
  photo: string;
  description: string;
  Name_Ka?: string;
  Brand_Ka?: string;
  Description_Ka?: string;
  quantity: number;
  active: boolean;
}

const GetFurnitureProducts = () => {
  const [products, setProducts] = useState<Product[]>([]);
  const { addToCart } = useCartContext();
  const { language } = useLanguageContext();
  const [clientLanguage, setClientLanguage] = useState(language);
  const [loading, setLoading] = useState(true);
  const [searchQuery, setSearchQuery] = useState<string>("");
  const [sortOrder, setSortOrder] = useState<string>("");
  const [isBrandDropdownOpen, setIsBrandDropdownOpen] = useState(true);
  const [selectedBrands, setSelectedBrands] = useState<string[]>([]);

  const brands = [
    "Herman Miller",
    "Ashley",
    "Knoll",
    "Vitra",
    "BoConcept",
    "Cassina",
    "Natuzzi",
    "Restoration Hardware",
    "West Elm",
    "Roche Bobois",
    "IKEA",
    "Flexform",
  ];

  useEffect(() => {
    setClientLanguage(language);
  }, [language]);

  useEffect(() => {
    const fetchProducts = async () => {
      setLoading(true);
      try {
        const response = await fetch("/api/get-products");
        if (!response.ok) throw new Error("Failed to fetch products");
        const data = await response.json();
        setProducts(
          data.filter((product: Product) => product.active !== false)
        );
      } catch (error) {
        console.error(error);
      } finally {
        setLoading(false);
      }
    };

    fetchProducts();
  }, []);

  const handleSearchChange = (e: React.ChangeEvent<HTMLInputElement>) => {
    setSearchQuery(e.target.value);
  };

  const handleSortChange = (e: React.ChangeEvent<HTMLSelectElement>) => {
    setSortOrder(e.target.value);
  };

  const handleBrandSelect = (brand: string) => {
    if (selectedBrands.includes(brand)) {
      setSelectedBrands(selectedBrands.filter((item) => item !== brand));
    } else {
      setSelectedBrands([...selectedBrands, brand]);
    }
  };

  const handleBrandRemove = (brand: string) => {
    setSelectedBrands(selectedBrands.filter((item) => item !== brand));
  };

  const filteredProducts = products.filter(
    (product) =>
      (product.name.toLowerCase().includes(searchQuery.toLowerCase()) ||
        product.brand.toLowerCase().includes(searchQuery.toLowerCase())) &&
      (selectedBrands.length > 0
        ? selectedBrands.includes(product.brand)
        : true)
  );

  const sortedProducts = filteredProducts.sort((a, b) => {
    if (sortOrder === "price-asc") return a.price - b.price;
    if (sortOrder === "price-desc") return b.price - a.price;
    if (sortOrder === "name-asc") return a.name.localeCompare(b.name);
    if (sortOrder === "name-desc") return b.name.localeCompare(a.name);
    return 0;
  });

  if (loading) {
    return <Spinner />;
  }

  return (
    <div className="pt-28 mx-auto px-4 py-8 dark:bg-dark-gradient bg-light-gradient min-h-screen">
      <div className="flex justify-between items-center mb-6">
        <div className="relative">
          <input
            type="text"
            placeholder={clientLanguage === "ka" ? "ძიება..." : "Search..."}
            value={searchQuery}
            onChange={handleSearchChange}
            className="pl-7 w-96 border border-gray-300 rounded-lg py-2 px-3 focus:outline-none focus:ring-2 focus:ring-headerColor dark:bg-dark-gradient dark:text-white"
          />
          <button
            onClick={() => setIsBrandDropdownOpen(!isBrandDropdownOpen)}
            className="absolute left-2 top-1/2 transform -translate-y-1/2"
          >
            <FiFilter className="w-4 h-4 text-gray-600 dark:text-white" />
          </button>
        </div>

        {/* Sort Dropdown */}
        <select
          className="w-80 border border-gray-300 rounded-lg py-3 px-3 dark:bg-neutral-900 dark:text-white"
          onChange={handleSortChange}
        >
          <option value="price-asc">
            {clientLanguage === "ka"
              ? "ფასი (ქვემოდან-ზემოთ)"
              : "Price (Low to High)"}
          </option>
          <option value="price-desc">
            {clientLanguage === "ka"
              ? "ფასი (ზემოდან-ქვემოთ)"
              : "Price (High to Low)"}
          </option>
          <option value="name-asc">
            {clientLanguage === "ka"
              ? "სახელი (ანბანის დასაწყისიდან)"
              : "Name (A-Z)"}
          </option>
          <option value="name-desc">
            {clientLanguage === "ka"
              ? "სახელი (ანბანის დასასრულიდან)"
              : "Name (Z-A)"}
          </option>
        </select>
      </div>

      {/* Brand Dropdown */}
      {isBrandDropdownOpen && (
        <div className="mb-6 bg-white dark:bg-dark-gradient border border-gray-300 rounded-lg w-full mt-2 p-2 z-10 dark:text-white">
          {brands.map((brand) => (
            <button
              key={brand}
              onClick={() => handleBrandSelect(brand)}
              className="w-60 text-left py-2 hover:text-sky-800 dark:hover:text-slate-500"
            >
              {brand}
            </button>
          ))}
        </div>
      )}

      {/* Selected Brands */}
      <div className="mb-6">
        <h3 className="font-semibold text-gray-800 dark:text-white pl-1">
          {clientLanguage === "ka" ? "დარჩენილი ბრენდები" : "Selected Brands"}
        </h3>
        <div className="flex flex-wrap gap-2 mt-2">
          {selectedBrands.map((brand) => (
            <div
              key={brand}
              className="flex items-center bg-gray-200 dark:bg-gray-700 rounded-full px-4 py-2"
            >
              <span className="text-sm text-gray-800 dark:text-white">
                {brand}
              </span>
              <button
                onClick={() => handleBrandRemove(brand)}
                className="ml-2 text-gray-500 dark:text-white"
              >
                <FiX className="w-4 h-4" />
              </button>
            </div>
          ))}
        </div>
      </div>

      <div className="grid grid-cols-1 sm:grid-cols-2 lg:grid-cols-3 gap-6">
        {sortedProducts.length > 0 ? (
          sortedProducts.map((product) => (
            <div
              key={product.id}
              className="relative bg-white dark:bg-dark-gradient p-6 rounded-lg shadow-lg hover:shadow-xl transition-shadow duration-300"
            >
              {product.photo ? (
                <div className="relative group">
                  <img
                    src={product.photo}
                    alt={product.name}
                    className="w-auto h-auto object-contain rounded-lg mb-4"
                  />
                  <Link
                    href={`/get-furniture-product/${product.id}`}
                    className="absolute inset-0 bg-black/50 flex items-center justify-center opacity-0 group-hover:opacity-100 transition-opacity duration-300 rounded-lg"
                  >
                    <span className="text-white text-sm font-semibold">
                      {clientLanguage === "ka"
                        ? "დაწვრილებით..."
                        : "View Details"}
                    </span>
                  </Link>
                </div>
              ) : (
                <div className="w-full h-48 bg-gray-300 rounded-lg mb-4 flex items-center justify-center">
                  <span>No image available</span>
                </div>
              )}

              <h2 className="text-lg font-semibold text-gray-800 dark:text-white mb-2 text-center">
                {clientLanguage === "ka" ? product.Name_Ka : product.name}
              </h2>

              <div className="flex justify-between items-center mt-3">
                <p className="text-gray-600 dark:text-gray-300">
                  {clientLanguage === "ka" ? "ბრენდი: " : "Brand: "}
                  {clientLanguage === "ka" ? product.Brand_Ka : product.brand}
                </p>

                <p className="text-gray-600 dark:text-gray-300 mr-12">
                  {clientLanguage === "ka" ? "ფასი: " : "Price: "} $
                  {product.price}
                </p>
                <button
                  onClick={() => addToCart(product)}
                  className="text-gray-500 hover:text-gray-700 dark:hover:text-gray-300"
                  title={
                    clientLanguage === "ka" ? "კალათში დამატება" : "Add to Cart"
                  }
                >
                  <FiShoppingCart className="w-6 h-6" />
                </button>
              </div>
            </div>
          ))
        ) : (
          <p className=" pl-2 text-gray-600 dark:text-gray-400">
            {clientLanguage === "ka"
              ? "არ არსებობს პროდუქტი"
              : "No products available"}
          </p>
        )}
      </div>
    </div>
  );
};

export default GetFurnitureProducts;
