import ApiService from '@/shared/client/api';
import User from '../../../shared/types/user';
import Contract from '@/shared/contracts/auth';

export class AuthService extends ApiService implements Contract {
    constructor() {
        super('', null);
    }

    public async getUsers(): Promise<User[]> {
        try {
            const { data } = await this.apiInstance.get<User[]>('/users');

            return data;
        } catch (err) {
            console.error(err);
            throw new Error('Authentication failed.');
        }
    }
}
