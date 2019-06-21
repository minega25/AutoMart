/* eslint-disable class-methods-use-this */
import moment from 'moment';
import uuid from 'uuid';
import Query from '../helpers/dbquery';

class Flag {
  constructor() {
    this.flags = [];
  }

  // Add flag
  async add(data) {
    // Query string
    const insertFlag = `INSERT INTO flags(id,car_id,reason,description,createddate,modifieddate) 
    VALUES($1,$2,$3,$4,$5,$6) returning *`;
    const flag = {
      id: uuid.v4(),
      car_id: data.car_id || '',
      reason: data.reason || '',
      description: data.description || '',
      createdDate: moment().format(),
      modifiedDate: moment().format(),
    };
    const flagArr = Object.keys(flag).map(u => flag[u]);
    const { rows } = await Query(insertFlag, flagArr);
    return rows[0];
  }

  // Find flag by Id
  async findById(id) {
    const query = 'SELECT * FROM flags WHERE id=$1';
    const { rows } = await Query(query, [id]);
    return rows[0];
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
