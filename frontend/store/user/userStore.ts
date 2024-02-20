import { defineStore } from "pinia";

import User from "~/domain/User";

import InitialState from "@/store/user/initialState";

const useUserStore = defineStore("user", {
  state: (): InitialState => ({
    user: null,
  }),
});
