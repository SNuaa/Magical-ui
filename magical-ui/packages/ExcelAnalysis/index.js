import mExcelAnalysis from './index.vue'
mExcelAnalysis.install = app => {
    app.component(mExcelAnalysis.name, mExcelAnalysis)
}
export default mExcelAnalysis