<template>
<!-- /* From Uiverse.io by G4b413l */  -->
<div class="line-wobble"></div>
</template>

<script lang="ts" setup>

</script>

<style scoped>
/* From Uiverse.io by G4b413l */
.line-wobble {
 --uib-size: 80px;
 --uib-speed: 1.55s;
 --uib-color: black;
 --uib-line-weight: 5px;
 position: relative;
 display: flex;
 align-items: center;
 justify-content: center;
 height: var(--uib-line-weight);
 width: var(--uib-size);
 border-radius: calc(var(--uib-line-weight) / 2);
 overflow: hidden;
 transform: translate3d(0, 0, 0);
}

.line-wobble::before {
 content: '';
 position: absolute;
 top: 0;
 left: 0;
 height: 100%;
 width: 100%;
 background-color: var(--uib-color);
 opacity: 0.1;
}

.line-wobble::after {
 content: '';
 height: 100%;
 width: 100%;
 border-radius: calc(var(--uib-line-weight) / 2);
 animation: wobble var(--uib-speed) ease-in-out infinite;
 transform: translateX(-90%);
 background-color: var(--uib-color);
}

@keyframes wobble {
 0%,
  100% {
  transform: translateX(-90%);
 }

 50% {
  transform: translateX(90%);
 }
}

</style>
