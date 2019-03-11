
<template>
  <div class="app-container">
    <el-table v-loading="listLoading" element-loading-text="加载中..." :data="list" border fit highlight-current-row style="width: 100%">
      <el-table-column label="ID" align="center" width="50">
        <template v-slot="scope">{{scope.$index+1|indexFilter(listQuery)}}</template>
      </el-table-column>
      <el-table-column label="标题">
        <template v-slot="scope">{{scope.row.title}}</template>
      </el-table-column>
      <el-table-column label="作者" width="100" align="center">
        <template v-slot="scope">{{scope.row.auth}}</template>
      </el-table-column>
      <el-table-column label="发布时间" width="200" align="center">
        <template v-slot="scope">{{scope.row.publish_time| timeFilter }}</template>
      </el-table-column>
      <el-table-column label="状态" class-name="status-col" width="110" align="center">
        <template v-slot="scope">
          <el-tag :type="scope.row.status| statusFilter ">{{ scope.row.status| statusFilter }}</el-tag>
        </template>
      </el-table-column>
      <el-table-column label="操作" width="110" align="center">
        <template v-slot="scope">
          <el-button @click="handleViewClick(scope.row.ID)" type="text" size="small" class="link-type">查看</el-button>
          <el-button @click="handleEditClick(scope.row.ID)" type="text" size="small" class="link-type">编辑</el-button>
        </template>
      </el-table-column>
    </el-table>
    <pagination v-show="total>0" :total="total" :page.sync="listQuery.page" :limit.sync="listQuery.limit" @pagination="getList"/>
  </div>
</template>

  <script>
import { fetchList } from '@/api/article'
import Pagination from '@/components/Pagination'
export default {
  name: 'JandanArticleList',
  components: { Pagination },
  props: ['page'],
  data() {
    return {
      list: null,
      total: 0,
      listLoading: true,
      listQuery: {
        page: 1
      }
    }
  },
  filters: {
    indexFilter(index, listQuery) {
      // console.log(typeof pageNum)
      return (Number(listQuery.page) - 1) * 20 + Number(index)
    },
    statusFilter(status) {
      // console.log(status)
      switch (status) {
        case 1:
          status = 'draft'
          break
        case 2:
          status = 'published'
          break
        default:
          status = 'deleted'
          break
      }
      const statusMap = {
        published: 'success',
        draft: 'gray',
        deleted: 'danger'
      }
      return statusMap[status]
    },
    timeFilter(time) {
      const obj = new Date(time)
      return obj.getFullYear() + '-' + (obj.getMonth() + 1) + '-' + obj.getDate()
    }
  },
  created() {
    if (this.$route.query.page) {
      this.listQuery.page = Number(this.page)
    }
    // console.log('queryTest:', this.page)
    this.getList()
  },
  methods: {
    getList() {
      this.listLoading = true
      fetchList(this.listQuery).then(response => {
        // fetchList(page).then(response => {
        this.list = response.data.list
        this.total = response.data.total
        this.listLoading = false
        this.$router.replace({ name: 'jandanList', query: { page: this.listQuery.page } })
      })
    },
    handleViewClick(row) {
      // console.log(row)
      this.$router.push({ name: 'jandanArticle', params: { id: row } })
      // this.$router.push({ path: `article/${row}` })
    },
    handleEditClick(row) {
      this.$router.push({ name: 'jandanEdit', params: { id: row } })
    }
  }
}
</script>