const mainURL = "https://urban-zebra-74xxpggwq9ghrp4j-3001.app.github.dev"

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