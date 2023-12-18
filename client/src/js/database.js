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


// Export a function we will use to POST to the database.
export const putDb = async (content) => {

  // Create a connection to the database database and version we want to use.
  const todosDb = await openDB('jate', 1);

  // Create a new transaction and specify the database and data privileges.
  const tx = todosDb.transaction('jate', 'readwrite');

  // Open up the desired object store.
  const store = tx.objectStore('jate');

  // Use the .putt() method on the store and pass in the content.
  const request = store.put({ id: 1, value: content });

  // Get confirmation of the request.
  const result = await request;
  console.log('Data saved to the database', result);
};

// Export a function we will use to GET all from the database.
export const getDb = async () => {

  // Create a connection to the database database and version we want to use.
  const todosDb = await openDB('jate', 1);

  // Create a new transaction and specify the database and data privileges.
  const tx = todosDb.transaction('jate', 'readonly');

  // Open up the desired object store.
  const store = tx.objectStore(1);

  // Use the .getAll() method to get all data in the database.
  const request = store.getAll();

   // Get confirmation of the request.
  const result = await request;
  console.log('result.value', result);
  return result;
};

initdb();
