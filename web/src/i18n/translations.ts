/**
 * New Blossom Hotel & Spa — Bilingual (English / Amharic) translations
 *
 * Verified Amharic translations sourced from:
 *  - Glosbe English-Amharic dictionary (glosbe.com)
 *  - Abyssinica Dictionary (abyssinica.com)
 *  - AmharicTeacher dictionary (amharicteacher.com)
 *  - OpenTran English-Amharic translator (opentran.net)
 *  - Goethe Verlag Amharic phrasebook (goethe-verlag.com)
 *  - EasyAmharic.com
 *  - SubLearn Amharic phrases
 *  - Google Translate (cross-verified where possible)
 *
 * Brand name "New Blossom" is kept in English across both languages.
 */

export type Locale = "en" | "am";

export const locales: Locale[] = ["en", "am"];
export const defaultLocale: Locale = "en";

type Translation = { en: string; am: string };

export const translations: Record<string, Translation> = {
  "nav.suites": {
    "en": "Suites & Stays",
    "am": "ሱቶችና እረፍት"
  },
  "nav.spa": {
    "en": "Botanical Spa & Hammam",
    "am": "የእፅዋት ስፓ እና ሃማም"
  },
  "nav.dining": {
    "en": "Dining & Rooftop",
    "am": "ምግብ ቤትና የጣሪያ ክፍል"
  },
  "nav.heritage": {
    "en": "Dire Dawa Heritage",
    "am": "የድሬዳዋ ቅርስ"
  },
  "nav.wellness": {
    "en": "Wellness Rituals",
    "am": "የጤና ሥርዓቶች"
  },
  "nav.virtualTour": {
    "en": "360° Tour",
    "am": "360° ጉዞ"
  },
  "nav.contact": {
    "en": "Call us",
    "am": "ይድሩን"
  },
  "nav.bookBtn": {
    "en": "Book Spa & Stay",
    "am": "ስፓና እረፍት ይያዙ"
  },
  "nav.brandSub": {
    "en": "Hotel & Spa · Dire Dawa",
    "am": "ሆቴልና ስፓ · ድሬዳዋ"
  },
  "nav.langToggle": {
    "en": "አማርኛ",
    "am": "English"
  },
  "hero.eyebrow": {
    "en": "Dire Dawa — Heart of the City",
    "am": "ድሬዳዋ — የከተማዋ ልብ"
  },
  "hero.title.italic": {
    "en": "Restorative Calm",
    "am": "የመልስ ሰላም"
  },
  "hero.title.prefix": {
    "en": "A Sanctuary of ",
    "am": "የ"
  },
  "hero.title.suffix": {
    "en": " & Botanical Luxury",
    "am": " ቅንጦት መጠለያ"
  },
  "hero.desc": {
    "en": "Surrender to ancient Ethiopian botanical rituals, warm mineral steam, and timeless hospitality at New Blossom Hotel & Spa. An architectural haven rooted in Dire Dawa's graceful heritage.",
    "am": "በኒው ብሎሰም ሆቴልና ስፓ የጥንታዊ የኢትዮጵያ የእፅዋት ሥርዓቶች፣ ሞቅ ያለ የማዕድን እንፋሎት፣ እና ዘላለማዊ የእንግዳ ተቀባይነት ይቅረቡ። በድሬዳዋ ማራኪ ቅርስ ላይ የተመሰረተ የሕንፃ ጥበብ መጠለያ።"
  },
  "hero.ctaBook": {
    "en": "Book Ritual Experience",
    "am": "የሥርዓት ተሞክሮ ይያዙ"
  },
  "hero.inquiriesLabel": {
    "en": "Direct Inquiries",
    "am": "ቀጥታ ጥያቄዎች"
  },
  "hero.featSpa": {
    "en": "Botanical Spa",
    "am": "የእፅዋት ስፓ"
  },
  "hero.featRooms": {
    "en": "Luxury Rooms",
    "am": "የቅንጦት ክፍሎች"
  },
  "hero.featWifi": {
    "en": "Free WiFi",
    "am": "ነፃ ዋይፋይ"
  },
  "hero.imgBadge": {
    "en": "Dire Dawa Oasis",
    "am": "የድሬዳዋ አምባ"
  },
  "hero.imgTitle": {
    "en": "New Blossom Hotel & Spa",
    "am": "ኒው ብሎሰም ሆቴልና ስፓ"
  },
  "hero.imgDesc": {
    "en": "Sunlit gardens, warm therapeutic stones, and quiet courtyards.",
    "am": "ፀሐያማ አትክልቶች፣ ሞቃት የሕክምና ድኖች፣ እና ፀጥታ ያላቸው ግቢዎች።"
  },
  "book.checkIn": {
    "en": "Check In",
    "am": "መግባት"
  },
  "book.checkOut": {
    "en": "Check Out",
    "am": "መውጣት"
  },
  "book.ritualStay": {
    "en": "Ritual & Stay",
    "am": "ሥርዓትና እረፍት"
  },
  "book.guests": {
    "en": "Guests",
    "am": "እንግዶች"
  },
  "book.availability": {
    "en": "Check Availability",
    "am": "ቦታ መገምገም"
  },
  "book.opt1": {
    "en": "Royal Blossom Spa & Suite",
    "am": "የንጉሥ ብሎሰም ስፓና ሱት"
  },
  "book.opt2": {
    "en": "Botanical Hammam Day Pass",
    "am": "የእፅዋት ሃማም የቀን ፓስ"
  },
  "book.opt3": {
    "en": "Deep Tissue & Steam Ritual",
    "am": "ጥልቅ ቲሹና የእንፋሎት ሥርዓት"
  },
  "book.opt4": {
    "en": "Executive Stay & Spa Retreat",
    "am": "የአስተዳዳሪ እረፍትና የስፓ መልስ"
  },
  "book.guest1": {
    "en": "1 Guest (Solitary Sanctuary)",
    "am": "1 እንግዳ (የአንድነት መጠለያ)"
  },
  "book.guest2": {
    "en": "2 Guests (Couples Retreat)",
    "am": "2 እንግዶች (የባልና ሚስት እረፍት)"
  },
  "book.guest3": {
    "en": "3+ Guests (Private Suite)",
    "am": "3+ እንግዶች (የግል ሱት)"
  },
  "spa.eyebrow": {
    "en": "Holistic Spa & Thermal Arts",
    "am": "ሁለንተናዊ ስፓና የሙቀት ጥበቦች"
  },
  "spa.title": {
    "en": "Our Signature Spa Services",
    "am": "የእኛ የስፓ አገልግሎቶች"
  },
  "spa.desc": {
    "en": "Infusing local Ethiopian botanicals, fragrant Harari coffee scrubs, golden acacia honey, and ancient frankincense into therapeutic wellness treatments.",
    "am": "የአካባቢ የኢትዮጵያ እፅዋት፣ ሽቶ ያለ የሐረሪ ቡና መፋጨት፣ ወርቃማ የአካሺያ ማር፣ እና የጥንታዊ እጣን ወደ የጤና ሕክምና ሕክምናዎች በማዋሃድ።"
  },
  "spa.exploreAll": {
    "en": "Explore All 16 Rituals",
    "am": "ሁሉንም 16 ሥርዓቶች ይመልከቱ"
  },
  "spa.c1.eyebrow": {
    "en": "Botanical Care",
    "am": "የእፅዋት እንክእል"
  },
  "spa.c1.title": {
    "en": "Skin Care & Glow",
    "am": "የቆዳ እንክእልና ብርሃን"
  },
  "spa.c1.desc": {
    "en": "Full-body exfoliating buff using cold-pressed desert seed oils, organic rosewater mist, and crushed mineral clay.",
    "am": "በቀዝቃዛ የተጠመቀ የረሃብ ዘሮች ዘይት፣ ኦርጋኒክ የግራና ውሃ ሽቶ፣ እና የተፈጨ የማዕድን ሸክላ የሙሉ ሰውነት መፋጨት።"
  },
  "spa.c1.f1": {
    "en": "Dead sea salt & coffee scrub",
    "am": "የሞተ ባሕር ጨውና የቡና መፋጨት"
  },
  "spa.c1.f2": {
    "en": "Acacia blossom oil wrap",
    "am": "የአካሺያ አበባ ዘይት መጠቅለል"
  },
  "spa.c1.f3": {
    "en": "60 Min • $65 / 3,500 ETB",
    "am": "60 ደቂቃ • $65 / 3,500 ብር"
  },
  "spa.c2.eyebrow": {
    "en": "Facial Alchemy",
    "am": "የፊት ኬሚስትሪ"
  },
  "spa.c2.title": {
    "en": "Face Care & Hydration",
    "am": "የፊት እንክእልና መረስበት"
  },
  "spa.c2.desc": {
    "en": "Deep dermal lymphatic drainage, golden frankincense steam infusion, and therapeutic fresh aloe vera restorative masks.",
    "am": "ጥልቅ የቆዳ የሊምፍ ፍሳሽ፣ ወርቃማ የእጣን እንፋሎት መታከል፣ እና የሕክምና ትኩስ አሎይ ቬራ የመልስ ጭምብሎች።"
  },
  "spa.c2.f1": {
    "en": "Ultrasonic pore purification",
    "am": "የአልትራሶኒክ ቀዳ ማፅዳት"
  },
  "spa.c2.f2": {
    "en": "24k Gold peptide infusion",
    "am": "24k የወርቅ ፔፕታይድ መታከል"
  },
  "spa.c2.f3": {
    "en": "75 Min • $80 / 4,300 ETB",
    "am": "75 ደቂቃ • $80 / 4,300 ብር"
  },
  "spa.c3.eyebrow": {
    "en": "Deep Therapy",
    "am": "ጥልቅ ሕክምና"
  },
  "spa.c3.title": {
    "en": "Restorative Body Massage",
    "am": "የመልስ የሰውነት ማሳዥ"
  },
  "spa.c3.desc": {
    "en": "Harmonizing Swedish and deep muscle pressure techniques using warmed basalt river stones and eucalyptus aromatics.",
    "am": "የሙቀት የባሳልት ወንዙ ድኖችን እና የኩካሊፕተስ ሽቶ በመጠቀም የስዊዲሽና ጥልቅ የጡንቻ ግፊት ሥራዎችን ማስተካከል።"
  },
  "spa.c3.f1": {
    "en": "Hot stone tension release",
    "am": "የሙቅ ድንጋይ ውጥረት መፍታት"
  },
  "spa.c3.f2": {
    "en": "Custom tension pressure",
    "am": "የተስተካከለ የግፊት ግፊት"
  },
  "spa.c3.f3": {
    "en": "90 Min • $95 / 5,100 ETB",
    "am": "90 ደቂቃ • $95 / 5,100 ብር"
  },
  "spa.c4.eyebrow": {
    "en": "Ethiopian Botanicals",
    "am": "የኢትዮጵያ እፅዋት"
  },
  "spa.c4.title": {
    "en": "Natural Herb Steam Bath",
    "am": "የተፈጥሮ ዕፅ የእንፋሎት መታጠቢያ"
  },
  "spa.c4.desc": {
    "en": "Traditional hammam steam immersion utilizing indigenous mountain thyme (Tosign), myrrh resin, and pure mineral hydrotherapy.",
    "am": "የተወሰነ የተራራ ትምህርት (ቶሲኝ)፣ የሞር ሰረገል፣ እና ንፁህ የማዕድን ውሃ ሕክምና የሚጠቀም የባህላዊ ሃማም የእንፋሎት መጥለቅ።"
  },
  "spa.c4.f1": {
    "en": "Herbal steam chamber",
    "am": "የዕፅ የእንፋሎት ክፍል"
  },
  "spa.c4.f2": {
    "en": "Detoxifying honey glaze",
    "am": "የማር መረቅ መቀባት"
  },
  "spa.c4.f3": {
    "en": "60 Min • $70 / 3,800 ETB",
    "am": "60 ደቂቃ • $70 / 3,800 ብር"
  },
  "spa.bookRitual": {
    "en": "Book Ritual",
    "am": "ሥርዓት ይያዙ"
  },
  "suites.badge": {
    "en": "Master Suite Collection",
    "am": "የዋና ሱት ስብስብ"
  },
  "suites.cardTitle": {
    "en": "The Royal Blossom Suite",
    "am": "የንጉሥ ብሎሰም ሱት"
  },
  "suites.cardDesc": {
    "en": "King Bed • Marble Bath • Garden Balcony",
    "am": "ትልቅ አልጋ • የሰንጠረዥ መታጠቢያ • የአትክልት ቦርጳ"
  },
  "suites.price": {
    "en": "From $110",
    "am": "ከ $110 ጀምሮ"
  },
  "suites.perNight": {
    "en": "/night",
    "am": "/ሌሊት"
  },
  "suites.eyebrow": {
    "en": "Resplendent Accommodations",
    "am": "የሚያምር መኖሪያ"
  },
  "suites.title": {
    "en": "Designed for Deep Rest & Unhurried Mornings",
    "am": "ለጥልቅ እረፍትና ለዘገየ ጠዋቶች የተሰራ"
  },
  "suites.desc": {
    "en": "Every room at New Blossom is intentionally sound-insulated and adorned with soft natural textiles, artisanal wood finishes, and custom aromatherapy diffusers. After an afternoon in our botanical spa, retire to cloud-like bedding and wake up to Dire Dawa birdsong.",
    "am": "በኒው ብሎሰም ያለው እያንዳንዱ ክፍል ለድምፅ መከላከያ ተደርጎ የተሰራ ሲሆን በለስላሳ የተፈጥሮ ጨርቆች፣ የእጅ የእንጨት ማጠናቀቅ፣ እና የተስተካከለ የሽቶ ማሰራጫ ይታጀባል። ከስፓ ቀኑ በኋላ ወደ ደመነፍስ አልጋ ተመልሰው የድሬዳዋን የወፍ ዘፈን ይስሙ።"
  },
  "suites.f1Title": {
    "en": "Private Spa Tub",
    "am": "የግል ስፓ መታጠቢያ"
  },
  "suites.f1Desc": {
    "en": "Ensuite baths with mineral salts and organic botanical soaps.",
    "am": "የክፍል ውስጥ መታጠቢያዎች ከማዕድን ጨውና ኦርጋኒክ የእፅዋት ሳሙናዎች ጋር።"
  },
  "suites.f2Title": {
    "en": "High-Speed WiFi",
    "am": "ፈጣን ዋይፋይ"
  },
  "suites.f2Desc": {
    "en": "Seamless connectivity for executive and leisure travelers.",
    "am": "ለአስተዳዳሪና ለመዝናኛ መንገደኞች ያለምንም እንቅፍት ግንኙነት።"
  },
  "suites.cta": {
    "en": "Reserve Your Stay",
    "am": "እረፍትዎን ይያዙ"
  },
  "suites.includes": {
    "en": "Inclusive of breakfast & morning spa access",
    "am": "ቁርስና የጠዋት ስፓ መግቢያ ይካተታል"
  },
  "dining.eyebrow": {
    "en": "Flavors of Dire Dawa",
    "am": "የድሬዳዋ ጣዕኞች"
  },
  "dining.title": {
    "en": "Nourishing Cuisine & Sunset Sips",
    "am": "የሚመግብ ምግብና የጸሐይ መጥለቅ መጠጦች"
  },
  "dining.desc": {
    "en": "Complete your wellness retreat with fresh fruit parfaits, antioxidant mocktails, and flavorful Horn of Africa dishes served on our garden terrace.",
    "am": "የጤና እረፍትዎን በትኩስ ፍራፍሬ ፓርፌ፣ የአንቲኦክሲዳንት ሞክቴሎች፣ እና የአፍሪካ ቀንድ ምግቦች በአትክልታችን ቴራስ ላይ ያጠናቅቁ።"
  },
  "dining.c1.eyebrow": {
    "en": "Post-Treatment Vitality",
    "am": "ከሕክምና በኋላ ኃይል"
  },
  "dining.c1.title": {
    "en": "Garden Restaurant",
    "am": "የአትክልት ምግብ ቤት"
  },
  "dining.c1.desc": {
    "en": "Layers of freshly harvested Dire Dawa mangoes, whipped coconut yogurt, raw highland honey, and chia seed crunch alongside local and international cuisine.",
    "am": "የተገረፉ የድሬዳዋ ማንጎዎች፣ የተወቀ የኮኮናት ወተት፣ ጥሬ የሰፈር ማር፣ እና የቺያ ዘር ከአካባቢና ከዓለም አቀፍ ምግብ ጋር።"
  },
  "dining.c1.tag1": {
    "en": "Signature Dining",
    "am": "የስም ምግብ"
  },
  "dining.c1.tag2": {
    "en": "Served Daily",
    "am": "በየቀኑ ይሰራል"
  },
  "dining.c2.eyebrow": {
    "en": "Al Fresco Ambience",
    "am": "የውጭ አየር ጠቀሜታ"
  },
  "dining.c2.title": {
    "en": "Courtyard Garden Terrace",
    "am": "የግቢ አትክልት ቴራስ"
  },
  "dining.c2.desc": {
    "en": "Lush bougainvillea shaded tables offering light wellness lunches, organic cold-pressed juices, and evening tea ceremonies.",
    "am": "በቡጋንቪልያ ተደራቢ ሰሌዳዎች ለቀላል የጤና ምሳዎች፣ ኦርጋኒክ ቀዝቃዛ ጭቃሮ ጭማቂዎች፣ እና የማታ የሻይ ሥርዓቶች ይሰጣል።"
  },
  "dining.c2.tag1": {
    "en": "Garden Dining",
    "am": "የአትክልት ምግብ"
  },
  "dining.c2.tag2": {
    "en": "7:00 AM - 11:00 PM",
    "am": "7:00 ጠዋት - 11:00 ማታ"
  },
  "dining.c3.eyebrow": {
    "en": "Private Gatherings",
    "am": "የግል መሰብሰቦች"
  },
  "dining.c3.title": {
    "en": "Executive Lounge & Salon",
    "am": "የአስተዳዳሪ ሳሎን"
  },
  "dining.c3.desc": {
    "en": "Sophisticated air-conditioned gathering space for quiet reading, intimate dinners, and curated retreat seminars. Host to CCRDA workshops and Awash Bank training events.",
    "am": "ለፀጥታ ንባብ፣ የግል ምሳዎች፣ እና ለተዘጋጁ የእረፍት ሥራማርያዎች የማቀዝቀዣ ኤር ያለው የተለየ የመሰብሰብ ቦታ። የCCRDA የስራማርያና የአዋሽ ባንክ ስልጠና ተሳትፎ ቦታ።"
  },
  "dining.c3.tag1": {
    "en": "Private Hire",
    "am": "የግል ኪራይ"
  },
  "dining.c3.tag2": {
    "en": "Concierge Booking",
    "am": "የኮንሲየር ቀጠሮ"
  },
  "test.rating": {
    "en": "3.5 GUEST RATING · 116 REVIEWS",
    "am": "3.5 የእንግዳ ደረጃ · 116 ግምገማዎች"
  },
  "test.quote": {
    "en": "“An unexpected oasis in Dire Dawa. The frankincense steam spa eased away travel fatigue instantly, and the hotel staff treated us with the warmth of family.”",
    "am": "“በድሬዳዋ ያልተጠበቀ አምባ። የእጣን እንፋሎት ስፓ የጉዞ ድካም ወዲያውኑ አርቋል፣ የሆቴሉ ሰራተኞችም እንደ ቤተሰብ ሞቅ ቆዙን።”"
  },
  "test.name": {
    "en": "Sara & Klaus V.",
    "am": "ሳራና ክላውስ ቪ."
  },
  "test.location": {
    "en": "Addis Ababa & Berlin • 4-Night Wellness Stay",
    "am": "አዲስ አበባና በርሊን • 4-ሌሊት የጤና እረፍት"
  },
  "test.privTitle": {
    "en": "Complimentary Privileges",
    "am": "ነፃ መብቶች"
  },
  "test.priv1": {
    "en": "Complimentary DIR Airport chauffeur pickup",
    "am": "ነፃ የDIR አውሮፕላን ማረፊያ መኪና መውሰድ"
  },
  "test.priv2": {
    "en": "Afternoon Harar coffee ceremony & fresh dates",
    "am": "የከሰከሰ የሐረሪ ቡና ሥርዓትና ትኩስ ጥሬ ቀኖች"
  },
  "test.priv3": {
    "en": "Complimentary 30-min sauna with each stay",
    "am": "በእያንዳንዱ እረፍት ላይ ነፃ 30-ደቂቃ ሳውና"
  },
  "news.eyebrow": {
    "en": "VIP Sanctuary Club",
    "am": "የVIP መጠለያ ክለብ"
  },
  "news.title": {
    "en": "Receive Exclusive Seasonal Wellness Privileges",
    "am": "የተለዩ የወቅት የጤና መብቶችን ይቀበሉ"
  },
  "news.desc": {
    "en": "Subscribe for invitations to holistic wellness weekends, seasonal spa retreat packages, and cultural excursions across Eastern Ethiopia.",
    "am": "ለሁለንተናዊ የጤና ሳምንታት፣ ለወቅታዊ የስፓ መልስ ፓኬጆች፣ እና ለምስራቅ ኢትዮጵያ ባህላዊ ጉብኝቶች መግቢያ ይመዝገቡ።"
  },
  "news.placeholder": {
    "en": "Enter your email address",
    "am": "የኢሜይል አድራሻዎን ያስገቡ"
  },
  "news.subscribe": {
    "en": "Subscribe",
    "am": "ይመዝገቡ"
  },
  "news.privacy": {
    "en": "We respect your tranquil privacy. Unsubscribe anytime.",
    "am": "የእርስዎን ፀጥታ እናከብራለን። በማንኛውም ጊዜ ምዝገባዎን ይሰርዙ።"
  },
  "footer.desc": {
    "en": "An oasis of serene botanicals, warm mineral waters, and mindful Ethiopian hospitality nestled in historical Dire Dawa.",
    "am": "በታሪካዊ ድሬዳዋ የሚገኝ የፀጥታ እፅዋት፣ ሞቅ ያለ የማዕድን ውሃ፣ እና ሚስጥላዊ የኢትዮጵያ እንግዳ ተቀባይነት አምባ።"
  },
  "footer.sanctuaryArts": {
    "en": "Sanctuary & Healing Arts",
    "am": "መጠለያና የመልስ ጥበቦች"
  },
  "footer.col1Title": {
    "en": "The Sanctuary",
    "am": "መጠለያው"
  },
  "footer.col1a": {
    "en": "Botanical Spa & Hammam",
    "am": "የእፅዋት ስፓ እና ሃማም"
  },
  "footer.col1b": {
    "en": "Bespoke Healing Rituals",
    "am": "የተለዩ የመልስ ሥርዓቶች"
  },
  "footer.col1c": {
    "en": "Villa Suites & Pavilions",
    "am": "የቪላ ሱቶችና መኖሪያዎች"
  },
  "footer.col1d": {
    "en": "Oasis Terrace & Rooftop Lounge",
    "am": "የአምባ ቴራስና የጣሪያ ሳሎን"
  },
  "footer.col2Title": {
    "en": "Heritage & Locale",
    "am": "ቅርስና ቦታ"
  },
  "footer.col2a": {
    "en": "Historic Chemin de Fer Excursions",
    "am": "የታሪካዊ ባቡር ጉዞዎች"
  },
  "footer.col2b": {
    "en": "Spice Route Botanicals",
    "am": "የቅመም መንገድ እፅዋት"
  },
  "footer.col2c": {
    "en": "Kezira French Architecture Walk",
    "am": "የከዚራ የፈረንሳይ ሕንፃ ጉዞ"
  },
  "footer.col2d": {
    "en": "Private Transfers & Concierge",
    "am": "የግል መኪናና ኮንሲየር"
  },
  "footer.col3Title": {
    "en": "Private Inquiries",
    "am": "የግል ጥያቄዎች"
  },
  "footer.col3Addr": {
    "en": "Ratu Road, Dire Dawa, Ethiopia",
    "am": "ራቱ መንገድ፣ ድሬዳዋ፣ ኢትዮጵያ"
  },
  "footer.copyright": {
    "en": "© 2025 New Blossom Hotel & Spa, Dire Dawa. All rights reserved.",
    "am": "© 2025 ኒው ብሎሰም ሆቴልና ስፓ፣ ድሬዳዋ። መብቱ በሕግ የተጠበቀ ነው።"
  },
  "footer.privacy": {
    "en": "Privacy Sanctuary",
    "am": "የግላዊነት መጠለያ"
  },
  "footer.terms": {
    "en": "Guest Terms",
    "am": "የእንግዳ ውሎች"
  },
  "footer.sustainability": {
    "en": "Sustainability Charter",
    "am": "የተከታተል ስምምነት"
  },
  "sp.eyebrow": {
    "en": "Suites & Stays",
    "am": "ሱቶችና እረፍት"
  },
  "sp.title.italic": {
    "en": "Deep Rest",
    "am": "ጥልቅ እረፍት"
  },
  "sp.desc": {
    "en": "Every room at New Blossom is sound-insulated with soft natural textiles, artisanal wood finishes, and aromatherapy diffusers. Choose from our collection of suites and standard rooms.",
    "am": "በኒው ብሎሰም ያለው እያንዳንዱ ክፍል ለድምፅ መከላከያ ተደርጎ ከለስላሳ የተፈጥሮ ጨርቆች፣ የእጅ የእንጨት ማጠናቀቅ፣ እና የሽቶ ማሰራጫ ጋር የተሰራ ነው። ከሱቶቻችንና ከመደበኛ ክፍሎቻችን ይምረጡ።"
  },
  "sp.featured": {
    "en": "Featured",
    "am": "ተመራጭ"
  },
  "sp.premier": {
    "en": "Premier Suite",
    "am": "የመጀመሪያ ሱት"
  },
  "sp.suiteTitle": {
    "en": "The Royal Blossom Suite",
    "am": "የንጉሥ ብሎሰም ሱት"
  },
  "sp.suiteDesc": {
    "en": "Our flagship suite with king bed, marble ensuite bath, private garden balcony, and complimentary aromatherapy setup. Wake to Dire Dawa birdsong in cloud-like bedding.",
    "am": "በትልቅ አልጋ፣ የሰንጠረዥ የክፍል ውስጥ መታጠቢያ፣ የግል የአትክልት ቦርጳ፣ እና ነፃ የሽቶ ማሰራጫ የተሰለፈ ዋና ሱታችን። በደመነፍስ አልጋ የድሬዳዋን የወፍ ዘፈን ይስሙ።"
  },
  "sp.kingBed": {
    "en": "King Bed",
    "am": "ትልቅ አልጋ"
  },
  "sp.kingBedDesc": {
    "en": "Plush orthopedic mattress",
    "am": "ለስለስ ያለ የOrthopedic አልጋ"
  },
  "sp.marbleBath": {
    "en": "Marble Bath",
    "am": "የሰንጠረዥ መታጠቢያ"
  },
  "sp.marbleBathDesc": {
    "en": "Mineral salts included",
    "am": "የማዕድን ጨው ይካተታል"
  },
  "sp.balcony": {
    "en": "Garden Balcony",
    "am": "የአትክልት ቦርጳ"
  },
  "sp.balconyDesc": {
    "en": "Private outdoor space",
    "am": "የግል የውጭ ቦታ"
  },
  "sp.wifi": {
    "en": "High-Speed WiFi",
    "am": "ፈጣን ዋይፋይ"
  },
  "sp.wifiDesc": {
    "en": "Seamless connectivity",
    "am": "ያለምንም እንቅፍት ግንኙነት"
  },
  "sp.fromPrice": {
    "en": "From $110",
    "am": "ከ $110 ጀምሮ"
  },
  "sp.perNight": {
    "en": "/night",
    "am": "/ሌሊት"
  },
  "sp.reserveNow": {
    "en": "Reserve Now",
    "am": "አሁን ይያዙ"
  },
  "sp.comfortRoom": {
    "en": "Comfort Room",
    "am": "የምቾት ክፍል"
  },
  "sp.deluxeTitle": {
    "en": "Deluxe Garden Room",
    "am": "የመልክ የአትክልት ክፍል"
  },
  "sp.deluxeDesc": {
    "en": "A cozy retreat with queen bed, ensuite bathroom with botanical soaps, and garden-facing windows. Perfect for solo travelers or couples seeking tranquility.",
    "am": "በንግስት አልጋ፣ ከእፅዋት ሳሙና ጋር የክፍል ውስጥ መታጠቢያ፣ እና ወደ አትክልት የሚቆሙ መስኮቶች ያሉት ለስለስ ያለ መጠለያ። ለነጠላ መንገደኞች ወይም ለፀጥታ ለሚፈልጉ ጥንዶች ፍጹም ነው።"
  },
  "sp.queenBed": {
    "en": "Queen Bed",
    "am": "የንግስት አልጋ"
  },
  "sp.queenBedDesc": {
    "en": "Premium linens",
    "am": "የተመረጡ ጨርቆች"
  },
  "sp.gardenView": {
    "en": "Garden View",
    "am": "የአትክልት እይታ"
  },
  "sp.gardenViewDesc": {
    "en": "Natural light",
    "am": "የተፈጥሮ ብርሃን"
  },
  "sp.fromPrice2": {
    "en": "From $75",
    "am": "ከ $75 ጀምሮ"
  },
  "sp.amenitiesEyebrow": {
    "en": "In-Room Amenities",
    "am": "የክፍል እቅዶች"
  },
  "sp.amenitiesTitle": {
    "en": "Every Comfort Considered",
    "am": "ሁሉም ምቾት ተገምቶ"
  },
  "sp.amFreeWifi": {
    "en": "Free WiFi",
    "am": "ነፃ ዋይፋይ"
  },
  "sp.amFreeWifiDesc": {
    "en": "High-speed throughout",
    "am": "በሙሉ ፈጣን"
  },
  "sp.amAC": {
    "en": "Air Conditioning",
    "am": "የአየር ማቀዝቀዣ"
  },
  "sp.amACDesc": {
    "en": "Climate control in every room",
    "am": "በእያንዳንዱ ክፍል የአየር ቁጥጥር"
  },
  "sp.amTea": {
    "en": "Tea & Coffee",
    "am": "ሻይና ቡና"
  },
  "sp.amTeaDesc": {
    "en": "Harar coffee in every room",
    "am": "የሐረሪ ቡና በእያንዳንዱ ክፍል"
  },
  "sp.amRoomService": {
    "en": "Room Service",
    "am": "የክፍል አገልግሎት"
  },
  "sp.amRoomServiceDesc": {
    "en": "24-hour concierge",
    "am": "24-ሰዓት ኮንሲየር"
  },
  "sp.amBreakfast": {
    "en": "Breakfast",
    "am": "ቁርስ"
  },
  "sp.amBreakfastDesc": {
    "en": "Included with every stay",
    "am": "በእያንዳንዱ እረፍት ይካተታል"
  },
  "sp.amParking": {
    "en": "Free Parking",
    "am": "ነፃ የመኪና ማቆሚያ"
  },
  "sp.amParkingDesc": {
    "en": "Secure on-site parking",
    "am": "ደህንነቱ የተጠበቀ የቦታ ውስጥ ማቆሚያ"
  },
  "sp.amTV": {
    "en": "Smart TV",
    "am": "ስማርት ቲቪ"
  },
  "sp.amTVDesc": {
    "en": "Satellite channels",
    "am": "የሳተላይት ቻናሎች"
  },
  "sp.amSecurity": {
    "en": "24h Security",
    "am": "24ሰዓት ደህንነት"
  },
  "sp.amSecurityDesc": {
    "en": "Safe & secure premises",
    "am": "ደህንነቱ የተጠበቀ ቦታ"
  },
  "sp.galleryEyebrow": {
    "en": "Visual Tour",
    "am": "የእይታ ጉዞ"
  },
  "sp.galleryTitle": {
    "en": "Hotel Gallery",
    "am": "የሆቴል ማዕከለ-ስዕሎች"
  },
  "bsp.eyebrow": {
    "en": "Botanical Spa & Hammam",
    "am": "የእፅዋት ስፓ እና ሃማም"
  },
  "bsp.title.italic": {
    "en": "Botanical Healing",
    "am": "የእፅዋት መልስ"
  },
  "bsp.desc": {
    "en": "Infusing local Ethiopian botanicals, fragrant Harari coffee scrubs, golden acacia honey, and ancient frankincense into therapeutic wellness treatments.",
    "am": "የአካባቢ የኢትዮጵያ እፅዋት፣ ሽቶ ያለ የሐረሪ ቡና መፋጨት፣ ወርቃማ የአካሺያ ማር፣ እና የጥንታዊ እጣን ወደ የጤና ሕክምና ሕክምናዎች በማዋሃድ።"
  },
  "bsp.ctaBook": {
    "en": "Book a Ritual",
    "am": "ሥርዓት ይያዙ"
  },
  "bsp.inquiriesLabel": {
    "en": "Spa Inquiries",
    "am": "የስፓ ጥያቄዎች"
  },
  "bsp.servicesEyebrow": {
    "en": "Holistic Spa & Thermal Arts",
    "am": "ሁለንተናዊ ስፓና የሙቀት ጥበቦች"
  },
  "bsp.servicesTitle": {
    "en": "Our Signature Spa Services",
    "am": "የእኛ የስፓ አገልግሎቶች"
  },
  "bsp.servicesDesc": {
    "en": "Sixteen rituals blending Ethiopian botanicals with modern therapeutic techniques.",
    "am": "የኢትዮጵያ እፅዋትን ከዘመናዊ የሕክምና ሥራዎች ጋር የሚያዋሐዱ 16 ሥርዓቶች።"
  },
  "bsp.hammamEyebrow": {
    "en": "Traditional Hammam",
    "am": "የባህላዊ ሃማም"
  },
  "bsp.hammamTitle": {
    "en": "The Steam Ritual",
    "am": "የእንፋሎት ሥርዓት"
  },
  "bsp.hammamDesc": {
    "en": "Our traditional Ethiopian hammam combines mineral-rich steam with indigenous herbs. The ritual begins with a full-body warm-up in the steam chamber, followed by exfoliation with black soap and kessa gloves, and concludes with a cooling rinse and honey glaze application.",
    "am": "የባህላዊ የኢትዮጵያ ሃማም ለማዕድን ባለጠጋ እንፋሎትን ከአካባቢ ዕፅዋት ጋር ያዋሐዳል። ሥርዓቱ በእንፋሎት ክፍል የሙሉ ሰውነት ሙቀት ማግኘት ይጀምራል፣ ከዚያ በጥቁር ሳሙናና በኬሳ ጓንቲ መፋጨት ይቀጥላል፣ በማር መቀባትና በማቀዝቀዝ ይያያዛል።"
  },
  "bsp.step1": {
    "en": "Step 1: Mineral Steam",
    "am": "ደረጃ 1: የማዕድን እንፋሎት"
  },
  "bsp.step1Desc": {
    "en": "15-minute immersion in herb-infused steam chamber",
    "am": "በዕፅ የተቀመመ የእንፋሎት ክፍል ውስጥ 15-ደቂቃ መጥለቅ"
  },
  "bsp.step2": {
    "en": "Step 2: Exfoliation",
    "am": "ደረጃ 2: መፋጨት"
  },
  "bsp.step2Desc": {
    "en": "Black soap and kessa glove full-body scrub",
    "am": "ጥቁር ሳሙናና ኬሳ ጓንቲ የሙሉ ሰውነት መፋጨት"
  },
  "bsp.step3": {
    "en": "Step 3: Honey Glaze",
    "am": "ደረጃ 3: የማር መቀባት"
  },
  "bsp.step3Desc": {
    "en": "Acacia honey application and cooling rinse",
    "am": "የአካሺያ ማር መቀባትና ማቀዝቀዝ"
  },
  "bsp.bookHammam": {
    "en": "Book Hammam Session",
    "am": "የሃማም ቀጠር ይያዙ"
  },
  "bsp.galleryEyebrow": {
    "en": "Spa Spaces",
    "am": "የስፓ ቦታዎች"
  },
  "bsp.galleryTitle": {
    "en": "Inside the Sanctuary",
    "am": "በመጠለያው ውስጥ"
  },
  "dp.eyebrow": {
    "en": "Dining & Rooftop",
    "am": "ምግብ ቤትና የጣሪያ ክፍል"
  },
  "dp.title.italic": {
    "en": "Dire Dawa",
    "am": "ድሬዳዋ"
  },
  "dp.desc": {
    "en": "Fresh fruit parfaits, antioxidant mocktails, and flavorful Horn of Africa dishes served on our garden terrace and in our restaurant.",
    "am": "ትኩስ ፍራፍሬ ፓርፌ፣ የአንቲኦክሲዳንት ሞክቴሎች፣ እና የአፍሪካ ቀንድ ምግቦች በአትክልታችን ቴራስና በምግብ ቤታችን ይሰራሉ።"
  },
  "dp.openDaily": {
    "en": "Open Daily",
    "am": "በየቀኑ ክፍት"
  },
  "dp.hours": {
    "en": "7:00 AM - 11:00 PM",
    "am": "7:00 ጠዋት - 11:00 ማታ"
  },
  "dp.expEyebrow": {
    "en": "Culinary Experiences",
    "am": "የምግብ ተሞክሮዎች"
  },
  "dp.expTitle": {
    "en": "Where to Dine",
    "am": "የሚመገቡበት ቦታ"
  },
  "dp.gardenEyebrow": {
    "en": "All-Day Dining",
    "am": "ሙሉ ቀን ምግብ"
  },
  "dp.gardenTitle": {
    "en": "Garden Restaurant",
    "am": "የአትክልት ምግብ ቤት"
  },
  "dp.gardenDesc": {
    "en": "Local and international cuisine featuring Dire Dawa mangoes, highland honey, and Horn of Africa specialties. Buffet breakfast included with stays.",
    "am": "የድሬዳዋ ማንጎዎች፣ የሰፈር ማር፣ እና የአፍሪካ ቀንድ ልዩ ምግቦች የሚካተቱበት የአካባቢና የዓለም አቀፍ ምግብ። ቡፌ ቁርስ ከእረፍት ጋር ይካተታል።"
  },
  "dp.gardenTag1": {
    "en": "Breakfast & Dinner",
    "am": "ቁርስና እራት"
  },
  "dp.gardenTag2": {
    "en": "7 AM - 11 PM",
    "am": "7 ጠዋት - 11 ማታ"
  },
  "dp.courtyardEyebrow": {
    "en": "Al Fresco",
    "am": "የውጭ አየር"
  },
  "dp.courtyardTitle": {
    "en": "Courtyard Garden Terrace",
    "am": "የግቢ አትክልት ቴራስ"
  },
  "dp.courtyardDesc": {
    "en": "Lush bougainvillea shaded tables offering light wellness lunches, organic cold-pressed juices, and evening tea ceremonies.",
    "am": "በቡጋንቪልያ ተደራቢ ሰሌዳዎች ለቀላል የጤና ምሳዎች፣ ኦርጋኒክ ቀዝቃዛ ጭቃሮ ጭማቂዎች፣ እና የማታ የሻይ ሥርዓቶች ይሰጣል።"
  },
  "dp.courtyardTag1": {
    "en": "Outdoor Dining",
    "am": "የውጭ ምግብ"
  },
  "dp.courtyardTag2": {
    "en": "Weather Permitting",
    "am": "አየር ሲፈቅድ"
  },
  "dp.loungeEyebrow": {
    "en": "Private Gatherings",
    "am": "የግል መሰብሰቦች"
  },
  "dp.loungeTitle": {
    "en": "Executive Lounge & Salon",
    "am": "የአስተዳዳሪ ሳሎን"
  },
  "dp.loungeDesc": {
    "en": "Sophisticated air-conditioned space for quiet reading, intimate dinners, and curated retreat seminars. Host to CCRDA workshops and Awash Bank events.",
    "am": "ለፀጥታ ንባብ፣ የግል ምሳዎች፣ እና ለተዘጋጁ የእረፍት ሥራማርያዎች የማቀዝቀዣ ኤር ያለው የተለየ ቦታ። የCCRDA ስራማርያና የአዋሽ ባንክ ተሳትፎ ቦታ።"
  },
  "dp.loungeTag1": {
    "en": "Private Hire",
    "am": "የግል ኪራይ"
  },
  "dp.loungeTag2": {
    "en": "Concierge Booking",
    "am": "የኮንሲየር ቀጠሮ"
  },
  "dp.menuEyebrow": {
    "en": "Tasting Menu",
    "am": "የጣዕም ምናሌ"
  },
  "dp.menuTitle": {
    "en": "Signature Dishes",
    "am": "የስም ምግቦች"
  },
  "dp.menuDesc": {
    "en": "A selection of our most beloved dishes, blending Ethiopian tradition with wellness-focused cuisine.",
    "am": "የኢትዮጵያ ባህልን ከጤና ምግብ ጋር የሚያዋሐዱ በጣም የተወደዱ ምግቦቻችን።"
  },
  "dp.dish1Eyebrow": {
    "en": "Post-Treatment",
    "am": "ከሕክምና በኋላ"
  },
  "dp.dish1Title": {
    "en": "Tropical Mango Parfait",
    "am": "የተራቆቀ የማንጎ ፓርፌ"
  },
  "dp.dish1Desc": {
    "en": "Freshly harvested Dire Dawa mangoes, whipped coconut yogurt, raw highland honey, and chia seed crunch.",
    "am": "ቅርፍ የተገረፉ የድሬዳዋ ማንጎዎች፣ የተወቀ የኮኮናት ወተት፣ ጥሬ የሰፈር ማር፣ እና የቺያ ዘር።"
  },
  "dp.dish2Eyebrow": {
    "en": "Afternoon Ritual",
    "am": "የከሰከሰ ሥርዓት"
  },
  "dp.dish2Title": {
    "en": "Harar Coffee Ceremony",
    "am": "የሐረሪ ቡና ሥርዓት"
  },
  "dp.dish2Desc": {
    "en": "Traditional Ethiopian coffee ceremony with freshly roasted Harar beans, served with fresh dates and popcorn.",
    "am": "በቅርፍ የተቆላ የሐረሪ ቡና ከሎም ጋር የሚሰራ የባህላዊ የኢትዮጵያ ቡና ሥርዓት፣ ከትኩስ ጥሬ ቀኖችና ከፖፖኮርን ጋር።"
  },
  "dp.dish3Eyebrow": {
    "en": "Local Speciality",
    "am": "የአካባቢ ልዩ ምግብ"
  },
  "dp.dish3Title": {
    "en": "Horn of Africa Platter",
    "am": "የአፍሪካ ቀንድ ድስት"
  },
  "dp.dish3Desc": {
    "en": "A curated selection of Ethiopian and Somali dishes, featuring spiced lamb, lentil stews, and injera bread.",
    "am": "የተዘጋጁ የኢትዮጵያና የሶማሌ ምግቦች ስብስብ፣ የቅመም በግ፣ የምስር ወጥ፣ እና እንጀራ የሚካተቱ።"
  },
  "dp.dish4Eyebrow": {
    "en": "Wellness Bar",
    "am": "የጤና ቡና"
  },
  "dp.dish4Title": {
    "en": "Cold-Pressed Juices",
    "am": "ቀዝቃዛ ጭቃሮ ጭማቂዎች"
  },
  "dp.dish4Desc": {
    "en": "Organic antioxidant mocktails and fresh-pressed juices using local tropical fruits and highland herbs.",
    "am": "ኦርጋኒክ የአንቲኦክሲዳንት ሞክቴሎችና በአካባቢ የተራቆቁ ፍራፍሬዎችና የሰፈር ዕፅዋት የተገመቱ ትኩስ ጭማቂዎች።"
  },
  "dp.rmEyebrow": {
    "en": "Restaurant Menu",
    "am": "የምግብ ቤት ምናሌ"
  },
  "dp.rmTitle": {
    "en": "Our Menu",
    "am": "የእኛ ምናሌ"
  },
  "dp.rmDesc": {
    "en": "Freshly prepared salads and soups using local Dire Dawa produce. All prices in ETB and include service charge & VAT.",
    "am": "በአካባቢ የድሬዳዋ ምርቶች የተሰሩ ትኩስ ሰላጣዎችና ሾርባዎች። ሁሉም ዋጋዎች በETB ና፣ የአገልግሎት ክፍያና ቫት ይካተታሉ።"
  },
  "dp.rmSoups": {
    "en": "Soups",
    "am": "ሾርባዎች"
  },
  "dp.rmSalads": {
    "en": "Salads",
    "am": "ሰላጣዎች"
  },
  "dp.rmNote": {
    "en": "All prices are in Ethiopian Birr (ETB) and include service charge & VAT.",
    "am": "ሁሉም ዋጋዎች በኢትዮጵያ ብር (ETB) ና፣ የአገልግሎት ክፍያና ቫት ይካተታሉ።"
  },
  "dp.s1Name": {
    "en": "Chicken Cream Soup",
    "am": "የዶሮ ክሬም ሾርባ"
  },
  "dp.s1Desc": {
    "en": "Chicken meat, cream, butter",
    "am": "የዶሮ ስጋ፣ ክሬም፣ ቅቤ"
  },
  "dp.s2Name": {
    "en": "Tomato Cream Soup",
    "am": "የቲማቲም ክሬም ሾርባ"
  },
  "dp.s2Desc": {
    "en": "Tomato purée, cream, butter",
    "am": "የቲማቲም ጭቃ፣ ክሬም፣ ቅቤ"
  },
  "dp.s3Name": {
    "en": "Carrot Cream Soup",
    "am": "የካሮት ክሬም ሾርባ"
  },
  "dp.s3Desc": {
    "en": "Carrot, cream, butter",
    "am": "ካሮት፣ ክሬም፣ ቅቤ"
  },
  "dp.s4Name": {
    "en": "Hot & Sour Soup",
    "am": "ቅመም እና መራራ ሾርባ"
  },
  "dp.s4Desc": {
    "en": "Cabbage, carrot, mushroom, chili sauce",
    "am": "ጥቅል ጎመን፣ ካሮት፣ እንጉዳይ፣ የቅመም መረቅ"
  },
  "dp.s5Name": {
    "en": "Minestrone Soup",
    "am": "ሚኔስትሮኔ ሾርባ"
  },
  "dp.s5Desc": {
    "en": "Pasta, tomato, onion",
    "am": "ፓስታ፣ ቲማቲም፣ ሽንኩርት"
  },
  "dp.s6Name": {
    "en": "Tomato Soup",
    "am": "የቲማቲም ሾርባ"
  },
  "dp.s6Desc": {
    "en": "Tomato purée, onion, fresh tomato",
    "am": "የቲማቲም ጭቃ፣ ሽንኩርት፣ ትኩስ ቲማቲም"
  },
  "dp.s7Name": {
    "en": "Vegetable Soup",
    "am": "የአትክልት ሾርባ"
  },
  "dp.s7Desc": {
    "en": "Carrot, cabbage, potato, green peas",
    "am": "ካሮት፣ ጥቅል ጎመን፣ ድንች፣ አረንጓዴ አተር"
  },
  "dp.s8Name": {
    "en": "Chicken Corn Soup",
    "am": "የዶሮ በቆሎ ሾርባ"
  },
  "dp.s8Desc": {
    "en": "Chicken meat, sweet corn",
    "am": "የዶሮ ስጋ፣ ጣፋጭ በቆሎ"
  },
  "dp.s9Name": {
    "en": "Mixed Special Soup",
    "am": "የተቀላቀለ ልዩ ሾርባ"
  },
  "dp.s9Desc": {
    "en": "Chicken, carrot, onion, beef",
    "am": "ዶሮ፣ ካሮት፣ ሽንኩርት፣ የበሬ ስጋ"
  },
  "dp.sl1Name": {
    "en": "New Blossom Special Salad",
    "am": "የኒው ብሎሰም ልዩ ሰላጣ"
  },
  "dp.sl1Desc": {
    "en": "Boiled chicken, boiled beet, tuna, papaya, avocado",
    "am": "የቀቀለ ዶሮ፣ የቀቀለ ቀይ ስኳር ድንች፣ ቱና፣ ፓፓያ፣ አቮካዶ"
  },
  "dp.sl2Name": {
    "en": "Mixed Salad",
    "am": "የተቀላቀለ ሰላጣ"
  },
  "dp.sl2Desc": {
    "en": "Lettuce, onion, tomato, carrot, dressing",
    "am": "ሰላጣ፣ ሽንኩርት፣ ቲማቲም፣ ካሮት፣ መረቅ"
  },
  "dp.sl3Name": {
    "en": "Tuna Salad",
    "am": "የቱና ሰላጣ"
  },
  "dp.sl3Desc": {
    "en": "Tuna, mixed salad",
    "am": "ቱና፣ የተቀላቀለ ሰላጣ"
  },
  "dp.sl4Name": {
    "en": "Chicken Salad",
    "am": "የዶሮ ሰላጣ"
  },
  "dp.sl4Desc": {
    "en": "Chicken, mixed salad",
    "am": "ዶሮ፣ የተቀላቀለ ሰላጣ"
  },
  "dp.sl5Name": {
    "en": "Vegetable Salad",
    "am": "የአትክልት ሰላጣ"
  },
  "dp.sl5Desc": {
    "en": "Carrot, cabbage, onion, green pea, green pepper, sweet corn",
    "am": "ካሮት፣ ጥቅል ጎመን፣ ሽንኩርት፣ አረንጓዴ አተር፣ አረንጓዴ ቃሪያ፣ ጣፋጭ በቆሎ"
  },
  "dp.sl6Name": {
    "en": "Potato Salad",
    "am": "የድንች ሰላጣ"
  },
  "dp.sl6Desc": {
    "en": "Boiled potato, tomato, onion, green pepper",
    "am": "የቀቀለ ድንች፣ ቲማቲም፣ ሽንኩርት፣ አረንጓዴ ቃሪያ"
  },
  "dp.sl7Name": {
    "en": "Russian Salad",
    "am": "የራሺያ ሰላጣ"
  },
  "dp.sl7Desc": {
    "en": "Beef meat, carrot, green peas, mayonnaise",
    "am": "የበሬ ስጋ፣ ካሮት፣ አረንጓዴ አተር፣ ማዮኔዝ"
  },
  "dp.sl8Name": {
    "en": "Beef Salad",
    "am": "የበሬ ስጋ ሰላጣ"
  },
  "dp.sl8Desc": {
    "en": "Cooked beef, green pea, tomato, carrot, sweet corn",
    "am": "የቀቀለ የበሬ ስጋ፣ አረንጓዴ አተር፣ ቲማቲም፣ ካሮት፣ ጣፋጭ በቆሎ"
  },
  "dp.sl9Name": {
    "en": "Italian Salad",
    "am": "የጣሊያን ሰላጣ"
  },
  "dp.sl9Desc": {
    "en": "Boiled beef, diced carrot, potato, mayonnaise",
    "am": "የቀቀለ የበሬ ስጋ፣ የተከከለ ካሮት፣ ድንች፣ ማዮኔዝ"
  },
  "dp.sl10Name": {
    "en": "Cooked Vegetable Salad",
    "am": "የቀቀለ የአትክልት ሰላጣ"
  },
  "dp.sl10Desc": {
    "en": "Cooked carrot, potato, onion, cabbage",
    "am": "የቀቀለ ካሮት፣ ድንች፣ ሽንኩርት፣ ጥቅል ጎመን"
  },
  "dp.eventsEyebrow": {
    "en": "Private Events",
    "am": "የግል ዝግጅቶች"
  },
  "dp.eventsTitle": {
    "en": "Conferences & Gatherings",
    "am": "ስብሰባዎችና ስብሰብ"
  },
  "dp.eventsDesc": {
    "en": "Our executive lounge and salon spaces have hosted CCRDA advocacy workshops, Awash Bank business development training, and corporate retreats. We offer tailored packages with catering, AV equipment, and spa add-ons for your group.",
    "am": "የአስተዳዳሪ ሳሎናዎቻችን የCCRDA የስራማርያ፣ የአዋሽ ባንክ ስልጠና፣ እና የድርጅት እረፍት ተሳትፎ አድርጓል። ለቡድንዎ የተስተካከለ ፓኬጅ ከምግብ፣ ከAV መሳሪያ፣ እና ከስፓ ተጨማሪ ጋር እናቀርባለን።"
  },
  "dp.eventsF1": {
    "en": "Up to 80 Guests",
    "am": "እስከ 80 እንግዶች"
  },
  "dp.eventsF1Desc": {
    "en": "Flexible event space",
    "am": "ሊለወጥ የሚችል የዝግጅት ቦታ"
  },
  "dp.eventsF2": {
    "en": "Catering Included",
    "am": "ምግብ ይካተታል"
  },
  "dp.eventsF2Desc": {
    "en": "Custom menus available",
    "am": "የተስተካከለ ምናሌ ይገኛል"
  },
  "dp.eventsF3": {
    "en": "Spa Add-Ons",
    "am": "የስፓ ተጨማሪዎች"
  },
  "dp.eventsF3Desc": {
    "en": "Group wellness packages",
    "am": "የቡድን የጤና ፓኬጆች"
  },
  "dp.eventsF4": {
    "en": "AV & WiFi",
    "am": "AVና ዋይፋይ"
  },
  "dp.eventsF4Desc": {
    "en": "Full technical support",
    "am": "ሙሉ የቴክኒክ ድጋፍ"
  },
  "dp.inquireEvents": {
    "en": "Inquire About Events",
    "am": "ስለ ዝግጅቶች ይጠይቁ"
  },
  "hp.eyebrow": {
    "en": "Dire Dawa Heritage",
    "am": "የድሬዳዋ ቅርስ"
  },
  "hp.title.italic": {
    "en": "Rail & Spice",
    "am": "ባቡርና ቅመም"
  },
  "hp.desc": {
    "en": "Dire Dawa, Ethiopia's second city, was founded in 1902 as the terminus of the Djibouti-Ethiopian railway. Its unique blend of Ethiopian, French, and Arab influences creates a cultural tapestry unlike anywhere else in the country.",
    "am": "ድሬዳዋ፣ የኢትዮጵያ ሁለተኛ ከተማ፣ በ1902 የጅቡቲ-ኢትዮጵያ ባቡር መድረክ ሆና የተመሰረተች ናት። የኢትዮጵያ፣ የፈረንሳይ፣ እና የዐረብ ተፅዕኖዎች ያላት ልዩ የባህል ድብልቅ በሀገሪቱ ማንኛውም ቦታ የማይገኝ ይፈጥራል።"
  },
  "hp.exploreEyebrow": {
    "en": "Explore the City",
    "am": "ከተማዋን ይመልከቱ"
  },
  "hp.exploreTitle": {
    "en": "Heritage Excursions",
    "am": "የቅርስ ጉዞዎች"
  },
  "hp.exploreDesc": {
    "en": "Curated experiences arranged by our concierge, showcasing Dire Dawa's rich history and culture.",
    "am": "በኮንሲየርኛችን የተዘጋጁ የድሬዳዋን ባህልና ታሪክ የሚያሳዩ ተሞክሮዎች።"
  },
  "hp.railwayEyebrow": {
    "en": "Historic Railway",
    "am": "የታሪካዊ ባቡር"
  },
  "hp.railwayTitle": {
    "en": "Chemin de Fer Excursion",
    "am": "የባቡር ጉዞ"
  },
  "hp.railwayDesc": {
    "en": "Visit the historic Dire Dawa railway station, terminus of the 1902 Djibouti-Ethiopian railway. A symbol of the city's founding and its role as Ethiopia's gateway to the sea.",
    "am": "የ1902 የጅቡቲ-ኢትዮጵያ ባቡር መድረክ የሆነውን የታሪካዊ የድሬዳዋ የባቡር ጣቢያ ይጎብኙ። የከተማዋ መስራትና የኢትዮጵያ ወደ ባሕር መንገድ ምልክት ነው።"
  },
  "hp.railwayTag": {
    "en": "Half-day tour • 3 hours",
    "am": "ግማሽ ቀን ጉዞ • 3 ሰዓታት"
  },
  "hp.archEyebrow": {
    "en": "French Colonial",
    "am": "የፈረንሳይ ቅኝ ግዛት"
  },
  "hp.archTitle": {
    "en": "Kezira Architecture Walk",
    "am": "የከዚራ ሕንፃ ጉዞ"
  },
  "hp.archDesc": {
    "en": "Stroll through the Kezira district's French colonial architecture, with its distinctive blend of Art Deco and Indo-Arab influences. A photographer's paradise.",
    "am": "በከዚራ ወረዳ የፈረንሳይ ቅኝ ግዛት ሕንፃ ውስጥ ይመልከቱ። በArt Decoና በIndo-Arab ተፅዕኖ የተለየ የፎቶግራፍ ገነት ነው።"
  },
  "hp.archTag": {
    "en": "Walking tour • 2 hours",
    "am": "የእግር ጉዞ • 2 ሰዓታት"
  },
  "hp.spiceEyebrow": {
    "en": "Local Markets",
    "am": "የአካባቢ ገበያዎች"
  },
  "hp.spiceTitle": {
    "en": "Spice Route & Markets",
    "am": "የቅመም መንገድና ገበያዎች"
  },
  "hp.spiceDesc": {
    "en": "Explore Dire Dawa's vibrant markets filled with local crafts, spices, and textiles. The city is a crossroads of trade routes connecting the Ethiopian highlands with the Red Sea coast.",
    "am": "የድሬዳዋን ህያው ገበያዎች የአካባቢ የእጅ ሥራ፣ ቅመም፣ እና ጨርቆች የተሞሉ ይመልከቱ። ከተማዋ የኢትዮጵያ ከፍታና የቀይ ባሕር ጠረፍ የሚያገናኝ የንግድ መንገዶች መስቀለኛ መንገድ ናት።"
  },
  "hp.spiceTag": {
    "en": "Guided tour • 2.5 hours",
    "am": "የመራጭ ጉዞ • 2.5 ሰዓታት"
  },
  "hp.coffeeEyebrow": {
    "en": "Coffee Origin",
    "am": "የቡና ምንጭ"
  },
  "hp.coffeeTitle": {
    "en": "Harar Coffee Trail",
    "am": "የሐረሪ ቡና መንገድ"
  },
  "hp.coffeeDesc": {
    "en": "Discover the legendary Harar coffee region, just hours from Dire Dawa. Visit coffee farms, learn about traditional processing, and participate in a coffee ceremony.",
    "am": "ከድሬዳዋ ጥቂት ሰዓታት ርቀት ላይ ያለውን የሐረሪ ቡና አካባቢ ይመልከቱ። የቡና ማሳዎችን ይጎብኙ፣ ስለ ባህላዊ ሂደት ይማሩ፣ እና በቡና ሥርዓት ይሳተፉ።"
  },
  "hp.coffeeTag": {
    "en": "Day trip • 6 hours",
    "am": "የቀን ጉዞ • 6 ሰዓታት"
  },
  "hp.aboutEyebrow": {
    "en": "City of Contrasts",
    "am": "የንፅፅር ከተማ"
  },
  "hp.aboutTitle": {
    "en": "About Dire Dawa",
    "am": "ስለ ድሬዳዋ"
  },
  "hp.aboutDesc1": {
    "en": "Founded in 1902 as the railway terminus connecting Ethiopia to the port of Djibouti, Dire Dawa grew into a cosmopolitan crossroads. The city's architecture reflects its French colonial heritage, while its culture blends Oromo, Somali, Amhara, and Harari traditions.",
    "am": "በ1902 ኢትዮጵያን ከጅቡቲ ወደብ እንደሚያገናኝ የባቡር መድረክ የተመሰረተች ድሬዳዋ ወደ ኮስሞፖሊታን መስቀለኛ መንገድ ያደገች ናት። የከተማዋ ሕንፃ የፈረንሳይ ቅኝ ግዛት ቅርስ ይንፀባርራል፣ ባህሏም ኦሮሞ፣ ሶማሌ፣ አማራ፣ እና ሐረሪ ባህሎችን ያዋሐዳል።"
  },
  "hp.aboutDesc2": {
    "en": "Today, Dire Dawa is Ethiopia's second-largest city and a gateway to the eastern highlands, the Harar Jugol (a UNESCO World Heritage Site), and the Erta Ale volcanic region. New Blossom Hotel & Spa is perfectly positioned for exploring this remarkable city.",
    "am": "ዛሬ ድሬዳዋ የኢትዮጵያ ሁለተኛ ትልቅ ከተማ እና ወደ ምስራቅ ከፍታ፣ ወደ ሐረር ጁጎል (የUNESCO የዓለም ቅርስ ቦታ)፣ እና ወደ ኤርታ አሌ እሳተ ገዢ አካባቢ መንገድ ናት። ኒው ብሎሰም ሆቴልና ስፓ ለዚህ ልዩ ከተማ ለመመልከት በጣም ተስማሚ ቦታ ላይ ይገኛል።"
  },
  "hp.stat1": {
    "en": "Founded",
    "am": "የተመሰረተች"
  },
  "hp.stat2": {
    "en": "Largest City",
    "am": "ትልቅ ከተማ"
  },
  "hp.stat3": {
    "en": "Nearby Harar",
    "am": "ተቆራሽ ሐረር"
  },
  "hp.conciergeEyebrow": {
    "en": "Concierge Service",
    "am": "የኮንሲየር አገልግሎት"
  },
  "hp.conciergeTitle": {
    "en": "Plan Your Excursion",
    "am": "ጉዞዎን ያቅዱ"
  },
  "hp.conciergeDesc": {
    "en": "Our concierge team arranges private transfers, guided tours, and customized itineraries. Contact us to plan your Dire Dawa adventure.",
    "am": "የኮንሲየር ቡድናችን የግል መኪና መውሰድ፣ የመራጭ ጉዞዎች፣ እና የተስተካከሉ አጀንዳዎች ያደርጋል። የድሬዳዋ ጀብዱዎን ለማቅደት ያግኙን።"
  },
  "hp.callUs": {
    "en": "Speak to Our Team",
    "am": "ቡድናችንን ያግኙ"
  },
  "hp.bookStay": {
    "en": "Book Your Stay",
    "am": "እረፍትዎን ይያዙ"
  },
  "wp.eyebrow": {
    "en": "Wellness Rituals",
    "am": "የጤና ሥርዓቶች"
  },
  "wp.title.italic": {
    "en": "Healing",
    "am": "መልስ"
  },
  "wp.desc": {
    "en": "Customized multi-day wellness programs combining spa treatments, meditation, nutrition, and cultural immersion. Designed around your individual needs.",
    "am": "የስፓ ሕክምና፣ የመንፈስ ሥልጠና፣ የምግብ፣ እና የባህል መግቢያ የሚያዋሐዱ የተስተካከሉ ባለብዙ-ቀን የጤና ፕሮግራሞች። በእርስዎ ግል ፍላጎት የተሰሩ።"
  },
  "wp.ctaBook": {
    "en": "Book a Retreat",
    "am": "መልስ ይያዙ"
  },
  "wp.programsEyebrow": {
    "en": "Curated Programs",
    "am": "የተዘጋጁ ፕሮግራሞች"
  },
  "wp.programsTitle": {
    "en": "Wellness Retreat Packages",
    "am": "የጤና መልስ ፓኬጆች"
  },
  "wp.programsDesc": {
    "en": "Multi-day programs combining treatments, meals, and cultural experiences.",
    "am": "ሕክምና፣ ምግብ፣ እና የባህል ተሞክሮዎችን የሚያዋሐዱ ባለብዙ-ቀን ፕሮግራሞች።"
  },
  "wp.3days": {
    "en": "3 Days",
    "am": "3 ቀናት"
  },
  "wp.3dayTitle": {
    "en": "The Restorative Weekend",
    "am": "የመልስ ሳምንት መጨረሻ"
  },
  "wp.3dayDesc": {
    "en": "A 3-day immersion featuring daily spa treatments, hammam sessions, guided meditation, and wellness dining.",
    "am": "በየቀኑ የስፓ ሕክምና፣ የሃማም ክፍለ-ጊዜ፣ የመራጭ መንፈስ ሥልጠና፣ እና የጤና ምግብ የሚካተቱበት 3-ቀን መጥለቅ።"
  },
  "wp.3dayF1": {
    "en": "2 nights luxury suite",
    "am": "2 ሌሊት የቅንጦት ሱት"
  },
  "wp.3dayF2": {
    "en": "3 spa treatments",
    "am": "3 የስፓ ሕክምናዎች"
  },
  "wp.3dayF3": {
    "en": "Daily hammam access",
    "am": "በየቀኑ የሃማም መግቢያ"
  },
  "wp.3dayF4": {
    "en": "Wellness meals included",
    "am": "የጤና ምግቦች ይካተታል"
  },
  "wp.3dayF5": {
    "en": "Morning meditation sessions",
    "am": "የጠዋት የመንፈስ ሥልጠና ክፍለ-ጊዜዎች"
  },
  "wp.book": {
    "en": "Book",
    "am": "ይያዙ"
  },
  "wp.popular": {
    "en": "Most Popular",
    "am": "በጣም ተወዳጅ"
  },
  "wp.5days": {
    "en": "5 Days",
    "am": "5 ቀናት"
  },
  "wp.5dayTitle": {
    "en": "The Deep Healing Journey",
    "am": "ጥልቅ የመልስ ጉዞ"
  },
  "wp.5dayDesc": {
    "en": "A 5-day comprehensive wellness program with intensive spa therapy, nutritional guidance, and cultural excursions.",
    "am": "በጥልቅ የስፓ ሕክምና፣ በምግብ መመሪያ፣ እና በባህል ጉዞዎች የተሞላ 5-ቀን የጤና ፕሮግራም።"
  },
  "wp.5dayF1": {
    "en": "4 nights royal suite",
    "am": "4 ሌሊት የንጉሥ ሱት"
  },
  "wp.5dayF2": {
    "en": "6 spa treatments",
    "am": "6 የስፓ ሕክምናዎች"
  },
  "wp.5dayF3": {
    "en": "Daily hammam & sauna",
    "am": "በየቀኑ ሃማምና ሳውና"
  },
  "wp.5dayF4": {
    "en": "Personalized nutrition plan",
    "am": "የግል የምግብ እቅድ"
  },
  "wp.5dayF5": {
    "en": "Dire Dawa heritage tour",
    "am": "የድሬዳዋ ቅርስ ጉዞ"
  },
  "wp.5dayF6": {
    "en": "Harar coffee ceremony",
    "am": "የሐረሪ ቡና ሥርዓት"
  },
  "wp.7days": {
    "en": "7 Days",
    "am": "7 ቀናት"
  },
  "wp.7dayTitle": {
    "en": "The Total Transformation",
    "am": "ሙሉ ለውጥ"
  },
  "wp.7dayDesc": {
    "en": "A week-long immersive retreat combining deep spa therapy, meditation, yoga, nutrition, and full cultural immersion.",
    "am": "ጥልቅ የስፓ ሕክምና፣ የመንፈስ ሥልጠና፣ ዮጋ፣ ምግብ፣ እና ሙሉ የባህል መግቢያ የሚያዋሐዱ ሳምንት ጥልቅ መልስ።"
  },
  "wp.7dayF1": {
    "en": "6 nights royal suite",
    "am": "6 ሌሊት የንጉሥ ሱት"
  },
  "wp.7dayF2": {
    "en": "10 spa treatments",
    "am": "10 የስፓ ሕክምናዎች"
  },
  "wp.7dayF3": {
    "en": "Unlimited hammam & sauna",
    "am": "ያልተወሰነ ሃማምና ሳውና"
  },
  "wp.7dayF4": {
    "en": "Daily yoga & meditation",
    "am": "በየቀኑ ዮጋና የመንፈስ ሥልጠና"
  },
  "wp.7dayF5": {
    "en": "Full nutritional program",
    "am": "ሙሉ የምግብ ፕሮግራም"
  },
  "wp.7dayF6": {
    "en": "Harar day trip included",
    "am": "የሐረር የቀን ጉዞ ይካተታል"
  },
  "wp.philosophyEyebrow": {
    "en": "Our Philosophy",
    "am": "የእኛ ፍልስፍና"
  },
  "wp.philosophyTitle": {
    "en": "Healing Rooted in Tradition",
    "am": "በባህል የተመሰረተ መልስ"
  },
  "wp.philosophyDesc1": {
    "en": "Our wellness philosophy draws from Ethiopia's ancient healing traditions. For millennia, Ethiopian healers have used indigenous botanicals — frankincense, myrrh, mountain thyme, acacia, and teff — to restore body and spirit.",
    "am": "የጤና ፍልስፍናችን ከኢትዮጵያ የጥንታዊ የመልስ ባህሎች ይማራል። ለሺሕ ዘመናት የኢትዮጵያ ፈዋሾች እጣን፣ ሞር፣ የተራራ ትምህርት፣ አካሺያ፣ እና ጤፍ የአካልና የመንፈስ መልስ ለማድረግ ተጠቅመዋል።"
  },
  "wp.philosophyDesc2": {
    "en": "At New Blossom, we combine these time-honored practices with modern therapeutic techniques. Every ritual is performed by trained therapists using locally sourced, organic ingredients.",
    "am": "በኒው ብሎሰም እነዚህን ዘመናዊ የመልስ ሥራዎች ከባህላዊ ልምዶች ጋር እናዋሐዳለን። እያንዳንዱ ሥርዓት በተለመዱ የአካባቢ ኦርጋኒክ ንጥረ ነገሮች በተሰለጡ ሕክምና ባለሙያዎች ይሰራል።"
  },
  "wp.philF1Title": {
    "en": "Indigenous Botanicals",
    "am": "የአካባቢ እፅዋት"
  },
  "wp.philF1Desc": {
    "en": "Frankincense, myrrh, mountain thyme, acacia honey",
    "am": "እጣን፣ ሞር፣ የተራራ ትምህርት፣ የአካሺያ ማር"
  },
  "wp.philF2Title": {
    "en": "Mindful Practice",
    "am": "የመንፈስ ልምድ"
  },
  "wp.philF2Desc": {
    "en": "Meditation, breathwork, and gentle movement",
    "am": "የመንፈስ ሥልጠና፣ የመተንፈስ ሥራ፣ እና ለስለስ ያለ እንቅስቃሴ"
  },
  "wp.philF3Title": {
    "en": "Nourishing Cuisine",
    "am": "የሚመግብ ምግብ"
  },
  "wp.philF3Desc": {
    "en": "Locally sourced, plant-forward wellness menus",
    "am": "ከአካባቢ የተገኙ የተፈጥሮ የጤና ምናሌዎች"
  },
  "wp.ctaEyebrow": {
    "en": "Begin Your Journey",
    "am": "ጉዞዎን ይጀምሩ"
  },
  "wp.ctaTitle": {
    "en": "Ready to Heal?",
    "am": "ለመልስ ዝግጁ ነዎት?"
  },
  "wp.ctaDesc": {
    "en": "Contact our wellness team to design a personalized retreat program tailored to your needs.",
    "am": "ለእርስዎ ፍላጎት የተስተካከለ የግል መልስ ፕሮግራም ለማዘጋጀት የጤና ቡድናችንን ያግኙ።"
  },
  "wp.ctaCall": {
    "en": "Speak to Our Team",
    "am": "ቡድናችንን ያግኙ"
  },
  "wp.ctaBookRetreat": {
    "en": "Book Your Retreat",
    "am": "መልስዎን ይያዙ"
  },
  "vt.eyebrow": {
    "en": "Immersive Experience",
    "am": "የመጠለያ ተሞክሮ"
  },
  "vt.titlePrefix": {
    "en": "Explore ",
    "am": "ይመልከቱ "
  },
  "vt.title.italic": {
    "en": "New Blossom",
    "am": "ኒው ብሎሰም"
  },
  "vt.titleSuffix": {
    "en": " in 360°",
    "am": " ን 360°"
  },
  "vt.desc": {
    "en": "Step inside New Blossom Hotel & Spa from anywhere in the world. Drag to look around and experience the warmth, light, and ambiance of our Dire Dawa sanctuary in full 360 degrees.",
    "am": "ከየቦታውም ኒው ብሎሰም ሆቴልና ስፓ ይግቡ። ይጎትቱ፣ ይዘንብሩ፣ እና የድሬዳዋ መጠለያችንን በሙሉ 360 ድግሪ ይመልከቱ።"
  },
  "vt.dragHint": {
    "en": "Click & Drag",
    "am": "ይጫኑና ይጎትቱ"
  },
  "vt.dragDesc": {
    "en": "To Look Around",
    "am": "ለመመልከት"
  },
  "vt.zoomHint": {
    "en": "Scroll / Pinch",
    "am": "ይሸብልሉ / ይቆንጠጡ"
  },
  "vt.zoomDesc": {
    "en": "To Zoom In & Out",
    "am": "ለማ2ርና ለማስፋት"
  },
  "vt.loading": {
    "en": "Loading 360° View...",
    "am": "360° እይታ በመጫን ላይ..."
  },
  "vt.locationLabel": {
    "en": "New Blossom Hotel & Spa · Ratu Road, Dire Dawa",
    "am": "ኒው ብሎሰም ሆቴልና ስፓ · ራቱ መንገድ፣ ድሬዳዋ"
  },
  "vt.bookCta": {
    "en": "Book Your Stay",
    "am": "ቆይታዎን ይያዙ"
  },
  "vt.infoEyebrow": {
    "en": "Plan Your Visit",
    "am": "ጉብኝትዎን ያቅዱ"
  },
  "vt.infoTitle": {
    "en": "Experience It in Person",
    "am": "በእራስዎ ይመልከቱት"
  },
  "vt.infoDesc": {
    "en": "The 360° tour gives you a glimpse. Nothing compares to feeling the warm hospitality, the scent of frankincense, and the serenity of our gardens in person.",
    "am": "360° ጉብኝቱ ጥቂት ጥቅር ይሰጣል። ሙቅ እንግዳ ተቀባይነትን፣ የእጣን ሽታን፣ እና የእኛን የአትክልት ሰላም በእራስዎ ምንም ነገር አይተካም።"
  },
  "vt.card1Eyebrow": {
    "en": "The Grounds",
    "am": "አትክልቱ"
  },
  "vt.card1Title": {
    "en": "Sunlit Gardens & Courtyards",
    "am": "የፀሐይ አትክልትና ግቢዎች"
  },
  "vt.card1Desc": {
    "en": "Stroll through bougainvillea-lined pathways, relax in quiet courtyards, and enjoy the warm Dire Dawa sunshine.",
    "am": "በቦጋንቪሌያ የተከበቡ መንገዶች ላይ ይራመዱ፣ በጨረሰ ግቢዎች ይዕረፉ፣ እና የድሬዳዋን ሙቅ ፀሐይ ይደሰቱ።"
  },
  "vt.card2Eyebrow": {
    "en": "The Spa",
    "am": "ስፓው"
  },
  "vt.card2Title": {
    "en": "Botanical Spa & Hammam",
    "am": "የእፅዋት ስፓና ሃማም"
  },
  "vt.card2Desc": {
    "en": "Surrender to ancient Ethiopian botanical rituals, frankincense steam, and warm mineral therapies.",
    "am": "ለጥንታዊ የኢትዮጵያ የእፅዋት ሥርዓቶች፣ የእጣን እንፋሎት፣ እና ለሞቅ የማዕድን ሕክምናዎች ይግቡ።"
  },
  "vt.card3Eyebrow": {
    "en": "The Interiors",
    "am": "ውስጣቸው"
  },
  "vt.card3Title": {
    "en": "Warm Hospitality Spaces",
    "am": "ሙቅ የእንግዳ ተቀባይነት ቦታዎች"
  },
  "vt.card3Desc": {
    "en": "Artisanal wood finishes, soft natural textiles, and aromatherapy in every corner of our welcoming lobby.",
    "am": "የእጅ ሥራ የእንጨት ማጠናቀቅ፣ ለስለስ ያለ የተፈጥሮ ጨርቅ፣ እና የሽቶ ሕክምና በመግቢያችን እያንዳንዱ ጥግ።"
  },
  "vt.ctaEyebrow": {
    "en": "Ready to Visit?",
    "am": "ለመጎብኘት ዝግጁ ነዎት?"
  },
  "vt.ctaTitle": {
    "en": "Book Your Sanctuary Today",
    "am": "መጠለያዎን ዛሬ ይያዙ"
  },
  "vt.ctaDesc": {
    "en": "Reserve your suite and spa rituals directly with our concierge team for the best available rates.",
    "am": "ለምርጥ ዋጋ ሱትዎንና የስፓ ሥርዓቶችን በቀጥታ ከኮንሲዬርጅ ቡድናችን ጋር ይያዙ።"
  },
  "vt.ctaBook": {
    "en": "Book Spa & Stay",
    "am": "ስፓና ቆይታ ይያዙ"
  },
  "vt.ctaCall": {
    "en": "+251 25 111 4000",
    "am": "+251 25 111 4000"
  },
  "hp.titlePrefix": {
    "en": "The City of ",
    "am": "የ"
  },
  "sp.titlePrefix": {
    "en": "Rooms Designed for ",
    "am": "ለ"
  },
  "bsp.titlePrefix": {
    "en": "Ancient Rituals, ",
    "am": "የጥንታዊ ሥርዓቶች፣ "
  },
  "dp.titlePrefix": {
    "en": "Flavors of ",
    "am": "የ"
  },
  "wp.titlePrefix": {
    "en": "Bespoke ",
    "am": "የተለዩ "
  },
  "wp.titleSuffix": {
    "en": " Journeys",
    "am": " ጉዞዎች"
  }
};
