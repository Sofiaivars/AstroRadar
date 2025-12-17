import { useSelector } from "react-redux";
import { Navigate } from "react-router";

export default function ProtectedRoute({children}){
  const userData = useSelector((state) => state.userData)
  const hasData = Object.values(userData).some(value => value !== null)

  if(!hasData) return <Navigate to='/' replace/>

  return children
}