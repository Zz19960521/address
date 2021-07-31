<template>
  <div class="modal-backdrop">
     <div class="topArrow" v-on:click="goUp"></div>
    <div class="modal" :style="mainStyles">

      <div class="modal-body">
        <table style="width:360px;">
          <tr>
            <td rowspan="2" style="width:140px">
              <img
                style="width: 120px; height: 120px"
                src="../assets/logo.png"
              />
            </td>
            <td colspan="2">小明-{{info.username}}</td>
          </tr>
          <tr>
            <td>
              <img src="../assets/followers.png" style="width:20px;vertical-align: middle;"/>
             <span>{{info.followerNum}} followers</span>
             </td>
            <td>
              <img src="../assets/heart.png" style="width:20px;vertical-align: middle;"/>
             <span> {{info.starNum}} stars</span>
              </td>
          </tr>
          <tr style="height:40px;">
            <td colspan="3">
              <img src="../assets/email.png" style="width:20px;vertical-align: middle;"/>
              <span>Email:{{info.email}}</span>
            </td>
            </tr>
          <tr style="height:40px;"><td >
              <img src="../assets/info.png" style="width:20px;vertical-align: middle;"/>
              <span>Bio</span>
            </td></tr>
        </table>
      </div>
      <div class="modal-footer">
        <button type="button" class="btn-close" @click="closeSelf">关闭</button>
        <button type="button" class="btn-confirm" @click="confirm">确认</button>
      </div>
    </div>
    <div class="bottomArrow" v-on:click="goUp"></div>
  </div>
</template>

<script>
/* eslint-disable */

export default {
  name: "Modal",
  props: {},
  data() {
    return {
      mainStyles: {},
      info:{}
    };
  },
  mounted(){
    this.goUp()
  },
  methods: {
    closeSelf() {
      this.$emit("closeme");
    },
    confirm() {},
    goUp(){
      this.info = {username:(Math.random()*10).toFixed(0), starNum:(Math.random()*1000).toFixed(0),followerNum:(Math.random()*1000).toFixed(0),email:(Math.random()*100000).toFixed(0)+'@qq.com'}
    }
  },
};
</script>
<style lang="less" scoped>
.modal-backdrop {
  position: fixed;
  top: 0;
  right: 0;
  bottom: 0;
  left: 0;
  background-color: rgba(0, 0, 0, 0.3);
  display: flex;
  justify-content: center;
  align-items: center;
}
.modal {
  background-color: #fff;
  box-shadow: 2px 2px 20px 1px;
  overflow-x: auto;
  display: flex;
  flex-direction: column;
  border-radius: 16px;
  width: 90%;
}
.modal-header {
  border-bottom: 1px solid #eee;
  color: #313131;
  justify-content: space-between;
  padding: 15px;
  display: flex;
}
.modal-footer {
  border-top: 1px solid #eee;
  justify-content: flex-end;
  padding: 15px;
  display: flex;
}
.modal-body {
  position: relative;
  padding: 20px 10px;
}
.btn-close,
.btn-confirm {
  border-radius: 8px;
  margin-left: 16px;
  width: 56px;
  height: 36px;
  border: none;
  cursor: pointer;
}
.btn-close {
  color: #313131;
  background-color: transparent;
}
.btn-confirm {
  color: #fff;
  background-color: #2d8cf0;
}
.topArrow{  
  position: fixed;
  top:120px;
  display: inline-block;  
  margin: 72px;  
  border-top: 6px solid;
  border-right: 6px solid;  
  width: 40px;
  height: 40px;  
  transform: rotate(-45deg); 
}
.bottomArrow{
  position: fixed;
  top:520px;
  display: inline-block;  
  margin: 72px;  
  border-top: 6px solid;
  border-right: 6px solid;  
  width: 40px;
  height: 40px;  
  transform: rotate(135deg); 
}
</style>