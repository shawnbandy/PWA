import { openDB } from 'idb';

const initdb = async () =>
  openDB('jate', 1, {
    upgrade(db) {
      if (db.objectStoreNames.contains('jate')) {
        console.log('jate database already exists');
        return;
      }
      db.createObjectStore('jate', { keyPath: 'id', autoIncrement: true });
      console.log('jate database created');
    },
  });

// // TODO: Add logic to a method that accepts some content and adds it to the database
//*i think they mean POST for this? readme says nothing about editing
export const putDb = async (content) => {
  const wordDb = await openDB('jate', 1);
  const tAxe = wordDb.transaction('jate', 'readwrite');
  const store = tAxe.objectStore('jate');
  const request = store.put({
    data: content,
  });
  const result = await request;
  console.log('result', result);
  return result;
};

// // TODO: Add logic for a method that gets all the content from the database
export const getDb = async () => {
  const wordDb = await openDB('jate', 1);
  const tAxe = wordDb.transaction('jate', 'readonly');
  const store = tAxe.objectStore('jate');
  const request = store.getAll();
  const result = await request;
  console.log('result', result);
  return result;
};

initdb();
