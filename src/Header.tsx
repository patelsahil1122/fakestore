import { NavLink, useNavigate } from "react-router-dom";

import {
  House,
  Search,
  ShoppingBasket,
  ShoppingCart,
  UserPen,
  UserRoundPen,
} from "lucide-react";
import { useCart } from "./context/CartContext";

export default function Header() {
  const { cartItems } = useCart();
  console.log(cartItems);

  const navigate = useNavigate();

  return (
    <header className=" bg-white shadow-sm ">
      <div className="flex gap-80 items-center lg:mx-27 py-4">
        <div className="flex gap-8 items-center ">
          <h1 className="font-sans font-bold text-2xl text-gray-900">
            Fakestore
          </h1>

          <nav className="flex gap-1">
            <NavLink
              to="/home"
              className={({ isActive }) =>
                `flex text-gray-600 text-[16px] items-center gap-2 px-4 py-2 font-medium ${
                  isActive
                    ? "text-white  bg-black rounded-xl border-xl border-blue-1000"
                    : "bg-white-500 hover:bg-gray-100 rounded-xl "
                }`
              }
            >
              <House size={20} />
              Home
            </NavLink>

            <NavLink
              to="/products"
              className={({ isActive }) =>
                `flex items-center text-gray-600 text-[16px] gap-2 px-4 py-2 font-medium ${
                  isActive
                    ? "text-white  bg-black rounded-xl"
                    : "bg-white-500 hover:bg-gray-100 rounded-xl"
                }`
              }
            >
              <ShoppingBasket size={20} />
              Products
            </NavLink>

            <NavLink
              to="/cart"
              className={({ isActive }) =>
                `flex items-center text-gray-600 text-[16px] gap-2 px-4 py-2 font-medium ${
                  isActive
                    ? "text-white  bg-black rounded-xl"
                    : "bg-white-500 hover:bg-gray-100 rounded-xl"
                }`
              }
            >
              <ShoppingCart size={20} />
              Cart
            </NavLink>

            <NavLink
              to="/profile"
              className={({ isActive }) =>
                `flex items-center text-gray-600 text-[16px] gap-2 px-4 py-2 font-medium ${
                  isActive
                    ? "text-white bg-black rounded-xl"
                    : "bg-white-500 hover:bg-gray-100 rounded-xl"
                }`
              }
            >
              <UserPen />
              Profile
            </NavLink>
          </nav>
        </div>
        <div className="flex items-center  gap-6">
          <div className="flex items-center gap-2 bg-gray-100 px-4 py-2.5 w-[250px] h-[44px] rounded-lg text-gray-500">
            <Search size={17} />
            <input
              type="text"
              placeholder="Search products..."
              className="text-[16px]"
            />
          </div>
          <div className="relative  w-10 h-10 flex items-center justify-center">
            <span className="absolute -top-2 -right-2 flex items-center justify-center  text-white bg-black  w-5 h-5  rounded-full">
              {cartItems.reduce((total, item) => total + (item.qty || 1), 0)}
            </span>
            <ShoppingCart size={25} onClick={() => navigate("/cart")} />
          </div>
          <div>
            <UserRoundPen
              size={36}
              strokeWidth={1}
              onClick={() => navigate("/AllProfile")}
            />
          </div>
        </div>
      </div>
    </header>
  );
}
