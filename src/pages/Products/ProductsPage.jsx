import { useEffect, useState } from "react";
import { Link } from 'react-router-dom';
export default function ProductsPage({products}) {
    

  return (
 <>
      <h1>Products Pages</h1>
      <div className="productsDiv">
        {products.map((p) => (
            <div key={p._id}>
        <Link to ={`/product/${p.name}`}>
          <img className="productsPic" src={p.imgurl} alt={p.name} />
          <br></br>
          <label>{p.brand}</label>
          <br></br>
          <label>{p.name}</label>
        </Link>
             </div>
        ))}
        </div>
    </>
  );
}