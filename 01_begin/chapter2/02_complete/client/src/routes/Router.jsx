import { Navigate, Route, Routes } from "react-router-dom";

import HomeScreen from "../screens/HomeScreen/index";

const MyRouter = () => {
  return (
    <>
      <Routes>
        <Route path="/" element={<HomeScreen />} />
        <Route path="*" element={<Navigate to="/" />} />
      </Routes>
    </>
  );
};
export default MyRouter;
