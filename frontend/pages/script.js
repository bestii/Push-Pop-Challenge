export default {
  async asyncData({
    $axios
  }) {
    try {
      const response = await $axios.$get(
        //const { resolved, unresolved, backlog } = await $axios.$get(
        "https://604a7ad59251e100177cec16.mockapi.io/api/v1/get_list"
        //"http://localhost:3000/data.json"
        //"http://localhost:8000/get_lists"
      );
      const resolved = response[0].resolved;
      const unresolved = response[0].unresolved;
      const backlog = response[0].backlog;
      return {
        resolved,
        unresolved,
        backlog,
      };
    } catch (error) {
      console.log(
        `Couldn't get error lists:\n${error}\nDid you start the API?`
      );
      console.log(
        "HINT: You can comment out the full `asyncData` method and work with mocked data for UI/UX development, if you want to."
      );
    }
  },
  data() {
    return {
      resolved: [],
      unresolved: [],
      backlog: [],
    };
  },
};
