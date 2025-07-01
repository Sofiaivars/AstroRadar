import RankingCard from './RankingCard'
import './RankingMain.css'

function RankingMain(){
  const rankingMockData = [
    { name: "Carloncho", lastName: "Suarez", location: "Sueca", city: "Valencia", achievements: 123, image:"https://sociable.co/wp-content/uploads/2019/06/galaxy-telescope.jpg" },
    { name: "María", lastName: "González", location: "Triana", city: "Sevilla", achievements: 98, image:"https://upload.wikimedia.org/wikipedia/commons/b/b8/Laser_Towards_Milky_Ways_Centre.jpg"},
    { name: "Luis", lastName: "Martínez", location: "Gràcia", city: "Barcelona", achievements: 110, image:"https://ichef.bbci.co.uk/ace/standard/976/cpsprodpb/14E7A/production/_109062658_hi048321534.jpg" },
    { name: "Ana", lastName: "López", location: "Chamberí", city: "Madrid", achievements: 105, image:"https://resources.perimeterinstitute.ca/cdn/shop/products/Gr6SpaceImageStore.png?v=1603818769" },
    { name: "Pedro", lastName: "Ramírez", location: "Casco Antiguo", city: "Zaragoza", achievements: 89, image:"https://astronomyaustralia.org.au/wp-content/uploads/2024/02/First-all-sky-data-release-image.jpeg" },
    { name: "Lucía", lastName: "Hernández", location: "Gros", city: "San Sebastián", achievements: 115, image:"https://www.astronomyforbeginners.com/wp-content/uploads/2019/12/astronomy-facts.jpg" },
    { name: "Javier", lastName: "Serrano", location: "Elviña", city: "A Coruña", achievements: 100, image:"https://assets-prd.ignimgs.com/2024/09/04/astro-bot-review-blog-1725456007634.jpg" },
    { name: "Carmen", lastName: "Navarro", location: "Ensanche", city: "Murcia", achievements: 94, image:"https://alphauniverseglobal.media.zestyio.com/Alpha-Universe-Original_JPEG---Full-size--highest-quality.jpg" },
    { name: "Diego", lastName: "Ortiz", location: "El Carmen", city: "Oviedo", achievements: 121, image:"https://concepto.de/wp-content/uploads/2019/04/galaxia-universo-1-e1554807715900.jpg" },
    { name: "Elena", lastName: "Moreno", location: "Ruzafa", city: "Valencia", achievements: 87, image:"https://preview.redd.it/astro-fanart-v0-zskrmtxrx1ve1.jpeg?width=640&crop=smart&auto=webp&s=c509f64071f3c5f9938bf6205a6f84532b08debd" },
    { name: "Raúl", lastName: "Vega", location: "Centro", city: "Málaga", achievements: 102, image:"https://encrypted-tbn0.gstatic.com/images?q=tbn:ANd9GcR8q0x7YVmFAZqM_9g-7zQEioAq898ZRz1Hgg&s" },
    { name: "Isabel", lastName: "Medina", location: "La Macarena", city: "Sevilla", achievements: 111, image:"https://iso.500px.com/wp-content/uploads/2020/05/stock-photo-mt-bromo-under-the-stars-46785278-1.jpg" },
    { name: "Sergio", lastName: "Ruiz", location: "Iturrama", city: "Pamplona", achievements: 95, image:"https://images.squarespace-cdn.com/content/v1/54b79568e4b0f32f8251d16b/1529473792660-TYJWSI1CUQLEU14VFA62/edited+on+phone+only" },
    { name: "Patricia", lastName: "Cano", location: "Artxanda", city: "Bilbao", achievements: 108, image:"https://encrypted-tbn0.gstatic.com/images?q=tbn:ANd9GcT99I1fsnKnH266lHsROsLl6Hi7uIIaZxnxDk6zbZC6SZATe2tzlDBh-4hlLjT5Fl_2Bg8&usqp=CAU" },
    { name: "Miguel", lastName: "Torres", location: "El Toscal", city: "Santa Cruz de Tenerife", achievements: 99, image:"https://phillipreeve.net/blog/wp-content/uploads/2018/05/sigma_35.jpg" }
  ]

  const datosOrdenadosPorLogro = rankingMockData.sort((a, b) => b.achievements - a.achievements)

  return(
    // Este div hace que la scrollbar no sobresalga del marco
    <div className='h-70 w-120 overflow-hidden'>
      <div className="flex flex-col gap-1 overflow-y-auto h-full p-3 rankingList">
        {datosOrdenadosPorLogro.map((user, index) => {
          return <RankingCard 
                    position={index + 1} 
                    name={user.name} 
                    lastName={user.lastName} 
                    location={user.location} 
                    city={user.city} 
                    achievements={user.achievements}
                    image={user.image}
                  />
        })}
      </div>
    </div>
  )
}

export default RankingMain