<template>
  <header class="page-header flex flex-pack-justify">
    <div class="page-header--left" @click='goback' :hidearrow='hideArrow'>
      <i class="arrow"></i>
      <slot name='left'></slot>
    </div>
    <div class="page-header--middle flex flex-align-center">
      <span class="page-header--title" v-if='!$slots.title'>{{title}}</span>
      <slot name='title'></slot>
    </div>
    <div class="page-header--right flex">
      <slot name='right'></slot>
    </div>
  </header>
</template>

<script>
/* eslint-disable */
export default {
  props: {
    title: {
      type: String,
      required: false,
      default: ""
    },
    hideArrow: {
      type: Boolean,
      required: false,
      default: false
    },
    back: {
      type: String,
      required: false,
      default: ""
    }
  },
  methods: {
    goback() {}
  }
};
</script>

<style lang='less'>
.page-header {
  height: 44px;
  background: #0081ea;
  &--left {
    position: relative;
    width: 60px;
    cursor: pointer;
    &[hidearrow]:before {
      display: none;
    }
    &:before {
      content: "";
      position: absolute;
      left: 10px;
      width: 11px;
      height: 11px;
      border-top: 1px solid #fff;
      border-left: 1px solid #fff;
      transform: rotate(-45deg) translate3d(0, 50%, 0);
      margin-top: 12px;
    }
  }
  &--right {
    width: 80px;
  }
  &--title {
    font-weight: 500;
    font-size: 19px;
    color: #fff;
  }
}
</style>
