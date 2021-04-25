import axios from 'axios';
import router from '../router';

const state = {
    token: localStorage.getItem('token') || '',
    user: {},
    status: '',
    error: null
};

const getters = {
    isLoggedIn: state => !!state.token,
    authState: state => state.status,
    user: state => state.user,
    error: state => state.error
};

const actions = {
    async login({ commit }, user) {
        try {
            commit('auth_request')
            let res = await axios.post('http://localhost:5000/Users/login', user)
            if(res.data.success){
            const token = res.data.token;
            const user = res.data.user;
            //store the token into local storage
            localStorage.setItem('token', token);
            localStorage.setItem('user', user._id)
            //set axios defaults
            axios.defaults.headers.common['Authorization'] = token;
            commit('auth_success', token, user)
        }
        return res
        } catch (err){
            commit('auth_error', err)
        }
    },

    //REGISTER
    async register({ commit }, userData){
        commit('register_request')
        let res = await axios.post("http://localhost:5000/Users/register", userData);
        try {
            if(res.data.success != undefined){
                commit('register_success');
            }
            return res;
        } catch (err) {
            commit('register_error', err)
        }
    },

    //USER
    async getUser({ commit }){
        commit('user_request')
        let res = await axios.get('http://localhost:5000/Users')
        commit('user_present', res.data.user)
        return res;
    },

    //LOGOUT
    async logout({commit}){
        await localStorage.removeItem('token');
        await localStorage.removeItem('user')
        await localStorage.removeItem('AuditionID')
        await localStorage.removeItem('PerformerID')
        commit('logout')
        delete axios.defaults.headers.common['Authorization'];
        router.push('/')
        return
    }
};

const mutations = {
    auth_request(state){
        state.error = null
        state.status = 'loading'
    },
    auth_success(state, token, user){
        state.token = token
        state.user = user
        state.status = 'success'
        state.error = null

    },
    auth_error(state, err){
        state.error = err.response.data.msg
    },
    register_request(state){
        state.error = null
        state.status = 'loading'
    },
    register_success(state){
        state.error = null
        state.status = 'success'
    },
    register_error(state, err){
        state.error = err.response.data.msg

    },
    logout(state){
        state.error = null
        state.status = ''
        state.token = ''
        state.user = ''
    },
    user_request(state){
        state.status = 'loading'
    },
    user_present(state, user){
        state.user = user
    },
    
    
};

export default {
    state,
    actions,
    mutations,
    getters
}