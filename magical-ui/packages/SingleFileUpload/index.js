import mSingleFileUpload from './index.vue'
mSingleFileUpload.install = app => {
    app.component(mSingleFileUpload.name, mSingleFileUpload)
}
export default mSingleFileUpload