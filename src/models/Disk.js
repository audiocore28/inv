import { Model } from 'pinia-orm'
import Micro from './Micro'

export default class Disk extends Model {

  static entity = 'disks'

  static fields () {
    return {
      id: this.uid(),
      dop: this.attr(),
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
      subPrice: this.attr(0),
      salesPrice: this.attr(0),
      shippingCollected: this.attr(0),
      shippingCost: this.attr(0),
      costOfGoods: this.attr(0),
      totalCost: this.attr(0),
      profit: this.attr(0),
      category: this.attr('hdd'),
      desc: this.attr(''),
      text: this.attr(''),
      micro: this.belongsTo(Micro, 'microId')
    }
  }

}