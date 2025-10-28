import { useEffect, useState } from "react";
import axios from "axios";
import { Mail, Phone, MapPin, User, Edit3 } from "lucide-react";

interface UserType {
  id: number;
  email: string;
  username: string;
  name: {
    firstname: string;
    lastname: string;
  };
  address: {
    city: string;
    street: string;
    number: number;
    zipcode: string;
  };
  phone: string;
}

export default function Profile() {
  const [user, setUser] = useState<UserType | null>(null);
  const [loading, setLoading] = useState(true);

  useEffect(() => {
    const User = async () => {
      try {
        const API = await axios.get<UserType>(
          "https://fakestoreapi.com/users/1"
        );
        setUser(API.data);
      } catch (error) {
        console.error("Error fetching user:", error);
      } finally {
        setLoading(false);
      }
    };
    User();
  }, []);

  if (loading)
    return (
      <p className="text-center mt-10 text-gray-600">Loading profile...</p>
    );
  if (!user)
    return <p className="text-center mt-10 text-red-500">User not found</p>;

  return (
    <div className="bg-gray-50 min-h-screen p-6 ">
      <div className="lg:mx-60 lg:w-[896px]">
        <div className="flex  justify-between">
          <h2 className="text-[30px] font-bold">My Profile</h2>
          <button className="flex items-center gap-2 px-6 py-3 bg-black text-white rounded-xl">
            <Edit3 size={18} /> Edit Profile
          </button>
        </div>
        <div className="relative mt-6">
          <div className=" h-[128px] lg:h-[128px] sm:h-[128px] md:h-[128px] bg-gray-100 rounded-t-xl z-0 "></div>
          <div className="h-[740px] md:h-[488px] shadow-b-sm rounded-b-xl bg-white px-8 pb-8  ">
            <div className="flex gap-4 items-center">
              <div className="w-[128px] h-[128px] flex  items-center justify-center bg-gray-900 text-white text-6xl rounded-xl">
                <User size={64} />
              </div>
              <div>
                <h3 className="text-2xl font-bold mt-4 capitalize">
                  {user.name.firstname} {user.name.lastname}
                </h3>
                <p className="text-gray-500">@{user.username}</p>
              </div>
            </div>
            <div className="flex flex-col gap-8 mt-8 md:flex-row  ">
              <div className="w-[367px] md:w-[404px] sm:w-[549px] lg:w-[404px] flex flex-col gap-6">
                <div className="flex flex-col gap-2 ">
                  <p className="text-sm text-gray-500">First Name</p>
                  <p className="text-[18px] ">{user.name.firstname}</p>
                </div>
                <div className="flex flex-col gap-2 ">
                  <p className="text-sm text-gray-500">Last Name</p>
                  <p className="text-[18px]">{user.name.lastname}</p>
                </div>
                <div className="flex flex-col  gap-2 text-gray-700">
                  <div className="flex items-center gap-2">
                    <Mail size={16} className="text-gray-500" /> Email
                  </div>
                  <p className="text-[18px]">{user.email}</p>
                </div>
                <div className="flex flex-col gap-2 text-gray-700">
                  <div className="flex items-center gap-2">
                    <Phone size={16} className="text-gray-500" /> Phone
                  </div>
                  <p className="text-[18px]"> {user.phone}</p>
                </div>
              </div>
              <div className="w-[367px] md:w-[404px] sm:w-[549px] lg:w-[404px]">
                <div>
                  <p className="text-sm text-gray-500 flex items-center gap-1">
                    <MapPin size={14} /> Address
                  </p>
                  <div className="bg-gray-50 rounded-xl p-4 mt-2">
                    <p>
                      {user.address.number} {user.address.street}
                    </p>
                    <p>{user.address.city}</p>
                    <p>{user.address.zipcode}</p>
                  </div>
                </div>

                <div className="mt-6 flex flex-col gap-2">
                  <p className="text-sm text-gray-500">Username</p>
                  <p className="text-[18px]">@{user.username}</p>
                </div>
              </div>
            </div>
          </div>
        </div>
      </div>
    </div>
  );
}
