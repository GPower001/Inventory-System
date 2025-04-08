


import  { useState } from "react";
import "bootstrap/dist/css/bootstrap.min.css";
import "bootstrap/dist/js/bootstrap.bundle.min";
import axios from "axios";
import { useNavigate } from "react-router-dom";  
import "./login.css";

function Login() {
    const [isRegistering, setIsRegistering] = useState(false);
    const [formData, setFormData] = useState({
        name: "",
        email: "",
        password: "",
    });
    const [loading, setLoading] = useState(false);
    const [error, setError] = useState("");
    const navigate = useNavigate();  // For navigation without page reload

    const handleChange = (e) => {
        setFormData({ ...formData, [e.target.name]: e.target.value });
    };

    const handleSubmit = async (e, type) => {
        e.preventDefault();
        setLoading(true);
        setError("");

        try {
         
            const endpoint = type === "register" ? "/register" : "/login";
            const response = await axios.post(
                `${import.meta.env.VITE_API_URL}${endpoint}`, // ✅ Will become http://localhost:2000/api/auth/register
                formData,
                { withCredentials: true }
            );
            

            console.log("Response:", response.data);
            alert(response.data.message || "Success!");

            if (type === "login") {
                localStorage.setItem("authToken", response.data.token);
                navigate("/dashboard"); 
            }
        } catch (err) {
            setError(err.response?.data?.message || "An error occurred");
        } finally {
            setLoading(false);
        }
    };

    return (
        <div className={`content d-flex shadow-lg ${isRegistering ? "active" : ""}`} id="content">
            {/* Registration Form */}
            <div className="col-md-6 d-flex justify-content-center">
                <form onSubmit={(e) => handleSubmit(e, "register")}>
                    <div className="header-text mb-4">
                        <h1>Register</h1>
                    </div>
                    <div className="input-group mb-3">
                        <input type="text" name="name" placeholder="Name" className="form-control form-control-lg" value={formData.name} onChange={handleChange} required />
                    </div>
                    <div className="input-group mb-3">
                        <input type="email" name="email" placeholder="Email" className="form-control form-control-lg" value={formData.email} onChange={handleChange} required />
                    </div>
                    <div className="input-group mb-3">
                        <input type="password" name="password" placeholder="Password" className="form-control form-control-lg" value={formData.password} onChange={handleChange} required />
                    </div>
                    {error && <p className="text-danger">{error}</p>}
                    <div className="input-group mb-3 justify-content-center">
                        <button type="submit" className="btn border-white text-white w-50 fs-6" disabled={loading}>
                            {loading ? "Registering..." : "REGISTER"}
                        </button>
                    </div>
                </form>
            </div>

            {/* Login Form */}
            <div className={`col-md-6 right-box ${isRegistering ? "d-none" : ""}`}>
                <form onSubmit={(e) => handleSubmit(e, "login")}>
                    <div className="header-text mb-4">
                        <h1>Log In</h1>
                    </div>
                    <div className="input-group mb-3">
                        <input type="email" name="email" placeholder="Email" className="form-control form-control-lg" value={formData.email} onChange={handleChange} required />
                    </div>
                    <div className="input-group mb-3">
                        <input type="password" name="password" placeholder="Password" className="form-control form-control-lg" value={formData.password} onChange={handleChange} required />
                    </div>
                    <div className="input-group mb-5 d-flex justify-content-between">
                        <div className="form-check">
                            <input type="checkbox" className="form-check-input" />
                            <label className="form-check-label text-secondary">
                                <small>Remember me</small>
                            </label>
                        </div>
                        <div className="forgot">
                            <small><a href="#">Forgot password?</a></small>
                        </div>
                    </div>
                    {error && <p className="text-danger">{error}</p>}
                    <div className="input-group mb-3 justify-content-center">
                        <button type="submit" className="btn border-white text-white w-50 fs-6" disabled={loading}>
                            {loading ? "Logging in..." : "LOGIN"}
                        </button>
                    </div>
                </form>
            </div>

            {/* Switch Panel */}
            <div className="switch-content">
                <div className="switch">
                    <div className="switch-panel switch-left">
                        <h1>Hello</h1>
                        <p>We are happy to see you back</p>
                        <button className="btn border-white text-white w-50 fs-6" onClick={() => setIsRegistering(false)}>
                            LOGIN
                        </button>
                    </div>
                    <div className="switch-panel switch-right">
                        <h1>Welcome</h1>
                        <p>Sign Up</p>
                        <button className="btn border-white text-white w-50 fs-6" onClick={() => setIsRegistering(true)}>
                            REGISTER
                        </button>
                    </div>
                </div>
            </div>
        </div>
    );
}

export default Login;
