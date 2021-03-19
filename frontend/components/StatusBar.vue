<template>
  <div class="relative pt-1">
    <div class="overflow-hidden h-2 text-xs flex rounded bg-yellow-200">
      <div
        :title="'Resolved: ' + ticketData.resolvedPercent"
        :style="{ width: ticketData.resolvedPercent }"
        class="shadow-none flex flex-col text-center whitespace-nowrap text-white justify-center bg-green-600"
      ></div>
      <div
        :title="'Unresolved: ' + ticketData.unresolvedPercent"
        :style="{ width: ticketData.unresolvedPercent }"
        class="shadow-none flex flex-col text-center whitespace-nowrap text-white justify-center bg-red-600"
      ></div>
      <div
        :title="'Backlog: ' + ticketData.backlogPercent"
        :style="{ width: ticketData.backlogPercent }"
        class="shadow-none flex flex-col text-center whitespace-nowrap text-white justify-center bg-gray-400"
      ></div>
    </div>
  </div>
</template>
<script>
export default {
  name: "StatusBar",
  // props passed to the component.
  props: {
    // Contains information about all the type of tickets.
    ticketData: {
      type: Object,
      required: true,
    },
  },
};
</script>