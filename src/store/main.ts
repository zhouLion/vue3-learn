import { defineStore } from "pinia";

export const useMainStore = defineStore({
  id: "main",
  state: () => ({
    name: "一只鱼",
  }),
  // getters
  getters: {
    nameLength: (state) => state.name.length,
  },
  actions: {
    async insertPost(data: string) {
      // await requstHttp(data);
      this.name = data;
    },
  },
});
