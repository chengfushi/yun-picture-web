<template>
  <div class="userProfilePage">
    <a-card :bordered="false" class="profile-card">
      <div class="profile-header">
        <a-avatar :size="120" class="user-avatar">
          <template v-if="userData.userAvatar">
            <a-image :src="userData.userAvatar" :width="120" />
          </template>
          <template v-else>
            {{ userData.userName?.charAt(0) || 'U' }}
          </template>
        </a-avatar>
        <div class="profile-info">
          <h2>{{ userData.userName }}</h2>
          <p class="account-info">@{{ userData.userAccount }}</p>
          <a-tag :color="userData.userRole === 'admin' ? 'red' : 'blue'">
            {{ userData.userRole === 'admin' ? '管理员' : '普通用户' }}
          </a-tag>
        </div>
      </div>

      <a-divider />

      <div class="profile-details">
        <a-descriptions :column="1" bordered>
          <a-descriptions-item label="账号ID">{{ userData.id }}</a-descriptions-item>
          <a-descriptions-item label="个人简介">
            {{ userData.userProfile || '暂无简介' }}
          </a-descriptions-item>
          <a-descriptions-item label="创建时间">
            {{ formatDate(userData.createTime) }}
          </a-descriptions-item>
          <a-descriptions-item label="最后编辑时间">
            {{ formatDate(userData.editTime) }}
          </a-descriptions-item>
        </a-descriptions>
      </div>

      <div class="profile-actions">
        <a-button type="primary" @click="handleEdit">编辑资料</a-button>
        <a-button v-if="userData.userRole === 'admin'" style="margin-left: 10px;" @click="goManage">
          管理后台
        </a-button>
      </div>
    </a-card>
  </div>
</template>

<script setup lang="ts">
import { ref, onMounted, pushScopeId } from 'vue'
import { message } from 'ant-design-vue'
import { getLoginUserUsingGet, } from '@/api/userController'
import router from '@/router' // Assuming you have this API

const userData = ref({
  id: '',
  userAccount: '',
  userName: '',
  userAvatar: null,
  userProfile: null,
  userRole: '',
  editTime: '',
  createTime: '',
  updateTime: ''
})

const formatDate = (dateString: string) => {
  if (!dateString) return '未知时间'
  return new Date(dateString).toLocaleString()
}

const fetchUserProfile = async () => {
  try {
    // Assuming the API returns data in the format you provided
    const res = await getLoginUserUsingGet()
    if (res.data.code === 0 && res.data.data) {
      userData.value = res.data.data
    } else {
      message.error('获取用户信息失败: ' + (res.data.message || '未知错误'))
    }
  } catch (error) {
    message.error('网络错误，请稍后重试')
    console.error('Fetch profile error:', error)
  }
}

const goManage = () =>{
  router.push('/admin/user')

}

const handleEdit = () => {
  // Implement edit functionality
  message.info('编辑功能即将上线')
}

onMounted(() => {
  fetchUserProfile()
})
</script>

<style scoped>
.userProfilePage {
  padding: 24px;
  max-width: 800px;
  margin: 0 auto;
}

.profile-card {
  border-radius: 8px;
  box-shadow: 0 2px 12px 0 rgba(0, 0, 0, 0.1);
}

.profile-header {
  display: flex;
  align-items: center;
  margin-bottom: 24px;
}

.user-avatar {
  margin-right: 24px;
  background-color: #1890ff;
  color: white;
  font-size: 36px;
}

.profile-info h2 {
  margin-bottom: 8px;
  font-size: 24px;
}

.account-info {
  color: #666;
  margin-bottom: 12px;
}

.profile-details {
  margin: 24px 0;
}

.profile-actions {
  margin-top: 24px;
  text-align: center;
}

@media (max-width: 768px) {
  .profile-header {
    flex-direction: column;
    text-align: center;
  }

  .user-avatar {
    margin-right: 0;
    margin-bottom: 16px;
  }
}
</style>

