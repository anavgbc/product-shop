import User from '../../../shared/types/user';

export default interface AuthService {
    getUsers(): Promise<User[]>;
}

export const AuthService = Symbol('AuthService');
