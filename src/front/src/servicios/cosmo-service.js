// URL LOCAL: http://localhost:3001
const mainURL = "http://localhost:3001"

const cosmoTipCall = async () => {
  const response = await fetch(`${mainURL}/cosmotip`);

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

export { cosmoTipCall, getJSONCoords }