export interface TopicNote {
  id: string;
  titleHi: string;
  titleEn: string;
  icon: string;
  summaryHi: string;
  summaryEn: string;
  keyPointsHi: string[];
  keyPointsEn: string[];
  examTipsHi: string;
  examTipsEn: string;
}

export interface EraSection {
  id: string;
  eraHi: string;
  eraEn: string;
  icon: string;
  descriptionHi: string;
  descriptionEn: string;
  topics: TopicNote[];
}

export const REVISION_NOTES: EraSection[] = [
  {
    id: 'ancient',
    eraHi: 'प्राचीन भारत (Ancient India)',
    eraEn: 'Ancient India',
    icon: '🏺',
    descriptionHi: 'सिंधु घाटी सभ्यता से लेकर गुप्त एवं वर्धन साम्राज्य तक का गौरवशाली इतिहास।',
    descriptionEn: 'From Indus Valley Civilization to Gupta and Vardhana Dynasties.',
    topics: [
      {
        id: 'indus_valley',
        titleHi: '1. सिंधु घाटी सभ्यता (हड़प्पा सभ्यता)',
        titleEn: '1. Indus Valley Civilization',
        icon: '🧱',
        summaryHi: 'कांस्य युगीन नगरीय सभ्यता (लगभग 2500 - 1750 ई.पू.) जो अपनी ग्रिड प्रणाली और जल निकासी के लिए प्रसिद्ध थी।',
        summaryEn: 'Bronze Age urban civilization known for grid planning, drainage systems, and granaries.',
        keyPointsHi: [
          'हड़प्पा (1921): दयाराम साहनी द्वारा रावी नदी तट पर उत्खनित।',
          'मोहनजोदड़ो (1922): राखालदास बनर्जी द्वारा सिंधु नदी तट पर। विशाल स्नानागार (Great Bath) व नर्तकी की कांस्य मूर्ति प्राप्त।',
          'लोथल (गुजरात): भोगवा नदी तट पर स्थित प्रमुख गोदीवाड़ा (डॉकयार्ड) व मनके बनाने का कारखाना।',
          'कालीबंगा (राजस्थान): घग्घर नदी तट पर जूते हुए खेत (ploughed field) तथा अग्निकुंड के साक्ष्य।',
          'धौलावीरा (गुजरात): उन्नत जल प्रबंधन प्रणाली और तीन भागों (दुर्ग, मध्यम नगर, निचला नगर) में विभाजित।'
        ],
        keyPointsEn: [
          'Harappa (1921): Discovered by Dayaram Sahni on the banks of river Ravi.',
          'Mohenjo-daro (1922): Excavated by R.D. Banerjee. Famous for Great Bath, Granary, and Bronze Dancing Girl.',
          'Lothal (Gujarat): Ancient tidal dockyard on the Bhogava river with bead factories.',
          'Kalibangan (Rajasthan): Evidence of ploughed fields and fire altars on Ghaggar river.',
          'Dholavira (Gujarat): Famous for water reservoir systems and unique three-part town planning.'
        ],
        examTipsHi: 'परीक्षा टिप: सिंधु सभ्यता के लोग लोहे (Iron) और घोड़ों के नियमित उपयोग से परिचित नहीं थे; यह एक शांतिप्रिय व्यापारिक सभ्यता थी।',
        examTipsEn: 'Exam Tip: Harappan people were not familiar with iron; copper, bronze, and terracotta were predominantly used.'
      },
      {
        id: 'vedic_period',
        titleHi: '2. वैदिक काल एवं दर्शन',
        titleEn: '2. Vedic Age & Philosophy',
        icon: '📜',
        summaryHi: 'ऋग्वैदिक काल (1500-1000 ई.पू.) तथा उत्तर वैदिक काल (1000-600 ई.पू.) में वेदों, उपनिषदों और आश्रम व्यवस्था का विकास।',
        summaryEn: 'Early (1500–1000 BCE) and Later Vedic (1000–600 BCE) periods, Vedas, and Upanishads.',
        keyPointsHi: [
          'ऋग्वेद: सबसे प्राचीन वेद, 10 मंडल तथा 1028 सूक्त। तृतीय मंडल में गायत्री मंत्र (रचयिता: विश्वामित्र)।',
          'सामवेद: भारतीय संगीत का मूल स्रोत (गायन योग्य ऋचाएं)।',
          'यजुर्वेद: यज्ञ व कर्मकांडीय विधियों का संग्रह (गद्य व पद्य दोनों में)।',
          'अथर्ववेद: दैनिक जीवन, औषधि, तंत्र-मंत्र और रोग निवारण से संबंधित।',
          'सत्यमेव जयते: मुंडकोपनिषद से लिया गया भारत का राष्ट्रीय आदर्श वाक्य।',
          'छह दर्शन: सांख्य (कपिल), योग (पतंजलि), न्याय (गौतम), वैशेषिक (कणाद), मीमांसा (जैमिनी), वेदांत (बादरायण)।'
        ],
        keyPointsEn: [
          'Rigveda: Oldest Veda with 10 Mandalas and 1,028 hymns. Gayatri Mantra is in Mandala 3 (composed by Vishvamitra).',
          'Samaveda: The root of Indian classical music (chants and melodies).',
          'Yajurveda: Sacrificial rituals and procedures in both prose and verse.',
          'Atharvaveda: Everyday charms, spells, healing herbs, and folk traditions.',
          'Satyameva Jayate: Taken from Mundaka Upanishad.',
          'Six Darshanas: Samkhya (Kapila), Yoga (Patanjali), Nyaya (Gautama), Vaisheshika (Kanada), Mimamsa (Jaimini), Vedanta (Badarayana).'
        ],
        examTipsHi: 'परीक्षा टिप: उत्तर वैदिक काल में लोहे (श्याम अयस) की खोज ने गंगा घाटी में कृषि और 16 महाजनपदों के उदय का मार्ग प्रशस्त किया।',
        examTipsEn: 'Exam Tip: The discovery of iron (Shyama Ayas) around 1000 BCE enabled extensive agriculture in the Gangetic plain.'
      },
      {
        id: 'buddhism_jainism',
        titleHi: '3. बौद्ध धर्म, जैन धर्म एवं 16 महाजनपद',
        titleEn: '3. Buddhism, Jainism & Mahajanapadas',
        icon: '☸️',
        summaryHi: 'ईसा पूर्व छठी शताब्दी की धार्मिक क्रांति जिसमें अहिंसा, मध्यम मार्ग और कर्म सिद्धांत पर बल दिया गया।',
        summaryEn: 'The 6th century BCE spiritual revolution emphasizing Ahimsa, the Middle Path, and Karma.',
        keyPointsHi: [
          'गौतम बुद्ध: जन्म लुंबिनी (नेपाल), ज्ञान प्राप्ति बोधगया (बिहार), प्रथम उपदेश सारनाथ (धर्मचक्रप्रवर्तन), महापरिनिर्वाण कुशीनगर।',
          'चार बौद्ध संगीतियां: 1. राजगृह (अजातशत्रु), 2. वैशाली (कालाशोक), 3. पाटलिपुत्र (अशोक), 4. कुंडलवन (कनिष्क - हीनयान व महायान में विभाजन)।',
          'भगवान महावीर: जैन धर्म के 24वें तीर्थंकर (प्रथम: ऋषभदेव)। जन्म वैशाली के निकट कुंडग्राम, कैवल्य जृंभिकग्राम, निर्वाण पावापुरी।',
          'जैन धर्म के त्रिरत्न: सम्यक दर्शन, सम्यक ज्ञान, सम्यक चरित्र।',
          '16 महाजनपदों की सूची "अंगुत्तर निकाय" (बौद्ध ग्रंथ) तथा "भगवती सूत्र" (जैन ग्रंथ) में मिलती है।'
        ],
        keyPointsEn: [
          'Gautama Buddha: Born in Lumbini, attained Enlightenment at Bodh Gaya, first sermon at Sarnath (Dharmachakrapravartana), Mahaparinirvana at Kushinagar.',
          'Four Buddhist Councils: 1. Rajgriha (Ajatashatru), 2. Vaishali (Kalashoka), 3. Pataliputra (Ashoka), 4. Kundalvana (Kanishka - Hinayana/Mahayana split).',
          'Lord Mahavira: 24th Tirthankara (1st: Rishabhanatha). Attained Kevalya (omniscience) under a Sal tree; Nirvana at Pavapuri.',
          'Triratna of Jainism: Right Faith, Right Knowledge, Right Conduct.',
          '16 Mahajanapadas are cataloged in Buddhist text Anguttara Nikaya and Jain text Bhagavati Sutra.'
        ],
        examTipsHi: 'परीक्षा टिप: मगध सबसे शक्तिशाली महाजनपद बनकर उभरा क्योंकि इसके पास लोहे की प्रचुर खदानें, उपजाऊ भूमि और गंगा-सोन नदियां थीं।',
        examTipsEn: 'Exam Tip: Magadha rose to dominance owing to rich iron ore reserves, fertile alluvium, and natural riverine defenses.'
      },
      {
        id: 'maurya_gupta',
        titleHi: '4. मौर्य साम्राज्य एवं गुप्त काल (स्वर्ण युग)',
        titleEn: '4. Mauryan Empire & Gupta Golden Age',
        icon: '👑',
        summaryHi: 'अखंड भारत की स्थापना करने वाले चंद्रगुप्त मौर्य व अशोक से लेकर कला व विज्ञान के चरमोत्कर्ष वाले गुप्त साम्राज्य का युग।',
        summaryEn: 'From Chandragupta and Ashoka who unified India, to the cultural renaissance under the Guptas.',
        keyPointsHi: [
          'चंद्रगुप्त मौर्य: 322 ई.पू. में कौटिल्य (चाणक्य) की सहायता से नंद वंश को उखाड़कर मौर्य वंश की स्थापना की। सेल्यूकस को पराजित किया।',
          'चाणक्य का अर्थशास्त्र: राजनीति एवं शासन कला का मानक ग्रंथ; मेगस्थनीज ने "इंडिका" लिखी।',
          'सम्राट अशोक: 261 ई.पू. कलिंग युद्ध के उपरांत धम्म अपनाया; शिलालेखों की भाषा प्राकृत तथा ब्राह्मी/खरोष्ठी लिपि में।',
          'गुप्त साम्राज्य (319 ई.): संस्थापक श्रीगुप्त, वास्तविक संस्थापक चंद्रगुप्त प्रथम।',
          'समुद्रगुप्त: वी.ए. स्मिथ ने "भारत का नेपोलियन" कहा; दरबारी कवि हरिषेण ने "प्रयाग प्रशस्ति" की रचना की।',
          'चंद्रगुप्त द्वितीय (विक्रमादित्य): नवरत्न (कालिदास, वराहमिहिर, धनवंतरी आदि)। चीनी यात्री फाहियान इनके काल में आया।',
          'विज्ञान व गणित: आर्यभट्ट (शून्य, दशमलव, पृथ्वी की धुरी पर घूर्णन), चरक व सुश्रुत (आयुर्वेद व शल्य चिकित्सा)।'
        ],
        keyPointsEn: [
          'Chandragupta Maurya: Founded dynasty in 322 BCE with Chanakya; defeated Seleucus Nicator.',
          'Kautilya\'s Arthashastra: Masterwork on statecraft; Megasthenes penned Indica.',
          'Emperor Ashoka: Adopted Dhamma after 261 BCE Kalinga War; edicts engraved in Brahmi/Kharosthi scripts.',
          'Samudragupta: Termed "Napoleon of India" by V.A. Smith; Prayag Prashasti written by Harishena.',
          'Chandragupta II Vikramaditya: Court adorned by Nine Gems (Kalidasa, Varahamihira, Dhanvantari). Chinese traveler Fa-Hien visited.',
          'Science & Mathematics: Aryabhata (Zero, Earth rotation), Sushruta (Surgery), Charaka (Medicine).'
        ],
        examTipsHi: 'परीक्षा टिप: नालंदा विश्वविद्यालय की स्थापना गुप्त शासक कुमारगुप्त प्रथम ने 5वीं शताब्दी में कराई थी।',
        examTipsEn: 'Exam Tip: Nalanda University was founded in the 5th century CE by Gupta ruler Kumaragupta I.'
      }
    ]
  },
  {
    id: 'medieval',
    eraHi: 'मध्यकालीन भारत (Medieval India)',
    eraEn: 'Medieval India',
    icon: '🏰',
    descriptionHi: 'दिल्ली सल्तनत, विजयनगर, भक्ति आंदोलन और मुगल साम्राज्य का वैभवशाली दौर।',
    descriptionEn: 'The Delhi Sultanate, Vijayanagara Empire, Bhakti Movement, and the Mughals.',
    topics: [
      {
        id: 'delhi_sultanate',
        titleHi: '1. दिल्ली सल्तनत (1206 - 1526 ई.)',
        titleEn: '1. Delhi Sultanate (1206–1526 CE)',
        icon: '⚔️',
        summaryHi: 'कुतुबुद्दीन ऐबक द्वारा स्थापित 5 प्रमुख राजवंशों (गुलाम, खिलजी, तुगलक, सैयद, लोदी) का शासनकाल।',
        summaryEn: 'Rule of five successive dynasties: Mamluk/Slave, Khalji, Tughlaq, Sayyid, and Lodi.',
        keyPointsHi: [
          'गुलाम वंश (1206-1290): कुतुबुद्दीन ऐबक (लाखबख्श)। इल्तुतमिश ने चालीसा (तुर्कान-ए-चिहलगानी) और इक्ता प्रणाली शुरू की।',
          'रजिया सुल्तान (1236-1240): दिल्ली की गद्दी पर बैठने वाली प्रथम और एकमात्र महिला मुस्लिम शासिका।',
          'बलबन: "लौह एवं रक्त" की नीति, सिजदा और पाबोस प्रथा, नवरोज उत्सव प्रारंभ किया।',
          'अलाउद्दीन खिलजी (1296-1316): बाजार नियंत्रण नीति, दाग और हुलिया प्रथा, दक्षिण विजय (मलिक काफूर के नेतृत्व में)।',
          'मोहम्मद बिन तुगलक: राजधानी दिल्ली से दौलताबाद स्थानांतरण, तांबे की सांकेतिक मुद्रा, कृषि हेतु "दीवान-ए-अमीर-कोही"।',
          'फिरोज शाह तुगलक: नहरों का निर्माण, दीवान-ए-खैरात (दान विभाग), दीवान-ए-बंदगान (दास विभाग)।',
          'लोदी वंश: सिकंदर लोदी ने 1504 में आगरा की स्थापना की। इब्राहिम लोदी पानीपत के प्रथम युद्ध (1526) में पराजित।'
        ],
        keyPointsEn: [
          'Slave Dynasty: Qutb-ud-din Aibak founded it; Iltutmish organized Turkan-i-Chahalgani (the Forty) and Iqta system.',
          'Razia Sultan (1236–1240): Only female sovereign of the Delhi Sultanate.',
          'Balban: Blood and Iron policy, Sijda and Paibos rituals, Navroz festival.',
          'Alauddin Khalji: Price-control/market reforms, branding horses (Dagh) and descriptive roll of soldiers (Chehra).',
          'Muhammad bin Tughlaq: Token currency experiment, capital transfer to Daulatabad, Diwan-i-Amir-Kohi for agriculture.',
          'Sikandar Lodi: Founded the city of Agra in 1504 CE.'
        ],
        examTipsHi: 'परीक्षा टिप: 1526 में पानीपत के प्रथम युद्ध में बाबर ने तोपों (तोपखाना) और तुलुगमा युद्ध पद्धति का प्रयोग कर इब्राहिम लोदी को हराया।',
        examTipsEn: 'Exam Tip: Babur introduced gunpowder field artillery and the Tulughma tactical formation at First Battle of Panipat (1526).'
      },
      {
        id: 'vijayanagar_bhakti',
        titleHi: '2. विजयनगर साम्राज्य एवं भक्ति-सूफी आंदोलन',
        titleEn: '2. Vijayanagara & Bhakti-Sufi Movement',
        icon: '🕉️',
        summaryHi: 'दक्षिण भारत में तुंगभद्रा नदी के तट पर हिंदू साम्राज्य तथा सामाजिक समरसता लाने वाले संत कवियों का युग।',
        summaryEn: 'Southern Hindu resurgence at Hampi along with egalitarian mystic devotion movements.',
        keyPointsHi: [
          'विजयनगर (1336 ई.): हरिहर एवं बुक्का द्वारा गुरु विद्यारण्य की प्रेरणा से स्थापित; राजधानी हम्पी (कर्नाटक)।',
          'कृष्णदेवराय (1509-1529): तुलुव वंश के प्रतापी राजा। दरबार में "अष्टदिग्गज" (तेलुगु कवि)। कृति: "आमुक्तमाल्याद"।',
          'तालिकोटा का युद्ध (1565): विजयनगर साम्राज्य का पतन; दक्कन सल्तनतों के संयुक्त मोर्चे ने विजयनगर को लूटा।',
          'भक्ति आंदोलन: कबीर (सधुक्कड़ी/दोहे), गुरु नानक देव (सिख धर्म प्रवर्तक), मीराबाई (कृष्ण भक्ति), तुलसीदास (रामचरितमानस)।',
          'सूफी सिलसिले: ख्वाजा मोइनुद्दीन चिश्ती (अजमेर दरगाह), हजरत निजामुद्दीन औलिया (दिल्ली - महबूब-ए-इलाही)।'
        ],
        keyPointsEn: [
          'Vijayanagara (1336 CE): Founded by Harihara and Bukka; magnificent ruins at Hampi (UNESCO World Heritage).',
          'Krishnadevaraya: Greatest emperor; court of Ashtadiggajas; wrote Amuktamalyada in Telugu.',
          'Battle of Talikota (1565): Deccan Sultanates coalition defeated Vijayanagara, leading to its decline.',
          'Bhakti Saints: Kabir (anti-ritualism), Guru Nanak (Sikhism founder), Mirabai, Tulsidas (Ramcharitmanas).',
          'Sufi Orders: Chishti Order founded in India by Khwaja Moinuddin Chishti (Ajmer Sharif).'
        ],
        examTipsHi: 'परीक्षा टिप: डोमिंगो पायस (पुर्तगाली) और अब्दुर रज्जाक (फारसी) ने विजयनगर की यात्रा कर इसके वैभव का वर्णन किया।',
        examTipsEn: 'Exam Tip: Foreign travelers Domingo Paes and Abdur Razzaq left detailed accounts of Vijayanagara bazaar prosperity.'
      },
      {
        id: 'mughals_marathas',
        titleHi: '3. मुगल साम्राज्य एवं मराठा शक्ति',
        titleEn: '3. Mughal Empire & Maratha Power',
        icon: '👑',
        summaryHi: 'बाबर से लेकर औरंगजेब तक मुगल विस्तार तथा छत्रपति शिवाजी महाराज द्वारा स्वराज्य की स्थापना।',
        summaryEn: 'From Babur\'s conquests to Akbar\'s syncretism and Chhatrapati Shivaji\'s Swarajya.',
        keyPointsHi: [
          'अकबर (1556-1605): पानीपत का द्वितीय युद्ध (1556 - हेमु पराजित); मनसबदारी प्रणाली; सुलह-ए-कुल; दीन-ए-इलाही (1582); जजिया कर समाप्त।',
          'हल्दीघाटी का युद्ध (18 जून 1576): महाराणा प्रताप और अकबर की सेना (मानसिंह) के बीच वीरतापूर्ण युद्ध।',
          'शाहजहां: स्थापत्य कला का स्वर्ण युग (ताजमहल, लाल किला, जामा मस्जिद, मयूर सिंहासन)।',
          'छत्रपति शिवाजी महाराज (1630-1680): 1674 में रायगढ़ में राज्याभिषेक (उपाधि: छत्रपति); गोरिल्ला (छापामार) युद्ध नीति।',
          'अष्टप्रधान: शिवाजी महाराज का 8 सदस्यीय मंत्रिमंडल (पेशवा = प्रधानमंत्री, अमात्य = वित्त)।',
          'चौथ और सरदेशमुखी: मराठों द्वारा पड़ोसी राज्यों से सुरक्षा के बदले वसूले जाने वाले कर।'
        ],
        keyPointsEn: [
          'Akbar (1556–1605): Won Second Battle of Panipat (1556); introduced Mansabdari system; abolished Jizya; launched Din-i Ilahi.',
          'Battle of Haldighati (1576): Heroic battle fought between Maharana Pratap of Mewar and Raja Man Singh.',
          'Shah Jahan: Golden age of Mughal architecture (Taj Mahal, Red Fort Delhi, Jama Masjid).',
          'Chhatrapati Shivaji Maharaj (1630–1680): Coronated at Raigad in 1674; pioneered Ganimi Kava (guerrilla tactics).',
          'Ashtapradhan: 8-member ministerial council headed by Peshwa; levied Chauth and Sardeshmukhi taxes.'
        ],
        examTipsHi: 'परीक्षा टिप: पानीपत का तीसरा युद्ध (1761) अहमद शाह अब्दाली और मराठों के बीच हुआ, जिसने ब्रिटिश कंपनी के उत्थान का मार्ग खोल दिया।',
        examTipsEn: 'Exam Tip: Third Battle of Panipat (1761) between Marathas and Ahmad Shah Abdali weakened Marathas, opening doors for the British.'
      }
    ]
  },
  {
    id: 'modern',
    eraHi: 'आधुनिक भारत (Modern India)',
    eraEn: 'Modern India',
    icon: '🇮🇳',
    descriptionHi: 'ब्रिटिश औपनिवेशिक शासन, 1857 की क्रांति और गांधीवादी राष्ट्रीय स्वतंत्रता आंदोलन।',
    descriptionEn: 'Colonial rule, the 1857 Revolt, and the Indian National Freedom Movement.',
    topics: [
      {
        id: 'british_conquest',
        titleHi: '1. ब्रिटिश विस्तार एवं 1857 का संग्राम',
        titleEn: '1. British Expansion & 1857 Revolt',
        icon: '⚔️',
        summaryHi: 'प्लासी और बक्सर से स्थापित ब्रिटिश ईस्ट इंडिया कंपनी की सत्ता और उसके विरुद्ध 1857 का महासंग्राम।',
        summaryEn: 'Consolidation of Company rule and India\'s First War of Independence in 1857.',
        keyPointsHi: [
          'प्लासी का युद्ध (23 जून 1757): रॉबर्ट क्लाइव ने बंगाल के नवाब सिराजुद्दौला को हराया (मीर जाफर का विश्वासघात)।',
          'बक्सर का युद्ध (22 अक्टूबर 1764): हेक्टर मुनरो ने मीर कासिम, शुजाउद्दौला और शाह आलम द्वितीय की संयुक्त सेना को हराया। 1765 की इलाहाबाद संधि से दीवानी अधिकार प्राप्त।',
          'डलहौजी की हड़प नीति (Doctrine of Lapse): सतारा (1848), जैतपुर, संभलपुर, झांसी, नागपुर को ब्रिटिश साम्राज्य में मिलाया।',
          '1857 की क्रांति: 29 मार्च को बैरकपुर में मंगल पांडे का विद्रोह। 10 मई को मेरठ से छावनी विद्रोह।',
          'प्रमुख केंद्र व नायक: दिल्ली (बहादुर शाह जफर/बख्त खान), कानपुर (नाना साहेब/तांत्या टोपे), झांसी (रानी लक्ष्मीबाई), बिहार (बाबू कुंवर सिंह), लखनऊ (बेगम हजरत महल)।'
        ],
        keyPointsEn: [
          'Battle of Plassey (1757): Robert Clive defeated Siraj-ud-Daulah through Mir Jafar\'s betrayal.',
          'Battle of Buxar (1764): British defeated joint forces of Mir Qasim, Shuja-ud-Daula, and Shah Alam II; Treaty of Allahabad (1765) granted Diwani rights.',
          'Doctrine of Lapse: Lord Dalhousie annexed Satara, Sambalpur, Jhansi, and Nagpur.',
          'Revolt of 1857: Sparked by Mangal Pandey at Barrackpore (March 29); widespread rebellion from Meerut on May 10, 1857.',
          'Leaders: Rani Lakshmibai (Jhansi), Veer Kunwar Singh (Bihar), Nana Saheb & Tatya Tope (Kanpur), Begum Hazrat Mahal (Lucknow).'
        ],
        examTipsHi: 'परीक्षा टिप: 1857 के विद्रोह के बाद ब्रिटिश क्राउन ने 1858 के भारत सरकार अधिनियम द्वारा ईस्ट इंडिया कंपनी का शासन समाप्त कर सीधे महारानी विक्टोरिया के अधीन कर दिया।',
        examTipsEn: 'Exam Tip: Government of India Act 1858 ended Company rule, transferring control directly to the British Crown.'
      },
      {
        id: 'renaissance_inc',
        titleHi: '2. सामाजिक सुधार एवं कांग्रेस की स्थापना',
        titleEn: '2. Social Reforms & Congress Foundation',
        icon: '🏛️',
        summaryHi: '19वीं शताब्दी का भारतीय पुनर्जागरण तथा 1885 में भारतीय राष्ट्रीय कांग्रेस का गठन।',
        summaryEn: '19th century socio-religious resurgence and founding of the Indian National Congress.',
        keyPointsHi: [
          'राजा राममोहन राय: "आधुनिक भारत के जनक"; 1828 में ब्रह्म समाज की स्थापना; 1829 में लॉर्ड विलियम बेंटिंक द्वारा सती प्रथा उन्मूलन में मुख्य भूमिका।',
          'स्वामी दयानंद सरस्वती: 1875 में आर्य समाज की स्थापना; नारा "वेदों की ओर लौटो"; ग्रंथ "सत्यार्थ प्रकाश"।',
          'स्वामी विवेकानंद: 1897 में रामकृष्ण मिशन की स्थापना; 1893 में शिकागो विश्व धर्म संसद में ऐतिहासिक भाषण।',
          'ज्योतिराव फुले: 1873 में सत्यशोधक समाज की स्थापना; पुस्तक "गुलामगिरी"; दलित व महिला शिक्षा के अग्रदूत।',
          'कांग्रेस की स्थापना (28 दिसंबर 1885): ए.ओ. ह्यूम द्वारा बंबई के गोकुलदास तेजपाल संस्कृत कॉलेज में। प्रथम अध्यक्ष: व्योमेश चंद्र बनर्जी (72 प्रतिनिधि)।'
        ],
        keyPointsEn: [
          'Raja Ram Mohan Roy: "Father of Modern India"; founded Brahmo Samaj (1828); aided abolition of Sati in 1829 with Lord William Bentinck.',
          'Swami Dayananda Saraswati: Founded Arya Samaj (1875); gave call "Go back to the Vedas"; wrote Satyarth Prakash.',
          'Swami Vivekananda: Founded Ramakrishna Mission (1897); iconic 1893 Chicago Parliament of Religions address.',
          'Jyotirao Phule: Founded Satyashodhak Samaj (1873); wrote Gulamgiri; championed female and lower-caste education.',
          'Indian National Congress (1885): Founded by A.O. Hume; first session at Bombay presided by W.C. Bonnerjee with 72 delegates.'
        ],
        examTipsHi: 'परीक्षा टिप: दादाभाई नौरोजी ने अपनी पुस्तक "Poverty and Un-British Rule in India" में अंग्रेजों द्वारा भारत से धन की निकासी (Drain of Wealth) का सिद्धांत प्रतिपादित किया।',
        examTipsEn: 'Exam Tip: Dadabhai Naoroji formulated the "Drain of Wealth" theory in his book "Poverty and Un-British Rule in India".'
      },
      {
        id: 'gandhian_era',
        titleHi: '3. गांधीवादी युग एवं स्वतंत्रता (1915 - 1947)',
        titleEn: '3. Gandhian Era & Independence (1915–1947)',
        icon: '🕊️',
        summaryHi: 'सत्याग्रह, असहयोग, नमक सत्याग्रह, भारत छोड़ो आंदोलन और 15 अगस्त 1947 को स्वतंत्रता की प्राप्ति।',
        summaryEn: 'Non-cooperation, Civil Disobedience, Quit India Movement, and Partition/Independence.',
        keyPointsHi: [
          'गांधीजी का आगमन: 9 जनवरी 1915 को दक्षिण अफ्रीका से भारत वापसी (प्रवासी भारतीय दिवस)।',
          'प्रारंभिक सत्याग्रह: चंपारण (1917 - तीनकठिया प्रथा), अहमदाबाद मिल हड़ताल (1918), खेड़ा सत्याग्रह (1918)।',
          'रॉलेट एक्ट व जलियांवाला बाग (13 अप्रैल 1919): जनरल डायर द्वारा गोलीबारी; टैगोर ने नाइटहुड लौटाया।',
          'असहयोग आंदोलन (1920-1922): 4 फरवरी 1922 को चौरी-चौरा कांड के बाद गांधीजी द्वारा वापस लिया गया।',
          'सविनय अवज्ञा आंदोलन (1930): 12 मार्च से 6 अप्रैल 1930 तक दांडी मार्च (साबरमती से दांडी) कर नमक कानून तोड़ा।',
          'भारत छोड़ो आंदोलन (8 अगस्त 1942): बंबई के ग्वालिया टैंक से "करो या मरो" का ऐतिहासिक मंत्र।',
          'आजाद हिंद फौज (INA): नेताजी सुभाष चंद्र बोस ने "दिल्ली चलो" और "तुम मुझे खून दो, मैं तुम्हें आजादी दूंगा" का उद्घोष किया।',
          'स्वतंत्रता एवं संविधान: 15 अगस्त 1947 को आजादी। संविधान सभा की प्रारूप समिति के अध्यक्ष डॉ. भीमराव आंबेडकर बने।'
        ],
        keyPointsEn: [
          'Return of Gandhi: January 9, 1915 from South Africa (celebrated as Pravasi Bharatiya Divas).',
          'Early Experiments: Champaran (1917 against Tinkathia indigo rule), Ahmedabad Mill Strike (1918), Kheda (1918).',
          'Jallianwala Bagh (April 13, 1919): General Dyer massacred peaceful gathering; Tagore relinquished Knighthood.',
          'Non-Cooperation Movement (1920–1922): Called off after Chauri Chaura incident on February 4, 1922.',
          'Civil Disobedience (1930): Dandi Salt March from Sabarmati to Dandi (March 12 - April 6, 1930).',
          'Quit India Movement (August 8, 1942): Gandhi gave call "Do or Die" at Gowalia Tank Maidan, Bombay.',
          'INA & Netaji: Subhas Chandra Bose rallied Indians with slogans "Dilli Chalo" and "Give me blood, I will give you freedom".',
          'Constitution of India: Framed under Dr. B.R. Ambedkar (Drafting Committee Chairman), adopted Nov 26, 1949.'
        ],
        examTipsHi: 'परीक्षा टिप: 1929 के लाहौर अधिवेशन में पंडित जवाहरलाल नेहरू की अध्यक्षता में "पूर्ण स्वराज" का ऐतिहासिक प्रस्ताव पारित किया गया था।',
        examTipsEn: 'Exam Tip: Complete Independence ("Purna Swaraj") resolution was passed at 1929 Lahore Congress Session under Jawaharlal Nehru.'
      }
    ]
  },
  {
    id: 'tables',
    eraHi: 'महत्वपूर्ण परीक्षा सार (High-Yield Quick Facts)',
    eraEn: 'High-Yield Quick Facts',
    icon: '⚡',
    descriptionHi: 'प्रतियोगी परीक्षाओं में बार-बार पूछे जाने वाले प्रमुख युद्ध, पुस्तकें, संधियां और वायसराय।',
    descriptionEn: 'Landmark battles, treaties, books, and viceroys frequently asked in competitive exams.',
    topics: [
      {
        id: 'historic_battles',
        titleHi: 'प्रमुख ऐतिहासिक युद्ध (Key Historic Battles)',
        titleEn: 'Key Historic Battles',
        icon: '⚔️',
        summaryHi: 'भारतीय इतिहास की दिशा बदलने वाले निर्णायक युद्ध।',
        summaryEn: 'Decisive battles that altered the destiny of India.',
        keyPointsHi: [
          'तराइन का प्रथम युद्ध (1191): पृथ्वीराज चौहान ने मुहम्मद गोरी को हराया।',
          'तराइन का द्वितीय युद्ध (1192): मुहम्मद गोरी ने पृथ्वीराज चौहान को हराया।',
          'पानीपत का प्रथम युद्ध (1526): बाबर ने इब्राहिम लोदी को हराया (मुगल वंश की स्थापना)।',
          'खानवा का युद्ध (1527): बाबर ने राणा सांगा को पराजित किया।',
          'चौसा (1539) व बिलग्राम (1540): शेरशाह सूरी ने हुमायूं को पराजित कर निर्वासित किया।',
          'पानीपत का द्वितीय युद्ध (1556): अकबर (बैरम खान) ने हेमु को पराजित किया।',
          'हल्दीघाटी का युद्ध (1576): महाराणा प्रताप बनाम अकबर की सेना (मानसिंह)।',
          'पानीपत का तीसरा युद्ध (1761): अहमद शाह अब्दाली ने मराठों को पराजित किया।',
          'प्लासी का युद्ध (1757) एवं बक्सर का युद्ध (1764): भारत में ब्रिटिश साम्राज्य की नींव।'
        ],
        keyPointsEn: [
          'First Battle of Tarain (1191): Prithviraj Chauhan defeated Muhammad Ghori.',
          'Second Battle of Tarain (1192): Muhammad Ghori defeated Prithviraj Chauhan.',
          'First Battle of Panipat (1526): Babur defeated Ibrahim Lodi, establishing Mughal Empire.',
          'Battle of Khanwa (1527): Babur defeated Rana Sanga of Mewar.',
          'Second Battle of Panipat (1556): Akbar defeated Hemu.',
          'Battle of Haldighati (1576): Maharana Pratap vs. Raja Man Singh.',
          'Third Battle of Panipat (1761): Ahmad Shah Abdali defeated Marathas.',
          'Plassey (1757) & Buxar (1764): Established British East India Company paramountcy.'
        ],
        examTipsHi: 'परीक्षा टिप: पानीपत (हरियाणा) रणनीतिक भौगोलिक स्थिति और समतल मैदान होने के कारण तीन ऐतिहासिक युद्धों का गवाह बना।',
        examTipsEn: 'Exam Tip: Panipat\'s strategic proximity to Delhi and flat terrain made it the theater for three decisive imperial battles.'
      },
      {
        id: 'historic_books',
        titleHi: 'प्रमुख पुस्तकें एवं उनके रचयिता (Famous Historical Books)',
        titleEn: 'Famous Historical Books & Authors',
        icon: '📚',
        summaryHi: 'प्राचीन, मध्यकालीन और आधुनिक काल के सबसे महत्वपूर्ण साहित्यिक स्रोत।',
        summaryEn: 'Pivotal literary and historical works across eras.',
        keyPointsHi: [
          'अर्थशास्त्र — चाणक्य (कौटिल्य / विष्णुगुप्त)',
          'इंडिका — मेगस्थनीज (ग्रीक राजदूत)',
          'हर्षचरित एवं कादंबरी — बाणभट्ट',
          'मुद्राराक्षस — विशाखदत्त',
          'राजतरंगिणी (कश्मीर का इतिहास) — कल्हण',
          'किताब-उल-हिंद (तहकीक-ए-हिंद) — अल-बरूनी',
          'अकबरनामा एवं आइन-ए-अकबरी — अबुल फजल',
          'आनंदमठ — बंकिम चंद्र चट्टोपाध्याय',
          'गीतांजलि — रवींद्रनाथ टैगोर (1913 नोबेल पुरस्कार)',
          'डिस्कवरी ऑफ इंडिया — पंडित जवाहरलाल नेहरू',
          'सत्यार्थ प्रकाश — स्वामी दयानंद सरस्वती'
        ],
        keyPointsEn: [
          'Arthashastra — Chanakya (Kautilya)',
          'Indica — Megasthenes (Greek ambassador)',
          'Harshacharita & Kadambari — Banabhatta',
          'Mudrarakshasa — Vishakhadatta',
          'Rajatarangini — Kalhana (History of Kashmir)',
          'Kitab-ul-Hind — Al-Biruni',
          'Akbarnama — Abul Fazl',
          'Anandamath — Bankim Chandra Chattopadhyay',
          'Gitanjali — Rabindranath Tagore (Nobel Prize 1913)',
          'The Discovery of India — Jawaharlal Nehru'
        ],
        examTipsHi: 'परीक्षा टिप: कल्हण की "राजतरंगिणी" को भारत का पहला वैज्ञानिक और क्रमबद्ध ऐतिहासिक ग्रंथ माना जाता है।',
        examTipsEn: 'Exam Tip: Kalhana\'s Rajatarangini is considered India\'s first systematically compiled historical chronicle.'
      }
    ]
  }
];
