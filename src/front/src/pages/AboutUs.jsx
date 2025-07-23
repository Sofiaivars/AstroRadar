import { Github, Linkedin } from "lucide-react";
import "./AboutUs.css";
import adri from "./assest/adri-cosmificado.png";
import arroba from "./assest/arroba-cosmificado.png";
import juan from "./assest/juan-cosmificado.png";
import sofi from "./assest/sofi-cosmoficado.png";
import { useNavigate } from "react-router";

function AboutUs() {
  const navigate = useNavigate();

  return (
    <div className="z-10">
      <h1 className="text-2xl font-bold text-center mb-6">ABOUT US</h1>
      <div className="flex flex-col justify-center items-center">
        <div class="flex gap-4 p-4 ">
          <div class=" text-white p-4 rounded">
            {" "}
            <img src={arroba} width={350} alt="" />
            <h1 className="text-2xl font-bold text-center mb-6">
              ANTONIO J.M. "EL ARROBA"
            </h1>
            <p className="text-2xl font-bold text-center mb-6">
              {" "}
              FullStack Developer
            </p>
            <div className="flex justify-center gap-4 text-xl text-white mt-2">
              <a
                href="https://github.com/Tonimir10"
                target="_blank"
                rel="noopener noreferrer"
              >
                <Github size={40} className="hover:text-purple-500" />
              </a>
              <a href="" target="_blank" rel="noopener noreferrer">
                <Linkedin size={40} className="hover:text-cyan-500" />
              </a>
            </div>
          </div>
          <div class=" text-white p-4 rounded">
            <img src={sofi} width={350} alt="" />
            <h1 className="text-2xl font-bold text-center mb-6">SOFIA IVARS</h1>
            <p className="text-2xl font-bold text-center mb-6">
              {" "}
              FullStack Developer
            </p>
            <div className="flex justify-center gap-4 text-xl text-white mt-2">
              <a
                href="https://github.com/Sofiaivars"
                target="_blank"
                rel="noopener noreferrer"
              >
                <Github size={40} className="hover:text-purple-500" />
              </a>
              <a
                href="https://www.linkedin.com/in/sofia-ivars/"
                target="_blank"
                rel="noopener noreferrer"
              >
                <Linkedin size={40} className="hover:text-cyan-500" />
              </a>
            </div>
          </div>
          <div class=" text-white p-4 rounded">
            <img src={juan} width={350} alt="" />
            <h1 className="text-2xl font-bold text-center mb-6">
              JUAN D.B.FAURA
            </h1>
            <p className="text-2xl font-bold text-center mb-6">
              {" "}
              FullStack Developer
            </p>
            <div className="flex justify-center gap-4 text-xl text-white mt-2">
              <a
                href="https://github.com/JDBF1011"
                target="_blank"
                rel="noopener noreferrer"
              >
                <Github size={40} className="hover:text-purple-500" />
              </a>
              <a href="" target="_blank" rel="noopener noreferrer">
                <Linkedin size={40} className="hover:text-cyan-500" />
              </a>
            </div>
          </div>
          <div class=" text-white p-4 rounded">
            <img src={adri} width={350} alt="" />
            <h1 className="text-2xl font-bold text-center mb-6">
              ADRIAN ESTEVEZ S.
            </h1>
            <p className="text-2xl font-bold text-center mb-6">
              {" "}
              FullStack Developer
            </p>
            <div className="flex justify-center gap-4 text-xl text-white mt-2">
              <a
                href="https://github.com/Adr1Est"
                target="_blank"
                rel="noopener noreferrer"
              >
                <Github size={40} className="hover:text-purple-500" />
              </a>
              <a
                href="https://www.linkedin.com/in/adri%C3%A1n-est%C3%A9vez-salamanca-26b512163/"
                target="_blank"
                rel="noopener noreferrer"
              >
                <Linkedin size={40} className="hover:text-cyan-500" />
              </a>
            </div>
          </div>
        </div>

        <button
          className="hover:bg-purple-950 p-3 rounded-3xl transition-colors duration-300 cursor-pointer"
          onClick={() => navigate("/dashboard")}
        >
          Inicio
        </button>
      </div>
    </div>
  );
}

export default AboutUs;
