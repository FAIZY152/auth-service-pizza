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
    throw new Error('Error Creating tenant: ' + error.message);
  }
};

export const GetTenates = async () => {
  try {
    const tenateRepo = AppDataSource.getRepository(Tenant);
    return await tenateRepo.find();
  } catch (error) {
    throw new Error('Error fetching tenants: ' + error.message);
  }
};
