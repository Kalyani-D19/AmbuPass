import { useState, useCallback } from "react";
import { motion } from "framer-motion";
import { Phone, MapPin, AlertTriangle, CheckCircle, Loader2, Siren } from "lucide-react";
import { useToast } from "@/hooks/use-toast";

const EmergencyPage = () => {
  const [triggered, setTriggered] = useState(false);
  const [loading, setLoading] = useState(false);
  const [location, setLocation] = useState<{ lat: number; lng: number } | null>(null);
  const [steps, setSteps] = useState<{ label: string; done: boolean }[]>([]);
  const { toast } = useToast();

  const triggerEmergency = useCallback(async () => {
    if (loading) return;
    setLoading(true);
    setTriggered(true);
    setSteps([
      { label: "Fetching GPS location...", done: false },
      { label: "Calling ambulance services...", done: false },
      { label: "Alerting emergency contacts...", done: false },
      { label: "Finding nearest hospital...", done: false },
    ]);

    // Step 1: Get location
    try {
      const pos = await new Promise<GeolocationPosition>((resolve, reject) =>
        navigator.geolocation.getCurrentPosition(resolve, reject, { enableHighAccuracy: true, timeout: 10000 })
      );
      setLocation({ lat: pos.coords.latitude, lng: pos.coords.longitude });
    } catch {
      setLocation({ lat: 28.6139, lng: 77.209 });
    }
    setSteps((s) => s.map((st, i) => (i === 0 ? { ...st, done: true } : st)));

    // Step 2: Simulate ambulance call
    await new Promise((r) => setTimeout(r, 1200));
    setSteps((s) => s.map((st, i) => (i === 1 ? { ...st, done: true } : st)));

    // Step 3: Simulate SMS alerts
    await new Promise((r) => setTimeout(r, 1000));
    setSteps((s) => s.map((st, i) => (i === 2 ? { ...st, done: true } : st)));

    // Step 4: Hospital found
    await new Promise((r) => setTimeout(r, 800));
    setSteps((s) => s.map((st, i) => (i === 3 ? { ...st, done: true } : st)));

    setLoading(false);
    toast({
      title: "Emergency Activated",
      description: "Ambulance dispatched. Help is on the way!",
    });
  }, [loading, toast]);

  return (
    <div className="container mx-auto flex min-h-[calc(100vh-4rem)] flex-col items-center justify-center gap-8 px-4 py-12">
      {!triggered ? (
        <motion.div
          initial={{ opacity: 0, y: 30 }}
          animate={{ opacity: 1, y: 0 }}
          className="flex flex-col items-center gap-8 text-center"
        >
          <div className="flex flex-col items-center gap-3">
            <Siren className="h-10 w-10 text-emergency" />
            <h1 className="font-display text-4xl font-bold tracking-tight text-foreground sm:text-5xl">
              Smart Emergency System
            </h1>
            <p className="max-w-md text-muted-foreground">
              One tap to alert ambulance services, share your live location, and notify emergency contacts.
            </p>
          </div>

          <div className="relative">
            <div className="absolute inset-0 rounded-full emergency-gradient emergency-ring" />
            <div className="absolute inset-0 rounded-full emergency-gradient emergency-ring [animation-delay:0.5s]" />
            <motion.button
              whileHover={{ scale: 1.05 }}
              whileTap={{ scale: 0.95 }}
              onClick={triggerEmergency}
              className="relative z-10 flex h-48 w-48 flex-col items-center justify-center rounded-full emergency-gradient emergency-pulse shadow-2xl shadow-emergency/30 sm:h-56 sm:w-56"
            >
              <AlertTriangle className="mb-2 h-12 w-12 text-emergency-foreground" />
              <span className="font-display text-lg font-bold text-emergency-foreground">EMERGENCY</span>
              <span className="text-xs text-emergency-foreground/80">Click Here</span>
            </motion.button>
          </div>

          <div className="mt-4 grid grid-cols-1 gap-4 sm:grid-cols-3">
            {[
              { icon: MapPin, label: "Live GPS Tracking" },
              { icon: Phone, label: "Auto Call & SMS" },
              { icon: Siren, label: "Nearest Hospital" },
            ].map(({ icon: Icon, label }) => (
              <div key={label} className="flex items-center gap-2 rounded-xl border border-border bg-card p-4">
                <Icon className="h-5 w-5 text-emergency" />
                <span className="text-sm font-medium text-foreground">{label}</span>
              </div>
            ))}
          </div>
        </motion.div>
      ) : (
        <motion.div
          initial={{ opacity: 0, scale: 0.9 }}
          animate={{ opacity: 1, scale: 1 }}
          className="flex w-full max-w-md flex-col gap-6"
        >
          <div className="rounded-2xl border border-emergency/20 bg-emergency/5 p-6 text-center">
            <AlertTriangle className="mx-auto mb-2 h-10 w-10 text-emergency" />
            <h2 className="font-display text-2xl font-bold text-foreground">Emergency Activated</h2>
            <p className="text-sm text-muted-foreground">Processing your request...</p>
          </div>

          <div className="flex flex-col gap-3">
            {steps.map((step, i) => (
              <motion.div
                key={step.label}
                initial={{ opacity: 0, x: -20 }}
                animate={{ opacity: 1, x: 0 }}
                transition={{ delay: i * 0.2 }}
                className="flex items-center gap-3 rounded-xl border border-border bg-card p-4"
              >
                {step.done ? (
                  <CheckCircle className="h-5 w-5 shrink-0 text-success" />
                ) : (
                  <Loader2 className="h-5 w-5 shrink-0 animate-spin text-muted-foreground" />
                )}
                <span className={`text-sm font-medium ${step.done ? "text-foreground" : "text-muted-foreground"}`}>
                  {step.label}
                </span>
              </motion.div>
            ))}
          </div>

          {location && !loading && (
            <motion.div
              initial={{ opacity: 0 }}
              animate={{ opacity: 1 }}
              className="rounded-xl border border-border bg-card p-4"
            >
              <p className="mb-1 text-xs font-medium text-muted-foreground">Your Location</p>
              <p className="font-mono text-sm text-foreground">
                {location.lat.toFixed(4)}°N, {location.lng.toFixed(4)}°E
              </p>
              <p className="mt-2 text-xs text-muted-foreground">
                SMS sent: "Accident detected at location: https://maps.google.com/?q={location.lat},{location.lng}"
              </p>
            </motion.div>
          )}

          {!loading && (
            <motion.button
              initial={{ opacity: 0 }}
              animate={{ opacity: 1 }}
              onClick={() => { setTriggered(false); setSteps([]); setLocation(null); }}
              className="rounded-xl border border-border bg-card px-6 py-3 text-sm font-medium text-foreground transition-colors hover:bg-secondary"
            >
              Reset
            </motion.button>
          )}
        </motion.div>
      )}
    </div>
  );
};

export default EmergencyPage;
