import React, { useState } from 'react';


const AddLink = () => {
    const [link, setLink] = useState("");
    const [popup, setPopup] = useState("");
    const backend = process.env.REACT_APP_BACKEND;
    const handleAddLink = async (e: React.FormEvent<HTMLFormElement>) => {
        e.preventDefault();
        const userId = localStorage.getItem("userId");
        const accessToken = localStorage.getItem("accessToken");
        if (!userId || !accessToken) {
            localStorage.clear();
            setPopup("Please Login Again");
        }
        const res = await fetch(`${backend}/add`, {
            method: "post",
            headers: {
                'Content-Type': 'application/json',
                'authorization': `Bearer ${accessToken}`
            },
            body: JSON.stringify({
                userId: userId,
                url: link
            })
        })

        if (res.status === 200) {
            const response = await res.json();
            const urlId = response.data.id;
            setPopup(`Success Access your Link at http://localhost:3000/${urlId}`);
            setLink("");
        }
        if (res.status === 400) {
            setPopup("Bad Request");
        }
        setTimeout(() => { setPopup("") }, 10000);
    }
    return (
        <div className="flex flex-col justify-center items-center h-screen w-screen bg-white">
            <form className="bg-gray-500 p-8 rounded-lg shadow-md w-full max-w-md" onSubmit={handleAddLink}>
                <h1 className="text-2xl font-bold mb-4">Add Link</h1>
                <div className=' mb-6'>
                    <label htmlFor="link" className="block text-sm font-medium mb-1">Link:</label>
                    <input type="text" id="link" onChange={(e) => { setLink(e.target.value) }} value={link}
                        className="w-full px-4 py-2 border border-gray-300 rounded-md focus:outline-none focus:border-indigo-500" />
                </div>
                <button className="w-full bg-indigo-500 text-white py-2 px-4 rounded-md hover:bg-indigo-600 focus:outline-none focus:bg-indigo-600"
                    type='submit'>
                    Submit
                </button>
            </form>
            <div className={`flex items-center justify-center ${popup === "Success" ? 'bg-green-500' : 'bg-red-500'} px-4 py-2 rounded-md ${popup ? '' : ' hidden'} w-full max-w-md `}>
                {popup}
            </div>

        </div>
    )
}

export default AddLink
