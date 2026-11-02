import { Question, Language, Difficulty } from '../types';

export const PYQ_QUESTIONS_HI: Question[] = [
  {
    id: 'pyq-hi-1',
    text: 'निम्नलिखित में से कौन-सा एक हड़प्पा स्थल नहीं है?',
    options: ['चन्हुदड़ो', 'कोटदीजी', 'सोहगौरा', 'देसलपुर'],
    correctAnswer: 2,
    explanation: 'सोहगौरा (गोरखपुर, उत्तर प्रदेश) मौर्यकालीन ताम्रपत्र अभिलेख के लिए प्रसिद्ध है, यह हड़प्पा सभ्यता का स्थल नहीं है। अन्य तीनों हड़प्पा स्थल हैं।',
    era: 'Ancient',
    examTag: 'UPSC CSE 2019',
    sources: [{ title: 'UPSC CSE 2019 Prelims Paper', uri: 'https://upsc.gov.in' }]
  },
  {
    id: 'pyq-hi-2',
    text: 'भारत के सांस्कृतिक इतिहास के संदर्भ में, "परमिता" (Paramita) शब्द का सही विवरण निम्नलिखित में से कौन-सा है?',
    options: [
      'सूत्र पद्धति में लिखे गए प्राचीन धर्मशास्त्र',
      'वेदों के प्राधिकार को अस्वीकार करने वाले दार्शनिक संप्रदाय',
      'वे परिपूर्णताएं जिनकी प्राप्ति से बोधिसत्व पथ प्रशस्त हुआ',
      'आरंभिक मध्यकालीन दक्षिण भारत की शक्तिशाली व्यापारी श्रेणियां'
    ],
    correctAnswer: 2,
    explanation: 'बौद्ध दर्शन में "पारमिता" का अर्थ उन आध्यात्मिक व नैतिक परिपूर्णताओं (जैसे दान, शील, क्षांति, वीर्य, ध्यान, प्रज्ञा) से है, जिनसे बोधिसत्व का मार्ग प्रशस्त होता है।',
    era: 'Ancient',
    examTag: 'UPSC CSE 2020',
    sources: [{ title: 'UPSC CSE 2020 Prelims Paper', uri: 'https://upsc.gov.in' }]
  },
  {
    id: 'pyq-hi-3',
    text: '1931 में भारतीय राष्ट्रीय कांग्रेस के कराची अधिवेशन की अध्यक्षता किसने की थी, जिसमें मौलिक अधिकारों का प्रस्ताव पारित हुआ?',
    options: ['पंडित जवाहरलाल नेहरू', 'सरदार वल्लभभाई पटेल', 'सुभाष चंद्र बोस', 'डॉ. राजेंद्र प्रसाद'],
    correctAnswer: 1,
    explanation: 'मार्च 1931 में कराची अधिवेशन की अध्यक्षता सरदार वल्लभभाई पटेल ने की थी। इसी अधिवेशन में मौलिक अधिकारों और राष्ट्रीय आर्थिक कार्यक्रमों पर ऐतिहासिक प्रस्ताव पारित किए गए थे।',
    era: 'Modern',
    examTag: 'UPSC CSE 2021',
    sources: [{ title: 'UPSC CSE 2021 Prelims Paper', uri: 'https://upsc.gov.in' }]
  },
  {
    id: 'pyq-hi-4',
    text: 'मध्यकालीन भारत के आर्थिक इतिहास के संदर्भ में, शब्द "अरघट्टा" (Araghatta) किसे निरूपित करता है?',
    options: ['बंधुआ मजदूर', 'सैन्य अधिकारियों को दिए गए भूमि अनुदान', 'भूमि की सिंचाई के लिए प्रयुक्त जलचक्र (रहट)', 'कृषि योग्य बनाई गई बंजर भूमि'],
    correctAnswer: 2,
    explanation: 'अरघट्टा (रहट/पर्सियन व्हील) एक यांत्रिक जलचक्र था जिसका उपयोग मध्यकाल में कुओं से पानी निकालकर खेतों की सिंचाई करने के लिए किया जाता था।',
    era: 'Medieval',
    examTag: 'UPSC CSE 2016',
    sources: [{ title: 'UPSC CSE 2016 Prelims Paper', uri: 'https://upsc.gov.in' }]
  },
  {
    id: 'pyq-hi-5',
    text: 'तराइन का प्रथम युद्ध (1191 ई.) में राजपूत शासक पृथ्वीराज चौहान ने किसे पराजित किया था?',
    options: ['शहाबुद्दीन मुहम्मद गोरी', 'महमूद गजनवी', 'कुतुबुद्दीन ऐबक', 'इल्तुतमिश'],
    correctAnswer: 0,
    explanation: '1191 ई. में तराइन के प्रथम युद्ध में पृथ्वीराज तृतीय (चौहान) ने शहाबुद्दीन मुहम्मद गोरी को बुरी तरह पराजित किया था।',
    era: 'Medieval',
    examTag: 'SSC CGL 2022',
    sources: [{ title: 'SSC CGL Previous Papers', uri: 'https://ssc.nic.in' }]
  },
  {
    id: 'pyq-hi-6',
    text: 'प्रसिद्ध ऐतिहासिक ग्रंथ "हर्षचरित" और "कादंबरी" के रचयिता बाणभट्ट किस शासक के दरबारी कवि थे?',
    options: ['चंद्रगुप्त विक्रमादित्य', 'हर्षवर्धन', 'समुद्रगुप्त', 'कनिष्क'],
    correctAnswer: 1,
    explanation: 'बाणभट्ट सम्राट हर्षवर्धन (पुष्यभूति वंश) के दरबारी कवि थे। उन्होंने "हर्षचरित" तथा विश्वप्रसिद्ध संस्कृत उपन्यास "कादंबरी" की रचना की।',
    era: 'Ancient',
    examTag: 'SSC CGL 2021',
    sources: [{ title: 'SSC CGL Question Bank', uri: 'https://ssc.nic.in' }]
  },
  {
    id: 'pyq-hi-7',
    text: '1761 ईस्वी में लड़े गए पानीपत के तीसरे युद्ध में अहमद शाह अब्दाली ने किसे पराजित किया था?',
    options: ['मुगलों को', 'मराठों को', 'सिखों को', 'अंग्रेजों को'],
    correctAnswer: 1,
    explanation: '14 जनवरी 1761 को पानीपत का तीसरा युद्ध अहमद शाह अब्दाली और मराठा सेना (सदाशिवराव भाऊ के नेतृत्व) के बीच लड़ा गया था, जिसमें मराठों की पराजय हुई।',
    era: 'Modern',
    examTag: 'SSC CGL 2020',
    sources: [{ title: 'SSC CGL History Section', uri: 'https://ssc.nic.in' }]
  },
  {
    id: 'pyq-hi-8',
    text: 'विजयनगर साम्राज्य की स्थापना 1336 ई. में किन दो भाइयों ने मिलकर की थी?',
    options: ['हरिहर और बुक्का', 'कृष्णदेव राय और अच्युत राय', 'अल्लसानी और पेद्दन', 'रामराय और तिरुमल'],
    correctAnswer: 0,
    explanation: 'हरिहर राय प्रथम और बुक्का राय प्रथम ने तुंगभद्रा नदी के तट पर अपने गुरु स्वामी विद्यारण्य की प्रेरणा से विजयनगर साम्राज्य की स्थापना की।',
    era: 'Medieval',
    examTag: 'SSC CHSL 2021',
    sources: [{ title: 'SSC CHSL Previous Years', uri: 'https://ssc.nic.in' }]
  },
  {
    id: 'pyq-hi-9',
    text: 'दिल्ली सल्तनत के किस सुल्तान ने कृषि विकास हेतु एक नया विभाग "दीवान-ए-अमीर-कोही" स्थापित किया था?',
    options: ['अलाउद्दीन खिलजी', 'मोहम्मद बिन तुगलक', 'फिरोज शाह तुगलक', 'सिकंदर लोदी'],
    correctAnswer: 1,
    explanation: 'मोहम्मद बिन तुगलक ने कृषि सुधार, तकावी ऋण वितरण और फसल चक्र को बढ़ावा देने के लिए "दीवान-ए-अमीर-कोही" की स्थापना की थी।',
    era: 'Medieval',
    examTag: 'UPPSC 2021',
    sources: [{ title: 'UPPSC Combined State Exam', uri: 'https://uppsc.up.nic.in' }]
  },
  {
    id: 'pyq-hi-10',
    text: 'छत्रपति शिवाजी महाराज के प्रशासनिक मंत्रिमंडल को क्या कहा जाता था?',
    options: ['नवरत्न', 'अष्टप्रधान', 'अष्टदिग्गज', 'सप्तऋषि'],
    correctAnswer: 1,
    explanation: 'शिवाजी महाराज के आठ प्रमुख मंत्रियों के परिषद को "अष्टप्रधान" कहा जाता था, जिसमें पेशवा (प्रधानमंत्री), अमात्य (वित्त), सुमंत (विदेश) आदि शामिल थे।',
    era: 'Medieval',
    examTag: 'UPPSC 2020',
    sources: [{ title: 'UPPSC Pre Exam Papers', uri: 'https://uppsc.up.nic.in' }]
  },
  {
    id: 'pyq-hi-11',
    text: 'समुद्रगुप्त की विजयों का विस्तृत विवरण देने वाली प्रसिद्ध "प्रयाग प्रशस्ति" (इलाहाबाद स्तंभ लेख) की रचना किसने की थी?',
    options: ['हरिषेण', 'रविकीर्ति', 'बाणभट्ट', 'वीरसेन'],
    correctAnswer: 0,
    explanation: 'प्रयाग प्रशस्ति समुद्रगुप्त के राजकवि तथा महादंडनायक हरिषेण द्वारा संस्कृत भाषा की चम्पू शैली में उत्कीर्ण की गई थी।',
    era: 'Ancient',
    examTag: 'UPPSC 2019',
    sources: [{ title: 'UPPSC History Archives', uri: 'https://uppsc.up.nic.in' }]
  },
  {
    id: 'pyq-hi-12',
    text: '1857 के प्रथम स्वतंत्रता संग्राम में बिहार के जगदीशपुर से विद्रोह का नेतृत्व किस वीर योद्धा ने किया था?',
    options: ['बाबू कुंवर सिंह', 'अमर सिंह', 'हरे कृष्ण सिंह', 'पीर अली खान'],
    correctAnswer: 0,
    explanation: '80 वर्ष की उम्र में जगदीशपुर (भोजपुर) के जमींदार बाबू कुंवर सिंह ने अंग्रेजों के विरुद्ध अदम्य वीरता से 1857 की क्रांति का नेतृत्व किया था।',
    era: 'Modern',
    examTag: 'BPSC 66th 2020',
    sources: [{ title: 'BPSC Combined Competitive Exam', uri: 'https://bpsc.bih.nic.in' }]
  },
  {
    id: 'pyq-hi-13',
    text: 'महात्मा गांधी ने भारत में अपना पहला सफल सत्याग्रह 1917 में किस स्थान पर तीनकठिया प्रथा के विरुद्ध किया था?',
    options: ['खेड़ा', 'चंपारण (बिहार)', 'अहमदाबाद', 'बारदोली'],
    correctAnswer: 1,
    explanation: 'राजकुमार शुक्ल के आग्रह पर गांधीजी चंपारण पहुंचे और नीलहे अंग्रेजों द्वारा किसानों पर थोपी गई "तीनकठिया पद्धति" के विरुद्ध भारत में पहला सत्याग्रह किया।',
    era: 'Modern',
    examTag: 'BPSC 67th 2022',
    sources: [{ title: 'BPSC Prelims Questions', uri: 'https://bpsc.bih.nic.in' }]
  },
  {
    id: 'pyq-hi-14',
    text: 'प्राचीन काल में गंगा और सोन नदियों के संगम पर पाटलिपुत्र नगर की नींव किस मगध नरेश ने रखी थी?',
    options: ['बिंबिसार', 'अजातशत्रु', 'उदायिन (उदयभद्र)', 'शिशुनाग'],
    correctAnswer: 2,
    explanation: 'हर्यक वंश के राजा अजातशत्रु के पुत्र उदायिन ने अपनी राजधानी राजगृह से पाटलिपुत्र स्थानांतरित की और सोन व गंगा के संगम पर एक सुदृढ़ दुर्ग बनवाया।',
    era: 'Ancient',
    examTag: 'BPSC 68th 2023',
    sources: [{ title: 'BPSC Official Question Paper', uri: 'https://bpsc.bih.nic.in' }]
  },
  {
    id: 'pyq-hi-15',
    text: 'खजुराहो के प्रसिद्ध कंदरिया महादेव मंदिर का निर्माण किस राजवंश के शासकों द्वारा कराया गया था?',
    options: ['परमार वंश', 'चंदेल वंश', 'कलचुरि वंश', 'प्रतिहार वंश'],
    correctAnswer: 1,
    explanation: 'मध्य प्रदेश के छतरपुर जिले में स्थित खजुराहो के भव्य मंदिरों, विशेषकर कंदरिया महादेव मंदिर का निर्माण 10वीं-11वीं सदी में चंदेल राजाओं द्वारा कराया गया था।',
    era: 'Ancient',
    examTag: 'MPPSC 2021',
    sources: [{ title: 'MPPSC State Service Exam', uri: 'https://mppsc.mp.gov.in' }]
  },
  {
    id: 'pyq-hi-16',
    text: 'मध्य प्रदेश के रायसेन जिले में स्थित विश्व धरोहर "सांची के महान स्तूप" का मूल निर्माण किस सम्राट ने कराया था?',
    options: ['चंद्रगुप्त मौर्य', 'बिंदुसार', 'सम्राट अशोक', 'अग्निमित्र शुंग'],
    correctAnswer: 2,
    explanation: 'सांची का महान स्तूप सम्राट अशोक द्वारा तीसरी शताब्दी ईसा पूर्व में बनवाया गया था। इसमें महात्मा बुद्ध के प्रमुख शिष्यों के धातु अवशेष संरक्षित थे।',
    era: 'Ancient',
    examTag: 'MPPSC 2020',
    sources: [{ title: 'MPPSC Official Question Archive', uri: 'https://mppsc.mp.gov.in' }]
  },
  {
    id: 'pyq-hi-17',
    text: 'अजमेर में स्थित ऐतिहासिक स्मारक "अढ़ाई दिन का झोंपड़ा" का निर्माण मूलतः किस सुल्तान ने करवाया था?',
    options: ['कुतुबुद्दीन ऐबक', 'इल्तुतमिश', 'अलाउद्दीन खिलजी', 'बलबन'],
    correctAnswer: 0,
    explanation: 'कुतुबुद्दीन ऐबक ने 1192 ई. में चौहान सम्राट विग्रहराज चतुर्थ (बीसलदेव) द्वारा निर्मित संस्कृत पाठशाला को तोड़कर मस्जिद में परिवर्तित करवाया था।',
    era: 'Medieval',
    examTag: 'RAS 2021',
    sources: [{ title: 'RPSC RAS Prelims Paper', uri: 'https://rpsc.rajasthan.gov.in' }]
  },
  {
    id: 'pyq-hi-18',
    text: '18 जून 1576 को मेवाड़ के महाराणा प्रताप और अकबर की सेना के मध्य कौन-सा ऐतिहासिक युद्ध लड़ा गया था?',
    options: ['हल्दीघाटी का युद्ध', 'दिवेर का युद्ध', 'खानवा का युद्ध', 'तराइन का युद्ध'],
    correctAnswer: 0,
    explanation: 'हल्दीघाटी का प्रसिद्ध युद्ध 1576 ई. में महाराणा प्रताप और मुगल सेनापति राजा मानसिंह के मध्य लड़ा गया था, जो शौर्य और स्वाभिमान का प्रतीक है।',
    era: 'Medieval',
    examTag: 'RAS 2018',
    sources: [{ title: 'Rajasthan PSC Archives', uri: 'https://rpsc.rajasthan.gov.in' }]
  },
  {
    id: 'pyq-hi-19',
    text: '13 अप्रैल 1919 के जलियांवाला बाग नरसंहार के विरोध में किस भारतीय महापुरुष ने अपनी ब्रिटिश "नाइटहुड" उपाधि त्याग दी थी?',
    options: ['महात्मा गांधी', 'रवींद्रनाथ टैगोर', 'सुभाष चंद्र बोस', 'गोपाल कृष्ण गोखले'],
    correctAnswer: 1,
    explanation: 'कविगुरु रवींद्रनाथ टैगोर ने अमृतसर के जलियांवाला बाग हत्याकांड के विरोध में ब्रिटिश सरकार को पत्र लिखकर अपनी "नाइटहुड" (Knighthood) की पदवी लौटा दी थी।',
    era: 'Modern',
    examTag: 'RRB NTPC 2021',
    sources: [{ title: 'Railway Recruitment Board NTPC', uri: 'https://rrbcdg.gov.in' }]
  },
  {
    id: 'pyq-hi-20',
    text: 'भारत के राष्ट्रीय प्रतीक पर देवनागरी में अंकित आदर्श वाक्य "सत्यमेव जयते" किस उपनिषद से लिया गया है?',
    options: ['कठोपनिषद', 'मुंडकोपनिषद', 'छांदोग्य उपनिषद', 'मांडूक्योपनिषद'],
    correctAnswer: 1,
    explanation: '"सत्यमेव जयते" (सत्य की ही सदा विजय होती है) मुंडक उपनिषद (मुंडकोपनिषद) से उद्धृत किया गया है।',
    era: 'Ancient',
    examTag: 'RRB NTPC 2020',
    sources: [{ title: 'RRB NTPC Exam Question Papers', uri: 'https://rrbcdg.gov.in' }]
  },
  {
    id: 'pyq-hi-21',
    text: '8 अगस्त 1942 को भारत छोड़ो आंदोलन के समय गांधीजी ने कौन-सा सुप्रसिद्ध नारा दिया था?',
    options: ['करो या मरो', 'जय हिंद', 'दिल्ली चलो', 'इंकलाब जिंदाबाद'],
    correctAnswer: 0,
    explanation: 'बंबई के ग्वालिया टैंक मैदान (अगस्त क्रांति मैदान) से गांधीजी ने देशवासियों का आह्वान करते हुए "करो या मरो" (Do or Die) का अमर संदेश दिया था।',
    era: 'Modern',
    examTag: 'RRB Group D 2022',
    sources: [{ title: 'RRB Group D Exam Archives', uri: 'https://rrbcdg.gov.in' }]
  },
  {
    id: 'pyq-hi-22',
    text: 'मुगल सम्राट अकबर ने सभी धर्मों के मूल सिद्धांतों को समाहित कर "दीन-ए-इलाही" की शुरुआत किस वर्ष की थी?',
    options: ['1575 ई.', '1579 ई.', '1582 ई.', '1585 ई.'],
    correctAnswer: 2,
    explanation: 'अकबर ने 1582 ई. में "दीन-ए-इलाही" (तौहीद-ए-इलाही) की स्थापना की। बीरबल इसे स्वीकार करने वाले एकमात्र हिंदू दरबारी थे।',
    era: 'Medieval',
    examTag: 'CDS 2021',
    sources: [{ title: 'UPSC Combined Defence Services', uri: 'https://upsc.gov.in' }]
  },
  {
    id: 'pyq-hi-23',
    text: 'ब्रिटिश भारत में किस वायसराय को "स्थानीय स्वशासन का जनक" (Father of Local Self-Government) माना जाता है?',
    options: ['लॉर्ड मेयो', 'लॉर्ड रिपन', 'लॉर्ड लिटन', 'लॉर्ड कर्जन'],
    correctAnswer: 1,
    explanation: 'लॉर्ड रिपन ने 1882 के प्रसिद्ध प्रस्ताव द्वारा स्थानीय नगरीय एवं ग्रामीण निकायों को स्वायत्तता और वित्तीय अधिकार प्रदान किए थे।',
    era: 'Modern',
    examTag: 'NDA 2021',
    sources: [{ title: 'UPSC NDA/NA Exam Papers', uri: 'https://upsc.gov.in' }]
  },
  {
    id: 'pyq-hi-24',
    text: 'प्रसिद्ध चीनी बौद्ध यात्री फाहियान ने किसके शासनकाल में भारत की यात्रा की थी?',
    options: ['समुद्रगुप्त', 'चंद्रगुप्त द्वितीय (विक्रमादित्य)', 'कुमारगुप्त', 'हर्षवर्धन'],
    correctAnswer: 1,
    explanation: 'फाहियान ने लगभग 399-412 ईस्वी के दौरान गुप्त सम्राट चंद्रगुप्त द्वितीय विक्रमादित्य के काल में भारत आकर बौद्ध धर्मग्रंथों का अध्ययन व संकलन किया था।',
    era: 'Ancient',
    examTag: 'UPSC CSE 2018',
    sources: [{ title: 'UPSC Civil Services Examination', uri: 'https://upsc.gov.in' }]
  },
  {
    id: 'pyq-hi-25',
    text: '22 अक्टूबर 1764 को लड़ा गया बक्सर का ऐतिहासिक युद्ध ईस्ट इंडिया कंपनी और किनके संयुक्त मोर्चे के बीच हुआ था?',
    options: ['मीर कासिम, शुजाउद्दौला और शाह आलम द्वितीय', 'सिराजुद्दौला और मीर जाफर', 'मीर कासिम और टीपू सुल्तान', 'हैदर अली और मराठे'],
    correctAnswer: 0,
    explanation: 'बक्सर के युद्ध में हेक्टर मुनरो के नेतृत्व वाली ब्रिटिश सेना ने बंगाल के नवाब मीर कासिम, अवध के नवाब शुजाउद्दौला और मुगल बादशाह शाह आलम द्वितीय की संयुक्त सेना को हराया।',
    era: 'Modern',
    examTag: 'UPPSC 2022',
    sources: [{ title: 'UPPSC Prelims Examination', uri: 'https://uppsc.up.nic.in' }]
  },
  {
    id: 'pyq-hi-26',
    text: '1927 में गठित साइमन कमीशन का भारतीयों द्वारा राष्ट्रव्यापी विरोध क्यों किया गया था?',
    options: ['इसमें केवल एक भारतीय सदस्य शामिल था', 'इस आयोग का कोई भी सदस्य भारतीय नहीं था', 'इसने सांप्रदायिक आधार पर निर्वाचन समाप्त कर दिया', 'इसने असहयोग आंदोलन को दबाया'],
    correctAnswer: 1,
    explanation: 'ब्रिटिश संसद के 7 सदस्यों वाले साइमन कमीशन में एक भी भारतीय को शामिल नहीं किया गया था, इसलिए "साइमन गो बैक" के नारों से इसका बहिष्कार हुआ।',
    era: 'Modern',
    examTag: 'UPSC CSE 2017',
    sources: [{ title: 'UPSC History Question Paper', uri: 'https://upsc.gov.in' }]
  },
  {
    id: 'pyq-hi-27',
    text: 'भारत के राष्ट्रीय गीत "वंदे मातरम्" का मूल स्रोत उपन्यास "आनंदमठ" किसके द्वारा रचित है?',
    options: ['रवींद्रनाथ टैगोर', 'बंकिम चंद्र चट्टोपाध्याय', 'शरतचंद्र चट्टोपाध्याय', 'अरविंद घोष'],
    correctAnswer: 1,
    explanation: 'बंकिम चंद्र चट्टोपाध्याय द्वारा 1882 में रचित उपन्यास "आनंदमठ" 18वीं शताब्दी के संन्यासी विद्रोह की पृष्ठभूमि पर आधारित है, जिसमें "वंदे मातरम्" समाहित है।',
    era: 'Modern',
    examTag: 'BPSC 65th 2019',
    sources: [{ title: 'BPSC Official Exam Archives', uri: 'https://bpsc.bih.nic.in' }]
  },
  {
    id: 'pyq-hi-28',
    text: '1905 में बंगाल के विभाजन के समय भारत का ब्रिटिश वायसराय कौन था?',
    options: ['लॉर्ड कर्जन', 'लॉर्ड डलहौजी', 'लॉर्ड रिपन', 'लॉर्ड चेम्सफोर्ड'],
    correctAnswer: 0,
    explanation: 'लॉर्ड कर्जन ने 1905 में प्रशासनिक सुविधा का बहाना बनाकर बंगाल का सांप्रदायिक आधार पर विभाजन किया, जिसके विरोध में बंग-भंग विरोधी स्वदेशी आंदोलन शुरू हुआ।',
    era: 'Modern',
    examTag: 'SSC CGL 2019',
    sources: [{ title: 'Staff Selection Commission Question Bank', uri: 'https://ssc.nic.in' }]
  },
  {
    id: 'pyq-hi-29',
    text: 'ऋग्वेद के प्रसिद्ध "गायत्री मंत्र" की रचना किस महर्षि द्वारा की गई थी?',
    options: ['महर्षि विश्वामित्र', 'महर्षि वशिष्ठ', 'महर्षि भारद्वाज', 'महर्षि वामदेव'],
    correctAnswer: 0,
    explanation: 'ऋग्वेद के तीसरे मंडल में स्थित गायत्री मंत्र की रचना महर्षि विश्वामित्र ने की थी। यह सूर्य देवता सविता को समर्पित है।',
    era: 'Ancient',
    examTag: 'UPPSC 2018',
    sources: [{ title: 'UPPSC State Service Exam', uri: 'https://uppsc.up.nic.in' }]
  },
  {
    id: 'pyq-hi-30',
    text: 'फरवरी 1922 में किस हिंसक घटना के कारण महात्मा गांधी ने असहयोग आंदोलन को अचानक स्थगित कर दिया था?',
    options: ['चौरी-चौरा कांड (गोरखपुर)', 'काकोरी ट्रेन एक्शन', 'जलियांवाला बाग हत्याकांड', 'चटगांव शस्त्रागार छापा'],
    correctAnswer: 0,
    explanation: '4 फरवरी 1922 को संयुक्त प्रांत के चौरी-चौरा में भीड़ द्वारा पुलिस थाने को जलाने से 22 पुलिसकर्मियों की मृत्यु हो गई थी, जिसके कारण गांधीजी ने 12 फरवरी को असहयोग आंदोलन वापस ले लिया।',
    era: 'Modern',
    examTag: 'RRB NTPC 2021',
    sources: [{ title: 'Railway NTPC Previous Papers', uri: 'https://rrbcdg.gov.in' }]
  }
];

export const PYQ_QUESTIONS_EN: Question[] = [
  {
    id: 'pyq-en-1',
    text: 'Which one of the following is NOT a Harappan site?',
    options: ['Chanhudaro', 'Kot Diji', 'Sohgaura', 'Desalpur'],
    correctAnswer: 2,
    explanation: 'Sohgaura (Gorakhpur, UP) is famous for a Mauryan copper-plate inscription, not a Harappan site. The other three are Indus Valley sites.',
    era: 'Ancient',
    examTag: 'UPSC CSE 2019',
    sources: [{ title: 'UPSC CSE 2019 Prelims', uri: 'https://upsc.gov.in' }]
  },
  {
    id: 'pyq-en-2',
    text: 'In the context of Indian cultural history, which one of the following correctly describes the term "Paramita"?',
    options: [
      'Earliest Dharmashastras written in aphoristic style',
      'Philosophical schools that rejected the authority of Vedas',
      'Perfections whose attainment led to the Bodhisattva path',
      'Powerful merchant guilds of early medieval South India'
    ],
    correctAnswer: 2,
    explanation: 'In Mahayana Buddhism, Paramitas are transcendent virtues/perfections whose cultivation leads to supreme enlightenment and the Bodhisattva ideal.',
    era: 'Ancient',
    examTag: 'UPSC CSE 2020',
    sources: [{ title: 'UPSC CSE 2020 Prelims', uri: 'https://upsc.gov.in' }]
  },
  {
    id: 'pyq-en-3',
    text: 'Who presided over the famous 1931 Karachi Session of the Indian National Congress, where the resolution on Fundamental Rights was passed?',
    options: ['Jawaharlal Nehru', 'Sardar Vallabhbhai Patel', 'Subhas Chandra Bose', 'Dr. Rajendra Prasad'],
    correctAnswer: 1,
    explanation: 'Sardar Vallabhbhai Patel presided over the Karachi Session in March 1931, which adopted key resolutions on Fundamental Rights and National Economic Programme.',
    era: 'Modern',
    examTag: 'UPSC CSE 2021',
    sources: [{ title: 'UPSC CSE 2021 Prelims', uri: 'https://upsc.gov.in' }]
  },
  {
    id: 'pyq-en-4',
    text: 'With reference to the economic history of medieval India, the term "Araghatta" refers to:',
    options: ['Bonded labour', 'Land grants made to military officers', 'Waterwheel used in the irrigation of land', 'Wasteland converted to cultivated land'],
    correctAnswer: 2,
    explanation: 'Araghatta (Persian wheel / Rahat) was a mechanical device consisting of a wheel with pots attached, used to lift water from wells for agriculture.',
    era: 'Medieval',
    examTag: 'UPSC CSE 2016',
    sources: [{ title: 'UPSC CSE 2016 Prelims', uri: 'https://upsc.gov.in' }]
  },
  {
    id: 'pyq-en-5',
    text: 'In the First Battle of Tarain (1191 CE), Prithviraj Chauhan defeated which ruler?',
    options: ['Muhammad Ghori', 'Mahmud of Ghazni', 'Qutb-ud-din Aibak', 'Iltutmish'],
    correctAnswer: 0,
    explanation: 'In 1191 CE at Tarain (modern Haryana), Prithviraj III (Chauhan) decisively defeated Mu\'izz al-Din Muhammad Ghori.',
    era: 'Medieval',
    examTag: 'SSC CGL 2022',
    sources: [{ title: 'SSC CGL Question Papers', uri: 'https://ssc.nic.in' }]
  },
  {
    id: 'pyq-en-6',
    text: 'Banabhatta, the author of "Harshacharita" and "Kadambari", was the court poet of which emperor?',
    options: ['Chandragupta Vikramaditya', 'Harshavardhana', 'Samudragupta', 'Kanishka'],
    correctAnswer: 1,
    explanation: 'Banabhatta was the Asthana Kavi in the court of King Harshavardhana of Kannauj (Pushyabhuti dynasty).',
    era: 'Ancient',
    examTag: 'SSC CGL 2021',
    sources: [{ title: 'SSC Examination Archives', uri: 'https://ssc.nic.in' }]
  },
  {
    id: 'pyq-en-7',
    text: 'The Third Battle of Panipat (1761 CE) was fought between Ahmad Shah Abdali and the:',
    options: ['Mughals', 'Marathas', 'Sikhs', 'British East India Company'],
    correctAnswer: 1,
    explanation: 'On January 14, 1761, Ahmad Shah Durrani (Abdali) defeated the Maratha confederacy led by Sadashivrao Bhau at Panipat.',
    era: 'Modern',
    examTag: 'SSC CGL 2020',
    sources: [{ title: 'SSC CGL History Archives', uri: 'https://ssc.nic.in' }]
  },
  {
    id: 'pyq-en-8',
    text: 'Which two brothers founded the Vijayanagara Empire in 1336 CE along the banks of Tungabhadra river?',
    options: ['Harihara and Bukka', 'Krishnadevaraya and Achyuta Deva Raya', 'Allasani and Peddana', 'Ramraya and Tirumala'],
    correctAnswer: 0,
    explanation: 'Harihara I and Bukka Raya I of the Sangama dynasty established the Vijayanagara Empire in 1336 CE under the spiritual guidance of Saint Vidyaranya.',
    era: 'Medieval',
    examTag: 'SSC CHSL 2021',
    sources: [{ title: 'SSC CHSL Question Bank', uri: 'https://ssc.nic.in' }]
  },
  {
    id: 'pyq-en-9',
    text: 'Which Sultan of Delhi created a separate department called "Diwan-i-Amir-Kohi" for the development of agriculture?',
    options: ['Alauddin Khalji', 'Muhammad bin Tughlaq', 'Firuz Shah Tughlaq', 'Sikandar Lodi'],
    correctAnswer: 1,
    explanation: 'Muhammad bin Tughlaq established the agricultural department Diwan-i-Amir-Kohi to expand crop cultivation and grant agricultural loans (Taccavi).',
    era: 'Medieval',
    examTag: 'UPPSC 2021',
    sources: [{ title: 'UPPSC State Service Exam', uri: 'https://uppsc.up.nic.in' }]
  },
  {
    id: 'pyq-en-10',
    text: 'What was the council of eight ministers in Chhatrapati Shivaji Maharaj\'s administration called?',
    options: ['Navaratna', 'Ashtapradhan', 'Ashtadiggajas', 'Saptarishi'],
    correctAnswer: 1,
    explanation: 'Shivaji\'s council of ministers was called Ashtapradhan, headed by the Peshwa (Prime Minister), followed by Amatya, Senapati, Sumant, etc.',
    era: 'Medieval',
    examTag: 'UPPSC 2020',
    sources: [{ title: 'UPPSC Examination Papers', uri: 'https://uppsc.up.nic.in' }]
  },
  {
    id: 'pyq-en-11',
    text: 'Who authored the famous Prayag Prashasti (Allahabad Pillar Inscription) celebrating the conquests of Samudragupta?',
    options: ['Harishena', 'Ravikirti', 'Banabhatta', 'Veerasena'],
    correctAnswer: 0,
    explanation: 'Harishena, the court poet and minister of Samudragupta, composed the eulogy in classical Sanskrit in Champu style.',
    era: 'Ancient',
    examTag: 'UPPSC 2019',
    sources: [{ title: 'UPPSC History Papers', uri: 'https://uppsc.up.nic.in' }]
  },
  {
    id: 'pyq-en-12',
    text: 'Who led the Revolt of 1857 in Jagdishpur (Bihar) against British colonial forces?',
    options: ['Babu Veer Kunwar Singh', 'Amar Singh', 'Hare Krishna Singh', 'Peer Ali Khan'],
    correctAnswer: 0,
    explanation: 'At the age of 80, the zamindar of Jagdishpur, Babu Kunwar Singh, provided heroic leadership to the 1857 Rebellion in Bihar.',
    era: 'Modern',
    examTag: 'BPSC 66th 2020',
    sources: [{ title: 'BPSC Combined Competitive Exam', uri: 'https://bpsc.bih.nic.in' }]
  },
  {
    id: 'pyq-en-13',
    text: 'In 1917, Mahatma Gandhi launched his first successful Satyagraha in India at Champaran (Bihar) against which practice?',
    options: ['Tinkathia System', 'Ryotwari System', 'Mahalwari System', 'Permanent Settlement'],
    correctAnswer: 1,
    explanation: 'At Champaran, Gandhi championed the cause of indigo farmers against the oppressive Tinkathia system (compulsory cultivation of indigo on 3/20th of land).',
    era: 'Modern',
    examTag: 'BPSC 67th 2022',
    sources: [{ title: 'BPSC Prelims Archive', uri: 'https://bpsc.bih.nic.in' }]
  },
  {
    id: 'pyq-en-14',
    text: 'Which Magadhan ruler originally laid the foundation of Pataliputra city at the confluence of the Ganga and Son rivers?',
    options: ['Bimbisara', 'Ajatashatru', 'Udayin', 'Shishunaga'],
    correctAnswer: 2,
    explanation: 'Udayin (son of Ajatashatru, Haryanka dynasty) shifted the Magadhan capital from Rajagriha to Pataliputra and built a fort there.',
    era: 'Ancient',
    examTag: 'BPSC 68th 2023',
    sources: [{ title: 'BPSC Exam Papers', uri: 'https://bpsc.bih.nic.in' }]
  },
  {
    id: 'pyq-en-15',
    text: 'The grand Kandariya Mahadeva Temple at Khajuraho was built during the reign of which dynasty?',
    options: ['Paramara Dynasty', 'Chandela Dynasty', 'Kalachuri Dynasty', 'Pratihara Dynasty'],
    correctAnswer: 1,
    explanation: 'The Chandela rulers of Bundelkhand constructed the world-famous Khajuraho temple complex between 950 and 1050 CE, of which Kandariya Mahadeva is the most magnificent.',
    era: 'Ancient',
    examTag: 'MPPSC 2021',
    sources: [{ title: 'MPPSC State Examination', uri: 'https://mppsc.mp.gov.in' }]
  },
  {
    id: 'pyq-en-16',
    text: 'Who originally commissioned the Great Stupa at Sanchi in Madhya Pradesh?',
    options: ['Chandragupta Maurya', 'Bindusara', 'Emperor Ashoka', 'Agnimitra Shunga'],
    correctAnswer: 2,
    explanation: 'Emperor Ashoka the Great commissioned the Great Stupa at Sanchi in the 3rd century BCE to enshrine the relics of the Buddha.',
    era: 'Ancient',
    examTag: 'MPPSC 2020',
    sources: [{ title: 'MPPSC Question Bank', uri: 'https://mppsc.mp.gov.in' }]
  },
  {
    id: 'pyq-en-17',
    text: 'Who constructed the historic "Adhai Din Ka Jhonpra" mosque at Ajmer, Rajasthan?',
    options: ['Qutb-ud-din Aibak', 'Iltutmish', 'Alauddin Khalji', 'Balban'],
    correctAnswer: 0,
    explanation: 'In 1192 CE, Qutb-ud-din Aibak ordered the conversion of a Sanskrit college built by Vigraharaja IV (Chauhan king) into the Adhai Din Ka Jhonpra mosque.',
    era: 'Medieval',
    examTag: 'RAS 2021',
    sources: [{ title: 'RPSC Examination Archive', uri: 'https://rpsc.rajasthan.gov.in' }]
  },
  {
    id: 'pyq-en-18',
    text: 'The famous Battle of Haldighati was fought on June 18, 1576 between Maharana Pratap and the Mughal army led by:',
    options: ['Raja Man Singh I', 'Bairam Khan', 'Todar Mal', 'Asaf Khan'],
    correctAnswer: 0,
    explanation: 'The Battle of Haldighati was fought between Maharana Pratap of Mewar and the imperial Mughal forces led by Amber\'s Raja Man Singh I.',
    era: 'Medieval',
    examTag: 'RAS 2018',
    sources: [{ title: 'RPSC Papers', uri: 'https://rpsc.rajasthan.gov.in' }]
  },
  {
    id: 'pyq-en-19',
    text: 'Who renounced his British "Knighthood" title in protest against the Jallianwala Bagh massacre of April 13, 1919?',
    options: ['Mahatma Gandhi', 'Rabindranath Tagore', 'Subhas Chandra Bose', 'Gopal Krishna Gokhale'],
    correctAnswer: 1,
    explanation: 'Rabindranath Tagore surrendered his Knighthood in a moving letter to the Viceroy Lord Chelmsford following the brutal Jallianwala Bagh killings.',
    era: 'Modern',
    examTag: 'RRB NTPC 2021',
    sources: [{ title: 'RRB NTPC Papers', uri: 'https://rrbcdg.gov.in' }]
  },
  {
    id: 'pyq-en-20',
    text: 'The national motto of India, "Satyameva Jayate", inscribed below the Ashoka Lion Capital, is taken from which Upanishad?',
    options: ['Katha Upanishad', 'Mundaka Upanishad', 'Chandogya Upanishad', 'Mandukya Upanishad'],
    correctAnswer: 1,
    explanation: '"Satyameva Jayate" ("Truth alone triumphs") is a sacred mantra from the Mundaka Upanishad (Mantra 3.1.6).',
    era: 'Ancient',
    examTag: 'RRB NTPC 2020',
    sources: [{ title: 'RRB Examination Papers', uri: 'https://rrbcdg.gov.in' }]
  },
  {
    id: 'pyq-en-21',
    text: 'During the Quit India Movement in August 1942, Mahatma Gandhi gave which famous call to the nation?',
    options: ['Do or Die', 'Jai Hind', 'Dilli Chalo', 'Inquilab Zindabad'],
    correctAnswer: 0,
    explanation: 'On August 8, 1942 at Gowalia Tank Maidan in Bombay, Mahatma Gandhi gave the historic clarion call "Karo ya Maro" (Do or Die).',
    era: 'Modern',
    examTag: 'RRB Group D 2022',
    sources: [{ title: 'RRB Group D Papers', uri: 'https://rrbcdg.gov.in' }]
  },
  {
    id: 'pyq-en-22',
    text: 'In which year did Mughal Emperor Akbar promulgate the syncretic religion "Din-i Ilahi"?',
    options: ['1575 CE', '1579 CE', '1582 CE', '1585 CE'],
    correctAnswer: 2,
    explanation: 'Akbar introduced Din-i Ilahi in 1582 CE, merging the finest elements of various faiths to foster universal brotherhood and peace (Sulh-i-kul).',
    era: 'Medieval',
    examTag: 'CDS 2021',
    sources: [{ title: 'UPSC CDS Examination', uri: 'https://upsc.gov.in' }]
  },
  {
    id: 'pyq-en-23',
    text: 'Which British Viceroy is hailed as the "Father of Local Self-Government in India"?',
    options: ['Lord Mayo', 'Lord Ripon', 'Lord Lytton', 'Lord Curzon'],
    correctAnswer: 1,
    explanation: 'Lord Ripon\'s landmark resolution of 1882 laid the foundation of representative municipal boards and rural local self-governing bodies in India.',
    era: 'Modern',
    examTag: 'NDA 2021',
    sources: [{ title: 'UPSC NDA/NA Papers', uri: 'https://upsc.gov.in' }]
  },
  {
    id: 'pyq-en-24',
    text: 'The Chinese Buddhist pilgrim Fa-Hien visited India during the reign of which Gupta emperor?',
    options: ['Samudragupta', 'Chandragupta II (Vikramaditya)', 'Kumaragupta I', 'Skandagupta'],
    correctAnswer: 1,
    explanation: 'Fa-Hien visited India between 399 and 412 CE during the reign of Chandragupta II Vikramaditya to collect authentic Buddhist monastic texts.',
    era: 'Ancient',
    examTag: 'UPSC CSE 2018',
    sources: [{ title: 'UPSC Civil Services Archives', uri: 'https://upsc.gov.in' }]
  },
  {
    id: 'pyq-en-25',
    text: 'In the Battle of Buxar (October 22, 1764), the British forces under Hector Munro defeated the joint forces of:',
    options: [
      'Mir Qasim, Shuja-ud-Daula, and Shah Alam II',
      'Siraj-ud-Daulah and Mir Jafar',
      'Mir Qasim and Tipu Sultan',
      'Hyder Ali and Marathas'
    ],
    correctAnswer: 0,
    explanation: 'The British East India Company defeated the tripartite confederacy of Mir Qasim (Nawab of Bengal), Shuja-ud-Daula (Nawab of Awadh), and Mughal Emperor Shah Alam II.',
    era: 'Modern',
    examTag: 'UPPSC 2022',
    sources: [{ title: 'UPPSC Examination', uri: 'https://uppsc.up.nic.in' }]
  }
];

export function getFallbackQuestions(language: Language, count: number, difficulty?: Difficulty): Question[] {
  const isPYQ = difficulty === Difficulty.PYQ_MOCK;
  let bank: Question[];
  
  if (language === Language.ENGLISH) {
    bank = isPYQ ? [...PYQ_QUESTIONS_EN] : [...PYQ_QUESTIONS_EN];
  } else {
    bank = isPYQ ? [...PYQ_QUESTIONS_HI] : [...PYQ_QUESTIONS_HI];
  }

  // Shuffle array using Fisher-Yates
  const shuffled = [...bank].sort(() => 0.5 - Math.random());
  const selected: Question[] = [];
  
  while (selected.length < count) {
    for (const q of shuffled) {
      selected.push({
        ...q,
        id: `${q.id}-${selected.length}-${Math.random().toString(36).substring(2, 6)}`
      });
      if (selected.length >= count) break;
    }
  }
  return selected.slice(0, count);
}
