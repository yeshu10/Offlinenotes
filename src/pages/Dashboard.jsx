import React, { useEffect, useState } from 'react';
import { useDispatch, useSelector } from 'react-redux';
import { v4 as uuidv4 } from 'uuid';
import { LuNotebookPen } from "react-icons/lu";
import NoteEditor from '../components/NoteEditor.jsx'; 
import Navbar from "../components/Navbar";
import { addNote, setNotes,setSelectedNoteId ,deleteNote } from '../store/notesSlice.js';
import dbService from '../services/db.js';
import {notesAPI} from '../services/api.js';
import { format } from 'date-fns';
import {  FaTrash } from 'react-icons/fa';

const Dashboard = () => {
  const dispatch = useDispatch();
  const [showCreateModal, setShowCreateModal] = useState(false);
  const [title, setTitle] = useState('');
  const [content, setContent] = useState('');
 const selectedNoteId = useSelector((state) => state.notes.selectedNoteId);

  const [searchTerm, setSearchTerm] = useState('');
  const [loading, setLoading] = useState(true);

  const notes = useSelector((state) => state.notes.notes);

  

  useEffect(() => {
    const fetchNotes = async () => {
      try {
        const fetchedNotes = await notesAPI.getAllNotes();
        console.log(notesAPI);
        console.log(fetchNotes)
        dispatch(setNotes(fetchedNotes));
      } catch (error) {
        console.error('Failed to fetch notes:', error);
      } finally {
        setLoading(false);
      }
    };

    fetchNotes();
  }, [dispatch]);


const handleNoteClick = (noteId) => {
  dispatch(setSelectedNoteId(noteId));
};

const handleDelete = async (id) => {
  try {
    await notesAPI.deleteNote(id);
   
  } catch (error) {
    console.error("Failed to delete note:", error.message);
  }
};

  const handleNewNote = async (e) => {
    e.preventDefault();
    try {
      const newNote = {
        id: uuidv4(),
        title,
        content,
        updatedAt: new Date().toISOString(),
        synced: false,
      };

      const savedNote = await dbService.addNewNote(newNote);
      dispatch(addNote(savedNote));

      setTitle('');
      setContent('');
      setShowCreateModal(false);
    } catch (error) {
      console.error('Error creating note:', error);
    }
  };

  const filteredNotes = notes.filter((note) =>
    note.title.toLowerCase().includes(searchTerm.toLowerCase()) ||
    note.content.toLowerCase().includes(searchTerm.toLowerCase())
  );

  return (
    <>
      <Navbar />
      <main className="max-w-7xl mx-auto py-6 sm:px-6 lg:px-8">
        <div className="px-4 py-6 sm:px-0">
          <div className="flex justify-between items-center mb-6">
            <h2 className="text-2xl font-bold text-pink-400">My Notes</h2>
            <button
              onClick={() => setShowCreateModal(true)}
              className="flex items-center gap-2 px-4 py-2 border border-transparent text-sm font-medium rounded-md text-white bg-purple-400 hover:bg-indigo-700"
            >
              <LuNotebookPen className="text-lg" />
              Note
            </button>
          </div>

          <div className="flex-1 overflow-y-auto p-4">
            {loading ? (
              <div className="text-center">Loading...</div>
            ) : filteredNotes && filteredNotes.length > 0 ? (
              <div className="space-y-2">
                {filteredNotes.map((note) => (
                  <div
                    key={note.id}
                    className={`p-3 rounded-lg cursor-pointer transition-colors ${
                      selectedNoteId === note.id
                        ? 'bg-blue-50 border border-blue-200'
                        : 'hover:bg-gray-50'
                    }`}
                    onClick={() => handleNoteClick(note.id)}
                  >
                    <div className="flex justify-between items-start">
                      <h3 className="font-medium text-gray-900">{note.title}</h3>
                       <button
          onClick={() => handleDelete(note.id)}
          className="ml-2 text-white hover:text-red-300 p-1 rounded-full focus:outline-none focus:ring-2 focus:ring-white cursor-pointer"
          title="Delete Note"
        >
          <FaTrash />
        </button>
                    </div>
                    <p className="text-sm text-gray-600 mt-1 line-clamp-2">
                      {note.content}
                    </p>
                    <div className="mt-2 flex items-center space-x-2">
                      <span className="text-xs text-gray-500">
                        {format(new Date(note.updatedAt), 'MMM d, yyyy')}
                      </span>
                      <span
                        className={`px-2 py-1 rounded text-xs ${
                          note.synced
                            ? 'bg-green-100 text-green-800'
                            : 'bg-yellow-100 text-yellow-800'
                        }`}
                      >
                        {note.synced ? 'Synced' : 'Unsynced'}
                      </span>
                    </div>
                  </div>
                ))}
              </div>
            ) : (
              <div className="text-center text-lime-500">
                Looks like you haven't written any notes yet. Let's get those ideas flowing!
              </div>
            )}
          </div>
        </div>
      </main>

      {showCreateModal && (
        <div className="fixed inset-0 bg-white/60 backdrop-blur-md flex items-center justify-center z-50">
          <div className="bg-white rounded-lg p-8 max-w-lg w-full max-h-[80vh] overflow-auto shadow-lg">
            <h3 className="text-xl font-semibold text-indigo-500 mb-6">
              Create New Note
            </h3>
            <form onSubmit={handleNewNote}>
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
                    value={title}
                    onChange={(e) => setTitle(e.target.value)}
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
                    value={content}
                    onChange={(e) => setContent(e.target.value)}
                    placeholder="Start writing..."
                    className="mt-2 w-full px-4 py-3 border border-indigo-300 rounded-md shadow-sm focus:outline-none focus:ring-2 focus:ring-indigo-400 focus:border-indigo-400"
                    rows={5}
                  />
                </div>
              </div>
              <div className="mt-8 flex justify-end space-x-3">
                <button
                  type="button"
                  onClick={() => setShowCreateModal(false)}
                  className="px-5 py-2 text-sm font-medium text-indigo-700 hover:text-indigo-900 bg-indigo-100 rounded-md transition"
                >
                  Cancel
                </button>
                <button
                  type="submit"
                  className="px-5 py-2 text-sm font-medium rounded-md text-white bg-indigo-600 hover:bg-indigo-700 transition"
                >
                  Create
                </button>
              </div>
            </form>
          </div>
        </div>
      )}
      <div className="flex items-center justify-center h-full">{selectedNoteId && <NoteEditor />}</div>
      

    </>
  );
};

export default Dashboard;
