import React, { useState } from 'react';
import { 
  X, 
  ShieldCheck, 
  CheckCircle2, 
  Lock, 
  Sparkles, 
  User, 
  Mail, 
  ArrowRight,
  RefreshCw,
  Key
} from 'lucide-react';
import { UserProfile, CityLocation } from '../types';

export type OAuthProvider = 'google' | 'microsoft' | 'apple';

interface OAuthLoginModalProps {
  isOpen: boolean;
  provider: OAuthProvider | null;
  onClose: () => void;
  onSuccess: (user: UserProfile) => void;
  selectedCity: CityLocation;
  mode: 'login' | 'register';
}

export const OAuthLoginModal: React.FC<OAuthLoginModalProps> = ({
  isOpen,
  provider,
  onClose,
  onSuccess,
  selectedCity,
  mode
}) => {
  const [customEmail, setCustomEmail] = useState('');
  const [customName, setCustomName] = useState('');
  const [useCustomInput, setUseCustomInput] = useState(false);
  const [isLoading, setIsLoading] = useState(false);
  const [step, setStep] = useState<'select' | 'authorizing' | 'success'>('select');

  if (!isOpen || !provider) return null;

  // Preset demo accounts for each provider
  const getProviderConfig = () => {
    switch (provider) {
      case 'google':
        return {
          title: mode === 'register' ? 'Daftar Akun dengan Google' : 'Masuk dengan Google',
          brandName: 'Google Identity Service',
          headerColor: 'bg-white text-stone-800 border-b border-stone-200',
          logo: (
            <svg className="w-5 h-5" viewBox="0 0 24 24">
              <path fill="#4285F4" d="M22.56 12.25c0-.78-.07-1.53-.2-2.25H12v4.26h5.92c-.26 1.37-1.04 2.53-2.21 3.31v2.77h3.57c2.08-1.92 3.28-4.74 3.28-8.09z" />
              <path fill="#34A853" d="M12 23c2.97 0 5.46-.98 7.28-2.66l-3.57-2.77c-.98.66-2.23 1.06-3.71 1.06-2.86 0-5.29-1.93-6.16-4.53H2.18v2.84C3.99 20.53 7.7 23 12 23z" />
              <path fill="#FBBC05" d="M5.84 14.09c-.22-.66-.35-1.36-.35-2.09s.13-1.43.35-2.09V7.06H2.18C1.43 8.55 1 10.22 1 12s.43 3.45 1.18 4.94l2.85-2.22.81-.63z" />
              <path fill="#EA4335" d="M12 5.38c1.62 0 3.06.56 4.21 1.64l3.15-3.15C17.45 2.09 14.97 1 12 1 7.7 1 3.99 3.47 2.18 7.06l3.66 2.84c.87-2.6 3.3-4.52 6.16-4.52z" />
            </svg>
          ),
          accounts: [
            {
              name: 'Ahmad Raihan (Pribadi)',
              email: 'railfanscraft.2025@gmail.com',
              avatar: '🧔',
            },
            {
              name: 'Muhammad Faris, S.Kom',
              email: 'faris.muslim@gmail.com',
              avatar: '👨‍💼',
            }
          ],
          scopeNote: 'NurMuslim akan menerima nama, foto profil, dan alamat email Anda dari Google.',
          themeColor: 'from-blue-600 to-indigo-600',
        };
      case 'microsoft':
        return {
          title: mode === 'register' ? 'Daftar Akun dengan Microsoft Azure' : 'Masuk dengan Microsoft Azure AD',
          brandName: 'Microsoft Azure Active Directory',
          headerColor: 'bg-[#2F2F2F] text-white border-b border-stone-700',
          logo: (
            <svg className="w-5 h-5" viewBox="0 0 24 24">
              <rect x="1" y="1" width="10" height="10" fill="#F25022" />
              <rect x="13" y="1" width="10" height="10" fill="#7FBA00" />
              <rect x="1" y="13" width="10" height="10" fill="#00A4EF" />
              <rect x="13" y="13" width="10" height="10" fill="#FFB900" />
            </svg>
          ),
          accounts: [
            {
              name: 'Raihan Pratama',
              email: 'raihan@nurmuslim.onmicrosoft.com',
              avatar: '🧑‍🎓',
            },
            {
              name: 'Ikhwah Azure ID',
              email: 'ikhwah.indonesia@outlook.com',
              avatar: '🕌',
            }
          ],
          scopeNote: 'Otentikasi aman Single Sign-On Azure B2C & Microsoft Cloud Identity.',
          themeColor: 'from-cyan-600 to-blue-700',
        };
      case 'apple':
        return {
          title: mode === 'register' ? 'Daftar Akun dengan Apple ID' : 'Masuk dengan Apple',
          brandName: 'Apple Sign-In Security',
          headerColor: 'bg-black text-white border-b border-stone-800',
          logo: (
            <svg className="w-5 h-5 fill-current" viewBox="0 0 24 24">
              <path d="M18.71 19.5c-.83 1.24-1.71 2.45-3.05 2.47-1.34.03-1.77-.79-3.29-.79-1.53 0-2 .77-3.27.82-1.31.05-2.3-1.32-3.14-2.53C4.25 17 2.94 12.45 4.7 9.39c.87-1.52 2.43-2.48 4.12-2.51 1.28-.02 2.5.87 3.29.87.78 0 2.26-1.07 3.81-.91.65.03 2.47.26 3.64 1.98-.09.06-2.17 1.28-2.15 3.81.03 3.02 2.65 4.03 2.68 4.04-.03.07-.42 1.44-1.38 2.83M15.97 6.87c.6-0.74 1.01-1.77.9-2.8-.88.04-1.95.59-2.58 1.33-.56.64-.99 1.69-.86 2.7.99.08 1.94-.49 2.54-1.23z" />
            </svg>
          ),
          accounts: [
            {
              name: 'Pengguna Apple ID',
              email: 'raihan.apple@icloud.com',
              avatar: '🕊️',
            },
            {
              name: 'Hamba Allah (Email Tersembunyi)',
              email: 'dpq293847@privaterelay.appleid.com',
              avatar: '⭐',
            }
          ],
          scopeNote: 'Dukungan privasi Apple: Sembunyikan Email & Enkripsi Face ID / Touch ID.',
          themeColor: 'from-stone-800 to-zinc-900',
        };
    }
  };

  const config = getProviderConfig();

  const handleSelectAccount = (account: { name: string; email: string; avatar: string }) => {
    setIsLoading(true);
    setStep('authorizing');

    setTimeout(() => {
      const loggedUser: UserProfile = {
        id: `${provider}-${Date.now()}`,
        name: account.name,
        email: account.email,
        avatar: account.avatar,
        cityId: selectedCity.id,
        cityName: selectedCity.name,
        joinedDate: new Date().toLocaleDateString('id-ID', { month: 'long', year: 'numeric' }),
        isLoggedIn: true,
        role: 'Member',
        authProvider: provider,
      };

      setStep('success');
      setTimeout(() => {
        setIsLoading(false);
        onSuccess(loggedUser);
      }, 700);
    }, 900);
  };

  const handleCustomSubmit = (e: React.FormEvent) => {
    e.preventDefault();
    if (!customEmail.trim()) return;

    const derivedName = customName.trim() || customEmail.split('@')[0];
    const formattedName = derivedName.charAt(0).toUpperCase() + derivedName.slice(1);

    handleSelectAccount({
      name: formattedName,
      email: customEmail.trim(),
      avatar: provider === 'google' ? '🧔' : provider === 'microsoft' ? '👨‍💼' : '⭐'
    });
  };

  return (
    <div className="fixed inset-0 z-50 flex items-center justify-center p-4 bg-black/75 backdrop-blur-sm animate-in fade-in duration-200">
      <div className="relative w-full max-w-md bg-white dark:bg-zinc-900 rounded-3xl shadow-2xl border border-stone-200 dark:border-zinc-800 overflow-hidden text-stone-900 dark:text-zinc-100 animate-in zoom-in-95 duration-200">
        {/* Header with Provider Branding */}
        <div className={`px-6 py-4 flex items-center justify-between ${config.headerColor}`}>
          <div className="flex items-center gap-2.5">
            {config.logo}
            <div>
              <h3 className="font-bold text-sm leading-tight">{config.title}</h3>
              <p className="text-[10px] opacity-75 font-mono">{config.brandName}</p>
            </div>
          </div>
          <button
            onClick={onClose}
            disabled={isLoading}
            className="p-1.5 rounded-full hover:bg-black/10 dark:hover:bg-white/10 transition-colors"
          >
            <X className="w-4 h-4" />
          </button>
        </div>

        {/* Content Body */}
        <div className="p-6 space-y-5">
          {step === 'authorizing' ? (
            <div className="py-8 text-center space-y-4">
              <div className="w-12 h-12 mx-auto rounded-full bg-emerald-50 dark:bg-emerald-950 flex items-center justify-center text-emerald-600 animate-spin">
                <RefreshCw className="w-6 h-6" />
              </div>
              <div>
                <h4 className="font-bold text-base">Menghubungkan ke {config.brandName}...</h4>
                <p className="text-xs text-stone-500 dark:text-zinc-400 mt-1">
                  Sinkronisasi profil syariah dan otorisasi sesi masuk aman.
                </p>
              </div>
            </div>
          ) : step === 'success' ? (
            <div className="py-8 text-center space-y-3">
              <div className="w-12 h-12 mx-auto rounded-full bg-emerald-500 text-white flex items-center justify-center">
                <CheckCircle2 className="w-7 h-7" />
              </div>
              <h4 className="font-bold text-lg text-emerald-600 dark:text-emerald-400">Otentikasi Berhasil!</h4>
              <p className="text-xs text-stone-600 dark:text-zinc-300">
                Ahlan wa Sahlan, selamat datang di NurMuslim.
              </p>
            </div>
          ) : (
            <>
              {/* Info Box */}
              <div className="p-3.5 rounded-2xl bg-stone-50 dark:bg-zinc-800/80 border border-stone-200 dark:border-zinc-700 flex items-start gap-3">
                <ShieldCheck className="w-5 h-5 text-emerald-600 dark:text-emerald-400 shrink-0 mt-0.5" />
                <div className="text-xs text-stone-600 dark:text-zinc-300 leading-relaxed">
                  <span className="font-semibold text-stone-900 dark:text-zinc-100">Single Sign-On Terverifikasi:</span>{' '}
                  {config.scopeNote}
                </div>
              </div>

              {!useCustomInput ? (
                /* Select from existing/detected accounts */
                <div className="space-y-3">
                  <p className="text-xs font-semibold text-stone-500 dark:text-zinc-400 uppercase tracking-wider">
                    Pilih Akun yang Tersedia
                  </p>

                  <div className="space-y-2">
                    {config.accounts.map((acc, idx) => (
                      <button
                        key={idx}
                        id={`oauth-acc-${provider}-${idx}`}
                        onClick={() => handleSelectAccount(acc)}
                        className="w-full p-3.5 rounded-2xl bg-stone-100/80 dark:bg-zinc-800 hover:bg-emerald-50 dark:hover:bg-emerald-950/40 border border-stone-200 dark:border-zinc-700 hover:border-emerald-500 dark:hover:border-emerald-600 flex items-center justify-between text-left transition-all group"
                      >
                        <div className="flex items-center gap-3">
                          <div className="w-10 h-10 rounded-xl bg-white dark:bg-zinc-700 flex items-center justify-center text-xl shadow-xs">
                            {acc.avatar}
                          </div>
                          <div>
                            <div className="font-bold text-sm text-stone-900 dark:text-zinc-100 group-hover:text-emerald-600 dark:group-hover:text-emerald-400">
                              {acc.name}
                            </div>
                            <div className="text-xs text-stone-500 dark:text-zinc-400 font-mono">
                              {acc.email}
                            </div>
                          </div>
                        </div>

                        <ArrowRight className="w-4 h-4 text-stone-400 group-hover:text-emerald-600 group-hover:translate-x-0.5 transition-all" />
                      </button>
                    ))}
                  </div>

                  {/* Switch to custom input */}
                  <button
                    onClick={() => setUseCustomInput(true)}
                    className="w-full text-center py-2 text-xs font-semibold text-emerald-600 dark:text-emerald-400 hover:underline flex items-center justify-center gap-1 mt-2"
                  >
                    <Mail className="w-3.5 h-3.5" />
                    <span>Gunakan Akun / Email Lain</span>
                  </button>
                </div>
              ) : (
                /* Custom email input for the provider */
                <form onSubmit={handleCustomSubmit} className="space-y-3">
                  <p className="text-xs font-semibold text-stone-500 dark:text-zinc-400 uppercase tracking-wider">
                    Ketik Akun {config.brandName}
                  </p>

                  <div className="space-y-2">
                    <div>
                      <label className="block text-xs font-medium text-stone-700 dark:text-zinc-300 mb-1">
                        Nama Lengkap (Opsional)
                      </label>
                      <input
                        type="text"
                        value={customName}
                        onChange={(e) => setCustomName(e.target.value)}
                        placeholder="e.g. Ahmad Raihan"
                        className="w-full px-3.5 py-2.5 rounded-xl bg-white dark:bg-zinc-800 border border-stone-300 dark:border-zinc-700 text-xs focus:outline-none focus:border-emerald-500"
                      />
                    </div>

                    <div>
                      <label className="block text-xs font-medium text-stone-700 dark:text-zinc-300 mb-1">
                        Alamat Email {provider === 'google' ? 'Google (@gmail.com)' : provider === 'microsoft' ? 'Microsoft (@outlook.com / Azure)' : 'Apple ID (@icloud.com)'}
                      </label>
                      <input
                        type="email"
                        required
                        value={customEmail}
                        onChange={(e) => setCustomEmail(e.target.value)}
                        placeholder={`nama@${provider === 'google' ? 'gmail.com' : provider === 'microsoft' ? 'outlook.com' : 'icloud.com'}`}
                        className="w-full px-3.5 py-2.5 rounded-xl bg-white dark:bg-zinc-800 border border-stone-300 dark:border-zinc-700 text-xs focus:outline-none focus:border-emerald-500 font-mono"
                      />
                    </div>
                  </div>

                  <div className="flex items-center gap-2 pt-2">
                    <button
                      type="button"
                      onClick={() => setUseCustomInput(false)}
                      className="flex-1 py-2.5 rounded-xl bg-stone-100 dark:bg-zinc-800 text-stone-700 dark:text-zinc-300 font-semibold text-xs hover:bg-stone-200"
                    >
                      Kembali
                    </button>
                    <button
                      type="submit"
                      className="flex-1 py-2.5 rounded-xl bg-emerald-600 hover:bg-emerald-700 text-white font-bold text-xs flex items-center justify-center gap-1.5 shadow-md shadow-emerald-700/20"
                    >
                      <Key className="w-3.5 h-3.5" />
                      <span>Masuk & Lanjutkan</span>
                    </button>
                  </div>
                </form>
              )}
            </>
          )}

          {/* Privacy & Syariah notice */}
          <div className="pt-2 border-t border-stone-100 dark:border-zinc-800 flex items-center justify-between text-[11px] text-stone-400">
            <span className="flex items-center gap-1">
              <Lock className="w-3 h-3 text-emerald-500" />
              Terkoneksi SSL 256-bit
            </span>
            <span>Kota: <strong>{selectedCity.name}</strong></span>
          </div>
        </div>
      </div>
    </div>
  );
};
