import * as yup from 'yup';

export const formSchema = yup.object({
    nome: yup.string().required('Campo obrigatório'),
});
