// Importing the Axios library for making HTTP requests, so we can connect front-end and backend
import axios from "axios";

// Creating and exporting a default Axios instance with configuration
export default axios.create({
    withCredentials: true, // Configuring Axios to send credentials (such as cookies) with cross-origin requests
});
