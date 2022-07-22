import { Suspense, useEffect } from "react";
import { Switch, Route, BrowserRouter as Router } from "react-router-dom";
import { Play, Welcome, Test } from "pages";
import { PLAY, WELCOME } from "constants/routes";
import { Header, Loader, Particle } from "components";
import { PlayerProvider, GameProvider } from "context";

import "./App.css";
import "./styles/global.css";
import { SocketService } from "services";

function App() {
  const connectSocket = async () => {
    const url = process.env.REACT_APP_SERVER_URL || "http://localhost:9000";

    await SocketService.connect(url).catch((err) => {
      console.log("Error: ", err);
    });
  };

  useEffect(() => {
    connectSocket();
  }, []);

  return (
    <div>
      <Particle />
      <PlayerProvider>
        <GameProvider>
          <div className="max-w-2xl mx-auto">
            <Router>
              <Header />
              <Suspense fallback={<Loader />}>
                <Switch>
                  <Route exact path={WELCOME} component={Welcome} />
                  <Route exact path={PLAY} component={Play} />

                  <Route exact path="/test" component={Test} />
                </Switch>
              </Suspense>
            </Router>
          </div>
        </GameProvider>
      </PlayerProvider>
    </div>
  );
}

export default App;


