// import React, {useContext, useEffect} from 'react';
// import {BrowserRouter as Router, Switch, Route, useHistory} from 'react-router-dom';
// import { Home, LandingPage, Profile, Subscribe, NotFound, DetailBook, ReadBook, Admin, AddBook } from '../../pages/pages';

// import { UserContext } from '../UserContext/UserContext';

// import {API, setAuthToken}  from '../api/api';

// if (localStorage.token) {
//     setAuthToken(localStorage.token);
// }

// const Routes = () => {
//     let history = useHistory();
//     const [state, dispatch] = useContext(UserContext);

//     useEffect(() => {
//         if (!state.isLogin) {
//           history.push("/");
//         } else {
//           if (state.user.role === "admin") {
//             history.push("/admin");
//           } else if (state.user.role === "customer") {
//             history.push("/home");
//           }
//         }
//       }, [state]);

//     const checkUser = async () => {
//         try {
//           const response = await API.get("/check-auth");
    
//           if (response.status === 404) {
//             return dispatch({
//               type: "AUTH_ERROR",
//             });
//           }
    
//           let payload = response.data.data.user;
//           payload.token = localStorage.token;

//           dispatch({
//             type: "USER_SUCCESS",
//             payload,
//           });

//         } catch (error) {
//           console.log(error);
//         }
//     };

//     useEffect(()=> {
//         checkUser();
//     }, []);

//     return (
//         <Router>
//             <Switch>
//                 <Route exact path="/">
//                     <LandingPage/>
//                 </Route>
//                 <Route exact path="/home">
//                     <Home/>
//                 </Route>
//                 <Route exact path="/profile">
//                     <Profile/>
//                 </Route>
//                 <Route exact path="/subscribe">
//                     <Subscribe/>
//                 </Route>
//                 <Route exact path="/detail-book/:bookID">
//                     <DetailBook/>
//                 </Route>
//                 <Route exact path="/read-book">
//                     <ReadBook/>
//                 </Route>
//                 <Route exact path="/admin">
//                     <Admin/>
//                 </Route>
//                 <Route exact path="/add-book">
//                     <AddBook/>
//                 </Route>
//                 <Route exact path="*">
//                     <NotFound/>
//                 </Route>
//             </Switch>
//         </Router>
//     )
// }

// export default Routes;
