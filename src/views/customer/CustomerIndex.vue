<template>
  <section class="ff-main">
    <div class="ff-main-search">
      <a-form :model="formState" layout="inline" :label-col="labelCol" :wrapper-col="wrapperCol">
        <a-form-item label="姓名" style="margin-bottom: 0">
          <a-input
            class="f-input"
            v-model:value="formState.idName"
            allowClear
            placeholder="请输入"
          />
        </a-form-item>
        <a-form-item label="身份证" style="margin-bottom: 0">
          <a-input
            class="f-input"
            v-model:value="formState.idCard"
            allowClear
            placeholder="请输入"
          />
        </a-form-item>
      </a-form>
      <div>
        <a-button
          style="margin-right: 8px"
          @click="
            () => {
              formState.idName = ''
              formState.idCard = ''
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
        <h3>档案列表</h3>
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
      ref="formRef"
      :model="addFormState.data"
      :label-col="addLabelCol"
      :wrapper-col="addWrapperCol"
    >
      <a-form-item name="idName" label="姓名" :rules="rules.idName">
        <a-input v-model:value="addFormState.data.idName" allowClear placeholder="请输入" />
      </a-form-item>
      <a-form-item name="idCard" label="身份证" :rules="rules.idCard">
        <a-input v-model:value="addFormState.data.idCard" allowClear placeholder="请输入" />
      </a-form-item>
      <a-form-item name="mobile" label="手机号" :rules="rules.mobile">
        <a-input v-model:value="addFormState.data.mobile" allowClear placeholder="请输入" />
      </a-form-item>
    </a-form>
  </a-modal>
</template>

<script setup>
import { getPersonPage, postPerson, putPerson, delPerson, getPersonDetail } from '@/service/api'
import {
  message,
  Modal as AModal,
  Button as AButton,
  Input as AInput,
  Form as AForm,
  FormItem as AFormItem,
  Popconfirm as APopconfirm,
  Table as ATable
} from 'ant-design-vue'
import { timeFormat } from '@/utils/index'
import { reactive, ref, computed } from 'vue'

// 搜索数据
const formState = reactive({
  name: '',
  idCard: ''
})
const labelCol = { style: { width: '80px' } }
const wrapperCol = { span: 14 }

const rules = {
  idName: [{ required: true, message: '请输入姓名' }],
  idCard: [
    {
      validator: async (_rule, value) => {
        if (!value) {
          return Promise.reject('请输入身份证')
        }
        if (!/(^\d{15}$)|(^\d{18}$)|(^\d{17}(\d|X|x)$)/.test(value)) {
          return Promise.reject('请输入合法身份证')
        }
        return Promise.resolve()
      },
      trigger: 'blur'
    }
  ],
  mobile: [
    {
      validator: async (_rule, value) => {
        if (!value) {
          return Promise.reject('请输入手机号')
        }
        if (!/^[1][3,4,5,7,8][0-9]{9}$/.test(value)) {
          return Promise.reject('请输入合法手机号')
        }
        return Promise.resolve()
      },
      trigger: 'blur'
    }
  ]
}

// 表格数据
const dataSource = ref([])
const columns = [
  {
    title: '姓名',
    dataIndex: 'idName',
    key: 'idName',
    width: 120
  },
  {
    title: '身份证',
    dataIndex: 'idCard',
    key: 'idCard'
  },
  {
    title: '手机号',
    dataIndex: 'mobile',
    key: 'mobile',
    width: 180,
    ellipsis: true
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
  getPersonPage({
    params: {
      currPage: pagination.current,
      pageSize: pagination.pageSize,
      ...formState
    }
  }).then((res) => {
    // createDate: 1684551340000
    // creator: 1
    // creatorName: "系统管理员"
    // delFlag: false
    // id: 1
    // idCard: 56959685
    // idName: "张三"
    // mobile: "13456787678"
    // modifyDate: 1684551340000
    if (res.code === 200) {
      dataSource.value = res.data.list
      pagination.total = res.data.totalCount
    }
  })
}
getData(1)

const onDelete = (data) => {
  delPerson({
    params: {
      id: data.id
    }
  })
    .then((res) => {
      if (res.code === 200) {
        message.success('删除档案成功')
        getData(1)
      } else {
        message.error(res.msg || '删除档案失败')
      }
    })
    .catch((err) => {
      message.error(err.message || '删除档案失败，请稍后再试')
    })
}

// 弹窗数据
const initForm = {
  idName: '',
  idCard: '',
  mobile: ''
}
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
}
const editId = ref(null)

const addLabelCol = { style: { width: '80px' } }
const addWrapperCol = { span: 18 }

const visibleModel = ref(false)
const visibleTitle = ref('新增档案')
const ifAdd = computed(() => {
  return visibleTitle.value === '新增档案'
})

const onAdd = () => {
  getRoles()
  visibleModel.value = true
  visibleTitle.value = '新增档案'
  initAddFormState()
  editId.value = null
}

const onEdit = (data) => {
  getRoles()
  getPersonDetail({
    params: {
      id: data.id
    }
  })
    .then((res) => {
      if (res.code === 200) {
        const detail = res.data

        editId.value = detail.id
        setAddFormState(detail)
        visibleModel.value = true
        visibleTitle.value = '编辑档案'
      } else {
        message.error(res.msg || '获取档案信息失败')
      }
    })
    .catch((err) => {
      message.error(err.message || '获取档案信息失败')
    })
}

const formRef = ref(null)
const handleOk = () => {
  formRef.value.validateFields(['idName', 'idCard', 'mobile']).then((valid) => {
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
  postPerson({
    data: {
      ...addFormState.data
    }
  })
    .then((res) => {
      if (res.code === 200) {
        message.success('新增档案成功')
        getData(1)
        visibleModel.value = false
      } else {
        message.error(res.msg || '新增档案失败')
      }
    })
    .catch((err) => {
      message.error(err.message || '新增档案失败，请稍后再试')
    })
}

const submitEdit = () => {
  putPerson({
    data: {
      id: editId.value,
      ...addFormState.data
    }
  })
    .then((res) => {
      if (res.code === 200) {
        message.success('编辑档案成功')
        getData(1)
        visibleModel.value = false
      } else {
        message.error(res.msg || '编辑档案失败')
      }
    })
    .catch((err) => {
      message.error(err.message || '编辑档案失败，请稍后再试')
    })
}

// 弹窗初始化数据
const ifModalDone = ref(false)
const getRoles = () => {
  if (ifModalDone.value) return
  ifModalDone.value = true
}
</script>

<style scoped lang="scss"></style>
