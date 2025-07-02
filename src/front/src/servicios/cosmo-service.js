const cosmoTipCall = async () => {
  const response = await fetch(`https://solid-orbit-5p99xww56g63v979-3001.app.github.dev/cosmotip`);
  const data = await response.json();
  return data;
}

export { cosmoTipCall }