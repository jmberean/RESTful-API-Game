import Vue from 'vue'
import App from './App.vue'
import router from './router'
import PictureTaker from "@/components/PictureTaker";
import PicturePicker from "@/components/PicturePicker";

Vue.config.productionTip = false
Vue.component('PictureTaker', PictureTaker);
Vue.component('PicturePicker', PicturePicker);

new Vue({
  router,
  render: h => h(App)
}).$mount('#app')
