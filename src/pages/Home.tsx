import axios from "axios";
import { ShoppingCart } from "lucide-react";
import { useEffect, useState } from "react";
import { NavLink, useNavigate } from "react-router-dom";
``;
export default function Home() {
  const [productsdata, setProductsdata] = useState([]);
  const [filterproducts, setFilterproducts] = useState([]);
  const [categories, setCategories] = useState<String[]>([]);
  const [randomFour, setRandomFour] = useState([]);
  const navigate = useNavigate();
  useEffect(() => {
    async function data() {
      try {
        const API = await axios.get("https://fakestoreapi.com/products");
        setProductsdata(API.data);
        setFilterproducts(API.data);
        setCategories(
          API.data.map((product: { category: string }) => product.category)
        );
        const shuffled = [...API.data]
          .sort(() => 0.5 - Math.random())
          .slice(0, 4);

        setRandomFour(shuffled);
      } catch (error) {
        console.error("products data not found, error");
      }
    }
    data();
  }, []);

  console.log(new Set(categories));
  console.log(Array.from(new Set(categories)));

  // const showCategory = (category) => {
  //   if (!category) {
  //     setFilterproducts(productsdata);
  //   } else {
  //     const filters = productsdata.filter((x) => x.category === category);
  //     setFilterproducts(filters);
  //   }
  // };

  return (
    <div className="mt-4 mx-22 ">
      <div className="flex flex-col justify-center w-[1216px] h-[188px] bg-gradient-to-r from-white-500 to-gray-100 rounded-xl pl-10">
        <h1 className="text-black-800 text-[48px] font-bold">Welcome back,</h1>
        <p className="text-[20px] text-gray-700">
          Discover amazing products at unbeatable prices
        </p>
      </div>
      <div className="mt-[48px]">
        <p className="text-[24px] font-bold ">Shop by Category</p>
        <div className="flex gap-4 mt-6">
          <NavLink
            to="/products/:category"
            className="flex justify-center items-center w-[292px] h-[124px] rounded-2xl shadow-sm"
            // onClick={() => {
            //   showCategory("electronics");
            // }}
          >
            <p>Electronics</p>
          </NavLink>
          <NavLink
            to="/products/:category"
            className="flex justify-center items-center w-[292px] h-[124px] rounded-2xl shadow-sm"
            // onClick={() => {
            //   showCategory("jewelery");
            // }}
          >
            <p>jewelery</p>
          </NavLink>
          <NavLink
            to="/products/:category"
            className="flex justify-center items-center w-[292px] h-[124px] rounded-2xl shadow-sm"
            // onClick={() => {
            //   showCategory("men's clothing");
            // }}
          >
            <p>Men's Clothing</p>
          </NavLink>
          <NavLink
            to="/products/:category"
            className="flex justify-center items-center w-[292px] h-[124px] rounded-2xl shadow-sm"
            // onClick={() => {
            //   showCategory("women's clothing");
            // }}
          >
            <p>Women's Clothing</p>
          </NavLink>
        </div>
      </div>
      <div className="mt-[48px] flex justify-between">
        <p className="text-[24px] font-bold ">Featured Products</p>
        <button onClick={() => navigate("/products")}>View All</button>
      </div>
      <div className="flex gap-6 grid grid-cols-4 gap-4">
        {randomFour.map((productsdata) => (
          <div key={productsdata.id} className=" w-[286px] h-[458px]">
            <div className="flex justify-center bg-gray-50 p-6 rounded-t-2xl ">
              <img
                src={productsdata.image}
                alt={productsdata.title}
                className=" w-[238px] h-[238px] duration-300 "
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
                <button className="flex items-center justify-center w-[44px] h-[44px] bg-black text-white rounded-2xl">
                  <ShoppingCart size={20} />
                </button>
              </div>
            </div>
          </div>
        ))}
      </div>
    </div>
  );
}
