import { Model } from 'pinia-orm'
import Processor from './Processor'
import Memory from './Memory'
import Solid from './Solid'
import Disk from './Disk'

export default class Micro extends Model {

  static entity = 'micros'

  static fields () {
    return {
      id: this.uid(),
      dop: this.attr(),
      brand: this.attr(''),
      model: this.attr(''),
      series: this.attr(''),
      formFactor: this.attr(''),
      isWifi: this.attr(false),
      isHdmi: this.attr(false),
      isTypeC: this.attr(false),
      isLocked: this.attr(false),
      adapter: this.attr(0),
      remarks: this.attr(''),
      available: this.attr(false),
      date: this.attr(''),
      subPrice: this.attr(0),
      salesPrice: this.attr(0),
      shippingCollected: this.attr(0),
      shippingCost: this.attr(0),
      costOfGoods: this.attr(0),
      category: this.attr('micro'),
      processors: this.hasOne(Processor, 'microId'),
      memories: this.hasMany(Memory, 'microId'),
      solids: this.hasMany(Solid, 'microId'),
      disks: this.hasOne(Disk, 'microId'),
    }
  }

}