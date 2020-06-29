import Item from './ItemModel';

class ItemService {
  /**
   * 
   * @param {String} id - id of the Item instance
   * @returns {Object} User | null
   */
  async getItem(id) {
    return Item.findById(id);
  }
}

export default new ItemService();