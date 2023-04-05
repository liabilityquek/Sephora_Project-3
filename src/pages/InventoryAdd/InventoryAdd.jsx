import React, { useState } from "react";

export default function InventoryAdd({ locationName }) {
  const [searchQuery, setSearchQuery] = useState("");
  const [selectedProducts, setSelectedProducts] = useState([]);
  const [productList, setProductList] = useState([
    { id: 1, name: "Product 1", brand: "Brand 1", quantity: 0 },
    { id: 2, name: "Product 2", brand: "Brand 2", quantity: 0 },
    { id: 3, name: "Product 3", brand: "Brand 3", quantity: 0 },
    { id: 4, name: "Product 4", brand: "Brand 4", quantity: 0 },
    { id: 5, name: "Product 5", brand: "Brand 5", quantity: 0 },
  ]);

  const handleSearchChange = (event) => {
    setSearchQuery(event.target.value);
  };

  const handleProductSelection = (event, productId) => {
    const isSelected = event.target.checked;
    if (isSelected) {
      setSelectedProducts((prevSelectedProducts) => [
        ...prevSelectedProducts,
        productId,
      ]);
    } else {
      setSelectedProducts((prevSelectedProducts) =>
        prevSelectedProducts.filter((id) => id !== productId)
      );
    }
  };

  const handleQuantityChange = (event, productId) => {
    const newQuantity = event.target.value;
    setProductList((prevProductList) =>
      prevProductList.map((product) =>
        product.id === productId
          ? { ...product, quantity: newQuantity }
          : product
      )
    );
  };

  const handleSaveSubmit = () => {
    // handle saving data and submitting form
    console.log("Selected products:", selectedProducts);
    console.log("Product list:", productList);
  };

  const handleCancel = () => {
    // handle cancelling form
    console.log("Form cancelled");
  };

  return (
    <div>
      <h2>Add products to: {locationName}</h2>
      <input
        type="text"
        placeholder="Search products"
        value={searchQuery}
        onChange={handleSearchChange}
      />
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
          {productList
            .filter((product) =>
              product.name.toLowerCase().includes(searchQuery.toLowerCase())
            )
            .map((product) => (
              <tr key={product.id}>
                <td>
                  <input
                    type="checkbox"
                    checked={selectedProducts.includes(product.id)}
                    onChange={(event) =>
                      handleProductSelection(event, product.id)
                    }
                  />
                </td>
                <td>{product.name}</td>
                <td>{product.id}</td>
                <td>{product.brand}</td>
                <td>
                  <input
                    type="number"
                    min="0"
                    value={product.quantity}
                    onChange={(event) =>
                      handleQuantityChange(event, product.id)
                    }
                  />
                </td>
              </tr>
            ))}
        </tbody>
      </table>
      <button onClick={handleSaveSubmit}>SAVE & SUBMIT</button>
      <br />
      <button onClick={handleCancel}>CANCEL</button>
    </div>
  );
}
