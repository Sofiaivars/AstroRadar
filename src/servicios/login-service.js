// CREAR .env en la carpeta front. front/.env
// CREAR variable VITE_SERVICES_URL y el valor es vuestro backend
const mainURL = import.meta.env.VITE_SERVICES_URL;

const login = async (username, password) => {
  const response = await fetch(`${mainURL}/login`, {
    method: 'POST',
    headers: { "Content-Type": "application/json" },
    body: JSON.stringify({ username, password })
  });

  if (!response.ok) throw Error("Error relacion con la petición login.");

  if (response.status === 401) {
    throw ("Credenciales inválidas");
  } else if (response.status === 400) {
    throw ("Error al escribir nombre de usuaro o contraseña");
  }

  const data = await response.json();

  localStorage.setItem("jwt-token", data.token);

  return data;
}

// SignUp
const signUp = async (username, password, name, lastname, email, city, country, image) => {
  const response = await fetch(`${mainURL}/signup`, {
    method: 'POST',
    headers: { "Content-Type": "application/json" },
    body: JSON.stringify({ username, password, name, lastname, email, city, country, image })
  });

  if (!response.ok) {
    const errorData = await response.json();
    throw Error(errorData.msg || "Error en el registro");
  }

  const data = await response.json();
  return data;
}

// /protected es un endpoint privado.
const getUserInfo = async () => {
  const token = localStorage.getItem('jwt-token');

  if (!token) {
    throw new Error("No hay token");
  }

  const response = await fetch(`${mainURL}/protected`, {
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
  return data;
}

const getUsersFromDatabase = async () => {
  const response = await fetch(`${mainURL}/users`);
  const data = await response.json();
  return data;
}

const changePassword = async (oldPassword, newPassword) => {
  const token = localStorage.getItem('jwt-token');
  const response = await fetch(`${mainURL}/new-password`, {
    method: 'PUT',
    headers: {
      "Content-Type": "application/json",
      "Authorization": `Bearer ${token}`
    },
    body: JSON.stringify({ oldPassword, newPassword })
  });

  if (!response.ok) {
    throw Error("Error al cambiar la contraseña.");
  }

  const data = await response.json();
  return data;
}

export { login, getUserInfo, signUp, getUsersFromDatabase, changePassword };