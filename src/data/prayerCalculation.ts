import { CityLocation, PrayerTimeSchedule } from '../types';

export const INDONESIAN_CITIES: CityLocation[] = [
  // ==========================================
  // JAWA TENGAH - SEMUA 35 KABUPATEN & KOTA LENGKAP
  // ==========================================
  { id: 'tgl-kota', name: 'Kota Tegal', province: 'Jawa Tengah', latitude: -6.8694, longitude: 109.1402, timezone: 'WIB' },
  { id: 'tgl-kab', name: 'Kab. Tegal (Slawi)', province: 'Jawa Tengah', latitude: -6.9856, longitude: 109.1381, timezone: 'WIB' },
  { id: 'bbs', name: 'Kab. Brebes', province: 'Jawa Tengah', latitude: -6.8703, longitude: 109.0435, timezone: 'WIB' },
  { id: 'pml', name: 'Kab. Pemalang', province: 'Jawa Tengah', latitude: -6.8906, longitude: 109.3808, timezone: 'WIB' },
  { id: 'pkl-kota', name: 'Kota Pekalongan', province: 'Jawa Tengah', latitude: -6.8886, longitude: 109.6753, timezone: 'WIB' },
  { id: 'pkl-kab', name: 'Kab. Pekalongan (Kajen)', province: 'Jawa Tengah', latitude: -7.0315, longitude: 109.6015, timezone: 'WIB' },
  { id: 'btg', name: 'Kab. Batang', province: 'Jawa Tengah', latitude: -6.9084, longitude: 109.7303, timezone: 'WIB' },
  { id: 'smg-kota', name: 'Kota Semarang', province: 'Jawa Tengah', latitude: -6.9667, longitude: 110.4167, timezone: 'WIB' },
  { id: 'smg-kab', name: 'Kab. Semarang (Ungaran)', province: 'Jawa Tengah', latitude: -7.1396, longitude: 110.4039, timezone: 'WIB' },
  { id: 'slt', name: 'Kota Salatiga', province: 'Jawa Tengah', latitude: -7.3305, longitude: 110.5084, timezone: 'WIB' },
  { id: 'kdl', name: 'Kab. Kendal', province: 'Jawa Tengah', latitude: -6.9249, longitude: 110.2038, timezone: 'WIB' },
  { id: 'dmk', name: 'Kab. Demak', province: 'Jawa Tengah', latitude: -6.8944, longitude: 110.6386, timezone: 'WIB' },
  { id: 'kds', name: 'Kab. Kudus', province: 'Jawa Tengah', latitude: -6.8048, longitude: 110.8405, timezone: 'WIB' },
  { id: 'jpr', name: 'Kab. Jepara', province: 'Jawa Tengah', latitude: -6.5891, longitude: 110.6684, timezone: 'WIB' },
  { id: 'pti', name: 'Kab. Pati', province: 'Jawa Tengah', latitude: -6.7533, longitude: 111.0379, timezone: 'WIB' },
  { id: 'rbg', name: 'Kab. Rembang', province: 'Jawa Tengah', latitude: -6.7063, longitude: 111.3439, timezone: 'WIB' },
  { id: 'blr', name: 'Kab. Blora', province: 'Jawa Tengah', latitude: -6.9697, longitude: 111.4184, timezone: 'WIB' },
  { id: 'gbg', name: 'Kab. Grobogan (Purwodadi)', province: 'Jawa Tengah', latitude: -7.0869, longitude: 110.9169, timezone: 'WIB' },
  { id: 'slo', name: 'Kota Surakarta (Solo)', province: 'Jawa Tengah', latitude: -7.5755, longitude: 110.8243, timezone: 'WIB' },
  { id: 'byl', name: 'Kab. Boyolali', province: 'Jawa Tengah', latitude: -7.5333, longitude: 110.5964, timezone: 'WIB' },
  { id: 'klt', name: 'Kab. Klaten', province: 'Jawa Tengah', latitude: -7.7056, longitude: 110.6033, timezone: 'WIB' },
  { id: 'skh', name: 'Kab. Sukoharjo', province: 'Jawa Tengah', latitude: -7.6833, longitude: 110.8333, timezone: 'WIB' },
  { id: 'kra', name: 'Kab. Karanganyar', province: 'Jawa Tengah', latitude: -7.5964, longitude: 110.9511, timezone: 'WIB' },
  { id: 'wng', name: 'Kab. Wonogiri', province: 'Jawa Tengah', latitude: -7.8167, longitude: 110.9333, timezone: 'WIB' },
  { id: 'srn', name: 'Kab. Sragen', province: 'Jawa Tengah', latitude: -7.4278, longitude: 111.0219, timezone: 'WIB' },
  { id: 'mgl-kota', name: 'Kota Magelang', province: 'Jawa Tengah', latitude: -7.4706, longitude: 110.2178, timezone: 'WIB' },
  { id: 'mgl-kab', name: 'Kab. Magelang (Mungkid)', province: 'Jawa Tengah', latitude: -7.5833, longitude: 110.2333, timezone: 'WIB' },
  { id: 'tmg', name: 'Kab. Temanggung', province: 'Jawa Tengah', latitude: -7.3167, longitude: 110.1667, timezone: 'WIB' },
  { id: 'wsb', name: 'Kab. Wonosobo', province: 'Jawa Tengah', latitude: -7.3631, longitude: 110.0558, timezone: 'WIB' },
  { id: 'pwr', name: 'Kab. Purworejo', province: 'Jawa Tengah', latitude: -7.7167, longitude: 110.0167, timezone: 'WIB' },
  { id: 'kbm', name: 'Kab. Kebumen', province: 'Jawa Tengah', latitude: -7.6789, longitude: 109.6586, timezone: 'WIB' },
  { id: 'bms', name: 'Kab. Banyumas (Purwokerto)', province: 'Jawa Tengah', latitude: -7.4244, longitude: 109.2303, timezone: 'WIB' },
  { id: 'clc', name: 'Kab. Cilacap', province: 'Jawa Tengah', latitude: -7.7279, longitude: 109.0078, timezone: 'WIB' },
  { id: 'pbg', name: 'Kab. Purbalingga', province: 'Jawa Tengah', latitude: -7.3889, longitude: 109.3639, timezone: 'WIB' },
  { id: 'bjn', name: 'Kab. Banjarnegara', province: 'Jawa Tengah', latitude: -7.3986, longitude: 109.6972, timezone: 'WIB' },

  // ==========================================
  // DKI JAKARTA & BANTEN
  // ==========================================
  { id: 'jkt-pusat', name: 'Jakarta Pusat', province: 'DKI Jakarta', latitude: -6.1865, longitude: 106.8341, timezone: 'WIB' },
  { id: 'jkt-selatan', name: 'Jakarta Selatan', province: 'DKI Jakarta', latitude: -6.2615, longitude: 106.8106, timezone: 'WIB' },
  { id: 'jkt-timur', name: 'Jakarta Timur', province: 'DKI Jakarta', latitude: -6.2250, longitude: 106.9004, timezone: 'WIB' },
  { id: 'jkt-barat', name: 'Jakarta Barat', province: 'DKI Jakarta', latitude: -6.1683, longitude: 106.7589, timezone: 'WIB' },
  { id: 'jkt-utara', name: 'Jakarta Utara', province: 'DKI Jakarta', latitude: -6.1214, longitude: 106.8827, timezone: 'WIB' },
  { id: 'tng-kota', name: 'Kota Tangerang', province: 'Banten', latitude: -6.1783, longitude: 106.6319, timezone: 'WIB' },
  { id: 'tng-sel', name: 'Kota Tangerang Selatan', province: 'Banten', latitude: -6.2888, longitude: 106.7179, timezone: 'WIB' },
  { id: 'tng-kab', name: 'Kab. Tangerang (Tigaraksa)', province: 'Banten', latitude: -6.2736, longitude: 106.4716, timezone: 'WIB' },
  { id: 'srg-kota', name: 'Kota Serang', province: 'Banten', latitude: -6.1200, longitude: 106.1503, timezone: 'WIB' },
  { id: 'srg-kab', name: 'Kab. Serang', province: 'Banten', latitude: -6.0833, longitude: 106.0167, timezone: 'WIB' },
  { id: 'clg', name: 'Kota Cilegon', province: 'Banten', latitude: -6.0028, longitude: 106.0506, timezone: 'WIB' },
  { id: 'lbk', name: 'Kab. Lebak (Rangkasbitung)', province: 'Banten', latitude: -6.5494, longitude: 106.2492, timezone: 'WIB' },
  { id: 'pdg-btn', name: 'Kab. Pandeglang', province: 'Banten', latitude: -6.3086, longitude: 106.1067, timezone: 'WIB' },

  // ==========================================
  // JAWA BARAT
  // ==========================================
  { id: 'bdg-kota', name: 'Kota Bandung', province: 'Jawa Barat', latitude: -6.9175, longitude: 107.6191, timezone: 'WIB' },
  { id: 'bdg-kab', name: 'Kab. Bandung (Soreang)', province: 'Jawa Barat', latitude: -7.0252, longitude: 107.5197, timezone: 'WIB' },
  { id: 'kbb', name: 'Kab. Bandung Barat (Ngamprah)', province: 'Jawa Barat', latitude: -6.8644, longitude: 107.5028, timezone: 'WIB' },
  { id: 'cmh', name: 'Kota Cimahi', province: 'Jawa Barat', latitude: -6.8722, longitude: 107.5422, timezone: 'WIB' },
  { id: 'bgr-kota', name: 'Kota Bogor', province: 'Jawa Barat', latitude: -6.5971, longitude: 106.8060, timezone: 'WIB' },
  { id: 'bgr-kab', name: 'Kab. Bogor (Cibinong)', province: 'Jawa Barat', latitude: -6.4828, longitude: 106.8536, timezone: 'WIB' },
  { id: 'dpk', name: 'Kota Depok', province: 'Jawa Barat', latitude: -6.4025, longitude: 106.7942, timezone: 'WIB' },
  { id: 'bks-kota', name: 'Kota Bekasi', province: 'Jawa Barat', latitude: -6.2383, longitude: 106.9756, timezone: 'WIB' },
  { id: 'bks-kab', name: 'Kab. Bekasi (Cikarang)', province: 'Jawa Barat', latitude: -6.2625, longitude: 107.1517, timezone: 'WIB' },
  { id: 'crb-kota', name: 'Kota Cirebon', province: 'Jawa Barat', latitude: -6.7320, longitude: 108.5523, timezone: 'WIB' },
  { id: 'crb-kab', name: 'Kab. Cirebon (Sumber)', province: 'Jawa Barat', latitude: -6.7628, longitude: 108.4831, timezone: 'WIB' },
  { id: 'idm', name: 'Kab. Indramayu', province: 'Jawa Barat', latitude: -6.3264, longitude: 108.3200, timezone: 'WIB' },
  { id: 'mjl', name: 'Kab. Majalengka', province: 'Jawa Barat', latitude: -6.8361, longitude: 108.2278, timezone: 'WIB' },
  { id: 'kng', name: 'Kab. Kuningan', province: 'Jawa Barat', latitude: -6.9767, longitude: 108.4842, timezone: 'WIB' },
  { id: 'skb-kota', name: 'Kota Sukabumi', province: 'Jawa Barat', latitude: -6.9277, longitude: 106.9299, timezone: 'WIB' },
  { id: 'skb-kab', name: 'Kab. Sukabumi (Palabuhanratu)', province: 'Jawa Barat', latitude: -6.9875, longitude: 106.5417, timezone: 'WIB' },
  { id: 'cjr', name: 'Kab. Cianjur', province: 'Jawa Barat', latitude: -6.8222, longitude: 107.1394, timezone: 'WIB' },
  { id: 'krw', name: 'Kab. Karawang', province: 'Jawa Barat', latitude: -6.3056, longitude: 107.3056, timezone: 'WIB' },
  { id: 'pwk', name: 'Kab. Purwakarta', province: 'Jawa Barat', latitude: -6.5569, longitude: 107.4433, timezone: 'WIB' },
  { id: 'sbg', name: 'Kab. Subang', province: 'Jawa Barat', latitude: -6.5683, longitude: 107.7600, timezone: 'WIB' },
  { id: 'smd-jb', name: 'Kab. Sumedang', province: 'Jawa Barat', latitude: -6.8586, longitude: 107.9267, timezone: 'WIB' },
  { id: 'grt', name: 'Kab. Garut', province: 'Jawa Barat', latitude: -7.2278, longitude: 107.9086, timezone: 'WIB' },
  { id: 'tsm-kota', name: 'Kota Tasikmalaya', province: 'Jawa Barat', latitude: -7.3274, longitude: 108.2207, timezone: 'WIB' },
  { id: 'tsm-kab', name: 'Kab. Tasikmalaya (Singaparna)', province: 'Jawa Barat', latitude: -7.3533, longitude: 108.1103, timezone: 'WIB' },
  { id: 'cms', name: 'Kab. Ciamis', province: 'Jawa Barat', latitude: -7.3275, longitude: 108.3536, timezone: 'WIB' },
  { id: 'bjr-jb', name: 'Kota Banjar', province: 'Jawa Barat', latitude: -7.3683, longitude: 108.5333, timezone: 'WIB' },
  { id: 'pgd', name: 'Kab. Pangandaran', province: 'Jawa Barat', latitude: -7.6833, longitude: 108.6500, timezone: 'WIB' },

  // ==========================================
  // DI YOGYAKARTA
  // ==========================================
  { id: 'jog-kota', name: 'Kota Yogyakarta', province: 'DI Yogyakarta', latitude: -7.7956, longitude: 110.3695, timezone: 'WIB' },
  { id: 'slm', name: 'Kab. Sleman', province: 'DI Yogyakarta', latitude: -7.7167, longitude: 110.3556, timezone: 'WIB' },
  { id: 'btl', name: 'Kab. Bantul', province: 'DI Yogyakarta', latitude: -7.8897, longitude: 110.3289, timezone: 'WIB' },
  { id: 'gkd', name: 'Kab. Gunungkidul (Wonosari)', province: 'DI Yogyakarta', latitude: -7.9622, longitude: 110.6031, timezone: 'WIB' },
  { id: 'klp', name: 'Kab. Kulon Progo (Wates)', province: 'DI Yogyakarta', latitude: -7.8578, longitude: 110.1583, timezone: 'WIB' },

  // ==========================================
  // JAWA TIMUR
  // ==========================================
  { id: 'sby', name: 'Kota Surabaya', province: 'Jawa Timur', latitude: -7.2575, longitude: 112.7521, timezone: 'WIB' },
  { id: 'sda', name: 'Kab. Sidoarjo', province: 'Jawa Timur', latitude: -7.4478, longitude: 112.7183, timezone: 'WIB' },
  { id: 'grs', name: 'Kab. Gresik', province: 'Jawa Timur', latitude: -7.1564, longitude: 112.6558, timezone: 'WIB' },
  { id: 'mlg-kota', name: 'Kota Malang', province: 'Jawa Timur', latitude: -7.9666, longitude: 112.6326, timezone: 'WIB' },
  { id: 'mlg-kab', name: 'Kab. Malang (Kepanjen)', province: 'Jawa Timur', latitude: -8.1333, longitude: 112.5667, timezone: 'WIB' },
  { id: 'btu', name: 'Kota Batu', province: 'Jawa Timur', latitude: -7.8712, longitude: 112.5270, timezone: 'WIB' },
  { id: 'pas-kota', name: 'Kota Pasuruan', province: 'Jawa Timur', latitude: -7.6469, longitude: 112.9075, timezone: 'WIB' },
  { id: 'pas-kab', name: 'Kab. Pasuruan', province: 'Jawa Timur', latitude: -7.7000, longitude: 112.8333, timezone: 'WIB' },
  { id: 'pro-kota', name: 'Kota Probolinggo', province: 'Jawa Timur', latitude: -7.7544, longitude: 113.2158, timezone: 'WIB' },
  { id: 'pro-kab', name: 'Kab. Probolinggo (Kraksaan)', province: 'Jawa Timur', latitude: -7.7606, longitude: 113.4358, timezone: 'WIB' },
  { id: 'mjk-kota', name: 'Kota Mojokerto', province: 'Jawa Timur', latitude: -7.4725, longitude: 112.4339, timezone: 'WIB' },
  { id: 'mjk-kab', name: 'Kab. Mojokerto', province: 'Jawa Timur', latitude: -7.5500, longitude: 112.5000, timezone: 'WIB' },
  { id: 'jbg', name: 'Kab. Jombang', province: 'Jawa Timur', latitude: -7.5458, longitude: 112.2331, timezone: 'WIB' },
  { id: 'kdr-kota', name: 'Kota Kediri', province: 'Jawa Timur', latitude: -7.8167, longitude: 112.0167, timezone: 'WIB' },
  { id: 'kdr-kab', name: 'Kab. Kediri (Pare)', province: 'Jawa Timur', latitude: -7.7683, longitude: 112.1950, timezone: 'WIB' },
  { id: 'blt-kota', name: 'Kota Blitar', province: 'Jawa Timur', latitude: -8.0983, longitude: 112.1681, timezone: 'WIB' },
  { id: 'blt-kab', name: 'Kab. Blitar (Kanigoro)', province: 'Jawa Timur', latitude: -8.1311, longitude: 112.2153, timezone: 'WIB' },
  { id: 'mdn-jt-kota', name: 'Kota Madiun', province: 'Jawa Timur', latitude: -7.6298, longitude: 111.5239, timezone: 'WIB' },
  { id: 'mdn-jt-kab', name: 'Kab. Madiun (Caruban)', province: 'Jawa Timur', latitude: -7.5408, longitude: 111.6606, timezone: 'WIB' },
  { id: 'mgt', name: 'Kab. Magetan', province: 'Jawa Timur', latitude: -7.6536, longitude: 111.3283, timezone: 'WIB' },
  { id: 'ngw', name: 'Kab. Ngawi', province: 'Jawa Timur', latitude: -7.4042, longitude: 111.4447, timezone: 'WIB' },
  { id: 'pnr', name: 'Kab. Ponorogo', province: 'Jawa Timur', latitude: -7.8697, longitude: 111.4625, timezone: 'WIB' },
  { id: 'pct', name: 'Kab. Pacitan', province: 'Jawa Timur', latitude: -8.1883, longitude: 111.1072, timezone: 'WIB' },
  { id: 'tlg', name: 'Kab. Tulungagung', province: 'Jawa Timur', latitude: -8.0667, longitude: 111.9000, timezone: 'WIB' },
  { id: 'trg', name: 'Kab. Trenggalek', province: 'Jawa Timur', latitude: -8.0500, longitude: 111.7167, timezone: 'WIB' },
  { id: 'njk', name: 'Kab. Nganjuk', province: 'Jawa Timur', latitude: -7.6050, longitude: 111.9036, timezone: 'WIB' },
  { id: 'bjn-jt', name: 'Kab. Bojonegoro', province: 'Jawa Timur', latitude: -7.1500, longitude: 111.8817, timezone: 'WIB' },
  { id: 'tbn', name: 'Kab. Tuban', province: 'Jawa Timur', latitude: -6.8967, longitude: 112.0547, timezone: 'WIB' },
  { id: 'lmg', name: 'Kab. Lamongan', province: 'Jawa Timur', latitude: -7.1197, longitude: 112.4131, timezone: 'WIB' },
  { id: 'jbr', name: 'Kab. Jember', province: 'Jawa Timur', latitude: -8.1724, longitude: 113.7007, timezone: 'WIB' },
  { id: 'lmj', name: 'Kab. Lumajang', province: 'Jawa Timur', latitude: -8.1333, longitude: 113.2167, timezone: 'WIB' },
  { id: 'bwo', name: 'Kab. Bondowoso', province: 'Jawa Timur', latitude: -7.9133, longitude: 113.8214, timezone: 'WIB' },
  { id: 'stb', name: 'Kab. Situbondo', province: 'Jawa Timur', latitude: -7.7064, longitude: 114.0044, timezone: 'WIB' },
  { id: 'bwi', name: 'Kab. Banyuwangi', province: 'Jawa Timur', latitude: -8.2192, longitude: 114.3691, timezone: 'WIB' },
  { id: 'bkl', name: 'Kab. Bangkalan (Madura)', province: 'Jawa Timur', latitude: -7.0306, longitude: 112.7486, timezone: 'WIB' },
  { id: 'spg', name: 'Kab. Sampang (Madura)', province: 'Jawa Timur', latitude: -7.1872, longitude: 113.2394, timezone: 'WIB' },
  { id: 'pmk', name: 'Kab. Pamekasan (Madura)', province: 'Jawa Timur', latitude: -7.1606, longitude: 113.4739, timezone: 'WIB' },
  { id: 'smn', name: 'Kab. Sumenep (Madura)', province: 'Jawa Timur', latitude: -7.0167, longitude: 113.8667, timezone: 'WIB' },

  // ==========================================
  // SUMATERA LENGKAP
  // ==========================================
  { id: 'ach', name: 'Kota Banda Aceh', province: 'Aceh', latitude: 5.5483, longitude: 95.3238, timezone: 'WIB' },
  { id: 'lsm', name: 'Kota Lhokseumawe', province: 'Aceh', latitude: 5.1804, longitude: 97.1397, timezone: 'WIB' },
  { id: 'lgs', name: 'Kota Langsa', province: 'Aceh', latitude: 4.4719, longitude: 97.9683, timezone: 'WIB' },
  { id: 'sbg-ach', name: 'Kota Sabang', province: 'Aceh', latitude: 5.8906, longitude: 95.3208, timezone: 'WIB' },
  { id: 'mlb', name: 'Kab. Aceh Barat (Meulaboh)', province: 'Aceh', latitude: 4.1450, longitude: 96.1286, timezone: 'WIB' },
  { id: 'mdn', name: 'Kota Medan', province: 'Sumatera Utara', latitude: 3.5952, longitude: 98.6722, timezone: 'WIB' },
  { id: 'bnj', name: 'Kota Binjai', province: 'Sumatera Utara', latitude: 3.6000, longitude: 98.4833, timezone: 'WIB' },
  { id: 'pms', name: 'Kota Pematangsiantar', province: 'Sumatera Utara', latitude: 2.9583, longitude: 99.0667, timezone: 'WIB' },
  { id: 'tbt', name: 'Kota Tebing Tinggi', province: 'Sumatera Utara', latitude: 3.3286, longitude: 99.1625, timezone: 'WIB' },
  { id: 'sbg-su', name: 'Kota Sibolga', province: 'Sumatera Utara', latitude: 1.7428, longitude: 98.7792, timezone: 'WIB' },
  { id: 'pdg-su', name: 'Kota Padangsidimpuan', province: 'Sumatera Utara', latitude: 1.3739, longitude: 99.2731, timezone: 'WIB' },
  { id: 'pdg', name: 'Kota Padang', province: 'Sumatera Barat', latitude: -0.9471, longitude: 100.4172, timezone: 'WIB' },
  { id: 'bkt', name: 'Kota Bukittinggi', province: 'Sumatera Barat', latitude: -0.3056, longitude: 100.3692, timezone: 'WIB' },
  { id: 'pyk', name: 'Kota Payakumbuh', province: 'Sumatera Barat', latitude: -0.2239, longitude: 100.6308, timezone: 'WIB' },
  { id: 'slk', name: 'Kota Solok', province: 'Sumatera Barat', latitude: -0.7989, longitude: 100.6558, timezone: 'WIB' },
  { id: 'pku', name: 'Kota Pekanbaru', province: 'Riau', latitude: 0.5071, longitude: 101.4478, timezone: 'WIB' },
  { id: 'dmi', name: 'Kota Dumai', province: 'Riau', latitude: 1.6667, longitude: 101.4500, timezone: 'WIB' },
  { id: 'btm', name: 'Kota Batam', province: 'Kepulauan Riau', latitude: 1.1301, longitude: 104.0529, timezone: 'WIB' },
  { id: 'tpg', name: 'Kota Tanjungpinang', province: 'Kepulauan Riau', latitude: 0.9167, longitude: 104.4500, timezone: 'WIB' },
  { id: 'krm', name: 'Kab. Karimun (Tanjung Balai)', province: 'Kepulauan Riau', latitude: 0.9933, longitude: 103.4300, timezone: 'WIB' },
  { id: 'jmb', name: 'Kota Jambi', province: 'Jambi', latitude: -1.6101, longitude: 103.6131, timezone: 'WIB' },
  { id: 'spn', name: 'Kota Sungai Penuh', province: 'Jambi', latitude: -2.0592, longitude: 101.3931, timezone: 'WIB' },
  { id: 'plb', name: 'Kota Palembang', province: 'Sumatera Selatan', latitude: -2.9909, longitude: 104.7565, timezone: 'WIB' },
  { id: 'pbm', name: 'Kota Prabumulih', province: 'Sumatera Selatan', latitude: -3.4319, longitude: 104.2347, timezone: 'WIB' },
  { id: 'llg', name: 'Kota Lubuklinggau', province: 'Sumatera Selatan', latitude: -3.2953, longitude: 102.8617, timezone: 'WIB' },
  { id: 'bkl-kota', name: 'Kota Bengkulu', province: 'Bengkulu', latitude: -3.7956, longitude: 102.2592, timezone: 'WIB' },
  { id: 'pkp', name: 'Kota Pangkalpinang', province: 'Bangka Belitung', latitude: -2.1333, longitude: 106.1167, timezone: 'WIB' },
  { id: 'bdl', name: 'Kota Bandar Lampung', province: 'Lampung', latitude: -5.4500, longitude: 105.2667, timezone: 'WIB' },
  { id: 'mtr', name: 'Kota Metro', province: 'Lampung', latitude: -5.1133, longitude: 105.3067, timezone: 'WIB' },

  // ==========================================
  // KALIMANTAN LENGKAP
  // ==========================================
  { id: 'ptk', name: 'Kota Pontianak', province: 'Kalimantan Barat', latitude: -0.0263, longitude: 109.3425, timezone: 'WIB' },
  { id: 'skw', name: 'Kota Singkawang', province: 'Kalimantan Barat', latitude: 0.9078, longitude: 108.9867, timezone: 'WIB' },
  { id: 'pkr', name: 'Kota Palangka Raya', province: 'Kalimantan Tengah', latitude: -2.2161, longitude: 113.9139, timezone: 'WIB' },
  { id: 'spt', name: 'Kab. Kotawaringin Timur (Sampit)', province: 'Kalimantan Tengah', latitude: -2.5333, longitude: 112.9500, timezone: 'WIB' },
  { id: 'bjm', name: 'Kota Banjarmasin', province: 'Kalimantan Selatan', latitude: -3.3194, longitude: 114.5908, timezone: 'WITA' },
  { id: 'bjb', name: 'Kota Banjarbaru', province: 'Kalimantan Selatan', latitude: -3.4400, longitude: 114.8300, timezone: 'WITA' },
  { id: 'mtp', name: 'Kab. Banjar (Martapura)', province: 'Kalimantan Selatan', latitude: -3.4167, longitude: 114.8500, timezone: 'WITA' },
  { id: 'smd', name: 'Kota Samarinda', province: 'Kalimantan Timur', latitude: -0.5022, longitude: 117.1536, timezone: 'WITA' },
  { id: 'bkp', name: 'Kota Balikpapan', province: 'Kalimantan Timur', latitude: -1.2379, longitude: 116.8289, timezone: 'WITA' },
  { id: 'btg-kt', name: 'Kota Bontang', province: 'Kalimantan Timur', latitude: 0.1333, longitude: 117.5000, timezone: 'WITA' },
  { id: 'tgr', name: 'Kab. Kutai Kartanegara (Tenggarong)', province: 'Kalimantan Timur', latitude: -0.4167, longitude: 116.9833, timezone: 'WITA' },
  { id: 'trk', name: 'Kota Tarakan', province: 'Kalimantan Utara', latitude: 3.3000, longitude: 117.6333, timezone: 'WITA' },
  { id: 'tjs', name: 'Kab. Bulungan (Tanjung Selor)', province: 'Kalimantan Utara', latitude: 2.8392, longitude: 117.3653, timezone: 'WITA' },

  // ==========================================
  // SULAWESI LENGKAP
  // ==========================================
  { id: 'mks', name: 'Kota Makassar', province: 'Sulawesi Selatan', latitude: -5.1477, longitude: 119.4327, timezone: 'WITA' },
  { id: 'prp', name: 'Kota Parepare', province: 'Sulawesi Selatan', latitude: -4.0133, longitude: 119.6250, timezone: 'WITA' },
  { id: 'plp', name: 'Kota Palopo', province: 'Sulawesi Selatan', latitude: -2.9944, longitude: 120.1969, timezone: 'WITA' },
  { id: 'gwa', name: 'Kab. Gowa (Sungguminasa)', province: 'Sulawesi Selatan', latitude: -5.2000, longitude: 119.4500, timezone: 'WITA' },
  { id: 'mrs', name: 'Kab. Maros', province: 'Sulawesi Selatan', latitude: -5.0044, longitude: 119.5750, timezone: 'WITA' },
  { id: 'mnd', name: 'Kota Manado', province: 'Sulawesi Utara', latitude: 1.4748, longitude: 124.8421, timezone: 'WITA' },
  { id: 'btg-su', name: 'Kota Bitung', province: 'Sulawesi Utara', latitude: 1.4450, longitude: 125.1889, timezone: 'WITA' },
  { id: 'plu', name: 'Kota Palu', province: 'Sulawesi Tengah', latitude: -0.8917, longitude: 119.8707, timezone: 'WITA' },
  { id: 'kdi', name: 'Kota Kendari', province: 'Sulawesi Tenggara', latitude: -3.9985, longitude: 122.5126, timezone: 'WITA' },
  { id: 'bbu', name: 'Kota Baubau', province: 'Sulawesi Tenggara', latitude: -5.4633, longitude: 122.6014, timezone: 'WITA' },
  { id: 'gtl', name: 'Kota Gorontalo', province: 'Gorontalo', latitude: 0.5435, longitude: 123.0568, timezone: 'WITA' },
  { id: 'mmj', name: 'Kab. Mamuju', province: 'Sulawesi Barat', latitude: -2.6748, longitude: 118.8889, timezone: 'WITA' },

  // ==========================================
  // BALI & NUSA TENGGARA
  // ==========================================
  { id: 'dps', name: 'Kota Denpasar', province: 'Bali', latitude: -8.6705, longitude: 115.2126, timezone: 'WITA' },
  { id: 'bdg-bali', name: 'Kab. Badung (Mangupura)', province: 'Bali', latitude: -8.5833, longitude: 115.1833, timezone: 'WITA' },
  { id: 'mtm', name: 'Kota Mataram (Lombok)', province: 'Nusa Tenggara Barat', latitude: -8.5833, longitude: 116.1167, timezone: 'WITA' },
  { id: 'bma', name: 'Kota Bima', province: 'Nusa Tenggara Barat', latitude: -8.4550, longitude: 118.7278, timezone: 'WITA' },
  { id: 'kpg', name: 'Kota Kupang', province: 'Nusa Tenggara Timur', latitude: -10.1772, longitude: 123.6070, timezone: 'WITA' },
  { id: 'lbj', name: 'Labuan Bajo (Manggarai Barat)', province: 'Nusa Tenggara Timur', latitude: -8.4964, longitude: 119.8877, timezone: 'WITA' },

  // ==========================================
  // MALUKU & PAPUA
  // ==========================================
  { id: 'amb', name: 'Kota Ambon', province: 'Maluku', latitude: -3.6547, longitude: 128.1906, timezone: 'WIT' },
  { id: 'tnt', name: 'Kota Ternate', province: 'Maluku Utara', latitude: 0.7900, longitude: 127.3800, timezone: 'WIT' },
  { id: 'jyp', name: 'Kota Jayapura', province: 'Papua', latitude: -2.5916, longitude: 140.6690, timezone: 'WIT' },
  { id: 'sor', name: 'Kota Sorong', province: 'Papua Barat Daya', latitude: -0.8762, longitude: 131.2558, timezone: 'WIT' },
  { id: 'mnk', name: 'Kab. Manokwari', province: 'Papua Barat', latitude: -0.8615, longitude: 134.0620, timezone: 'WIT' },
  { id: 'mrk', name: 'Kab. Merauke', province: 'Papua Selatan', latitude: -8.4991, longitude: 140.4011, timezone: 'WIT' },
  { id: 'tmk', name: 'Kab. Mimika (Timika)', province: 'Papua Tengah', latitude: -4.5467, longitude: 136.8837, timezone: 'WIT' },
  { id: 'bik', name: 'Kab. Biak Numfor', province: 'Papua', latitude: -1.1833, longitude: 136.0833, timezone: 'WIT' },
];

/**
 * Calculates Qibla direction (angle from North in degrees)
 * Kaaba Coordinates: Latitude 21.422487, Longitude 39.826206
 */
export function calculateQiblaAngle(lat: number, lng: number): number {
  const kaabaLat = (21.422487 * Math.PI) / 180;
  const kaabaLng = (39.826206 * Math.PI) / 180;
  const myLat = (lat * Math.PI) / 180;
  const myLng = (lng * Math.PI) / 180;

  const dLng = kaabaLng - myLng;
  const y = Math.sin(dLng);
  const x = Math.cos(myLat) * Math.tan(kaabaLat) - Math.sin(myLat) * Math.cos(dLng);
  let qibla = (Math.atan2(y, x) * 180) / Math.PI;
  if (qibla < 0) {
    qibla += 360;
  }
  return Math.round(qibla * 10) / 10;
}

/**
 * Calculates distance to Kaaba in kilometers
 */
export function calculateDistanceToKaaba(lat: number, lng: number): number {
  const R = 6371; // Earth's radius in km
  const kaabaLat = (21.422487 * Math.PI) / 180;
  const kaabaLng = (39.826206 * Math.PI) / 180;
  const dLat = ((21.422487 - lat) * Math.PI) / 180;
  const dLng = ((39.826206 - lng) * Math.PI) / 180;

  const a =
    Math.sin(dLat / 2) * Math.sin(dLat / 2) +
    Math.cos((lat * Math.PI) / 180) * Math.cos(kaabaLat) *
    Math.sin(dLng / 2) * Math.sin(dLng / 2);
  const c = 2 * Math.atan2(Math.sqrt(a), Math.sqrt(1 - a));
  return Math.round(R * c);
}

/**
 * Calculates accurate astronomical prayer times (Kemenag standard: Subuh 20°, Isya 18°)
 * Dynamically adjusts to any year, month, and day given by the date parameter!
 */
export function calculatePrayerTimes(
  lat: number,
  lng: number,
  timezoneOffsetHours: number = 7, // Default WIB = UTC+7
  date: Date = new Date()
): PrayerTimeSchedule {
  // Day of the year calculation (1 to 365/366)
  const startOfYear = new Date(date.getFullYear(), 0, 1);
  const diffTime = date.getTime() - startOfYear.getTime();
  const dayOfYear = Math.floor(diffTime / (1000 * 60 * 60 * 24)) + 1;

  // Fractional year in radians
  const gamma = (2 * Math.PI * (dayOfYear - 1)) / 365;

  // Solar declination (Spencer 1971 formula)
  const declination =
    0.006918 -
    0.399912 * Math.cos(gamma) +
    0.070257 * Math.sin(gamma) -
    0.006758 * Math.cos(2 * gamma) +
    0.000907 * Math.sin(2 * gamma) -
    0.002697 * Math.cos(3 * gamma) +
    0.001480 * Math.sin(3 * gamma);

  // Equation of time in minutes
  const eqTime =
    229.18 *
    (0.000075 +
      0.001868 * Math.cos(gamma) -
      0.032077 * Math.sin(gamma) -
      0.014615 * Math.cos(2 * gamma) -
      0.040849 * Math.sin(2 * gamma));

  const latRad = (lat * Math.PI) / 180;
  const decRad = declination;

  // Solar noon in local decimal hours (UTC + offset)
  const solarNoon = 12 + timezoneOffsetHours - lng / 15 - eqTime / 60;

  // Helper for Sun hour angle given altitude angle alpha
  function hourAngle(alphaDeg: number): number {
    const alphaRad = (alphaDeg * Math.PI) / 180;
    const cosHA = (Math.sin(alphaRad) - Math.sin(latRad) * Math.sin(decRad)) / (Math.cos(latRad) * Math.cos(decRad));
    if (cosHA > 1) return 0;
    if (cosHA < -1) return Math.PI;
    return Math.acos(cosHA);
  }

  // Indonesian Kemenag Standards: Subuh = -20°, Isya = -18°, Sunrise/Sunset = -0.833°
  const haSubuh = hourAngle(-20);
  const haSunrise = hourAngle(-0.833);
  const haIsya = hourAngle(-18);

  // Ashar: Shafi'i formula: shadow length = 1 + shadow at noon
  const noonSunAlt = Math.PI / 2 - Math.abs(latRad - decRad);
  const asharAlt = Math.atan(1 / (1 + 1 / Math.tan(noonSunAlt))) * (180 / Math.PI);
  const haAshar = hourAngle(asharAlt);

  const subuhHours = solarNoon - (haSubuh * 180) / Math.PI / 15;
  const sunriseHours = solarNoon - (haSunrise * 180) / Math.PI / 15;
  const dzuhurHours = solarNoon + 2.5 / 60; // 2.5 mins ihtiyat (kehati-hatian)
  const asharHours = solarNoon + (haAshar * 180) / Math.PI / 15 + 2 / 60;
  const sunsetHours = solarNoon + (haSunrise * 180) / Math.PI / 15 + 2 / 60;
  const isyaHours = solarNoon + (haIsya * 180) / Math.PI / 15 + 2 / 60;

  const imsakHours = subuhHours - 10 / 60; // 10 menit sebelum Subuh
  const dhuhaHours = sunriseHours + 25 / 60; // ~25 menit setelah terbit matahari

  function formatTime(decimalHours: number): string {
    let normalized = decimalHours % 24;
    if (normalized < 0) normalized += 24;
    const hours = Math.floor(normalized);
    const mins = Math.floor((normalized - hours) * 60);
    return `${String(hours).padStart(2, '0')}:${String(mins).padStart(2, '0')}`;
  }

  // Indonesian Hijri Date Approximation
  const hijriMonths = [
    'Muharram', 'Safar', "Rabi'ul Awwal", "Rabi'ul Akhir",
    'Jumadil Ula', 'Jumadil Akhira', 'Rajab', "Sya'ban",
    'Ramadhan', 'Syawwal', "Dzulqa'dah", 'Dzulhijjah'
  ];

  // Hijri date computation
  const gDay = date.getDate();
  const gMonth = date.getMonth();
  const gYear = date.getFullYear();

  // Julian Day to Hijri conversion
  let jd = Math.floor((1461 * (gYear + 4800 + Math.floor((gMonth - 13) / 12))) / 4) +
    Math.floor((367 * (gMonth - 1 - 12 * Math.floor((gMonth - 13) / 12))) / 12) -
    Math.floor((3 * Math.floor((gYear + 4900 + Math.floor((gMonth - 13) / 12)) / 100)) / 4) +
    gDay - 32075;

  let l = jd - 1948440 + 10632;
  let n = Math.floor((l - 1) / 10631);
  l = l - 10631 * n + 354;
  let j = (Math.floor((10985 - l) / 5316)) * (Math.floor((50 * l) / 17719)) + (Math.floor(l / 5670)) * (Math.floor((43 * l) / 15238));
  l = l - (Math.floor((30 - j) / 15)) * (Math.floor((17719 * j) / 50)) - (Math.floor(j / 16)) * (Math.floor((15238 * j) / 43)) + 29;
  let hMonth = Math.floor((24 * l) / 709);
  let hDay = l - Math.floor((709 * hMonth) / 24);
  let hYear = 30 * n + j - 30;

  const hijriStr = `${hDay} ${hijriMonths[hMonth - 1] || 'Ramadhan'} ${hYear} H`;

  const dateOptions: Intl.DateTimeFormatOptions = { weekday: 'long', day: 'numeric', month: 'long', year: 'numeric' };
  const formattedDate = date.toLocaleDateString('id-ID', dateOptions);

  return {
    imsak: formatTime(imsakHours),
    subuh: formatTime(subuhHours),
    terbit: formatTime(sunriseHours),
    dhuha: formatTime(dhuhaHours),
    dzuhur: formatTime(dzuhurHours),
    ashar: formatTime(asharHours),
    maghrib: formatTime(sunsetHours),
    isya: formatTime(isyaHours),
    date: formattedDate,
    hijriDate: hijriStr,
  };
}

/**
 * Play Adzan tone or audio
 */
export function playAdzanChime(): void {
  try {
    const audioCtx = new (window.AudioContext || (window as any).webkitAudioContext)();
    const notes = [440, 493.88, 554.37, 659.25, 739.99]; // A, B, C#, E, F# (Hijaz spiritual scale)
    let startTime = audioCtx.currentTime;

    notes.forEach((freq, idx) => {
      const osc = audioCtx.createOscillator();
      const gain = audioCtx.createGain();
      osc.type = 'sine';
      osc.frequency.setValueAtTime(freq, startTime + idx * 0.4);
      gain.gain.setValueAtTime(0.01, startTime + idx * 0.4);
      gain.gain.exponentialRampToValueAtTime(0.3, startTime + idx * 0.4 + 0.05);
      gain.gain.exponentialRampToValueAtTime(0.001, startTime + idx * 0.4 + 0.38);
      osc.connect(gain);
      gain.connect(audioCtx.destination);
      osc.start(startTime + idx * 0.4);
      osc.stop(startTime + idx * 0.4 + 0.4);
    });
  } catch (e) {
    console.log('Web Audio tone preview not supported on this device:', e);
  }
}
