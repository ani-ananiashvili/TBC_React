import { useState } from "react";
import "./AddProductForm.css";

export default function AddProductForm({ onAddProduct }) {
  const [title, setTitle] = useState("");
  const [description, setDescription] = useState("");
  const [price, setPrice] = useState("");
  const [image, setImage] = useState(null);

  const handleImageChange = (e) => {
    const file = e.target.files[0];
    if (file) {
      const reader = new FileReader();
      reader.onloadend = () => {
        setImage(reader.result);
      };
      reader.readAsDataURL(file);
    }
  };

  const handleSubmit = (e) => {
    e.preventDefault();

    const newProduct = {
      id: Date.now(),
      title,
      description,
      price,
      images: [image || "https://via.placeholder.com/150"],
    };

    const savedProducts =
      JSON.parse(localStorage.getItem("customProducts")) || [];
    savedProducts.push(newProduct);
    localStorage.setItem("customProducts", JSON.stringify(savedProducts));

    onAddProduct(newProduct);

    setTitle("");
    setDescription("");
    setPrice("");
    setImage(null);
  };

  return (
    <form onSubmit={handleSubmit} className="add-product-form">
      <input
        type="text"
        placeholder="Title"
        value={title}
        onChange={(e) => setTitle(e.target.value)}
        required
      />
      <input
        type="text"
        placeholder="Description"
        value={description}
        onChange={(e) => setDescription(e.target.value)}
        required
      />
      <input
        type="number"
        placeholder="Price"
        value={price}
        onChange={(e) => setPrice(e.target.value)}
        required
      />
      <input
        type="file"
        accept="image/*"
        onChange={handleImageChange}
        required
      />

      {image && <img src={image} alt="Preview" className="image-preview" />}

      <button type="submit">Add Product</button>
    </form>
  );
}
