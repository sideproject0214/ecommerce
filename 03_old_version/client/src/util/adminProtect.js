import store, { history } from "../store";

const adminProtect = () => {
  const path = store.getState().admin.errorPath;
  console.log(path, "adminProtect");
  // if (path) {
  //   history.push(path);
  // }
};

export default adminProtect;
