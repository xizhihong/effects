<script setup>
import SectionStacked from './SectionStacked.vue';
import SectionSplit from './SectionSplit.vue';
import SectionGallery from './SectionGallery.vue';
import SectionSteps from './SectionSteps.vue';

const props = defineProps({
  sections: {
    type: Array,
    default: () => [],
  },
});

const componentMap = {
  stacked: SectionStacked,
  split: SectionSplit,
  gallery: SectionGallery,
  steps: SectionSteps,
};
</script>

<template>
  <div class="layout-renderer">
    <component
      v-for="section in props.sections"
      :key="section.id"
      :is="componentMap[section.layout]"
      :section="section"
    />
  </div>
</template>

<style scoped>
.layout-renderer {
  display: flex;
  flex-direction: column;
  gap: 2rem;
}
</style>
