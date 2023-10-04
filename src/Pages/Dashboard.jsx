import React, { useEffect } from "react";
import { useDispatch, useSelector } from "react-redux";
import { getUserDetails } from "../store/userSlice";
import { logout } from "../store/authSlice";

const Dashboard = () => {
  const dispatch = useDispatch();

  const { loading, data } = useSelector((state) => state.user);

  const handelLogout = () => {
    dispatch(logout());
  };

  useEffect(() => {
    dispatch(getUserDetails());
  }, [dispatch]);

  return (
    <section class="bg-gray-50 dark:bg-gray-900">
      <div class="flex flex-col items-center justify-center px-6 py-8 mx-auto md:h-screen lg:py-0">
        <div class="w-full bg-white rounded-lg shadow dark:border md:mt-0 sm:max-w-md xl:p-0 dark:bg-gray-800 dark:border-gray-700">
          <div class="p-6 space-y-4 md:space-y-6 sm:p-8">
            <h1 class="text-xl font-bold leading-tight tracking-tight text-gray-900 md:text-2xl dark:text-white">
              Your Name Is :- {data?.firstName + " " + data?.lastName}
            </h1>
            <h1 class="text-xl font-bold leading-tight tracking-tight text-gray-900 md:text-2xl dark:text-white">
              Your Email Is :- {data?.email}
            </h1>

            <button
              onClick={handelLogout}
              class="w-full text-white bg-bule-600 hover:bg-blue-700 focus:ring-4 focus:outline-none focus:ring-primary-300 font-medium rounded-lg text-sm px-5 py-2.5 text-center dark:bg-blue-600 dark:hover:bg-primary-700 dark:focus:ring-primary-800"
            >
              LogOut
            </button>
          </div>
        </div>
      </div>
    </section>
  );
};

export default Dashboard;
