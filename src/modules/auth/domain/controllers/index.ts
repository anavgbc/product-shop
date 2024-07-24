import Entity from '../../domain/entities/user';
import { AuthService as AuthContract } from '@/shared/contracts/auth';
import { useUserStore } from '@/shared/stores/user';
import router from '@/registerModules/router';
import { toast } from 'vue-sonner';
import { AuthenticateRequest } from '@/shared/types/user/requests';
import useService from '@/hooks/use-service';

const authService = useService(AuthContract);

const _userStore = useUserStore();

export async function authenticate(input: AuthenticateRequest): Promise<void> {
    try {
        const users = await authService.getUsers();

        const firstUser = users && new Entity(users[0]);

        if (
            firstUser.email === input.email &&
            firstUser.senha === input.senha
        ) {
            _userStore.setUser(firstUser);
            router.push({ name: 'home' });
            return;
        } else {
            toast.error('Email ou senha incorretos');
            return;
        }
    } catch (err) {
        console.error('Authentication error:', err);
        throw err;
    }
}
