<template>
  <section class="ff-main">
    <div class="ff-main-search">
      <a-form :model="formState" layout="inline" :label-col="labelCol" :wrapper-col="wrapperCol">
        <a-form-item label="报告名称" style="margin-bottom: 0">
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
            <template v-if="column.key === 'action'">
              <a-button class="ff-btns" @click="onEdit(record.name)">编辑</a-button>
              <a-button @click="onEdit(record.name)" type="primary">查看</a-button>
            </template>
          </template>
        </a-table>
      </div>
    </div>
  </section>

  <a-modal v-model:visible="visibleModel" :title="visibleTitle" @ok="handleOk">
    <a-form :model="addFormState" :label-col="addLabelCol" :wrapper-col="addWrapperCol">
      <a-form-item label="报告名称">
        <a-input v-model:value="addFormState.name" allowClear placeholder="请输入" />
      </a-form-item>
      <a-form-item label="报告类型">
        <a-input v-model:value="addFormState.name" allowClear placeholder="请输入" />
      </a-form-item>
      <a-form-item label="体检时间">
        <a-input v-model:value="addFormState.name" allowClear placeholder="请输入" />
      </a-form-item>
    </a-form>
  </a-modal>
</template>

<script setup>
import {
  Button as AButton,
  Input as AInput,
  Form as AForm,
  Modal as AModal,
  RangePicker as ARangePicker,
  FormItem as AFormItem,
  Table as ATable,
  message
} from 'ant-design-vue'
import { reactive, ref } from 'vue'

const formState = reactive({
  name: '',
  times: []
})

const labelCol = { style: { width: '80px' } }
const wrapperCol = { span: 14 }

const dataSource = [
  {
    key: '1',
    name: '胡彦斌',
    age: 32,
    address: '西湖区湖底公园1号'
  },
  {
    key: '2',
    name: '胡彦祖',
    age: 42,
    address: '西湖区湖底公园1号'
  },
  {
    key: '3',
    name: '胡彦祖',
    age: 36,
    address: '西湖区湖底公园21号'
  },
  {
    key: '4',
    name: '胡彦祖',
    age: 21,
    address: '西湖区湖底公园13号'
  },
  {
    key: '5',
    name: '胡彦祖',
    age: 56,
    address: '西湖区湖底公园14号'
  }
]

const columns = [
  {
    title: '姓名',
    dataIndex: 'name',
    key: 'name'
  },
  {
    title: '年龄',
    dataIndex: 'age',
    key: 'age'
  },
  {
    title: '住址',
    dataIndex: 'address',
    key: 'address'
  },
  {
    title: 'Action',
    dataIndex: 'action',
    key: 'action'
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

function getData(current, size) {
  console.log(current, size)
  pagination.current = current
  pagination.pageSize = size
}

const addFormState = reactive({
  name: '',
  times: []
})

const addLabelCol = { style: { width: '80px' } }
const addWrapperCol = { span: 18 }

const visibleModel = ref(false)
const visibleTitle = ref('新增报告')
const onAdd = () => {
  visibleModel.value = true
  visibleTitle.value = '新增报告'
}
const handleOk = () => {
  message.success('新增成功')
  visibleModel.value = false
}
</script>

<style scoped lang="scss"></style>
