<template >
  <button
    class="bg-red-500 hover:bg-red-600 font-semibold text-white py-2 px-4 border border-red-500 hover:border-transparent rounded disabled:opacity-50"
    :disabled="btnDisabled"
    @click="undo"
  >
    <svg
      version="1.1"
      id="Layer_1"
      xmlns="http://www.w3.org/2000/svg"
      xmlns:xlink="http://www.w3.org/1999/xlink"
      x="0px"
      y="0px"
      viewBox="0 0 512 512"
      enable-background="new 0 0 512 512"
      xml:space="preserve"
      width="24"
      class="fill-current"
    >
      <path
        d="M374.2,189.2H157.5L275.7,71.1H157.5L0,228.6l157.5,157.5h118.2L157.5,268h216.6c32.6,0,59.1,26.4,59.1,59.1
	c0,32.6-26.4,59.1-59.1,59.1v78.8c76.1,0,137.8-61.7,137.8-137.8C512,250.9,450.3,189.2,374.2,189.2z"
      />
    </svg>
  </button>
</template>
<script>
export default {
  name: "UndoBtn",
  props: {
    btnDisabled: {
      required: true,
      type: Boolean,
    },
  },
  methods: {
    undo() {
      this.$emit("undo");
    },
  },
};
</script>
<style></style>