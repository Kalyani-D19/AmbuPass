import { QueryClient, QueryClientProvider } from "@tanstack/react-query";
import { BrowserRouter, Route, Routes } from "react-router-dom";
import { Toaster } from "@/components/ui/toaster";
import { TooltipProvider } from "@/components/ui/tooltip";
import Navbar from "@/components/Navbar";
import EmergencyPage from "@/pages/EmergencyPage";
import HospitalsPage from "@/pages/HospitalsPage";
import FormFillingPage from "@/pages/FormFillingPage";
import ProfilePage from "@/pages/ProfilePage";
import SymptomCheckerPage from "@/pages/SymptomCheckerPage";
import NotFound from "@/pages/NotFound";

const queryClient = new QueryClient();

const App = () => (
  <QueryClientProvider client={queryClient}>
    <TooltipProvider>
      <Toaster />
      <BrowserRouter>
        <Navbar />
        <Routes>
          <Route path="/" element={<EmergencyPage />} />
          <Route path="/hospitals" element={<HospitalsPage />} />
          <Route path="/form" element={<FormFillingPage />} />
          <Route path="/profile" element={<ProfilePage />} />
          <Route path="/symptoms" element={<SymptomCheckerPage />} />
          <Route path="*" element={<NotFound />} />
        </Routes>
      </BrowserRouter>
    </TooltipProvider>
  </QueryClientProvider>
);

export default App;
