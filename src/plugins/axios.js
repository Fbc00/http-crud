import Vue from 'vue'
import axios from 'axios'
// axios.defaults.baseURL = 'https://curso-vue-e36bf-default-rtdb.firebaseio.com/'
// axios.defaults.headers.common['Authorization'] = 'abc123'
//  axios.defaults.headers.get['Accepts'] = 'application/json'
Vue.use({
    install(Vue) { 
        Vue.prototype.$http = axios.create ({
            baseURL: 'https://curso-vue-e36bf-default-rtdb.firebaseio.com/',
            headers: { 
                'Accepts': 'application/json',
                'Authorization': 'abc123'
            }
            
        })
        Vue.prototype.$http.interceptors.request.use(config => {
            return config
        }, error => {Promise.reject((error))})

        // Vue.prototype.$http.interceptors.response.use(response => {
        //     const array = []
        //     for (let key in response.data) {
        //         array.push({id: key, ...response.data[key]})
        //     }
        //     response.data = array
        //     console.log(response.data)
        //     return response.data
        // }, error => Promise.reject(error))
    }

})