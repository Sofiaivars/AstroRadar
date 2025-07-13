import { useEffect, useState } from 'react'
import RankingCard from './RankingCard'
import './RankingMain.css'
import { getUsersFromDatabase } from '../../../servicios/login-service'
import LoaderMini from '../../loaders/LoaderMini.jsx'

function RankingMain(){
  const [usersData, setUsersData] = useState()

  useEffect(() => {
    const getUsersListFromAPI = async () => {
      const users = await getUsersFromDatabase()
      setUsersData(users)
    }
    getUsersListFromAPI()
  }, [])

  return(
    // Este div hace que la scrollbar no sobresalga del marco
    <div className='h-60 w-3/4 overflow-hidden'>
      <div className="flex flex-col gap-1 overflow-y-auto h-full p-1 rankingList">
        {usersData 
          ? usersData.map((user, index) => {
              return <RankingCard 
                      key={`${index}${user.name}${user.lastName}`}
                      position={index + 1} 
                      name={user.name} 
                      lastName={user.lastname} 
                      country={user.country} 
                      city={user.city} 
                      achievements={"¿?"}
                      image={user.image}
                    />
            }
          )
          : <LoaderMini/>
        }
      </div>
    </div>
  )
}

export default RankingMain