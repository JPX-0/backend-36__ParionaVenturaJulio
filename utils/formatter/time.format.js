const createFormat = (obj) => ({
  ...obj,
  createdAt: new Date(),
  updatedAt: new Date()
});
const updateFormat = (obj) => ({
  ...obj,
  updatedAt: new Date()
});

export { 
  createFormat,
  updateFormat
};