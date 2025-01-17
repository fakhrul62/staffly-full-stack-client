import axios from "axios"; // Import axios for making HTTP requests
import { useNavigate } from "react-router-dom"; // Import useNavigate for navigation
import useAuth from "./useAuth"; // Import custom hook for authentication

// Create an axios instance with a base URL
const axiosSecure = axios.create({
  baseURL: "http://localhost:5000/", // Base URL for the API
});

const useAxiosSecure = () => {
  const { logout } = useAuth(); // Get the logout function from the useAuth hook
  const navigate = useNavigate(); // Get the navigate function from useNavigate

  // Add a request interceptor to the axios instance
  axiosSecure.interceptors.request.use(
    (config) => {
      // Get the access token from local storage
      const token = localStorage.getItem("access-token");
      // Add the token to the request headers
      config.headers.authorization = `Bearer ${token}`;
      return config; // Return the modified config
    },
    function (error) {
      // Handle request error
      return Promise.reject(error);
    }
  );

  // Add a response interceptor to the axios instance
  axiosSecure.interceptors.response.use(
    (response) => {
      // Return the response if successful
      return response;
    },
    async (error) => {
      // Get the status code from the error response
      const status = error.response.status;
      // If the status is 401 (Unauthorized) or 403 (Forbidden)
      if (status === 401 || status === 403) {
        await logout(); // Log the user out
        navigate("/login"); // Navigate to the login page
      }
      // Return the error to be handled by the calling code
      return Promise.reject(error);
    }
  );

  // Return the axios instance
  return axiosSecure;
};

export default useAxiosSecure;
