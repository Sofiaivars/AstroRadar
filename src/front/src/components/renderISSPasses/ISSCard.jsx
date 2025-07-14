function ISSCard({issImg}){

  return(
    <div className="flex rounded-2xl w-full items-center gap-3 text-sm border-b-2 border-purple-800">
      <div className="flex w-50 max-h-33 rounded-l-2xl overflow-hidden">
        <img src={issImg} alt="iss image" />
      </div>
      <p>Próximo paso de la ISS</p>
    </div>
  )
}

export default ISSCard