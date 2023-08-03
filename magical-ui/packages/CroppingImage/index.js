import mCroppingImage from './index.vue'
mCroppingImage.install = app => {
    app.component(mCroppingImage.name, mCroppingImage)
}
export default mCroppingImage