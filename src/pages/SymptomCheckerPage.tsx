import { useState } from "react";
import { motion } from "framer-motion";
import { Search, Brain, AlertTriangle, MapPin, Star, Phone } from "lucide-react";
import { symptomMap, mockHospitals } from "@/data/mockData";

const urgencyColors: Record<string, string> = {
  low: "text-success bg-success/10 border-success/20",
  medium: "text-warning bg-warning/10 border-warning/20",
  high: "text-emergency bg-emergency/10 border-emergency/20",
  critical: "text-emergency bg-emergency/15 border-emergency/30",
};

const SymptomCheckerPage = () => {
  const [selected, setSelected] = useState("");
  const symptoms = Object.keys(symptomMap);

  const result = selected ? symptomMap[selected] : null;
  const suggestedHospitals = result
    ? mockHospitals
        .filter((h) => h.specialties.some((s) => s.toLowerCase().includes(result.specialty.toLowerCase())) || h.specialties.includes("Emergency"))
        .sort((a, b) => a.distance - b.distance)
        .slice(0, 3)
    : [];

  return (
    <div className="container mx-auto px-4 py-8">
      <div className="mb-8">
        <h1 className="font-display text-3xl font-bold text-foreground">Smart Hospital Suggestion</h1>
        <p className="text-muted-foreground">Select your symptoms to find the best hospital</p>
      </div>

      <div className="mx-auto max-w-2xl">
        <div className="mb-6 flex items-center gap-2 rounded-2xl border border-border bg-card p-4">
          <Brain className="h-5 w-5 text-emergency" />
          <select
            value={selected}
            onChange={(e) => setSelected(e.target.value)}
            className="flex-1 bg-transparent text-sm text-foreground focus:outline-none"
          >
            <option value="">Select a symptom...</option>
            {symptoms.map((s) => (
              <option key={s} value={s}>{s}</option>
            ))}
          </select>
        </div>

        {result && (
          <motion.div initial={{ opacity: 0, y: 20 }} animate={{ opacity: 1, y: 0 }} className="flex flex-col gap-4">
            <div className={`flex items-center gap-3 rounded-xl border p-4 ${urgencyColors[result.urgency]}`}>
              <AlertTriangle className="h-5 w-5" />
              <div>
                <p className="text-sm font-semibold">Urgency: {result.urgency.toUpperCase()}</p>
                <p className="text-xs opacity-80">Recommended specialty: {result.specialty}</p>
              </div>
            </div>

            <h3 className="font-display text-lg font-semibold text-foreground">Suggested Hospitals</h3>

            {suggestedHospitals.map((h, i) => (
              <motion.div
                key={h.id}
                initial={{ opacity: 0, x: -20 }}
                animate={{ opacity: 1, x: 0 }}
                transition={{ delay: i * 0.1 }}
                className="rounded-2xl border border-border bg-card p-5"
              >
                <div className="mb-2 flex items-start justify-between">
                  <h4 className="font-display font-semibold text-foreground">{h.name}</h4>
                  <span className="flex items-center gap-1 text-xs text-warning">
                    <Star className="h-3 w-3" /> {h.rating}
                  </span>
                </div>
                <p className="mb-3 flex items-center gap-1 text-xs text-muted-foreground">
                  <MapPin className="h-3 w-3" /> {h.distance} km — {h.address}
                </p>
                <div className="flex items-center gap-3 text-xs text-muted-foreground">
                  <span>Beds: {h.beds.available}/{h.beds.total}</span>
                  <span>ICU: {h.icu.available}/{h.icu.total}</span>
                  <span>O₂: {h.oxygen.available}/{h.oxygen.total}</span>
                </div>
                <a
                  href={`tel:${h.phone}`}
                  className="mt-3 flex w-full items-center justify-center gap-2 rounded-xl emergency-gradient py-2 text-sm font-medium text-emergency-foreground"
                >
                  <Phone className="h-4 w-4" /> Call
                </a>
              </motion.div>
            ))}
          </motion.div>
        )}
      </div>
    </div>
  );
};

export default SymptomCheckerPage;
