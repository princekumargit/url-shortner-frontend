import React, { useState, useEffect } from 'react'
import LinksTable from '../components/LinksTable';
import Navbar from '../components/Navbar';

const Home = () => {
    const [data, setData] = useState([]);
    const [accessToken, setAccessToken] = useState("");
    const [userId, setUserId] = useState("");
    const [isLogin, setIsLogin] = useState(false);
    const [render, setRender] = useState(false);
    const fetchData = async () => {
        try {
            // console.log(userId, accessToken);
            if (!userId || !accessToken) {
                // console.log("incomplete information");
                return null;
            }
            const backend = process.env.REACT_APP_BACKEND;
            const res = await fetch(`${backend}/urls`, {
                method: 'POST',
                headers: {
                    'authorization': `Bearer ${accessToken}`,
                    'Content-Type': 'application/json'
                },
                body: JSON.stringify({ "userId": userId, })
            });
            if (res.status === 498 || res.status === 499) {
                localStorage.clear();
                setIsLogin(false);
                setUserId("");
                setAccessToken("");
                setData([]);
            }
            if (res.status === 200) {
                // console.log("success");
                const response = await res.json();
                return response;
            }
            else {
                const response = await res.json();
                console.log(response);
            }
        } catch (error) {
            console.error('Error fetching data:', error);
        }
    };

    useEffect(() => {
        const local_isLogin = localStorage.getItem("isLogin");

        if (local_isLogin === "false") {
            setIsLogin(false);
        }
        else if (local_isLogin === "true") {
            setIsLogin(true);
        }
    }, [])

    useEffect(() => {
        if (isLogin) {
            const YOUR_ACCESS_TOKEN = localStorage.getItem("accessToken");
            const local_userId = localStorage.getItem("userId");
            if (YOUR_ACCESS_TOKEN) {
                setAccessToken(YOUR_ACCESS_TOKEN);
            }
            if (local_userId) {
                setUserId(local_userId);
                // console.log(userId);
            }
        }
        else {
            setAccessToken('');
            setUserId('');
        }
    }, [isLogin])

    useEffect(() => {
        fetchData().then((response) => {
            if (response) {
                console.log(response);
                setData(response.message);
            }
        })
    }, [accessToken, userId, render]);
    return (
        <div className=' h-screen'>
            <Navbar isLogin={isLogin} />
            {data && <LinksTable data={data} render={render} setRender={setRender} />}
        </div>
    );
};

export default Home
