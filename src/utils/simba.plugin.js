import axios from './simba.axios'
import _ from './simba'
export default {
    install(Vue, options) {

        Vue.prototype.$msg = function (type, message, onClose) {
            this.$message({
                type,
                message,
                duration: 1000,
                onClose
            });
        }

        Vue.prototype.$warn = function (message = "警告！", onClose) {
            this.$msg("warning", message, onClose)
        }

        Vue.prototype.$success = function (message = "操作成功！", onClose) {
            this.$msg("success", message, onClose)
        }

        Vue.prototype.$failed = function (message = "操作失败！", onClose) {
            this.$msg("error", message, onClose)
        }

        Vue.prototype.$get = function (url, data) {
            return axios.get(url, data)
        }
        Vue.prototype.$post = function (url, data) {
            return axios.post(url, data)
        }
        if (options && options.color) {
            _.loadingbar.config.color = options.color
        }
        Vue.prototype.$loadingbar = _.loadingbar
    }
}