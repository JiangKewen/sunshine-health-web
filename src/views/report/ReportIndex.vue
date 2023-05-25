<template>
  <section class="ff-main">
    <div class="ff-main-search">
      <!-- TODO 传参待确认 -->
      <a-form :model="formState" layout="inline" :label-col="labelCol" :wrapper-col="wrapperCol">
        <a-form-item label="姓名">
          <a-input
            class="f-input"
            v-model:value="formState.personName"
            allowClear
            placeholder="请输入"
          />
        </a-form-item>
        <a-form-item label="体检时间" style="width: 420px">
          <a-range-picker v-model:value="formState.year" allowClear />
        </a-form-item>
      </a-form>
      <div>
        <a-button
          style="margin-right: 8px"
          @click="
            () => {
              formState.personName = ''
              formState.year = ''
              getData(1)
            }
          "
          >重置</a-button
        >
        <a-button type="primary" @click="getData(1)">查询</a-button>
      </div>
    </div>

    <div class="ff-main-table">
      <div class="ff-table-header">
        <h3>报告列表</h3>
        <div>
          <a-button type="primary" @click="onAdd">新增</a-button>
        </div>
      </div>
      <div class="table-body">
        <a-table :dataSource="dataSource" :columns="columns" :pagination="pagination">
          <template #bodyCell="{ column, record }">
            <template v-if="column.key === 'modifyDate'">
              <span>{{ timeFormat(record.modifyDate) }}</span>
            </template>
            <template v-if="column.key === 'action'">
              <a-button class="ff-btns" @click="onEdit(record)">编辑</a-button>
              <a-popconfirm
                title="确认删除?"
                ok-text="删除"
                cancel-text="取消"
                @confirm="onDelete(record)"
              >
                <a-button>删除</a-button>
              </a-popconfirm>
            </template>
          </template>
        </a-table>
      </div>
    </div>
  </section>

  <a-modal v-if="ifModalDone" v-model:visible="visibleModel" :title="visibleTitle" @ok="handleOk">
    <a-form
      :model="addFormState.data"
      autocomplete="off"
      :label-col="addLabelCol"
      :wrapper-col="addWrapperCol"
      ref="formRef"
    >
      <a-form-item
        name="personId"
        label="客户姓名"
        :rules="[{ required: true, message: '请选择客户' }]"
      >
        <a-select
          ref="select"
          v-model:value="addFormState.data.personId"
          allowClear
          placeholder="请选择"
          :options="personAll"
          :fieldNames="{
            label: 'idName',
            value: 'id',
            options: 'options'
          }"
        >
          <template #dropdownRender="{ menuNode: menu }">
            <v-nodes :vnodes="menu" />
            <a-divider style="margin: 4px 0" />
            <a-pagination
              style="text-align: center"
              v-model:current="modalPage.current"
              :total="modalPage.total"
              show-less-items
              @change="(page) => changeModalPage(page, $event)"
            />
          </template>
        </a-select>
      </a-form-item>
      <a-form-item
        name="recordDate"
        label="报告时间"
        :rules="[{ required: true, message: '请输入报告时间' }]"
      >
        <a-date-picker
          style="width: 100%"
          v-model:value="addFormState.data.recordDate"
          allowClear
        />
      </a-form-item>
      <a-form-item label="上传报告" :rules="[{ required: true, message: '请上传报告' }]">
        <!-- accept=".pdf" -->
        <a-upload
          v-model:file-list="fileList"
          name="file"
          :action="fileURL"
          :maxCount="1"
          :headers="{
            Token: Token
          }"
          @change="onFile"
        >
          <a-button>
            <upload-outlined></upload-outlined>
            上传文件
          </a-button>
        </a-upload>
      </a-form-item>
    </a-form>
  </a-modal>
</template>

<script setup>
import {
  getReportPage,
  postReport,
  putReport,
  delReport,
  getRerportDetail,
  getPersonPage
} from '@/service/api'
import dayjs from 'dayjs'
import { UploadOutlined } from '@ant-design/icons-vue'
import {
  message,
  Modal as AModal,
  Button as AButton,
  Input as AInput,
  Form as AForm,
  FormItem as AFormItem,
  Popconfirm as APopconfirm,
  RangePicker as ARangePicker,
  Table as ATable,
  Select as ASelect,
  // SelectOption as ASelectOption,
  Divider as ADivider,
  Pagination as APagination,
  DatePicker as ADatePicker,
  Upload as AUpload
} from 'ant-design-vue'
import { timeFormat } from '@/utils/index'
import { reactive, ref, computed } from 'vue'

// 搜索数据
const formState = reactive({
  personName: '',
  year: '',
  startDate: '',
  endDate: ''
})
const labelCol = { style: { width: '80px' } }
const wrapperCol = { span: 14 }

// 表格数据
const dataSource = ref([])
const columns = [
  {
    title: '客户姓名',
    dataIndex: 'personName',
    key: 'personName'
  },
  {
    title: '体检时间',
    dataIndex: 'recordDate',
    key: 'recordDate'
  },
  {
    title: '创建时间',
    dataIndex: 'modifyDate',
    key: 'modifyDate'
  },
  {
    title: '操作',
    dataIndex: 'action',
    key: 'action',
    width: '240px'
  }
]
const pagination = reactive({
  defaultPageSize: 10,
  showQuickJumper: true,
  current: 1,
  pageSize: 10,
  total: 12,
  pageSizeOptions: ['10', '20'],
  showSizeChanger: true,
  showTotal: (total) => `共 ${total} 条`,
  onChange: getData,
  onShowSizeChange: (current, size) => {
    getData(1, size)
  }
})

function getData(current, size = pagination.pageSize) {
  pagination.current = current
  pagination.pageSize = size
  dataSource.value = []
  pagination.total = 0
  const params = {
    personName: formState.personName
  }
  if (formState.year && formState.year.length) {
    params.startDate = dayjs(formState.year[0]).format('YYYY-MM-DD')
    params.endDate = dayjs(formState.year[1]).format('YYYY-MM-DD')
  }
  getReportPage({
    params: {
      currPage: pagination.current,
      pageSize: pagination.pageSize,
      ...params
    }
  }).then((res) => {
    // createDate: 1684551340000
    // creator: 1
    // creatorName: "系统管理员"
    // delFlag: false
    // id: 1
    // recordDate: 56959685
    // personId: "张三"
    // ossUrl: "13456787678"
    // modifyDate: 1684551340000
    if (res.code === 200) {
      dataSource.value = res.data.list
      pagination.total = res.data.totalCount
    }
  })
}
getData(1)

const onDelete = (data) => {
  delReport({
    params: {
      id: data.id
    }
  })
    .then((res) => {
      if (res.code === 200) {
        message.success('删除报告成功')
        getData(1)
      } else {
        message.error(res.msg || '删除报告失败')
      }
    })
    .catch((err) => {
      message.error(err.message || '删除报告失败，请稍后再试')
    })
}

// 弹窗数据
const initForm = {
  personId: undefined,
  recordDate: '',
  ossUrl: ''
}
const fileList = ref([])
const addFormState = reactive({
  data: {}
})
initAddFormState()
function initAddFormState() {
  addFormState.data = JSON.parse(JSON.stringify(initForm))
}
function setAddFormState(obj) {
  for (const key in addFormState.data) {
    if (Object.hasOwnProperty.call(addFormState.data, key)) {
      addFormState.data[key] = obj[key]
    }
  }
  addFormState.data['personId'] = obj['personId']
}
const editId = ref(null)

const addLabelCol = { style: { width: '80px' } }
const addWrapperCol = { span: 18 }

const visibleModel = ref(false)
const visibleTitle = ref('新增报告')
const ifAdd = computed(() => {
  return visibleTitle.value === '新增报告'
})

const onAdd = () => {
  getModalData()
  visibleModel.value = true
  visibleTitle.value = '新增报告'
  initAddFormState()
  editId.value = null
  fileList.value = []
}

const onEdit = (data) => {
  getModalData()
  getRerportDetail({
    params: {
      id: data.id
    }
  })
    .then((res) => {
      if (res.code === 200) {
        const detail = res.data

        editId.value = detail.id
        setAddFormState(detail)
        addFormState.data.recordDate = dayjs(detail.recordDate)
        fileList.value = detail.ossUrl ? [{ name: detail.personName || detail.recordDate }] : []
        visibleModel.value = true
        visibleTitle.value = '编辑报告'
      } else {
        message.error(res.msg || '获取报告信息失败')
      }
    })
    .catch((err) => {
      message.error(err.message || '获取报告信息失败')
    })
}

const formRef = ref(null)
const handleOk = () => {
  formRef.value.validateFields(['personId', 'recordDate']).then((valid) => {
    if (!addFormState.data.ossUrl) {
      message.error('请上传文件')
      return
    }
    if (valid) {
      if (!ifAdd.value) {
        submitEdit()
      } else {
        submitAdd()
      }
    }
  })
}

const submitAdd = () => {
  postReport({
    data: {
      ...addFormState.data,
      recordDate: dayjs(addFormState.data.recordDate).format('YYYY-MM-DD')
    }
  })
    .then((res) => {
      if (res.code === 200) {
        message.success('新增报告成功')
        getData(1)
        visibleModel.value = false
      } else {
        message.error(res.msg || '新增报告失败')
      }
    })
    .catch((err) => {
      message.error(err.message || '新增报告失败，请稍后再试')
    })
}

const submitEdit = () => {
  putReport({
    data: {
      id: editId.value,
      ...addFormState.data,
      recordDate: dayjs(addFormState.data.recordDate).format('YYYY-MM-DD')
    }
  })
    .then((res) => {
      if (res.code === 200) {
        message.success('编辑报告成功')
        getData(1)
        visibleModel.value = false
      } else {
        message.error(res.msg || '编辑报告失败')
      }
    })
    .catch((err) => {
      message.error(err.message || '编辑报告失败，请稍后再试')
    })
}

// 弹窗初始化数据
const fileURL = import.meta.env.VITE_APP_BASEURL + '/api/common/upload/submit'
const Token = window.localStorage.getItem('TOKEN')
const modalPage = reactive({
  current: 1,
  total: 0
})
const select = ref(null)
const changeModalPage = (val) => {
  select.value.focus()
  getModalData(val, true)
}
const personAll = ref([])
let personInitAll = []
const ifModalDone = ref(false)
const getModalData = (current = 1, handle = false) => {
  initPersonAll()
  if (ifModalDone.value && !handle) return
  ifModalDone.value = true
  modalPage.current = current
  getPersonPage({
    params: {
      currPage: modalPage.current,
      pageSize: 10
    }
  }).then((res) => {
    if (res.code === 200) {
      personInitAll = res.data.list
      modalPage.total = res.data.totalCount
      initPersonAll()
    }
  })
}
function initPersonAll() {
  personAll.value = personInitAll
}

const VNodes = (_, { attrs }) => {
  return attrs.vnodes
}

const onFile = (info) => {
  if (info.file.status !== 'uploading') {
    if (info.file?.response.code === 200) {
      addFormState.data.ossUrl = info.file.response.data
    } else {
      message.error(info.file.response.msg || '上传失败，请稍后再试')
    }
  }
}
</script>

<style scoped lang="scss"></style>
