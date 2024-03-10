import React from 'react'

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
                    <a className=" rounded-md p-2 bg-green-500 hover:bg-green-700 text-white  mx-2" href='/addlink' >Add</a>

                </div> :
                <div>
                    <a className=" rounded-md p-2 bg-green-500 hover:bg-green-700 text-white  mx-2" href='/signin'>Sign In</a>
                    <a className=" rounded-md p-2 bg-green-500 hover:bg-green-700 text-white  mx-2" href='signup'>Sign Up</a>
                </div>
            }
        </div>
    )
}

export default Navbar
