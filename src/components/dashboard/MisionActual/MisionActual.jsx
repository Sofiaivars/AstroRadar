import { useEffect, useState } from "react";
import { TriangleAlert } from "lucide-react";
import { useNavigate } from "react-router";
import AstroButton from "@components/shared/AstroButton";

const MisionActual = () => {
  const [activeMission, setActiveMission] = useState()
  const missionName = activeMission ? activeMission.event.name : "Activa una misión";
  const missionStatus = activeMission ? activeMission.state : <TriangleAlert/>;
  const location = activeMission ? activeMission.base.base_name : "";

  const navigate = useNavigate()

  const handleClick = () => {
    if(activeMission){
      if(activeMission.base.id){
        navigate('/dashboard/missions/step2')
      }else{
        navigate('/dashboard/missions/')
      }
    }else{
      navigate('/dashboard')
    }
  };

  useEffect(() => {
    console.log(activeMission)
  }, [activeMission])

  return (
    <div className="rounded-[16px] w-full sm:w-1/2 h-70 borde-con-degradado">
      <div
        className="relative w-full h-full rounded-[16px] overflow-hidden shadow-lg text-white font-poppins"
        style={{
          backgroundImage: `url(${activeMission && activeMission.image ? activeMission.image : "https://media.istockphoto.com/id/157639696/photo/purple-space-stars.jpg?s=612x612&w=0&k=20&c=fkLtGZxUS9UPlLJUTeGjvvURT0u-vtxvj5sAYbDNrH4="})`,
          backgroundSize: "cover",
          backgroundPosition: "center",
          backgroundColor: "rgba(0,0,0,0.7)",
        }}
      >
        <div className="relative z-10 flex flex-col justify-between h-full p-6">
          <div className="flex flex-col">
            <div className="self-start">
              <span className="text-md font-normal">{missionStatus}</span>
            </div>
            <div className="self-end text-right mt-2">
              <h2 className="text-xl font-semibold">{missionName}</h2>
              <p className="text-base">{location}</p>
            </div>
          </div>

          <div className="flex justify-end">
            <AstroButton text="Continuar misión" handleClick={handleClick}/>
          </div>
        </div>
      </div>
    </div>
  );
};

export default MisionActual;
