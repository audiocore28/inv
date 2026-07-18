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
      brand: this.string(''),
      model: this.string(''),
      series: this.string(''),
      formFactor: this.string(''),
      wifi: this.boolean(),
      adapter: this.number(),
      remarks: this.string(''),
      available: this.boolean(),
      date: this.string(''),
      salesPrice: this.number(),
      shippingCollected: this.number(),
      shippingCost: this.number(),
      costOfGoods: this.number(),
      totalCost: this.number(),
      profit: this.number(),
      category: this.string('micro'),
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
