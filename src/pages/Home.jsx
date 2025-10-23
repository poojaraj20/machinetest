import { useEffect } from "react";
import { useSelector, useDispatch } from "react-redux";
import { fetchProducts } from "../Slices/productsSlice";
import ProductCard from "../components/ProductCard";
import Loader from "../components/Loader";
import { Link } from "react-router-dom";
import Header from "../components/Header";

function Home() {
  const dispatch = useDispatch();
  const { items, loading } = useSelector(state => state.products);

 useEffect(() => {
  if (items.length === 0) {
    dispatch(fetchProducts());
  }
}, [dispatch, items.length]);


  if (loading) return <Loader />;

  return (
    <>
      <Header />
      <div className="p-5">
        <h2 className="my-3 text-center text-warning">All Products</h2>
        <Link to="/add" className="btn btn-outline-warning mb-3">Add Product</Link>
        <div className="row">
          {items.map(p => <ProductCard key={p.id} product={p} />)}
        </div>
      </div>
    </>
  );
}

export default Home;
