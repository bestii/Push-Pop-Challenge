<template lang="">
  <div class="notifications z-50">
    <div v-for="notification in notifications" transition="fade">
        <div class="notification bg-white border p-3 mb-2 animated">
            <h5 v-if="notification.title">{{notification.title}}</h5>
            <p>{{notification.text}}</p>
        </div>
    </div>
  </div>
</template>
<script>
export default {
  name: "Notification",
  props: ["notifications"],
};
</script>
<style>
.notifications {
  position: fixed;
  right: 10px;
  top: 10px;
  width: 350px;
}
@-webkit-keyframes fadeinout {
  0% {
    opacity: 0;
  }
  10% {
    opacity: 1;
  }
}

@keyframes fadeinout {
  0% {
    opacity: 0;
  }
  100% {
    opacity: 1;
  }
}

.notification {
  -webkit-animation: fadeinout 2s linear forwards;
  animation: fadeinout 2s linear forwards;
}

.animated {
  -webkit-animation-duration: 1s;
  animation-duration: 1s;
  -webkit-animation-fill-mode: both;
  animation-fill-mode: both;
}

</style>