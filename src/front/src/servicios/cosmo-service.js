// CREAR .env en la carpeta front. front/.env
// CREAR variable VITE_SERVICES_URL y el valor es vuestro backend
const mainURL = import.meta.env.VITE_SERVICES_URL;

const cosmoTipCall = async () => {
  const response = await fetch(`${mainURL}/cosmotip`);

  const data = await response.json();
  return data;
}

const cosmoStep1TipCall = async (eventoAstronomico) => {
  const response = await fetch(`${mainURL}/cosmostep1`, {
    method: 'POST',
    headers: { "Content-Type": "application/json" },
    body: JSON.stringify({ eventName: eventoAstronomico })
  });
  const data = await response.json();
  return data;
}

const getJSONCoords = async (latitude, longitude) => {
  const response = await fetch(`${mainURL}/getjson`, {
    method: 'POST',
    headers: {
      "Content-Type": "application/json"
    },
    body: JSON.stringify({ latitude, longitude })
  });

  const data = await response.json();
  return data;
}

export { cosmoTipCall, getJSONCoords, cosmoStep1TipCall }