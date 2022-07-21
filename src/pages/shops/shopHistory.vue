<template>
  <div class="shopHistory">
    <div class="block">
  <el-timeline>
    <el-timeline-item timestamp="2018/4/12" placement="top" size="large" type="success">
      <el-card class="radius">
        <h4>更新 Github 模板</h4>
        <p>王小虎 提交于 2018/4/12 20:46</p>
      </el-card>
    </el-timeline-item>
    <el-timeline-item timestamp="2018/4/3" placement="top" size="large" type="success">
      <el-card class="radius">
        <h4>更新 Github 模板</h4>
        <p>王小虎 提交于 2018/4/3 20:46</p>
      </el-card>
    </el-timeline-item>
    <el-timeline-item timestamp="2018/4/2" placement="top" size="large" type="danger">
      <el-card class="radius">
        <h4>更新 Github 模板</h4>
        <p>王小虎 提交于 2018/4/2 20:46</p>
      </el-card>
    </el-timeline-item>
  </el-timeline>
</div>
  </div>
</template>

<script>
export default {
name:'shopHistory',
}
</script>

<style scoped>
.shopHistory{
  position: relative;
  width: 100%;
  height: 660px;
  overflow: hidden;
  overflow-y: auto;
}
.block{
  position: relative;
  width: 60%;
  left: 20%;
}
.radius{
  border-radius: 25px;
}

</style>