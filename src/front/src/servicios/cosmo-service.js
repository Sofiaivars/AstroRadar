// CREAR .env en la carpeta front. front/.env
// CREAR variable VITE_SERVICES_URL y el valor es vuestro backend
const mainURL = import.meta.env.VITE_SERVICES_URL;

const cosmoTipCall = async (prompt) => {
  const response = await fetch(`${mainURL}/cosmotip`, {
    method: "POST",
    headers: {
      "Content-Type": "application/json",
    },
    body: JSON.stringify({ prompt }),
  });
  const data = await response.json();
  return data ?? data;
};

const getJSONCoords = async (latitude, longitude) => {
  const response = await fetch(`${mainURL}/getjson`, {
    method: "POST",
    headers: {
      "Content-Type": "application/json",
    },
    body: JSON.stringify({ latitude, longitude }),
  });

  const data = await response.json();
  return data;
};

export { cosmoTipCall, getJSONCoords };
