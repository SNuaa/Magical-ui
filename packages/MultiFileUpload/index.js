import mMultiFileUpload from './index.vue'
mMultiFileUpload.install = app => {
    app.component(mMultiFileUpload.name, mMultiFileUpload)
}
export default mMultiFileUpload