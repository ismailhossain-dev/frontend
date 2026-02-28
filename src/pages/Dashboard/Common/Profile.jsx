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
    <div className="min-h-screen bg-slate-50/50 p-4 md:p-10 flex justify-center">
      <div className="max-w-6xl w-full">
        <div className="bg-white shadow-xl shadow-slate-200/50 rounded-[2rem] overflow-hidden border border-slate-100 flex flex-col md:row-reverse lg:flex-row">
          {/* Left Side: Avatar & Basic Info */}
          <div className="md:w-1/3 bg-slate-900 p-8 flex flex-col items-center text-center justify-center relative overflow-hidden">
            <div className="absolute top-0 left-0 w-full h-full opacity-10 pointer-events-none">
              <div className="absolute -top-10 -left-10 w-40 h-40 bg-indigo-500 rounded-full blur-3xl"></div>
              <div className="absolute -bottom-10 -right-10 w-40 h-40 bg-purple-500 rounded-full blur-3xl"></div>
            </div>

            <div className="relative group z-10">
              <img
                alt="profile"
                src={user?.photoURL}
                className="mx-auto object-cover rounded-[2.5rem] h-44 w-44 border-4 border-slate-800 shadow-2xl transition-transform duration-500 group-hover:scale-105"
              />
              <div className="absolute -bottom-2 -right-2 h-8 w-8 bg-emerald-500 border-4 border-slate-900 rounded-full shadow-lg"></div>
            </div>

            <div className="mt-6 z-10">
              <h2 className="text-2xl font-black text-white tracking-tight leading-tight">
                {user?.displayName}
              </h2>
              <div className="inline-flex items-center gap-2 mt-3 px-4 py-1.5 bg-indigo-500/20 rounded-full border border-indigo-500/30">
                <ShieldCheck size={14} className="text-indigo-400" />
                <span className="text-xs font-bold uppercase tracking-widest text-indigo-300">
                  {role}
                </span>
              </div>
            </div>

            {/* Toggle Button */}
            <div className="mt-8 w-full z-10">
              <button
                onClick={() => setUpdate(!update)}
                className={`flex items-center justify-center gap-2 w-full transition-all font-bold py-4 rounded-2xl shadow-lg active:scale-95 mb-5 ${
                  update
                    ? "bg-rose-500 hover:bg-rose-600 text-white"
                    : "bg-indigo-600 hover:bg-indigo-700 text-white"
                }`}
              >
                {update ? <X size={18} /> : <Edit3 size={18} />}
                {update ? "Cancel Editing" : "Edit Profile"}
              </button>
            </div>
          </div>

          {/* Right Side: Detailed Info & Update Form */}
          <div className="md:w-2/3 p-8 md:p-12 relative">
            {update ? (
              <div className="animate-in fade-in zoom-in duration-300">
                <UpdateFrom setUpdate={setUpdate} />
              </div>
            ) : (
              <div className="animate-in slide-in-from-right-5 duration-500">
                <div className="flex justify-between items-center mb-10">
                  <h3 className="text-xl font-bold text-slate-800 flex items-center gap-2">
                    Profile Information
                    <span className="h-1.5 w-1.5 rounded-full bg-indigo-500"></span>
                  </h3>
                </div>

                <div className="grid grid-cols-1 sm:grid-cols-2 gap-6">
                  <InfoCard
                    label="Full Name"
                    value={user?.displayName || "N/A"}
                    icon={<Edit3 size={18} />}
                    color="text-amber-500 bg-amber-50"
                  />
                  <InfoCard
                    label="Email Address"
                    value={user?.email}
                    icon={<Mail size={18} />}
                    color="text-blue-500 bg-blue-50"
                  />
                  <InfoCard
                    label="Identity ID"
                    value={user?.uid?.slice(0, 15) + "..."}
                    icon={<Fingerprint size={18} />}
                    color="text-purple-500 bg-purple-50"
                  />
                  <InfoCard
                    label="Location"
                    value="Not Set"
                    icon={<MapPin size={18} />}
                    color="text-rose-500 bg-rose-50"
                  />
                </div>

                <div className="mt-12">
                  <h4 className="text-sm font-bold text-slate-400 uppercase tracking-[0.2em] mb-6">
                    User Activity
                  </h4>
                  <div className="grid grid-cols-3 gap-4">
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

const InfoCard = ({ label, value, icon, color }) => (
  <div className="group p-5 rounded-[1.5rem] bg-white border border-slate-100 shadow-sm hover:shadow-md transition-all">
    <div className="flex items-center gap-4">
      <div className={`p-3 rounded-xl ${color}`}>{icon}</div>
      <div className="overflow-hidden">
        <p className="text-[10px] uppercase font-bold text-slate-400 mb-0.5">{label}</p>
        <p className="text-sm font-bold text-slate-700 truncate">{value}</p>
      </div>
    </div>
  </div>
);

const StatCard = ({ count, label }) => (
  <div className="p-6 bg-slate-50 rounded-3xl border border-slate-100 text-center hover:bg-indigo-50 transition-colors">
    <p className="text-2xl font-black text-slate-800">{count}</p>
    <p className="text-[10px] font-bold text-slate-400 uppercase mt-1">{label}</p>
  </div>
);

export default Profile;
