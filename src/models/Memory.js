import { Model } from 'pinia-orm'
import Micro from './Micro'
import { formatSize } from '../utils/format';

export default class Memory extends Model {

  static entity = 'memories'

  static fields () {
    return {
      id: this.uid(),
      capacity: this.number(),
      gen: this.string(''),
      speed: this.number(),
      formFactor: this.string(''),
      brand: this.string(''),
      detail1: this.string(''),
      detail2: this.string(''),
      available: this.boolean(),
      microId: this.attr(null),
      date: this.string(),
      salesPrice: this.number(),
      shippingCollected: this.number(),
      shippingCost: this.number(),
      costOfGoods: this.number(),
      totalCost: this.number(),
      profit: this.number(),
      category: this.string('ram'),
      micro: this.belongsTo(Micro, 'microId')
    }
  }

  get text() {
    return `${formatSize(this.capacity)} ${this.gen} ${this.speed}mhz ${this.brand}`;
  }

}
