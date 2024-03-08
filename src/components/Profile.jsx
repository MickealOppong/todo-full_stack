import { useEffect } from "react";
import { useGlobalContext } from "./AppContextProvider";
import Task from "./Content";
import Sidebar from "./Sidebar";
import { api } from "./util";
const Profile = () => {
  const { setUsername, username, token, setIsLoginSuccess, showSidebar, setAuthority } = useGlobalContext();



  useEffect(() => {

    const fetchProfile = async () => {
      try {
        const response = await api.get('/api/user/me', {
          withCredentials: true
        });
        const data = await response.data;
        //console.log(data);
        setUsername(data.name)
        setAuthority(data.authorities[0]['authority'])
      } catch (error) {
        console.log(error);
      }
    }
    fetchProfile();
  }, [])
  return <main >
    <Sidebar />
    <Task />
  </main>
}

export default Profile;