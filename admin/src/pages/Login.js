import {useState, useContext } from "react";
import StoreContext from "../context/StoreContext";
import { toast } from "react-toastify";
import { useNavigate } from "react-router-dom";

const Login = () => {
     const [formdata, setFormdata] = useState({});

  const navigate = useNavigate();
  

  const {   errors, setErrors, setSuccess, login} =
    useContext(StoreContext);

     const handleChange = (e) => {
  setFormdata({
    ...formdata,
    [e.target.name]: e.target.value
  });
};

  const validate = () => {
    const { email, password } = formdata;
    if (!email || !password) return "All fields are required";
    if (password.length < 5) return "Password must be at least 5 characters";
     return null;
  };

  const handleOnSubmit = async (e) => {
    e.preventDefault();

    setErrors("");
    setSuccess("");

    const validationErrors = validate();
    if (validationErrors) {
      setErrors(validationErrors);
      return;
    }
    try {
      const response = await fetch(
        `${process.env.REACT_APP_API_URL}/api/users/login`,
        {
          method: "POST",
          headers: { "Content-Type": "application/json" },
          body: JSON.stringify(formdata),
        }
      );
      if (!response.ok) {
        const errorData = await response.json();
        toast.error(errorData.message || "Something went wrong!");
        return;
      }
      const data = await response.json();
      const token = data.Token;
      localStorage.setItem("Token", token);
      await login();
      
      toast.success(data.message || "Login successful!");
      console.log("Login Successfull", "New User Data:", data);
      setFormdata({  email: "", password: "" });
      navigate("/dashboard");
    } catch (error) {
      console.error(error);
      toast.error("Unable to connect to server");
    }
  };
  return (
    <div
      className="d-flex justify-content-center align-items-center"
      style={{ height: "100vh", backgroundColor: "#f8f9fa" }}
    >
      <div
        className="card p-4 shadow-lg"
        style={{ width: "380px", borderRadius: "12px" }}
      >
        <h3 className="text-center mb-4 fw-bold">Login</h3>

        {/* {success && <div className="alert alert-success">{success}</div>} */}
        {errors && <div className="alert alert-danger">{errors}</div>}

        <form onSubmit={handleOnSubmit}>
          <div className="mb-3">
            <label htmlFor="email" className="form-label fw-semibold">
              Email
            </label>
            <input
              type="email"
              className="form-control"
              name="email"
              value={formdata.email}
              onChange={handleChange}
              id="email"
              placeholder="Enter your email"
            />
          </div>

          <div className="mb-3">
            <label htmlFor="password" className="form-label fw-semibold">
              Password
            </label>
            <input
              type="password"
              name="password"
              value={formdata.password}
              className="form-control"
              onChange={handleChange}
              id="password"
              placeholder="Create a password"
            />
          </div>

          <button className="btn btn-primary w-100 mt-2">Login</button>
        </form>
      </div>
    </div>
  );
};

export default Login;
