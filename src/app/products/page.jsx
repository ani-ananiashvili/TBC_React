import SearchBar from "../components/Search/SearchBar";
import SortComponent from "../components/Sort/SortComponent";
import "./products.css";
import Link from "next/link";

async function ProductFetch({ searchParams }) {
  const searchTerm = searchParams.search || "";
  const sortOptions = searchParams.sortBy || "";
  const [sortOption, sortOrder] = sortOptions.split("-");

  let url = "https://dummyjson.com/products";
  if (searchTerm) {
    url = `https://dummyjson.com/products/search?q=${searchTerm}`;
  }
  if (sortOption) {
    url = `https://dummyjson.com/products?sortBy=${sortOption}&order=${sortOrder}`;
  }

  try {
    const response = await fetch(url);
    const data = await response.json();
    const products = data.products || [];

    return (
      <div className="product-page container">
        <h1>Our Products</h1>

        <div className="search-sort-container">
          <SearchBar searchType={"products"} />
          <SortComponent />
        </div>

        <div className="product-grid">
          {products.length > 0 ? (
            products.map((item) => (
              <div key={item.id} className="product-card">
                <Link href={`/products/${item.id}`} legacyBehavior>
                  <a>
                    <img
                      src={item.images[0]}
                      alt={item.title}
                      className="product-image"
                    />
                    <div className="product-info">
                      <h2>{item.title}</h2>
                      <p className="product-description">{item.description}</p>
                      <p className="product-price">${item.price}</p>
                    </div>
                  </a>
                </Link>
              </div>
            ))
          ) : (
            <p className="no-products">Product Not Found...</p>
          )}
        </div>
      </div>
    );
  } catch (error) {
    console.error("Error fetching data: ", error);
    return (
      <div className="error-message">
        <p>Something Went Wrong! Please, Try Again Later...</p>
      </div>
    );
  }
}

export default ProductFetch;
