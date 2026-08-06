import { Model } from 'pinia-orm'
import Processor from './Processor'
import Memory from './Memory'
import Solid from './Solid'
import Disk from './Disk'
import { formatSize, capitalize } from '../utils/format';

export default class Micro extends Model {
  static entity = 'micros'

  static fields () {
    return {
      id: this.uid(),
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
      salesPrice: this.attr(0),
      shippingCollected: this.attr(0),
      shippingCost: this.attr(0),
      costOfGoods: this.attr(0),
      totalCost: this.attr(0),
      profit: this.attr(0),
      category: this.attr('micro'),
      processors: this.hasOne(Processor, 'microId'),
      memories: this.hasMany(Memory, 'microId'),
      solids: this.hasMany(Solid, 'microId'),
      disks: this.hasOne(Disk, 'microId'),
    }
  }

  get cpu() {
    return this.processors !== null ? `${capitalize(this.processors.series)} ${this.processors.tier} ${this.processors.gen}th gen •` : '';
  }

  get cpuDesc() {
    return this.processors !== null ? `${capitalize(this.processors.desc)} (${this.processors.gen}th gen - ${this.processors.core}cores / ${this.processors.thread}threads)` : '';
  }

  get ssd() {
    if (this.solids.length > 0) {
      const capacity = this.solids[0]?.capacity ? `${this.solids[0]?.capacity}gb` : '';
      const form = this.solids[0]?.form === 'm.2' ? 'm.2' : '';
      const connection = this.solids[0]?.interface === 'nvme' ? 'NVMe •' : 'SSD •';

      return `${capacity} ${form} ${connection}`;
    } else {
      return '';
    } 
  }

  get ram() {
    if (this.memories.length > 0) {
      const totalCap = this.memories.reduce((acc, ram) => acc + ram.capacity, 0);
  
      return `${totalCap}GB ${this.memories[0]?.gen.toUpperCase() || 'RAM'} •`
    } else {
      return '';
    }
  }


  get text() {
    let specs = `${this.isWifi ? 'WiFi Ready •' : ''} ${this.cpu} ${this.ssd} ${this.ram} ${this.formFactor === 'micro' || this.formFactor === 'mini' || this.formFactor === 'tiny' ? 'Desktop Mini PC' : ''}

${capitalize(this.brand)} ${capitalize(this.model)} ${this.series} ${this.formFactor}
${this.formFactor === 'micro' || this.formFactor === 'mini' || this.formFactor === 'tiny' ? 'Mini Desktop Computer' : ''}
${this.adapter > 90 ? '' : '• Power Efficient'}
${this.formFactor === 'micro' || this.formFactor === 'mini' || this.formFactor === 'tiny' ? '• Compact and Space-Saving' : ''}
  `; 

    specs += `
${this.cpuDesc}`;

    this.memories.forEach(memory => {
      if (this.memories.length === 1) {
        specs += `
${memory.text} (slot used 1 of 2)`;
      } else {
        specs += `
${memory.text}`;
      }
    });

    this.solids.forEach(solid => {
      if (solid.interface === 'nvme') {
        specs += `
${solid.ssdDesc} (faster than 2.5" ssd)`;
      } else {
        specs += `
${solid.ssdDesc}`;
      }
    });

      specs += `
${this.disks?.desc || ''}`;

    specs += `
${this.isWifi ? 'Built-in WiFi' : ''}
${this.isTypeC ? 'USB Type-C' : ''}
Display port
${this.isHdmi ? 'HDMI port' : ''}
${this.isLocked ? 'BIOS Locked' : ''}
Windows 10 / 11 Pro (Digital License Activated)
Microsoft Office

Unit with orig ${capitalize(this.brand)} ${this.adapter}w power adapter`;

    return specs;
  }

}
