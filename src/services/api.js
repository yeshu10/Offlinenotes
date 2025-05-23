import axios from 'axios';
let currentNotesRequest = null;
let backendURL = import.meta.env.VITE_BACKEND_URL;

const api = axios.create({
  baseURL: `${backendURL}/api`,
  headers: {
    'Content-Type': 'application/json',
  },
});
export const notesAPI = {
  getAllNotes: async (page = 1, limit = 10, showArchived = false) => {
    try {
      if (currentNotesRequest) 
      {
        console.log('Cancelling previous notes request');
        currentNotesRequest.cancel();
      }
      const CancelToken = axios.CancelToken;
      const source = CancelToken.source();
      currentNotesRequest = source;
      console.log('Fetching notes with params:', { page, limit, showArchived });
      
      const response = await api.get('/notes', {
        params: { page, limit, showArchived },
        cancelToken: source.token
      });
      
      currentNotesRequest = null;
      
      console.log('Got notes response:', response.data);
      return response.data;
    } 
    catch (error) {   
      if (axios.isCancel(error)) {
        console.log('Request was cancelled:', error.message);
        throw new Error('Request cancelled');
      }
      
      console.error('Failed to fetch notes:', error);
      throw new Error(error.response?.data?.message || 'Failed to fetch notes');
    }
  },
  getNote: async (id) => {
    try {
      const response = await api.get(`/notes/${id}`);
      return response.data;
    } catch (error) {
      throw new Error(error.response?.data?.message || 'Failed to fetch note');
    }
  },
  createNote: async (title, content = '') => {
    try {
      const response = await api.post('/notes', { 
        title: title.trim(),
        content: content.trim() || 'New note'
      });
      return response.data;
    } catch (error) {
      throw new Error(error.response?.data?.message || 'Failed to create note');
    }
  },
  updateNote: async (id, data) => {
    try {
      const response = await api.patch(`/notes/${id}`, data);
      return response.data;
    } catch (error) {
      throw new Error(error.response?.data?.message || 'Failed to update note');
    }
  },
  deleteNote: async (id) => {
    try {
      const response = await api.delete(`/notes/${id}`);
      return response.data;
    } catch (error) {
      throw new Error(error.response?.data?.message || 'Failed to delete note');
    }
  },
 
};

export default api; 