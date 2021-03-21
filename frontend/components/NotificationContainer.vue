<template>
  <div class="notifications fixed w-2/12 z-50">
    <notification-element
      v-for="notification in notifications"
      :notification="notification"
      @triggerClose="triggerClose($event)"
      :key="notification.id"
    />
  </div>
</template>
<script>
import NotificationElement from "./NotificationElement";
export default {
  name: "NotificationContainer",
  components: {
    NotificationElement,
  },
  // All the notifications is passed as props
  props: ["notifications"],
  methods: {
    // Method to trigger the close event to the parent
    triggerClose: function (notification) {
      this.$emit("removeNotification", notification);
    },
  },
};
</script>
<style>
.notifications {
  right: 10px;
  top: 10px;
}
</style>