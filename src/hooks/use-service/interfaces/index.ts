import { AuthService } from '@/modules/auth/services/auth-service';
import type { AuthService as AuthContract } from '@/shared/contracts/auth';

import { ProductService } from '@/modules/product/services/products-service';
import type { ProductService as ProductContract } from '@/shared/contracts/product';

import { CategoriesService as CategoryContract } from '@/shared/contracts/category';
import { CategoriesService } from '@/modules/categories/services/categories-service';

export interface ServiceMap {
    [AuthContract]: AuthService;
    [ProductContract]: ProductService;
    [CategoryContract]: CategoriesService;
}
