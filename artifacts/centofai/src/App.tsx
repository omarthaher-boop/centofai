import { Redirect, Route, Router as WouterRouter, Switch } from "wouter";
import CompanySite from "./pages/CompanySite";
import ProjectStart from "./pages/ProjectStart";
import WebsiteProjectWizard from "./pages/WebsiteProjectWizard";
import MobileAppProjectWizard from "./pages/MobileAppProjectWizard";
import AIToolProjectWizard from "./pages/AIToolProjectWizard";
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

      <Route path="/de"><CompanySite kind="home" /></Route>
      <Route path="/en"><CompanySite kind="home" /></Route>

      <Route path="/de/leistungen"><CompanySite kind="services" /></Route>
      <Route path="/en/services"><CompanySite kind="services" /></Route>
      <Route path="/de/leistungen/websites"><CompanySite kind="websites" /></Route>
      <Route path="/en/services/websites"><CompanySite kind="websites" /></Route>
      <Route path="/de/leistungen/mobile-apps"><CompanySite kind="apps" /></Route>
      <Route path="/en/services/mobile-apps"><CompanySite kind="apps" /></Route>
      <Route path="/de/leistungen/digitale-tools"><CompanySite kind="tools" /></Route>
      <Route path="/en/services/digital-tools"><CompanySite kind="tools" /></Route>

      <Route path="/de/arbeitsweise"><CompanySite kind="process" /></Route>
      <Route path="/en/how-we-work"><CompanySite kind="process" /></Route>
      <Route path="/de/produkte"><CompanySite kind="products" /></Route>
      <Route path="/en/products"><CompanySite kind="products" /></Route>

      <Route path="/de/projekt-starten" component={ProjectStart} />
      <Route path="/en/start-a-project" component={ProjectStart} />
      <Route path="/de/projekt-starten/website" component={WebsiteProjectWizard} />
      <Route path="/en/start-a-project/website" component={WebsiteProjectWizard} />
      <Route path="/de/projekt-starten/app" component={MobileAppProjectWizard} />
      <Route path="/en/start-a-project/app" component={MobileAppProjectWizard} />
      <Route path="/de/projekt-starten/ki-tool" component={AIToolProjectWizard} />
      <Route path="/en/start-a-project/ai-tool" component={AIToolProjectWizard} />

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
