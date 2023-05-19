// import Antd from 'ant-design-vue'
import {
  Button,
  Input,
  ConfigProvider,
  Form,
  FormItem,
  DatePicker,
  Table,
  Menu,
  Dropdown,
  MenuItem
} from 'ant-design-vue'
import 'ant-design-vue/dist/antd.less'
// import '@/assets/ant.less'

// // import { Modal, message} from 'ant-design-vue';
// import 'ant-design-vue/es/message/style/css'
// import 'ant-design-vue/es/modal/style/css'
// import 'ant-design-vue/es/config-provider/style/css'
// import 'ant-design-vue/es/form/style/css'
// // import 'ant-design-vue/es/form-item/style/css'
// import 'ant-design-vue/es/time-picker/style/css'
// import 'ant-design-vue/es/table/style/css'
// import 'ant-design-vue/es/menu/style/css'
// import 'ant-design-vue/es/dropdown/style/css'
// // import 'ant-design-vue/es/menu-item/style/css'

export default {
  install(app) {
    app.use(Button)
    app.use(Input)
    app.use(ConfigProvider)
    app.use(Form)
    app.use(FormItem)
    app.use(DatePicker)
    app.use(Table)
    app.use(Menu)
    app.use(Dropdown)
    app.use(MenuItem)
  }
}
