import { useEffect, useState } from "react";
import { login } from "../services/index";
import { useNavigate } from "react-router-dom";

export default function Login() {
  // if token is available then no need for again login
  const navigate = useNavigate();

  useEffect(() => {
    const token = localStorage.getItem('token')
    if (token) {
      // alert("already logged in");
      navigate("/home");
    }
  }, []);

  const [loginFormData, setLoginFormData] = useState({
    email: "",
    password: "",
  });

  const handleLogin = async (e) => {
    e.preventDefault();
    const res = await login(loginFormData);
    if (res.status === 200) {
      const data = await res.json();
      localStorage.setItem("token", data.token);
      alert("logged in successfully");
      navigate("/home");
    } else {
      console.log(res);
      alert("error");
    }
  };

  return (
    <>
      <form onSubmit={handleLogin}>
        <input
          type="email"
          onChange={(e) =>
            setLoginFormData({
              ...loginFormData,
              [e.target.name]: e.target.value,
            })
          }
          value={loginFormData.name}
          name="email"
          placeholder="enter email"
        />
        <input
          type="password"
          onChange={(e) =>
            setLoginFormData({
              ...loginFormData,
              [e.target.name]: e.target.value,
            })
          }
          value={loginFormData.password}
          name="password"
          placeholder="enter password"
        />
        <button type="submit">Submit</button>
      </form>
    </>
  );
}
