const cosmoTipCall = async () => {
  const response = await fetch(`https://glowing-train-74xxpggwgrghw67j-3001.app.github.dev/cosmotip`);

  const data = await response.json();
  return data;
}

export { cosmoTipCall }