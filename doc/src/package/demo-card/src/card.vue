<template>
  <div class="demo-card">
    <div class="demo-card-codeBox-wrapper">
      <slot></slot>
      <div class="demo-card-codeBox">
        <div ref="code">
          <slot name="JS"></slot>
        </div>
        <div class="demo-card-result">
          <slot name="Result"></slot>
        </div>
      </div>
    </div>
  </div>
</template>

<script lang="ts">
import "../../../assets/svg/svg";
import { defineComponent, toRefs, ref } from "vue";

export default defineComponent({
  name: "demo-card",
  props: {
    name: {
      type: String,
      default: ""
    },
    fontSize: {
      type: [String, Number],
      default: 20
    },
    fill: {
      type: String,
      default: "#ffffff"
    }
  },
  data() {
    return {};
  },
  setup(props) {
    let { fontSize } = toRefs(props);
    const activeIndex = ref(0);
    const openActive = (idx: number) => activeIndex.value = idx;
    return {
      fontSize,
      activeIndex,
      openActive
    };
  },
  mounted() {
    if (!this.$slots.Result()[0].children) {
      this.buttonGroup = [];
    }

  }
});
</script>

<style lang="scss">
@import "../../../assets/style/color";

.demo {
  width: 100%;
  margin-top: 20px;
  font-family: Futura;
  max-width: 600pt;
  &:last-child {
    margin-bottom: 90px;
  }

  strong {
    color: #e84c3b;
  }

  &-title {
    h1 {
      color: rgb(244, 224, 233);
      text-align: center;
      letter-spacing: 1px;
      color: rgb(244, 224, 233);
    }
  }

  &-card {
    padding: 20px;
    margin-bottom: 10px;
    display: flex;
    justify-content: center;
    align-items: center;
    color: #ecf2f3;
    border-radius: 8px;
    background: rgba(55, 55, 56, 0.31);

    h2 {
      color: #ffb311;
      margin: 0;
    }

    &-result {
      padding-top: 20px;
      padding-bottom: 20px;
    }

    &-description {
      p {
        line-height: 1.75;
      }
    }

    .fixedHeight {
      height: 220px;

      pre {
        min-height: 220px;
      }
    }

    &-codeBox {;
      overflow-y: auto;
      overflow-x: hidden;
      position: relative;
      display: flex;
      align-items: center;

      >div{
        &:first-child {
          margin-right: 20px;
          flex: 1;
        }
      }

      &-button {
        text-align: end;

        span {
          cursor: pointer;
          margin-left: 10px;
          color: #ffffff;

          &.active {
            color: #c62524;
          }
        }
      }

      &-wrapper {
        width: 100%;
        position: relative;
      }
    }
  }

  .highlight {
    width: 100%;
    display: inline-block;
  }
}

</style>
