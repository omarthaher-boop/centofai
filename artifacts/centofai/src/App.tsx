import { Route, Router, Switch } from "wouter";
import Centofai from "./Centofai";
import ToolDetail from "./pages/ToolDetail";
import NotFound from "./pages/not-found";

const rawBase = import.meta.env.BASE_URL ?? "/";
const base = rawBase === "/" ? "" : rawBase.replace(/\/$/, "");

export default function App() {
  return (
    <Router base={base}>
      <Switch>
        <Route path="/" component={Centofai} />
        <Route path="/tools/:slug" component={ToolDetail} />
        <Route component={NotFound} />
      </Switch>
    </Router>
  );
}
