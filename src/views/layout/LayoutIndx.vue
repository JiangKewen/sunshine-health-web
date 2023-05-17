<template>
  <header class="app-header flex">
    <div class="app-logo flex">
      <el-icon class="app-icon" @click="chgCollapse">
        <Fold v-show="!isCollapse" />
        <Expand v-show="isCollapse" />
      </el-icon>
      <h1>后台管理系统</h1>
    </div>
    <div class="app-user flex">
      <img class="app-img" src="/user.jpg" alt="头像" />
      <el-dropdown>
        <span class="user-text">
          孙大圣
          <el-icon class="user-icon">
            <ArrowDown />
          </el-icon>
        </span>
        <template #dropdown>
          <el-dropdown-menu>
            <el-dropdown-item>
              <el-link>退出登录</el-link>
            </el-dropdown-item>
          </el-dropdown-menu>
        </template>
      </el-dropdown>
    </div>
  </header>

  <section class="app-body flex">
    <el-menu
      class="app-menu"
      :collapse="isCollapse"
      :default-active="currentPath"
      active-text-color="#ffd04b"
      background-color="#545c64"
      text-color="#fff"
      router
    >
      <el-menu-item v-for="n in menu" :key="n.path" :index="n.path">
        <el-icon><component :is="n.icon"></component></el-icon>
        <template #title>{{ n.name }}</template>
      </el-menu-item>
    </el-menu>
    <main class="app-main">
      <RouterView />
    </main>
  </section>
</template>

<script setup>
import { Fold, ArrowDown, Expand, Monitor, User, Service, Document } from '@element-plus/icons-vue'
import { useRouter } from 'vue-router'
import { ref, markRaw } from 'vue'

const router = useRouter()
function appToken() {
  const token = window.localStorage.getItem('TOKEN') || ''
  if (!token) {
    router.push('/login')
  }
}
appToken()

const menu = ref([
  {
    name: '报告管理',
    path: '/report',
    icon: markRaw(Document)
  },
  {
    name: '档案管理',
    path: '/customer',
    icon: markRaw(User)
  },
  {
    name: '人员管理',
    path: '/user',
    icon: markRaw(Service)
  },
  {
    name: '角色管理',
    path: '/role',
    icon: markRaw(Monitor)
  }
])

const currentPath = '/report'
const isCollapse = ref(false)
function chgCollapse() {
  isCollapse.value = !isCollapse.value
}
</script>

<style scoped lang="scss">
.flex {
  display: flex;
  align-items: center;
}
// 顶部

.app-header {
  height: 72px;
  justify-content: space-between;
  background: #242f42;
  color: #fff;
  padding: 0 30px;
}
// 顶部左侧
.app-logo {
  .app-icon {
    font-size: 30px;
    margin-right: 30px;
    cursor: pointer;
  }
}
// 顶部右侧
.app-user {
  .app-img {
    width: 30px;
    height: 30px;
    object-fit: cover;
    border-radius: 50%;
    margin-right: 20px;
  }
  .user-text {
    color: #fff;
    outline: none;
    cursor: pointer;
  }
}

.app-body {
  .app-menu {
    min-height: calc(100vh - 72px);
    ::v-deep {
      &:not(.el-menu--collapse) {
        width: 200px;
      }
      .el-menu-item {
        font-size: 16px;
      }
    }
  }
}

.app-main {
  flex: auto;
  height: calc(100vh - 72px);
  background: rbga(240, 240, 240, 1);
}
</style>
