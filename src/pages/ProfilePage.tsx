import { motion } from "framer-motion";
import { User, Droplets, AlertCircle, Phone, MapPin, History, Shield } from "lucide-react";
import { defaultProfile } from "@/data/mockData";

const ProfilePage = () => {
  const p = defaultProfile;

  return (
    <div className="container mx-auto px-4 py-8">
      <div className="mb-8">
        <h1 className="font-display text-3xl font-bold text-foreground">Profile</h1>
        <p className="text-muted-foreground">Your medical info & emergency contacts</p>
      </div>

      <div className="mx-auto grid max-w-3xl gap-6 sm:grid-cols-2">
        <motion.div initial={{ opacity: 0, y: 20 }} animate={{ opacity: 1, y: 0 }} className="rounded-2xl border border-border bg-card p-6 sm:col-span-2">
          <div className="flex items-center gap-4">
            <div className="flex h-16 w-16 items-center justify-center rounded-2xl bg-emergency/10">
              <User className="h-8 w-8 text-emergency" />
            </div>
            <div>
              <h2 className="font-display text-2xl font-bold text-foreground">{p.name}</h2>
              <p className="text-sm text-muted-foreground">{p.age} years • {p.bloodGroup} • {p.phone}</p>
            </div>
          </div>
        </motion.div>

        <InfoCard icon={Droplets} title="Blood Group" items={[p.bloodGroup]} delay={0.1} />
        <InfoCard icon={AlertCircle} title="Allergies" items={p.allergies} delay={0.15} />
        <InfoCard icon={History} title="Medical History" items={p.medicalHistory} delay={0.2} />
        <InfoCard icon={MapPin} title="Address" items={[p.address]} delay={0.25} />

        <motion.div
          initial={{ opacity: 0, y: 20 }}
          animate={{ opacity: 1, y: 0 }}
          transition={{ delay: 0.3 }}
          className="rounded-2xl border border-border bg-card p-6 sm:col-span-2"
        >
          <div className="mb-4 flex items-center gap-2">
            <Shield className="h-5 w-5 text-emergency" />
            <h3 className="font-display text-lg font-semibold text-foreground">Emergency Contacts</h3>
          </div>
          <div className="grid gap-3 sm:grid-cols-2">
            {p.emergencyContacts.map((c) => (
              <div key={c.phone} className="flex items-center gap-3 rounded-xl border border-border bg-muted/50 p-4">
                <Phone className="h-4 w-4 text-emergency" />
                <div>
                  <p className="text-sm font-medium text-foreground">{c.name}</p>
                  <p className="text-xs text-muted-foreground">{c.relation} • {c.phone}</p>
                </div>
              </div>
            ))}
          </div>
        </motion.div>
      </div>
    </div>
  );
};

const InfoCard = ({ icon: Icon, title, items, delay }: { icon: any; title: string; items: string[]; delay: number }) => (
  <motion.div initial={{ opacity: 0, y: 20 }} animate={{ opacity: 1, y: 0 }} transition={{ delay }} className="rounded-2xl border border-border bg-card p-6">
    <div className="mb-3 flex items-center gap-2">
      <Icon className="h-5 w-5 text-emergency" />
      <h3 className="font-display text-lg font-semibold text-foreground">{title}</h3>
    </div>
    <div className="flex flex-col gap-1.5">
      {items.map((item) => (
        <span key={item} className="text-sm text-muted-foreground">{item}</span>
      ))}
    </div>
  </motion.div>
);

export default ProfilePage;
