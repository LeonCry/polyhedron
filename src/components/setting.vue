// 设置组件
<template>
  <transition name="settingboxT">
    <div v-show="isShow" class="settingbox" :style="settingLocation" @mousedown="changeIndex">
      <!-- 头部 -->
      <div class="toper" @mousedown="moveBegin">
        <!-- 设置 -->
        <span>设 置</span>
      </div>
      <!-- 退出按钮 -->
      <div class="exit">
        <img src="../assets/exit2.svg" alt="退出" @click="exitChat" />
      </div>
      <!-- 所有设置 -->
      <div class="allsetting">
        <!-- 账户设置 -->
        <div class="setting" @click="userDetailAppear">
          <span>账 户 设 置</span>
          <img src="../assets/rightnrror.svg" alt="detail" :style="userDetailDropStyle" />
        </div>
        <transition name="DetailT">
          <!-- 账户设置细节 -->
          <div v-show="userDetail" class="settingdetail">
            <!-- 用户QQ -->
            <div>
              <span>登录账号</span>
              <input type="text" v-model="userQQ" disabled />
            </div>
            <!-- 用户名 -->
            <div>
              <span>昵 称</span>
              <input type="text" v-model="userName" maxlength="24" @blur="verifryUserName" />
            </div>
            <!-- 用户密码 -->
            <div>
              <span>密 码</span>
              <input type="password" v-model="userPassword" maxlength="32" @blur="verifryUserPassword" />
            </div>
            <!-- 用户邮箱 -->
            <div>
              <span>用户邮箱</span>
              <input type="text" v-model="userEmail" maxlength="100" @blur="verfiryUserEmail" />
            </div>
            <!-- 个性签名 -->
            <div>
              <span>个性签名</span>
              <input type="text" v-model="userSign" maxlength="300" />
            </div>
            <!-- 头像 -->
            <div>
              <span>头 像</span>
              <div class="upload">
                <input ref="uploadHead" @change="uploadHead" type="file" accept="image/png,image/jpeg" name="file" />
                <img src="../assets/upload.svg" alt="上传" />
                <span>{{ headRou }}</span>
              </div>
            </div>
            <!-- 个人背景 -->
            <div>
              <span>背 景</span>
              <div class="upload">
                <input ref="uploadBack" @change="uploadBack" type="file" accept="image/png,image/jpeg" name="file" />
                <img src="../assets/upload.svg" alt="上传" />
                <span>{{ backRou }}</span>
              </div>
            </div>
          </div>
        </transition>
        <!-- 消息通知 -->
        <div class="setting" @click="noticeDetailAppear">
          <span>消 息 通 知</span>
          <img src="../assets/rightnrror.svg" alt="detail" :style="noticeDetailDropStyle" />
        </div>
        <transition name="DetailT">
          <!-- 消息通知细节 -->
          <div v-show="noticeDetail" class="settingdetail">
            <!-- 声音提示 -->
            <div>
              <span>避难所邮箱通知</span>
              <img class="switch" src="../assets/switch.svg" alt="开关" @click="voiceSwitch" :style="voiceSwitchStyle" />
            </div>
            <!-- 好友消息邮箱通知 -->
            <div>
              <span>好友消息邮箱通知</span>
              <img class="switch" src="../assets/switch.svg" alt="开关" @click="friendSwitch" :style="friendSwitchStyle" />
            </div>
            <!-- 空间动态邮箱通知 -->
            <div>
              <span>空间动态邮箱通知</span>
              <img class="switch" src="../assets/switch.svg" alt="开关" @click="spaceSwitch" :style="spaceSwitchStyle" />
            </div>
            <!-- 登录邮箱通知 -->
            <div>
              <span>登录邮箱通知</span>
              <img class="switch" src="../assets/switch.svg" alt="开关" @click="loginSwitch" :style="loginSwitchStyle" />
            </div>
          </div>
        </transition>
        <!-- 客服热线 -->
        <div class="setting" @click="serviceDetailAppear">
          <span>客 服 热 线</span>
          <img src="../assets/rightnrror.svg" alt="detail" :style="serviceDetailDropStyle" />
        </div>
        <transition name="DetailT">
          <!-- 客服热线细节 -->
          <div v-show="serviceDetail" class="settingdetail">
            <!-- 客服热线1 -->
            <div>
              <span>邮箱</span>
              <span>lbh_ldu@163.com</span>
            </div>
            <div>
              <span>QQ</span>
              <span>1395346178</span>
            </div>
            <div>
              <span>微信</span>
              <span>LeovilMayCry</span>
            </div>
          </div>
        </transition>
      </div>
      <!-- 保存按钮 -->
      <div class="savediv">
        <button class="save" @click="saveSetting">保存</button>
      </div>
      <!-- 加载界面 -->
      <loading></loading>
      <error-show></error-show>
    </div>
  </transition>
</template>

<script>
import loading from './loading.vue'
import { mapState, mapActions, mapMutations } from 'vuex'
import ErrorShow from './errorshow.vue'

export default {
  components: { loading, ErrorShow },
  // eslint-disable-next-line vue/multi-word-component-names
  name: 'setting',
  data() {
    return {
      //   是否展示该组件--设置
      isShow: false,
      //   窗口移动要用到到的y坐标
      pox: 400 + 'px',
      //   窗口移动要用到到的y坐标
      poy: 500 + 'px',
      //   判断是否鼠标按下的判定flag
      isMove: false,
      //   声音通知,按钮方向判定
      voiceNotice: false,
      voiceSwitchDeg: 0,
      //   消息通知,按钮方向判定
      messageNotice: false,
      messageSwitchDeg: 0,
      //   空间通知通知,按钮方向判定
      spaceNotice: false,
      spaceSwitchDeg: 0,
      //   登录通知,按钮方向判定
      loginNotice: false,
      loginSwitchDeg: 0,
      //   账户设置细节展开,下拉框改变方向
      userDetail: false,
      userDetailDrop: 0,
      //   消息通知细节展开,下拉框改变方向
      noticeDetail: false,
      noticeDetailDrop: 0,
      //   客服细节展开,下拉框改变方向
      serviceDetail: false,
      serviceDetailDrop: 0,
      // 此组件Z轴高度 6 - 7
      zIndex: 113,
      // 用户信息相关数据
      userQQ: '',
      userName: '',
      userPassword: '',
      userEmail: '',
      userSign: '',
      userHead: '',
      userBack: '',
      // 上传头像路径
      headRou: '点击上传',
      // 上传背景路径
      backRou: '点击上传',
      // 上传头像文件
      userHeadfile: '',
      // 上传背景文件
      userBackfile: '',
    }
  },

  computed: {
    ...mapState('userInfo', ['user', 'userSetting', 'loadingOver', 'isHeadUpdate', 'isBackUpdate']),

    //改变聊天窗口的位置
    settingLocation() {
      return { top: this.poy - 30 + 'px', left: this.pox - 100 + 'px', zIndex: this.zIndex }
    },
    // 改变账户设置细节处下拉框转向
    userDetailDropStyle() {
      return { transform: 'rotateZ(' + this.userDetailDrop + ')' }
    },
    // 改变通知细节细节处下拉框转向
    noticeDetailDropStyle() {
      return { transform: 'rotateZ(' + this.noticeDetailDrop + ')' }
    },
    // 改变客服细节处下拉框转向
    serviceDetailDropStyle() {
      return { transform: 'rotateZ(' + this.serviceDetailDrop + ')' }
    },
    // 声音通知按钮转向
    voiceSwitchStyle() {
      return { transform: 'rotateZ(' + this.voiceSwitchDeg + ')' }
    },
    // 好友通知按钮转向
    friendSwitchStyle() {
      return { transform: 'rotateZ(' + this.messageSwitchDeg + ')' }
    },
    // 空间通知按钮转向
    spaceSwitchStyle() {
      return { transform: 'rotateZ(' + this.spaceSwitchDeg + ')' }
    },
    // 登录通知按钮转向
    loginSwitchStyle() {
      return { transform: 'rotateZ(' + this.loginSwitchDeg + ')' }
    },
  },
  methods: {
    ...mapActions('userInfo', ['updateUserInfo', 'updateUserSettingInfo', 'updateHead', 'updateBack']),
    ...mapMutations('userInfo', ['SETHEADSTATE', 'SETBACKSTATE']),
    // 上传头像
    uploadHead(e) {
      // 获得文件名和文件
      if (e.target.files[0].name == '') {
        this.headRou = ''
      }
      this.headRou = e.target.files[0].name
      this.userHeadfile = e.target.files[0]
      // 限制大小 < 2m
      if (this.userHeadfile.size / 1024 / 1024 > 2) {
        this.headRou = '文件大小超出2M'
        this.$bus.$emit('errorshow', false, '头像文件大小限制在2MB以内.')
      }
    },
    // 上传背景
    uploadBack(e) {
      // 获得文件名和文件
      if (e.target.files[0].name == '') {
        this.backRou = ''
      }
      this.backRou = e.target.files[0].name
      this.userBackfile = e.target.files[0]
      // 限制大小 < 5m
      if (this.userHeadfile.size / 1024 / 1024 > 5) {
        this.backRou = '文件大小超出5M'
        this.$bus.$emit('errorshow', false, '背景文件大小限制在5MB以内.')
      }
    },
    // 邮箱及格式验证
    verfiryUserEmail() {
      // 邮箱验证
      var regEmail = /^[A-Za-z0-9\u4e00-\u9fa5]+@[a-zA-Z0-9_-]+(\.[a-zA-Z0-9_-]+)+$/
      if (this.userEmail == '') {
        this.$bus.$emit('errorshow', false, '邮箱不可为空~')
      } else if (!regEmail.test(this.userEmail)) {
        this.$bus.$emit('errorshow', false, '邮箱格式错误,请填写正确邮箱格式')
      }
    },
    // 用户名验证
    verifryUserName() {
      if (this.userName == '') {
        this.$bus.$emit('errorshow', false, '用户名不可为空~')
      }
    },
    // 密码验证
    verifryUserPassword() {
      if (this.userPassword == '') {
        this.$bus.$emit('errorshow', false, '密码不可为空~')
      }
    },

    // 初始化用户信息相关数据
    userInfoInitialization() {
      this.userId = this.user.userId
      this.userMoney = this.user.userMoney
      this.isOnline = this.user.isOnline
      this.userQQ = this.user.userQQ
      this.userName = this.user.userName
      this.userPassword = this.user.userPassword
      this.userEmail = this.user.userEmail
      this.userSign = this.user.userSign
      this.userHead = this.user.userHead
      this.userBack = this.user.userBack
      this.headRou = '点击上传(<2MB)'
      this.backRou = '点击上传(<5MB)'
      this.userBackfile = ''
      this.userHeadfile = ''
    },
    // 初始化用户设置相关数据
    userSettingInitialization() {
      if (this.userSetting.voiceNotice) {
        this.voiceNotice = true
        this.voiceSwitchDeg = 540 + 'deg'
      }
      if (this.userSetting.messageNotice) {
        this.messageNotice = true
        this.messageSwitchDeg = 540 + 'deg'
      }
      if (this.userSetting.spaceNotice) {
        this.spaceNotice = true
        this.spaceSwitchDeg = 540 + 'deg'
      }
      if (this.userSetting.loginNotice) {
        this.loginNotice = true
        this.loginSwitchDeg = 540 + 'deg'
      }
    },

    // 账户设置细节出现
    userDetailAppear() {
      this.userDetail = !this.userDetail
      if (!this.userDetailDrop) {
        this.userDetailDrop = 90 + 'deg'
      } else {
        this.userDetailDrop = 0
      }
    },
    // 通知细节出现
    noticeDetailAppear() {
      this.noticeDetail = !this.noticeDetail
      if (!this.noticeDetailDrop) {
        this.noticeDetailDrop = 90 + 'deg'
      } else {
        this.noticeDetailDrop = 0
      }
    },
    // 客服细节出现
    serviceDetailAppear() {
      this.serviceDetail = !this.serviceDetail
      if (!this.serviceDetailDrop) {
        this.serviceDetailDrop = 90 + 'deg'
      } else {
        this.serviceDetailDrop = 0
      }
    },
    // 声音提示按钮转换+数据更改
    voiceSwitch() {
      this.voiceNotice = !this.voiceNotice
      if (this.voiceNotice) {
        this.voiceSwitchDeg = 540 + 'deg'
      } else {
        this.voiceSwitchDeg = 0
      }
    },
    // 好友消息提示按钮转换+数据更改
    friendSwitch() {
      this.messageNotice = !this.messageNotice
      if (this.messageNotice) {
        this.messageSwitchDeg = 540 + 'deg'
      } else {
        this.messageSwitchDeg = 0
      }
    },
    // 空间动态提示按钮转换+数据更改
    spaceSwitch() {
      this.spaceNotice = !this.spaceNotice
      if (this.spaceNotice) {
        this.spaceSwitchDeg = 540 + 'deg'
      } else {
        this.spaceSwitchDeg = 0
      }
    },
    // 添\删好友提示按钮转换+数据更改
    changeSwitch() {
      this.changeNotice = !this.changeNotice
      if (this.changeNotice) {
        this.changeSwitchDeg = 540 + 'deg'
      } else {
        this.changeSwitchDeg = 0
      }
    },
    // 登录提示按钮转换+数据更改
    loginSwitch() {
      this.loginNotice = !this.loginNotice
      if (this.loginNotice) {
        this.loginSwitchDeg = 540 + 'deg'
      } else {
        this.loginSwitchDeg = 0
      }
    },
    // friend数据库中对应的name修改
    friendNameChange(friendName) {
      // 更新名称信息
      this.$axios.post('/api/changeFriendNames', { friendQQ: this.user.userQQ, friendName: friendName }).then(
        // eslint-disable-next-line no-unused-vars
        (response) => {},
        (error) => {
          console.log(error.message)
        }
      )
    },

    // 保存按钮提交前验证 -1:表示有错误
    saveVerfiry() {
      var regEmail = /^[A-Za-z0-9\u4e00-\u9fa5]+@[a-zA-Z0-9_-]+(\.[a-zA-Z0-9_-]+)+$/
      // 有未填的选项
      if (this.userName == '' || this.userPassword == '' || this.userEmail == '' || this.userEmail == '') {
        this.$bus.$emit('errorshow', false, '请检查,您有未填项~')
        return -1
      }
      // 邮箱格式错误
      else if (!regEmail.test(this.userEmail)) {
        this.$bus.$emit('errorshow', false, '邮箱格式错误,请填写正确邮箱格式')
        return -1
      } else if (this.userHeadfile.size / 1024 / 1024 > 2) {
        this.$bus.$emit('errorshow', false, '头像文件大小限制在2MB以内')
        return -1
      } else if (this.userBackfile.size / 1024 / 1024 > 5) {
        this.$bus.$emit('errorshow', false, '背景文件大小限制在2MB以内')
        return -1
      }
    },
    // 按下保存按钮
    saveSetting() {
      // 先进行提交前验证
      if (this.saveVerfiry() == -1) {
        console.log('error')
      }
      // 验证通过
      else {
        // loading出现
        this.$bus.$emit('weareloading', true, '上传中')
        // store里面提交
        var userInfoObj = { userId: this.userId, userQQ: this.userQQ, userPassword: this.userPassword, userEmail: this.userEmail, userMoney: this.userMoney, userName: this.userName, userSign: this.userSign, userHead: this.userHead, userBack: this.userBack, isOnline: this.isOnline }
        // 属性转换--boolean转number
        if (this.voiceNotice) {
          this.voiceNotice = 1
        } else {
          this.voiceNotice = 0
        }
        if (this.messageNotice) {
          this.messageNotice = 1
        } else {
          this.messageNotice = 0
        }
        if (this.spaceNotice) {
          this.spaceNotice = 1
        } else {
          this.spaceNotice = 0
        }
        if (this.loginNotice) {
          this.loginNotice = 1
        } else {
          this.loginNotice = 0
        }
        var userSettingInfoObj = { userQQ: this.userQQ, voiceNotice: this.voiceNotice, messageNotice: this.messageNotice, spaceNotice: this.spaceNotice, loginNotice: this.loginNotice }
        // 上传个人信息和设置信息
        this.updateUserInfo(userInfoObj)
        this.updateUserSettingInfo(userSettingInfoObj)
        this.friendNameChange(this.userName)
        // 若用户上传了头像图片
        if (this.userHeadfile != '') {
          this.SETHEADSTATE(true)
          this.updateHead({ file: this.userHeadfile, userQQ: this.userQQ })
        }
        // 若用户上传了背景图片
        if (this.userBackfile != '') {
          this.SETBACKSTATE(true)
          this.updateBack({ file: this.userBackfile, userQQ: this.userQQ })
        }
        // 清除loading,因为vuex store里面无法使用$emit
        var id = setInterval(() => {
          if (this.loadingOver) {
            this.$bus.$emit('weareloading', false, '上传中')
            this.$bus.$emit('errorshow', true, '个人设置更改成功!')
            clearInterval(id)
          }
        }, 1000)
      }
    },

    //   鼠标按下,开始移动
    moveBegin(e) {
      if (window.innerWidth < window.innerHeight) {
        return 0
      }
      // 获得按下的x坐标
      this.pox = e.clientX
      // 获得按下的y坐标
      this.poy = e.clientY
      // 判定在按下
      this.isMove = true
    },
    // 退出按钮
    exitChat() {
      // 重新初始化一遍
      this.userSettingInitialization()
      this.userInfoInitialization()
      this.$bus.$emit('settingappear', this.isShow)
    },
    changeIndex() {
      if (window.innerWidth < window.innerHeight) {
        return 0
      }
      // 聚焦,改变高度,同时降低其他两个窗口的高度
      // 从左往右分别为 空间\聊天\设置
      this.$bus.$emit('changeZindex', 106, 106, 107)
    },
  },
  mounted() {
    //   实时监听鼠标移动,更改位置数据
    window.addEventListener('mousemove', (e) => {
      if (this.isMove) {
        this.pox = e.clientX
        // 获得按下的y坐标
        this.poy = e.clientY
      }
    }),
      //   实时监听--鼠标停止按下,则不再进行移动功能
      window.addEventListener('mouseup', () => {
        this.isMove = false
      }),
      // 接收来自user组件的数据
      // 进行展示与否
      this.$bus.$on('settingappear', () => {
        this.isShow = !this.isShow
        // 初次出现,置顶
        if (this.isShow) {
          this.zIndex = 108
        }
        // 用户信息/设置初始化--每次点击设置的时候都会初始化
        this.userInfoInitialization()
        this.userSettingInitialization()
      })
    // 接收来自其他窗口的数据,进行高度改变
    this.$bus.$on('changeZindex', (spaceZ, chatsZ, settingZ) => {
      this.zIndex = settingZ
    })
  },
  beforeDestroy() {
    this.$bus.$off('settingappear')
    this.$bus.$off('changeZindex')
  },
}
</script>

<style scoped>
.settingbox {
  position: absolute;
  width: 400px;
  height: 600px;
  top: 12%;
  left: 25%;
  z-index: 106;
  background-color: #1a191b;
  border-radius: 15px;
  box-shadow: 0 0 25px 5px black;
  display: flex;
  flex-flow: column nowrap;
  font-size: 1.8vh;
  color: white;
}
.settingbox:hover {
  border-radius: 25px;
  box-shadow: 0 0 30px 10px black;
}
/* 抬头 */
.toper {
  position: relative;
  width: 400px;
  height: 55px;
  border-radius: 25px 25px 0 0;
  display: flex;
  transition: 0.55s;
  flex-flow: row nowrap;
  background-color: rgba(47, 53, 66, 0.25);
}

.toper:hover {
  background-color: rgba(99, 110, 114, 0.2);
}

/* 设置名字 */
.toper > span {
  line-height: 55px;
  flex: 1;
  text-align: center;
}

/* 退出按钮 */
.exit {
  position: absolute;
  right: 0;
  z-index: 11;
  padding-right: 20px;
  line-height: 65px;
  cursor: pointer;
}
.exit img {
  transition: 0.8s;
}
.exit img:hover {
  transform: rotateZ(720deg) scale(1.33);
}
/* 所有设置 */
.allsetting {
  position: relative;
  width: 100%;
  max-height: 460px;
  display: flex;
  overflow-y: auto;
  overflow-x: hidden;
  flex-flow: column nowrap;
}
/* 外层设置 */
.setting {
  position: relative;
  width: 100%;
  height: 40px;
  padding: 10px;
  padding-left: 0;
  cursor: pointer;
  transition: 0.55s;
  display: flex;
  align-items: center;
  flex-flow: row nowrap;
  justify-content: space-between;
  border-bottom: 1px rgba(47, 53, 66, 0.25) solid;
}
.setting span {
  margin-left: 25px;
  font-size: 2.2vh;
}
.setting img {
  transition: 0.55s;
}
/* 内层设置 */
.settingdetail {
  position: relative;
  width: 90%;
  left: 5%;
  padding: 5px;
  display: flex;
  align-items: center;
  flex-flow: column nowrap;
}
/* 具体设置设置 */
.settingdetail div {
  position: relative;
  width: 100%;
  height: 45px;
  display: flex;
  transition: 0.55s;
  align-items: center;
  flex-flow: row nowrap;
  justify-content: space-between;
  border-bottom: 1px rgba(47, 53, 66, 0.25) solid;
}
.settingdetail div span {
  margin-left: 25px;
}
input {
  position: relative;
  width: 40%;
  height: 100%;
  border: 0;
  outline: 0;
  padding-left: 30px;
  transition: 0.55s;
  border-radius: 10px;
  background-color: rgba(99, 110, 114, 0);
  font-size: 1.8vh;
  color: pink;
}
input:focus {
  font-size: 2vh;
  border-radius: 20px;
  background-color: rgba(99, 110, 114, 0.1);
  color: greenyellow;
}
/* 上传按钮div */
.upload {
  position: relative;
  cursor: pointer;
  background-color: rgba(0, 0, 0, 0);
  color: pink;
  flex: 0.55;
  border-radius: 15px;
  transition: 0.55s;
  border: 0;
  z-index: 8;
  height: 100%;
}
.upload:hover {
  cursor: pointer;
  box-shadow: 0px 0px 25px rgba(99, 110, 114, 0.8);
  background-color: rgba(99, 110, 114, 0.6);
}
.upload input {
  cursor: pointer;
  position: absolute;
  width: 100%;
  opacity: 0;
}
.upload img {
  position: absolute;
  z-index: -1;
  left: 9%;
}
.upload span {
  position: absolute;
  font-size: 1.4vh;
  z-index: -1;
  left: 10%;
}

/* 开关按钮 */
.switch {
  cursor: pointer;
  transition: 0.2s;
}
/* 保存div */
.savediv {
  position: absolute;
  width: 100%;
  height: 60px;
  margin-bottom: 10px;
  display: flex;
  align-items: center;
  bottom: 0;
  flex-flow: row nowrap;
  justify-content: space-between;
}
/* 保存 */
.save {
  position: relative;
  align-self: center;
  width: 100px;
  height: 100%;
  cursor: pointer;
  background-color: rgba(99, 110, 114, 0.2);
  color: pink;
  border-radius: 15px;
  transition: 0.55s;
  border: 0;
  margin-left: 38%;
}
.save:hover {
  box-shadow: 0px 0px 25px rgba(99, 110, 114, 0.8);
  background-color: rgba(99, 110, 114, 0.6);
}
/* 所有hover效果 */
.setting:hover {
  box-shadow: 0px 0px 25px rgba(99, 110, 114, 0.2);
  background-color: rgba(99, 110, 114, 0.2);
}
.settingdetail div:hover {
  box-shadow: 0px 0px 25px rgba(99, 110, 114, 0.2);
  background-color: rgba(99, 110, 114, 0.2);
}

/* 该组件--聊天框进入退出动画 */
.settingboxT-enter-active {
  animation: swing-in-top-fwd 0.5s cubic-bezier(0.175, 0.885, 0.32, 1.275) both;
}
.settingboxT-leave-active {
  animation: swing-in-top-fwd 0.5s cubic-bezier(0.175, 0.885, 0.32, 1.275) both reverse;
}
/* 细节部分进入退出动画 */
.DetailT-enter-active {
  animation: slide-in-blurred-bottom 0.55s cubic-bezier(0.23, 1, 0.32, 1) both;
}
.DetailT-leave-active {
  animation: slide-in-blurred-bottom 0.2s cubic-bezier(0.23, 1, 0.32, 1) both reverse;
}
@media only screen and (orientation: portrait) {
  .settingbox {
    position: absolute;
    width: 100%;
    height: 180%;
    top: 10px;
    left: 0;
    z-index: 113;
    background-color: #1a191b;
    border-radius: 15px;
    box-shadow: 0 0 25px 5px black;
    display: flex;
    flex-flow: column nowrap;
    font-size: 1.8vh;
    color: white;
  }
  /* 抬头 */
  .toper {
    position: relative;
    width: 100%;
    height: 55px;
    border-radius: 25px 25px 0 0;
    display: flex;
    transition: 0.55s;
    flex-flow: row nowrap;
    background-color: rgba(47, 53, 66, 0.25);
  }
  /* 所有设置 */
  .allsetting {
    position: relative;
    width: 100%;
    max-height: 40%;
    display: flex;
    overflow-y: auto;
    overflow-x: hidden;
    flex-flow: column nowrap;
  }
  /* 保存div */
  .savediv {
    position: absolute;
    width: 100%;
    height: 60px;
    margin-top: 50%;
    margin-bottom: 0;
    display: flex;
    align-items: center;
    bottom: 0;
    top: 30%;
    flex-flow: row nowrap;
    justify-content: space-between;
  }
  /* 保存 */
  .save {
    position: relative;
    align-self: center;
    width: 100px;
    height: 100%;
    cursor: pointer;
    background-color: rgba(99, 110, 114, 0.2);
    color: pink;
    border-radius: 15px;
    transition: 0.55s;
    border: 0;
    margin-left: 38%;
  }
}

/* 该组件--聊天框进入退出动画 */
@keyframes swing-in-top-fwd {
  0% {
    -webkit-transform: rotateX(-100deg);
    transform: rotateX(-100deg);
    -webkit-transform-origin: top;
    transform-origin: top;
    opacity: 0;
  }
  100% {
    -webkit-transform: rotateX(0deg);
    transform: rotateX(0deg);
    -webkit-transform-origin: top;
    transform-origin: top;
    opacity: 1;
  }
}
/* 细节部分进入退出动画 */
@keyframes slide-in-blurred-bottom {
  0% {
    -webkit-transform: translateY(600px) scaleY(2.5) scaleX(0.2);
    transform: translateY(600px) scaleY(2.5) scaleX(0.2);
    -webkit-transform-origin: 50% 100%;
    transform-origin: 50% 100%;
    -webkit-filter: blur(40px);
    filter: blur(40px);
    opacity: 0;
  }
  100% {
    -webkit-transform: translateY(0) scaleY(1) scaleX(1);
    transform: translateY(0) scaleY(1) scaleX(1);
    -webkit-transform-origin: 50% 50%;
    transform-origin: 50% 50%;
    -webkit-filter: blur(0);
    filter: blur(0);
    opacity: 1;
  }
}
</style>
