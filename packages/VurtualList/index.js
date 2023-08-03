import mVurtualList from './index.vue'
mVurtualList.install = app => {
    app.component(mVurtualList.name, mVurtualList)
}
export default mVurtualList