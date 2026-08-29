import { FullSurah, QuranVerse } from '../types';
import { ALL_SURAHS } from './surahList';

// Preloaded detailed verses for offline-ready popular surahs
export const PRELOADED_SURAHS: Record<number, FullSurah> = {
  1: {
    number: 1,
    name: 'الفاتحة',
    transliterationEn: 'Al-Fatihah',
    translationId: 'Pembukaan',
    totalVerses: 7,
    revelationType: 'Mekkah',
    juzNumber: 1,
    bismillah: {
      arabic: 'بِسْمِ اللَّهِ الرَّحْمَٰنِ الرَّحِيمِ',
      translationId: 'Dengan nama Allah Yang Maha Pengasih, Maha Penyayang.',
    },
    verses: [
      {
        number: 1,
        arabic: 'بِسْمِ اللَّهِ الرَّحْمَٰنِ الرَّحِيمِ',
        latin: 'Bismillāhir-raḥmānir-raḥīm',
        translationId: 'Dengan nama Allah Yang Maha Pengasih, Maha Penyayang.',
        tafsir: 'Memulai setiap perbuatan baik dengan menyebut nama Allah yang Maha Pengasih lagi Maha Penyayang.'
      },
      {
        number: 2,
        arabic: 'الْحَمْدُ لِلَّهِ رَبِّ الْعَالَمِينَ',
        latin: "Al-ḥamdu lillāhi rabbil-'ālamīn",
        translationId: 'Segala puji bagi Allah, Tuhan seluruh alam,',
        tafsir: 'Segala bentuk pujian dan sanjungan hanya berhak dipersembahkan kepada Allah Penguasa sekalian alam.'
      },
      {
        number: 3,
        arabic: 'الرَّحْمَٰنِ الرَّحِيمِ',
        latin: 'Ar-raḥmānir-raḥīm',
        translationId: 'Yang Maha Pengasih, Maha Penyayang,',
        tafsir: 'Rahmat-Nya meliputi segala sesuatu di dunia dan dikhususkan untuk orang-orang mukmin di akhirat.'
      },
      {
        number: 4,
        arabic: 'مَالِكِ يَوْمِ الدِّينِ',
        latin: 'Māliki yaumid-dīn',
        translationId: 'Pemilik hari pembalasan.',
        tafsir: 'Allah adalah satu-satunya Penguasa mutlak pada hari kiamat dan pembalasan amal manusia.'
      },
      {
        number: 5,
        arabic: 'إِيَّاكَ نَعْبُدُ وَإِيَّاكَ نَسْتَعِينُ',
        latin: 'Iyyāka na‘budu wa iyyāka nasta‘īn',
        translationId: 'Hanya kepada Engkaulah kami menyembah dan hanya kepada Engkaulah kami memohon pertolongan.',
        tafsir: 'Pernyataan tauhid ibadah dan tauhid isti\'anah, menafikan segala bentuk kesyirikan.'
      },
      {
        number: 6,
        arabic: 'اهْدِنَا الصِّرَاطَ الْمُسْتَقِيمَ',
        latin: 'Ihdinaṣ-ṣirāṭal-mustaqīm',
        translationId: 'Tunjukilah kami jalan yang lurus,',
        tafsir: 'Permohonan hidayah menuju jalan Islam yang lurus dan istiqomah di atasnya.'
      },
      {
        number: 7,
        arabic: 'صِرَاطَ الَّذِينَ أَنْعَمْتَ عَلَيْهِمْ غَيْرِ الْمَغْضُوبِ عَلَيْهِمْ وَلَا الضَّالِّينَ',
        latin: 'Ṣirāṭallażīna an‘amta ‘alaihim gairil-magḍūbi ‘alaihim wa laḍ-ḍāllīn',
        translationId: '(yaitu) jalan orang-orang yang telah Engkau beri nikmat kepadanya; bukan (jalan) mereka yang dimurkai, dan bukan (pula jalan) mereka yang sesat.',
        tafsir: 'Jalan para nabi, shiddiqin, syuhada, dan shalihin; bukan jalan orang yang mengetahui kebenaran namun meninggalkannya, atau yang tersesat tanpa ilmu.'
      },
    ],
  },

  18: {
    number: 18,
    name: 'الكهف',
    transliterationEn: 'Al-Kahf',
    translationId: 'Gua',
    totalVerses: 110,
    revelationType: 'Mekkah',
    juzNumber: 15,
    bismillah: {
      arabic: 'بِسْمِ اللَّهِ الرَّحْمَٰنِ الرَّحِيمِ',
      translationId: 'Dengan nama Allah Yang Maha Pengasih, Maha Penyayang.',
    },
    verses: [
      {
        number: 1,
        arabic: 'الْحَمْدُ لِلَّهِ الَّذِي أَنزَلَ عَلَىٰ عَبْدِهِ الْكِتَابَ وَلَمْ يَجْعَل لَّهُ عِوَجًا',
        latin: "Al-ḥamdu lillāhillażī anzala 'alā 'abdihil-kitāba wa lam yaj'al lahū 'iwajā",
        translationId: 'Segala puji bagi Allah yang telah menurunkan Kitab (Al-Qur\'an) kepada hamba-Nya dan Dia tidak menjadikannya bengkok;',
      },
      {
        number: 2,
        arabic: 'قَيِّمًا لِّيُنذِرَ بَأْسًا شَدِيدًا مِّن لَّدُنْهُ وَيُبَشِّرَ الْمُؤْمِنِينَ الَّذِينَ يَعْمَلُونَ الصَّالِحَاتِ أَنَّ لَهُمْ أَجْرًا حَسَنًا',
        latin: "Qayyimal liyunżira ba'san syadīdam mil ladun-hu wa yubasysyiral-mu'minīnallażīna ya'malūnaṣ-ṣāliḥāti anna lahum ajran ḥasanā",
        translationId: 'sebagai bimbingan yang lurus, untuk memperingatkan akan siksaan yang sangat pedih dari sisi-Nya dan memberikan kabar gembira kepada orang-orang mukmin yang mengerjakan kebajikan bahwa mereka akan mendapat balasan yang baik,',
      },
      {
        number: 3,
        arabic: 'مَّاكِثِينَ فِيهِ أَبَدًا',
        latin: 'Mākiṡīna fīhi abadā',
        translationId: 'mereka kekal di dalamnya untuk selama-lamanya.',
      },
      {
        number: 4,
        arabic: 'وَيُنذِرَ الَّذِينَ قَالُوا اتَّخَذَ اللَّهُ وَلَدًا',
        latin: "Wa yunżirallażīna qāluttaqażallāhu waladā",
        translationId: 'Dan untuk memperingatkan kepada orang yang berkata, "Allah mengambil seorang anak."',
      },
      {
        number: 5,
        arabic: 'مَّا لَهُم بِهِ مِنْ عِلْمٍ وَلَا لِآبَائِهِمْ ۚ كَبُرَتْ كَلِمَةً تَخْرُجُ مِنْ أَفْوَاهِهِمْ ۚ إِن يَقُولُونَ إِلَّا كَذِبًا',
        latin: "Mā lahum bihī min 'ilmiw wa lā li'ābā'ihim, kaburat kalimatan takhruju min afwāhihim, iy yaqūlūna illā każibā",
        translationId: 'Mereka sama sekali tidak mempunyai pengetahuan tentang hal itu, begitu pula nenek moyang mereka. Alangkah besarnya kata-kata yang keluar dari mulut mereka; mereka hanya mengatakan kebohongan belaka.',
      },
      {
        number: 10,
        arabic: 'إِذْ أَوَى الْفِتْيَةُ إِلَى الْكَهْفِ فَقَالُوا رَبَّنَا آتِنَا مِن لَّدُنكَ رَحْمَةً وَهَيِّئْ لَنَا مِنْ أَمْرِنَا رَشَدًا',
        latin: "Iż awal-fityatu ilal-kahfi fa qālū rabbanā ātinā mil ladunka raḥmataw wa hayyi' lanā min amrinā rasyadā",
        translationId: '(Ingatlah) ketika pemuda-pemuda itu berlindung ke dalam gua lalu mereka berdoa, "Ya Tuhan kami, berikanlah rahmat kepada kami dari sisi-Mu dan sempurnakanlah petunjuk yang lurus bagi kami dalam urusan kami."',
      },
      {
        number: 109,
        arabic: 'قُل لَّوْ كَانَ الْبَحْرُ مِدَادًا لِّكَلِمَاتِ رَبِّي لَنَفِدَ الْبَحْرُ قَبْلَ أَن تَنفَدَ كَلِمَاتُ رَبِّي وَلَوْ جِئْنَا بِمِثْلِهِ مَدَدًا',
        latin: "Qul lau kānal-baḥru midādal likalimāti rabbī lanafidal-baḥru qabla an tanfada kalimātu rabbī walau ji'nā bimiṡlihī madadā",
        translationId: 'Katakanlah (Muhammad), "Seandainya lautan menjadi tinta untuk (menulis) kalimat-kalimat Tuhanku, maka pasti habislah lautan itu sebelum habis (ditulis) kalimat-kalimat Tuhanku, meskipun Kami datangkan tambahan sebanyak itu (pula)."',
      },
      {
        number: 110,
        arabic: 'قُلْ إِنَّمَا أَنَا بَشَرٌ مِّثْلُكُمْ يُوحَىٰ إِلَيَّ أَنَّمَا إِلَٰهُكُمْ إِلَٰهٌ وَاحِدٌ ۖ فَمَن كَانَ يَرْجُو لِقَاءَ رَبِّهِ فَلْيَعْمَلْ عَمَلًا صَالِحًا وَلَا يُشْرِكْ بِعِبَادَةِ رَبِّهِ أَحَدًا',
        latin: "Qul innamā ana basyarum miṡlukum yūḥā ilayya annamā ilāhukum ilāhuw wāḥid, faman kāna yarjū liqā'a rabbihī falya'mal 'amalan ṣāliḥaw wa lā yusyrik bi'ibādati rabbihī aḥadā",
        translationId: 'Katakanlah (Muhammad), "Sesungguhnya aku ini hanya seorang manusia seperti kamu, yang telah diwahyukan kepadaku, bahwa sesungguhnya Tuhan kamu adalah Tuhan Yang Maha Esa." Maka barangsiapa mengharap pertemuan dengan Tuhannya maka hendaklah dia mengerjakan kebajikan dan janganlah dia mempersekutukan dengan sesuatu pun dalam beribadah kepada Tuhannya.',
      },
    ],
  },

  36: {
    number: 36,
    name: 'يس',
    transliterationEn: 'Yasin',
    translationId: 'Yasin',
    totalVerses: 83,
    revelationType: 'Mekkah',
    juzNumber: 22,
    bismillah: {
      arabic: 'بِسْمِ اللَّهِ الرَّحْمَٰنِ الرَّحِيمِ',
      translationId: 'Dengan nama Allah Yang Maha Pengasih, Maha Penyayang.',
    },
    verses: [
      {
        number: 1,
        arabic: 'يس',
        latin: 'Yā Sīn',
        translationId: 'Ya Sin.',
      },
      {
        number: 2,
        arabic: 'وَالْقُرْآنِ الْحَكِيمِ',
        latin: "Wal-qur'ānil-ḥakīm",
        translationId: 'Demi Al-Qur\'an yang penuh hikmah,',
      },
      {
        number: 3,
        arabic: 'إِنَّكَ لَمِنَ الْمُرْسَلِينَ',
        latin: 'Innaka laminal-mursalīn',
        translationId: 'sungguh, engkau (Muhammad) adalah salah seorang dari rasul-rasul,',
      },
      {
        number: 4,
        arabic: 'عَلَىٰ صِرَاطٍ مُّسْتَقِيمٍ',
        latin: "‘Alā ṣirāṭim mustaqīm",
        translationId: '(yang berada) di atas jalan yang lurus,',
      },
      {
        number: 5,
        arabic: 'تَنزِيلَ الْعَزِيزِ الرَّحِيمِ',
        latin: "Tanzīlal-'azīzir-raḥīm",
        translationId: '(sebagai wahyu) yang diturunkan oleh (Allah) Yang Mahaperkasa, Maha Penyayang,',
      },
      {
        number: 58,
        arabic: 'سَلَامٌ قَوْلًا مِّن رَّبٍّ رَّحِيمٍ',
        latin: "Salāmun qaulam mir rabbir raḥīm",
        translationId: '(Kepada mereka dikatakan), "Salam," sebagai ucapan selamat dari Tuhan Yang Maha Penyayang.',
      },
      {
        number: 82,
        arabic: 'إِنَّمَا أَمْرُهُ إِذَا أَرَادَ شَيْئًا أَن يَقُولَ لَهُ كُن فَيَكُونُ',
        latin: 'Innamā amruhū iżā arāda syai\'an ay yaqūla lahū kun fa yakūn',
        translationId: 'Sesungguhnya urusan-Nya apabila Dia menghendaki sesuatu hanyalah berkata kepadanya, "Jadilah!" Maka jadilah sesuatu itu.',
      },
      {
        number: 83,
        arabic: 'فَسُبْحَانَ الَّذِي بِيَدِهِ مَلَكُوتُ كُلِّ شَيْءٍ وَإِلَيْهِ تُرْجَعُونَ',
        latin: "Fa sub-ḥānallażī biyadihī malakūtu kulli syai'iw wa ilaihi turja'ūn",
        translationId: 'Maka Mahasuci (Allah) yang di tangan-Nya kekuasaan atas segala sesuatu dan kepada-Nya kamu dikembalikan.',
      },
    ],
  },

  67: {
    number: 67,
    name: 'الملك',
    transliterationEn: 'Al-Mulk',
    translationId: 'Kerajaan',
    totalVerses: 30,
    revelationType: 'Mekkah',
    juzNumber: 29,
    bismillah: {
      arabic: 'بِسْمِ اللَّهِ الرَّحْمَٰنِ الرَّحِيمِ',
      translationId: 'Dengan nama Allah Yang Maha Pengasih, Maha Penyayang.',
    },
    verses: [
      {
        number: 1,
        arabic: 'تَبَارَكَ الَّذِي بِيَدِهِ الْمُلْكُ وَهُوَ عَلَىٰ كُلِّ شَيْءٍ قَدِيرٌ',
        latin: "Tabārakallażī biyadihil-mulku wa huwa 'alā kulli syai'in qadīr",
        translationId: 'Mahasuci Allah yang menguasai (segala) kerajaan, dan Dia Mahakuasa atas segala sesuatu.',
      },
      {
        number: 2,
        arabic: 'الَّذِي خَلَقَ الْمَوْتَ وَالْحَيَاةَ لِيَبْلُوَكُمْ أَيُّكُمْ أَحْسَنُ عَمَلًا ۚ وَهُوَ الْعَزِيزُ الْغَفُورُ',
        latin: "Allażī khalaqal-mauta wal-ḥayāta liyabluwakum ayyukum aḥsanu 'amalā, wa huwal-'azīzul-gafūr",
        translationId: 'Yang menciptakan mati dan hidup, untuk menguji kamu, siapa di antara kamu yang lebih baik amalnya. Dan Dia Mahaperkasa, Maha Pengampun.',
      },
      {
        number: 3,
        arabic: 'الَّذِي خَلَقَ سَبْعَ سَمَاوَاتٍ طِبَاقًا ۖ مَّا تَرَىٰ فِي خَلْقِ الرَّحْمَٰنِ مِن تَفَاوُتٍ ۖ فَارْجِعِ الْبَصَرَ هَلْ تَرَىٰ مِن فُطُورٍ',
        latin: "Allażī khalaqa sab'a samāwātin ṭibāqā, mā tarā fī khalqir-raḥmāni min tafāwut, farji'il-baṣara hal tarā min fuṭūr",
        translationId: 'Yang menciptakan tujuh langit berlapis-lapis. Tidak akan kamu lihat sesuatu yang tidak seimbang pada ciptaan Tuhan Yang Maha Pengasih. Maka lihatlah sekali lagi, adakah kamu lihat sesuatu yang cacat?',
      },
      {
        number: 4,
        arabic: 'ثُمَّ ارْجِعِ الْبَصَرَ كَرَّتَيْنِ يَنقَلِبْ إِلَيْكَ الْبَصَرُ خَاسِئًا وَهُوَ حَسِيرٌ',
        latin: "Ṡummarji'il-baṣara karrataini yanqalib ilaikal-baṣaru khāsi'aw wa huwa ḥasīr",
        translationId: 'Kemudian ulangi pandanganmu dua kali lagi, niscaya pandanganmu akan kembali kepadamu tanpa menemukan cacat dan pandanganmu dalam keadaan letih.',
      },
    ],
  },

  112: {
    number: 112,
    name: 'الإخلاص',
    transliterationEn: 'Al-Ikhlas',
    translationId: 'Kemurnian Keesaan Allah',
    totalVerses: 4,
    revelationType: 'Mekkah',
    juzNumber: 30,
    bismillah: {
      arabic: 'بِسْمِ اللَّهِ الرَّحْمَٰنِ الرَّحِيمِ',
      translationId: 'Dengan nama Allah Yang Maha Pengasih, Maha Penyayang.',
    },
    verses: [
      {
        number: 1,
        arabic: 'قُلْ هُوَ اللَّهُ أَحَدٌ',
        latin: 'Qul huwallāhu aḥad',
        translationId: 'Katakanlah (Muhammad), "Dialah Allah, Yang Maha Esa."',
      },
      {
        number: 2,
        arabic: 'اللَّهُ الصَّمَدُ',
        latin: 'Allāhuṣ-ṣamad',
        translationId: 'Allah tempat meminta segala sesuatu.',
      },
      {
        number: 3,
        arabic: 'لَمْ يَلِدْ وَلَمْ يُولَدْ',
        latin: 'Lam yalid wa lam yūlad',
        translationId: '(Allah) tidak beranak dan tidak pula diperanakkan,',
      },
      {
        number: 4,
        arabic: 'وَلَمْ يَكُن لَّهُ كُفُوًا أَحَدٌ',
        latin: 'Wa lam yakul lahū kufuwan aḥad',
        translationId: 'dan tidak ada sesuatu yang setara dengan Dia.',
      },
    ],
  },

  113: {
    number: 113,
    name: 'الفلق',
    transliterationEn: 'Al-Falaq',
    translationId: 'Waktu Subuh',
    totalVerses: 5,
    revelationType: 'Mekkah',
    juzNumber: 30,
    bismillah: {
      arabic: 'بِسْمِ اللَّهِ الرَّحْمَٰنِ الرَّحِيمِ',
      translationId: 'Dengan nama Allah Yang Maha Pengasih, Maha Penyayang.',
    },
    verses: [
      {
        number: 1,
        arabic: 'قُلْ أَعُوذُ بِرَبِّ الْفَلَقِ',
        latin: 'Qul a‘ūżu birabbil-falaq',
        translationId: 'Katakanlah, "Aku berlindung kepada Tuhan yang menguasai subuh (fajar),',
      },
      {
        number: 2,
        arabic: 'مِن شَرِّ مَا خَلَقَ',
        latin: 'Min syarri mā khalaq',
        translationId: 'dari kejahatan (makhluk yang) Dia ciptakan,',
      },
      {
        number: 3,
        arabic: 'وَمِن شَرِّ غَاسِقٍ إِذَا وَقَبَ',
        latin: 'Wa min syarri gāsiqin iżā waqab',
        translationId: 'dan dari kejahatan malam apabila telah gelap gulita,',
      },
      {
        number: 4,
        arabic: 'وَمِن شَرِّ النَّفَّاثَاتِ فِي الْعُقَدِ',
        latin: 'Wa min syarrin-naffāṡāti fil-‘uqad',
        translationId: 'dan dari kejahatan (perempuan-perempuan) penyihir yang meniup pada buhul-buhul (talinya),',
      },
      {
        number: 5,
        arabic: 'وَمِن شَرِّ حَاسِدٍ إِذَا حَسَدَ',
        latin: 'Wa min syarri ḥāsidin iżā ḥasad',
        translationId: 'dan dari kejahatan orang yang dengki apabila dia dengki."',
      },
    ],
  },

  114: {
    number: 114,
    name: 'الناس',
    transliterationEn: 'An-Nas',
    translationId: 'Manusia',
    totalVerses: 6,
    revelationType: 'Mekkah',
    juzNumber: 30,
    bismillah: {
      arabic: 'بِسْمِ اللَّهِ الرَّحْمَٰنِ الرَّحِيمِ',
      translationId: 'Dengan nama Allah Yang Maha Pengasih, Maha Penyayang.',
    },
    verses: [
      {
        number: 1,
        arabic: 'قُلْ أَعُوذُ بِرَبِّ النَّاسِ',
        latin: 'Qul a‘ūżu birabbin-nās',
        translationId: 'Katakanlah, "Aku berlindung kepada Tuhannya manusia,',
      },
      {
        number: 2,
        arabic: 'مَلِكِ النَّاسِ',
        latin: 'Malikin-nās',
        translationId: 'Raja manusia,',
      },
      {
        number: 3,
        arabic: 'إِلَٰهِ النَّاسِ',
        latin: 'Ilāhin-nās',
        translationId: 'sembahan manusia,',
      },
      {
        number: 4,
        arabic: 'مِن شَرِّ الْوَسْوَاسِ الْخَنَّاسِ',
        latin: 'Min syarril-waswāsil-khannās',
        translationId: 'dari kejahatan (bisikan) setan yang bersembunyi,',
      },
      {
        number: 5,
        arabic: 'الَّذِي يُوَسْوِسُ فِي صُدُورِ النَّاسِ',
        latin: 'Allażī yuwaswisu fī ṣudūrin-nās',
        translationId: 'yang membisikkan (kejahatan) ke dalam dada manusia,',
      },
      {
        number: 6,
        arabic: 'مِنَ الْجِنَّةِ وَالنَّاسِ',
        latin: 'Minal-jinnati wan-nās',
        translationId: 'dari (golongan) jin dan manusia."',
      },
    ],
  },
};

// Memory cache for dynamically fetched surahs
const surahCache: Record<number, FullSurah> = { ...PRELOADED_SURAHS };

/**
 * Robust Surah fetcher supporting all 114 Surahs:
 * 1. Checks memory cache
 * 2. Checks browser localStorage
 * 3. Fetches from official fast Indonesian Quran API (EQuran / Quran.com API)
 * 4. Fallback to gracefully constructed surah data
 */
export async function getSurahDetails(surahNumber: number): Promise<FullSurah> {
  if (surahCache[surahNumber]) {
    return surahCache[surahNumber];
  }

  const meta = ALL_SURAHS.find(s => s.number === surahNumber) || {
    number: surahNumber,
    name: 'سورة',
    transliterationEn: `Surah ${surahNumber}`,
    translationId: `Surat ke-${surahNumber}`,
    totalVerses: 10,
    revelationType: 'Mekkah' as const,
    juzNumber: 1,
  };

  // Try local storage cache
  try {
    const local = localStorage.getItem(`nurmuslim_surah_${surahNumber}`);
    if (local) {
      const parsed = JSON.parse(local) as FullSurah;
      surahCache[surahNumber] = parsed;
      return parsed;
    }
  } catch (e) {
    console.warn('LocalStorage error reading surah:', e);
  }

  // Fetch from EQuran Open API (Kemenag Indonesia standard)
  try {
    const response = await fetch(`https://equran.nos.wjv-1.neo.id/api/v2/surat/${surahNumber}`);
    if (response.ok) {
      const data = await response.json();
      if (data && data.data) {
        const d = data.data;
        const verses: QuranVerse[] = (d.ayat || []).map((v: any) => ({
          number: v.nomorAyat || v.nomor,
          arabic: v.teksArab,
          latin: v.teksLatin,
          translationId: v.teksIndonesia,
          audioUrl: v.audio?.['05'] || v.audio?.['01'] || `https://verses.quran.com/Alafasy/mp3/${String(surahNumber).padStart(3, '0')}${String(v.nomorAyat || v.nomor).padStart(3, '0')}.mp3`,
        }));

        const result: FullSurah = {
          number: d.nomor,
          name: d.nama,
          transliterationEn: d.namaLatin,
          translationId: d.arti,
          totalVerses: d.jumlahAyat,
          revelationType: d.tempatTurun === 'Mekah' ? 'Mekkah' : 'Madinah',
          juzNumber: meta.juzNumber,
          bismillah: surahNumber !== 9 ? {
            arabic: 'بِسْمِ اللَّهِ الرَّحْمَٰنِ الرَّحِيمِ',
            translationId: 'Dengan nama Allah Yang Maha Pengasih, Maha Penyayang.',
          } : undefined,
          verses,
        };

        surahCache[surahNumber] = result;
        try {
          localStorage.setItem(`nurmuslim_surah_${surahNumber}`, JSON.stringify(result));
        } catch (_) {}
        return result;
      }
    }
  } catch (err) {
    console.warn(`Failed fetching surah ${surahNumber} from remote API, building placeholder`, err);
  }

  // Generate fallback structure if network is not available
  const fallbackVerses: QuranVerse[] = Array.from({ length: meta.totalVerses }, (_, i) => ({
    number: i + 1,
    arabic: `آيَةُ ${i + 1} مِنْ ${meta.name}`,
    latin: `Ayat ke-${i + 1} Surat ${meta.transliterationEn}`,
    translationId: `Terjemahan ayat ke-${i + 1} Surat ${meta.transliterationEn} (${meta.translationId}). Sambungkan ke internet untuk memuat teks lengkap mushaf Kemenag RI.`,
    audioUrl: `https://verses.quran.com/Alafasy/mp3/${String(surahNumber).padStart(3, '0')}${String(i + 1).padStart(3, '0')}.mp3`,
  }));

  const fallbackResult: FullSurah = {
    ...meta,
    bismillah: surahNumber !== 9 ? {
      arabic: 'بِسْمِ اللَّهِ الرَّحْمَٰنِ الرَّحِيمِ',
      translationId: 'Dengan nama Allah Yang Maha Pengasih, Maha Penyayang.',
    } : undefined,
    verses: fallbackVerses,
  };

  surahCache[surahNumber] = fallbackResult;
  return fallbackResult;
}
