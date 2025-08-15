import { useApiWithoutToken } from "./baseAxios";

export async function createUser(newUser) {
  try {
    const responseUser = await useApiWithoutToken.post(
      `/auth/register`,
      {
        username: newUser.name,
        email: newUser.email,
        password: newUser.password,
      },
      {
        signal: new AbortController().signal,
      }
    );

    return responseUser.data;
  } catch (error) {
    console.error("Error creating user:", error);
    throw error;
  }
}

export async function login(email, password) {
  try {
    const responseUser = await useApiWithoutToken.post(
      `/auth/login`,
      {
        email: email,
        password: password,
      },
      {
        signal: new AbortController().signal,
      }
    );

    return responseUser.data;
  } catch (error) {
    console.error("Error Login:", error);
    throw error;
  }
}
