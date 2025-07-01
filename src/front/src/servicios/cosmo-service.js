const cosmoTipCall = async () => {
  const response = await fetch(`http://localhost:3001/cosmotip`);
  const data = await response.json();
  return data;
}

export { cosmoTipCall }