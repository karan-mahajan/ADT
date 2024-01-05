import axios from 'axios';

// function to validate the user credentials
const registerUser = async (userEmail: string, userPassword: string, confirmPassword: string, firstName: string, lastName: string, mobile: number, dob: Date) => {
    try {
        const userResponse = await axios.post(
            `http://localhost:8000/register`,
            {
                email: userEmail,
                password: userPassword,
                firstName,
                lastName,
                confirmPassword,
                mobile: Number(mobile),
                DOB: dob
            }
        );
        return userResponse;
    } catch (error) {
        console.log(error);
        return Promise.reject(error);
    }
};

export default registerUser;
