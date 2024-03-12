import React, { useState } from 'react';
import { Link } from 'react-router-dom';

interface DataEntity {
  id: string;
  userid: string;
  createdat: string;
  url: string;
}

interface Props {
  data: DataEntity[];
  render: boolean,
  setRender: React.Dispatch<React.SetStateAction<boolean>>
}


const LinksTable: React.FC<Props> = ({ data, render, setRender }) => {
  const [currentPage, setCurrentPage] = useState(1);
  const linksPerPage = 5;

  const indexOfLastLink = currentPage * linksPerPage;
  const indexOfFirstLink = indexOfLastLink - linksPerPage;
  const lastPage = Math.ceil(data.length / linksPerPage);
  const currentLinks = data.slice(indexOfFirstLink, indexOfLastLink);
  const backend = process.env.REACT_APP_BACKEND;
  const frontend = process.env.REACT_APP_FRONTEND;

  const paginate = (pageNumber: number) => {
    if (pageNumber === 0) return;
    if (pageNumber === lastPage + 1) return;
    setCurrentPage(pageNumber);
  }

  const handleDelete = (link: DataEntity) => {
    const accessToken = localStorage.getItem("accessToken");
    const res = fetch(`${backend}/delete`, {
      method: "post",
      headers: {
        'Content-Type': 'application/json',
        'authorization': `Bearer ${accessToken}`
      },
      body: JSON.stringify({
        userId: link.userid,
        urlId: link.id,
      })
    })
    res.then(() => {
      setRender(!render);
    })
  }

  return (
    <div className='flex justify-center items-center'>
      <div className="bg-white w-full max-w-3xl rounded-lg p-4">
        <h1 className="text-xl font-bold mb-4">Links</h1>
        <div className="divide-y divide-black w-full">
          {currentLinks.map((link) => (
            <div key={link.id} className="py-4">
              <div className="flex justify-between items-center w-full">
                <div className=" w-[80%]">
                  <div><Link to={`${backend}/${link.id}`} className="bg-green-500 hover:bg-green-700 rounded-sm p-1 text-white">Link</Link></div>
                  <div className="text-sm text-gray-600 w-full text-wrap break-words">{link.url}</div>
                  <div className="text-sm text-gray-600">{new Date(link.createdat).toLocaleString()}</div>
                </div>
                <div>
                  <button className="bg-red-500 hover:bg-red-700 rounded-md p-2 text-white" onClick={() => { handleDelete(link) }}>Delete</button>
                </div>
              </div>
            </div>
          ))}
        </div>
        <div>
          <button
            onClick={() => paginate(currentPage - 1)}
            className={`px-4 py-2 rounded-md focus:outline-none text-gray-500 ${currentPage === 1 ? '' : 'hover:text-gray-700 hover:bg-gray-500'} bg-gray-300`}
          >
            {'<'}
          </button>
          <button
            onClick={() => paginate(currentPage + 1)}
            className={`px-4 py-2 rounded-md focus:outline-none text-gray-500 ${currentPage === lastPage ? '' : 'hover:text-gray-700 hover:bg-gray-500'} bg-gray-300 `}
          >
            {'>'}
          </button>
        </div>
      </div>
    </div>
  );
};

export default LinksTable;

