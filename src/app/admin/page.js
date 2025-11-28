"use client";
import { useState ,useEffect} from "react";
import { useRouter } from "next/navigation";

export default function Admin() {
  const [credentials, setCredentials] = useState({ email: "", password: "" });
  const [errorMessage, setErrorMessage] = useState("");
  // const { session, setSession } = useSession();  
  const router = useRouter();

  const handleLogin = async (e) => {
    e.preventDefault();

    if (!credentials.email || !credentials.password) {
      setErrorMessage("Email and password are required.");
      return;
    }

    try {
      const response = await fetch(process.env.NEXT_PUBLIC_SCRIPT_ADMIN_LOGIN, {
        method: "POST",
        headers: { "Content-Type": "application/json" },
        body: JSON.stringify(credentials),
      });

      const rawResponse = await response.text();
      let result;
      try {
        result = JSON.parse(rawResponse);
        console.log("database credentials"+result);
      } catch (error) {
        setErrorMessage("Invalid server response.");
        return;
      }

      if (result.status === "success") {
        // Store session data
        sessionStorage.setItem("email", credentials.email);
        sessionStorage.setItem('isLogin', true);
        // Redirect to dashboard
        router.push("/dashboard");
      } else {
        setErrorMessage(result.message);
      }
    } catch (error) {
      setErrorMessage("Network error. Please try again.");
    }
  };
 

  return (
    <div className="min-h-screen flex items-center justify-center bg-gray-50">
      <div className="bg-white p-8 rounded-lg shadow-md max-w-sm w-full">
        <h2 className="text-2xl font-semibold text-center mb-6">Admin Login</h2>
        {errorMessage && <p className="text-red-500 text-center mb-4">{errorMessage}</p>}
        <form onSubmit={handleLogin} className="space-y-4">
          <div>
            <input
              type="email"
              placeholder="Email"
              value={credentials.email}
              onChange={(e) => setCredentials({ ...credentials, email: e.target.value })}
              required
              className="w-full p-3 border border-gray-300 rounded-md focus:outline-none focus:ring-2 focus:ring-blue-500"
            />
          </div>
          <div>
            <input
              type="password"
              placeholder="Password"
              value={credentials.password}
              onChange={(e) => setCredentials({ ...credentials, password: e.target.value })}
              required
              className="w-full p-3 border border-gray-300 rounded-md focus:outline-none focus:ring-2 focus:ring-blue-500"
            />
          </div>
          <div>
            <button
              type="submit"
              className="w-full bg-blue-500 text-black py-3 rounded-md hover:bg-blue-600 focus:outline-none focus:ring-2 focus:ring-blue-500"
            >
              Login
            </button>
          </div>
        </form>
      </div>
    </div>
  );
}
