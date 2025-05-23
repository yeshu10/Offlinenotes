import React, { useEffect, useState, useCallback } from 'react';
import { useDispatch, useSelector } from 'react-redux';
import { updateNote, setSelectedNoteId } from '../store/notesSlice';
import { notesAPI } from '../services/api';
import debounce from 'lodash/debounce';
import { RxCross2 } from 'react-icons/rx';

const NoteEditor = () => {

  const dispatch = useDispatch();
  const noteId = useSelector(state => state.notes.selectedNoteId);
  const currentNote = useSelector(state =>
    state.notes.notes.find(n => n.id === noteId)
  );
  const [noteTitle, setNoteTitle] = useState('');
  const [noteBody, setNoteBody] = useState('');

  useEffect(() => {
    if (currentNote)
   {
      setNoteTitle(currentNote.title || '');
      setNoteBody(currentNote.content || '');
    } 
    else 
    {
      setNoteTitle('');
      setNoteBody('');
    }
  }, [currentNote]);

  const syncNote = useCallback(
    debounce((id, data) => {
      notesAPI.updateNote(id, data).catch(err =>
        console.error('Update failed:', err)
      );
    }, 500),
    []
  );

  const changeTitle = e => {
    const val = e.target.value;
    setNoteTitle(val);
    if (noteId) {
      dispatch(updateNote({ id: noteId, title: val }));
      syncNote(noteId, { title: val });
    }
  };

  const changeBody = e => {
    const val = e.target.value;
    setNoteBody(val);
    if (noteId) {
      dispatch(updateNote({ id: noteId, content: val }));
      syncNote(noteId, { content: val });
    }
  };

  const closeEditor = () => {
    dispatch(setSelectedNoteId(null));
  };

  return (
    <div className="flex flex-col h-full w-2/3 border-l border-gray-200 shadow-sm">
      <div className="flex items-center justify-between px-4 py-2 border-b bg-gradient-to-r from-indigo-400 via-purple-400 to-pink-500">
        <h2 className="text-xl font-semibold text-white">Edit Your Note Here</h2>
        <button onClick={closeEditor} className="text-white">
          <RxCross2 size={22} />
        </button>
      </div>
      <div className="flex flex-col p-4 flex-grow overflow-y-auto">
        <input
          type="text"
          value={noteTitle}
          onChange={changeTitle}
          className="text-2xl mb-4 p-2 border-b border-gray-300 focus:border-pink-300 bg-transparent"
          placeholder="Title goes here..."
        />
        <textarea
          value={noteBody}
          onChange={changeBody}
          className="flex-1 p-2 resize-none  bg-transparent"
          placeholder="Write whatever you want..."
        />
      </div>
    </div>
  );
};

export default NoteEditor;
