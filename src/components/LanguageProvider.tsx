import { createContext, useContext, useEffect, useState } from 'react'
import type { ReactNode } from 'react'

export type Language = 'en' | 'ms' | 'zh' | 'ta'
type Translation = [string, string, string]
const translations: Record<string, Translation> = {
  'Our story': ['Kisah kami', '我们的故事', 'எங்கள் கதை'],
  'The menu': ['Menu', '菜单', 'உணவுப் பட்டியல்'],
  'Gather here': ['Berkumpul di sini', '相聚于此', 'இங்கு கூடுங்கள்'],
  'Home': ['Utama', '首页', 'முகப்பு'],
  'Visit us': ['Kunjungi kami', '到访我们', 'எங்களைச் சந்திக்கவும்'],
  'My account': ['Akaun saya', '我的账户', 'எனது கணக்கு'],
  'Come on over': ['Jom singgah', '欢迎光临', 'வாருங்கள்'],
  'Skip to content': ['Langkau ke kandungan', '跳至内容', 'உள்ளடக்கத்திற்குச் செல்லவும்'],
  'Your next coffee is waiting': ['Kopi seterusnya menanti anda', '下一杯咖啡正等着你', 'உங்கள் அடுத்த காபி காத்திருக்கிறது'],
  'Find your way here': ['Cari jalan ke sini', '如何到达', 'இங்கு வரும் வழி'],
  'Find us': ['Cari kami', '找到我们', 'எங்களைக் கண்டறியவும்'],
  'Stay connected': ['Terus berhubung', '保持联系', 'தொடர்பில் இருங்கள்'],
  'Back to top ↑': ['Kembali ke atas ↑', '回到顶部 ↑', 'மேலே செல்லவும் ↑'],
  'Make yourself at home': ['Anggaplah seperti di rumah', '自在如家', 'உங்கள் வீடுபோல் உணருங்கள்'],
  'Explore the menu': ['Terokai menu', '探索菜单', 'உணவுப் பட்டியலைப் பாருங்கள்'],
  'The whole menu': ['Seluruh menu', '完整菜单', 'முழு உணவுப் பட்டியல்'],
  'Get to know us': ['Kenali kami', '认识我们', 'எங்களை அறியுங்கள்'],
  'Step inside Twitch': ['Masuk ke Twitch', '走进 Twitch', 'Twitch-க்குள் வாருங்கள்'],
  'Gather at Twitch': ['Berkumpul di Twitch', '相聚 Twitch', 'Twitch-ல் கூடுங்கள்'],
  'Plan your next cup': ['Rancang kunjungan anda', '计划下一杯咖啡', 'உங்கள் அடுத்த வருகையைத் திட்டமிடுங்கள்'],
  'Get directions': ['Dapatkan arah', '获取路线', 'வழியறியவும்'],
  'Ask us about delivery': ['Tanya kami tentang penghantaran', '向我们询问外送', 'விநியோகம் பற்றி எங்களிடம் கேளுங்கள்'],
  'Espresso & filter': ['Espreso & kopi turas', '意式与手冲咖啡', 'எஸ்பிரெசோ & வடிகாபி'],
  'Signature drinks': ['Minuman istimewa', '招牌饮品', 'சிறப்பு பானங்கள்'],
  'Matcha & more': ['Matcha & lain-lain', '抹茶及更多', 'மாட்சா மற்றும் பல'],
  'Savoury favourites': ['Hidangan kegemaran', '人气咸食', 'விருப்பமான கார உணவுகள்'],
  'Bakes & sweet treats': ['Kek & manisan', '烘焙与甜点', 'வேகவைத்த இனிப்பு வகைகள்'],
  'Your usual, or something new': ['Kegemaran anda, atau sesuatu yang baharu', '熟悉的最爱，或新的发现', 'உங்கள் வழக்கமானது அல்லது புதிய சுவை'],
  'Take a look': ['Lihat menu', '看看菜单', 'பாருங்கள்'],
  'Prepared with care. Selections vary with the day — ask us what’s available.': ['Disediakan dengan teliti. Pilihan berubah setiap hari — tanyakan apa yang tersedia.', '用心制作。每日供应有所不同，请向我们询问。', 'அக்கறையுடன் தயாரிக்கப்படுகிறது. தினசரி வகைகள் மாறும் — கிடைப்பதை எங்களிடம் கேளுங்கள்.'],
  'Your neighbourhood café · Petaling Jaya': ['Kafe kejiranan anda · Petaling Jaya', '你的邻里咖啡馆 · 八打灵再也', 'உங்கள் அண்டை வீட்டுக் கஃபே · பெட்டாலிங் ஜெயா'],
  'Good coffee. Better company.': ['Kopi enak. Teman yang lebih baik.', '好咖啡，美好相伴。', 'நல்ல காபி. இன்னும் நல்ல துணை.'],
  'A little Australia. A little Malaysia. A place to feel right at home.': ['Sedikit Australia. Sedikit Malaysia. Tempat untuk berasa seperti di rumah.', '一点澳洲，一点马来西亚，一个让你自在如家的地方。', 'கொஞ்சம் ஆஸ்திரேலியா. கொஞ்சம் மலேசியா. வீட்டில் இருப்பது போல உணரும் இடம்.'],
  'Good coffee, good company · Section 19': ['Kopi enak, teman baik · Seksyen 19', '好咖啡，好相伴 · 19区', 'நல்ல காபி, நல்ல துணை · செக்‌ஷன் 19'],
  'Your daily escape.': ['Tempat rehat harian anda.', '你的日常小憩。', 'உங்கள் அன்றாட ஓய்விடம்.'],
  'Step out of the rush. Into a good cup, a familiar face, and a little time for yourself.': ['Tinggalkan kesibukan sejenak. Nikmati secawan kopi, wajah yang mesra dan masa untuk diri sendiri.', '暂别忙碌，享受一杯好咖啡、熟悉的面孔，以及属于自己的时光。', 'பரபரப்பிலிருந்து விலகி, ஒரு நல்ல காபி, பழக்கமான முகம், உங்களுக்கான சிறு நேரம்.'],
  'Discover your usual': ['Temui kegemaran anda', '发现你的日常最爱', 'உங்கள் விருப்பத்தைக் கண்டறியுங்கள்'],
  'A café with a story': ['Kafe dengan kisah tersendiri', '一家有故事的咖啡馆', 'ஒரு கதை கொண்ட கஃபே'],
  'Made for your everyday': ['Untuk setiap hari anda', '为你的每一天而做', 'உங்கள் அன்றாடத்திற்காக'],
  'More than a coffee stop': ['Lebih daripada sekadar tempat kopi', '不只是咖啡歇脚处', 'காபிக்கான இடம் மட்டுமல்ல'],
  'Thoughtfully brewed.': ['Dibancuh dengan teliti.', '用心冲煮。', 'அக்கறையுடன் காய்ச்சப்பட்டது.'],
  'Locally rooted.': ['Berakar di sini.', '扎根本地。', 'உள்ளூரில் வேரூன்றியது.'],
  'Always a warm welcome.': ['Sentiasa menyambut anda.', '始终热情欢迎。', 'எப்போதும் அன்பான வரவேற்பு.'],
  'Your daily ritual, thoughtfully prepared. We choose beans from The Hub Coffee Roasters, exploring the character of every cup.': ['Rutin harian anda, disediakan dengan teliti. Kami memilih biji kopi daripada The Hub Coffee Roasters untuk meneroka keunikan setiap cawan.', '用心准备你的日常仪式。我们选用 The Hub Coffee Roasters 的咖啡豆，探索每一杯的个性。', 'உங்கள் அன்றாட வழக்கம், கவனத்துடன் தயாரிக்கப்படுகிறது. ஒவ்வொரு கோப்பையின் தனித்தன்மையையும் அறிய The Hub Coffee Roasters காபி கொட்டைகளைத் தேர்ந்தெடுக்கிறோம்.'],
  'A familiar cup, with a little Twitch character. Come curious and find a new favourite.': ['Minuman biasa dengan sentuhan Twitch. Datang dan temui kegemaran baharu.', '熟悉的一杯，带着一点 Twitch 的特色。来发现新的最爱。', 'பழக்கமான பானத்தில் Twitch-ன் தனித்துவம். வந்து புதிய விருப்பத்தைக் கண்டறியுங்கள்.'],
  'Matcha moments, warming chai, Australian-sourced dark chocolate, and something refreshing.': ['Matcha, chai yang menghangatkan, coklat gelap dari Australia dan minuman menyegarkan.', '抹茶、暖心香料茶、澳洲黑巧克力，还有清爽饮品。', 'மாட்சா, இதமான சாய், ஆஸ்திரேலிய டார்க் சாக்லேட் மற்றும் புத்துணர்ச்சியூட்டும் பானங்கள்.'],
  'Local comforts and satisfying bites, from a quick breakfast to a slower lunch.': ['Hidangan tempatan yang menyelerakan, daripada sarapan ringkas hingga makan tengah hari santai.', '暖心本地美食，从快捷早餐到悠闲午餐。', 'விரைவான காலை உணவு முதல் நிதானமான மதிய உணவு வரை உள்ளூர் சுவைகள்.'],
  'The perfect reason to stay for another cup. Simple, comforting bakes made with care.': ['Alasan sempurna untuk menikmati secawan lagi. Pastri ringkas yang disediakan dengan teliti.', '再留一杯的完美理由。用心制作的简单暖心烘焙。', 'இன்னொரு கோப்பைக்குத் தங்குவதற்கான காரணம். அக்கறையுடன் தயாரித்த எளிய இனிப்புகள்.'],
  'V60 pour-over is available on selected days, with rotating coffee selections.': ['Kopi V60 tersedia pada hari tertentu dengan pilihan kopi yang berubah.', 'V60 手冲咖啡在指定日期供应，咖啡豆轮换。', 'V60 கையால் காய்ச்சிய காபி குறிப்பிட்ட நாட்களில் மாறும் காபி வகைகளுடன் கிடைக்கும்.'],
  'Hot chocolate is made with Australian-sourced dark chocolate. Hot tea is available in five flavours.': ['Coklat panas dibuat dengan coklat gelap dari Australia. Teh panas tersedia dalam lima perisa.', '热巧克力使用澳洲黑巧克力制作。热茶有五种口味。', 'சூடான சாக்லேட் ஆஸ்திரேலிய டார்க் சாக்லேட்டில் தயாரிக்கப்படுகிறது. சூடான தேநீர் ஐந்து சுவைகளில் கிடைக்கும்.'],
  'Our food line-up changes with demand and availability. Selected items are available while stocks last.': ['Pilihan makanan berubah mengikut permintaan dan ketersediaan. Hidangan tertentu tersedia selagi stok ada.', '食物供应随需求及供应情况变化，部分餐点售完即止。', 'தேவை மற்றும் கிடைக்கும் பொருட்களுக்கேற்ப உணவு வகைகள் மாறும். சில உணவுகள் இருப்பு உள்ளவரை கிடைக்கும்.'],
  'Selections and availability may vary. Ask us what’s fresh today.': ['Pilihan dan ketersediaan mungkin berubah. Tanyakan apa yang segar hari ini.', '选择及供应可能变化，请询问今天的新鲜出品。', 'வகைகளும் இருப்பும் மாறலாம். இன்று புதிதாக என்ன இருக்கிறது என்று கேளுங்கள்.'],
  'Good things,': ['Perkara yang enak,', '美好滋味，', 'நல்ல சுவைகள்,'],
  'by the cup.': ['dalam cawan.', '在每一杯。', 'ஒவ்வொரு கோப்பையிலும்.'],
  'And the plate.': ['Dan di pinggan.', '也在每一盘。', 'ஒவ்வொரு தட்டிலும்.'],
  'From your first coffee to one more slice.': ['Daripada kopi pertama hingga sepotong lagi.', '从第一杯咖啡到再来一块。', 'முதல் காபி முதல் இன்னொரு துண்டு வரை.'],
  'Find something that feels like you.': ['Temui sesuatu yang sesuai dengan anda.', '找到属于你的滋味。', 'உங்களுக்குப் பிடித்ததைத் தேடுங்கள்.'],
  'Your little corner of Petaling Jaya': ['Sudut kecil anda di Petaling Jaya', '你在八打灵再也的小角落', 'பெட்டாலிங் ஜெயாவில் உங்கள் சிறிய இடம்'],
  'Come for a cup.': ['Singgah untuk secawan.','来喝一杯。','ஒரு கோப்பைக்காக வாருங்கள்.'],
  'Stay for the': ['Tinggal untuk','留下来感受','தங்கியிருங்கள்'],
  'feeling.': ['suasananya.','这里的氛围。','அந்த உணர்விற்காக.'],
  'A warm welcome awaits': ['Sambutan mesra menanti','温暖欢迎你的到来','அன்பான வரவேற்பு காத்திருக்கிறது'],
  'in': ['di','在','இல்'],
  'Planning your visit?': ['Merancang kunjungan?','计划到访？','வருகையைத் திட்டமிடுகிறீர்களா?'],
  'For current opening hours and café updates, check our Instagram before you head over.': ['Untuk waktu operasi dan berita terkini, semak Instagram kami sebelum berkunjung.','到访前请查看我们的 Instagram，了解最新营业时间和咖啡馆动态。','தற்போதைய திறந்திருக்கும் நேரம் மற்றும் புதுப்பிப்புகளுக்கு வருகைக்கு முன் எங்கள் Instagram-ஐப் பார்க்கவும்.'],
  'Take a little look around': ['Jom lihat sekeliling','来看看这里','சுற்றிப் பாருங்கள்'],
  'A little Twitch, delivered': ['Twitch dihantar kepada anda','Twitch 外送到家','Twitch உங்கள் இடத்திற்கு'],
  'Good things happen together': ['Perkara indah berlaku bersama','美好的事一起发生','ஒன்றாக இருப்பதில் நல்லவை மலரும்'],
  'Your people.': ['Orang tersayang.','你的伙伴。','உங்கள் அன்புக்குரியவர்கள்.'],
  'Our place.': ['Tempat kami.','我们的空间。','எங்கள் இடம்.'],
  'A good time.': ['Saat yang indah.','美好的时光。','மகிழ்ச்சியான நேரம்.'],
  'A cosy space for small celebrations,': ['Ruang selesa untuk perayaan kecil,','一个温馨的空间，适合小型庆祝、','சிறிய கொண்டாட்டங்கள்,'],
  'fresh ideas, and moments worth sharing.': ['idea baharu dan detik untuk dikongsi.','新鲜创意和值得分享的时刻。','புதிய யோசனைகள், பகிர்ந்துகொள்ள வேண்டிய தருணங்களுக்காக.'],
  'Let’s plan something': ['Jom rancang sesuatu','一起策划吧','ஏதாவது திட்டமிடுவோம்'],
  'A little room for possibilities': ['Ruang kecil untuk pelbagai kemungkinan','一个充满可能的小空间','பல சாத்தியங்களுக்கான சிறிய இடம்'],
  'What brings': ['Apa yang membawa','是什么让','எது உங்களை'],
  'you': ['anda','你们','ஒன்றாக'],
  'together?': ['bersama?','相聚？','இணைக்கிறது?'],
  'Every gathering has its own rhythm.': ['Setiap pertemuan ada rentaknya sendiri.','每场聚会都有自己的节奏。','ஒவ்வொரு சந்திப்புக்கும் தனித்த தாளம் உண்டு.'],
  'Let’s find what works for yours.': ['Mari cari yang sesuai untuk anda.','让我们找到适合你的方式。','உங்களுக்கு ஏற்றதைத் தேடுவோம்.'],
  'Let’s make something happen': ['Mari jayakan sesuatu','让我们一起实现','ஒன்றாகச் செயல்படுவோம்'],
  'Have something': ['Ada sesuatu','有什么','ஏதேனும்'],
  'mind?': ['fikiran?','想法？','யோசனை உள்ளதா?'],
  'Put together a few details, then send your message to us on Instagram. We’ll discuss the possibilities with you.': ['Sediakan beberapa butiran, kemudian hantarkan mesej kepada kami di Instagram. Kami akan membincangkan pilihan bersama anda.','填写一些细节，然后在 Instagram 上给我们发送消息。我们会与你讨论各种可能。','சில விவரங்களைத் தயாரித்து, Instagram-ல் எங்களுக்குச் செய்தி அனுப்புங்கள். சாத்தியங்களை உங்களுடன் விவாதிப்போம்.'],
  'Dates, packages, and arrangements are confirmed directly with the café.': ['Tarikh, pakej dan urusan disahkan terus dengan kafe.','日期、配套和安排需直接与咖啡馆确认。','தேதிகள், தொகுப்புகள் மற்றும் ஏற்பாடுகள் கஃபேயுடன் நேரடியாக உறுதிப்படுத்தப்படும்.'],
  'What’s the occasion?': ['Apakah majlisnya?', '是什么活动？', 'என்ன நிகழ்வு?'],
  'Preferred date': ['Tarikh pilihan', '首选日期', 'விருப்பமான தேதி'],
  '(optional)': ['(pilihan)', '（可选）', '(விருப்பம்)'],
  'Estimated guests': ['Anggaran tetamu', '预计人数', 'மதிப்பிடப்பட்ட விருந்தினர்கள்'],
  'A little about your idea': ['Ceritakan sedikit tentang idea anda', '简单介绍你的想法', 'உங்கள் யோசனையைப் பற்றி'],
  'Prepare my message': ['Sediakan mesej saya', '准备我的信息', 'எனது செய்தியைத் தயாரிக்கவும்'],
  'A small group gathering': ['Perhimpunan kumpulan kecil', '小型聚会', 'சிறு குழுக் கூட்டம்'],
  'A private event': ['Acara peribadi', '私人活动', 'தனிப்பட்ட நிகழ்வு'],
  'A workshop': ['Bengkel', '工作坊', 'பயிலரங்கம்'],
  'A brand collaboration': ['Kerjasama jenama', '品牌合作', 'பிராண்ட் ஒத்துழைப்பு'],
  'A bulk drinks order': ['Pesanan minuman pukal', '大批饮品订单', 'மொத்த பான ஆர்டர்'],
  'Your message is ready to send': ['Mesej anda sedia untuk dihantar', '你的信息已准备好发送', 'உங்கள் செய்தி அனுப்பத் தயாராக உள்ளது'],
  'Copy message': ['Salin mesej', '复制信息', 'செய்தியை நகலெடுக்கவும்'],
  'Message copied': ['Mesej disalin', '信息已复制', 'செய்தி நகலெடுக்கப்பட்டது'],
  'Copying…': ['Menyalin…', '正在复制…', 'நகலெடுக்கிறது…'],
  'Open Instagram': ['Buka Instagram', '打开 Instagram', 'Instagram-ஐத் திறக்கவும்'],
}
type Context = { language: Language; ready: boolean; setLanguage: (language: Language) => void; t: (text: string) => string }
const LanguageContext = createContext<Context>({ language: 'en', ready: false, setLanguage: () => {}, t: text => text })
const valid = (value: string | null): value is Language => value === 'en' || value === 'ms' || value === 'zh' || value === 'ta'
export function LanguageProvider({ children }: { children: ReactNode }) {
  const [language, setCurrent] = useState<Language>('en')
  const [ready, setReady] = useState(false)
  useEffect(() => {
    try { const stored = localStorage.getItem('twitch-language'); if (valid(stored)) setCurrent(stored) } catch { /* The current choice still works for this visit. */ }
    setReady(true)
    const sync = (event: StorageEvent) => { if (event.key === 'twitch-language' && valid(event.newValue)) setCurrent(event.newValue) }
    window.addEventListener('storage', sync)
    return () => window.removeEventListener('storage', sync)
  }, [])
  useEffect(() => { document.documentElement.lang = language === 'zh' ? 'zh-Hans' : language }, [language])
  const setLanguage = (next: Language) => { setCurrent(next); try { localStorage.setItem('twitch-language', next) } catch { /* Storage may be unavailable. */ } }
  const t = (text: string) => language === 'en' ? text : translations[text]?.[language === 'ms' ? 0 : language === 'zh' ? 1 : 2] ?? text
  return <LanguageContext.Provider value={{ language, ready, setLanguage, t }}>{children}</LanguageContext.Provider>
}
export function useLanguage() { return useContext(LanguageContext) }
export function LanguageSelector() {
  const { language, ready, setLanguage } = useLanguage()
  return <label className="language-selector"><span className="sr-only">Language / Bahasa / 语言 / மொழி</span><select aria-label="Language / Bahasa / 语言 / மொழி" value={language} disabled={!ready} onChange={event => setLanguage(event.target.value as Language)}><option value="en">English</option><option value="ms">Bahasa Melayu</option><option value="zh">中文</option><option value="ta">தமிழ்</option></select></label>
}
