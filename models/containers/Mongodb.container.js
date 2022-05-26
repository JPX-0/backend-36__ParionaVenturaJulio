import mongoose from 'mongoose';
import { errorLogger } from '../../utils/config/logger.config.js';
import STATUS from '../../utils/constants/api.constants.js';
import formatResponse from '../../utils/formatter/send.format.js';

class MongoDBContainer {
  constructor(collection, Schema) {
    this.model = mongoose.model(collection, Schema);
  };

  async getAll(filter = {}) {
    try{
      const documents = await this.model.find(filter, { __v: 0 }).lean();
      return documents;
    }
    catch(error) {
      errorLogger.error(JSON.stringify(formatResponse(true, STATUS.INTERNAL_ERROR, error.message)));
      throw new Error(JSON.stringify(formatResponse(true, STATUS.INTERNAL_ERROR, error.message)));
    }
  }

  async getById(id) {
    try {
      const document = await this.model.findById({ _id:id }, { __v: 0 }).lean();
      if (!document) {
        const message = `Resource with id ${id} does not exist in our records`;
        errorLogger.error(JSON.stringify(formatResponse(true, STATUS.NOT_FOUND, message)));
        throw new Error(JSON.stringify(formatResponse(true, STATUS.NOT_FOUND, message)));
      } else return document;
    }
    catch(error) {
      errorLogger.error(JSON.stringify(formatResponse(true, STATUS.INTERNAL_ERROR, error.message)));
      throw new Error(JSON.stringify(formatResponse(true, STATUS.INTERNAL_ERROR, error.message)));
    }
  }

  async createItem(resourceItem) {
    try {
      const newItem = new this.model(resourceItem);
      await newItem.save();
      return newItem;
    }
    catch (err) {
      errorLogger.error(JSON.stringify(formatResponse(true, STATUS.INTERNAL_ERROR, error.message)));
      throw new Error(JSON.stringify(formatResponse(true, STATUS.INTERNAL_ERROR, error.message)));
    }
  }
  
  async deleteItem(id) {
    try {
      const document = await this.model.deleteOne({ _id: id });
      if (!document) {
        const message = `Resource with id ${id} does not exist in our records`;
        errorLogger.error(JSON.stringify(formatResponse(true, STATUS.NOT_FOUND, message)));
        throw new Error(JSON.stringify(formatResponse(true, STATUS.NOT_FOUND, message)));
      } else return `the ID: ${id} was removed successfully`;
    }
    catch(error) {
      errorLogger.error(JSON.stringify(formatResponse(true, STATUS.INTERNAL_ERROR, error.message)));
      throw new Error(JSON.stringify(formatResponse(true, STATUS.INTERNAL_ERROR, error.message)));
    }
  }
}

export default MongoDBContainer;