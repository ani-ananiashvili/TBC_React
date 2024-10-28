import "./MainContent.css";
import Product from "./Product";


const products = [
  {
    title: "The Rolling Stones, ‘Some Girls’",
    description: "Description for Album 1",
    image: "https://www.rollingstone.com/wp-content/uploads/2020/09/R1344-468-The-Rolling-Stones-Some-Girls.jpg?w=1000",
    price: "$20",
    buttonColor: "#90EE90", 
  },
  {
    title: "Bob Dylan, ‘John Wesley Harding’’",
    description: "Description for Album 2",
    image: "https://www.rollingstone.com/wp-content/uploads/2020/09/R1344-337-bob-dylan-john-wesley-harding.jpg?w=1000",
    price: "$25",
    buttonColor: " rgb(221, 106, 44)"
  },
  {
    title: "The Beatles, ‘Let It Be’’",
    description: "Description for Album 3",
    image: "https://www.rollingstone.com/wp-content/uploads/2020/09/R1344-342-The-Beatles-Let-It-Be.jpg?w=1000",
    price: "$30",
    buttonColor: "#87CEFA",
  },
];

function MainContent() {
  return (
    <div className="product-grid">
      {products.map((product, index) => (
        <Product
          key={index}
          title={product.title}
          description={product.description}
          image={product.image}
          price={product.price}
          buttonColor={product.buttonColor}
        />
      ))}
    </div>
  );
}

export default MainContent;
