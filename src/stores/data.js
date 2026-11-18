import { shallowRef } from 'vue';
import { defineStore } from 'pinia';
import { useRepo } from 'pinia-orm';
import { formatSize, capitalize } from '../utils/format';
import { calculateTotalCost, calculateProfit } from '../utils/calculate';
import Micro from '../models/Micro';
import Processor from '../models/Processor';
import Memory from '../models/Memory';
import Solid from '../models/Solid';
import Disk from '../models/Disk';

export const useDataStore = defineStore('data', () => {
  const microRepo = useRepo(Micro);
  const processorRepo = useRepo(Processor);
  const memoryRepo = useRepo(Memory);
  const solidRepo = useRepo(Solid);
  const diskRepo = useRepo(Disk);

  const API = ''; // Replace with your actual API endpoint

  // --- State ---------------------------------------------
  const processorMap = shallowRef([]);
  const memoryMap = shallowRef([]);
  const diskMap = shallowRef([]);
  const solidMap = shallowRef([]);

  // --- Actions ---------------------------------------------
  const processorRemap = (processors) => {
    processorMap.value = processors.map(cpu => {
      const totalCost = calculateTotalCost(cpu);
      const profit = calculateProfit(cpu);

      return {
        ...cpu,
        totalCost,
        profit,
        model: `${cpu.tier}-${cpu.gen}${cpu.sku}${cpu.suffix}`,
        desc: `${capitalize(cpu.brand)} ${capitalize(cpu.series)} ${cpu.tier}-${cpu.gen}${cpu.sku}${cpu.suffix}`,
        text: `
  ${capitalize(cpu.brand)} ${capitalize(cpu.series)} ${cpu.tier}-${cpu.gen}${cpu.sku}${cpu.suffix} (${cpu.gen}th Gen)
  
  ${cpu.core} cores / ${cpu.thread} threads
  ${cpu.speed.toFixed(2)} mhz
  ${cpu.graphic}
          `,
      }
    });
  };

  const memoryRemap = (memories) => {
    memoryMap.value = memories.map(ram => {
      const totalCost = calculateTotalCost(ram);
      const profit = calculateProfit(ram);

      return {
        ...ram,
        totalCost,
        profit,
        text: `${formatSize(ram.capacity)} ${ram.gen.toUpperCase()} ${ram.speed}mhz ${ram.brand}`,
      }
    });
  };

  const solidRemap = (solids) => {
    solidMap.value = solids.map(ssd => {
      const totalCost = calculateTotalCost(ssd);
      const profit = calculateProfit(ssd);

      return {
        ...ssd,
        totalCost,
        profit,
        formInterface: `${ssd.form === 'm.2' ? '' : `${ssd.form}`} ${ssd.size} ${ssd.interface}`,
        ssdDesc: `${formatSize(ssd.capacity)} ${ssd.form === 'm.2' ? 'm.2' : ''} ${ssd.interface === 'nvme' ? 'NVMe' : 'SSD'} ${ssd.size} ${ssd.brand} ${ssd.series} ${ssd.health > 0 ? `(${ssd.health}% health)` : ''}`,
        desc: `${formatSize(ssd.capacity)} ${ssd.interface.toUpperCase()} ${ssd.size} ${ssd.brand} ${ssd.series} ${ssd.health > 0 ? `: ${ssd.health}%` : ''}`,
        text: `
  ${formatSize(ssd.capacity)} SSD ${ssd.form} inch ${ssd.brand} ${ssd.series} ${ssd.health}% health
  
  ${formatSize(ssd.capacity)} Solid State Drive / SSD
  ${ssd.form} inch 
  ${ssd.brand} ${ssd.series}
  ${ssd.interface.toUpperCase()}
  ${ssd.health}% health
        `,
      }
    });
  };

  const diskRemap = (disks) => {
    diskMap.value = disks.map(disk => {
      const totalCost = calculateTotalCost(disk);
      const profit = calculateProfit(disk);

      return {
        ...disk,
        totalCost,
        profit,
        desc: `${formatSize(disk.capacity)} ${disk.brand} ${disk.model} : ${disk.year} ${disk.health > 0 ? `- ${disk.health}%` : ''}`,
        text: `
${formatSize(disk.capacity)} HDD ${disk.form} inch ${disk.brand} ${disk.model} ${disk.health > 0 ? `(${disk.health}% health)` : ''};

${formatSize(disk.capacity)} Hard Disk Drive / HDD
${disk.form} inch 
${disk.brand} ${disk.model}
${disk.rpm}rpm
${disk.health > 0 ? `${disk.health}% health` : ''}
${disk.year}

For Laptop / External Storage
          `,
      }
    });
  };

  const fetchAndSyncData = async () => {
    try {
      const response = await fetch(API); 
      const { micros, cpus, rams, ssds, disks } = await response.json();

      processorRemap(cpus);
      memoryRemap(rams);
      solidRemap(ssds);
      diskRemap(disks);

      microRepo.save(micros);
      processorRepo.save(processorMap.value);
      memoryRepo.save(memoryMap.value);
      solidRepo.save(solidMap.value);
      diskRepo.save(diskMap.value);

    } catch (error) {
      console.error('Error fetching data', error);
    }
  };

  return {
    fetchAndSyncData,
  };

});