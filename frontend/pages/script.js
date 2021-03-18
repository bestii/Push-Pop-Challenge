import listTable from '../components/ListTable';
import StatusBar from '../components/StatusBar';
import {
  LIST_BACKLOG,
  LIST_RESOLVED,
  LIST_UNRESOLVED,
  LIST_UNDOBACKLOG
} from "../constants/constants";

export default {
  components: {
    listTable,
    StatusBar
  },
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
      activetab: 1,
      LIST_BACKLOG,
      LIST_RESOLVED,
      LIST_UNRESOLVED,
      LIST_UNDOBACKLOG,
      //{time_stamp, initial_list, final_list, item, code}
      logArray: [],
    };
  },
  computed: {
    ticketData: function () {
      let resolvedLen = this.resolved.length;
      let unresolvedLen = this.unresolved.length;
      let backlogLen = this.backlog.length;
      let totalTickets = (backlogLen + unresolvedLen + resolvedLen);
      return ({
        resolvedLen,
        unresolvedLen,
        backlogLen,
        totalTickets,
        backlogPercent: ((backlogLen / totalTickets * 100).toFixed(2) + '%'),
        unresolvedPercent: ((unresolvedLen / totalTickets * 100).toFixed(2) + '%'),
        resolvedPercent: ((resolvedLen / totalTickets * 100).toFixed(2) + '%')
      })
    },
    resolvedLen: function () {
      return this.resolved.length;
    },
    unresolvedLen: function () {
      return this.unresolved.length;
    },
    backlogLen: function () {
      return this.backlog.length;
    },
    totalTickets: function () {
      return (this.backlogLen + this.unresolvedLen + this.resolvedLen);
    },
    backlogPercent: function () {
      return ((this.backlogLen / this.totalTickets * 100).toFixed(2) + '%');
    },
    unresolvedPercent: function () {
      return ((this.unresolvedLen / this.totalTickets * 100).toFixed(2) + '%');
    },
    resolvedPercent: function () {
      return ((this.resolvedLen / this.totalTickets * 100).toFixed(2) + '%');
    },
    sortedResolved: function () {
      return this.resolved.sort((a, b) => {
        if (a.code < b.code) return -1;
        if (a.code > b.code) return 1;
        return 0;
      });
    },
    sortedUnresolved: function () {
      return this.unresolved.sort((a, b) => {
        if (a.code < b.code) return -1;
        if (a.code > b.code) return 1;
        return 0;
      });
    },
    sortedbacklog: function () {
      return this.backlog.sort((a, b) => {
        if (a.code < b.code) return -1;
        if (a.code > b.code) return 1;
        return 0;
      });
    }
  },
  methods: {
    moveTickets(ticket, logging = 1) {
      console.log(ticket);
      let final_list;
      switch (ticket.type) {
        case this.LIST_RESOLVED:
          final_list = this.LIST_UNRESOLVED;
          this.resolved = this.resolved.filter(item => item.code != ticket.item.code);
          this.unresolved.push(ticket.item);
          break;
        case this.LIST_UNRESOLVED:
          final_list = this.LIST_RESOLVED;
          this.unresolved = this.unresolved.filter(item => item.code != ticket.item.code);
          this.resolved.push(ticket.item);
          break;
        case this.LIST_BACKLOG:
          final_list = this.LIST_UNRESOLVED;
          this.backlog = this.backlog.filter(item => item.code != ticket.item.code);
          this.unresolved.push(ticket.item);
          break;
        case this.LIST_UNDOBACKLOG:
          this.unresolved = this.unresolved.filter(item => item.code != ticket.item.code);
          this.backlog.push(ticket.item);
          break;
      }
      if (logging && ticket.type != this.LIST_UNDOBACKLOG) {
        this.createLog(Date.now(), ticket.type, final_list, ticket.item, ticket.item.code);
      }

    },
    createLog(time_stamp, initial_list, final_list, item, code) {
      final_list = initial_list == this.LIST_BACKLOG ? this.LIST_UNDOBACKLOG : final_list;
      const log = {
        time_stamp,
        initial_list,
        final_list,
        item,
        code
      }
      this.logArray.pop();
      this.logArray.push(log)
    },
    undoChange() {
      if (this.logArray.length) {
        const log = this.logArray.pop();
        const ticket = {
          type: log.final_list,
          item: log.item
        }
        this.moveTickets(ticket, 0);
      }
    }
  },
};
