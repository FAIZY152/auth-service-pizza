import { AppDataSource } from '../config/data-source';
import { Tenant } from '../entity/Tenate';
import { ITenate, TenantQueryParams } from '../types';

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

export const GetById = async (id: number) => {
  try {
    const tenateRepo = AppDataSource.getRepository(Tenant);
    return await tenateRepo.findOneBy({ id });
  } catch (error) {
    throw new Error('Error fetching tenant by ID: ' + error.message);
  }
};

export const GetAllTenates = async () => {
  try {
    const tenantRepo = AppDataSource.getRepository(Tenant);
    return await tenantRepo.find();
  } catch (error) {
    throw new Error('Error fetching all tenants: ' + error.message);
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

export const DeleteT = async (id: number) => {
  try {
    const tenateRepo = AppDataSource.getRepository(Tenant);
    const tenant = await tenateRepo.delete(id);
    return tenant;
  } catch (error) {
    throw new Error('Error deleting tenant: ' + error.message);
  }
};

export const getAll = async (validatedQuery: TenantQueryParams) => {
  const tenateRepo = AppDataSource.getRepository(Tenant);

  const queryBuilder = tenateRepo.createQueryBuilder('tenant');

  if (validatedQuery.q) {
    const searchTerm = `%${validatedQuery.q}%`;
    queryBuilder.where("CONCAT(tenant.name, ' ', tenant.address) ILike :q", {
      q: searchTerm,
    });
  }

  const result = await queryBuilder
    .skip((validatedQuery.currentPage - 1) * validatedQuery.perPage)
    .take(validatedQuery.perPage)
    .orderBy('tenant.id', 'DESC')
    .getManyAndCount();
  return result;
};
