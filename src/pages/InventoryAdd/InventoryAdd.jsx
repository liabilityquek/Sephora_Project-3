import React, { useEffect, useState } from "react";
import { useLocation, useNavigate } from "react-router-dom";
import "../../pages/InventoryManagement/InventoryTable/InventoryTable.css";

export default function InventoryAdd() {
  const { state } = useLocation();
  const { selectedLocationData } = state;
  const { _id: locationId, name: locationName } = selectedLocationData;
  const [productList, setProductList] = useState([]);
  const [searchValue, setSearchValue] = useState("");

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
          ? { ...product, isChecked } // set isChecked property to true when the product is selected
          : product
      )
    );
  };

  const handleQuantityChange = (event, productId) => {
    const productQty = Number(event.target.value);
    if (productQty >= 0) {
      setProductList((prevState) =>
        prevState.map((product) =>
          product._id === productId ? { ...product, productQty } : product
        )
      );
    }
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

      if (selectedProducts.length === 0) {
        throw new Error("Please select at least one product.");
      }

      if (
        selectedProducts.filter((product) => product.productQty === undefined)
          .length > 0
      ) {
        throw new Error("Please add quantity for selected products.");
      }

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
    setProductList((prevState) =>
      prevState.map((product) => ({
        ...product,
        isChecked: false,
        productQty: undefined,
      }))
    );
  };

  const isSaveDisabled =
    productList.filter((product) => product.isChecked).length === 0 || // check if at least one item is selected
    productList.filter((product) => product.isChecked && !product.productQty)
      .length > 0 || // check if all selected items have a quantity entered
    productList.filter((product) => product.productQty && !product.isChecked)
      .length > 0; // check if there are any products with a quantity entered that are not selected

  const filteredProductList = productList.filter((product) => {
    const productDetail = {
      _id: product._id,
      brand: product.brand,
      name: product.name,
    };
    const keyword = searchValue.trim().toLowerCase();
    return (
      productDetail._id.toLowerCase().trim().includes(keyword) ||
      productDetail.brand.toLowerCase().trim().includes(keyword) ||
      productDetail.name.toLowerCase().trim().includes(keyword)
    );
  });

  return (
    <div>
      <h2>Add products to: {locationName}</h2>
      <div className="w-100">
        <div className="rowHeader">
          <div className="wd-300 input-group input-group-sm">
            <span className="input-group-text">Search</span>
            <input
              type="text"
              className="form-control"
              placeholder="Enter Product name, id or brand"
              onChange={(e) => setSearchValue(e.target.value)}
            ></input>
          </div>
        </div>
      </div>
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
          {filteredProductList.map((product) => (
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
        <button onClick={handleSaveChanges} disabled={isSaveDisabled}>
          SAVE CHANGES
        </button>
        <button onClick={handleCancel}>CANCEL</button>
      </div>
    </div>
  );
}
