import mBigFileUpload from './index.vue'
mBigFileUpload.install = app => {
    app.component(mBigFileUpload.name, mBigFileUpload)
}
export default mBigFileUpload