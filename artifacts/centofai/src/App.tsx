import { useEffect, useRef } from "react";
import {
  ClerkProvider,
  SignIn,
  SignUp,
  Show,
  useClerk,
} from "@clerk/react";
import { publishableKeyFromHost } from "@clerk/react/internal";
import { shadcn } from "@clerk/themes";
import {
  Switch,
  Route,
  useLocation,
  Router as WouterRouter,
} from "wouter";
import {
  QueryClientProvider,
  useQueryClient,
} from "@tanstack/react-query";
import { queryClient } from "./lib/queryClient";
import Centofai from "./Centofai";
import ToolDetail from "./pages/ToolDetail";
import NotFound from "./pages/not-found";
import FavoritesPage from "./pages/favorites";
import SubmitToolPage from "./pages/submit-tool";
import AccountPage from "./pages/account";

const clerkPubKey = publishableKeyFromHost(
  window.location.hostname,
  import.meta.env.VITE_CLERK_PUBLISHABLE_KEY,
);

const clerkProxyUrl = import.meta.env.VITE_CLERK_PROXY_URL;

const basePath = import.meta.env.BASE_URL.replace(/\/$/, "");

function stripBase(path: string): string {
  return basePath && path.startsWith(basePath)
    ? path.slice(basePath.length) || "/"
    : path;
}

if (!clerkPubKey) {
  throw new Error("Missing VITE_CLERK_PUBLISHABLE_KEY in environment");
}

const clerkAppearance = {
  theme: shadcn,
  cssLayerName: "clerk",
  options: {
    logoPlacement: "inside" as const,
    logoLinkUrl: basePath || "/",
    logoImageUrl: `${window.location.origin}${basePath}/logo.svg`,
  },
  variables: {
    colorPrimary: "#9333EA",
    colorForeground: "#E2E8F0",
    colorMutedForeground: "#94A3B8",
    colorDanger: "#ef4444",
    colorBackground: "#0f172a",
    colorInput: "#020617",
    colorInputForeground: "#E2E8F0",
    colorNeutral: "#1E293B",
    fontFamily: "Inter, sans-serif",
    borderRadius: "0.75rem",
  },
  elements: {
    rootBox: "w-full flex justify-center",
    cardBox:
      "bg-[#0f172a] rounded-2xl w-[440px] max-w-full overflow-hidden border border-[#1E293B]",
    card: "!shadow-none !border-0 !bg-transparent !rounded-none",
    footer: "!shadow-none !border-0 !bg-transparent !rounded-none",
    headerTitle: "text-white",
    headerSubtitle: "text-slate-400",
    socialButtonsBlockButtonText: "text-slate-200",
    formFieldLabel: "text-slate-300",
    footerActionLink: "text-purple-400 hover:text-purple-300",
    footerActionText: "text-slate-400",
    dividerText: "text-slate-500",
    identityPreviewEditButton: "text-purple-400",
    formFieldSuccessText: "text-emerald-400",
    alertText: "text-red-300",
    logoBox: "py-4 flex justify-center",
    logoImage: "h-10 w-auto",
    socialButtonsBlockButton:
      "bg-[#020617] border border-[#1E293B] hover:bg-[#0f172a]",
    formButtonPrimary:
      "bg-purple-600 hover:bg-purple-700 text-white",
    formFieldInput:
      "bg-[#020617] border-[#1E293B] text-slate-200",
    footerAction: "border-t border-[#1E293B]",
    dividerLine: "bg-[#1E293B]",
    alert: "bg-red-500/10 border border-red-500/20",
    otpCodeFieldInput: "bg-[#020617] border-[#1E293B] text-slate-200",
    formFieldRow: "",
    main: "",
  },
};

function SignInPage() {
  return (
    <div className="flex min-h-[100dvh] items-center justify-center bg-[var(--bg-page)] px-4">
      <SignIn
        routing="path"
        path={`${basePath}/sign-in`}
        signUpUrl={`${basePath}/sign-up`}
      />
    </div>
  );
}

function SignUpPage() {
  return (
    <div className="flex min-h-[100dvh] items-center justify-center bg-[var(--bg-page)] px-4">
      <SignUp
        routing="path"
        path={`${basePath}/sign-up`}
        signInUrl={`${basePath}/sign-in`}
      />
    </div>
  );
}

function ClerkQueryClientCacheInvalidator() {
  const { addListener } = useClerk();
  const qc = useQueryClient();
  const prevUserIdRef = useRef<string | null | undefined>(undefined);

  useEffect(() => {
    const unsubscribe = addListener(({ user }) => {
      const userId = user?.id ?? null;
      if (
        prevUserIdRef.current !== undefined &&
        prevUserIdRef.current !== userId
      ) {
        qc.clear();
      }
      prevUserIdRef.current = userId;
    });
    return unsubscribe;
  }, [addListener, qc]);

  return null;
}

function ClerkProviderWithRoutes() {
  const [, setLocation] = useLocation();

  return (
    <ClerkProvider
      publishableKey={clerkPubKey}
      proxyUrl={clerkProxyUrl}
      appearance={clerkAppearance}
      signInUrl={`${basePath}/sign-in`}
      signUpUrl={`${basePath}/sign-up`}
      localization={{
        signIn: {
          start: {
            title: "Willkommen zurück",
            subtitle: "Melde dich an, um deine Favoriten zu sehen",
          },
        },
        signUp: {
          start: {
            title: "Konto erstellen",
            subtitle: "Speichere Favoriten und reiche Tools ein",
          },
        },
      }}
      routerPush={(to) => setLocation(stripBase(to))}
      routerReplace={(to) => setLocation(stripBase(to), { replace: true })}
    >
      <QueryClientProvider client={queryClient}>
        <ClerkQueryClientCacheInvalidator />
        <Switch>
          <Route path="/" component={Centofai} />
          <Route path="/tools/:slug" component={ToolDetail} />
          <Route path="/favorites">
            <Show when="signed-in">
              <FavoritesPage />
            </Show>
            <Show when="signed-out">
              <SignInPage />
            </Show>
          </Route>
          <Route path="/submit-tool">
            <Show when="signed-in">
              <SubmitToolPage />
            </Show>
            <Show when="signed-out">
              <SignInPage />
            </Show>
          </Route>
          <Route path="/account">
            <Show when="signed-in">
              <AccountPage />
            </Show>
            <Show when="signed-out">
              <SignInPage />
            </Show>
          </Route>
          <Route path="/sign-in/*?" component={SignInPage} />
          <Route path="/sign-up/*?" component={SignUpPage} />
          <Route component={NotFound} />
        </Switch>
      </QueryClientProvider>
    </ClerkProvider>
  );
}

export default function App() {
  return (
    <WouterRouter base={basePath}>
      <ClerkProviderWithRoutes />
    </WouterRouter>
  );
}
