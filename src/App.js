// import DesignsContainer from "layouts/Designs";
// import HomeContainer from "layouts/Home";
import React, { Suspense } from "react";
import { BrowserRouter, Route, Switch } from "react-router-dom";
import "./styles/main.scss";
import FabricsContainer from "layouts/Fabrics";
import FabricDetailContainer from "layouts/FabricDetail";
import SelectionContainer from "layouts/Selection";

// Lazy load - Code splitting
const HomeContainer = React.lazy(() => import("layouts/Home"));
const DesignsContainer = React.lazy(() => import("layouts/Designs"));
const DesignerProfileContainer = React.lazy(() =>
    import("layouts/DesignerProfile")
);

function App() {
    return (
        <div className="app">
            <Suspense fallback={<div>Loading ...</div>}>
                <BrowserRouter>
                    <Switch>
                        <Route exact path="/" component={HomeContainer} />
                        <Route path="/designs" component={DesignsContainer} />
                        <Route
                            path="/designer-profile"
                            component={DesignerProfileContainer}
                        />
                        <Route
                            path="/fabrics"
                            component={FabricsContainer}
                        />
                        <Route
                            path="/fabric-detail"
                            component={FabricDetailContainer}
                        />
                        <Route
                            path="/selection"
                            component={SelectionContainer}
                        />
                        {/* <Route component={NotFound} /> */}
                    </Switch>
                </BrowserRouter>
            </Suspense>
        </div>
    );
}

export default App;
