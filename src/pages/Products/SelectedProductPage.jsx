import { useParams } from 'react-router-dom';
export default function SelectedProductPage({products}) {
    const {productName} = useParams();

    const product = products.filter(p => p.name === productName)
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
    </>
  );
}