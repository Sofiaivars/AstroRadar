import { setUserData } from "@features/userData/userDataSlice";

const mainURL = import.meta.env.VITE_SERVICES_URL;

const userLogIn = async (email, password, dispatch) => {

  const response = await fetch(`${mainURL}/auth/login`, {
    method: 'POST',
    headers: {
      "Content-Type": "application/json"
    },
    body: JSON.stringify({ email, password }),
    credentials: 'include'
  });

  if (!response.ok) {
    if (response.status === 404) throw new Error("Email o contraseña incorrectos");
    throw new Error("Error en el servidor");
  };

  const data = await response.json();

  dispatch(setUserData(data));

  return data;

}

const userSignUp = async ({ name, lastname, username, password, image, email, city, country }) => {
  const response = await fetch(`${mainURL}/auth/signup`, {
    method: 'POST',
    headers: {
      "Content-Type": "application/json"
    },
    body: JSON.stringify({ name, lastname, username, password, image, email, city, country })
  });
  if (!response.ok) {
    if (response.status === 404) throw new Error("Nombre de usuario o email ya registrados");
    throw new Error("Error en el servidor");
  };

  const data = await response.json();
  return data;
}

const getUserData = async () => {
  const response = await fetch(`${mainURL}/auth/profile`, {
    method: 'GET',
    credentials: 'include',
  });
  if (!response.ok) throw new Error("Sin autorización");

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

export { userLogIn, getUserData, userSignUp, getUsersFromDatabase, changePassword };