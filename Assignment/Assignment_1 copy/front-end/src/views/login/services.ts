import axios from 'axios';

// function to validate the user credentials
const authenticateUserCredentials = async (userEmail: string, userPassword: string) => {
  try {
    const userCredentialsResponse = await axios.post(
      `http://localhost:8000/login`,
      { email: userEmail, password: userPassword }
    );
    const authToken: string = userCredentialsResponse?.data?.token;
    return authToken;
  } catch (error) {
    return Promise.reject(error);
  }
};

export default authenticateUserCredentials;
