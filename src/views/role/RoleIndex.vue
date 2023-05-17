<template>
  <div class="role-wrap main">
    <div class="page-top flex">
      <section class="search-box">
        <el-select v-if="false" v-model="status" class="inputs" placeholder="状态" clearable>
          <el-option
            v-for="item in statusList"
            :key="item.value"
            :label="item.label"
            :value="item.value"
          />
        </el-select>
        <el-input v-if="false" v-model="keyword" class="inputs" placeholder="搜索" clearable />
      </section>
      <el-button type="primary" @click="chgShowAdd(true)">新增角色</el-button>
    </div>

    <el-table :data="tableData" style="width: 100%" border header-cell-class-name="t-head-cell">
      <el-table-column prop="roleName" label="角色名称" />
      <el-table-column label="操作" width="120">
        <template #default="{ row }">
          <el-button link type="primary" @click="edit(row)">编辑</el-button>
        </template>
      </el-table-column>
    </el-table>
    <el-pagination
      background
      :page-sizes="[10, 20, 50]"
      v-model:current-page="pages.currPage"
      v-model:page-size="pages.pageSize"
      :total="pages.total"
      layout="total, sizes, prev, pager, next, jumper"
      @size-change="getPageData"
      @current-change="getPageData"
    />
  </div>

  <el-dialog v-model="showAdd" :title="title" width="666px">
    <el-form ref="formRef" :model="addForm" :rules="rules" label-width="100px">
      <el-form-item label="角色名称" prop="roleName">
        <el-input v-model="addForm.roleName" clearable />
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
import { postRole, putRole, getRoleList } from '@/service/api'
import { ElMessage } from 'element-plus'

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

const tableData = ref([])
const pages = reactive({
  pageSize: 10,
  currPage: 1,
  total: 0
})
function getPageData() {
  getRoleList({
    params: {
      pageSize: pages.pageSize,
      currPage: pages.currPage
    }
  }).then((res) => {
    tableData.value = res.data // TODO 具体值待定
    pages.total = tableData.value.length
  })
}
getPageData()

const showAdd = ref(false)
function chgShowAdd(val) {
  showAdd.value = val
  addForm.name = ''
  title.value = '新增角色'
}

const title = ref('新增角色')
const formRef = ref(null)
const addForm = reactive({
  roleName: ''
})
let editRoleId = ''
const rules = reactive({
  roleName: [{ required: true, message: '请输入角色名称', trigger: ['blur', 'change'] }]
})
function onSumbit() {
  formRef.value.validate((valid) => {
    console.log('valid', valid)
    if (valid) {
      if (title.value === '新增角色') {
        onAdd()
      } else {
        onEdit()
      }
    }
  })
}
function onAdd() {
  postRole({
    data: addForm
  })
    .then((res) => {
      console.log('新增角色', res)
      ElMessage.success('新增角色成功')
      addForm.name = ''
      showAdd.value = false
    })
    .catch((err) => {
      ElMessage.error(`新增角色失败:${err.message}`)
    })
}
function onEdit() {
  putRole({
    data: { ...addForm, roleId: editRoleId }
  })
    .then((res) => {
      console.log('编辑角色', res)
      ElMessage.success('编辑角色成功')
      addForm.name = ''
      showAdd.value = false
    })
    .catch((err) => {
      ElMessage.error(`编辑角色失败:${err.message}`)
    })
}

function edit(row) {
  console.log('row', row)
  showAdd.value = true
  title.value = '编辑角色'
  addForm.roleName = row.roleName
  editRoleId = row.roleId
}
</script>

<style scoped lang="scss">
.role-wrap {
  .page-top {
    justify-content: space-between;
    margin-bottom: 20px;
  }
}
</style>
