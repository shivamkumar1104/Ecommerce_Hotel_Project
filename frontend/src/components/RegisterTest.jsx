import { useState } from "react";

function RegisterTest() {
  const [message, setMessage] = useState("");
  const [loading, setLoading] = useState(false);
  const [password, setPassword] = useState("Password@123");
  const [name, setName] = useState("Test User");
  const [responseDetails, setResponseDetails] = useState(null);
  const [isMinimized, setIsMinimized] = useState(false);

  const handleRegister = async (customPwd = null) => {
    const pwdToUse = customPwd !== null ? customPwd : password;
    setLoading(true);
    setMessage("Sending request to backend...");
    setResponseDetails(null);

    const payload = {
      name: name || "Test User",
      email: `test${Date.now()}@example.com`,
      password: pwdToUse,
    };

    try {
      const response = await fetch("http://localhost:5000/api/auth/register", {
        method: "POST",
        headers: {
          "Content-Type": "application/json",
        },
        body: JSON.stringify(payload),
      });

      const data = await response.json();

      console.log("Backend Response:", data);
      setMessage(data.message || (data.success ? "User registered successfully" : "Request failed"));
      setResponseDetails({ status: response.status, ...data });
    } catch (error) {
      console.error("Register Error:", error);
      setMessage("Backend se connection failed (Make sure backend is running on port 5000)");
    } finally {
      setLoading(false);
    }
  };

  if (isMinimized) {
    return (
      <button
        onClick={() => setIsMinimized(false)}
        className="fixed bottom-6 right-6 z-50 px-4 py-2 bg-hotel-emerald text-white rounded-full shadow-2xl text-xs font-semibold tracking-wider flex items-center gap-2 hover:bg-hotel-emerald-dark transition-all border border-hotel-gold/30"
      >
        <span className="w-2 h-2 rounded-full bg-emerald-400 animate-pulse"></span>
        Open Register Tester
      </button>
    );
  }

  return (
    <div className="fixed bottom-6 right-6 z-50 bg-white/95 backdrop-blur-md border border-hotel-gold/40 shadow-2xl rounded-2xl p-4 max-w-sm w-full text-hotel-dark font-sans text-xs">
      <div className="flex items-center justify-between pb-2 border-b border-gray-100">
        <div className="flex items-center gap-2">
          <span className="w-2.5 h-2.5 rounded-full bg-emerald-500 animate-pulse"></span>
          <h4 className="font-serif font-bold uppercase tracking-wider text-hotel-emerald">
            Register Test Tool
          </h4>
        </div>
        <div className="flex items-center gap-2">
          <span className="text-[10px] bg-hotel-cream text-hotel-gold px-1.5 py-0.5 rounded font-mono">
            :5000/api/auth/register
          </span>
          <button
            onClick={() => setIsMinimized(true)}
            className="text-gray-400 hover:text-gray-600 font-bold px-1"
            title="Minimize"
          >
            ✕
          </button>
        </div>
      </div>

      <div className="mt-3 space-y-2">
        <div>
          <label className="text-[11px] text-gray-500 font-medium">Test Name:</label>
          <input
            type="text"
            value={name}
            onChange={(e) => setName(e.target.value)}
            className="w-full mt-0.5 px-2.5 py-1.5 border border-gray-200 rounded-lg text-xs focus:outline-none focus:border-hotel-gold"
          />
        </div>

        <div>
          <label className="text-[11px] text-gray-500 font-medium flex justify-between">
            <span>Password to Test:</span>
            <span className="text-[10px] text-gray-400">Schema requires 8-12 chars, upper, lower, num, symbol</span>
          </label>
          <input
            type="text"
            value={password}
            onChange={(e) => setPassword(e.target.value)}
            className="w-full mt-0.5 px-2.5 py-1.5 border border-gray-200 rounded-lg text-xs font-mono focus:outline-none focus:border-hotel-gold"
          />
        </div>

        {/* Action Buttons */}
        <div className="grid grid-cols-2 gap-2 pt-1">
          <button
            onClick={() => handleRegister(password)}
            disabled={loading}
            className="w-full py-2 px-3 rounded-lg bg-hotel-emerald hover:bg-hotel-emerald-dark text-white font-semibold transition shadow disabled:opacity-50"
          >
            {loading ? "Sending..." : "Test Register"}
          </button>

          <button
            onClick={() => {
              setPassword("123456");
              handleRegister("123456");
            }}
            disabled={loading}
            className="w-full py-2 px-3 rounded-lg bg-gray-100 hover:bg-gray-200 text-gray-700 font-semibold transition disabled:opacity-50"
            title="Test with 123456 to see schema validator response"
          >
            Test "123456"
          </button>
        </div>

        {/* Response Feedback */}
        {message && (
          <div
            className={`mt-2 p-2.5 rounded-lg border leading-relaxed ${
              responseDetails?.success
                ? "bg-emerald-50 text-emerald-900 border-emerald-200"
                : "bg-amber-50 text-amber-900 border-amber-200"
            }`}
          >
            <p className="font-semibold break-words">{message}</p>
            {responseDetails?.user?.email && (
              <p className="text-[10px] text-emerald-700 mt-1 truncate">
                Created Email: {responseDetails.user.email}
              </p>
            )}
            {responseDetails?.status && (
              <span className="inline-block mt-1 text-[10px] font-mono px-1.5 py-0.2 rounded bg-white/70">
                HTTP {responseDetails.status}
              </span>
            )}
          </div>
        )}
      </div>
    </div>
  );
}

export default RegisterTest;
