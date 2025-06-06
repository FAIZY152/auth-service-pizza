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

export const GetById = async (id: number) => {
  try {
    const tenateRepo = AppDataSource.getRepository(Tenant);
    return await tenateRepo.findOneBy({ id });
  } catch (error) {
    throw new Error('Error fetching tenant by ID: ' + error.message);
  }
};

export const Update = async (id: number, tenateData: ITenate) => {
  try {
    const tenateRepo = AppDataSource.getRepository(Tenant);
    await tenateRepo.update(id, tenateData);
    return await GetById(id);
  } catch (error) {
    throw new Error('Error updating tenant: ' + error.message);
  }
};
