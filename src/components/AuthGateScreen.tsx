import React, { useState } from 'react';
import { 
  User, 
  Lock, 
  Mail, 
  Eye, 
  EyeOff, 
  ShieldCheck, 
  CheckCircle2, 
  MapPin, 
  Sparkles, 
  ArrowRight,
  Compass,
  BookOpen,
  Clock,
  Radio,
  Heart,
  Globe,
  UserCheck
} from 'lucide-react';
import { UserProfile, CityLocation } from '../types';
import { INDONESIAN_CITIES } from '../data/prayerCalculation';
import { OAuthLoginModal, OAuthProvider } from './OAuthLoginModal';
import { NurMuslimLogo } from './NurMuslimLogo';

interface AuthGateScreenProps {
  onLoginSuccess: (user: UserProfile) => void;
  onContinueAsGuest: () => void;
  selectedCity: CityLocation;
  setSelectedCity: (city: CityLocation) => void;
}

const AVATAR_OPTIONS = ['🧔', '🧕', '👨‍💼', '👩‍💼', '👳‍♂️', '🧑‍🎓', '🌿', '🕌', '⭐', '🕊️'];

export const AuthGateScreen: React.FC<AuthGateScreenProps> = ({
  onLoginSuccess,
  onContinueAsGuest,
  selectedCity,
  setSelectedCity,
}) => {
  // Tab state: 'login' (Masuk Akun) vs 'register' (Sign In / Bikin Akun Baru)
  const [authMode, setAuthMode] = useState<'login' | 'register'>('login');

  // Form inputs
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

  const handleEmailLogin = (e: React.FormEvent) => {
    e.preventDefault();
    setErrorMsg('');

    if (!email || !password) {
      setErrorMsg('Harap masukkan alamat email dan kata sandi.');
      return;
    }

    const nameDerived = email.split('@')[0];
    const formattedName = nameDerived.charAt(0).toUpperCase() + nameDerived.slice(1);

    const loggedUser: UserProfile = {
      id: `user-${Date.now()}`,
      name: formattedName || 'Hamba Allah',
      email: email.trim(),
      avatar: selectedAvatar,
      cityId: selectedCity.id,
      cityName: selectedCity.name,
      joinedDate: new Date().toLocaleDateString('id-ID', { month: 'long', year: 'numeric' }),
      isLoggedIn: true,
      role: 'Member',
      authProvider: 'email',
    };

    setSuccessMsg('Alhamdulillah, berhasil masuk!');
    setTimeout(() => {
      onLoginSuccess(loggedUser);
    }, 600);
  };

  const handleEmailRegister = (e: React.FormEvent) => {
    e.preventDefault();
    setErrorMsg('');

    if (!name.trim() || !email.trim() || !password.trim()) {
      setErrorMsg('Harap lengkapi semua data pendaftaran akun.');
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

    setSuccessMsg('Akun berhasil dibuat! Mengalihkan ke NurMuslim...');
    setTimeout(() => {
      onLoginSuccess(newUser);
    }, 700);
  };

  const handleQuickDemo = (roleType: 'Member' | 'Ustadz') => {
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

    setSuccessMsg(`Masuk sebagai ${demoUser.name}`);
    setTimeout(() => {
      onLoginSuccess(demoUser);
    }, 600);
  };

  return (
    <div className="min-h-screen bg-gradient-to-br from-stone-950 via-emerald-950 to-stone-950 text-white flex flex-col justify-center items-center px-4 py-8 relative overflow-hidden font-sans">
      {/* Decorative Islamic Background Elements */}
      <div className="absolute -top-40 -left-40 w-96 h-96 bg-emerald-600/10 rounded-full blur-3xl pointer-events-none"></div>
      <div className="absolute -bottom-40 -right-40 w-96 h-96 bg-amber-600/10 rounded-full blur-3xl pointer-events-none"></div>
      <div className="absolute top-1/2 left-1/2 -translate-x-1/2 -translate-y-1/2 w-[600px] h-[600px] bg-teal-900/5 rounded-full blur-3xl pointer-events-none"></div>

      {/* Main Container */}
      <div className="w-full max-w-xl relative z-10 space-y-6 animate-in fade-in zoom-in-95 duration-300">
        {/* Brand Header with Transparent Logo Icon */}
        <div className="text-center space-y-2">
          <div className="flex justify-center mb-1 drop-shadow-2xl">
            <NurMuslimLogo size="xl" />
          </div>

          <div>
            <div className="flex items-center justify-center gap-2">
              <h1 className="text-3xl sm:text-4xl font-extrabold tracking-tight text-white">
                NurMuslim
              </h1>
              <span className="text-[11px] font-extrabold uppercase px-2 py-0.5 rounded-full bg-amber-400 text-stone-950 shadow-sm">
                SuperApp
              </span>
            </div>
            <p className="text-sm text-stone-300 mt-1 max-w-md mx-auto">
              Sahabat Ibadah & Sunnah Nusantara terlengkap. Silakan masuk atau buat akun baru untuk pengalaman terbaik.
            </p>
          </div>
        </div>

        {/* Auth Card */}
        <div className="bg-stone-900/90 backdrop-blur-xl border border-stone-800 rounded-3xl p-6 sm:p-8 shadow-2xl space-y-6">
          {/* Mode Switcher Tabs: Log In vs Sign In (Bikin Akun) */}
          <div className="grid grid-cols-2 p-1.5 rounded-2xl bg-stone-950/80 border border-stone-800">
            <button
              id="tab-auth-login"
              type="button"
              onClick={() => {
                setAuthMode('login');
                setErrorMsg('');
                setSuccessMsg('');
              }}
              className={`py-2.5 rounded-xl font-bold text-sm transition-all flex items-center justify-center gap-2 ${
                authMode === 'login'
                  ? 'bg-emerald-600 text-white shadow-lg shadow-emerald-600/30'
                  : 'text-stone-400 hover:text-stone-200'
              }`}
            >
              <User className="w-4 h-4" />
              <span>Masuk (Log In)</span>
            </button>

            <button
              id="tab-auth-register"
              type="button"
              onClick={() => {
                setAuthMode('register');
                setErrorMsg('');
                setSuccessMsg('');
              }}
              className={`py-2.5 rounded-xl font-bold text-sm transition-all flex items-center justify-center gap-2 ${
                authMode === 'register'
                  ? 'bg-emerald-600 text-white shadow-lg shadow-emerald-600/30'
                  : 'text-stone-400 hover:text-stone-200'
              }`}
            >
              <Sparkles className="w-4 h-4" />
              <span>Daftar / Sign In</span>
            </button>
          </div>

          {/* Feedback Messages */}
          {errorMsg && (
            <div className="p-3.5 rounded-2xl bg-rose-950/70 border border-rose-800/80 text-rose-300 text-xs flex items-center gap-2">
              <span>⚠️</span>
              <span>{errorMsg}</span>
            </div>
          )}

          {successMsg && (
            <div className="p-3.5 rounded-2xl bg-emerald-950/70 border border-emerald-700 text-emerald-300 text-xs flex items-center gap-2">
              <CheckCircle2 className="w-4 h-4 text-emerald-400 shrink-0" />
              <span>{successMsg}</span>
            </div>
          )}

          {/* 3 OAuth SSO Provider Buttons: Google, Microsoft Azure, Apple */}
          <div className="space-y-3">
            <p className="text-xs font-semibold text-stone-400 uppercase tracking-wider text-center">
              {authMode === 'login' ? 'Masuk Cepat dengan Akun' : 'Daftar Cepat dengan Akun'}
            </p>

            <div className="grid grid-cols-1 sm:grid-cols-3 gap-2.5">
              {/* 1. Google Button */}
              <button
                id="btn-sso-google"
                type="button"
                onClick={() => setActiveOAuthProvider('google')}
                className="w-full py-3 px-3.5 rounded-2xl bg-white hover:bg-stone-100 text-stone-900 font-semibold text-xs flex items-center justify-center gap-2 shadow-md transition-all active:scale-98 border border-stone-200"
              >
                <svg className="w-4 h-4 shrink-0" viewBox="0 0 24 24">
                  <path fill="#4285F4" d="M22.56 12.25c0-.78-.07-1.53-.2-2.25H12v4.26h5.92c-.26 1.37-1.04 2.53-2.21 3.31v2.77h3.57c2.08-1.92 3.28-4.74 3.28-8.09z" />
                  <path fill="#34A853" d="M12 23c2.97 0 5.46-.98 7.28-2.66l-3.57-2.77c-.98.66-2.23 1.06-3.71 1.06-2.86 0-5.29-1.93-6.16-4.53H2.18v2.84C3.99 20.53 7.7 23 12 23z" />
                  <path fill="#FBBC05" d="M5.84 14.09c-.22-.66-.35-1.36-.35-2.09s.13-1.43.35-2.09V7.06H2.18C1.43 8.55 1 10.22 1 12s.43 3.45 1.18 4.94l2.85-2.22.81-.63z" />
                  <path fill="#EA4335" d="M12 5.38c1.62 0 3.06.56 4.21 1.64l3.15-3.15C17.45 2.09 14.97 1 12 1 7.7 1 3.99 3.47 2.18 7.06l3.66 2.84c.87-2.6 3.3-4.52 6.16-4.52z" />
                </svg>
                <span className="truncate">Google</span>
              </button>

              {/* 2. Microsoft Azure Button */}
              <button
                id="btn-sso-azure"
                type="button"
                onClick={() => setActiveOAuthProvider('microsoft')}
                className="w-full py-3 px-3.5 rounded-2xl bg-stone-800 hover:bg-stone-700 text-white font-semibold text-xs flex items-center justify-center gap-2 shadow-md transition-all active:scale-98 border border-stone-700"
              >
                <svg className="w-4 h-4 shrink-0" viewBox="0 0 24 24">
                  <rect x="1" y="1" width="10" height="10" fill="#F25022" />
                  <rect x="13" y="1" width="10" height="10" fill="#7FBA00" />
                  <rect x="1" y="13" width="10" height="10" fill="#00A4EF" />
                  <rect x="13" y="13" width="10" height="10" fill="#FFB900" />
                </svg>
                <span className="truncate">Azure / MS</span>
              </button>

              {/* 3. Apple Button */}
              <button
                id="btn-sso-apple"
                type="button"
                onClick={() => setActiveOAuthProvider('apple')}
                className="w-full py-3 px-3.5 rounded-2xl bg-black hover:bg-stone-950 text-white font-semibold text-xs flex items-center justify-center gap-2 shadow-md transition-all active:scale-98 border border-stone-700"
              >
                <svg className="w-4 h-4 fill-white shrink-0" viewBox="0 0 24 24">
                  <path d="M18.71 19.5c-.83 1.24-1.71 2.45-3.05 2.47-1.34.03-1.77-.79-3.29-.79-1.53 0-2 .77-3.27.82-1.31.05-2.3-1.32-3.14-2.53C4.25 17 2.94 12.45 4.7 9.39c.87-1.52 2.43-2.48 4.12-2.51 1.28-.02 2.5.87 3.29.87.78 0 2.26-1.07 3.81-.91.65.03 2.47.26 3.64 1.98-.09.06-2.17 1.28-2.15 3.81.03 3.02 2.65 4.03 2.68 4.04-.03.07-.42 1.44-1.38 2.83M15.97 6.87c.6-0.74 1.01-1.77.9-2.8-.88.04-1.95.59-2.58 1.33-.56.64-.99 1.69-.86 2.7.99.08 1.94-.49 2.54-1.23z" />
                </svg>
                <span className="truncate">Apple ID</span>
              </button>
            </div>
          </div>

          {/* Divider */}
          <div className="relative flex items-center justify-center">
            <div className="border-t border-stone-800 w-full"></div>
            <span className="bg-stone-900 px-3 text-[11px] text-stone-400 font-medium whitespace-nowrap">
              atau dengan Email & Sandi
            </span>
          </div>

          {/* Form Content: Log In vs Sign In (Bikin Akun) */}
          {authMode === 'login' ? (
            /* Log In Form */
            <form onSubmit={handleEmailLogin} className="space-y-4">
              <div>
                <label className="block text-xs font-semibold text-stone-300 mb-1.5">
                  Alamat Email
                </label>
                <div className="relative">
                  <Mail className="w-4 h-4 text-stone-400 absolute left-3.5 top-1/2 -translate-y-1/2" />
                  <input
                    id="input-login-email"
                    type="email"
                    required
                    value={email}
                    onChange={(e) => setEmail(e.target.value)}
                    placeholder="nama@email.com"
                    className="w-full pl-10 pr-4 py-3 rounded-2xl bg-stone-950/90 border border-stone-700 text-xs sm:text-sm text-white focus:outline-none focus:border-emerald-500"
                  />
                </div>
              </div>

              <div>
                <label className="block text-xs font-semibold text-stone-300 mb-1.5">
                  Kata Sandi
                </label>
                <div className="relative">
                  <Lock className="w-4 h-4 text-stone-400 absolute left-3.5 top-1/2 -translate-y-1/2" />
                  <input
                    id="input-login-password"
                    type={showPassword ? 'text' : 'password'}
                    required
                    value={password}
                    onChange={(e) => setPassword(e.target.value)}
                    placeholder="••••••••"
                    className="w-full pl-10 pr-10 py-3 rounded-2xl bg-stone-950/90 border border-stone-700 text-xs sm:text-sm text-white focus:outline-none focus:border-emerald-500"
                  />
                  <button
                    type="button"
                    onClick={() => setShowPassword(!showPassword)}
                    className="absolute right-3.5 top-1/2 -translate-y-1/2 text-stone-400 hover:text-stone-200"
                  >
                    {showPassword ? <EyeOff className="w-4 h-4" /> : <Eye className="w-4 h-4" />}
                  </button>
                </div>
              </div>

              <div className="flex items-center justify-between text-xs text-stone-400">
                <label className="flex items-center gap-2 cursor-pointer">
                  <input type="checkbox" defaultChecked className="rounded accent-emerald-600" />
                  <span>Ingat sesi masuk</span>
                </label>
                <button
                  type="button"
                  onClick={() => alert('Fitur pemulihan kata sandi dapat dilakukan melalui email terdaftar.')}
                  className="text-emerald-400 hover:underline"
                >
                  Lupa sandi?
                </button>
              </div>

              <button
                id="btn-submit-login"
                type="submit"
                className="w-full py-3.5 rounded-2xl bg-gradient-to-r from-emerald-600 to-teal-700 hover:from-emerald-500 hover:to-teal-600 text-white font-bold text-sm shadow-xl shadow-emerald-900/40 flex items-center justify-center gap-2 transition-all active:scale-98"
              >
                <span>Masuk ke NurMuslim</span>
                <ArrowRight className="w-4 h-4" />
              </button>

              {/* Quick Demo Access */}
              <div className="pt-2">
                <p className="text-[11px] text-stone-400 text-center mb-2">Uji Coba Masuk Cepat (1-Klik):</p>
                <div className="grid grid-cols-2 gap-2">
                  <button
                    type="button"
                    onClick={() => handleQuickDemo('Member')}
                    className="py-2 px-3 rounded-xl bg-stone-800 hover:bg-stone-700 border border-stone-700 text-[11px] text-stone-300 font-medium flex items-center justify-center gap-1.5"
                  >
                    <span>🧔 Member Ikhwah</span>
                  </button>
                  <button
                    type="button"
                    onClick={() => handleQuickDemo('Ustadz')}
                    className="py-2 px-3 rounded-xl bg-stone-800 hover:bg-stone-700 border border-stone-700 text-[11px] text-amber-300 font-medium flex items-center justify-center gap-1.5"
                  >
                    <span>👳‍♂️ Asatidz Terverifikasi</span>
                  </button>
                </div>
              </div>
            </form>
          ) : (
            /* Sign In / Register (Bikin Akun) Form */
            <form onSubmit={handleEmailRegister} className="space-y-4">
              <div>
                <label className="block text-xs font-semibold text-stone-300 mb-1.5">
                  Nama Lengkap / Panggilan
                </label>
                <div className="relative">
                  <User className="w-4 h-4 text-stone-400 absolute left-3.5 top-1/2 -translate-y-1/2" />
                  <input
                    id="input-register-name"
                    type="text"
                    required
                    value={name}
                    onChange={(e) => setName(e.target.value)}
                    placeholder="e.g. Ahmad Raihan"
                    className="w-full pl-10 pr-4 py-3 rounded-2xl bg-stone-950/90 border border-stone-700 text-xs sm:text-sm text-white focus:outline-none focus:border-emerald-500"
                  />
                </div>
              </div>

              <div>
                <label className="block text-xs font-semibold text-stone-300 mb-1.5">
                  Alamat Email
                </label>
                <div className="relative">
                  <Mail className="w-4 h-4 text-stone-400 absolute left-3.5 top-1/2 -translate-y-1/2" />
                  <input
                    id="input-register-email"
                    type="email"
                    required
                    value={email}
                    onChange={(e) => setEmail(e.target.value)}
                    placeholder="nama@email.com"
                    className="w-full pl-10 pr-4 py-3 rounded-2xl bg-stone-950/90 border border-stone-700 text-xs sm:text-sm text-white focus:outline-none focus:border-emerald-500"
                  />
                </div>
              </div>

              <div>
                <label className="block text-xs font-semibold text-stone-300 mb-1.5">
                  Kata Sandi Baru
                </label>
                <div className="relative">
                  <Lock className="w-4 h-4 text-stone-400 absolute left-3.5 top-1/2 -translate-y-1/2" />
                  <input
                    id="input-register-password"
                    type={showPassword ? 'text' : 'password'}
                    required
                    value={password}
                    onChange={(e) => setPassword(e.target.value)}
                    placeholder="Minimal 6 karakter"
                    className="w-full pl-10 pr-10 py-3 rounded-2xl bg-stone-950/90 border border-stone-700 text-xs sm:text-sm text-white focus:outline-none focus:border-emerald-500"
                  />
                  <button
                    type="button"
                    onClick={() => setShowPassword(!showPassword)}
                    className="absolute right-3.5 top-1/2 -translate-y-1/2 text-stone-400 hover:text-stone-200"
                  >
                    {showPassword ? <EyeOff className="w-4 h-4" /> : <Eye className="w-4 h-4" />}
                  </button>
                </div>
              </div>

              {/* City Selection */}
              <div>
                <label className="block text-xs font-semibold text-stone-300 mb-1.5">
                  Kota Domisili (Jadwal Sholat & Kiblat)
                </label>
                <div className="relative">
                  <MapPin className="w-4 h-4 text-emerald-400 absolute left-3.5 top-1/2 -translate-y-1/2 pointer-events-none" />
                  <select
                    id="select-register-city"
                    value={selectedCityId}
                    onChange={(e) => setSelectedCityId(e.target.value)}
                    className="w-full pl-10 pr-8 py-3 rounded-2xl bg-stone-950/90 border border-stone-700 text-xs sm:text-sm text-white focus:outline-none focus:border-emerald-500 appearance-none"
                  >
                    {INDONESIAN_CITIES.map((city) => (
                      <option key={city.id} value={city.id} className="bg-stone-900 text-white">
                        {city.name} ({city.province} - {city.timezone})
                      </option>
                    ))}
                  </select>
                </div>
              </div>

              {/* Avatar Selector */}
              <div>
                <label className="block text-xs font-semibold text-stone-300 mb-1.5">
                  Pilih Karakter / Avatar
                </label>
                <div className="flex items-center gap-2 overflow-x-auto pb-1">
                  {AVATAR_OPTIONS.map((av) => (
                    <button
                      key={av}
                      type="button"
                      onClick={() => setSelectedAvatar(av)}
                      className={`w-10 h-10 rounded-2xl flex items-center justify-center text-xl shrink-0 transition-all ${
                        selectedAvatar === av
                          ? 'bg-emerald-600 ring-2 ring-emerald-400 scale-110 shadow-md'
                          : 'bg-stone-800 hover:bg-stone-700'
                      }`}
                    >
                      {av}
                    </button>
                  ))}
                </div>
              </div>

              {/* Role Selector */}
              <div>
                <label className="block text-xs font-semibold text-stone-300 mb-1.5">
                  Tipe Akun
                </label>
                <div className="grid grid-cols-3 gap-2">
                  {(['Member', 'Ustadz', 'Pengurus Masjid'] as const).map((r) => (
                    <button
                      key={r}
                      type="button"
                      onClick={() => setRole(r)}
                      className={`py-2 px-2 rounded-xl text-xs font-semibold border transition-all truncate ${
                        role === r
                          ? 'bg-emerald-950 text-emerald-300 border-emerald-600 ring-1 ring-emerald-500'
                          : 'bg-stone-800/80 text-stone-400 border-stone-700 hover:text-stone-200'
                      }`}
                    >
                      {r}
                    </button>
                  ))}
                </div>
              </div>

              <button
                id="btn-submit-register"
                type="submit"
                className="w-full py-3.5 rounded-2xl bg-gradient-to-r from-emerald-600 to-teal-700 hover:from-emerald-500 hover:to-teal-600 text-white font-bold text-sm shadow-xl shadow-emerald-900/40 flex items-center justify-center gap-2 transition-all active:scale-98"
              >
                <span>Bikin Akun & Lanjutkan</span>
                <ArrowRight className="w-4 h-4" />
              </button>
            </form>
          )}

          {/* Guest / Bypass Option */}
          <div className="pt-2 text-center">
            <button
              id="btn-continue-as-guest"
              type="button"
              onClick={onContinueAsGuest}
              className="text-xs text-stone-400 hover:text-stone-200 font-medium py-1.5 px-4 rounded-xl hover:bg-stone-800/50 transition-all inline-flex items-center gap-1.5"
            >
              <span>Jelajahi Dulu tanpa Akun (Masuk sebagai Tamu)</span>
              <ArrowRight className="w-3.5 h-3.5 text-stone-400" />
            </button>
          </div>
        </div>

        {/* Footer info features */}
        <div className="grid grid-cols-3 gap-3 text-center text-stone-400 text-xs">
          <div className="p-2.5 rounded-2xl bg-stone-900/40 border border-white/5 space-y-1">
            <BookOpen className="w-4 h-4 mx-auto text-emerald-400" />
            <p className="text-[11px] font-medium text-stone-300">Al-Qur'an 30 Juz</p>
          </div>
          <div className="p-2.5 rounded-2xl bg-stone-900/40 border border-white/5 space-y-1">
            <Clock className="w-4 h-4 mx-auto text-amber-400" />
            <p className="text-[11px] font-medium text-stone-300">Jadwal Sholat Presisi</p>
          </div>
          <div className="p-2.5 rounded-2xl bg-stone-900/40 border border-white/5 space-y-1">
            <Radio className="w-4 h-4 mx-auto text-teal-400" />
            <p className="text-[11px] font-medium text-stone-300">Radio Sunnah 24 Jam</p>
          </div>
        </div>
      </div>

      {/* OAuth Login Modal Dialog for Google, Microsoft Azure, and Apple */}
      <OAuthLoginModal
        isOpen={activeOAuthProvider !== null}
        provider={activeOAuthProvider}
        mode={authMode}
        selectedCity={selectedCity}
        onClose={() => setActiveOAuthProvider(null)}
        onSuccess={(user) => {
          setActiveOAuthProvider(null);
          setSuccessMsg(`Berhasil terhubung dengan ${user.authProvider?.toUpperCase() || 'SSO'}`);
          setTimeout(() => {
            onLoginSuccess(user);
          }, 600);
        }}
      />
    </div>
  );
};
