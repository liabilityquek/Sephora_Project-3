import { useParams } from 'react-router-dom';
import { useEffect, useState } from "react";

export default function SelectedProductPage({products}) {
    const {productName} = useParams();
    const [locationProduct, setLocationProduct] = useState([]);
    const product = products.filter(p => p.name === productName)

    useEffect(() => {
  fetch(`/api/locations/${productName}`)
    .then((response) => response.json())
    .then((data) => setLocationProduct(data))
    .catch((error) => console.error(error));
}, [productName]);

  return (
<>
      <h1>Product Name</h1>
      <div>
        {product.map(p => (
        <div key={p._id}>
            <img className='productPic' src={p.imgurl} alt={p.name} />
            <br></br>
            <label>Brand: {p.brand}</label>
            <br></br>
            <label>{p.name}</label>
            <br></br>
<label>{(p.price / 100).toLocaleString("en-US", { style: "currency", currency: "SGD" })}</label>
            <br></br>
            <label>Description: {p.description}</label>
        </div>
         ))}
         </div>

        <div className="dropdown">
                <button className="btn btn-secondary dropdown-toggle" type="button" id="dropdownMenuButton" data-bs-toggle="dropdown" aria-expanded="false">
                  View Availability
                </button>
                <div className="dropdown-menu" aria-labelledby="dropdownMenuButton">
                    <table className="table">
                        <thead>
                            <tr>
                                <th>Store Name</th>
                                <th>Availability</th>
                            </tr>
                        </thead>
                        <tbody>
                            {locationProduct.map((lp,i) =>(
                                <tr key={i}>
                                    <td>{lp.name}</td>
                                    <td>{lp.productQty > 0 ? "Available" : "Not Available"}</td>
                                </tr>
                            ))}
                        </tbody>
                    </table>
                </div>
            </div>
        </>
    );
}