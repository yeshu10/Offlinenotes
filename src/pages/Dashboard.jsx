import Navbar from "../components/Navbar";
import React, { useEffect, useState, useRef } from 'react';
import { useDispatch, useSelector } from 'react-redux';
import { LuNotebookPen } from "react-icons/lu";

const Dashboard = ()=>
{

     const { notes, loading } = useSelector((state) => state.notes);
     const [showCreateModal, setShowCreateModal] = useState(false);

     const handleCreateNote=()=>
     {
        setShowCreateModal(true);
        console.log("note can be created");
     }

    return (
        <>
        <Navbar/>
         <main className="max-w-7xl mx-auto py-6 sm:px-6 lg:px-8">
        <div className="px-4 py-6 sm:px-0">
          <div className="flex justify-between items-center mb-6">
            <h2 className="text-2xl font-bold text-pink-400">My Notes</h2>
            

            <button
  onClick={() => setShowCreateModal(true)}
  className="flex items-center gap-2 px-4 py-2 border border-transparent text-sm font-medium rounded-md text-white bg-purple-400 hover:bg-indigo-700 cursor-pointer"
>
  <LuNotebookPen className="text-lg" />
  Note
</button>
          </div>

          {loading ? (
            <div className="text-center">Loading...</div>
          ) : notes && notes.length > 0 ? (
            <>
      

<div className="grid grid-cols-1 gap-4 sm:grid-cols-2 lg:grid-cols-3">
  {notes.map((note) => (
    <div
      key={note._id}
      className="bg-white overflow-hidden shadow rounded-lg hover:shadow-lg transition-shadow duration-300 flex flex-col justify-between"
    >
      
      <div className="relative bg-gradient-to-r from-blue-400 via-pink-200 to-purple-400 rounded-t-lg px-4 py-3 flex items-center justify-between text-white">
        <h3 className="text-lg font-semibold truncate max-w-[calc(100%-3rem)]">
          {note.title}
        </h3>

        
        <button
        
          className="ml-2 text-white hover:text-red-300 p-1 rounded-full focus:outline-none focus:ring-2 focus:ring-white cursor-pointer"
          title="Delete Note"
        >
          <FaTrash />
        </button>
      </div>

    
       <div
        className="px-4 py-5 cursor-pointer flex-grow"
      >
        
        <p className="text-gray-700 truncate">{note.content.split('\n')[0]}</p>
      </div>

     
      <div className="px-4 py-3 bg-gray-50 flex justify-between items-center text-gray-500 text-xs">
        <span>
          {new Date(note.lastUpdated).toLocaleTimeString([], { hour: '2-digit', minute: '2-digit' })}
        </span>
        
      </div>
    </div>
  ))}</div>              
            </>
          ) : (
            <div className="text-center text-lime-500">Looks like you haven't written any notes yet. Let's get those ideas flowing!</div>
          )}
        </div>
      </main>

      
      {showCreateModal && (
  <div className="fixed inset-0 bg-white/60 backdrop-blur-md flex items-center justify-center z-50">
    <div className="bg-white rounded-lg p-8 max-w-lg w-full max-h-[80vh] overflow-auto shadow-lg">
      <h3 className="text-xl font-semibold text-indigo-500 mb-6">
        Create New Note
      </h3>
      <form onSubmit={handleCreateNote}>
        <div className="space-y-6">
          <div>
            <label
              htmlFor="title"
              className="block text-sm font-medium text-indigo-700"
            >
              Title
            </label>
            <input
              id="title"
              type="text"
              value="title"
              
              placeholder="Note title"
              className="mt-2 w-full px-4 py-3 border border-indigo-300 rounded-md shadow-sm focus:outline-none focus:ring-2 focus:ring-indigo-400 focus:border-indigo-400"
              required
            />
          </div>
          <div>
            <label
              htmlFor="content"
              className="block text-sm font-medium text-indigo-700"
            >
              Initial Content
            </label>
            <textarea
              id="content"
              
              placeholder="Start writing..."
              className="mt-2 w-full px-4 py-3 border border-indigo-300 rounded-md shadow-sm focus:outline-none focus:ring-2 focus:ring-indigo-400 focus:border-indigo-400"
              rows={5}
            />
          </div>
        </div>
        <div className="mt-8 flex justify-end space-x-3">
          <button
            type="button"
            
            className="px-5 py-2 text-sm font-medium text-indigo-700 hover:text-indigo-900 bg-indigo-100 rounded-md transition"
            
          >
            Cancel
          </button>
          <button
            type="submit"
            className={`px-5 py-2 text-sm font-medium rounded-md text-white bg-indigo-600 hover:bg-indigo-700 transition`}
            
          >
            
          </button>
        </div>
      </form>
    </div>
  </div>
)}

        </>
    )
}

export default Dashboard;