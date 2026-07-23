import { Model } from 'pinia-orm'
import Memory from './Memory'
import Solid from './Solid'
import Disk from './Disk'
import { formatSize } from '../utils/format';

export default class Micro extends Model {
  static entity = 'micros'

  static fields () {
    return {
      id: this.uid(),
      brand: this.attr(''),
      model: this.attr(''),
      series: this.attr(''),
      formFactor: this.attr(''),
      wifi: this.attr(false),
      adapter: this.attr(0),
      remarks: this.attr(''),
      available: this.attr(false),
      date: this.attr(''),
      salesPrice: this.attr(0),
      shippingCollected: this.attr(0),
      shippingCost: this.attr(0),
      costOfGoods: this.attr(0),
      totalCost: this.attr(0),
      profit: this.attr(0),
      category: this.attr('micro'),
      memories: this.hasMany(Memory, 'microId'),
      solids: this.hasMany(Solid, 'microId'),
      disks: this.hasMany(Disk, 'microId'),
    }
  }

  get text() {
    let specs = `${this.brand} ${this.model} ${this.series} ${this.formFactor}`;

    this.memories.forEach(memory => {
      specs += `
${memory.brand} ${memory.capacity}GB ${memory.gen} ${memory.speed}mhz`;
    });

    this.solids.forEach(solid => {
      specs += `
${solid.brand} ${solid.series} ${formatSize(solid.capacity)} : ${solid.health}%`;
    });

    this.disks.forEach(disk => {
      specs += `
${disk.brand} ${disk.model} ${formatSize(disk.capacity)} : ${disk.year} - ${disk.health}%`;
    });

    return specs;
  }

}
