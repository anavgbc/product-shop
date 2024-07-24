import * as yup from 'yup';

export const formSchema = yup.object({
    email: yup.string().required('Campo obrigatório').email('Email inválido'),
    senha: yup
        .string()
        .required('Campo obrigatório')
        .min(4, 'Senha deve ter no mínimo 4 caracteres'),
});
