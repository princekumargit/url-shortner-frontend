import React from 'react'
import { Link } from 'react-router-dom';

interface Props {
    isLogin: boolean;
}
const handleLogout = () => {
    localStorage.clear();
    window.location.reload();
}

const Navbar: React.FC<Props> = ({ isLogin }) => {
    return (
        <div className=' flex flex-col justify-around items-center h-1/6'>
            <div className=' flex text-5xl py-2'>URL Shortner</div>
            {isLogin ?
                <div>
                    <button className=" rounded-md p-2 bg-red-500 hover:bg-red-700 text-white  mx-2" onClick={handleLogout}>Log Out</button>
                    {/* <a className=" rounded-md p-2 bg-green-500 hover:bg-green-700 text-white  mx-2" href='/addlink' >Add</a> */}
                    <Link to="/addlink" className=" rounded-md p-2 bg-green-500 hover:bg-green-700 text-white  mx-2">Add</Link>
                </div> :
                <div>
                    <Link to="/signin" className="rounded-md p-2 bg-green-500 hover:bg-green-700 text-white mx-2">Sign In</Link>
                    <Link to="/signup" className="rounded-md p-2 bg-green-500 hover:bg-green-700 text-white mx-2">Sign Up</Link>
                    {/* <a className=" rounded-md p-2 bg-green-500 hover:bg-green-700 text-white  mx-2" href='/signin'>Sign In</a>
                    <a className=" rounded-md p-2 bg-green-500 hover:bg-green-700 text-white  mx-2" href='/signup'>Sign Up</a> */}
                </div>
            }
        </div>
    )
}

export default Navbar
