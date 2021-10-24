<template>
  <div class='slider'>
    <ul>
      <li :class='{secondLevel: list.isSecondLevel}' @click='toRoute(list.name)' v-for='list in routeLists'>
        <span v-if='list.metaName' class='metaName'>{{ list.metaName }}</span>
        <span v-else>{{ list.name }}</span>
      </li>
    </ul>
  </div>
</template>

<script>

export default {
  name: 'slider',
  props: {
    route: {
      type: Object,
    },
  },
  inject: ['bus'],
  computed: {
    routeLists() {
      const documentList = this.route.options
      if (this.bus.target.lang === 'en') {
        return documentList.routes[1].children
      } else {
        return documentList.routes[2].children
      }
    },
  },

  methods: {
    toRoute(name) {
      this.$router.push({ name })
    },
  },
}
</script>

<style scoped lang='scss'>
@import "./src/assets/style/global";

.slider {
  width: 210px;
  height: calc(100vh - 66px);
  // background: #FF3643;
  background: #112232;
  z-index: 1000;
  overflow-y: auto;
  color: #ffffff;
  font-size: 20px;
  font-family: Futura, -apple-system, BlinkMacSystemFont, Segoe UI, Roboto, Helvetica Neue, Arial, Noto Sans, sans-serif, Apple Color Emoji, Segoe UI Emoji, Segoe UI Symbol, Noto Color Emoji;

  ul {
    list-style: none;
    margin-left: 25px;
    padding: 0;

    li {
      padding-top: 6px;
      padding-bottom: 6px;
      cursor: pointer;
      transition: .23s color;
      font-size: 16px;
      border-left: 1px solid #e84c3b;
      padding-left: 40px;
      position: relative;
      &:after {
        position: absolute;
        top: 50%;
        left: 0;
        background: #e84c3b;
        content: '';
        display: inline-block;
        width: 30px;
        height: 1px;
      }

      &:hover {
        color: #e84c3b;
        &:after {
          background: #e84c3b;
        }
      }
      &:first-child {
        border-left: none;

        &:before {
          position: absolute;
          bottom: 0;
          left: 0;
          background: #e84c3b;
          content: '';
          display: inline-block;
          width: 1px;
          height: 50%;
        }
      }

      &:last-child {
        border-left: none;

        &:before {
          position: absolute;
          top: 0;
          left: 0;
          background: #e84c3b;
          content: '';
          display: inline-block;
          width: 1px;
          height: 50%;
        }
      }
    }

    .secondLevel {
      padding-left: 60px;
      font-size: 15px;
      &:after {
        position: absolute;
        top: calc(50% - 1px);
        left: 40px;
        background: #e8c53b;
        content: '';
        display: inline-block;
        width: 6px;
        height: 6px;
        border-radius: 50%;
      }
    }
  }

  @media screen and (min-width: 1220px)  {
    width: 280px;
    padding-left: 70px;
  }
  @media screen and (min-width: 1420px)  {
    width: 410px;
    padding-left: 210px;
  }
}
</style>
