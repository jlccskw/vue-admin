<template>
  <div class="app-container">
    <el-button class="btn-return" size="mini" @click="back">返回</el-button>
    <MDinput v-model="title" :maxlength="100" name="title" type="text">标题</MDinput>
    <MDinput v-model="auth" :maxlength="100" name="title" class="auth">作者</MDinput>
    <MDinput v-model="tag" :maxlength="100" name="title" class="tag">标签</MDinput>
    <div class="article-body">{{body}}</div>
  </div>
</template>

<script>
import { fetchArticle } from '@/api/article'
import MDinput from '@/components/MDinput'
export default {
  components: { MDinput },
  data() {
    return {
      id: 0,
      tag: '',
      publishTime: '',
      title: '',
      auth: '',
      body: ''
    }
  },
  created() {
    const id = this.$route.params && this.$route.params.id
    this.getArticle(id)
  },
  methods: {
    getArticle(articleId) {
      fetchArticle(articleId).then(response => {
        this.id = articleId
        this.tag = response.data.tag
        this.publishTime = response.data.publishTime
        this.title = response.data.title
        this.auth = response.data.auth
        this.body = response.data.body
      })
    },
    back() {
      this.$router.go(-1)
    }
  }
}
</script>

<style scoped>
.btn-return {
  float: right;
}
.article-body {
  padding: 30px 50px 0px 50px;
  font-size: 16px;
}
.auth {
  width: 45%;
  display: inline-block;
}
.tag {
  width: 45%;
  float: right;
}
</style>


