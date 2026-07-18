import { Model } from 'pinia-orm'
import Micro from './Micro'
import { formatSize } from '../utils/format';

export default class Solid extends Model {

  static entity = 'solids'

  static fields () {
    return {
      id: this.uid(),
      capacity: this.number(),
      form: this.string(''),
      interface: this.string(''),
      brand: this.string(''),
      series: this.string(''),
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
      category: this.string('ssd'),
      micro: this.belongsTo(Micro, 'microId')
    }
  }

  get text() {
    return `
${formatSize(this.capacity)} SSD ${this.form} inch ${this.brand} ${this.series} ${this.health}% health

${formatSize(this.capacity)} Solid State Drive / SSD
${this.form} inch 
${this.brand} ${this.series}
${this.interface}
${this.health}% health
    `;
  }

}
