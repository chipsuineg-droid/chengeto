import localforage from 'localforage';

// Initialize stores for different health metrics
export const bpStore = localforage.createInstance({ name: 'chengeto', storeName: 'bloodPressure' });
export const sugarStore = localforage.createInstance({ name: 'chengeto', storeName: 'bloodSugar' });
export const weightStore = localforage.createInstance({ name: 'chengeto', storeName: 'weightBMI' });
export const symptomStore = localforage.createInstance({ name: 'chengeto', storeName: 'symptoms' });
export const artStore = localforage.createInstance({ name: 'chengeto', storeName: 'artMedication' });

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
 * Update an existing entry
 */
export async function updateHealthData(store, id, data) {
  const existing = await store.getItem(id);
  if (existing) {
    const updated = { ...existing, ...data };
    await store.setItem(id, updated);
    return updated;
  }
  return null;
}

/**
 * Delete an entry
 */
export async function deleteHealthData(store, id) {
  await store.removeItem(id);
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
