const fs = require('fs');
const path = require('path');

const dataDir = path.join(__dirname, '../../data');
const dbFilePath = path.join(dataDir, 'db.json');

if (!fs.existsSync(dataDir)) {
  fs.mkdirSync(dataDir, { recursive: true });
}

const defaultState = {
  users: [],
  studentProfiles: [],
  schemes: [],
  eligibilityRules: [],
  applications: [],
  documents: [],
  deficiencies: [],
  officerReviews: [],
  notifications: [],
  disbursements: [],
  auditLogs: []
};

function readDB() {
  try {
    if (!fs.existsSync(dbFilePath)) {
      writeDB(defaultState);
      return defaultState;
    }
    const data = fs.readFileSync(dbFilePath, 'utf8');
    return JSON.parse(data);
  } catch (error) {
    console.error('Error reading database file:', error);
    return defaultState;
  }
}

function writeDB(data) {
  try {
    fs.writeFileSync(dbFilePath, JSON.stringify(data, null, 2), 'utf8');
  } catch (error) {
    console.error('Error writing to database file:', error);
  }
}

module.exports = {
  getCollection: (collectionName) => {
    const db = readDB();
    return db[collectionName] || [];
  },
  saveCollection: (collectionName, items) => {
    const db = readDB();
    db[collectionName] = items;
    writeDB(db);
    return items;
  },
  find: (collectionName, filterFn) => {
    const items = module.exports.getCollection(collectionName);
    return items.filter(filterFn);
  },
  findOne: (collectionName, filterFn) => {
    const items = module.exports.getCollection(collectionName);
    return items.find(filterFn);
  },
  insert: (collectionName, item) => {
    const items = module.exports.getCollection(collectionName);
    const newItem = {
      ...item,
      id: item.id || `id_${Date.now()}_${Math.random().toString(36).substr(2, 6)}`,
      createdAt: item.createdAt || new Date().toISOString(),
      updatedAt: new Date().toISOString()
    };
    items.push(newItem);
    module.exports.saveCollection(collectionName, items);
    return newItem;
  },
  update: (collectionName, filterFn, updateData) => {
    const items = module.exports.getCollection(collectionName);
    let updatedItem = null;
    const newItems = items.map((item) => {
      if (filterFn(item)) {
        updatedItem = { ...item, ...updateData, updatedAt: new Date().toISOString() };
        return updatedItem;
      }
      return item;
    });
    module.exports.saveCollection(collectionName, newItems);
    return updatedItem;
  },
  delete: (collectionName, filterFn) => {
    const items = module.exports.getCollection(collectionName);
    const newItems = items.filter((item) => !filterFn(item));
    module.exports.saveCollection(collectionName, newItems);
    return true;
  },
  readDB,
  writeDB
};
