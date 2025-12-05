const STORAGE_KEY = "currentMission";

//guardamos mision aqui
export const setMissionData = (data) => {
  localStorage.setItem(STORAGE_KEY, JSON.stringify(data));
};

export const getMissionData = () => {
  const stored = localStorage.getItem(STORAGE_KEY);
  return stored ? JSON.parse(stored) : null;
};

// p borrar? nose si es necesario quizas si se "cancela la mision"?? -- consultar con el stevens experto en localstorage
export const clearMissionData = () => {
  localStorage.removeItem(STORAGE_KEY);
};

// p actualizar datos como cuando subamos la captura del evento
export const updateMissionData = (partialData) => {
  const current = getMissionData() || {};
  const updated = { ...current, ...partialData };
  setMissionData(updated);
};
