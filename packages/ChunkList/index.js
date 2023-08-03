import mChunkList from './index.vue'
mChunkList.install = app => {
    app.component(mChunkList.name, mChunkList)
}
export default mChunkList