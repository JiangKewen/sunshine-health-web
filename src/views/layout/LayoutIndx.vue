<template>
  <div class="layout">
    <div class="app-menu">
      <div class="menu-head-logo">
        <img @click="goHome" src="@/assets/logo.png" class="menu-logo" alt="" />
        <h2 v-show="!state.collapsed" @click="goHome" class="menu-title">健康管理系统</h2>
      </div>
      <a-menu
        class="menus"
        v-model:openKeys="state.openKeys"
        v-model:selectedKeys="state.selectedKeys"
        mode="inline"
        theme="dark"
        :inline-collapsed="state.collapsed"
      >
        <a-menu-item key="/report" @click="goPage('/report')">
          <template #icon>
            <DesktopOutlined />
          </template>
          <span>报告管理</span>
        </a-menu-item>
        <a-menu-item key="/customer" @click="goPage('/customer')">
          <template #icon>
            <InboxOutlined />
          </template>
          <span>档案管理</span>
        </a-menu-item>
        <a-menu-item key="/user" @click="goPage('/user')">
          <template #icon>
            <InboxOutlined />
          </template>
          <span>用户管理</span>
        </a-menu-item>
        <a-menu-item key="/role" @click="goPage('/role')">
          <template #icon>
            <InboxOutlined />
          </template>
          <span>角色管理</span>
        </a-menu-item>
      </a-menu>
    </div>
    <main class="app-main">
      <section class="app-top">
        <div @click="toggleCollapsed" class="coll-btns">
          <MenuUnfoldOutlined v-show="state.collapsed" />
          <MenuFoldOutlined v-show="!state.collapsed" />
        </div>
        <a-dropdown>
          <span class="app-use-name" @click.prevent>
            nginx孙
            <DownOutlined />
          </span>
          <template #overlay>
            <a-menu>
              <a-menu-item>
                <a-link @click="onLogout">退出登录</a-link>
              </a-menu-item>
            </a-menu>
          </template>
        </a-dropdown>
      </section>
      <section class="route-wrap">
        <RouterView>
          <template #default="{ Component }">
            <transition appear>
              <component :is="Component" />
            </transition>
          </template>
        </RouterView>
        <footer class="app-footer">Copyright ©2023 健康管理系统</footer>
      </section>
    </main>
  </div>
</template>
<script setup>
import { reactive, watch } from 'vue'
import {
  MenuFoldOutlined,
  MenuUnfoldOutlined,
  DesktopOutlined,
  InboxOutlined
} from '@ant-design/icons-vue'
import router from '@/router'
import { useRoute } from 'vue-router'

const route = useRoute()
const current = route.path
const state = reactive({
  collapsed: false,
  selectedKeys: [current],
  openKeys: ['sub1'],
  preOpenKeys: ['sub1']
})
watch(
  () => state.openKeys,
  (_val, oldVal) => {
    state.preOpenKeys = oldVal
  }
)
const toggleCollapsed = () => {
  state.collapsed = !state.collapsed
  state.openKeys = state.collapsed ? [] : state.preOpenKeys
}

function goHome() {
  // router.push('/')
}
function onLogout() {
  window.localStorage.clear()
  router.push('/login')
}
function goPage(path) {
  router.push(path)
}
</script>

<style scoped lang="scss">
.layout {
  display: flex;
}
.app-menu {
  height: 100vh;
  background: #001529;
  padding-top: 12px;
  .menu-head-logo {
    display: flex;
    padding: 3px 25px 5px 20px;
    align-items: center;
    user-select: none;
  }
  .menu-logo {
    width: 40px;
    margin-right: 8px;
  }
  .menu-title {
    margin: 0;
    font-size: 18px;
    color: white;
  }
}
.app-main {
  width: calc(100vw - 256px);
  flex: auto;
  overflow: hidden;
  background: #f0f2f5;
  height: 100vh;
  .app-top {
    margin: 0;
    font-size: 14px;
    font-weight: normal;
    display: flex;
    justify-content: space-between;
    align-items: center;
    background-color: #fff !important;
    border-bottom: 1px solid #eee;
    border-left: 1px solid #eee;
    padding: 8px 32px 8px 12px;
    height: 52px;
    box-sizing: border-box;
    .coll-btns {
      font-size: 20px;
      cursor: pointer;
    }
  }
  .route-wrap {
    // padding: 12px 20px;
    position: relative;
    height: calc(100% - 52px);
    .app-footer {
      position: absolute;
      bottom: 10px;
      left: 50%;
      transform: translateX(-50%);
      color: #d9d9d9;
    }
  }
}
</style>

<style lang="scss">
.v-enter-active {
  transition: all 0.6s ease;
}

.v-leave-active {
  transition: all 0.5s ease;
}

.v-enter-from {
  opacity: 0;
  transform: translateX(-10vw);
}
.v-leave-to {
  opacity: 0;
  transform: translateX(8vw);
}
</style>
