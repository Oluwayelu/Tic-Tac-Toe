import { Suspense } from "react";
import { Switch, Route, BrowserRouter as Router } from "react-router-dom";
import { Play, Welcome, Test } from "pages";
import { PLAY, WELCOME } from "constants/routes";
import { Loader } from "components";
import PlayerProvider from "context/player";

import "./App.css";
import "./styles/global.css";

function App() {
  return (
    <div className="bg-primary">
      <PlayerProvider>
        <Router>
          <Suspense fallback={<Loader />}>
            <Switch>
              <Route exact path={WELCOME} component={Welcome} />
              <Route exact path={PLAY} component={Play} />

              <Route exact path="/test" component={Test} />
            </Switch>
          </Suspense>
        </Router>
      </PlayerProvider>
    </div>
  );
}

export default App;
