<template>
  <section class="ff-main">
    <div class="ff-main-search">
      <a-form :model="formState" layout="inline" :label-col="labelCol" :wrapper-col="wrapperCol">
        <a-form-item label="姓名" style="margin-bottom: 0">
          <a-input class="f-input" v-model:value="formState.name" allowClear placeholder="请输入" />
        </a-form-item>
      </a-form>
      <div>
        <a-button
          style="margin-right: 8px"
          @click="
            () => {
              formState.name = ''
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
        <h3>用户列表</h3>
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

  <a-modal
    v-if="ifModalDone"
    v-model:visible="visibleModel"
    :confirmLoading="loading"
    :maskClosable="false"
    :title="visibleTitle"
    @ok="handleOk"
  >
    <a-form
      ref="formRef"
      :model="addFormState.data"
      :label-col="addLabelCol"
      :wrapper-col="addWrapperCol"
    >
      <a-form-item name="name" :rules="rules.name" label="姓名">
        <a-input v-model:value="addFormState.data.name" allowClear placeholder="请输入" />
      </a-form-item>
      <a-form-item name="username" :rules="rules.username" label="用户名">
        <a-input v-model:value="addFormState.data.username" allowClear placeholder="请输入" />
      </a-form-item>
      <a-form-item name="password" :rules="rules.password" v-if="ifAdd" label="密码">
        <a-input v-model:value="addFormState.data.password" allowClear placeholder="请输入" />
      </a-form-item>
      <a-form-item name="roleIdList" :rules="rules.roleIdList" label="角色">
        <a-select
          ref="select"
          v-model:value="addFormState.data.roleIdList"
          allowClear
          mode="multiple"
          placeholder="请选择"
        >
          <a-select-option v-for="item in roleAll" :key="item.roleId" :value="item.roleId">
            {{ item.roleName }}
          </a-select-option>
        </a-select>
      </a-form-item>
    </a-form>
  </a-modal>
</template>

<script setup>
import { getRoleAll, getUserList, postUser, putUser, delUser, getUserDetail } from '@/service/api'
import {
  message,
  Modal as AModal,
  Button as AButton,
  Input as AInput,
  Form as AForm,
  FormItem as AFormItem,
  Popconfirm as APopconfirm,
  Table as ATable,
  Select as ASelect,
  SelectOption as ASelectOption
} from 'ant-design-vue'
import { timeFormat } from '@/utils/index'
import { reactive, ref, computed } from 'vue'

// 搜索数据
const formState = reactive({
  name: ''
})
const labelCol = { style: { width: '80px' } }
const wrapperCol = { span: 14 }

// 表格数据
const dataSource = ref([])
const columns = [
  {
    title: '用户名',
    dataIndex: 'username',
    key: 'username'
  },
  {
    title: '姓名',
    dataIndex: 'name',
    key: 'name'
  },
  {
    title: '创建时间',
    dataIndex: 'modifyDate',
    key: 'modifyDate'
  },
  // {
  //   title: '用户角色',
  //   dataIndex: 'roleIdList',
  //   key: 'roleIdList'
  // },
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
  getUserList({
    params: {
      currPage: pagination.current,
      pageSize: pagination.pageSize,
      ...formState
    }
  }).then((res) => {
    // createDate: 1684328054000
    // creator: 1
    // creatorName: "系统管理员"
    // delFlag: false
    // id: 2
    // mobile: "18868717684"
    // modifyDate: 1684328054000
    // name: "管理人sjj"
    // password: "02d962295e2c10f56cce5b14175e4fe7f04351d57db4ce60c1e144364694356d"
    // roleIdList: null
    // salt: "DzHrklquvnFj3pmTCWjh"
    // status: false
    // userType: 107002
    // username: "glrsjj"
    if (res.code === 200) {
      dataSource.value = res.data.list
      pagination.total = res.data.totalCount
    }
  })
}
getData(1)

const onDelete = (data) => {
  delUser({
    params: {
      id: data.id
    }
  })
    .then((res) => {
      if (res.code === 200) {
        message.success('删除用户成功')
        getData(1)
      } else {
        message.error(res.msg || '删除用户失败')
      }
    })
    .catch((err) => {
      message.error(err.message || '删除用户失败，请稍后再试')
    })
}

// 弹窗数据
const loading = ref(false)
const initForm = {
  name: '',
  username: '',
  password: '',
  userType: '',
  status: '',
  roleIdList: []
}
const rules = {
  name: [{ required: true, message: '请输入姓名' }],
  username: [{ required: true, message: '请输入用户名' }],
  password: [{ required: true, message: '请输入密码' }],
  roleIdList: [{ required: true, message: '请选择角色' }]
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
const visibleTitle = ref('新增用户')
const ifAdd = computed(() => {
  return visibleTitle.value === '新增用户'
})

const onAdd = () => {
  getRoles()
  visibleModel.value = true
  visibleTitle.value = '新增用户'
  initAddFormState()
  editId.value = null
}

const onEdit = (data) => {
  getRoles()
  getUserDetail({
    params: {
      id: data.id
    }
  })
    .then((res) => {
      if (res.code === 200) {
        const detail = res.data

        editId.value = detail.id
        setAddFormState(detail)
        addFormState.data.roleIdList = detail.roleIdList ? [...detail.roleIdList] : []
        delete addFormState.data.password
        visibleModel.value = true
        visibleTitle.value = '编辑用户'
      } else {
        message.error(res.msg || '获取用户信息失败')
      }
    })
    .catch((err) => {
      message.error(err.message || '获取用户信息失败')
    })
}

const formRef = ref(null)
const handleOk = () => {
  formRef.value.validateFields(['name', 'username', 'password', 'roleIdList']).then((valid) => {
    if (valid) {
      if (!ifAdd.value) {
        if (loading.value) return
        loading.value = true
        submitEdit()
      } else {
        submitAdd()
      }
    }
  })
}

const submitAdd = () => {
  postUser({
    data: {
      ...addFormState.data
    }
  })
    .then((res) => {
      if (res.code === 200) {
        message.success('新增用户成功')
        getData(1)
        visibleModel.value = false
      } else {
        message.error(res.msg || '新增用户失败')
      }
    })
    .catch((err) => {
      message.error(err.message || '新增用户失败，请稍后再试')
    })
    .finally(() => {
      setTimeout(() => {
        loading.value = false
      }, 500)
    })
}

const submitEdit = () => {
  putUser({
    data: {
      id: editId.value,
      ...addFormState.data
    }
  })
    .then((res) => {
      if (res.code === 200) {
        message.success('编辑用户成功')
        getData(1)
        visibleModel.value = false
      } else {
        message.error(res.msg || '编辑用户失败')
      }
    })
    .catch((err) => {
      message.error(err.message || '编辑用户失败，请稍后再试')
    })
    .finally(() => {
      setTimeout(() => {
        loading.value = false
      }, 500)
    })
}

// 弹窗初始化数据
const roleAll = ref([])
const ifModalDone = ref(false)
const getRoles = () => {
  if (ifModalDone.value) return
  ifModalDone.value = true
  getRoleAll().then((res) => {
    if (res.code === 200) {
      roleAll.value = res.data
    }
  })
}
</script>

<style scoped lang="scss"></style>
