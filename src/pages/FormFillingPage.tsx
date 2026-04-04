import { useState } from "react";
import { motion } from "framer-motion";
import { FileText, CheckCircle, Copy, User, Droplets, AlertCircle, History } from "lucide-react";
import { defaultProfile } from "@/data/mockData";
import { useToast } from "@/hooks/use-toast";

const FormFillingPage = () => {
  const [filled, setFilled] = useState(false);
  const { toast } = useToast();
  const profile = defaultProfile;

  const fields = [
    { label: "Full Name", value: profile.name, icon: User },
    { label: "Age", value: `${profile.age} years`, icon: User },
    { label: "Blood Group", value: profile.bloodGroup, icon: Droplets },
    { label: "Allergies", value: profile.allergies.join(", "), icon: AlertCircle },
    { label: "Phone", value: profile.phone, icon: User },
    { label: "Address", value: profile.address, icon: User },
  ];

  const handleAutoFill = () => {
    setFilled(true);
    toast({ title: "Form Auto-Filled", description: "Hospital admission form populated with your saved data." });
  };

  return (
    <div className="container mx-auto px-4 py-8">
      <div className="mb-8">
        <h1 className="font-display text-3xl font-bold text-foreground">Form Filling</h1>
        <p className="text-muted-foreground">One-click auto-fill for hospital admission</p>
      </div>

      <div className="mx-auto max-w-2xl">
        {!filled ? (
          <motion.div initial={{ opacity: 0, y: 20 }} animate={{ opacity: 1, y: 0 }} className="flex flex-col items-center gap-6 rounded-2xl border border-border bg-card p-8 text-center">
            <div className="flex h-16 w-16 items-center justify-center rounded-2xl bg-emergency/10">
              <FileText className="h-8 w-8 text-emergency" />
            </div>
            <div>
              <h2 className="font-display text-xl font-semibold text-foreground">Hospital Admission Form</h2>
              <p className="mt-1 text-sm text-muted-foreground">Auto-fill with your saved medical data</p>
            </div>
            <motion.button
              whileHover={{ scale: 1.02 }}
              whileTap={{ scale: 0.98 }}
              onClick={handleAutoFill}
              className="flex items-center gap-2 rounded-xl emergency-gradient px-8 py-3 text-sm font-medium text-emergency-foreground"
            >
              <Copy className="h-4 w-4" /> Auto-Fill Form
            </motion.button>
          </motion.div>
        ) : (
          <motion.div initial={{ opacity: 0 }} animate={{ opacity: 1 }} className="flex flex-col gap-4">
            <div className="flex items-center gap-2 rounded-xl border border-success/20 bg-success/5 p-4">
              <CheckCircle className="h-5 w-5 text-success" />
              <span className="text-sm font-medium text-foreground">Form auto-filled successfully</span>
            </div>

            <div className="rounded-2xl border border-border bg-card p-6">
              <h3 className="mb-4 font-display text-lg font-semibold text-foreground">Patient Information</h3>
              <div className="grid gap-4 sm:grid-cols-2">
                {fields.map(({ label, value, icon: Icon }) => (
                  <div key={label} className="rounded-xl border border-border bg-muted/50 p-3">
                    <div className="mb-1 flex items-center gap-1.5 text-xs text-muted-foreground">
                      <Icon className="h-3 w-3" /> {label}
                    </div>
                    <p className="text-sm font-medium text-foreground">{value}</p>
                  </div>
                ))}
              </div>
            </div>

            <div className="rounded-2xl border border-border bg-card p-6">
              <div className="mb-3 flex items-center gap-2">
                <History className="h-4 w-4 text-muted-foreground" />
                <h3 className="font-display text-lg font-semibold text-foreground">Medical History</h3>
              </div>
              <div className="flex flex-col gap-2">
                {profile.medicalHistory.map((item) => (
                  <div key={item} className="rounded-lg border border-border bg-muted/50 px-3 py-2 text-sm text-foreground">
                    {item}
                  </div>
                ))}
              </div>
            </div>

            <button
              onClick={() => setFilled(false)}
              className="rounded-xl border border-border bg-card px-6 py-3 text-sm font-medium text-foreground transition-colors hover:bg-secondary"
            >
              Reset Form
            </button>
          </motion.div>
        )}
      </div>
    </div>
  );
};

export default FormFillingPage;
