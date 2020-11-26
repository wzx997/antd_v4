import React from "react";
import {BrowserRouter, Route, Switch} from "react-router-dom";
import {Row} from "antd";

import Admin from "./pages/admin/admin";


function App() {
    return (
        <BrowserRouter>
            <Row/>
            <Switch>
                <Route path='/' component={Admin} />
            </Switch>
        </BrowserRouter>
    );
}

export default App;
