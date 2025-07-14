// CREAR .env en la carpeta front. front/.env
// CREAR variable VITE_SERVICES_URL y el valor es vuestro backend
const mainURL = import.meta.env.VITE_SERVICES_URL;
const isskey = import.meta.env.VITE_ISS_KEY;

const getEventsFromAPI = async () => {
  const response = await fetch(`${mainURL}/events`, {
    method: 'GET'
  });
  const data = await response.json();
  return data;
}

const getCategories = (list) => {
  if (Array.isArray(list) && list.length > 0) {
    const data = {}
    for (const register of list) {
      if (register.category in data) {
        data[register.category]++
      } else {
        data[register.category] = 1
      }
    }
    return data
  }
  return
}

const getISSPasses = async (latitude, longitude) => {
  const response = await fetch(`${mainURL}/isspasses`, {
    method: 'POST',
    headers: { 'Content-Type': 'application/json' },
    body: JSON.stringify({ latitude, longitude })
  });

  if (!response.ok) {
    const errorData = await response.json();
    throw Error(errorData.msg || "Error al solicitar pasos de la ISS");
  }

  const data = await response.json();
  return data
}

const getAboveSatellites = async (latitude, longitude) => {
  const response = await fetch(`https://api.n2yo.com/rest/v1/satellite/above/${latitude}/${longitude}/700/70/18/&apiKey=${isskey}`)
  const data = await response.json()
  return data.info
}

export { getEventsFromAPI, getCategories, getISSPasses, getAboveSatellites }