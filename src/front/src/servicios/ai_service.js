const askAi = async (latitude, longitude) => {
  const response = await fetch('https://glowing-train-74xxpggwgrghw67j-3001.app.github.dev/askai', {
    method: 'POST',
    headers: {
      "Content-Type": "application/json"
    },
    body: JSON.stringify({ latitude, longitude })
  });

  const data = await response.json();
  return data;
}

export { askAi };