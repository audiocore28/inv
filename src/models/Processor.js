import { Model } from 'pinia-orm'
import Micro from './Micro'

export default class Processor extends Model {

  static entity = 'processors'

  static fields () {
    return {
      id: this.uid(),
      dop: this.attr(''),
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
      subPrice: this.attr(0),
      salesPrice: this.attr(0),
      shippingCollected: this.attr(0),
      shippingCost: this.attr(0),
      costOfGoods: this.attr(0),
      totalCost: this.attr(0),
      profit: this.attr(0),
      category: this.attr('cpu'),
      model: this.attr(''),
      desc: this.attr(''),
      text: this.attr(''),
      micro: this.belongsTo(Micro, 'microId')
    }
  }

}
