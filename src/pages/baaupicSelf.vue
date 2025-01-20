<template>
  <div class="baaupicSelfBox">
    <div class="clcc">
      <el-carousel indicator-position="outside" :interval="4000" height="700px" class="disnone">
        <el-carousel-item v-for="item in 4" :key="item"> </el-carousel-item>
      </el-carousel>
      <div class="title">
        <span> {{ titles }} </span>
      </div>
      <br /><br />
      <el-row :gutter="20">
        <el-col :span="8"><el-button @click="favorite" class="buts">My Favorite</el-button></el-col>
        <el-col :span="8"><el-button @click="picturesAll" class="buts">All Pictures</el-button></el-col>
        <el-col :span="8"><el-button @click="collections" class="buts">My Collections</el-button></el-col>
      </el-row>
      <br />
      <br />
      <br />
      <div class="mains">
        <el-image class="image" :src="pics.picScr" lazy :preview-src-list="[pics.picScr]" v-for="pics of ninePics" :key="pics.picId"> </el-image>
      </div>
    </div>

    <el-button type="success" round class="backs" @click="routerTo(backurl)"><i class="el-icon-caret-left"></i> 返回</el-button>
  </div>
</template>

<script>
import { mapState } from 'vuex'
export default {
  name: 'baaupicSelf',
  data() {
    return {
      ninePics: [],
      ninePages: 0,
      titles: 'All Pictures',
      collectionss: [],
      goodess: [],
      oriData: [],
      backurl: 'baaupic',
    }
  },
  computed: {
    ...mapState('userInfo', ['user']),
  },
  methods: {
    getPicsCreated() {
      this.ninePics = []
      this.$axios.post('/api/returnPics', { picId: 0, pageStart: 0, pageEnd: 9999 }).then(
        (response) => {
          this.ninePics = response.data
          this.oriData = response.data
        },
        (error) => {
          console.log(error.message)
        }
      )
    },

    favorite() {
      this.titles = 'My Favorite'
      this.ninePics = []
      for (let index = 0; index < this.goodss.length - 1; index++) {
        const god = this.goodss[index]
        for (let index2 = 0; index2 < this.oriData.length; index2++) {
          const ori = this.oriData[index2]
          if (god == ori.picId.toString()) {
            this.ninePics.push(ori)
          }
        }
      }
    },
    picturesAll() {
      this.titles = 'All Pictures'
      this.getPicsCreated()
    },
    collections() {
      this.titles = 'My Collections'
      this.ninePics = []
      for (let index = 0; index < this.collectionss.length - 1; index++) {
        const god = this.collectionss[index]
        for (let index2 = 0; index2 < this.oriData.length; index2++) {
          const ori = this.oriData[index2]
          if (god == ori.picId.toString()) {
            this.ninePics.push(ori)
          }
        }
      }
    },
    routerTo(rout) {
      this.$router.push({
        name: rout,
      })
    },
  },

  created() {
    // 手机端
    if (window.innerWidth < window.innerHeight) {
      this.backurl = '/'
    }

    this.getPicsCreated()
    setTimeout(() => {
      this.$axios.post('/api/selectPicWithByUserQQ', { picWithQQ: this.user.userQQ }).then(
        (response) => {
          this.collectionss = response.data[0]['picCollections'].split(',')
          this.goodss = response.data[0]['picGoods'].split(',')
        },
        (error) => {
          console.log(error.message)
        }
      )
    }, 250)
  },
}
</script>

<style scoped>
.baaupicSelfBox {
  position: absolute;
  background-color: white;
  width: 100%;
  height: 100%;
  z-index: 80;
  transition: 0.55s;
  font-size: 1.6vh;
  overflow-y: auto;
  text-align: center;
  font-weight: bolder;
  display: flex;
  flex-flow: column nowrap;
}
.clcc {
  position: relative;
  width: 100%;
  height: 1000px;
  overflow-y: auto;
}
.image {
  width: 600px;
  height: 400px;
  margin: 10px;
}
.title {
  position: absolute;
  z-index: 2;
  width: 100%;
  height: 700px;
  top: 0;
  line-height: 700px;
  text-align: center;
  transition: 0.55s;
  color: white;
  font-size: 10vh;
  font-weight: bolder;
  font-family: 'Courier New', Courier, monospace;
}
.title:hover {
  background-color: rgba(0, 0, 0, 0.55);
  color: palegoldenrod;
}
.buts {
  width: 100%;
  height: 50px;
  font-size: 2.2vh;
  font-weight: bolder;
  font-family: 'Courier New', Courier, monospace;
  background-color: palegoldenrod;
}
.mains {
  position: relative;
  background-color: whitesmoke;
  width: 100%;
}

.backs {
  position: absolute;
  z-index: 3;
  left: 25px;
  top: 25px;
  transition: 0.55s;
  opacity: 0.5;
}
.backs:hover {
  opacity: 1;
}

.el-carousel__item:nth-child(5) {
  background-image: url('https://n.sinaimg.cn/sinacn/w960h1440/20171223/d7cd-fypvuqf4642780.png');
}

.el-carousel__item:nth-child(6) {
  background-image: url('https://bpic.588ku.com/back_list_pic/23/05/17/75e92f4e681efeb526f7d8603199ca11.jpg');
}
.el-carousel__item:nth-child(3) {
  background-image: url('https://img95.699pic.com/photo/50059/8720.jpg_wh860.jpg');
}

.el-carousel__item:nth-child(4) {
  background-image: url('https://pic.3gbizhi.com/uploads/20230610/31417482b115ea49824edb27b865faf3.jpg');
}

@media only screen and (orientation: portrait) {
  .disnone {
    display: none;
  }
  .buts {
    width: 100%;
    height: 50px;
    font-size: 1.2vh;
    font-weight: bolder;
    font-family: 'Courier New', Courier, monospace;
    background-color: palegoldenrod;
  }
  .title {
    display: none;
  }
  .backs {
    position: absolute;
    z-index: 3;
    left: 0px;
    top: 0px;
    transition: 0.55s;
    opacity: 0.5;
  }
  .image {
    width: 30%;
    height: auto;
    margin: 10px;
  }
}
</style>
