// 系统界面通知-单个space通知
<template>
  <transition name="frienditemT" appear>
    <div v-show="isShow" class="hasAccept">
      <!-- 头像 -->
      <img src="../assets/space.svg" alt="" />
      <!-- 网名,个签内容物 -->
      <div class="content">
        <!-- 名字和签名 -->
        <div class="nameandsign">
          <!-- 名字 -->
          <div class="username">
            <!-- 用户名 -->
            <span
              ><span v-if="remakeName"> ({{ remakeName }}) </span> <span v-if="notice.friendName != null">{{ notice.friendName }}</span
              ><span style="color: pink">{{ remarksReal }}</span></span
            >
            <!-- 最后消息时间 -->
            <span>{{ new Date(parseInt(noticeprops.noticeTime)).toLocaleString().slice(5) }}</span>
          </div>
        </div>
        <!-- 个人空间 -->
        <div class="starspace">
          <img class="star" src="../assets/space.svg" alt="空间" @click="enterHerSpace" />
          <img v-show="consider" class="delete" src="../assets/delete.svg" alt="删除" @click="deleteNotice" />
        </div>
      </div>
    </div>
  </transition>
</template>

<script>
import { mapState } from 'vuex'
export default {
  // eslint-disable-next-line vue/multi-word-component-names
  name: 'systemSpaceItem',
  props: ['noticeprops'],
  data() {
    return {
      isShow: true,
      // 是否接受作为好友
      isAccept: false,
      // 是否拒绝接受作为好友
      isRefuse: false,
      // 是否未作响应
      isNormal: true,
      // 删除按钮出现
      consider: true,
      notice: { friendName: ' [已删除的好友] ', user: {} },
      remakeName: '',
      spaceUser: '',
      remarksReal: '',
      spaceItemReal: '',
      isPublished: false,
    }
  },
  computed: {
    ...mapState('userInfo', ['user']),
  },
  methods: {
    // 进入她的空间
    enterHerSpace() {
      // 向starspace组件发送数据,显示聊天框
      if (this.isPublished) {
        this.$bus.$emit('spaceappear', true, false, this.spaceItemReal.user)
      } else {
        this.$bus.$emit('SYSreceive', true, this.spaceItemReal)
      }
    },
    // 删除该条通知
    deleteNotice() {
      this.$axios
        .post('/api/delOneNotice', {
          sysNoticeId: this.noticeprops.sysNoticeId,
        })
        .then(
          // eslint-disable-next-line no-unused-vars
          (response) => {
            this.isShow = false
          },
          (error) => {
            this.$bus.$emit('systemNotice', false, error.message)
          }
        )
    },
    // 判断+ 头像请求和用户名
    headRequest() {
      // 接收信息
      if (this.user.userQQ == this.noticeprops.receiveUserQQ) {
        this.$axios.post('/api/getOneFriends', { userQQ: this.user.userQQ, friendQQ: this.noticeprops.sendUserQQ }).then(
          (response) => {
            if (response.data != null) {
              this.notice = response.data
              this.spaceUser = response.data.user
              this.remakeName = this.notice.friendRemarkName
            }
          },
          (error) => {
            console.log(error.message)
          }
        )
        if (this.noticeprops.remarks.substring(this.noticeprops.remarks.length - 3, this.noticeprops.remarks.length) == '评论.') {
          this.spaceUser = this.user
        }
      }
    },
    // 对收到的消息进行切割
    receiveSplice() {
      let splited = this.noticeprops.remarks.split('Q-v4jvy-Q')
      this.remarksReal = splited[0]
      this.spaceItemReal = JSON.parse(splited[1])

      if (this.spaceItemReal['spaceUserQQ'] != null) {
        this.isPublished = true
      }
    },
  },
  mounted() {},
  created() {
    this.headRequest()
    this.receiveSplice()
  },
}
</script>

<style scoped>
/* 单个好友 */

/* 网名,个签内容物 */
.content {
  position: relative;
  width: 450px;
  display: flex;
  flex-flow: row nowrap;
  height: 55px;
}
/* 更改名字和签名的长度 */
.content:hover .nameandsign {
  flex: 4;
}
/* 更改个人空间 */
.content:hover .starspace {
  cursor: pointer;
  flex: 1.5;
  opacity: 1;
}
/* 名字和签名 */
.nameandsign {
  position: relative;
  flex: 8;
  display: flex;
  flex-flow: column nowrap;
  justify-content: center;
  transition: 0.55s;
  margin-left: 10px;
  height: 55px;
}
/* 用户名字 */
.username {
  margin-top: 5px;
  position: relative;
  display: flex;
  height: 20px;
  flex-flow: row nowrap;
  justify-content: space-between;
  font-size: 1.45vh;
}
.username span:nth-of-type(1) {
  flex: 9;
}
.username span:nth-of-type(2) {
  margin-left: 10px;
  flex: 4;
}
/* 个性签名 */
.chats {
  position: relative;
  margin-top: 10px;
  display: flex;
  height: 20px;
  flex-flow: row nowrap;
  justify-content: space-between;
}
/* 消息个数样式 */
.messagenum {
  position: absolute;
  background-color: rgba(242, 63, 63, 0.885);
  left: -25px;
  border-radius: 25px;
  max-width: 30px;
  min-width: 20px;
  font-weight: bold;
  text-align: center;
  height: 20px;
}
/* 接受作为好友 */
.hasAccept {
  position: relative;
  width: 100%;
  display: flex;
  flex-flow: row nowrap;
  margin-top: 5px;
  margin-bottom: 10px;
  transition: 0.55s;
  height: 60px;
  font-size: 1.6vh;
  border-radius: 50px 0 0 50px;
  background-color: rgb(113, 124, 44);
  box-shadow: 0 0 8px yellow;
  color: pink;
}
.hasAccept:hover {
  border-radius: 50px 0 0 50px;
  box-shadow: 0 0 15px yellow;
}
/* 头像 */
.hasAccept > img {
  position: relative;
  width: 45px;
  height: 45px;
  border-radius: 50px;
  margin-left: 2.5px;
  border: 5px solid rgba(61, 61, 61, 0.2);
}

/* 个人空间 */
.starspace {
  position: relative;
  flex: 1;
  opacity: 0;
  height: 20px;
  transition: 0.55s;
  margin-top: 25px;
  display: flex;
  flex-flow: row nowrap;
  justify-content: center;
  align-items: center;
  border-left: 2px solid white;
}
/* 个人空间hover时img的变化 */
.star {
  transition: 1s;
  margin-left: 10px;
}
.accpet {
  transition: 0.55s;
  margin-left: 10px;
}
.refuse {
  transition: 0.55s;
  margin-left: 10px;
}
.delete {
  transition: 0.55s;
  margin-left: 10px;
}
.starspace:hover > img:nth-of-type(1) {
  transform: rotateZ(360deg);
}
.accpet:hover {
  border-radius: 50%;
  background-color: darkgreen;
  box-shadow: 0 0 15px yellowgreen;
}
.refuse:hover {
  border-radius: 50%;
  background-color: brown;
  box-shadow: 0 0 15px orangered;
}
.star:hover {
  border-radius: 50%;
  background-color: darkgoldenrod;
  box-shadow: 0 0 15px yellow;
}
.delete:hover {
  border-radius: 50%;
  background-color: palevioletred;
  box-shadow: 0 0 15px pink;
}
/* 更改字体滑过时鼠标 */
span {
  cursor: default;
}
/* 好友个体进入退出动画 */
.frienditemT-enter-active {
  animation: slide-in-blurred-right 0.3s cubic-bezier(0.23, 1, 0.32, 1) both;
}
.frienditemT-leave-active {
  animation: slide-in-blurred-right 0.3s cubic-bezier(0.23, 1, 0.32, 1) both reverse;
}
/* 好友个体进入退出动画 */
@keyframes slide-in-blurred-right {
  0% {
    -webkit-transform: translateX(200px) scaleX(2.5) scaleY(0.2);
    transform: translateX(200px) scaleX(2.5) scaleY(0.2);
    -webkit-transform-origin: 0% 50%;
    transform-origin: 0% 50%;
    -webkit-filter: blur(40px);
    filter: blur(40px);
    opacity: 0;
  }
  100% {
    -webkit-transform: translateX(0) scaleY(1) scaleX(1);
    transform: translateX(0) scaleY(1) scaleX(1);
    -webkit-transform-origin: 50% 50%;
    transform-origin: 50% 50%;
    -webkit-filter: blur(0);
    filter: blur(0);
    opacity: 1;
  }
}
</style>
