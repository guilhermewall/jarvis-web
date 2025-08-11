export const auth = {
  get: () =>
    typeof localStorage !== "undefined" ? localStorage.getItem("token") : null,
  set: (t: string) => localStorage.setItem("token", t),
  clear: () => localStorage.removeItem("token"),
  isAuthed: () =>
    !!(typeof localStorage !== "undefined" && localStorage.getItem("token")),
};
