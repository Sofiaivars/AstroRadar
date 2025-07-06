import { Github, Linkedin } from "lucide-react";
import "./AboutUs.css";
import adri from "./assest/adri-cosmificado.png";
import arroba from "./assest/arroba-cosmificado.png";
import juan from "./assest/juan-cosmificado.png";
import logo from "./assest/logo-esquina.png";
import sofi from "./assest/sofi-cosmoficado.png";

function AboutUs() {
  return (
    <div>
      <div className="flex items-center gap-4 justify-end mb-6">
        <img src={logo} width={250}  alt="" class="" />
      </div>
      <h1 className="text-2xl font-bold text-center mb-6">ABOUT US</h1>
      <div class="flex gap-4 p-4 ">
        <div class=" text-white p-4 rounded">
          {" "}
          <img src={arroba} width={350} alt="" />
          <h1 className="text-2xl font-bold text-center mb-6" >ANTONIO J.M. "EL ARROBA"</h1>
          <p className="text-2xl font-bold text-center mb-6"> FullStack Developer</p>
          <div className="flex justify-center gap-4 text-xl text-white mt-2" ><Github size={40} /> <Linkedin size={40}/></div>
        </div>
        <div class=" text-white p-4 rounded">
          <img src={sofi} width={350} alt="" />
          <h1 className="text-2xl font-bold text-center mb-6" >SOFIA IVARS</h1>
          <p className="text-2xl font-bold text-center mb-6"> FullStack Developer</p>
          <div className="flex justify-center gap-4 text-xl text-white mt-2" ><Github size={40} /> <Linkedin size={40}/></div>
        </div>
        <div class=" text-white p-4 rounded">
          <img src={juan} width={350} alt="" />
          <h1 className="text-2xl font-bold text-center mb-6" >JUAN D.B.FAURA</h1>
          <p className="text-2xl font-bold text-center mb-6"> FullStack Developer</p>
          <div className="flex justify-center gap-4 text-xl text-white mt-2" ><Github size={40} /> <Linkedin size={40}/></div>
          
        </div>
        <div class=" text-white p-4 rounded">
          <img src={adri} width={350} alt="" />
          <h1 className="text-2xl font-bold text-center mb-6" >ADRIAN ESTEVEZ S.</h1>
          <p className="text-2xl font-bold text-center mb-6"> FullStack Developer</p>
          <div className="flex justify-center gap-4 text-xl text-white mt-2" ><Github size={40} /> <Linkedin size={40} /></div>
        </div>
      </div>
    </div>
  );
}

export default AboutUs;
