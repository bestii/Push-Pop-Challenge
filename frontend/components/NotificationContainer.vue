<template lang="">
  <div class="notifications fixed w-2/12 z-50">
    <notification-element v-for="notification in notifications" 
      :notification="notification" :key="notification.index" />
  </div>
</template>
<script>
import NotificationElement from "./NotificationElement";
export default {
  name: "NotificationContainer",
  components: {
    NotificationElement,
  },
  props: ["notifications"],
};
</script>
<style>
.notifications {
  right: 10px;
  top: 10px;
}

</style>