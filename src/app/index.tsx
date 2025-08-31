import "./index.css"
import { Route, Router } from "@solidjs/router";
import { render } from "solid-js/web"

// Pages
import { HomePage } from "@/pages/Home";

function AppRouter() {
  return (
    <Router>
      <Route path="/" component={HomePage} />
      {/* <Route path="/about" component={AboutPage} /> */}
    </Router>
  )
}

render(() => <AppRouter />, document.getElementById('root')!)