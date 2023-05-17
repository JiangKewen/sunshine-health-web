<template>
  <div class="report-wrap main">
    <div class="page-top flex">
      <section class="search-box">
        <el-select v-model="status" class="inputs" placeholder="状态" clearable>
          <el-option
            v-for="item in statusList"
            :key="item.value"
            :label="item.label"
            :value="item.value"
          />
        </el-select>
        <el-input v-model="keyword" class="inputs" placeholder="搜索" clearable />
      </section>
      <el-button type="primary" @click="chgShowAdd(true)">新增报告</el-button>
    </div>

    <el-table :data="reportData" style="width: 100%" border header-cell-class-name="t-head-cell">
      <el-table-column prop="date" label="Date" width="180" />
      <el-table-column prop="name" label="报告名称" width="180" />
      <el-table-column prop="address" label="Address" />
    </el-table>
  </div>

  <el-dialog v-model="showAdd" title="新增报告" width="666px">
    <el-form ref="formRef" :model="addForm" :rules="rules" label-width="100px" status-icon>
      <el-form-item label="报告名称" prop="name">
        <el-input v-model="addForm.name" />
      </el-form-item>
    </el-form>
    <template #footer>
      <span class="dialog-footer">
        <el-button @click="showAdd = false">取消</el-button>
        <el-button type="primary" @click="onSumbit"> 确定 </el-button>
      </span>
    </template>
  </el-dialog>
</template>

<script setup>
import { ref, reactive } from 'vue'

const statusList = [
  {
    label: '禁用',
    value: 2
  },
  {
    label: '启用',
    value: 1
  }
]
const status = ref('')
const keyword = ref('')

const reportData = [
  {
    date: '2016-05-03',
    name: 'Tom',
    address: 'No. 189, Grove St, Los Angeles'
  },
  {
    date: '2016-05-02',
    name: 'Tom',
    address: 'No. 189, Grove St, Los Angeles'
  },
  {
    date: '2016-05-04',
    name: 'Tom',
    address: 'No. 189, Grove St, Los Angeles'
  },
  {
    date: '2016-05-01',
    name: 'Tom',
    address: 'No. 189, Grove St, Los Angeles'
  }
]

const showAdd = ref(false)
function chgShowAdd(val) {
  showAdd.value = val
}

const formRef = ref(null)
const addForm = reactive({
  name: ''
})
const rules = reactive({
  name: [{ required: true, message: '请输入报告名称', trigger: ['blur', 'change'] }]
})
function onSumbit() {
  formRef.value.validate((valid) => {
    console.log('valid', valid)
    if (valid) {
      addForm.name = ''
      showAdd.value = false
    }
  })
}
</script>

<style scoped lang="scss">
.report-wrap {
  .page-top {
    justify-content: space-between;
    margin-bottom: 20px;
  }
}
</style>
