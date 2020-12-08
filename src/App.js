import React from "react";
import {BrowserRouter, Route, Switch} from "react-router-dom";

import Admin from "./pages/admin/admin";
import Login from "./pages/login/login";


function App() {
    return (
        <BrowserRouter>
            <Switch>
                <Route path='/login' component={Login}/>
                <Route path='/' component={Admin} />
            </Switch>
        </BrowserRouter>
    );
}

export default App;
