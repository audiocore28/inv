import { Model } from 'pinia-orm'
import Micro from './Micro'
import { formatSize } from '../utils/format';

export default class Memory extends Model {

  static entity = 'memories'

  static fields () {
    return {
      id: this.uid(),
      capacity: this.attr(0),
      gen: this.attr(''),
      speed: this.attr(0),
      formFactor: this.attr(''),
      brand: this.attr(''),
      detail1: this.attr(''),
      detail2: this.attr(''),
      available: this.boolean(false),
      microId: this.attr(null),
      date: this.attr(),
      salesPrice: this.attr(0),
      shippingCollected: this.attr(0),
      shippingCost: this.attr(0),
      costOfGoods: this.attr(0),
      totalCost: this.attr(0),
      profit: this.attr(0),
      category: this.attr('ram'),
      micro: this.belongsTo(Micro, 'microId')
    }
  }

  get text() {
    return `${formatSize(this.capacity)} ${this.gen} ${this.speed}mhz ${this.brand}`;
  }

}
