<template>
  <div class="doc-guide-about">
    <doc-about></doc-about>
  </div>
</template>

<script>
import DocAbout from '../../about.md'
export default {
  components: { DocAbout },
  mounted() {
    this.$nextTick(function() {
      this.$el
        .querySelectorAll('input[type="checkbox"]')
        .forEach(function(dom) {
          dom.setAttribute('disabled', 'disabled')
        })
    })
  }
}
</script>
