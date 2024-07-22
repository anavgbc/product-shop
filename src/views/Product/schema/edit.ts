import * as yup from 'yup';

export const formSchema = yup.object({
    nome: yup.string().required('Campo obrigatório'),
    valor: yup.string().required('Campo obrigatório'),
    categoria: yup.string().required('Campo obrigatório'),
    descricao: yup.string().optional(),
});
