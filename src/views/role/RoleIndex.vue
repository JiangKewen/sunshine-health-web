<template>
  <section class="ff-main">
    <!-- <div class="ff-main-search">
      <a-form :model="formState" layout="inline" :label-col="labelCol" :wrapper-col="wrapperCol">
        <a-form-item label="角色名称" style="margin-bottom: 0">
          <a-input class="f-input" v-model:value="formState.name" allowClear placeholder="请输入" />
        </a-form-item>
        <a-form-item label="创建时间" style="margin-bottom: 0">
          <a-range-picker class="f-input" v-model:value="formState.times" allowClear />
        </a-form-item>
      </a-form>
      <div>
        <a-button style="margin-right: 8px">重置</a-button>
        <a-button type="primary">查询</a-button>
      </div>
    </div> -->

    <div class="ff-main-table">
      <div class="ff-table-header">
        <h3>角色列表</h3>
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

  <a-modal v-model:visible="visibleModel" :title="visibleTitle" @ok="handleOk">
    <a-form :model="addFormState" :label-col="addLabelCol" :wrapper-col="addWrapperCol">
      <a-form-item label="角色名称">
        <a-input v-model:value="addFormState.name" allowClear placeholder="请输入" />
      </a-form-item>
    </a-form>
  </a-modal>
</template>

<script setup>
import { getRoleList, putRole, postRole, delRole } from '@/service/api'
import { timeFormat } from '@/utils/index'
import {
  message,
  Modal as AModal,
  Button as AButton,
  Input as AInput,
  Form as AForm,
  Popconfirm as APopconfirm,
  FormItem as AFormItem,
  // RangePicker as ARangePicker,
  Table as ATable
} from 'ant-design-vue'
import { reactive, ref } from 'vue'

// const formState = reactive({
//   name: '',
//   times: []
// })

// const labelCol = { style: { width: '80px' } }
// const wrapperCol = { span: 14 }

const dataSource = ref([])

const columns = [
  {
    title: '角色名称',
    dataIndex: 'roleName',
    key: 'roleName'
  },
  {
    title: '创建者',
    dataIndex: 'creatorName',
    key: 'creatorName'
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
  getRoleList({
    params: {
      currPage: pagination.current,
      pageSize: pagination.pageSize
    }
  }).then((res) => {
    // createDate: 1675761560000
    // creator: 1
    // creatorName: "系统管理员"
    // delFlag: false
    // menuIdList: null
    // modifyDate: 1677050047000
    // remark: null
    // roleId: 1
    // roleName: "系统管理员"

    // pageSize
    // totalCount
    // totalPage
    if (res.code === 200) {
      dataSource.value = res.data.list
      pagination.total = res.data.totalCount
    }
  })
}
getData(1)

const addFormState = reactive({
  name: ''
})
const editId = ref(null)

const addLabelCol = { style: { width: '80px' } }
const addWrapperCol = { span: 18 }

const visibleModel = ref(false)
const visibleTitle = ref('新增角色')
const onAdd = () => {
  visibleModel.value = true
  visibleTitle.value = '新增角色'
  editId.value = null
  addFormState.name = ''
}
const handleOk = () => {
  if (visibleTitle.value === '编辑角色') {
    submitEdit()
  } else {
    submitAdd()
  }
  // message.success('新增角色成功')
  // visibleModel.value = false
}

const onEdit = (data) => {
  addFormState.name = data.roleName
  editId.value = data.roleId
  visibleModel.value = true
  visibleTitle.value = '编辑角色'
}
const submitAdd = () => {
  postRole({
    data: {
      roleName: addFormState.name
    }
  })
    .then((res) => {
      if (res.code === 200) {
        message.success('新增角色成功')
        getData(1)
        visibleModel.value = false
      } else {
        message.error(res.msg || '新增角色失败')
      }
    })
    .catch((err) => {
      message.error(err.message || '新增角色失败，请稍后再试')
    })
}
const submitEdit = () => {
  putRole({
    data: {
      roleId: editId.value,
      roleName: addFormState.name
    }
  })
    .then((res) => {
      if (res.code === 200) {
        message.success('编辑角色成功')
        getData(1)
        visibleModel.value = false
      } else {
        message.error(res.msg || '编辑角色失败')
      }
    })
    .catch((err) => {
      message.error(err.message || '编辑角色失败，请稍后再试')
    })
}
const onDelete = (data) => {
  delRole({
    id: data.roleId
  })
    .then((res) => {
      if (res.code === 200) {
        message.success('删除角色成功')
        getData(1)
      } else {
        message.error(res.msg || '删除角色失败')
      }
    })
    .catch((err) => {
      message.error(err.message || '删除角色失败，请稍后再试')
    })
}
</script>

<style scoped lang="scss"></style>
