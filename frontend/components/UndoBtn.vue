<template>
  <button
    class="bg-red-500 hover:bg-red-600 font-semibold text-white py-2 px-2 border border-red-500 hover:border-transparent rounded disabled:opacity-50"
    :disabled="btnDisabled"
    @click="undo"
  >
    <svg
      xmlns="http://www.w3.org/2000/svg"
      xmlns:xlink="http://www.w3.org/1999/xlink"
      version="1.1"
      x="0px"
      y="0px"
      viewBox="0 0 85.715 125"
      xml:space="preserve"
      width="16"
      class="fill-current inline-block"
    >
      <path
        style=""
        d="M71.429,57.143c0,15.765-12.808,28.572-28.571,28.572c-15.765,0-28.572-12.808-28.572-28.572  c0-15.764,12.808-28.571,28.572-28.571l14.369,0.153v14.202l21.471-21.498L57.227,0v14.285H42.857C19.196,14.285,0,33.482,0,57.143  C0,80.804,19.196,100,42.857,100c23.66,0,42.857-19.196,42.857-42.857H71.429z"
      />
    </svg>
    <span>UNDO</span>
  </button>
</template>
<script>
export default {
  name: "UndoBtn",
  // props passed to the component.
  props: {
    // Boolean variable to disable the undo button.
    btnDisabled: {
      required: true,
      type: Boolean,
    },
  },
  methods: {
    // Method to handle the undo button click.
    undo() {
      this.$emit("undo");
    },
  },
};
</script>