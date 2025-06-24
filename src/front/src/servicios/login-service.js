const login = async (username, password) => {
  const response = await fetch(`http://127.0.0.1:3001/token`, {
    method: 'POST',
    headers: { "Content-Type": "application/json" },
    body: JSON.stringify({ username, password })
  });

  if (!response.ok) throw Error("Error relacion con la petición login.");

  if (response.status === 401) {
    throw ("Credenciales inválidas");
  } else if (response.status === 400) {
    throw ("Error al escribir nombre de usuaro o contraseña")
  }

  const data = await response.json();

  localStorage.setItem("jwt-token", data.token);

  return data;
}

// /protected es un endpoint privado.
const getUserInfo = async () => {
  const token = localStorage.getItem('jwt-token');

  if (!token) {
    throw new Error("No hay token");
  }

  const response = await fetch('http://127.0.0.1:3001/protected', {
    method: 'GET',
    headers: {
      "Content-Type": "application/json",
      "Authorization": `Bearer ${token}`
    }
  });

  if (!response.ok) {
    throw Error("Problema con la petición login");
  }

  const data = await response.json();
  console.log(`Datos solicitados: ${data}`);
  return data;
}

export { login, getUserInfo };