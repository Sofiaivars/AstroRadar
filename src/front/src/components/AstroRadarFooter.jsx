import { useNavigate } from "react-router"

function AstroRadarFooter() {
  const navigate = useNavigate()

  return(
    <div className="flex text-sm gap-5">
      <p className="opacity-40">&copy; 2025 AstroRadar Team</p>
      <p className="opacity-40">|</p>
      <p className="hover:text-purple-50 opacity-40 hover:opacity-100 cursor-pointer" onClick={() => navigate("/about-us")}>About Us</p>
    </div>
  )
}

export default AstroRadarFooter