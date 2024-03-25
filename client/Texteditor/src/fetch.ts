import axios from "axios";
const gethealth = async () => {
    try {
        let result = await axios.get("http://localhost:3000/user/api/health", {
            headers: {
                token: localStorage.getItem('token')
            }
        });
        return [result.data.bool,result.data.id];
    }
    catch (err) {
        console.log(err);
    }
};
export default gethealth;