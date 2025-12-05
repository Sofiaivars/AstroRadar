// CREAR .env en la carpeta front. front/.env
// CREAR variable VITE_SERVICES_URL y el valor es vuestro backend
const mainURL = import.meta.env.VITE_SERVICES_URL;

const getEventsFromAPI = async () => {
  try {
    const response = await fetch(`${mainURL}/events`, {
      method: 'GET'
    });

    if (!response.ok) {
      if (response.status === 404) {
        console.warn('La ruta /events no fue encontrada.');
        return [];
      }
      throw new Error(`Error al obtener eventos: ${response.status}`)
    }

    const data = await response.json();
    return data;
  } catch (error) {
    console.error(`Error al obtener eventos de la BD: ${error}`);
    return [];
  }

}

const getCategories = (list) => {
  if (Array.isArray(list) && list.length > 0) {
    const data = {}
    for (const register of list) {
      if (register.category in data) {
        data[register.category]++
      } else {
        data[register.category] = 1
      }
    }
    return data
  }
  return
}

//Añadir evento a UserMissions================================
const addUserMission = async (user_id, event_id, state) => {
  const response = await fetch(`${mainURL}/umissions/add-user-mission`, {
    method: 'POST',
    headers: { 'Content-Type': 'application/json' },
    body: JSON.stringify({ user_id, event_id, state })
  });

  if (!response.ok) {
    const errorData = await response.json();
    throw Error(errorData.msg || "Error al enviar userMission");
  }

  const data = await response.json();
  return data;
}

// Obtener userMissions
const getUserMissions = async (userId) => {
  try {
    const response = await fetch(`${mainURL}/umissions/usermissions/${userId}`);
    if (!response.ok) {
      if (response.status === 404) {
        return [];
      }
      throw Error("Error al obtener misiones del usuario.");
    }
    const data = await response.json();
    return data;
  } catch (error) {
    console.error(`Error en getUserMissions: ${error}`);
    return [];
  }
}

// Actualizar state de una misión por id
const updateMissionState = async (missionId, missionState) => {
  const response = await fetch(`${mainURL}/umissions/update_mission_state/${missionId}`, {
    method: 'PUT',
    headers: { 'Content-Type': 'application/json' },
    body: JSON.stringify({ state: missionState })
  });

  if (!response.ok) {
    const errorData = await response.json();
    throw Error(errorData.msg || "Error al actualizar state.");
  }
  const data = await response.json();
  return data;

}

// Borrar misión
const deleteMission = async (missionId) => {
  const response = await fetch(`${mainURL}/umissions/delete-mission/${missionId}`, {
    method: 'DELETE'
  });
  if (!response.ok) {
    throw new Error(`Error al borrar misión: ${response.statusText}`);
  }
  const data = await response.json();
  return data;
}

// Actualizar base estelar
const updateStellarBase = async (baseId, missionId) => {
  const response = await fetch(`${mainURL}/umissions/update-base/${missionId}`, {
    method: 'PUT',
    headers: { "Content-Type": "application/json" },
    body: JSON.stringify({ base_id: baseId })
  });

  if (!response.ok) {
    throw Error("Error al actualizar base estelar.");
  }

  const data = await response.json();
  return data;
}

// Actualizar imagen de misión
const updateMissionImage = async (missionID, imageSrc) => {
  const response = await fetch(`${mainURL}/umissions/update-mission-image/${missionID}`, {
    method: 'PUT',
    headers: { 'Content-Type': 'application/json' },
    body: JSON.stringify({ image_src: imageSrc })
  });

  if (!response.ok) {
    throw Error("Error al actualizar imagen")
  }

  const data = await response.json();
  return data;
}
//==========================================================

const getISSPasses = async (latitude, longitude) => {
  const response = await fetch(`${mainURL}/isspasses`, {
    method: 'POST',
    headers: { 'Content-Type': 'application/json' },
    body: JSON.stringify({ latitude, longitude })
  });

  if (!response.ok) {
    const errorData = await response.json();
    throw Error(errorData.msg || "Error al solicitar pasos de la ISS");
  }

  const data = await response.json();
  return data
}

const getAboveSatellites = async (latitude, longitude) => {
  const response = await fetch(`${mainURL}/satsabove`, {
    method: 'POST',
    headers: { "Content-Type": "application/json" },
    body: JSON.stringify({ latitude, longitude })
  });

  if (!response.ok) {
    const errorData = await response.json();
    throw Error(errorData.msg || "Error al solicitar satelites encima");
  }

  const data = await response.json()
  return data.info.satcount
}

export {
  getEventsFromAPI,
  getCategories,
  getISSPasses,
  getAboveSatellites,
  addUserMission,
  getUserMissions,
  updateMissionState,
  deleteMission,
  updateStellarBase,
  updateMissionImage
}