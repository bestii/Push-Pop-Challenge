// Imports
import listTable from '../components/ListTable';
import StatusBar from '../components/StatusBar';
import UndoBtn from '../components/UndoBtn';
import Notification from '../components/Notification';
import {
  LIST_BACKLOG,
  LIST_RESOLVED,
  LIST_UNRESOLVED,
  LIST_UNDOBACKLOG
} from "../constants/constants";

export default {
  components: {
    // Components used in the page
    listTable,
    StatusBar,
    UndoBtn,
    Notification
  },
  async asyncData({
    $axios
  }) {
    try {
      const response = await $axios.$get(
        //const { resolved, unresolved, backlog } = await $axios.$get(
        //"http://localhost:8000/get_lists"
        //"https://604a7ad59251e100177cec16.mockapi.io/api/v1/get_list" // Mock API to deliver the data.
        "http://localhost:3000/data.json"

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
      // Array of Resolved tickets.
      resolved: [],
      // Array of Unresolved tickets.
      unresolved: [],
      // Array of Backlog tickets.
      backlog: [],
      /* 
        Array that maintains the log for the UNDO operation
        Format: {time_stamp, initial_list, final_list, item, code} 
      */
      logArray: [],
      notifications: [],
      // Constant variables imported from constants.js
      activetab: 1,
      LIST_BACKLOG,
      LIST_RESOLVED,
      LIST_UNRESOLVED,
      LIST_UNDOBACKLOG,
    };
  },
  computed: {
    /* 
      Name: ticketData
      Description: Contains information about the tickets.
      type: Object
      {
        resolvedLen: # of resolved tickets
        unresolvedLen: # of unresolved tickets
        backlogLen: # of backlog tickets
        totalTickets: Total # of tickets
        backlogPercent: % of resolved tickets
        unresolvedPercent: % of resolved tickets
        resolvedPercent: % of resolved tickets
      }
    */
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
    /* sortedResolved contains the resolved tickets in sorted order. */
    sortedResolved: function () {
      return this.resolved.sort((a, b) => {
        if (a.code < b.code) return -1;
        if (a.code > b.code) return 1;
        return 0;
      });
    },
    /* sortedUnresolved contains the unresolved tickets in sorted order. */
    sortedUnresolved: function () {
      return this.unresolved.sort((a, b) => {
        if (a.code < b.code) return -1;
        if (a.code > b.code) return 1;
        return 0;
      });
    },
    /* sortedbacklog contains the backlog tickets in sorted order. */
    sortedbacklog: function () {
      return this.backlog.sort((a, b) => {
        if (a.code < b.code) return -1;
        if (a.code > b.code) return 1;
        return 0;
      });
    }
  },
  methods: {
    /* 
      Name: moveTickets
      Description: function to perform the move opertaion between (resolved, unresolved, backlog).
      @param(ticket): The ticket to be moved
      @param(logging): Boolean that denotes if the action needs to be logged.
    */
    moveTickets(ticket, logging = true) {
      console.log(ticket);
      let final_list;
      switch (ticket.type) {
        case this.LIST_RESOLVED:
          final_list = this.LIST_UNRESOLVED;
          this.resolved = this.resolved.filter(item => item.code != ticket.item.code);
          this.unresolved.push(ticket.item);
          this.notify(`Moved ${ticket.item.code} to unresolved.`);
          break;
        case this.LIST_UNRESOLVED:
          final_list = this.LIST_RESOLVED;
          this.unresolved = this.unresolved.filter(item => item.code != ticket.item.code);
          this.resolved.push(ticket.item);
          this.notify(`Moved ${ticket.item.code} to resolved.`);
          break;
        case this.LIST_BACKLOG:
          final_list = this.LIST_UNRESOLVED;
          this.backlog = this.backlog.filter(item => item.code != ticket.item.code);
          this.unresolved.push(ticket.item);
          this.notify(`Moved ${ticket.item.code} to unresolved.`);
          break;
        case this.LIST_UNDOBACKLOG:
          this.unresolved = this.unresolved.filter(item => item.code != ticket.item.code);
          this.backlog.push(ticket.item);
          this.notify(`Moved ${ticket.item.code} to backlog.`);
          break;
      }
      if (logging && ticket.type != this.LIST_UNDOBACKLOG) {
        this.createLog(Date.now(), ticket.type, final_list, ticket.item, ticket.item.code);
      }
    },
    /* 
      Name: createLog
      Description: function to create a log for the move opertion.
      @param(time_stamp): Timestamp of the operation
      @param(initial_list): Initial list of the ticket
      @param(final_list): List to which the ticket is moved
      @param(item): Ticket object
      @param(code): Key of the ticket
    */
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
    /* 
      Name: undoChange
      Description: function to perform the undo of the previous change.
    */
    undoChange() {
      if (this.logArray.length) {
        const log = this.logArray.pop();
        const ticket = {
          type: log.final_list,
          item: log.item
        }
        this.moveTickets(ticket, false);
      }
    },
    notify(msg) {
      console.log("called")
      this.notifications.push({
        id: Date.now(),
        title: "Notification",
        text: msg
      })
    },
    removeNotification() {

    }
  },
};
