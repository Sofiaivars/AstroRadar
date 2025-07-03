const cosmoTipCall = async () => {
  const response = await fetch(`https://ominous-carnival-49rrwxxr74j35v6-3001.app.github.dev/cosmotip`);
  const data = await response.json();
  return data;
}

export { cosmoTipCall }