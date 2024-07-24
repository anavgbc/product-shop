import GetCategoryInputDto from '@/shared/dto/category/input/retrieve-category.dto';
import Category from '../../../../shared/types/category';
import Entity from '../entities/category';
import CreateCategoryInputDto from '@/shared/dto/category/input/create-category.dto';
import EditCategoryInputDto from '@/shared/dto/category/input/edit-category.dto';
import useService from '@/hooks/use-service';
import { CategoriesService as CategoryContract } from '@/shared/contracts/category';
import { toast } from 'vue-sonner';
import { CreateCategoryRequest } from '@/shared/types/category/request/craete-category';
import { genereateId } from '@/shared/utils';
import { getCategorytByIdRequest } from '@/shared/types/category/request/get-category';
import { UpdateCategoryByIdRequest } from '@/shared/types/category/request/update-category';
import { DeleteCategoryRequest } from '@/shared/types/category/request/delete-category';
import DeleteCategoryInputDto from '@/shared/dto/category/input/delete-category.dto';

const categoryService = useService(CategoryContract);

export async function listCategories(): Promise<Entity[]> {
    try {
        const categories = await categoryService.getAll();
        return categories.map((category: Category) => new Entity(category));
    } catch (err) {
        console.error(err);
        toast.error('Erro ao buscar categorias');
        throw err;
    }
}

export async function createCategory(
    request: CreateCategoryRequest
): Promise<void> {
    const existingCategory = request.categoryList.find(
        (category) => category.nome.toLowerCase() === request.nome.toLowerCase()
    );

    if (existingCategory) {
        toast.error(`Categoria ${request.nome} já cadastrada`);
        throw new Error('Categoria já cadastrada');
    }

    const input = new CreateCategoryInputDto({
        id: genereateId(),
        nome: request.nome,
    });

    await categoryService.create(input).then(() => {
        toast.success('Categoria criada com sucesso');
    });
}

export async function getCategory(
    request: getCategorytByIdRequest
): Promise<Entity> {
    try {
        const input = new GetCategoryInputDto(request);
        const category = await categoryService.getById(input);
        return new Entity(category);
    } catch (err) {
        console.error(err);
        throw err;
    }
}

export async function updateCategory(
    request: UpdateCategoryByIdRequest
): Promise<void> {
    const existingCategory = request.categoryList.find(
        (category) =>
            category.nome.toLowerCase() === request.category.nome.toLowerCase()
    );

    if (existingCategory) {
        toast.error(`Categoria ${request.category.nome} já cadastrada`);
        throw new Error('Categoria já cadastrada');
    }

    const input = new EditCategoryInputDto({
        id: request.id,
        category: { nome: request.category.nome },
    });
    await categoryService.update(input).then((res) => {
        toast.success(`Categoria ${res.nome} editada com sucesso`);
    });
}

export async function deleteCategory(
    request: DeleteCategoryRequest
): Promise<void> {
    try {
        const input = new DeleteCategoryInputDto(request);
        await categoryService.delete(input).then(() => {
            toast.success('Categoria deletada com sucesso');
        });
    } catch (err) {
        console.error(err);
        throw err;
    }
}
