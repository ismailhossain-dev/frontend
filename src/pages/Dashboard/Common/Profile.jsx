import { useState } from "react";
import LoadingSpinner from "../../../components/Shared/LoadingSpinner";
import useAuth from "../../../hooks/useAuth";
import useRole from "../../../hooks/useRole";
import { Edit3, Mail, Fingerprint, ShieldCheck, MapPin, X } from "lucide-react";
import UpdateFrom from "../../../components/UpdateFrom";

const Profile = () => {
  const { user } = useAuth();
  const [role, isRoleLoading] = useRole();
  const [update, setUpdate] = useState(false);

  if (isRoleLoading) return <LoadingSpinner />;

  return (
    <div className="min-h-screen bg-slate-950 text-slate-100 p-4 md:p-8 lg:p-12 flex justify-center items-start mt-4">
      <div className="max-w-5xl w-full">
        {/* Main Card Container */}
        <div className="bg-slate-900/60 border border-slate-800/80 backdrop-blur-xl shadow-2xl rounded-3xl overflow-hidden flex flex-col md:flex-row">
          
          {/* ─── LEFT SIDE: AVATAR & QUICK ACTIONS ─── */}
          <div className="md:w-5/12 bg-slate-900/90 p-8 flex flex-col items-center text-center justify-center relative overflow-hidden border-r border-slate-800/80">
            {/* Background Glows */}
            <div className="absolute top-0 left-0 w-full h-full opacity-20 pointer-events-none">
              <div className="absolute -top-12 -left-12 w-48 h-48 bg-emerald-500/30 rounded-full blur-3xl"></div>
              <div className="absolute -bottom-12 -right-12 w-48 h-48 bg-teal-500/20 rounded-full blur-3xl"></div>
            </div>

            {/* Avatar Section */}
            <div className="relative group z-10">
              <img
                alt="profile"
                src={user?.photoURL || "https://i.ibb.co/mR4qB8S/avatar.png"}
                className="mx-auto object-cover rounded-2xl h-40 w-40 border-2 border-emerald-500/40 shadow-2xl group-hover:scale-105 transition-transform duration-300"
              />
              <span className="absolute -bottom-2 -right-2 h-5 w-5 bg-emerald-500 border-4 border-slate-900 rounded-full shadow-md"></span>
            </div>

            {/* Basic Info */}
            <div className="mt-6 z-10 w-full px-2">
              <h2 className="text-2xl font-black text-white tracking-tight truncate">
                {user?.displayName || "User Name"}
              </h2>
              
              <div className="inline-flex items-center gap-2 mt-3 px-4 py-1.5 bg-emerald-500/10 rounded-full border border-emerald-500/20">
                <ShieldCheck size={14} className="text-emerald-400" />
                <span className="text-xs font-bold uppercase tracking-widest text-emerald-400">
                  {role || "Member"}
                </span>
              </div>
            </div>

            {/* Toggle Edit Button */}
            <div className="mt-8 w-full z-10">
              <button
                onClick={() => setUpdate(!update)}
                className={`flex items-center justify-center gap-2 w-full transition-all duration-200 font-bold py-3.5 px-6 rounded-2xl shadow-lg active:scale-95 ${
                  update
                    ? "bg-rose-500/20 hover:bg-rose-500/30 text-rose-400 border border-rose-500/30"
                    : "bg-emerald-500 hover:bg-emerald-400 text-slate-950 font-black shadow-emerald-500/10"
                }`}
              >
                {update ? <X size={18} /> : <Edit3 size={18} />}
                {update ? "Cancel Editing" : "Edit Profile"}
              </button>
            </div>
          </div>

          {/* ─── RIGHT SIDE: DETAILS & FORM ─── */}
          <div className="md:w-7/12 p-8 md:p-10 relative flex flex-col justify-between">
            {update ? (
              <div className="animate-in fade-in duration-300">
                <UpdateFrom setUpdate={setUpdate} />
              </div>
            ) : (
              <div className="animate-in fade-in duration-300 space-y-8">
                {/* Header */}
                <div className="flex items-center justify-between border-b border-slate-800/80 pb-4">
                  <h3 className="text-xl font-bold text-white tracking-tight flex items-center gap-2">
                    Profile Details
                  </h3>
                  <span className="text-xs text-slate-500 uppercase font-bold tracking-wider">
                    Account Overview
                  </span>
                </div>

                {/* Info Grid */}
                <div className="grid grid-cols-1 sm:grid-cols-2 gap-4">
                  <InfoCard
                    label="Full Name"
                    value={user?.displayName || "N/A"}
                    icon={<Edit3 size={18} />}
                  />
                  <InfoCard
                    label="Email Address"
                    value={user?.email || "N/A"}
                    icon={<Mail size={18} />}
                  />
                  <InfoCard
                    label="Identity ID"
                    value={user?.uid ? `${user.uid.slice(0, 12)}...` : "N/A"}
                    icon={<Fingerprint size={18} />}
                  />
                  <InfoCard
                    label="Location"
                    value="Not Set"
                    icon={<MapPin size={18} />}
                  />
                </div>

                {/* User Activity Stats */}
                <div className="pt-4">
                  <h4 className="text-xs font-bold text-slate-500 uppercase tracking-widest mb-4">
                    Overview Statistics
                  </h4>
                  <div className="grid grid-cols-3 gap-3">
                    <StatCard count="12" label="Orders" />
                    <StatCard count="4.8" label="Rating" />
                    <StatCard count="2.5k" label="Points" />
                  </div>
                </div>
              </div>
            )}
          </div>

        </div>
      </div>
    </div>
  );
};

/* Info Card Sub-component */
const InfoCard = ({ label, value, icon }) => (
  <div className="p-4 rounded-2xl bg-slate-950/40 border border-slate-800/80 hover:border-slate-700/80 transition-all">
    <div className="flex items-center gap-3.5">
      <div className="p-2.5 rounded-xl bg-slate-800/60 text-emerald-400 border border-slate-700/40">
        {icon}
      </div>
      <div className="overflow-hidden">
        <p className="text-[10px] uppercase font-bold text-slate-500">{label}</p>
        <p className="text-xs sm:text-sm font-semibold text-slate-200 truncate">{value}</p>
      </div>
    </div>
  </div>
);

/* Stat Card Sub-component */
const StatCard = ({ count, label }) => (
  <div className="p-4 bg-slate-950/40 rounded-2xl border border-slate-800/80 text-center hover:border-emerald-500/30 transition-all">
    <p className="text-xl font-extrabold text-white">{count}</p>
    <p className="text-[10px] font-bold text-slate-500 uppercase mt-0.5">{label}</p>
  </div>
);

export default Profile;