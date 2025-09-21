import "./index.css"
import "@/features/gmodbackwardsapi/gamemodes";
import "@/features/gmodbackwardsapi/maps";
import { Route, Router } from "@solidjs/router";
import { render } from "solid-js/web"

// Pages
import { HomePage } from "@/pages/Home";
import { NewGamePage } from "@/pages/NewGame";
import { ServerlistPage } from "@/pages/Serverlist";
import { BackgroundOverlay } from "@/shared/ui/BackgroundOverlay";
import { runLua } from "@/features/lua";

runLua("UpdateMapList()");

function AppRouter() {
  return (
    <div class="relative w-full h-full overflow-hidden p-15">
      <BackgroundOverlay />
      <Router>
        <Route path="/" component={HomePage} />
        <Route path="/newgame" component={NewGamePage} />
        <Route path="/servers" component={ServerlistPage} />
      </Router>
    </div>
  )
}

render(() => <AppRouter />, document.getElementById('root')!)