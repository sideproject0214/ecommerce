import React from "react";
import { useSelector } from "react-redux";
import { Route, useLocation, Navigate, useNavigate } from "react-router-dom";

export const ShippingProtectedRoute = ({ component: Component, ...rest }) => {
  const { profile } = useSelector((state) => state.auth);
  console.log(profile, "protectedRoute");

  return <>{profile ? <Route element={<Component />} /> : <Navigate />}</>;
};
// export const ShippingProtectedRoute = ({ component: Component, ...rest }) => {
//   const { profile } = useSelector((state) => state.auth);
//   console.log(profile, "protectedRoute");
//   return (
//     <Route
//       {...rest}
//       render={(props) => {
//         if (profile) {
//           return <Component {...props} />;
//         } else {
//           return (
//             <Navigate
//               to={{
//                 pathname: "/",
//                 state: {
//                   from: props.location,
//                 },
//               }}
//             />
//           );
//         }
//       }}
//     />
//   );
// };

export const OrderProtectedRoute = ({ component: Component, ...rest }) => {
  const navigate = useNavigate();
  const location = useLocation();
  console.log(navigate, "protectedRoute Order");
  console.log(location, "protectedRoute Location");
  return (
    <Route
      {...rest}
      render={(props) => {
        if (navigate) {
          console.log(navigate, "history.location.state.from");
          return <Component {...props} />;
        } else {
          return (
            <Navigate
              to={{
                pathname: "/",
                state: {
                  from: props.location,
                },
              }}
            />
          );
        }
      }}
    />
  );
};
// export const OrderProtectedRoute = ({ component: Component, ...rest }) => {
//   const history = useHistory();
//   const location = useLocation();
//   console.log(history, "protectedRoute Order");
//   console.log(location, "protectedRoute Location");
//   return (
//     <Route
//       {...rest}
//       render={(props) => {
//         if (history) {
//           console.log(history, "history.location.state.from");
//           return <Component {...props} />;
//         } else {
//           return (
//             <Redirect
//               to={{
//                 pathname: "/",
//                 state: {
//                   from: props.location,
//                 },
//               }}
//             />
//           );
//         }
//       }}
//     />
//   );
// };
