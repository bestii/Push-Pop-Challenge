<template>
  <div>
    <div v-if="listItems.length">
      <table
        class="min-w-full leading-normal list-table"
        aria-describedby="list of tickets"
      >
        <thead>
          <tr class="border-b-2 border-gray-300">
            <th
              scope="col"
              class="px-5 py-3 bg-gray-100 text-left text-xs font-semibold text-gray-600 uppercase tracking-wider"
            >
              Key
            </th>
            <th
              scope="col"
              class="px-5 py-3 border-b-2 border-gray-300 bg-gray-100 text-left text-xs font-semibold text-gray-600 uppercase tracking-wider"
            >
              Description
            </th>
            <th
              scope="col"
              class="px-5 py-3 border-b-2 border-gray-300 bg-gray-100 text-left text-xs font-semibold text-gray-600 uppercase tracking-wider"
            ></th>
          </tr>
        </thead>
        <tbody class="align-baseline">
          <tr
            class="border-b border-gray-300"
            v-for="item in listItems"
            :key="item.index"
          >
            <td class="px-5 py-5 bg-white text-sm">
              {{ item.code }}
            </td>
            <td class="px-5 py-5 bg-white text-sm">
              {{ item.text }}
            </td>
            <td>
              <button
                class="bg-transparent hover:bg-blue-500 text-blue-700 font-semibold hover:text-white py-2 px-2 border border-blue-500 hover:border-transparent rounded"
                @click="changeType(item)"
              >
                {{ btnText }}
              </button>
            </td>
          </tr>
        </tbody>
      </table>
    </div>
    <div v-else class="text-center p-3 font-semibold">No tickets to list.</div>
  </div>
</template>

<script>
export default {
  name: "listTable",
  // props passed to this component.
  props: {
    // The list to be displayed.
    listItems: {
      type: Array,
      required: true,
    },
    // Display test of the button.
    btnText: {
      type: String,
      required: true,
    },
    // Type of the list(resolved, unresolved, backlog).
    listType: {
      type: String,
      required: true,
    },
  },
  methods: {
    // Method to handle the button click.
    changeType(item) {
      // Propagate event to parent component.
      this.$emit("moveTickets", { type: this.listType, item });
    },
  },
};
</script>

<style>
.list-table > tbody > tr:last-child {
  border-bottom: none;
}
</style>