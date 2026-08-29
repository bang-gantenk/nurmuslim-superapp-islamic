import React, { useState } from 'react';
import { 
  User, 
  Lock, 
  Mail, 
  Eye, 
  EyeOff, 
  ShieldCheck, 
  LogOut, 
  CheckCircle2, 
  MapPin, 
  Sparkles,
  BookOpen,
  Heart,
  X,
  UserCheck,
  Globe
} from 'lucide-react';
import { UserProfile, CityLocation } from '../types';
import { INDONESIAN_CITIES } from '../data/prayerCalculation';
import { OAuthLoginModal, OAuthProvider } from './OAuthLoginModal';
import { NurMuslimLogo } from './NurMuslimLogo';

interface AuthModalProps {
  isOpen: boolean;
  onClose: () => void;
  currentUser: UserProfile;
  setCurrentUser: (user: UserProfile) => void;
  selectedCity: CityLocation;
  setSelectedCity: (city: CityLocation) => void;
}

const AVATAR_OPTIONS = ['🧔', '🧕', '👨‍💼', '👩‍💼', '👳‍♂️', '🧑‍🎓', '🌿', '🕌', '⭐', '🕊️'];

export const AuthModal: React.FC<AuthModalProps> = ({
  isOpen,
  onClose,
  currentUser,
  setCurrentUser,
  selectedCity,
  setSelectedCity,
}) => {
  const [tab, setTab] = useState<'login' | 'register' | 'profile'>(
    currentUser.isLoggedIn ? 'profile' : 'login'
  );

  // Form states
  const [name, setName] = useState('');
  const [email, setEmail] = useState('');
  const [password, setPassword] = useState('');
  const [showPassword, setShowPassword] = useState(false);
  const [selectedAvatar, setSelectedAvatar] = useState('🧔');
  const [selectedCityId, setSelectedCityId] = useState(selectedCity.id);
  const [role, setRole] = useState<'Member' | 'Ustadz' | 'Pengurus Masjid'>('Member');
  const [errorMsg, setErrorMsg] = useState('');
  const [successMsg, setSuccessMsg] = useState('');

  // OAuth Modal states
  const [activeOAuthProvider, setActiveOAuthProvider] = useState<OAuthProvider | null>(null);

  if (!isOpen) return null;

  const handleLogin = (e: React.FormEvent) => {
    e.preventDefault();
    setErrorMsg('');

    if (!email || !password) {
      setErrorMsg('Harap isi alamat email dan kata sandi.');
      return;
    }

    // Process Login
    const nameDerived = email.split('@')[0];
    const formattedName = nameDerived.charAt(0).toUpperCase() + nameDerived.slice(1);

    const loggedUser: UserProfile = {
      id: `user-${Date.now()}`,
      name: formattedName || 'Hamba Allah',
      email: email,
      avatar: selectedAvatar,
      cityId: selectedCity.id,
      cityName: selectedCity.name,
      joinedDate: 'Agustus 2026',
      isLoggedIn: true,
      role: 'Member',
      authProvider: 'email',
    };

    setCurrentUser(loggedUser);
    localStorage.setItem('nurmuslim_user_profile', JSON.stringify(loggedUser));
    setSuccessMsg('Alhamdulillah, berhasil masuk ke akun!');
    setTimeout(() => {
      setSuccessMsg('');
      onClose();
    }, 1000);
  };

  const handleRegister = (e: React.FormEvent) => {
    e.preventDefault();
    setErrorMsg('');

    if (!name.trim() || !email.trim() || !password.trim()) {
      setErrorMsg('Harap lengkapi semua kolom pendaftaran.');
      return;
    }

    const targetCity = INDONESIAN_CITIES.find(c => c.id === selectedCityId) || selectedCity;
    setSelectedCity(targetCity);

    const newUser: UserProfile = {
      id: `user-${Date.now()}`,
      name: name.trim(),
      email: email.trim(),
      avatar: selectedAvatar,
      cityId: targetCity.id,
      cityName: targetCity.name,
      joinedDate: new Date().toLocaleDateString('id-ID', { month: 'long', year: 'numeric' }),
      isLoggedIn: true,
      role: role,
      authProvider: 'email',
    };

    setCurrentUser(newUser);
    localStorage.setItem('nurmuslim_user_profile', JSON.stringify(newUser));
    setSuccessMsg('Akun berhasil didaftarkan! Selamat datang di NurMuslim.');
    setTimeout(() => {
      setSuccessMsg('');
      onClose();
    }, 1200);
  };

  const handleQuickDemoLogin = (roleType: 'Member' | 'Ustadz') => {
    const demoUser: UserProfile = {
      id: roleType === 'Ustadz' ? 'ustadz-1' : 'user-demo-1',
      name: roleType === 'Ustadz' ? 'Ustadz Abdullah, Lc.' : 'Faris Al-Fatih',
      email: roleType === 'Ustadz' ? 'ustadz.abdullah@nurmuslim.id' : 'faris.alfatih@gmail.com',
      avatar: roleType === 'Ustadz' ? '👳‍♂️' : '🧔',
      cityId: selectedCity.id,
      cityName: selectedCity.name,
      joinedDate: 'Ramadhan 1447 H',
      isLoggedIn: true,
      role: roleType,
      authProvider: 'email',
    };

    setCurrentUser(demoUser);
    localStorage.setItem('nurmuslim_user_profile', JSON.stringify(demoUser));
    setSuccessMsg(`Masuk sebagai ${demoUser.name} (${demoUser.role})`);
    setTimeout(() => {
      setSuccessMsg('');
      onClose();
    }, 900);
  };

  const handleLogout = () => {
    const guestUser: UserProfile = {
      id: 'guest',
      name: 'Tamu',
      email: '',
      avatar: '🌿',
      cityId: selectedCity.id,
      cityName: selectedCity.name,
      joinedDate: '',
      isLoggedIn: false,
      role: 'Member',
    };
    setCurrentUser(guestUser);
    localStorage.removeItem('nurmuslim_user_profile');
    setTab('login');
  };

  const getProviderBadge = (provider?: string) => {
    switch (provider) {
      case 'google':
        return (
          <span className="px-2 py-0.5 rounded-full bg-blue-100 dark:bg-blue-950/80 text-blue-700 dark:text-blue-300 text-[10px] font-bold border border-blue-200 dark:border-blue-800 flex items-center gap-1">
            Google SSO
          </span>
        );
      case 'microsoft':
        return (
          <span className="px-2 py-0.5 rounded-full bg-cyan-100 dark:bg-cyan-950/80 text-cyan-700 dark:text-cyan-300 text-[10px] font-bold border border-cyan-200 dark:border-cyan-800 flex items-center gap-1">
            Azure AD
          </span>
        );
      case 'apple':
        return (
          <span className="px-2 py-0.5 rounded-full bg-stone-200 dark:bg-stone-800 text-stone-800 dark:text-stone-200 text-[10px] font-bold border border-stone-300 dark:border-stone-700 flex items-center gap-1">
            Apple ID
          </span>
        );
      default:
        return (
          <span className="px-2 py-0.5 rounded-full bg-emerald-100 dark:bg-emerald-950/80 text-emerald-700 dark:text-emerald-300 text-[10px] font-bold border border-emerald-200 dark:border-emerald-800 flex items-center gap-1">
            Email & Password
          </span>
        );
    }
  };

  return (
    <>
      <div className="fixed inset-0 z-50 bg-black/70 backdrop-blur-sm flex items-center justify-center p-4">
        <div 
          id="auth-modal-card"
          className="bg-white dark:bg-zinc-900 rounded-3xl max-w-md w-full p-6 sm:p-8 space-y-5 border border-stone-200 dark:border-zinc-800 shadow-2xl relative overflow-hidden animate-in fade-in zoom-in duration-200 text-stone-900 dark:text-zinc-100"
        >
          {/* Close Button */}
          <button
            onClick={onClose}
            className="absolute top-5 right-5 p-2 rounded-full text-stone-400 hover:text-stone-700 dark:hover:text-zinc-200 hover:bg-stone-100 dark:hover:bg-zinc-800 transition-colors"
            aria-label="Tutup"
          >
            <X className="w-5 h-5" />
          </button>

          {/* Header Branding with Transparent Logo Icon */}
          <div className="flex items-center gap-3">
            <div className="flex items-center justify-center shrink-0 drop-shadow-sm">
              <NurMuslimLogo size="sm" />
            </div>
            <div>
              <h3 className="font-extrabold text-lg sm:text-xl text-stone-900 dark:text-zinc-100">
                {currentUser.isLoggedIn ? 'Profil Akun Pengguna' : 'Akun NurMuslim'}
              </h3>
              <p className="text-xs text-stone-500 dark:text-zinc-400">
                {currentUser.isLoggedIn ? 'Kelola akun & preferensi ibadah' : 'Simpan tilawah, doa favorit & tanya jawab ustadz'}
              </p>
            </div>
          </div>

          {/* Success / Error Alerts */}
          {successMsg && (
            <div className="p-3 rounded-2xl bg-emerald-50 dark:bg-emerald-950/60 border border-emerald-300 dark:border-emerald-800 text-emerald-800 dark:text-emerald-200 text-xs font-semibold flex items-center gap-2">
              <CheckCircle2 className="w-4 h-4 text-emerald-600 dark:text-emerald-400" />
              <span>{successMsg}</span>
            </div>
          )}
          {errorMsg && (
            <div className="p-3 rounded-2xl bg-rose-50 dark:bg-rose-950/60 border border-rose-300 dark:border-rose-800 text-rose-800 dark:text-rose-200 text-xs font-semibold">
              {errorMsg}
            </div>
          )}

          {/* Profile Mode when Logged In */}
          {currentUser.isLoggedIn ? (
            <div className="space-y-4 pt-2">
              <div className="p-5 rounded-2xl bg-stone-50 dark:bg-zinc-800/80 border border-stone-200 dark:border-zinc-700/60 flex items-center gap-4">
                <div className="w-16 h-16 rounded-2xl bg-emerald-100 dark:bg-emerald-950 text-emerald-800 dark:text-emerald-300 text-3xl flex items-center justify-center border-2 border-emerald-500/30 shadow-inner">
                  {currentUser.avatar}
                </div>
                <div className="space-y-1">
                  <div className="flex items-center gap-2 flex-wrap">
                    <h4 className="font-bold text-base text-stone-900 dark:text-zinc-100">
                      {currentUser.name}
                    </h4>
                    {currentUser.role === 'Ustadz' && (
                      <span className="px-2 py-0.5 rounded-full bg-emerald-600 text-white text-[10px] font-extrabold flex items-center gap-1">
                        <ShieldCheck className="w-3 h-3" /> Ustadz
                      </span>
                    )}
                    {getProviderBadge(currentUser.authProvider)}
                  </div>
                  <p className="text-xs text-stone-500 dark:text-zinc-400 flex items-center gap-1 font-mono">
                    <Mail className="w-3 h-3 text-stone-400" /> {currentUser.email || 'Akun Tamu'}
                  </p>
                  <p className="text-xs text-stone-500 dark:text-zinc-400 flex items-center gap-1">
                    <MapPin className="w-3 h-3 text-emerald-600" /> {currentUser.cityName}
                  </p>
                </div>
              </div>

              {/* Quick Stats */}
              <div className="grid grid-cols-3 gap-2 text-center text-xs">
                <div className="p-3 rounded-xl bg-stone-100 dark:bg-zinc-800/50">
                  <p className="text-[10px] text-stone-500 dark:text-zinc-400">Status</p>
                  <p className="font-bold text-emerald-600 dark:text-emerald-400 mt-0.5">Aktif</p>
                </div>
                <div className="p-3 rounded-xl bg-stone-100 dark:bg-zinc-800/50">
                  <p className="text-[10px] text-stone-500 dark:text-zinc-400">Peran</p>
                  <p className="font-bold text-stone-800 dark:text-zinc-200 mt-0.5">{currentUser.role || 'Member'}</p>
                </div>
                <div className="p-3 rounded-xl bg-stone-100 dark:bg-zinc-800/50">
                  <p className="text-[10px] text-stone-500 dark:text-zinc-400">Bergabung</p>
                  <p className="font-bold text-stone-800 dark:text-zinc-200 mt-0.5">{currentUser.joinedDate || '2026'}</p>
                </div>
              </div>

              {/* Logout Action */}
              <div className="pt-2 flex items-center gap-3">
                <button
                  type="button"
                  onClick={handleLogout}
                  className="flex-1 py-2.5 rounded-xl border border-rose-200 dark:border-rose-900/50 bg-rose-50/50 dark:bg-rose-950/30 text-rose-600 dark:text-rose-400 hover:bg-rose-100 text-xs font-bold flex items-center justify-center gap-2 transition-colors"
                >
                  <LogOut className="w-4 h-4" />
                  <span>Keluar Akun</span>
                </button>
                <button
                  type="button"
                  onClick={onClose}
                  className="px-5 py-2.5 rounded-xl bg-emerald-600 hover:bg-emerald-700 text-white text-xs font-bold transition-colors"
                >
                  Selesai
                </button>
              </div>
            </div>
          ) : (
            /* Login & Register Forms with SSO Integration */
            <div className="space-y-4">
              {/* Tab Switcher */}
              <div className="grid grid-cols-2 p-1 rounded-2xl bg-stone-100 dark:bg-zinc-800 text-xs font-semibold">
                <button
                  type="button"
                  onClick={() => { setTab('login'); setErrorMsg(''); }}
                  className={`py-2 rounded-xl transition-all ${
                    tab === 'login'
                      ? 'bg-white dark:bg-zinc-700 text-emerald-700 dark:text-emerald-300 shadow-xs font-bold'
                      : 'text-stone-500 dark:text-zinc-400 hover:text-stone-800'
                  }`}
                >
                  Masuk (Log In)
                </button>
                <button
                  type="button"
                  onClick={() => { setTab('register'); setErrorMsg(''); }}
                  className={`py-2 rounded-xl transition-all ${
                    tab === 'register'
                      ? 'bg-white dark:bg-zinc-700 text-emerald-700 dark:text-emerald-300 shadow-xs font-bold'
                      : 'text-stone-500 dark:text-zinc-400 hover:text-stone-800'
                  }`}
                >
                  Daftar (Sign In)
                </button>
              </div>

              {/* 3 SSO Buttons: Google, Microsoft Azure, Apple */}
              <div className="space-y-2">
                <p className="text-[11px] font-semibold text-stone-500 dark:text-zinc-400 uppercase tracking-wider text-center">
                  Otentikasi Cepat SSO:
                </p>
                <div className="grid grid-cols-3 gap-2">
                  <button
                    type="button"
                    onClick={() => setActiveOAuthProvider('google')}
                    className="p-2.5 rounded-xl bg-stone-50 dark:bg-zinc-800 hover:bg-stone-100 dark:hover:bg-zinc-700 border border-stone-200 dark:border-zinc-700 text-xs font-semibold flex items-center justify-center gap-1.5 transition-all"
                  >
                    <svg className="w-4 h-4 shrink-0" viewBox="0 0 24 24">
                      <path fill="#4285F4" d="M22.56 12.25c0-.78-.07-1.53-.2-2.25H12v4.26h5.92c-.26 1.37-1.04 2.53-2.21 3.31v2.77h3.57c2.08-1.92 3.28-4.74 3.28-8.09z" />
                      <path fill="#34A853" d="M12 23c2.97 0 5.46-.98 7.28-2.66l-3.57-2.77c-.98.66-2.23 1.06-3.71 1.06-2.86 0-5.29-1.93-6.16-4.53H2.18v2.84C3.99 20.53 7.7 23 12 23z" />
                      <path fill="#FBBC05" d="M5.84 14.09c-.22-.66-.35-1.36-.35-2.09s.13-1.43.35-2.09V7.06H2.18C1.43 8.55 1 10.22 1 12s.43 3.45 1.18 4.94l2.85-2.22.81-.63z" />
                      <path fill="#EA4335" d="M12 5.38c1.62 0 3.06.56 4.21 1.64l3.15-3.15C17.45 2.09 14.97 1 12 1 7.7 1 3.99 3.47 2.18 7.06l3.66 2.84c.87-2.6 3.3-4.52 6.16-4.52z" />
                    </svg>
                    <span>Google</span>
                  </button>

                  <button
                    type="button"
                    onClick={() => setActiveOAuthProvider('microsoft')}
                    className="p-2.5 rounded-xl bg-stone-50 dark:bg-zinc-800 hover:bg-stone-100 dark:hover:bg-zinc-700 border border-stone-200 dark:border-zinc-700 text-xs font-semibold flex items-center justify-center gap-1.5 transition-all"
                  >
                    <svg className="w-4 h-4 shrink-0" viewBox="0 0 24 24">
                      <rect x="1" y="1" width="10" height="10" fill="#F25022" />
                      <rect x="13" y="1" width="10" height="10" fill="#7FBA00" />
                      <rect x="1" y="13" width="10" height="10" fill="#00A4EF" />
                      <rect x="13" y="13" width="10" height="10" fill="#FFB900" />
                    </svg>
                    <span>Azure</span>
                  </button>

                  <button
                    type="button"
                    onClick={() => setActiveOAuthProvider('apple')}
                    className="p-2.5 rounded-xl bg-stone-50 dark:bg-zinc-800 hover:bg-stone-100 dark:hover:bg-zinc-700 border border-stone-200 dark:border-zinc-700 text-xs font-semibold flex items-center justify-center gap-1.5 transition-all"
                  >
                    <svg className="w-4 h-4 fill-current shrink-0" viewBox="0 0 24 24">
                      <path d="M18.71 19.5c-.83 1.24-1.71 2.45-3.05 2.47-1.34.03-1.77-.79-3.29-.79-1.53 0-2 .77-3.27.82-1.31.05-2.3-1.32-3.14-2.53C4.25 17 2.94 12.45 4.7 9.39c.87-1.52 2.43-2.48 4.12-2.51 1.28-.02 2.5.87 3.29.87.78 0 2.26-1.07 3.81-.91.65.03 2.47.26 3.64 1.98-.09.06-2.17 1.28-2.15 3.81.03 3.02 2.65 4.03 2.68 4.04-.03.07-.42 1.44-1.38 2.83M15.97 6.87c.6-0.74 1.01-1.77.9-2.8-.88.04-1.95.59-2.58 1.33-.56.64-.99 1.69-.86 2.7.99.08 1.94-.49 2.54-1.23z" />
                    </svg>
                    <span>Apple</span>
                  </button>
                </div>
              </div>

              <div className="relative flex items-center justify-center my-2">
                <div className="border-t border-stone-200 dark:border-zinc-800 w-full"></div>
                <span className="bg-white dark:bg-zinc-900 px-3 text-[10px] text-stone-400 font-medium whitespace-nowrap">
                  atau gunakan email
                </span>
              </div>

              {/* Login Form */}
              {tab === 'login' && (
                <form onSubmit={handleLogin} className="space-y-3.5 text-xs">
                  <div>
                    <label className="font-semibold block mb-1.5 text-stone-700 dark:text-zinc-300">
                      Alamat Email
                    </label>
                    <div className="relative">
                      <Mail className="w-4 h-4 text-stone-400 absolute left-3.5 top-1/2 -translate-y-1/2" />
                      <input
                        type="email"
                        required
                        placeholder="nama@email.com"
                        value={email}
                        onChange={(e) => setEmail(e.target.value)}
                        className="w-full pl-10 pr-4 py-2.5 rounded-xl bg-stone-50 dark:bg-zinc-800 border border-stone-200 dark:border-zinc-700 text-xs text-stone-900 dark:text-zinc-100 focus:outline-none focus:border-emerald-500"
                      />
                    </div>
                  </div>

                  <div>
                    <label className="font-semibold block mb-1.5 text-stone-700 dark:text-zinc-300">
                      Kata Sandi
                    </label>
                    <div className="relative">
                      <Lock className="w-4 h-4 text-stone-400 absolute left-3.5 top-1/2 -translate-y-1/2" />
                      <input
                        type={showPassword ? 'text' : 'password'}
                        required
                        placeholder="Minimal 6 karakter"
                        value={password}
                        onChange={(e) => setPassword(e.target.value)}
                        className="w-full pl-10 pr-10 py-2.5 rounded-xl bg-stone-50 dark:bg-zinc-800 border border-stone-200 dark:border-zinc-700 text-xs text-stone-900 dark:text-zinc-100 focus:outline-none focus:border-emerald-500"
                      />
                      <button
                        type="button"
                        onClick={() => setShowPassword(!showPassword)}
                        className="absolute right-3.5 top-1/2 -translate-y-1/2 text-stone-400 hover:text-stone-600"
                      >
                        {showPassword ? <EyeOff className="w-4 h-4" /> : <Eye className="w-4 h-4" />}
                      </button>
                    </div>
                  </div>

                  <button
                    type="submit"
                    className="w-full py-3 rounded-xl bg-emerald-600 hover:bg-emerald-700 text-white font-bold text-xs shadow-md shadow-emerald-700/20 transition-transform active:scale-98 mt-2"
                  >
                    Masuk ke NurMuslim
                  </button>
                </form>
              )}

              {/* Register Form */}
              {tab === 'register' && (
                <form onSubmit={handleRegister} className="space-y-3 text-xs max-h-[50vh] overflow-y-auto pr-1">
                  <div>
                    <label className="font-semibold block mb-1 text-stone-700 dark:text-zinc-300">
                      Nama Lengkap
                    </label>
                    <div className="relative">
                      <User className="w-4 h-4 text-stone-400 absolute left-3 top-1/2 -translate-y-1/2" />
                      <input
                        type="text"
                        required
                        placeholder="Misal: Ahmad Fauzi"
                        value={name}
                        onChange={(e) => setName(e.target.value)}
                        className="w-full pl-9 pr-3 py-2 rounded-xl bg-stone-50 dark:bg-zinc-800 border border-stone-200 dark:border-zinc-700 text-xs text-stone-900 dark:text-zinc-100 focus:outline-none focus:border-emerald-500"
                      />
                    </div>
                  </div>

                  <div>
                    <label className="font-semibold block mb-1 text-stone-700 dark:text-zinc-300">
                      Alamat Email
                    </label>
                    <div className="relative">
                      <Mail className="w-4 h-4 text-stone-400 absolute left-3 top-1/2 -translate-y-1/2" />
                      <input
                        type="email"
                        required
                        placeholder="nama@email.com"
                        value={email}
                        onChange={(e) => setEmail(e.target.value)}
                        className="w-full pl-9 pr-3 py-2 rounded-xl bg-stone-50 dark:bg-zinc-800 border border-stone-200 dark:border-zinc-700 text-xs text-stone-900 dark:text-zinc-100 focus:outline-none focus:border-emerald-500"
                      />
                    </div>
                  </div>

                  <div>
                    <label className="font-semibold block mb-1 text-stone-700 dark:text-zinc-300">
                      Kata Sandi
                    </label>
                    <div className="relative">
                      <Lock className="w-4 h-4 text-stone-400 absolute left-3 top-1/2 -translate-y-1/2" />
                      <input
                        type={showPassword ? 'text' : 'password'}
                        required
                        placeholder="Buat kata sandi aman"
                        value={password}
                        onChange={(e) => setPassword(e.target.value)}
                        className="w-full pl-9 pr-9 py-2 rounded-xl bg-stone-50 dark:bg-zinc-800 border border-stone-200 dark:border-zinc-700 text-xs text-stone-900 dark:text-zinc-100 focus:outline-none focus:border-emerald-500"
                      />
                      <button
                        type="button"
                        onClick={() => setShowPassword(!showPassword)}
                        className="absolute right-3 top-1/2 -translate-y-1/2 text-stone-400 hover:text-stone-600"
                      >
                        {showPassword ? <EyeOff className="w-3.5 h-3.5" /> : <Eye className="w-3.5 h-3.5" />}
                      </button>
                    </div>
                  </div>

                  {/* Avatar Picker */}
                  <div>
                    <label className="font-semibold block mb-1 text-stone-700 dark:text-zinc-300">
                      Pilih Avatar Profil
                    </label>
                    <div className="flex items-center gap-2 overflow-x-auto py-1">
                      {AVATAR_OPTIONS.map((av) => (
                        <button
                          key={av}
                          type="button"
                          onClick={() => setSelectedAvatar(av)}
                          className={`w-9 h-9 rounded-xl text-lg flex items-center justify-center transition-all ${
                            selectedAvatar === av
                              ? 'bg-emerald-600 text-white shadow-md scale-110'
                              : 'bg-stone-100 dark:bg-zinc-800 hover:bg-stone-200'
                          }`}
                        >
                          {av}
                        </button>
                      ))}
                    </div>
                  </div>

                  {/* City & Role Selector */}
                  <div className="grid grid-cols-2 gap-2">
                    <div>
                      <label className="font-semibold block mb-1 text-stone-700 dark:text-zinc-300">
                        Kota Domisili
                      </label>
                      <select
                        value={selectedCityId}
                        onChange={(e) => setSelectedCityId(e.target.value)}
                        className="w-full px-2.5 py-2 rounded-xl bg-stone-50 dark:bg-zinc-800 border border-stone-200 dark:border-zinc-700 text-xs text-stone-900 dark:text-zinc-100"
                      >
                        {INDONESIAN_CITIES.map(city => (
                          <option key={city.id} value={city.id}>
                            {city.name}
                          </option>
                        ))}
                      </select>
                    </div>

                    <div>
                      <label className="font-semibold block mb-1 text-stone-700 dark:text-zinc-300">
                        Status Akun
                      </label>
                      <select
                        value={role}
                        onChange={(e) => setRole(e.target.value as any)}
                        className="w-full px-2.5 py-2 rounded-xl bg-stone-50 dark:bg-zinc-800 border border-stone-200 dark:border-zinc-700 text-xs text-stone-900 dark:text-zinc-100"
                      >
                        <option value="Member">Member Ikhwah</option>
                        <option value="Ustadz">Asatidz / Dai</option>
                        <option value="Pengurus Masjid">Pengurus DKM</option>
                      </select>
                    </div>
                  </div>

                  <button
                    type="submit"
                    className="w-full py-3 rounded-xl bg-emerald-600 hover:bg-emerald-700 text-white font-bold text-xs shadow-md shadow-emerald-700/20 transition-transform active:scale-98 mt-2"
                  >
                    Daftar Sekarang
                  </button>
                </form>
              )}

              {/* Quick 1-Click Demo Login */}
              <div className="pt-3 border-t border-stone-100 dark:border-zinc-800 space-y-2">
                <p className="text-[11px] text-stone-400 text-center font-medium">
                  Atau coba masuk cepat (Instant Demo):
                </p>
                <div className="grid grid-cols-2 gap-2">
                  <button
                    type="button"
                    onClick={() => handleQuickDemoLogin('Member')}
                    className="px-3 py-2 rounded-xl bg-stone-100 dark:bg-zinc-800 hover:bg-stone-200 dark:hover:bg-zinc-700 text-stone-700 dark:text-zinc-200 text-xs font-semibold flex items-center justify-center gap-1.5 transition-colors"
                  >
                    <span>🧔 Akhi Muslim</span>
                  </button>
                  <button
                    type="button"
                    onClick={() => handleQuickDemoLogin('Ustadz')}
                    className="px-3 py-2 rounded-xl bg-emerald-50 dark:bg-emerald-950/60 hover:bg-emerald-100 text-emerald-800 dark:text-emerald-300 border border-emerald-200 dark:border-emerald-800 text-xs font-semibold flex items-center justify-center gap-1.5 transition-colors"
                  >
                    <span>👳‍♂️ Ustadz Lc.</span>
                  </button>
                </div>
              </div>
            </div>
          )}
        </div>
      </div>

      {/* OAuth Login Modal Dialog */}
      <OAuthLoginModal
        isOpen={activeOAuthProvider !== null}
        provider={activeOAuthProvider}
        mode={tab === 'register' ? 'register' : 'login'}
        selectedCity={selectedCity}
        onClose={() => setActiveOAuthProvider(null)}
        onSuccess={(user) => {
          setActiveOAuthProvider(null);
          setCurrentUser(user);
          localStorage.setItem('nurmuslim_user_profile', JSON.stringify(user));
          setSuccessMsg(`Berhasil masuk melalui ${user.authProvider?.toUpperCase() || 'SSO'}`);
          setTimeout(() => {
            setSuccessMsg('');
            onClose();
          }, 800);
        }}
      />
    </>
  );
};
