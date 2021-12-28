<template>
  <div class="components-content-wrapper">
    <div class="components-content">
      <router-view></router-view>
    </div>
  </div>
</template>

<script>
export default {
  name: "content"
}
</script>

<style lang="scss">

.components-content {
  background: #112232;
  padding: 0 20px 20px;
  color: #dae3f6;
  font-family: Futura;
  width: 80%;
  max-width: 800pt;
  &-wrapper {
    width: 100%;
    background: #112232;
    display: flex;
    justify-content: center;
    height: calc(100vh - 66px);
    overflow-y: auto;
  }
}

.markdown-body {
  background: #112232;

  p {
    margin-top: 0;
  }
}
</style>
