import { Redirect, Route, Router as WouterRouter, Switch } from "wouter";
import ApprovedCompanySite from "./pages/ApprovedCompanySite";
import ProjectStart from "./pages/ProjectStart";
import UnifiedProjectConfigurator from "./pages/UnifiedProjectConfigurator";
import FahrtDocPage from "./pages/FahrtDocPage";
import FahrtDocSupportPage from "./pages/FahrtDocSupport";
import FahrtDocNutzungsbedingungenPage from "./pages/FahrtDocNutzungsbedingungen";
import FahrtDocKontoLoeschenPage from "./pages/FahrtDocKontoLoeschen";
import FahrtDocDatenschutzPage from "./pages/FahrtDocDatenschutz";
import ImpressumPage from "./pages/impressum";
import DatenschutzPage from "./pages/datenschutz";
import "./pages/project.css";
import "./pages/company.css";

const basePath = import.meta.env.BASE_URL.replace(/\/$/, "");

function Routes() {
  return (
    <Switch>
      <Route path="/"><Redirect to="/de" /></Route>
      <Route path="/de"><ApprovedCompanySite kind="home" /></Route>
      <Route path="/en"><ApprovedCompanySite kind="home" /></Route>
      <Route path="/de/leistungen"><ApprovedCompanySite kind="services" /></Route>
      <Route path="/en/services"><ApprovedCompanySite kind="services" /></Route>
      <Route path="/de/leistungen/websites"><ApprovedCompanySite kind="websites" /></Route>
      <Route path="/en/services/websites"><ApprovedCompanySite kind="websites" /></Route>
      <Route path="/de/leistungen/mobile-apps"><ApprovedCompanySite kind="apps" /></Route>
      <Route path="/en/services/mobile-apps"><ApprovedCompanySite kind="apps" /></Route>
      <Route path="/de/leistungen/digitale-tools"><ApprovedCompanySite kind="tools" /></Route>
      <Route path="/en/services/digital-tools"><ApprovedCompanySite kind="tools" /></Route>
      <Route path="/de/arbeitsweise"><ApprovedCompanySite kind="process" /></Route>
      <Route path="/en/how-we-work"><ApprovedCompanySite kind="process" /></Route>
      <Route path="/de/produkte"><ApprovedCompanySite kind="products" /></Route>
      <Route path="/en/products"><ApprovedCompanySite kind="products" /></Route>
      <Route path="/de/projekt-starten" component={ProjectStart} />
      <Route path="/en/start-a-project" component={ProjectStart} />
      <Route path="/de/projekt-starten/website"><UnifiedProjectConfigurator type="website" /></Route>
      <Route path="/en/start-a-project/website"><UnifiedProjectConfigurator type="website" /></Route>
      <Route path="/de/projekt-starten/app"><UnifiedProjectConfigurator type="app" /></Route>
      <Route path="/en/start-a-project/app"><UnifiedProjectConfigurator type="app" /></Route>
      <Route path="/de/projekt-starten/ki-tool"><UnifiedProjectConfigurator type="ai" /></Route>
      <Route path="/en/start-a-project/ai-tool"><UnifiedProjectConfigurator type="ai" /></Route>
      <Route path="/de/produkte/fahrtdoc" component={FahrtDocPage} />
      <Route path="/en/products/fahrtdoc" component={FahrtDocPage} />
      <Route path="/products/fahrtdoc" component={FahrtDocPage} />
      <Route path="/products/fahrtdoc/datenschutz" component={FahrtDocDatenschutzPage} />
      <Route path="/products/fahrtdoc/support" component={FahrtDocSupportPage} />
      <Route path="/products/fahrtdoc/nutzungsbedingungen" component={FahrtDocNutzungsbedingungenPage} />
      <Route path="/products/fahrtdoc/konto-loeschen" component={FahrtDocKontoLoeschenPage} />
      <Route path="/impressum" component={ImpressumPage} />
      <Route path="/datenschutz" component={DatenschutzPage} />
      <Route><Redirect to="/de" /></Route>
    </Switch>
  );
}

export default function App() {
  return <WouterRouter base={basePath}><Routes /></WouterRouter>;
}
