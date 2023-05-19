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
          <a-button type="primary">新增</a-button>
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
</template>

<script setup>
import { reactive } from 'vue'

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
</script>

<style scoped lang="scss"></style>
