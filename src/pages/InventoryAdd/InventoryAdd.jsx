import React, { useEffect, useState } from "react";
import { useLocation } from "react-router-dom";

export default function InventoryAdd() {
  const { state } = useLocation();
  const { selectedLocationData } = state; // Read values passed on state
  const { _id: locationId, name: locationName } = selectedLocationData;

  const [searchQuery, setSearchQuery] = useState("");
  const [selectedProducts, setSelectedProducts] = useState([]);
  const [productList, setProductList] = useState([]);

  useEffect(() => {
    const fetchProducts = async () => {
      const response = await fetch(`/api/locations/getlocation/${locationId}`);
      const locationData = await response.json();
      setProductList(locationData.products);
    };

    fetchProducts();
  }, []);

  // useEffect(
  //   () =>
  //     alert("selectedLocationData: " + JSON.stringify(selectedLocationData)),
  //   []
  // );

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
