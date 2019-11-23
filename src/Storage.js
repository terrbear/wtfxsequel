function ensureStorage(connection) {
  if (!localStorage[connection]) {
    localStorage[connection] = JSON.stringify({});
  }
}

function retrieve(connection) {
  ensureStorage(connection);
  return JSON.parse(localStorage[connection]);
}

function persist(connection, store) {
  localStorage[connection] = JSON.stringify(store);
}

function storage(connection, cb) {
  const store = retrieve(connection);
  const retVal = cb(store);
  persist(connection, store);
  return retVal;
}

export default class {
  constructor(connection) {
    this.connection = connection;
  }

  get = (key) => storage(this.connection, store => store[key]);

  set = (key, val) => {
    storage(this.connection, store => {
      store[key] = val;
    });
    return val;
  };

  clear = () => (localStorage[this.connection] = "{}");

  delete = key => {
    storage(this.connection, store => {
      delete store[key];
    });
    return key;
  };
}
