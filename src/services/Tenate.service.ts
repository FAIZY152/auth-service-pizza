import { AppDataSource } from '../config/data-source';
import { Tenant } from '../entity/Tenate';
import { ITenate } from '../types';

export const AddTenate = async (tenateData: ITenate) => {
  try {
    const tenateRepo = AppDataSource.getRepository(Tenant);
    const tenant = tenateRepo.create(tenateData);
    await tenateRepo.save(tenant);
    return tenant;
  } catch (error) {
    console.error('Error adding tenant:', error);
  }
};
