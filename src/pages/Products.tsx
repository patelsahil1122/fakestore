import axios from "axios";
import { ShoppingCart } from "lucide-react";
import { useEffect, useState } from "react";
import { useCart } from "../context/CartContext";
import ProductModal from "../components/ProductModal";

export default function Products() {
  const [productsdata, setProductsdata] = useState([]);
  const [filterproducts, setFilterproducts] = useState([]);
  const [categorylenght, setCategorylenght] = useState();
  const [isActive, setIsActive] = useState("");

  const { addToCart } = useCart();
  const [selectedProduct, setSelectedProduct] = useState(null);
  const [isOpenModal, setIsOpenModal] = useState(false);

  const handleOpenModal = (product) => {
    setSelectedProduct(product);
    setIsOpenModal(true);
  };

  const handleCloseModal = () => {
    setSelectedProduct(null);
    setIsOpenModal(false);
  };

  useEffect(() => {
    async function data() {
      try {
        const API = await axios.get("https://fakestoreapi.com/products");
        setProductsdata(API.data);
        setFilterproducts(API.data);

        console.log(API.data);
      } catch (error) {
        console.error("data not found,error");
      }
    }
    data();
  }, []);
  const showCategory = (category) => {
    if (!category) {
      setFilterproducts(productsdata);
    } else {
      const filterdata = productsdata.filter((x) => x.category === category);
      setFilterproducts(filterdata);
      setCategorylenght(category);
    }
  };

  return (
    <div className="mt-4 mx-22 w-[1216px]">
      <h1 className="text-[30px] font-bold ">
        {categorylenght
          ? categorylenght.charAt(0).toUpperCase() + categorylenght.slice(1)
          : "All Products"}
      </h1>

      <div className="flex gap-2 mt-6">
        <button
          className={`flex text-gray-600 text-[16px] items-center gap-2 px-4 py-2 font-medium ${
            isActive === "All products"
              ? "text-white  bg-black rounded-xl border-xl border-blue-1000"
              : "bg-gray-100 hover:bg-gray-200 rounded-xl "
          }`}
          onClick={() => {
            setIsActive("All products");
            showCategory("");
          }}
        >
          All Products
        </button>
        <button
          className={`flex text-gray-600 text-[16px] items-center gap-2 px-4 py-2 font-medium ${
            isActive === "jewelery"
              ? "text-white  bg-black rounded-xl border-xl border-blue-1000"
              : "bg-gray-100 hover:bg-gray-200 rounded-xl "
          }`}
          onClick={(e) => {
            e.preventDefault;
            setIsActive("jewelery");
            showCategory("jewelery");
          }}
        >
          jewelery
        </button>
        <button
          className={`flex text-gray-600 text-[16px] items-center gap-2 px-4 py-2 font-medium ${
            isActive === "electronics"
              ? "text-white  bg-black rounded-xl border-xl border-blue-1000"
              : "bg-gray-100 hover:bg-gray-200 rounded-xl "
          }`}
          onClick={(e) => {
            e.preventDefault;
            setIsActive("electronics");
            showCategory("electronics");
          }}
        >
          Electronics
        </button>
        <button
          className={`flex text-gray-600 text-[16px] items-center gap-2 px-4 py-2 font-medium ${
            isActive === "men's clothing"
              ? "text-white  bg-black rounded-xl border-xl border-blue-1000"
              : "bg-gray-100 hover:bg-gray-200 rounded-xl "
          }`}
          onClick={(e) => {
            e.preventDefault;
            setIsActive("men's clothing");
            showCategory("men's clothing");
          }}
        >
          Men's clothing
        </button>
        <button
          className={`flex text-gray-600 text-[16px] items-center gap-2 px-4 py-2 font-medium ${
            isActive === "women's clothing"
              ? "text-white  bg-black rounded-xl border-xl border-blue-1000"
              : "bg-gray-100 hover:bg-gray-200 rounded-xl "
          }`}
          onClick={(e) => {
            e.preventDefault;
            setIsActive("women's clothing");
            showCategory("women's clothing");
          }}
        >
          women's clothing
        </button>
      </div>
      <div className="text-[14px] text-gray-600 mt-6">
        {categorylenght ? (
          <p>Showing {filterproducts.length} products</p>
        ) : (
          <p>Showing {filterproducts.length} products</p>
        )}
      </div>

      <div className="flex gap-6 grid grid-cols-4  gap-4">
        {filterproducts.map((productsdata) => (
          <div
            key={productsdata.id}
            onClick={() => handleOpenModal(productsdata)}
            className=" w-[286px] h-[458px] hover:shadow-lg hocer:scale-110"
          >
            <div className="flex justify-center bg-gray-50 p-6 rounded-t-2xl ">
              <img
                src={productsdata.image}
                alt={productsdata.title}
                className=" w-[238px] h-[238px] duration-300 hover:scale-110 "
              />
            </div>
            <div className="w-full h-[172px] p-6 rounded-b-2xl shadow-sm">
              <p className="font-semibold text-gray-900 h-[48px] line-clamp-2">
                {productsdata.title}
              </p>
              <p className="mt-2 text-[15px]">
                {productsdata.rating.rate}
                <span className="text-gray-400">
                  ({productsdata.rating.count})
                </span>
              </p>
              <div className="flex items-center justify-between mt-3">
                <p className="font-bold text-2xl text-gray-900 ">
                  ${productsdata.price}
                </p>
                <button
                  onClick={() => addToCart(productsdata)}
                  className="flex items-center justify-center w-[44px] h-[44px] bg-black text-white rounded-2xl"
                >
                  <ShoppingCart size={20} />
                </button>
              </div>
            </div>
          </div>
        ))}
      </div>
      {isOpenModal && selectedProduct && (
        <ProductModal product={selectedProduct} onClose={handleCloseModal} />
      )}
    </div>
  );
}
