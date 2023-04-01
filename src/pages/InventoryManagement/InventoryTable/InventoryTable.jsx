import React, { useEffect, useState } from "react";
import mockLocationsData from "./mockLocationsData.json";
import "./InventoryTable.css";

export default function () {
  const [locationsData, setLocationsData] = useState([
    {
      name: "",
      products: [
        {
          productDetails: {
            _id: "",
            name: "",
            brand: "",
          },
          productQty: 0,
        },
      ],
    },
  ]);

  const [locationName, setLocationName] = useState("");

  const [conditions, setConditions] = useState({
    searchProductKeyword: "",
  });

  const [productsData, setProductsData] = useState([
    {
      productDetails: {
        _id: "",
        name: "",
        brand: "",
      },
      productQty: 0,
    },
  ]);

  const initalizeLocationsData = async () => {
    setLocationsData(mockLocationsData);
  };

  const handleLocationChange = (e) => {
    const locationName = e.target.value;
    const selectedLocationData =
      locationsData[
        locationsData.findIndex(
          (locationData) => locationData.name === locationName
        )
      ];
    setLocationName(locationName);
    setProductsData(selectedLocationData.products);
  };

  const renderLocationsOption = () => {
    return locationsData.map((locationData) => (
      <option value={locationData.name} key={locationData.name}>
        {locationData.name}
      </option>
    ));
  };

  const renderTableContent = () => {
    const keyword = conditions.searchProductKeyword.toLowerCase().trim();
    const filteredData = keyword
      ? productsData.filter((productData) => {
          const productDetail = productData.productDetails;
          return (
            productDetail._id.toLowerCase().trim().includes(keyword) ||
            productDetail.brand.toLowerCase().trim().includes(keyword) ||
            productDetail.name.toLowerCase().trim().includes(keyword)
          );
        })
      : productsData;
    return (
      <tbody>
        {filteredData.map((product) => (
          <tr key={product.productDetails._id}>
            <td>{product.productDetails.name}</td>
            <td>{product.productDetails._id}</td>
            <td></td>
            <td>{product.productQty}</td>
            <td>
              <button className="btn btn-primary me-3">Edit</button>
              <button className="btn btn-danger">Delete</button>
            </td>
          </tr>
        ))}
      </tbody>
    );
  };

  const handleSearchProduct = (e) => {
    const searchProductKeyword = e.target.value;
    setConditions((prevState) => ({
      ...prevState,
      searchProductKeyword,
    }));
  };

  //Triggered when the component first load
  useEffect(() => {
    initalizeLocationsData();
  }, []);

  return (
    <div className="inventoryTable">
      {locationsData && locationsData.length ? (
        <div className="content">
          <div className="filterHeader">
            <div className="rowHeader">
              <div className="input-group input-group-sm">
                <span
                  className="input-group-text"
                  id="inputGroup-sizing-default"
                >
                  Location
                </span>
                <select
                  className="form-select"
                  value={locationName}
                  onChange={(e) => handleLocationChange(e)}
                >
                  <option value="" key="">
                    Select a location
                  </option>
                  ,{renderLocationsOption()}
                </select>
              </div>
            </div>
          </div>
          <div className="divider"></div>
          <div className="productsContent">
            {locationName ? (
              <div className="w-100">
                <div className="rowHeader">
                  <div className="input-group input-group-sm wd-300">
                    <span
                      className="input-group-text"
                      id="inputGroup-sizing-default"
                    >
                      Search
                    </span>
                    <input
                      type="text"
                      className="form-control"
                      aria-label="Sizing example input"
                      aria-describedby="inputGroup-sizing-default"
                      placeholder="Enter Product name, id or brand"
                      onChange={handleSearchProduct}
                    ></input>
                  </div>
                  <button className="btn btn-primary wd-300">
                    Add new product
                  </button>
                </div>
                <table className="table">
                  <thead>
                    <tr>
                      <th scope="col">Product Name</th>
                      <th scope="col">Product Id</th>
                      <th scope="col">Product Brand</th>
                      <th scope="col">Product Quantity</th>
                      <th scope="col">Actions</th>
                    </tr>
                  </thead>
                  {renderTableContent()}
                </table>
              </div>
            ) : (
              <div className="selectLocation">Please select a location</div>
            )}
          </div>
        </div>
      ) : (
        <div>Loading...</div>
      )}
    </div>
  );
}
