//导入组件
import mButton from "./button/index";
import mInput from "./input/index";
import mTextarea from "./textarea/index";
import mSpace from "./Space/index";
import mSelect from "./select/index";
import mRadio from "./radio/index";
import mSingleFileUpload from "./SingleFileUpload/index";
import mMultiFileUpload from "./MultiFileUpload/index";
import mDragAndDropFileUpload from "./DragAndDropFileUpload/index";
import mBigFileUpload from "./BigFileUpload/index";
import mCroppingImage from "./CroppingImage/index";
import mCompressingImage from "./CompressingImage/index";
import mExcelAnalysis from "./ExcelAnalysis/index";
// import mExcelExport from "./ExcelExport/index";
import mPagination from "./pagination/index";
import mChunkList from "./ChunkList/index";
import mVurtualList from "./VurtualList/index";
import mprogress from "./progress/index";


import mTable from "./table/index";
import Message from "./message/index";


//存在所有组件
const components = [
  mButton,
  mInput,
  mTextarea,
  mTable,
  mSpace,
  Message,
  mSelect,
  mRadio,
  mSingleFileUpload,
  mMultiFileUpload,
  mDragAndDropFileUpload,
  mBigFileUpload,
  mCroppingImage,
  mCompressingImage,
  mExcelAnalysis,
  // mExcelExport,
  mPagination,
  mChunkList,
  mVurtualList,
  mprogress
];
const install = (app) => {
  components.forEach((i) => {
    app.use(i)
  })
}
const mzlUi = {
  version: '0.0.0',
  install
}
/* istanbul ignore if */
if (typeof window !== 'undefined' && window.Vue) {
  install(window.Vue)
}
export {
  // 导出的对象必须具有 install，才能被 app.use() 方法安装
  install,
  // 以下是具体的组件列表
  mButton,
  mInput,
  mTextarea,
  mTable,
  mSpace,
  Message,
  mSelect,
  mRadio,
  mSingleFileUpload,
  mMultiFileUpload,
  mDragAndDropFileUpload,
  mBigFileUpload,
  mCroppingImage,
  mCompressingImage,
  mExcelAnalysis,
  // mExcelExport,
  mPagination,
  mChunkList,
  mVurtualList,
  mprogress
}
export default mzlUi
