
let level = 1;
const totalLevels = 10;
let totalAccumulated = 150; // Başlangıç 150
let currentQuestions = [];
      
 // --- AYARLAR ---
const workerUrl = "https://lab-mode-a1.ahmtbke58.workers.dev/"; // Cloudflare Worker Adresin
  

// --- 5 KADEMELİ SORU HAVUZU (TOPLAM 100+ SORU) ---
const questionPool = {
    tier1: [ // Level 1-2 (Very Easy)
        { q: "Where is the Eiffel Tower? 🗼", opts: ["🇫🇷 Paris", "🇮🇹 Rome", "🇩🇪 Berlin"], a: 0 },
        { q: "Which fruit has the most Vitamin C? 🍊", opts: ["🥛 Milk", "🍊 Orange", "🍞 Bread"], a: 1 },
        { q: "Capital city of Japan? 🗾", opts: ["🇰🇷 Seoul", "🇨🇳 Beijing", "🇯🇵 Tokyo"], a: 2 },
        { q: "Who is the lead actor in 'The Matrix'? 🕶️", opts: ["🎬 Keanu Reeves", "🎬 Brad Pitt", "🎬 Tom Cruise"], a: 0 },
        { q: "Safe fat source for health? 🥑", opts: ["🍟 Margarine", "🥑 Avocado", "🍩 Donut"], a: 1 },
        { q: "Which country has Pyramids? 🏜️", opts: ["🇲🇦 Morocco", "🇪🇬 Egypt", "🇯🇴 Jordan"], a: 1 },
        { q: "Red light means? 🛑", opts: ["🏃 Run", "🛑 Stop", "🚲 Cycle"], a: 1 },
        { q: "What is the sun? ☀️", opts: ["🪐 Planet", "☀️ Star", "🌙 Moon"], a: 1 },
        { q: "Which animal is the King of Jungle? 🦁", opts: ["🐯 Tiger", "🐘 Elephant", "🦁 Lion"], a: 2 },
        { q: "How many legs does a spider have? 🕷️", opts: ["6", "8", "10"], a: 1 }
        // ... (Tier 1 için 10 soru daha eklenebilir)
    ],
    tier2: [ // Level 3-4 (Easy)
        { q: "Which city is famous for its canals? 🛶", opts: ["🇳🇱 Amsterdam", "🇮🇹 Venice", "🇧🇪 Brussels"], a: 1 },
        { q: "Where is the Statue of Liberty? 🗽", opts: ["🇺🇸 New York", "🇺🇸 L.A.", "🇺🇸 Chicago"], a: 0 },
        { q: "Lead actor in 'Pirates of the Caribbean'? 🏴‍☠️", opts: ["🎬 Johnny Depp", "🎬 Orlando Bloom", "🎬 Will Smith"], a: 0 },
        { q: "What mineral is vital for bones? 🦴", opts: ["🧂 Sodium", "🥛 Calcium", "🥩 Iron"], a: 1 },
        { q: "Solution for low phone battery? 🔋", opts: ["💡 Lower Brightness", "📸 Take Photos", "🔊 Max Volume"], a: 0 }
        // ... (Tier 2 için 15 soru daha eklenebilir)
    ],
    tier3: [ // Level 5-6 (Medium)
        { q: "Which year was Albert Einstein born? 🧠", opts: ["🗓️ 1879", "🗓️ 1900", "🗓️ 1855"], a: 0 },
        { q: "Where is the ancient city of Petra? 🇯🇴", opts: ["🇯🇴 Jordan", "🇱🇧 Lebanon", "🇮🇶 Iraq"], a: 0 },
        { q: "Which vitamin is synthesized by sunlight? ☀️", opts: ["💊 Vit C", "💊 Vit D", "💊 Vit A"], a: 1 },
        { q: "Capital of Australia? 🇦🇺", opts: ["🏙️ Sydney", "🏙️ Melbourne", "🏙️ Canberra"], a: 2 },
        { q: "Lead actress in 'Black Swan'? 🩰", opts: ["🎬 Natalie Portman", "🎬 Mila Kunis", "🎬 Emma Stone"], a: 0 }
        // ... (Tier 3 için 15 soru daha eklenebilir)
    ],
    tier4: [ // Level 7-8 (Hard)
        { q: "Deepest point in the world's oceans? 🌊", opts: ["📍 Mariana Trench", "📍 Java Trench", "📍 Tonga Trench"], a: 0 },
        { q: "Who painted the 'Mona Lisa'? 🎨", opts: ["🎨 Van Gogh", "🎨 Da Vinci", "🎨 Picasso"], a: 1 },
        { q: "Which organ produces insulin? 🩺", opts: ["🧪 Liver", "🧪 Pancreas", "🧪 Kidney"], a: 1 },
        { q: "Where is Machu Picchu? 🇵🇪", opts: ["🇧🇴 Bolivia", "🇵🇪 Peru", "🇨🇴 Colombia"], a: 1 },
        { q: "Which of these iconic landmarks was officially opened first? 🏛️", opts: ["🗼 Eiffel Tower", "🗽 Statue of Liberty", "🌉 Brooklyn Bridge"],  a: 2 },
        { q: "Elon Musk's birth year? 🚀", opts: ["🗓️ 1971", "🗓️ 1965", "🗓️ 1980"], a: 0 }
        // ... (Tier 4 için 15 soru daha eklenebilir)
    ],
    tier5: [ // Level 9-10 (Expert)
        { q: "First human in space? 👨‍🚀", opts: ["🚀 Neil Armstrong", "🚀 Yuri Gagarin", "🚀 Buzz Aldrin"], a: 1 },
        { q: "Chemical symbol for Gold? 🧪", opts: ["🧪 Ag", "🧪 Fe", "🧪 Au"], a: 2 },
        { q: "Most populated city in the world? 🌏", opts: ["🏙️ Tokyo", "🏙️ Shanghai", "🏙️ Delhi"], a: 0 },
        { q: "Who discovered Penicillin? 💊", opts: ["🔬 Fleming", "🔬 Pasteur", "🔬 Curie"], a: 0 },
        { q: "Which planet in our solar system has the shortest day, lasting only about 10 hours? 🪐", opts: ["🪐 Mars", "🪐 Jupiter", "🪐   Saturn"], a: 1 },
        { q: "Smallest country in the world? 🇻🇦", opts: ["🇲🇨 Monaco", "🇻🇦 Vatican City", "🇲🇹 Malta"], a: 1 }
        // ... (Tier 5 için 15 soru daha eklenebilir)
    ]
};

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
    currentQuestions = [];

    // Her tier'dan 2'şer soru seçerek 10 soruluk set oluştur (Tier1 -> Level 1-2, Tier2 -> Level 3-4...)
    currentQuestions.push(...shuffle([...questionPool.tier1]).slice(0, 2));
    currentQuestions.push(...shuffle([...questionPool.tier2]).slice(0, 2));
    currentQuestions.push(...shuffle([...questionPool.tier3]).slice(0, 2));
    currentQuestions.push(...shuffle([...questionPool.tier4]).slice(0, 2));
    currentQuestions.push(...shuffle([...questionPool.tier5]).slice(0, 2));

   // Arayüzü tamamen temizle ve 1. leveli yükle
    document.getElementById("next-info").innerText = "Ödül için " + totalLevels + " seviye kaldı!";
    updateUI();
}

// updateUI, handleAnswer ve processPayment fonksiyonları öncekiyle aynı kalacak şekilde devam eder...
// Sadece alert metinlerini İngilizce yapmayı unutma!

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
        retryBtn.innerHTML = "❌ Yanlış Cevap! <br> <b>Click to Start Again</b>";
        
        Object.assign(retryBtn.style, {
            background: "#e74c3c", color: "white", padding: "20px", fontSize: "18px",
            width: "100%", border: "none", borderRadius: "10px", cursor: "pointer"
        });
        
        retryBtn.onclick = function() {
    // 1. Üç farklı reklam linki seçeneği
    const adLinks = [
        "https://gazetehaberleri.blogspot.com/",
        "https://internetdefteri.blogspot.com/",
        "https://medyalar.blogspot.com/"
    ];

    // 2. Rastgele bir tanesini seç
    const randomAd = adLinks[Math.floor(Math.random() * adLinks.length)];

    // 3. Reklamı yeni sekmede aç
    try {
        window.open(randomAd, '_blank');
    } catch (e) {
        console.log("Ad blocker blocked the popup.");
    }

    // 4. Oyunu sıfırla ve 1. seviyeye dön
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
    // ID'si 'wallet' olan inputtan e-postayı alıyoruz
    const email = document.getElementById("wallet").value;
    
    // Basit bir e-posta formatı kontrolü
    if(!email || !email.includes("@")) {
        return alert("Please enter a valid FaucetPay Email address!");
    }

    const btn = document.querySelector(".claim-btn");
    btn.innerText = "⏳ Processing...";
    btn.disabled = true;

    try {
        const res = await fetch(workerUrl, {
            method: 'POST',
            headers: { 'Content-Type': 'application/json' },
            body: JSON.stringify({
                address: email, // E-posta adresi 'address' olarak Worker'a gider
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

 

