import { Model } from 'pinia-orm'
import Micro from './Micro'
import { formatSize } from '../utils/format';

export default class Processor extends Model {

  static entity = 'processors'

  static fields () {
    return {
      id: this.uid(),
      brand: this.attr(''),
      series: this.attr(''),
      tier: this.attr(''),
      gen: this.attr(0),
      sku: this.attr(0),
      suffix: this.attr(0),
      core: this.attr(0),
      thread: this.attr(0),
      speed: this.attr(0),
      graphic: this.attr(''),
      available: this.boolean(false),
      microId: this.attr(null),
      date: this.attr(),
      salesPrice: this.attr(0),
      shippingCollected: this.attr(0),
      shippingCost: this.attr(0),
      costOfGoods: this.attr(0),
      totalCost: this.attr(0),
      profit: this.attr(0),
      category: this.attr('cpu'),
      micro: this.belongsTo(Micro, 'microId')
    }
  }

  get model() {
    return `${this.tier}-${this.gen}${this.sku}${this.suffix}`;
  }

  get text() {
    return `
${this.brand} ${this.series} ${this.model}

${this.core} cores / ${this.thread} threads
${this.speed.toFixed(2)} mhz
${this.graphic}
        `;
  }

}
