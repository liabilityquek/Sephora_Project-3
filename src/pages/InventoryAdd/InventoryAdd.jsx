import React, { useEffect, useState } from "react";
import { useLocation, useNavigate } from "react-router-dom";

export default function InventoryAdd() {
  const { state } = useLocation();
  const { selectedLocationData } = state;
  const { _id: locationId, name: locationName } = selectedLocationData;

  const [productList, setProductList] = useState([]);

  const navigate = useNavigate(); // Initialize the navigate object

  useEffect(() => {
    const fetchProducts = async () => {
      try {
        const response = await fetch(
          `/api/locations/getlocation/${locationId}`
        );
        const { newProducts } = await response.json();
        setProductList(newProducts);
      } catch (error) {
        console.error("Failed to fetch products:", error);
      }
    };

    fetchProducts();
  }, [locationId]);

  const handleCheckboxChange = (event, productId) => {
    const isChecked = event.target.checked;
    setProductList((prevState) =>
      prevState.map((product) =>
        product._id === productId
          ? { ...product, isChecked, productQty: isChecked ? 0 : undefined } // set productQty to 0 when the product is selected
          : product
      )
    );
  };

  const handleQuantityChange = (event, productId) => {
    const productQty = event.target.value;
    setProductList((prevState) =>
      prevState.map((product) =>
        product._id === productId ? { ...product, productQty } : product
      )
    );
  };

  const handleSaveChanges = async () => {
    try {
      const selectedProducts = productList.filter(
        (product) => product.isChecked
      );
      const productsToAdd = selectedProducts.map((product) => ({
        productId: product._id,
        productQty: Number(product.productQty),
      }));

      const response = await fetch(`/api/locations/${locationId}`, {
        method: "POST",
        headers: { "Content-Type": "application/json" },
        body: JSON.stringify({ products: productsToAdd }),
      });

      if (!response.ok) {
        const error = await response.json();
        throw new Error(error.message || "Failed to add products");
      }

      navigate("/adminlocation");
    } catch (error) {
      console.error("Failed to save changes:", error);
    }
  };

  const handleCancel = () => {
    // TODO: Handle cancel logic
  };

  return (
    <div>
      <h2>Add products to: {locationName}</h2>
      <table>
        <thead>
          <tr>
            <th>Select</th>
            <th>Product Name</th>
            <th>Product Id</th>
            <th>Product Brand</th>
            <th>Product Quantity</th>
          </tr>
        </thead>
        <tbody>
          {productList.map((product) => (
            <tr key={product._id}>
              <td>
                <input
                  type="checkbox"
                  checked={product.isChecked}
                  onChange={(event) => handleCheckboxChange(event, product._id)}
                />
              </td>
              <td>{product.name}</td>
              <td>{product._id}</td>
              <td>{product.brand}</td>
              <td>
                <input
                  type="number"
                  placeholder="Enter quantity"
                  min={0}
                  disabled={!product.isChecked}
                  required
                  value={product.productQty || ""}
                  onChange={(event) => handleQuantityChange(event, product._id)} // add this line
                />
              </td>
            </tr>
          ))}
        </tbody>
      </table>
      <div>
        <button onClick={handleSaveChanges}>Save Changes</button>
        <button onClick={handleCancel}>Cancel</button>
      </div>
    </div>
  );
}
