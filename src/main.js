import Vue from 'vue'
import App from './App.vue'
import Strategy from './mixins/Strategy.vue'
import EventBus from './events/EventBus';
import 'bootstrap'
import 'bootstrap/dist/css/bootstrap.min.css'
const $ = require('jquery')
// Lo declaramos globalmente
window.$ = $

window.EventBus = EventBus;

Vue.config.productionTip = false
Vue.mixin(Strategy)
new Vue({
	render: h => h(App),
}).$mount('#app')
