<template>
  <div class="relative pt-1">
    <div class="overflow-hidden h-2 text-xs flex rounded bg-yellow-200">
      <div
        :title="'Resolved: ' + resolvedPercent"
        :style="{ width: resolvedPercent }"
        class="shadow-none flex flex-col text-center whitespace-nowrap text-white justify-center bg-green-600"
      ></div>
      <div
        :title="'Unresolved: ' + unresolvedPercent"
        :style="{ width: unresolvedPercent }"
        class="shadow-none flex flex-col text-center whitespace-nowrap text-white justify-center bg-red-600"
      ></div>
      <div
        :title="'Backlog: ' + backlogPercent"
        :style="{ width: backlogPercent }"
        class="shadow-none flex flex-col text-center whitespace-nowrap text-white justify-center bg-gray-400"
      ></div>
    </div>
  </div>
</template>
<script>
export default {
  name: "StatusBar",
  props: ["resolvedPercent", "unresolvedPercent", "backlogPercent"],
};
</script>