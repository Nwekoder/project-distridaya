/* eslint-disable react-hooks/exhaustive-deps */
import { atom, useAtom } from "jotai";
import { useEffect, useState } from "react";
import { NavLink, Navigate, Outlet } from "react-router-dom";

export const UserAtom = atom(null);

export default function AppLayout() {
  const [loading, setLoading] = useState(true);
  const [user, setUser] = useAtom(UserAtom);

  useEffect(() => {
    if (!user) {
      const authtoken = localStorage.getItem("authtoken");

      if (authtoken) {
        fetch("http://localhost:8086/auth/verify", {
          method: "GET",
          headers: {
            "X-TDP-Authtoken": authtoken,
          },
        })
          .then((res) => {
            if (!res.ok) throw Error("An error has occured!");

            return res.json();
          })
          .then((json) => {
            setUser(json.payload);
            setLoading(false);
          })
          .catch((e) => {
            alert(e.message);
          });
      }
    }else {
        setLoading(false)
    }
  }, []);

  if (loading)
    return (
      <div className="flex items-center justify-center h-screen">
        <span className="text-xl font-extralight animate-pulse">Loading...</span>
      </div>
    );

  if (!loading && !user) return <Navigate to="/" replace />;

  return (
    <div className="grid h-screen grid-cols-5">
        <div className="relative h-full bg-gray-950">
            <div className="flex flex-col gap-1 px-4 py-8 overflow-y-auto h-5/6">
                <NavLink to="/app/dashboard" className={({isActive}) => isActive ? 'bg-gray-800 text-xs px-4 py-2 rounded-lg' : 'transition-[background] hover:bg-gray-800 text-xs px-4 py-2 rounded-lg'}>Dashboard</NavLink>
                <NavLink to="/app/users" className={({isActive}) => isActive ? 'bg-gray-800 text-xs px-4 py-2 rounded-lg' : 'transition-[background] hover:bg-gray-800 text-xs px-4 py-2 rounded-lg'}>Users</NavLink>
                <hr className="my-2" />
                <NavLink to="/app/supplier" className={({isActive}) => isActive ? 'bg-gray-800 text-xs px-4 py-2 rounded-lg' : 'transition-[background] hover:bg-gray-800 text-xs px-4 py-2 rounded-lg'}>Supplier</NavLink>
                <NavLink to="/app/customer" className={({isActive}) => isActive ? 'bg-gray-800 text-xs px-4 py-2 rounded-lg' : 'transition-[background] hover:bg-gray-800 text-xs px-4 py-2 rounded-lg'}>Customer</NavLink>
                <hr className="my-2" />
                <NavLink to="/app/purchase_order" className={({isActive}) => isActive ? 'bg-gray-800 text-xs px-4 py-2 rounded-lg' : 'transition-[background] hover:bg-gray-800 text-xs px-4 py-2 rounded-lg'}>Purchase Order</NavLink>
                <NavLink to="/app/good_receipt" className={({isActive}) => isActive ? 'bg-gray-800 text-xs px-4 py-2 rounded-lg' : 'transition-[background] hover:bg-gray-800 text-xs px-4 py-2 rounded-lg'}>Good Receipt</NavLink>
            </div>
        </div>

        <div className="h-full col-span-4 overflow-x-hidden overflow-y-auto">
            <Outlet />
        </div>
    </div>
  );
}
