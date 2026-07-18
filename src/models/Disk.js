import { Model } from 'pinia-orm'
import Micro from './Micro'
import { formatSize } from '../utils/format';

export default class Disk extends Model {

  static entity = 'disks'

  static fields () {
    return {
      id: this.uid(),
      form: this.string(''),
      capacity: this.number(),
      rpm: this.number(),
      brand: this.string(''),
      model: this.string(''),
      year: this.number(),
      health: this.number(),
      available: this.boolean(),
      microId: this.attr(null),
      date: this.string(),
      salesPrice: this.number(),
      shippingCollected: this.number(),
      shippingCost: this.number(),
      costOfGoods: this.number(),
      totalCost: this.number(),
      profit: this.number(),
      category: this.string('hdd'),
      micro: this.belongsTo(Micro, 'microId')
    }
  }

  get text() {
    return `
${formatSize(this.capacity)} HDD ${this.form} inch ${this.brand} ${this.model} ${this.health}% health

${formatSize(this.capacity)} Hard Disk Drive / HDD
${this.form} inch 
${this.brand} ${this.model}
${this.rpm}rpm
${this.health}% health
${this.year}

For Laptop / External Storage
        `;
  }

}
