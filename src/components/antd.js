// import Antd from 'ant-design-vue'
import {
  Button,
  Input,
  ConfigProvider,
  Form,
  FormItem,
  RangePicker,
  Table,
  Menu,
  Dropdown,
  MenuItem
} from 'ant-design-vue'
import 'ant-design-vue/dist/antd.less'
// import '@/assets/ant.less'

// import { Modal, message} from 'ant-design-vue';
// import 'ant-design-vue/es/message/style/css'
// import 'ant-design-vue/es/modal/style/css'

export default {
  install(app) {
    app.use(Button)
    app.use(Input)
    app.use(ConfigProvider)
    app.use(Form)
    app.use(FormItem)
    app.use(RangePicker)
    app.use(Table)
    app.use(Menu)
    app.use(Dropdown)
    app.use(MenuItem)
  }
}
