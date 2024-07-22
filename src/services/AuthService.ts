import ApiService from './api';
import AuthenticateInputDto from './dtos/Auth/input/authenticate.dto';
import User from './entities/User';

export class AuthService extends ApiService implements AuthService {
    constructor() {
        super('', null);
    }

    public async Authenticate(_: AuthenticateInputDto): Promise<User[]> {
        try {
            const { data } = await this.apiInstance.get('/users');

            return data.map((user: any) => new User(user));
        } catch (err) {
            console.error(err);
            throw new Error('Authentication failed.');
        }
    }
}
