import { defineStore } from 'pinia';
import User from '../../services/entities/User';
import router from '../../router';

interface State {
    user: null | User;
}

export const useUserStore = defineStore('user', {
    state: (): State => ({
        user: null,
    }),
    actions: {
        setUser(user: User) {
            this.user = user;
            localStorage.setItem('@user', JSON.stringify(user));
        },
        logout() {
            this.user = null;
            localStorage.clear();
            router.push({ name: 'login' });
        },
    },
    getters: {
        getEmail(state) {
            return state.user?.email;
        },
        getName(state) {
            return state.user?.nome;
        },
        getUser() {
            const user = localStorage.getItem('@user');
            if (user) {
                const { value } = JSON.parse(user);
                return value;
            }
        },
        getToken() {
            const isStored = localStorage.getItem('@user');
            if (isStored) {
                return true;
            }
        },
    },
});
