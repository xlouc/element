<template functional>
  <i :class="'el-icon-' + props.name"></i>
</template>

<script>
export default {
  name: 'ElIcon',

  props: {
    name: String
  }
}
</script>
