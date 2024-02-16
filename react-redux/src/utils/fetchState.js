import axios from "axios";

export const fetchUserData = async (setUser, setAuth) => {
  try {
    const res = await axios.get("http://localhost:8000");
    if (res.data.status) {
      setUser(res.data);
      setAuth(true);
    }
  } catch (error) {
    setAuth(false);
    console.log(error);
  }
};
