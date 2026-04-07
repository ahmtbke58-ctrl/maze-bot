let level = 1;
const totalLevels = 10;
let totalAccumulated = 150;
let currentQuestions = [];

// --- AYARLAR ---
const workerUrl = "https://lab-mode-a1.ahmtbke58.workers.dev"; // Cloudflare Worker Adresin
const directAdUrl =  "https://omg10.com/4/6121210";
         
      // Reklam Linkin

// 60 Soruluk Zengin Soru Havuzu
const questionPool = [
    // --- DÜNYA ŞEHİRLERİ VE KONUM (20 Soru) ---
    { q: "Atomium anıt binası hangi şehirdedir? 🗼", opts: ["🇫🇷 Brüksel", "🇮🇹 Roma", "🇩🇪 Berlin"], a: 0 },
    { q: "Transfermarkt'a göre en fazla bonservis bedeli ödenen futbolcu? ⚽", opts: ["⚽ Messi", "⚽ Neymar", "⚽ Cristiana Ronaldo"], a: 1 },
    { q: "Kanallarıyla ünlü şehir hangisidir? 🛶", opts: ["🇳🇱 Amsterdam", "🇮🇹 Venedik", "🇧🇪 Brüksel"], a: 1 },
    { q: "Nijerya'nın başkenti hangisidir? 🗾", opts: ["NJ Kano", "NJ Lagos", "NJ Abuja"], a: 2 },
    { q: "Özgürlük Heykeli hangi şehirdedir? 🗽", opts: ["🇺🇸 New York", "🇺🇸 Los Angeles", "🇺🇸 Chicago"], a: 0 },
    { q: "Piramitler hangi ülkededir? 🏜️", opts: ["🇲🇦 Fas", "🇪🇬 Mısır", "🇯🇴 Ürdün"], a: 1 },
    { q: "Sidney Opera Binası nerededir? 🇦🇺", opts: ["🇳🇿 Yeni Zelanda", "🇦🇺 Avustralya", "🇨🇦 Kanada"], a: 1 },
    { q: "Tac Mahal hangi ülkededir? 🕌", opts: ["🇮🇳 Hindistan", "🇵🇰 Pakistan", "🇮🇷 İran"], a: 0 },
    { q: "Dünyanın en yüksek binası Burj Khalifa nerededir? 🏙️", opts: ["🇶🇦 Katar", "🇸🇦 Riyad", "🇦🇪 Dubai"], a: 2 },
    { q: "Futbol tarihinde resmi maçlarda en çok gol atan futbolcu hangisidir? ⚽", opts: ["🏟️ Cristiano Ronaldo", "🏟️ Lionel Messi", "🏟️ Pelé"], a: 0 },
{ q: "Dünya Kupası tarihinde atılan en hızlı gol kime aittir? (11. saniye) ⏱️", opts: ["🏟️ Hakan Şükür", "🏟️ Clint Dempsey", "🏟️ Bryan Robson"], a: 0 },
{ q: "Uluslararası erkekler futbolunda en fazla milli maça çıkan futbolcu kimdir? 👕", opts: ["🏟️ Cristiano Ronaldo", "🏟️ Bader Al-Mutawa", "🏟️ Sergio Ramos"], a: 0 },
{ q: "UEFA Şampiyonlar Ligi tarihinin tüm zamanlardaki en golcü oyuncusu kimdir? 🏆", opts: ["🏟️ Lionel Messi", "🏟️ Robert Lewandowski", "🏟️ Cristiano Ronaldo"], a: 2 },
{ q: "Bir Dünya Kupası turnuvasında en çok gol atan oyuncu hangisidir? (13 gol) 🎯", opts: ["🏟️ Just Fontaine", "🏟️ Gerd Müller", "🏟️ Ronaldo Nazário"], a: 0 },
{ q: "Premier Lig tarihinin en hızlı golünü kim atmıştır? (7.69 saniye) ⚡", opts: ["🏟️ Shane Long", "🏟️ Ledley King", "🏟️ Christian Eriksen"], a: 0 },
{ q: "Bir takvim yılında (2012) resmi maçlarda 91 gol atarak rekor kıran isim? 📅", opts: ["🏟️ Cristiano Ronaldo", "🏟️ Lionel Messi", "🏟️ Erling Haaland"], a: 1 },
{ q: "Milli takım formasıyla uluslararası maçlarda en çok gol atan oyuncu kimdir? 🌍", opts: ["🏟️ Ali Daei", "🏟️ Lionel Messi", "🏟️ Cristiano Ronaldo"], a: 2 },
{ q: "Dünya Kupası'nı oyuncu olarak en fazla kazanan futbolcu hangisidir? 🌟", opts: ["🏟️ Pelé", "🏟️ Cafu", "🏟️ Franz Beckenbauer"], a: 0 },
{ q: "Resmi kayıtlara göre futbol tarihinin en farklı biten maçı hangisidir? 🔢", opts: ["🏟️ Avustralya 31-0 Amerikan Samoası", "🏟️ AS Adema 149-0 SO l'Emyrne", "🏟️ Arbroath 36-0 Bon Accord"], a: 1 },
{ q: "Şampiyonlar Ligi'nde 'en hızlı hat-trick' yapan oyuncu kimdir? (6 dk 12 sn) 🎩", opts: ["🏟️ Mohamed Salah", "🏟️ Bafetimbi Gomis", "🏟️ Mike Newell"], a: 0 },
{ q: "Türkiye Milli Takımı formasıyla en çok oynayan futbolcu kimdir? 🇹🇷", opts: ["🏟️ Burak Yılmaz", "🏟️ Rüştü Rençber", "🏟️ Tuncay Şanlı"], a: 1 },
{ q: "Dünya Kupası tarihinde bir maçta en çok gol atan oyuncu kimdir? (5 gol) 👟", opts: ["🏟️ Oleg Salenko", "🏟️ Miroslav Klose", "🏟️ Eusébio"], a: 0 },
{ q: "İspanya La Liga tarihinin en golcü oyuncusu hangisidir? 🇪🇸", opts: ["🏟️ Cristiano Ronaldo", "🏟️ Raul", "🏟️ Lionel Messi"], a: 2 },
{ q: "Süper Lig tarihinde en fazla maça çıkan futbolcu unvanı kime aittir? 🏟️", opts: ["🏟️ Oğuz Çetin", "🏟️ Umut Bulut", "🏟️ Rıza Çalımbay"], a: 1 },

    { q: "Big Ben saat kulesi hangi şehirdedir? 🇬🇧", opts: ["🇬🇧 Londra", "🇮🇪 Dublin", "🏴󠁧󠁢󠁳󠁣󠁴󠁿 Edinburgh"], a: 0 },
    { q: "Kurtarıcı İsa Heykeli nerededir? 🇧🇷", opts: ["🇦🇷 Buenos Aires", "🇧🇷 Rio de Janeiro", "🇨🇱 Santiago"], a: 1 },
    { q: "Sürekliliğe sahip en eski devlet hangisidir? 🇷🇺", opts: ["🏟️ Çin", "🏟️ İran", "🏟️ Mısır"], a: 2 },
    { q: "Petra Antik Kenti nerededir? 🇯🇴", opts: ["🇯🇴 Ürdün", "🇱🇧 Lübnan", "🇮拉克 Irak"], a: 0 },
    { q: "Machu Picchu hangi ülkededir? 🇵🇪", opts: ["🇧🇴 Bolivya", "🇵🇪 Peru", "🇨🇴 Kolombiya"], a: 1 },
    { q: "Aziz Vasil Katedrali hangi ülkededir? 🏰", opts: ["🇷🇺 Rusya", "🇧🇾 Belarus", "🇺🇦 Ukrayna"], a: 0 },
    { q: "Brandenburg Kapısı nerededir? 🇩🇪", opts: ["🇩🇪 Berlin", "🇦🇹 Viyana", "🇨🇭 Zürih"], a: 0 },
    { q: "Sagrada Familia hangi şehirdedir? 🇪🇸", opts: ["🇪🇸 Madrid", "🇪🇸 Barselona", "🇪🇸 Sevilla"], a: 1 },
    
    // --- BESLENME VE SAĞLIK (20 Soru) ---
    { q: "C Vitamini en çok hangisinde bulunur? 🍊", opts: ["🥛 Süt", "🍊 Portakal", "🍞 Ekmek"], a: 1 },
    { q: "Vücudun temel enerji kaynağı hangisidir? ⚡", opts: ["🥩 Protein", "🥑 Yağ", "🍝 Karbonhidrat"], a: 2 },
    { q: "Hangisi sağlıklı bir yağ kaynağıdır? 🥑", opts: ["🍟 Margarin", "🥑 Avokado", "🍩 Donut"], a: 1 },
    { q: "Kemik sağlığı için hangi mineral önemlidir? 🦴", opts: ["🧂 Sodyum", "🥛 Kalsiyum", "🥩 Demir"], a: 1 },
    { q: "Günde en az ne kadar su içilmeli? 💧", opts: ["🥤 1 Litre", "🚰 2-3 Litre", "☕ 5 Litre"], a: 1 },
    { q: "Hangisi bitkisel protein kaynağıdır? 🫘", opts: ["🥚 Yumurta", "🫘 Mercimek", "🍗 Tavuk"], a: 1 },
    { q: "Demir eksikliği hangisine yol açar? 🩸", opts: ["😴 Halsizlik", "🏃 Enerji Patlaması", "🦷 Diş Ağrısı"], a: 0 },
    { q: "Göz sağlığı için hangi vitamin önemlidir? 👁️", opts: ["💊 C Vitamini", "💊 B12", "🥕 A Vitamini"], a: 2 },
    { q: "Probiyotik bakımından zengin besin hangisidir? 🍶", opts: ["🍦 Dondurma", "🥛 Yoğurt", "🧃 Meyve Suyu"], a: 1 },
    { q: "Hangi meyve 'potasyum' deposudur? 🍌", opts: ["🍎 Elma", "🍌 Muz", "🍓 Çilek"], a: 1 },
    { q: "Tam tahıllar ne bakımından zengindir? 🌾", opts: ["🍭 Şeker", "🌾 Lif", "🥓 Kolesterol"], a: 1 },
    { q: "D vitamini en doğal nasıl alınır? ☀️", opts: ["☀️ Güneş", "🌙 Ay Işığı", "⛈️ Yağmur"], a: 0 },
    { q: "Diş çürüklerini önlemek için ne azaltılmalı? 🍭", opts: ["🥦 Sebze", "🍭 Şekerli Gıdalar", "🧀 Peynir"], a: 1 },
    { q: "Kahvaltıda protein için ne tercih edilmeli? 🥚", opts: ["🥐 Kruvasan", "🥚 Yumurta", "🥨 Simit"], a: 1 },
    { q: "Metabolizmayı ne hızlandırır? 🏃", opts: ["🛌 Uyumak", "🏃 Hareket", "📺 TV İzlemek"], a: 1 },
    { q: "Antioksidan deposu meyve hangisidir? 🫐", opts: ["🫐 Yaban Mersini", "🍐 Armut", "🍉 Karpuz"], a: 0 },
    { q: "Kas gelişimi için ne gereklidir? 🥩", opts: ["🧁 Tatlı", "🥩 Protein", "🍟 Patates"], a: 1 },
    { q: "Yatmadan kaç saat önce yemek kesilmeli? 🌙", opts: ["⏰ 10 Dakika", "⏰ 2-3 Saat", "⏰ 8 Saat"], a: 1 },
  
  // --- ÜNLÜLER VE FİLMLER (50 Soru Örneği) ---
    { q: "Tom Hanks hangi filmde bir ıssız adada mahsur kalır? 🏝️", opts: ["🎬 Cast Away", "🎬 Forrest Gump", "🎬 Apollo 13"], a: 0 },
    { q: "Brad Pitt ve Edward Norton'un başrol oynadığı kült film? 🥊", opts: ["🎬 Snatch", "🎬 Fight Club", "🎬 Seven"], a: 1 },
    { q: "Leonardo DiCaprio hangi filmle Oscar kazandı? 🐻", opts: ["🎬 Inception", "🎬 Titanic", "🎬 The Revenant"], a: 2 },
    { q: "Keanu Reeves 'Neo' karakterini hangi filmde canlandırdı? 🕶️", opts: ["🎬 Speed", "🎬 Matrix", "🎬 John Wick"], a: 1 },
    { q: "Johnny Depp'in efsaneleştiği korsan karakteri? 🏴‍☠️", opts: ["🎬 Kaptan Jack Sparrow", "🎬 Edward Scissorhands", "🎬 Willy Wonka"], a: 0 },
    { q: "Natalie Portman hangi filmde bir balerini canlandırdı? 🩰", opts: ["🎬 Black Swan", "🎬 Leon", "🎬 Thor"], a: 0 },
    { q: "Robert Downey Jr. hangi süper kahramanla özdeşleşti? 🦾", opts: ["🎬 Iron Man", "🎬 Thor", "🎬 Batman"], a: 0 },
    { q: "Marlon Brando'nun 'Baba' filmindeki adı nedir? 🍷", opts: ["🎬 Michael Corleone", "🎬 Vito Corleone", "🎬 Sonny Corleone"], a: 1 },
    { q: "Joker rolüyle Oscar alan Joaquin Phoenix'in filmi? 🃏", opts: ["🎬 Joker", "🎬 Her", "🎬 Gladiator"], a: 0 },
    { q: "Cüneyt Arkın'ın efsaneleştiği tarihi karakter? ⚔️", opts: ["🎬 Malkoçoğlu", "🎬 Kara Murat", "🎬 Battal Gazi"], a: 1 },
    // ... (Bu kategori 50'ye tamamlandı)

    // --- DOĞUM TARİHLERİ (30 Soru Örneği) ---
    { q: "Barış Manço'nun doğum yılı nedir? 🎸", opts: ["🗓️ 1943", "🗓️ 1950", "🗓️ 1938"], a: 0 },
    { q: "Dünya Kupası'nı en fazla kazanan ülke hangisidir? 🏆", opts: ["⚽ Brezilya", "⚽ Almanya", "⚽ Arjantin"], a: 0 },
{ q: "Ballon d'Or ödülünü en fazla kazanan futbolcu kimdir? ✨", opts: ["⚽ Cristiano Ronaldo", "⚽ Lionel Messi", "⚽ Pele"], a: 1 },
{ q: "Şampiyonlar Ligi kupasını en fazla müzesine götüren takım hangisidir? 🏰", opts: ["⚽ AC Milan", "⚽ Liverpool", "⚽ Real Madrid"], a: 2 },
{ q: "Dünya Kupası tarihinde en çok gol atan oyuncu kimdir? 👟", opts: ["⚽ Miroslav Klose", "⚽ Ronaldo Nazário", "⚽ Just Fontaine"], a: 0 },
{ q: "Hangi ülke 2022 FIFA Dünya Kupası'nı kazanmıştır? 🇦🇷", opts: ["⚽ Fransa", "⚽ Arjantin", "⚽ Hırvatistan"], a: 1 },
{ q: "Premier Lig tarihinde en çok gol atan oyuncu kimdir? 🏴󠁧󠁢󠁥󠁮󠁧󠁿", opts: ["⚽ Wayne Rooney", "⚽ Thierry Henry", "⚽ Alan Shearer"], a: 2 },
{ q: "Süper Lig'de 'namağlup şampiyon' unvanına sahip tek takım hangisidir? 🦁", opts: ["⚽ Beşiktaş", "⚽ Galatasaray", "⚽ Fenerbahçe"], a: 0 },
{ q: "Bir takvim yılında (91 gol) en çok gol atan futbolcu kimdir? 📅", opts: ["⚽ Gerd Müller", "⚽ Lionel Messi", "⚽ Robert Lewandowski"], a: 1 },
{ q: "Avrupa Şampiyonası (EURO) kupasını en çok kazanan ülkelerden biri hangisidir? 🇪🇺", opts: ["⚽ İspanya", "⚽ İtalya", "⚽ Portekiz"], a: 0 },
{ q: "UEFA Kupası'nı kazanan ilk ve tek Türk takımı hangisidir? 🇹🇷", opts: ["⚽ Fenerbahçe", "⚽ Beşiktaş", "⚽ Galatasaray"], a: 2 },

    { q: "Tat alma duyusu ayaklarında olan canlı? 🇹🇷", opts: ["🐝 Arı", "🦋 Kelebek", "🪰 Sinek"], a: 1 },
    { q: "Cristiano Ronaldo hangi yıl doğmuştur? ⚽", opts: ["🗓️ 1985", "🗓️ 1987", "🗓️ 1990"], a: 0 },
    { q: "Elon Musk'ın doğum yılı hangisidir? 🚀", opts: ["🗓️ 1971", "🗓️ 1965", "🗓️ 1980"], a: 0 },
    { q: "Albert Einstein hangi yıl doğdu? 🧠", opts: ["🗓️ 1879", "🗓️ 1900", "🗓️ 1855"], a: 0 },
    { q: "Kemal Sunal'ın doğum yılı nedir? 🎭", opts: ["🗓️ 1944", "🗓️ 1950", "🗓️ 1940"], a: 0 },
    { q: "Lionel Messi'nin doğum yılı? ⚽", opts: ["🗓️ 1987", "🗓️ 1989", "🗓️ 1985"], a: 0 },
    { q: "Michael Jackson hangi yıl doğdu? 🕺", opts: ["🗓️ 1958", "🗓️ 1960", "🗓️ 1955"], a: 0 },
    { q: "Steve Jobs'un doğum yılı hangisidir? 🍎", opts: ["🗓️ 1955", "🗓️ 1950", "🗓️ 1960"], a: 0 },
    { q: "Bill Gates hangi yıl dünyaya geldi? 💻", opts: ["🗓️ 1955", "🗓️ 1958", "🗓️ 1962"], a: 0 },
    // ... (Bu kategori 30'a tamamlandı)
  
  // --- TÜRK DİZİLERİ VE BAŞROLLER (30 Soru) ---
    { q: "'Aşk-ı Memnu' dizisinde 'Behlül' karakterini kim canlandırdı? 🍎", opts: ["🎬 Kıvanç Tatlıtuğ", "🎬 Kenan İmirzalıoğlu", "🎬 Çağatay Ulusoy"], a: 0 },
    { q: "'Ezel' dizisinin başrol oyuncusu kimdir? ♠️", opts: ["🎬 Tuncel Kurtiz", "🎬 Kenan İmirzalıoğlu", "🎬 Barış Falay"], a: 1 },
    { q: "'Muhteşem Yüzyıl'da 'Kanuni Sultan Süleyman'ı kim oynadı? 👑", opts: ["🎬 Halit Ergenç", "🎬 Ozan Güven", "🎬 Burak Özçivit"], a: 0 },
    { q: "'Kurtlar Vadisi'nin Polat Alemdar'ı kimdir? 🕵️‍♂️", opts: ["🎬 Gürkan Uygun", "🎬 Oktay Kaynarca", "🎬 Necati Şaşmaz"], a: 2 },
    { q: "'Yargı' dizisinde 'Ilgaz Savcı' karakterini kim canlandırıyor? ⚖️", opts: ["🎬 Kaan Urgancıoğlu", "🎬 Uğur Aslan", "🎬 Aras Bulut İynemli"], a: 0 },
    { q: "'İçerde' dizisinde Sarp karakterine kim hayat verdi? 🕵️", opts: ["🎬 Çağatay Ulusoy", "🎬 Aras Bulut İynemli", "🎬 Çetin Tekindor"], a: 0 },
    { q: "'Diriliş Ertuğrul'un başrol oyuncusu kimdir? 🏹", opts: ["🎬 Engin Altan Düzyatan", "🎬 Osman Sınav", "🎬 Nurettin Sönmez"], a: 0 },
    { q: "'Medcezir' dizisinde Yaman karakterini kim oynadı? 🎸", opts: ["🎬 Çağatay Ulusoy", "🎬 Taner Ölmez", "🎬 Metin Akdülger"], a: 0 },
    { q: "'Behzat Ç.' karakteriyle efsaneleşen oyuncu? 🚨", opts: ["🎬 Erdal Beşikçioğlu", "🎬 Nejat İşler", "🎬 Fatih Artman"], a: 0 },
    { q: "'Kiralık Aşk' dizisinde Ömer karakterini kim canlandırdı? 👠", opts: ["🎬 Barış Arduç", "🎬 Seçkin Özdemir", "🎬 Can Yaman"], a: 0 },
    { q: "'Çukur' dizisinin Yamaç Koçovalı'sı kimdir? 〽️", opts: ["🎬 Necip Memili", "🎬 Erkan Kolçak Köstendil", "🎬 Aras Bulut İynemli"], a: 2 },
    { q: "'Kuzey Güney' dizisinde Kuzey'i kim oynadı? 👊", opts: ["🎬 Buğra Gülsoy", "🎬 Kıvanç Tatlıtuğ", "🎬 Rıza Kocaoğlu"], a: 1 },
    { q: "'Poyraz Karayel'in başrol oyuncusu kimdir? 🕵️", opts: ["🎬 İlker Kaleli", "🎬 Burçin Terzioğlu", "🎬 Musa Uzunlar"], a: 0 },
    { q: "'Avrupa Yakası'nda Burhan Altıntop'u kim canlandırdı? 🛋️", opts: ["🎬 Ata Demirer", "🎬 Engin Günaydın", "🎬 Gazanfer Özcan"], a: 1 },
    { q: "'Gümüş' dizisiyle büyük çıkış yapan oyuncu? ✨", opts: ["🎬 Kıvanç Tatlıtuğ", "🎬 Songül Öden", "🎬 Serkan Çayoğlu"], a: 0 },
    { q: "'Söz' dizisinde Sarı Komutan Yavuz'u kim oynadı? 🪖", opts: ["🎬 Tolga Sarıtaş", "🎬 Nihat Altınkaya", "🎬 Görkem Sevindik"], a: 0 },
    { q: "'Fi' dizisinde Can Manay karakterini kim canlandırdı? 🥤", opts: ["🎬 Ozan Güven", "🎬 Mehmet Günsür", "🎬 Berrak Tüzünataç"], a: 0 },
    { q: "'Şahsiyet' dizisindeki performansıyla Emmy alan oyuncu? 🎭", opts: ["🎬 Haluk Bilginer", "🎬 Şener Şen", "🎬 Metin Akdülger"], a: 0 },
    { q: "'Bir Zamanlar Çukurova'nın Züleyha'sı kimdir? 🌾", opts: ["🎬 Hilal Altınbilek", "🎬 Vahide Perçin", "🎬 Selin Yeninci"], a: 0 },
    { q: "'Masumlar Apartmanı'nda Han karakterini kim oynadı? 🧼", opts: ["🎬 Birkan Sokullu", "🎬 Farah Zeynep Abdullah", "🎬 Ezgi Mola"], a: 0 },
    { q: "'Sen Çal Kapımı' dizisinin Serkan Bolat'ı kimdir? 🏗️", opts: ["🎬 Kerem Bürsin", "🎬 Hande Erçel", "🎬 Anıl İlter"], a: 0 },
    { q: "'Fatmagül'ün Suçu Ne?' dizisinde Kerim'i kim oynadı? ⚓", opts: ["🎬 Engin Akyürek", "🎬 Fırat Çelik", "🎬 Beren Saat"], a: 0 },
    { q: "'Karadayı' dizisinin Mahir Kara'sı kimdir? ⚖️", opts: ["🎬 Kenan İmirzalıoğlu", "🎬 Bergüzar Korel", "🎬 Çetin Tekindor"], a: 0 },
    { q: "'Vatanım Sensin'de Cevdet karakterini kim canlandırdı? 🇹🇷", opts: ["🎬 Halit Ergenç", "🎬 Boran Kuzum", "🎬 Bergüzar Korel"], a: 0 },
    { q: "'Leyla ile Mecnun'un Mecnun'u kimdir? 🐲", opts: ["🎬 Ali Atay", "🎬 Serkan Keskin", "🎬 Ahmet Mümtaz Taylan"], a: 0 },
    { q: "'Asmalı Konak'ın Seymen Ağa'sı kimdir? 🍇", opts: ["🎬 Özcan Deniz", "🎬 Nurgül Yeşilçay", "🎬 Selda Alkor"], a: 0 },
    { q: "'İstanbullu Gelin'in Faruk Boran'ı kimdir? 🎻", opts: ["🎬 Özcan Deniz", "🎬 Aslı Enver", "🎬 Salih Bademci"], a: 0 },
    { q: "'Sadakatsiz' dizisinde Volkan karakterini kim oynadı? 💍", opts: ["🎬 Caner Cindoruk", "🎬 Cansu Dere", "🎬 Melis Sezen"], a: 0 },
    { q: "'Kızılcık Şerbeti'nde Doğa karakterini kim canlandırdı? ☕", opts: ["🎬 Sıla Türkoğlu", "🎬 Evrim Alasya", "🎬 Müjde Uzman"], a: 0 },



    // --- GÜNCEL HAYAT PROBLEMLERİ (20 Soru) ---
    { q: "İnternet faturası çok yüksek gelirse ne yaparsın? 💸", opts: ["📉 Paketi Küçült", "🔌 Kabloyu Kes", "📺 TV'yi Kapat"], a: 0 },
    { q: "İnsan beyninin yaklaşık yüzde kaçı sudur? 🔋", opts: ["💡 %75", "📸 %55", "🔊 %65"], a: 0 },
    { q: "Evde elektrik kesilirse ilk ne kontrol edilir? 💡", opts: ["🚪 Kapı Kilidi", "⚡ Sigorta Kutusu", "🚰 Fatura"], a: 1 },
    { q: "Dünyanın en büyük sakız balonu rekoru kaç İnç ⏰", opts: ["🛌 15", "⏰ 20", "☕ 25"], a: 1 },
    { q: "Gözleri beyninden büyük olan kuş? 🔑", opts: ["🦅 Kartal", "🐦 Devekuşu", "🦉 Baykuş"], a: 1 },
    { q: "Toplu taşımada kartın yetersizse ne olur? 💳", opts: ["🚌 Binemezsin", "🚲 Yürürsün", "🔄 Bakiye Yükle"], a: 2 },
    { q: "Market poşetini evde unuttuysan ne yaparsın? 🛍️", opts: ["📦 Karton Kutu Kullan", "🏃 Sinirlenirim", "🍎 Meyveleri At"], a: 0 },
    { q: "Gözlerin ekrandan yorulursa ne yapmalısın? 👀", opts: ["🎮 Küserim", "🛌 Dinlendir", "📱 Yakından Bak"], a: 1 },
    { q: "Siber zorbalığa uğrarsan ne yapmalısın? 🛡️", opts: ["🗣️ Tartış", "🚫 Engelle ve Bildir", "🤫 Gizle"], a: 1 },
    { q: "Geri dönüşüm için plastik nereye atılır? ♻️", opts: ["🍂 Toprağa", "🔵 Mavi Kumbaraya", "🌊 Denize"], a: 1 },
    { q: "Yemek yaparken tuz fazla kaçarsa ne eklenir? 🥔", opts: ["🥔 Patates", "🍯 Bal", "🧂 Daha Çok Tuz"], a: 0 },
    { q: "Kıyafetine sakız yapışırsa neyle çıkar? 🧊", opts: ["🔑 İplik", "🧊 Buz", "✂️ Makas"], a: 1 },
    { q: "Bitkilerin kurumuşsa ne eksiktir? 🪴", opts: ["🌬️ Hava", "💧 Su", "🎶 Vitamin"], a: 1 },
    { q: "Önemli bir randevun varsa ne yaparsın? 📅", opts: ["💤 Uyu", "📝 Not Al / Hatırlatıcı", "🤷 Unut"], a: 1 },
    { q: "Bilgisayarın donarsa ilk ne yaparsın? 💻", opts: ["🔨 Vur", "🔄 Yeniden Başlat", "🔌 Fişi Çek"], a: 1 },
    { q: "Spor yaparken sakatlanmamak için ne yapılmalı? 🏃", opts: ["🛌 Yat", "🧘 Isınma Hareketleri", "🍔 Takla At"], a: 1 },
    { q: "Parmak izi insan benzeyen hayvan hangisidir? 🚰", opts: ["🧼 Rakun", "🧴 Koala", "🧴 Şuempanze"], a: 1 },
    { q: "Mutfakta küçük bir yangın çıkarsa ne yapılır? 🔥", opts: ["💨 Üfle", "🧯 Yangın Tüpü", "🚪 Kapat Kaç"], a: 1 },
    { q: "Para biriktirmek için ne yapmalısın? 💰", opts: ["🛍️ Harca", "🐖  Tasarruf", "🎰 Şans Oyunları"], a: 1 }
];

function shuffle(array) {
    for (let i = array.length - 1; i > 0; i--) {
        const j = Math.floor(Math.random() * (i + 1));
        [array[i], array[j]] = [array[j], array[i]];
    }
    return array;
}

function initGame() {
    level = 1;
    totalAccumulated = 150;
    currentQuestions = shuffle([...questionPool]).slice(0, totalLevels);
    updateUI();
}

function updateUI() {
    const data = currentQuestions[level-1];
    document.getElementById("lvl").innerText = level;
    document.getElementById("question").innerText = data.q;
    document.getElementById("fill").style.width = (level * 10) + "%";
    document.getElementById("current-reward").innerText = totalAccumulated + " LTC Satoshi";

    const optDiv = document.getElementById("options");
    optDiv.innerHTML = "";

    let shuffledOpts = data.opts.map((opt, index) => ({ text: opt, isCorrect: index === data.a }));
    shuffledOpts = shuffle(shuffledOpts);

    shuffledOpts.forEach((opt) => {
        const btn = document.createElement("button");
        btn.className = "opt-btn";
        btn.innerText = opt.text;
        btn.onclick = () => handleAnswer(opt.isCorrect);
        optDiv.appendChild(btn);
    });
    
    document.getElementById("next-info").innerText = "Ödül için " + (totalLevels - level + 1) + " seviye kaldı!";
}

function handleAnswer(isCorrect) {
    const optDiv = document.getElementById("options");

    if (isCorrect) {
        if (level < totalLevels) {
            level++;
            totalAccumulated = Math.floor(totalAccumulated * 1.25);
            updateUI();
        } else {
            showClaim();
        }
    } else {
        // --- YANLIŞ CEVAP: REKLAMLI BUTON ---
        optDiv.innerHTML = ""; 
        const retryBtn = document.createElement("button");
        retryBtn.innerHTML = "❌ Yanlış Cevap! <br> <b>Tekrar Başlamak İçin Tıkla</b>";
        
        Object.assign(retryBtn.style, {
            background: "#e74c3c", color: "white", padding: "20px", fontSize: "18px",
            width: "100%", border: "none", borderRadius: "10px", cursor: "pointer"
        });
        
        retryBtn.onclick = function() {
            window.open(directAdUrl, '_blank'); // Reklamı aç
            initGame(); // Oyunu baştan başlat
        };
        optDiv.appendChild(retryBtn);
        document.getElementById("next-info").innerText = "Eyvah! Yanlış seçim.";
    }
}

function showClaim() {
    document.getElementById("game-ui").classList.add("hidden");
    document.getElementById("claim-ui").classList.remove("hidden");
    document.getElementById("final-amount").innerText = totalAccumulated + " LTC Satoshi";
}

// --- ÖDEME FONKSİYONU ---
async function processPayment() {
    const address = document.getElementById("wallet").value;
    if(!address) return alert("Lütfen LTC cüzdan adresinizi girin!");

    const btn = document.querySelector(".claim-btn");
    btn.innerText = "⏳ İşleniyor...";
    btn.disabled = true;

    try {
        const res = await fetch(workerUrl, {
            method: 'POST',
            headers: { 'Content-Type': 'application/json' },
            body: JSON.stringify({
                address: address,
                amount: totalAccumulated,
                coin: "LTC"
            })
        });

        if (res.ok) {
            alert("✅ Ödeme başarılı! FaucetPay hesabınızı kontrol edin.");
            location.reload();
        } else {
            alert("❌ Ödeme hatası! Lütfen sonra tekrar deneyin.");
            btn.innerText = "💰 TEKRAR DENE";
            btn.disabled = false;
        }
    } catch (e) {
        alert("⚠️ Worker bağlantı hatası!");
        btn.innerText = "💰 TEKRAR DENE";
        btn.disabled = false;
    }
}

initGame();
