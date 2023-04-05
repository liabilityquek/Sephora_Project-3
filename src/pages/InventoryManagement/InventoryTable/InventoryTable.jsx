import React, { useEffect, useState } from "react";
import EditQuantityModal from "./EditQuantityModal/EditQuantityModal";
import { useNavigate } from "react-router-dom";
import "./InventoryTable.css";

export default function () {
  const navigate = useNavigate();
  const [locationsData, setLocationsData] = useState([]);
  const [locationName, setLocationName] = useState("");
  const [conditions, setConditions] = useState({
    searchProductKeyword: "",
  });
  const [selectedLocationData, setSelectedLocationData] = useState(null);

  const initalizeLocationsData = async () => {
    try {
      const response = await fetch("/api/locations");
      const data = await response.json();
      setLocationsData(data);
      if (locationName) {
        const selectedLocation = data.find(
          (locationData) => locationData.name === locationName
        );
        setSelectedLocationData(selectedLocation);
      }
    } catch (error) {
      console.log(error);
    }
  };

  const handleLocationChange = (e) => {
    const name = e.target.value;
    setLocationName(name);
    const selectedLocation = locationsData.find(
      (locationData) => locationData.name === name
    );
    setSelectedLocationData(selectedLocation);
  };

  const renderLocationsOption = () => {
    return locationsData.map((locationData) => (
      <option value={locationData.name} key={locationData.name}>
        {locationData.name}
      </option>
    ));
  };

  const handleDelete = async (locationId, productId) => {
    try {
      const response = await fetch(
        `/api/locations/${locationId}/products/${productId}`,
        {
          method: "DELETE",
        }
      );

      if (response.ok) {
        initalizeLocationsData();
      } else {
        const error = await response.json();
        console.log(error);
      }
    } catch (error) {
      console.log(error);
    }
  };

  const renderTableContent = () => {
    if (!selectedLocationData) return null;

    const keyword = conditions.searchProductKeyword.toLowerCase().trim();
    const productsData = selectedLocationData.products;
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
        {filteredData.map((product) => {
          const productQty = product.productQty;
          const productDetails = product.productDetails;
          return (
            <tr key={productDetails._id}>
              <td>{productDetails.name}</td>
              <td>{productDetails._id}</td>
              <td>{productDetails.brand}</td>
              <td>{productQty}</td>
              <td className="actionsTableData">
                <EditQuantityModal
                  productQty={productQty}
                  onSubmitSuccess={async (newProductQty) => {
                    debugger;
                    const response = await fetch(
                      `/api/locations/${selectedLocationData._id}/products/${productDetails._id}`,
                      {
                        method: "PUT",
                        headers: {
                          "Content-Type": "application/json",
                        },
                        body: JSON.stringify({
                          qty: newProductQty,
                        }),
                      }
                    );

                    // When submit successful
                    initalizeLocationsData();
                  }}
                ></EditQuantityModal>
                <button
                  className="btn btn-danger"
                  onClick={() =>
                    handleDelete(selectedLocationData._id, productDetails._id)
                  }
                >
                  REMOVE PRODUCT
                </button>
              </td>
            </tr>
          );
        })}
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

  const redirectAddPage = () => {
    navigate("/adminlocation/edit", {
      state: { selectedLocationData },
    });
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
            <div className="rowHeader w-100">
              <div className="input-group input-group-sm">
                <span className="input-group-text">Location</span>
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
                  <div className="wd-300 input-group input-group-sm">
                    <span className="input-group-text">Search</span>
                    <input
                      type="text"
                      className="form-control"
                      placeholder="Enter Product name, id or brand"
                      onChange={handleSearchProduct}
                    ></input>
                  </div>
                  <button
                    className="btn btn-primary wd-300"
                    onClick={redirectAddPage}
                  >
                    ADD NEW PRODUCT
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
