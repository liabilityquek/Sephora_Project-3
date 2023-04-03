import React, { useState } from "react";
import { useNavigate } from "react-router-dom";
export default function AddProductsForm() {
  const navigate = useNavigate();

 const [product, setProduct] = useState({
  name: "",
  price: 0,
  category: "",
  brand: "",
  imgurl: "",
  description: ""
});

  const handleChange = (event) => {
    const key = event.target.name;
    const value = event.target.value;
    setProduct({ ...product, [key]: value });
  };

  const handleAdd = async () => {
    const response = await fetch("/api/AdminProduct/new", {
      method: "POST",
      headers: {
        "Content-Type": "application/json",
      },
      body: JSON.stringify(product),
    });
    console.log(product);
    const newProduct = await response.json();
    setProduct(newProduct);
     navigate("/productpage");
  };

  return (
    <>
      <h1>Add Product Form</h1>

      <div className="mb-3">
        <label className="form-label">
          Product Name
        </label>
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
          Price (in cents)
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
        <input
          type="text"
          className="form-control"
          name="category"
          value={product.category}
          onChange={handleChange}
        />
      </div>
      <div className="mb-3">
        <label htmlFor="brand" className="form-label">
          Brand
        </label>
        <input
          type="text"
          className="form-control"
          name="brand"
          value={product.brand}
          onChange={handleChange}
        />
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