<template>
  <div>
    <canvas width="100%;" ref="canvasRef"></canvas>
    <div class="btns">
      <a-space>
        <a-button @click="goToPreviousPage">上一页</a-button>
        <a-button @click="goToNextPage">下一页</a-button>
      </a-space>
    </div>
  </div>
</template>

<script>
import { ref, onMounted } from 'vue' 
import { getDocument, GlobalWorkerOptions } from 'pdfjs-dist'
import { Button as AButton, Space as ASpace } from 'ant-design-vue'

export default {
  props: {
    pdfPath: {
      type: String,
      required: true
    }
  },
  components: {
    AButton,
    ASpace
  },
  setup(props) {
    const canvasRef = ref(null)
    const currentPage = ref(1) // 当前页码
    let pdf = null

    onMounted(async () => {
      // 设置全局工作线程脚本路径
      GlobalWorkerOptions.workerSrc = '/pdf.worker.js' // 替换为实际的 pdf.worker.js 路径

      const loadingTask = getDocument(props.pdfPath)
      pdf = await loadingTask.promise

      const renderPage = async () => {
        const page = await pdf.getPage(currentPage.value)
        const canvas = canvasRef.value
        const context = canvas.getContext('2d')

        const viewport = page.getViewport({ scale: 1 })
        canvas.width = viewport.width
        canvas.height = viewport.height

        const renderContext = {
          canvasContext: context,
          viewport: viewport
        }

        await page.render(renderContext).promise
      }

      renderPage()
    })

    const goToPreviousPage = () => {
      if (currentPage.value > 1) {
        currentPage.value--
        renderPage()
      }
    }

    const goToNextPage = () => {
      if (currentPage.value < pdf.numPages) {
        currentPage.value++
        renderPage()
      }
    }

    const renderPage = async () => {
      const page = await pdf.getPage(currentPage.value)
      const canvas = canvasRef.value
      const context = canvas.getContext('2d')

      const viewport = page.getViewport({ scale: 1 })
      canvas.width = viewport.width
      canvas.height = viewport.height

      const renderContext = {
        canvasContext: context,
        viewport: viewport
      }

      await page.render(renderContext).promise
    }

    return {
      canvasRef,
      goToPreviousPage,
      goToNextPage
    }
  }
}
</script>

<style scoped>
canvas {
  display: block;
  margin: 0 auto;
}
.btns {
  display: flex;
  justify-content: center;
}
</style>
