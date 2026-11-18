import { Model } from 'pinia-orm'
import Micro from './Micro'

export default class Solid extends Model {

  static entity = 'solids'

  static fields () {
    return {
      id: this.uid(),
      dop: this.attr(''),
      capacity: this.attr(0),
      form: this.attr(''),
      size: this.attr(0),
      interface: this.attr(''),
      brand: this.attr(''),
      series: this.attr(''),
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
      category: this.attr('ssd'),
      formInterface: this.attr(''),
      ssdDesc: this.attr(''),
      desc: this.attr(''),
      text: this.attr(''),
      micro: this.belongsTo(Micro, 'microId')
    }
  }
  
}
