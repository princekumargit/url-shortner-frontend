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
  const linksPerPage = 10;

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
    <div className="overflow-x-auto h-5/6 bg-gray-500 py-5 px-10  rounded-md max-sm:px-2 ">
      <h1 className="text-2xl font-bold mb-4">Links</h1>
      <table className="table-auto min-w-full divide-y ">
        <thead className="">
          <tr className=''>
            <th scope="col" className="px-6 py-3 text-left text-xs  font-bold tracking-wider">
              Link
            </th>
            <th scope="col" className="px-6 py-3 text-left text-xs  font-bold tracking-wider">
              URL
            </th>
            <th scope="col" className="px-6 py-3 text-left text-xs font-bold tracking-wider max-sm:hidden">
              ADDED AT
            </th>
          </tr>
        </thead>
        <tbody className="bg-white divide-y divide-gray-200">
          {currentLinks.map((link) => (
            <tr key={link.id} className=''>
              <td className="px-6 py-4 whitespace-nowrap ">
                {/* <a href={`${frontend}/go/${link.id}`} className="bg-green-500 hover:bg-green-700 rounded-md p-2">Link</a> */}
                <Link to={`${frontend}/go/${link.id}`} className="bg-green-500 hover:bg-green-700 rounded-md p-2">Link</Link>
              </td>
              <td className="px-6 py-4 whitespace-nowrap ">
                <div className="text-sm ">{link.url}</div>
              </td>
              <td className="px-6 py-4 whitespace-nowrap max-sm:hidden">
                <div className="text-sm ">{new Date(link.createdat).toLocaleString()}</div>
              </td>
              <td className="px-6 py-4 whitespace-nowrap text-sm text-white">
                <button className="bg-red-500 hover:bg-red-700 rounded-md p-2" onClick={() => { handleDelete(link) }}>Delete</button>
              </td>
            </tr>
          ))}
        </tbody>
      </table>
      <div className="mt-4 flex justify-between">
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
  );
};

export default LinksTable;

