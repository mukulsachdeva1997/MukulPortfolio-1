import { Switch, Route, Router as WouterRouter } from "wouter";
import { useHashLocation } from "wouter/use-hash-location";
import { queryClient } from "./lib/queryClient";
import { QueryClientProvider } from "@tanstack/react-query";
import { Toaster } from "@/components/ui/toaster";
import { TooltipProvider } from "@/components/ui/tooltip";
import { ThemeProvider } from "@/components/theme-provider";
import { CommandPalette } from "@/components/command-palette";
import { AskMukul } from "@/components/ask-mukul";
import Home from "@/pages/home";
import NotFound from "@/pages/not-found";

function AppRoutes() {
  return (
    <Switch>
      <Route path="/" component={Home} />
      <Route component={NotFound} />
    </Switch>
  );
}

function App() {
  return (
    <QueryClientProvider client={queryClient}>
      <WouterRouter hook={useHashLocation}>
        <ThemeProvider>
          <TooltipProvider>
            <Toaster />
            <CommandPalette />
            <AskMukul />
            <AppRoutes />
          </TooltipProvider>
        </ThemeProvider>
      </WouterRouter>
    </QueryClientProvider>
  );
}

export default App;