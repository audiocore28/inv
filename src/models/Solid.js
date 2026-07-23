import { Model } from 'pinia-orm'
import Micro from './Micro'
import { formatSize } from '../utils/format';

export default class Solid extends Model {

  static entity = 'solids'

  static fields () {
    return {
      id: this.uid(),
      capacity: this.attr(0),
      form: this.attr(''),
      interface: this.attr(''),
      brand: this.attr(''),
      series: this.attr(''),
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
      category: this.attr('ssd'),
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
