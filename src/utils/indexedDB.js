import localforage from 'localforage';

// Initialize stores for different health metrics
export const bpStore = localforage.createInstance({ name: 'chengeto', storeName: 'bloodPressure' });
export const sugarStore = localforage.createInstance({ name: 'chengeto', storeName: 'bloodSugar' });
export const weightStore = localforage.createInstance({ name: 'chengeto', storeName: 'weightBMI' });
export const symptomStore = localforage.createInstance({ name: 'chengeto', storeName: 'symptoms' });

/**
 * Save a new entry to a specific store
 */
export async function saveHealthData(store, data) {
  const id = Date.now().toString();
  const entry = { id, timestamp: new Date().toISOString(), ...data };
  await store.setItem(id, entry);
  return entry;
}

/**
 * Get all entries from a specific store, sorted by timestamp descending
 */
export async function getHealthData(store) {
  const items = [];
  await store.iterate((value) => {
    items.push(value);
  });
  return items.sort((a, b) => new Date(b.timestamp) - new Date(a.timestamp));
}

/**
 * Clear all data from a store
 */
export async function clearHealthData(store) {
  await store.clear();
}
