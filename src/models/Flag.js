import moment from 'moment';
import uuid from 'uuid';

class Flag {
  constructor() {
    this.flags = [];
  }

  // Add flag
  async add(data) {
    const flag = {
      id: uuid.v4(),
      car_id: data.car_id || '',
      reason: data.reason || '',
      description: data.description || '',
      created_on: moment(),
      modifiedDate: moment(),
    };
    this.flags.push(flag);
    return flag;
  }

  // Find flag by Id
  findById(id) {
    return this.flags.find(flag => flag.id === id);
  }

  // Find all flags
  findAll() {
    return this.flags;
  }

  // Update a flag
  async update(id, data) {
    const flag = this.findById(id);
    const index = this.flags.indexOf(flag);
    this.flags[index].amount = data.amount || flag.amount;
    this.flags[index].modifiedDate = moment.now();

    return this.flags;
  }

  // Delete flag by id
  delete(id) {
    const flag = this.findById(id);
    const index = this.flags.indexOf(flag);
    this.flags.splice(index, 1);

    return this.flags;
  }
}

export default Flag;
