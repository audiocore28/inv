import { defineStore } from 'pinia';
import { useRepo } from 'pinia-orm';
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

  const fetchAndSyncData = async () => {
    try {
      const response = await fetch(API); 
      const { micros, cpus, rams, ssds, disks } = await response.json();

      microRepo.save(micros);
      processorRepo.save(cpus);
      memoryRepo.save(rams);
      solidRepo.save(ssds);
      diskRepo.save(disks);

    } catch (error) {
      console.error('Error fetching data', error);
    }
  };

  return {
    fetchAndSyncData,
  };

});