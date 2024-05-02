/* eslint-disable react-hooks/exhaustive-deps */
import { useAtom } from "jotai";
import { Link, useNavigate } from "react-router-dom";
import { UserAtom } from "../components/AppLayout";
import { useEffect } from "react";

export default function LoginPage() {
  const navigate = useNavigate();
  const [user, setUser] = useAtom(UserAtom);

  const handleSubmit = async (e) => {
    e.preventDefault();

    const formData = new FormData(e.target);
    const data = JSON.parse(JSON.stringify(Object.fromEntries(formData)));

    const res = await fetch("http://localhost:8086/auth/login", {
      method: "POST",
      headers: {
        "Content-Type": "application/json",
      },
      body: JSON.stringify(data),
    });

    const resData = await res.json();

    if (!res.ok) {
      alert(resData.message);
      return;
    }

    localStorage.setItem("authtoken", resData.token);
    navigate("/app/dashboard");
  };

  useEffect(() => {
    const token = localStorage.getItem("authtoken");

    if (token && !user) {
      fetch("http://localhost:8086/auth/verify", {
        method: "GET",
        headers: {
          "X-TDP-Authtoken": token,
        },
      })
        .then((res) => {
          if (!res.ok) throw Error("An error has occured!");

          return res.json();
        })
        .then((json) => {
          setUser(json.payload);
        })
        .catch((e) => {
          alert(e.message);
        });
    }
  }, []);

  return (
    <div className="flex flex-col items-center justify-center h-screen">
      <div className="mb-8 w-96">
        <h1 className="mb-4 text-3xl font-bold">App v1</h1>
        {!user ? (
          <p className="text-sm opacity-50">Please login to continue!</p>
        ) : (
          <p className="text-sm opacity-50">
            Welcome back, <strong>{user.full_name}</strong>!
          </p>
        )}
      </div>
      <div className="px-4 py-8 bg-gray-900 border border-gray-800 rounded-lg shadow-lg w-96 shadow-gray-900 border-opacity-30">
        {!user ? (
          <form onSubmit={handleSubmit}>
            <div className="text-input">
              <label htmlFor="username">Username</label>
              <input
                type="text"
                required
                minLength={3}
                name="username"
                id="username"
              />
            </div>
            <div className="text-input">
              <label htmlFor="password">Password</label>
              <input
                type="password"
                required
                minLength={8}
                name="password"
                id="password"
              />
            </div>

            <button
              type="submit"
              className="btn mt-8 transition-[background] bg-blue-700 hover:bg-blue-800"
            >
              Login
            </button>
          </form>
        ) : (
          <Link
            to="/app/dashboard"
            className="btn text-center transition-[background] bg-blue-700 hover:bg-blue-800"
          >
            Go to Dashboard
          </Link>
        )}
      </div>
    </div>
  );
}
