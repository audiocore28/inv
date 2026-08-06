import { Model } from 'pinia-orm'
import Micro from './Micro'
import { formatSize } from '../utils/format';

export default class Disk extends Model {

  static entity = 'disks'

  static fields () {
    return {
      id: this.uid(),
      form: this.attr(''),
      capacity: this.attr(0),
      rpm: this.attr(0),
      brand: this.attr(''),
      model: this.attr(''),
      year: this.attr(0),
      health: this.attr(0),
      available: this.boolean(false),
      microId: this.attr(null),
      date: this.attr(),
      salesPrice: this.attr(0),
      shippingCollected: this.attr(0),
      shippingCost: this.attr(0),
      costOfGoods: this.attr(0),
      totalCost: this.attr(0),
      profit: this.attr(0),
      category: this.attr('hdd'),
      micro: this.belongsTo(Micro, 'microId')
    }
  }

  get desc() {
    return `${formatSize(this.capacity)} ${this.brand} ${this.model} : ${this.year} ${this.health > 0 ? `- ${this.health}%` : ''}`;
  }

  get text() {
    return `
${formatSize(this.capacity)} HDD ${this.form} inch ${this.brand} ${this.model} ${this.health > 0 ? `(${this.health}% health)` : ''};

${formatSize(this.capacity)} Hard Disk Drive / HDD
${this.form} inch 
${this.brand} ${this.model}
${this.rpm}rpm
${this.health > 0 ? `${this.health}% health` : ''}
${this.year}

For Laptop / External Storage
        `;
  }

}
