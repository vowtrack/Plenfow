import { Switch, Route } from "wouter";
import { QueryClient, QueryClientProvider } from "@tanstack/react-query";
import { Toaster } from "sonner";

import { LandingPage } from "@/pages/landing";
import { LoginPage } from "@/pages/login";
import { RegisterPage } from "@/pages/register";
import { ForgotPasswordPage } from "@/pages/forgot-password";
import { OnboardingPage } from "@/pages/onboarding";
import NotFound from "@/pages/not-found";

const queryClient = new QueryClient();

function App() {
  return (
    <QueryClientProvider client={queryClient}>
      <Switch>
        <Route path="/" component={LandingPage} />
        <Route path="/login" component={LoginPage} />
        <Route path="/register" component={RegisterPage} />
        <Route path="/forgot-password" component={ForgotPasswordPage} />
        <Route path="/onboarding" component={OnboardingPage} />
        <Route component={NotFound} />
      </Switch>

      <Toaster
        theme="dark"
        toastOptions={{
          style: { background: "#111", border: "1px solid rgba(255,255,255,0.1)", color: "#fff" },
        }}
      />
    </QueryClientProvider>
  );
}

export default App;
