import { useEffect, useState } from "react";
import LoginButton from "./LoginButton";
import { useNavigate } from "react-router";
import { login } from "../../servicios/login-service";
import { Eye, EyeClosed } from "lucide-react";
import { FaGoogle, FaFacebook, FaGithub } from "react-icons/fa";

function LoginForm() {
  const [username, setUsername] = useState("");
  const [password, setPassword] = useState("");
  const [errorAtLogin, setErrorAtLogin] = useState(false);
  const [inputPassType, setInputPassType] = useState("password");
  const navigate = useNavigate();

  const handleInputChange = (event) => {
    const { id, value } = event.target;

    if (id === "login-username") {
      return setUsername(value);
    }
    if (id === "login-password") {
      return setPassword(value);
    }
  };

  const handleClick = async (username, password) => {
    if (!username || !password) {
      setErrorAtLogin(true);
      return;
    }

    try {
      const dataFromLogin = await login(username, password);
      console.log(dataFromLogin);
      navigate("/dashboard");
    } catch (error) {
      setErrorAtLogin(true);
      console.log(`Error en el login => ${error}`);
    }
  };

  const handlePasswordInput = () => {
    if (inputPassType === "password") {
      return setInputPassType("text");
    }
    return setInputPassType("password");
  };

  return (
    <>
      <div className="flex flex-col p-3 rounded-2xl borde-con-degradado justify-between shadow-lg shadow-purple-300 login-card">
        <h1 className="text-center text-lg mt-2 mb-5 subtitle">
          ¡Nos alegra volverte a ver!
        </h1>
        <div className="flex flex-col gap-3">
          <input
            type="text"
            className={`p-2 rounded-2xl  ${
              errorAtLogin ? "border-1 border-red-400" : ""
            } login-inputs`}
            id="login-username"
            placeholder="Nombre de usuario"
            value={username}
            onChange={handleInputChange}
          />
          <div className="flex w-full items-center relative">
            <input
              type={inputPassType}
              className={`p-2 rounded-2xl ${
                errorAtLogin ? "border-1 border-red-400" : ""
              } w-full login-inputs`}
              id="login-password"
              placeholder="Password"
              value={password}
              onChange={handleInputChange}
            />
            <button
              className="absolute right-0 me-3 cursor-pointer"
              onClick={handlePasswordInput}
            >
              {inputPassType === "password" ? <Eye /> : <EyeClosed />}
            </button>
          </div>
          <div className="flex gap-1 options">
            <input type="checkbox" id="recordar-pass" />
            <label className="" for="recordar-pass">
              Recordar
            </label>
          </div>
          <p
            className={`text-xs text-center text-red-400 ${
              errorAtLogin ? "" : "hidden"
            }`}
          >
            nombre de usuario y/o contraseña incorrectos
          </p>
          <LoginButton handleClick={() => handleClick(username, password)} />
          <div className="flex justify-between">
            <a href="#" className="hover:text-purple-400 text-sm forgot">
              Olvidaste la contraseña?
            </a>
            <button
              className="hover:text-purple-400 text-sm cursor-pointer"
              onClick={() => navigate("/signup")}
            >
              No tengo cuenta
            </button>
          </div>
        </div>

        <div className="flex flex-col justify-center items-center gap-3">
          <div className="divider">
            <span>O</span>
          </div>
          <div className="flex justify-center gap-3 w-full social-login">
            <button className="hover:scale-110 transition-transform duration-300 cursor-pointer rounded-full bg-white shadow p-2">
              <FaGoogle className="w-6 h-6 text-gray-800" />
            </button>

            <button className="hover:scale-110 transition-transform duration-300 cursor-pointer rounded-full bg-white shadow p-2">
              <FaFacebook className="w-6 h-6 text-blue-800" />
            </button>

            <button className="hover:scale-110 transition-transform duration-300 cursor-pointer rounded-full bg-white shadow p-2">
              <FaGithub className="w-6 h-6 text-gray-800" />
            </button>
          </div>

          <div className="flex gap-3 text-sm footer-links">
            <a href="#" className="hover:text-purple-500">
              Terms & Conditions
            </a>
            <a href="#" className="hover:text-purple-500">
              Support
            </a>
            <a href="#" className="hover:text-purple-500">
              Customer Care
            </a>
          </div>
        </div>
      </div>
    </>
  );
}

export default LoginForm;
