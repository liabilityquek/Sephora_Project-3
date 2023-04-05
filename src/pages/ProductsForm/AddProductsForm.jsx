import React, { useState } from "react";
import { useNavigate } from "react-router-dom";
export default function AddProductsForm({ addProduct, category, brand }) {
  const navigate = useNavigate();
  const defaultCategory = category[0];
  const defaultBrand = brand[0];
  const [product, setProduct] = useState({
    name: "",
    price: 0,
    category: defaultCategory,
    brand: defaultBrand,
    imgurl: "",
    description: "",
  });

  const [newBrand, setNewBrand] = useState("");

  const handleChange = (event) => {
    const key = event.target.name;
    const value = event.target.value;

    setProduct({ ...product, [key]: value });
  };

  const handleNewBrandChange = (event) => {
    const value = event.target.value;
    setNewBrand(value);
  };

  const handleAdd = async () => {
    if (product.brand === "Other") {
      const newProduct = { ...product, brand: newBrand };
      const response = await fetch("/api/AdminProduct/new", {
        method: "POST",
        headers: {
          "Content-Type": "application/json",
        },
        body: JSON.stringify(newProduct),
      });
      const newProducts = await response.json();
      addProduct(newProducts);
    } else {
      const response = await fetch("/api/AdminProduct/new", {
        method: "POST",
        headers: {
          "Content-Type": "application/json",
        },
        body: JSON.stringify(product),
      });
      const newProduct = await response.json();
      addProduct(newProduct);
    }
    navigate("/productpage");
  };

  return (
    <>
      <h1>Add Product Form</h1>

      <div className="mb-3">
        <label className="form-label">Product Name</label>
        <input
          type="text"
          className="form-control"
          name="name"
          value={product.name}
          onChange={handleChange}
        />
      </div>
      <div className="mb-3">
        <label htmlFor="price" className="form-label">
          Price in (cents)
        </label>
        <input
          type="number"
          className="form-control"
          name="price"
          value={product.price}
          onChange={handleChange}
        />
      </div>
      <div className="mb-3">
        <label htmlFor="category" className="form-label">
          Category
        </label>
        <select
          name="category"
          value={product.category}
          onChange={handleChange}
        >
          {category.map((c, i) => (
            <option key={i} value={c}>
              {c}
            </option>
          ))}
        </select>
      </div>
      <div className="mb-3">
        <label htmlFor="brand" className="form-label">
          Brand
        </label>
        <select name="brand" value={product.brand} onChange={handleChange}>
          {brand.map((b, i) => (
            <option key={i} value={b}>
              {b}
            </option>
          ))}
          <option value="Other">Other</option>
        </select>
        {product.brand === "Other" && (
          <div className="mt-3">
            <input
              type="text"
              className="form-control"
              name="newBrand"
              value={newBrand}
              placeholder="Enter a new brand"
              onChange={handleNewBrandChange}
            />
          </div>
        )}
      </div>
      <div className="mb-3">
        <label htmlFor="imgurl" className="form-label">
          Picture URL
        </label>
        <input
          type="text"
          className="form-control"
          name="imgurl"
          value={product.imgurl}
          onChange={handleChange}
        />
      </div>
      <div className="mb-3">
        <label htmlFor="description" className="form-label">
          Description
        </label>
        <textarea
          className="form-control"
          name="description"
          value={product.description}
          onChange={handleChange}
        ></textarea>
      </div>
      <button onClick={handleAdd} className="btn btn-primary">
        Submit
      </button>
    </>
  );
}
