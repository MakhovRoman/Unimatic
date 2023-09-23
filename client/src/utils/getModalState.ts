export const getModalState = () => {
  const state = localStorage.getItem("modal_state");

  return state ? JSON.parse(state) : false;
}
