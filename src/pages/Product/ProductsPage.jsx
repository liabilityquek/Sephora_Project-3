import { useEffect, useState } from "react";
export default function ProductsPage() {
    const [products, setProducts] = useState([]);

    useEffect(() => {
    fetch("/api/product")
      .then((response) => response.json())
      .then((data) => setProducts(data))
      .catch((error) => console.error(error));
  }, []);

  return (
 <>
      <h1>Products Pages</h1>
      <div>
        {products.map((p) => (
          <img key={p._id} src={p.imgurl} alt={p.name} />
        ))}
      </div>
    </>
  );
}