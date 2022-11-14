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
export const putDb = async (content) => {
  console.log('🚀 ~ file: database.js ~ line 17 ~ putDb ~ content', content);
  const wordDb = await openDB('jate', 1);
  const tAxe = wordDb.transaction('jate', 'readwrite');
  const store = tAxe.objectStore('jate');
  const request = store.put({ id: 1, value: content });
  const result = await request;
};

// // TODO: Add logic for a method that gets all the content from the database
export const getDb = async () => {
  console.log('GET');
  const wordDb = await openDB('jate', 1);
  const tAxe = wordDb.transaction('jate', 'readonly');
  const store = tAxe.objectStore('jate');
  //*i have no idea why getAll doesn't work, it just doesnt
  const request = store.get(1);
  const result = await request;
  return result.value;
};

initdb();
