import React, { useState } from 'react';
import savingInLocal from '../utils/savingInLocal';
import { useNavigate } from 'react-router-dom';
const Signin = () => {
    const [email, setEmail] = useState('');
    const [password, setPassword] = useState('');
    const [popup, setPopup] = useState("");
    const backend = process.env.REACT_APP_BACKEND;
    const navigate = useNavigate();

    const handleSignin = async (e: React.FormEvent<HTMLFormElement>) => {
        e.preventDefault();
        try {
            console.log(`${backend}/signin`);
            const res = await fetch(`${backend}/signin`, {
                method: "post",
                headers: {
                    'Content-Type': 'application/json',
                },
                body: JSON.stringify({
                    "userEmail": email,
                    "password": password,
                })
            })
            if (res.status === 422) {
                setPopup("Incomplete Credentials");
            }
            else if (res.status === 400) {
                setPopup("Invalid Credentials");
            }
            else if (res.status === 200) {
                setPopup("Success");
                await savingInLocal(res);
                navigate("/");
                return;
            }
            setTimeout(() => { setPopup("") }, 10000)
            const data = await res.json();
            console.log(data);
        } catch (error) {
            console.log(error);
        }
    };

    return (
        <div className="flex flex-col justify-center items-center h-screen w-screen bg-white">
            <form className="bg-gray-500 p-8 rounded-lg shadow-md w-full max-w-md" onSubmit={handleSignin}>
                <h1 className="text-2xl font-bold mb-4">Sign In</h1>
                <div className="mb-4">
                    <label className="block text-sm font-medium mb-1" htmlFor="email">Email:</label>
                    <input
                        className="w-full px-4 py-2 border border-gray-300 rounded-md focus:outline-none focus:border-indigo-500"
                        type="text"
                        id="email"
                        value={email}
                        onChange={(e) => setEmail(e.target.value)}
                        required
                    />
                </div>
                <div className="mb-6">
                    <label className="block text-sm font-medium mb-1" htmlFor="password">Password:</label>
                    <input
                        className="w-full px-4 py-2 border border-gray-300 rounded-md focus:outline-none focus:border-indigo-500"
                        type="password"
                        id="password"
                        value={password}
                        onChange={(e) => setPassword(e.target.value)}
                        required
                    />
                </div>
                <button
                    className="w-full bg-indigo-500 text-white py-2 px-4 rounded-md hover:bg-indigo-600 focus:outline-none focus:bg-indigo-600"
                    type="submit"
                >
                    Sign In
                </button>
            </form>
            <div className={`flex items-center justify-center ${popup === "Success" ? 'bg-green-500' : 'bg-red-500'} px-4 py-2 rounded-md ${popup ? '' : ' hidden'} w-full max-w-md `}>
                {popup}
            </div>
        </div>
    );
};

export default Signin;

