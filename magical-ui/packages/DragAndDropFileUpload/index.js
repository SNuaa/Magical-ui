import mDragAndDropFileUpload from './index.vue'
mDragAndDropFileUpload.install = app => {
    app.component(mDragAndDropFileUpload.name, mDragAndDropFileUpload)
}
export default mDragAndDropFileUpload