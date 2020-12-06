
const test = async context => {
  context.data.test = "hello world"
  
  return context;
};
module.exports = {
    before: {
      all: [],
      find: [],
      get: [],
      create: [test],
      update: [],
      patch: [],
      remove: []
    },
  
    after: {
      all: [],
      find: [],
      get: [],
      create: [],
      update: [],
      patch: [],
      remove: []
    },
  
    error: {
      all: [],
      find: [],
      get: [],
      create: [],
      update: [],
      patch: [],
      remove: []
    }
  };
  