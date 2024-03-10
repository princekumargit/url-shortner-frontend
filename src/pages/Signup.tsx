import React, { FormEvent, useState } from 'react'
import { useNavigate } from "react-router-dom"
import savingInLocal from '../utils/savingInLocal';

const Signup = () => {
  const navigate = useNavigate();
  const [name, setName] = useState('');
  const [email, setEmail] = useState('');
  const [password, setPassword] = useState('');
  const [popup, setPopup] = useState("");
  const backend = process.env.REACT_APP_BACKEND;

  const handleSignup = async (e: FormEvent<HTMLFormElement>) => {
    e.preventDefault();
    try {

      const res = await fetch(`${backend}/signup`, {
        method: "post",
        headers: {
          'Content-Type': 'application/json',
        },
        body: JSON.stringify({
          "userEmail": email,
          "password": password,
          "userName": name
        })
      })
      if (res.status === 422) {
        setPopup("Incomplete Credentials");
      }
      else if (res.status === 409) {
        setPopup("Email Already Exists");
      }
      else if (res.status === 503) {
        setPopup("Server Error");
      }
      else if (res.status === 200) {
        setPopup("Success");
        savingInLocal(res);
        navigate("/");
      }
      setTimeout(() => { setPopup("") }, 10000)
      const data = await res.json();
      console.log(data);
    }
    catch (error) {
      console.log(error);
    }

  }
  return (
    <div className="flex flex-col justify-center items-center h-screen w-screen bg-white">
      <form className=" flex flex-col justify-between bg-gray-500 p-8 rounded-lg shadow-md w-full max-w-md h-96" onSubmit={handleSignup}>
        <h1 className="text-2xl font-bold ">Sign Up</h1>
        <div className="">
          <label className="block text-sm font-medium mb-1" htmlFor="name">Name:</label>
          <input
            className="w-full px-4 py-2 border border-gray-300 rounded-md focus:outline-none focus:border-indigo-500"
            type="text"
            id="name"
            value={name}
            onChange={(e) => setName(e.target.value)}
            required
          />
        </div>
        <div className="">
          <label className="block text-sm font-medium mb-1" htmlFor="email">Email:</label>
          <input
            className="w-full px-4 py-2 border border-gray-300 rounded-md focus:outline-none focus:border-indigo-500"
            type="email"
            id="email"
            value={email}
            onChange={(e) => setEmail(e.target.value)}
            required
          />
        </div>
        <div className="">
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
}

export default Signup
