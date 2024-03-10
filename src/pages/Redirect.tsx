import React, { useEffect } from 'react'
import { useParams } from 'react-router-dom'

const Redirect = () => {
    const { urlId } = useParams()
    const backend = process.env.REACT_APP_BACKEND;
    const handlefetch = async () => {
        const res = await fetch(`${backend}/geturl/${urlId}`, {
            method: "get",
            headers: {
                'Content-Type': 'application/json'
            }
        })
        if (res.status === 200) {
            const response = await res.json();
            window.location.assign(`https://${response.url}`);

        }
    }
    useEffect(() => {
        if (urlId) {
            handlefetch();


        }
    }, [urlId])
    return (
        <div className=' flex justify-center items-center'>
            Redirecting...
        </div>
    )
}

export default Redirect
