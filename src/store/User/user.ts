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
            router.push('/login');
        },
    },
    getters: {
        getEmail(state) {
            return state.user?.email;
        },
        getName(state) {
            return state.user?.nome;
        },
        getUser(state) {
            return state.user;
        },
        getToken() {
            const isStored = localStorage.getItem('@user');
            if (isStored) {
                return true;
            }
        },
    },
});
