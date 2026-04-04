import { useState, useMemo } from "react";
import { motion } from "framer-motion";
import { Search, Bed, Wind, Heart, MapPin, Star, Phone, Filter } from "lucide-react";
import { mockHospitals } from "@/data/mockData";

const HospitalsPage = () => {
  const [search, setSearch] = useState("");
  const [sortBy, setSortBy] = useState<"distance" | "rating" | "beds">("distance");
  const [showAvailableOnly, setShowAvailableOnly] = useState(false);

  const filtered = useMemo(() => {
    let list = mockHospitals.filter((h) =>
      h.name.toLowerCase().includes(search.toLowerCase()) ||
      h.specialties.some((s) => s.toLowerCase().includes(search.toLowerCase()))
    );
    if (showAvailableOnly) list = list.filter((h) => h.beds.available > 0 && h.icu.available > 0);
    list.sort((a, b) => {
      if (sortBy === "distance") return a.distance - b.distance;
      if (sortBy === "rating") return b.rating - a.rating;
      return b.beds.available - a.beds.available;
    });
    return list;
  }, [search, sortBy, showAvailableOnly]);

  return (
    <div className="container mx-auto px-4 py-8">
      <div className="mb-8">
        <h1 className="font-display text-3xl font-bold text-foreground">Nearby Hospitals</h1>
        <p className="text-muted-foreground">Real-time availability of beds, oxygen & ICU</p>
      </div>

      <div className="mb-6 flex flex-col gap-4 sm:flex-row sm:items-center">
        <div className="relative flex-1">
          <Search className="absolute left-3 top-1/2 h-4 w-4 -translate-y-1/2 text-muted-foreground" />
          <input
            value={search}
            onChange={(e) => setSearch(e.target.value)}
            placeholder="Search hospitals or specialties..."
            className="w-full rounded-xl border border-border bg-card py-3 pl-10 pr-4 text-sm text-foreground placeholder:text-muted-foreground focus:outline-none focus:ring-2 focus:ring-ring"
          />
        </div>
        <div className="flex gap-2">
          <select
            value={sortBy}
            onChange={(e) => setSortBy(e.target.value as any)}
            className="rounded-xl border border-border bg-card px-4 py-3 text-sm text-foreground focus:outline-none focus:ring-2 focus:ring-ring"
          >
            <option value="distance">Nearest</option>
            <option value="rating">Top Rated</option>
            <option value="beds">Most Beds</option>
          </select>
          <button
            onClick={() => setShowAvailableOnly(!showAvailableOnly)}
            className={`flex items-center gap-2 rounded-xl border px-4 py-3 text-sm font-medium transition-colors ${
              showAvailableOnly
                ? "border-emergency bg-emergency/10 text-emergency"
                : "border-border bg-card text-muted-foreground hover:bg-secondary"
            }`}
          >
            <Filter className="h-4 w-4" />
            Available
          </button>
        </div>
      </div>

      <div className="grid gap-4 sm:grid-cols-2 lg:grid-cols-3">
        {filtered.map((hospital, i) => (
          <motion.div
            key={hospital.id}
            initial={{ opacity: 0, y: 20 }}
            animate={{ opacity: 1, y: 0 }}
            transition={{ delay: i * 0.05 }}
            className="rounded-2xl border border-border bg-card p-5 transition-shadow hover:shadow-lg"
          >
            <div className="mb-3 flex items-start justify-between">
              <h3 className="font-display text-lg font-semibold text-foreground">{hospital.name}</h3>
              <span className="flex items-center gap-1 rounded-lg bg-warning/10 px-2 py-1 text-xs font-medium text-warning">
                <Star className="h-3 w-3" /> {hospital.rating}
              </span>
            </div>

            <div className="mb-4 flex items-center gap-1 text-sm text-muted-foreground">
              <MapPin className="h-3.5 w-3.5" /> {hospital.distance} km — {hospital.address}
            </div>

            <div className="mb-4 grid grid-cols-3 gap-2">
              <Stat icon={Bed} label="Beds" available={hospital.beds.available} total={hospital.beds.total} />
              <Stat icon={Wind} label="O₂" available={hospital.oxygen.available} total={hospital.oxygen.total} />
              <Stat icon={Heart} label="ICU" available={hospital.icu.available} total={hospital.icu.total} />
            </div>

            <div className="mb-4 flex flex-wrap gap-1">
              {hospital.specialties.map((s) => (
                <span key={s} className="rounded-md bg-secondary px-2 py-0.5 text-xs font-medium text-secondary-foreground">
                  {s}
                </span>
              ))}
            </div>

            <a
              href={`tel:${hospital.phone}`}
              className="flex w-full items-center justify-center gap-2 rounded-xl emergency-gradient py-2.5 text-sm font-medium text-emergency-foreground transition-opacity hover:opacity-90"
            >
              <Phone className="h-4 w-4" /> Call Now
            </a>
          </motion.div>
        ))}
      </div>
    </div>
  );
};

const Stat = ({ icon: Icon, label, available, total }: { icon: any; label: string; available: number; total: number }) => {
  const pct = (available / total) * 100;
  const color = pct > 30 ? "text-success" : pct > 10 ? "text-warning" : "text-emergency";
  return (
    <div className="rounded-xl border border-border bg-muted/50 p-2 text-center">
      <Icon className={`mx-auto mb-1 h-4 w-4 ${color}`} />
      <p className={`text-lg font-bold ${color}`}>{available}</p>
      <p className="text-[10px] text-muted-foreground">{label} / {total}</p>
    </div>
  );
};

export default HospitalsPage;
