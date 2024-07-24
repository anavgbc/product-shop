import type { ServiceMap } from './interfaces';
import { AuthService } from '@/modules/auth/services/auth-service';
import { AuthService as AuthContract } from '@/shared/contracts/auth';

import { ProductService as ProductContract } from '@/shared/contracts/product';
import { ProductService } from '@/modules/product/services/products-service';

import { CategoriesService as CategoryContract } from '@/shared/contracts/category';
import { CategoriesService } from '@/modules/categories/services/categories-service';

const serviceMap: Record<symbol, any> = {
    [AuthContract]: AuthService,
    [ProductContract]: ProductService,
    [CategoryContract]: CategoriesService,
};

export default function useService<ContractKey extends keyof ServiceMap>(
    contract: ContractKey
): ServiceMap[ContractKey] {
    const selectedService = serviceMap[contract];

    return new selectedService();
}
