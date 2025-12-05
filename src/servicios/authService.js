// CREAR .env en la carpeta front. front/.env
// CREAR variable VITE_SERVICES_URL y el valor es vuestro backend
const mainURL = import.meta.env.VITE_SERVICES_URL;

const userLogIn = async (username, password) => {

}

const userSignUp = async (username, password, name, lastname, email, city, country, userImage) => {

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

export { userLogIn, getUserInfo, userSignUp, getUsersFromDatabase, changePassword };