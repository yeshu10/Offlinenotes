import { openDB } from 'idb'

const dbName = 'offline-notes'
const storeName = 'notes'
const version = 1

async function openDatabase()
 {
  return openDB(dbName, version, {
    upgrade(db) {
      if (!db.objectStoreNames.contains(storeName)) {
        const store = db.createObjectStore(storeName, { keyPath: 'id' })
        store.createIndex('updatedAt', 'updatedAt')
        store.createIndex('synced', 'synced')
      }
    }
  })
 }

const dbService = 
{
  fetchNotes: async () =>
  {
    const db = await openDatabase()
    let notes = await db.getAll(storeName)
    notes = notes.sort((a, b) => new Date(b.updatedAt) - new Date(a.updatedAt))
    return notes
  },

  getNote: async (id) =>
  {
    const db = await openDatabase()
    return db.get(storeName, id)
  },

  addNewNote: async (note) => {
    const db = await openDatabase()
    const noteData = {
      ...note,
      synced: false,
      updatedAt: new Date().toISOString()
    }
    try {
      await db.add(storeName,noteData)
      return noteData
    } catch (e) {
      console.error('Could not add note', e)
    }
  },

  updateNote: async (note) => {
    const db = await openDatabase()
    const current = await db.get(storeName, note.id)
    if (!current) return null
    const updated = {
      ...current,
      ...note,
      updatedAt: new Date().toISOString(),
      synced: false
    }
    await db.put(storeName, updated)
    return updated
  },

  delNote: async (id) => {
    const db = await openDatabase()
    await db.delete(storeName, id)
  },

  getunsyncedOnly: async () => {
    const db = await openDatabase()
    return db.transaction(storeName).store.index('synced').getAll(false)
  },

  markNoteAsSynced: async (id) => {
    const db = await openDatabase()
    const note = await db.get(storeName, id)
    if (note) {
      note.synced = true
      await db.put(storeName, note)
    }
  }
}

export default dbService;
