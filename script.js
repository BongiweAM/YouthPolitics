/* ============================================================
   YOUTHPOLITICS — Main Script — June 2026
   ============================================================ */

document.addEventListener('DOMContentLoaded', function () {
    setupNavbar();
    setupMobileMenu();
    setupAIChat();
    setupScrollAnimations();
    updateTimestamps();
    setupSwipeCards();
});

/* ── Navbar scroll effect ── */
function setupNavbar() {
    const navbar = document.getElementById('navbar');
    if (!navbar) return;
    window.addEventListener('scroll', () => {
        if (window.scrollY > 50) {
            navbar.style.boxShadow = '0 4px 30px rgba(0,0,0,0.12)';
        } else {
            navbar.style.boxShadow = '0 2px 20px rgba(0,0,0,0.06)';
        }
    });
}

/* ── Mobile menu ── */
function setupMobileMenu() {
    const btn = document.getElementById('mobileMenuBtn');
    const menu = document.getElementById('navMenu');
    if (!btn || !menu) return;
    btn.addEventListener('click', () => {
        menu.classList.toggle('open');
        btn.classList.toggle('active');
    });
    // Close when a link is clicked
    menu.querySelectorAll('.nav-link').forEach(link => {
        link.addEventListener('click', () => {
            menu.classList.remove('open');
            btn.classList.remove('active');
        });
    });
}

/* ── Scroll animations ── */
function setupScrollAnimations() {
    const observer = new IntersectionObserver((entries) => {
        entries.forEach(entry => {
            if (entry.isIntersecting) {
                entry.target.classList.add('visible');
            }
        });
    }, { threshold: 0.1, rootMargin: '0px 0px -40px 0px' });

    document.querySelectorAll('.animate-on-scroll').forEach(el => observer.observe(el));
}

/* ── Timestamps ── */
function updateTimestamps() {
    const now = new Date();
    const formatted = now.toLocaleDateString('en-ZA', {
        year: 'numeric', month: 'long', day: 'numeric'
    });
    document.querySelectorAll('[id="current-date"]').forEach(el => {
        el.textContent = formatted;
    });
}

/* ── Swipe Cards Navigation ── */
function setupSwipeCards() {
    const cards = document.querySelectorAll('.swipe-card');
    const prevBtn = document.getElementById('prevCard');
    const nextBtn = document.getElementById('nextCard');
    const dotsContainer = document.getElementById('swipeDots');
    let currentCard = 0;

    if (!cards.length || !prevBtn || !nextBtn || !dotsContainer) return;

    // Create dots
    cards.forEach((card, index) => {
        const dot = document.createElement('div');
        dot.className = 'swipe-dot' + (index === 0 ? ' active' : '');
        dot.addEventListener('click', () => showCard(index));
        dotsContainer.appendChild(dot);
    });

    const dots = dotsContainer.querySelectorAll('.swipe-dot');

    function showCard(index) {
        cards.forEach(card => card.classList.remove('active'));
        dots.forEach(dot => dot.classList.remove('active'));
        
        cards[index].classList.add('active');
        dots[index].classList.add('active');
        currentCard = index;
    }

    prevBtn.addEventListener('click', () => {
        currentCard = (currentCard - 1 + cards.length) % cards.length;
        showCard(currentCard);
    });

    nextBtn.addEventListener('click', () => {
        currentCard = (currentCard + 1) % cards.length;
        showCard(currentCard);
    });

    // Keyboard navigation
    document.addEventListener('keydown', (e) => {
        if (e.key === 'ArrowLeft') {
            currentCard = (currentCard - 1 + cards.length) % cards.length;
            showCard(currentCard);
        } else if (e.key === 'ArrowRight') {
            currentCard = (currentCard + 1) % cards.length;
            showCard(currentCard);
        }
    });

    // Auto-swipe every 8 seconds
    let autoSwipe = setInterval(() => {
        currentCard = (currentCard + 1) % cards.length;
        showCard(currentCard);
    }, 8000);

    // Pause auto-swipe on hover
    const swipeContainer = document.querySelector('.swipe-cards');
    if (swipeContainer) {
        swipeContainer.addEventListener('mouseenter', () => clearInterval(autoSwipe));
        swipeContainer.addEventListener('mouseleave', () => {
            autoSwipe = setInterval(() => {
                currentCard = (currentCard + 1) % cards.length;
                showCard(currentCard);
            }, 8000);
        });
    }

    // Show first card
    showCard(0);
}

/* ── Hero buttons ── */
document.addEventListener('DOMContentLoaded', function() {
    const heroAIBtn = document.getElementById('hero-ai-btn');
    const openAIFullBtn = document.getElementById('open-ai-full-btn');
    
    if (heroAIBtn) {
        heroAIBtn.addEventListener('click', () => {
            openAIChat();
        });
    }
    
    if (openAIFullBtn) {
        openAIFullBtn.addEventListener('click', () => {
            openAIChat();
        });
    }
});

/* ================================================================
   AI CHAT
================================================================ */
const aiKnowledge = {
    // Economy
    inflation: `Inflation in South Africa is currently at **5.9%** (June 2026). This means if something cost R100 last year, it costs R105.90 now. The main causes are rising food prices (+8.2%), fuel/transport (+7.1%), and electricity costs. The South African Reserve Bank (SARB) uses the interest rate to try to control inflation — when inflation is high, they raise interest rates to slow spending. As a young person, inflation means your money loses value over time. That's why investing beats keeping cash under the mattress.`,
    
    unemployment: `Youth unemployment in South Africa is **59.7%** — meaning nearly 6 out of every 10 young people (aged 15–34) have no job. This is one of the highest rates in the world. Why? (1) Apartheid systematically excluded black people from quality education and the economy — its effects are still felt today. (2) SA's economy is growing too slowly (only 0.6% in 2024) to absorb the 800,000+ young people entering the job market each year. (3) There's a huge skills mismatch — many jobs require digital or technical skills that most young people were never taught. The YES (Youth Employment Service) program and digital economy are creating new opportunities — especially in tech, renewable energy, and entrepreneurship.`,
    
    gdp: `GDP stands for Gross Domestic Product — it's the total value of everything SA produces in a year. SA's GDP growth in 2024 was only **0.6%**, which is very low. A growing economy creates jobs and opportunities; a stagnant one doesn't. The main drag on SA's economy is load shedding (costs R400bn/year), government corruption, high unemployment (meaning fewer people with money to spend), and weak global demand for our minerals. Projections for 2026: **2.5%** growth as energy supply improves and global conditions stabilize.`,
    
    investment: `To start investing as a young South African: (1) **EasyEquities** — open a free account, start with R1, buy ETFs (like the Satrix 40, which tracks the JSE's top 40 companies). (2) **Tax-Free Savings Account (TFSA)** — invest up to R36,000/year without paying tax on returns. Over 10–20 years, this is massive. (3) **Property** — you can get a 100% home loan (no deposit) if you have a stable income. Rental income can cover your bond. (4) **Side hustles & freelancing** — skills like coding, design, writing or video editing can earn you USD on platforms like Upwork and Fiverr. The key principle: start early. R500/month from age 20 at 10% annual return = over R1.8 million by age 60.`,
    
    property: `Property investment in South Africa: Banks can give you a **100% bond** (no deposit needed) if you're formally employed. The property's rental income can cover the monthly bond repayment. Key steps: (1) Build your credit score — pay every bill on time. (2) Save for transfer costs (around 8–10% of purchase price — this part you do need). (3) Research areas with growing rental demand — university towns, business hubs. (4) Start small — a R500k studio flat can rent for R5,000–R8,000/month. The big advantage: property grows with inflation AND you earn rental income while you sleep.`,
    
    nsfas: `NSFAS (National Student Financial Aid Scheme) funds university and TVET college students from families earning under R350,000/year. It covers tuition, accommodation, and a living allowance. How to apply: Go to **nsfas.org.za**, apply during October–January each year. Requirements: SA citizen, matric certificate, proof of household income. In 2024/25, NSFAS funded over 700,000 students at a cost of R47 billion. Important: NSFAS is a loan that converts to a bursary if you pass. If you fail repeatedly, you may have to repay it. Tips: Apply early, keep your details updated, check your status regularly online.`,
    
    // Politics
    anc: `The **ANC (African National Congress)** was founded in 1912 — making it over 110 years old. It led the anti-apartheid struggle and has governed SA since 1994. Key moments: Nelson Mandela was ANC president, imprisoned for 27 years, then became SA's first democratic president. The ANC won elections from 1994–2019 with over 60% of votes each time. In 2024, it dropped to **40.2%** — the first time below 50% since 1994. This happened because of corruption (the Zuma years), load shedding, high unemployment, and rising cost of living. The ANC then formed the GNU (Government of National Unity) with other parties to stay in power. Today, the ANC's youth wing is the ANCYL, but many young people have moved to the EFF, DA, or have stopped voting altogether.`,
    
    eff: `The **EFF (Economic Freedom Fighters)** was founded in 2013 by Julius Malema, who was expelled from the ANC Youth League. EFF's main demands: (1) Land expropriation without compensation — redistribute land taken during colonialism and apartheid. (2) Nationalization of mines and banks. (3) Free quality education, healthcare and housing for all. In 2024, EFF got **9.5%** of votes (39 seats). Their supporters are mainly young, black, radical — those who feel democracy hasn't delivered economic freedom. EFF is controversial: some see them as the voice of the oppressed; others see them as populist and economically dangerous. Julius Malema is charismatic, well-spoken, and provocative — watch his parliament speeches on YouTube to form your own view.`,
    
    da: `The **DA (Democratic Alliance)** is South Africa's second-largest party, getting **21.8%** in 2024. It's seen as a center-right party focused on economic growth, anti-corruption and rule of law. The DA governs the Western Cape province — which consistently has lower unemployment and better service delivery than ANC-run provinces. Critics say DA's policies favor the wealthy and historically white business community. Supporters say DA represents the best-run government in SA. DA leader **John Steenhuisen** joined the GNU with the ANC in 2024. DA got a significant portion of the young, urban, educated vote in 2024.`,
    
    gnu: `The **GNU (Government of National Unity)** was formed after the May 2024 elections because no party won a majority. Seven parties — ANC, DA, IFP, PA, FF+, ACDP, UDM — signed a coalition agreement. This is significant because: The ANC and DA are ideologically very different. Governing together requires compromise. Some see it as a mature democratic evolution; others see it as ANC desperately holding power. For youth, it means government policy will be contested — harder for any one extreme ideology to dominate. The GNU is SA's most complex government since 1994.`,
    
    bikos: `**Steve Biko (1946–1977)** was the founder of the Black Consciousness Movement (BCM). His core idea: Black people must first liberate their minds from psychological oppression before achieving political freedom. He argued that black people had internalized feelings of inferiority — and that this was the biggest obstacle to liberation. He was arrested by apartheid security police in 1977, tortured, and died in custody aged 30. The apartheid government tried to cover up the murder. His story is told in the film "Cry Freedom" (1987). His ideas directly influenced the 1976 Soweto Uprising and still resonate today in debates about identity, self-reliance, and black empowerment.`,
    
    winnie: `**Winnie Madikizela-Mandela (1936–2018)** is known as the "Mother of the Nation." While Nelson Mandela was imprisoned for 27 years, Winnie kept the struggle alive on the ground. She was banned, detained, tortured, and placed under house arrest for years — but never stopped fighting. She mobilized communities, defied apartheid laws, and became a symbol of resistance. Her famous quote: "With that stick of matches, with our necklace, we shall liberate this country" was controversial but showed her fearless defiance. She was also controversial for alleged involvement in violence during the struggle. But her role in keeping the anti-apartheid movement alive while Mandela was in prison is undeniable. She died in 2018 — thousands attended her funeral.`,
    
    albertina: `**Albertina Sisulu (1918–2011)** was a nurse, ANC Women's League president, and anti-apartheid icon. Known as "Ma Sisulu," she was married to Walter Sisulu (Nelson Mandela's close comrade, imprisoned with him for 26 years). While her husband was in prison, Albertina led resistance, organized protests, and raised their children under constant police surveillance. She co-led the 1956 Women's March against pass laws. She was detained, banned, and placed under house arrest. After 1994, she became an MP and continued fighting for women's rights and healthcare. She is remembered as one of SA's greatest unsung heroes.`,
    
    lilian: `**Lilian Ngoyi (1911–1980)** was the first woman elected to the ANC National Executive Committee. On August 9, 1956, she led 20,000 women in a march to the Union Buildings in Pretoria to protest pass laws. The march's slogan: "Wathint' abafazi, wathint' imbokodo" (You strike a woman, you strike a rock). This day is now Women's Day in South Africa. Ngoyi was repeatedly arrested, banned, and placed under house arrest for 18 years. She was never allowed to leave her home except for limited hours. She died in relative poverty in 1980. But her legacy lives on — she proved women were central to the liberation struggle.`,
    
    fatima: `**Fatima Meer (1928–2010)** was South Africa's first black female sociologist, a close friend of the Mandelas, and a fearless activist. She was banned for 13 years, placed under house arrest, and detained multiple times. She wrote the first biography of Nelson Mandela (1988) based on interviews she conducted with him. She was also a founder of the Black Women's Federation and fought not just apartheid but also patriarchy within liberation movements. She continued advocating for justice, women's rights, and education until her death in 2010.`,
    
    ruth: `**Ruth First (1925–1982)** was a white South African journalist, author, and anti-apartheid revolutionary. She exposed apartheid's brutality through fearless investigative journalism. She was a member of the Communist Party, married to Joe Slovo (SACP leader and MK chief of staff). In 1963, she was detained for 117 days in solitary confinement — the first white woman to be held under the 90-day detention law. After her release, she went into exile. On August 17, 1982, she was killed by a letter bomb sent by apartheid security forces while working at Eduardo Mondlane University in Mozambique. Her story is told in the film "A World Apart" (1988).`,
    
    mandela: `**Nelson Mandela (1918–2013)** was SA's first democratically elected president (1994–1999). He joined the ANC in the 1940s, helped found Umkhonto we Sizwe (MK — the ANC's armed wing) in 1961, was arrested in 1964, and spent **27 years** in prison on Robben Island. On February 11, 1990, millions watched him walk free — one of the most watched moments in history. In 1994, he led SA to its first democratic election. He is globally revered for choosing reconciliation over revenge. His legacy is debated: some say he gave too much up economically to white business; others say reconciliation saved SA from civil war. He won the Nobel Peace Prize in 1993 alongside FW de Klerk.`,
    
    loadshedding: `Load shedding is controlled power cuts Eskom (state electricity company) does when it can't produce enough electricity for everyone. Why does it happen? Eskom's coal power plants are old, poorly maintained, and broken down because of decades of mismanagement and corruption. The 2011 Eskom corruption scandal, the "State Capture" era under Zuma, delayed maintenance and cost SA billions. Solutions being implemented: (1) Private power generation — businesses can now build their own solar/wind plants. (2) New renewable energy projects — solar, wind, gas. (3) ESKOM debt restructuring — government took over R280bn of ESKOM's debt. Load shedding peaked in 2023 (2,800 hours per year). By 2026, projections show major improvement as new capacity comes online.`,
    
    // World
    brics: `**BRICS** is a group of major economies: Brazil, Russia, India, China, South Africa. In 2024, it expanded to include Egypt, Ethiopia, Iran, Saudi Arabia, and UAE. Together BRICS countries represent 40% of the world's population and over 30% of global GDP. For SA, being in BRICS means: access to the **New Development Bank** (can borrow money at lower rates than IMF), trade deals with China and India (SA's biggest trading partners), and political influence in multilateral forums. Critics say BRICS is dominated by China, which uses it to challenge US/Western global dominance. For SA youth: BRICS creates opportunities for education exchanges, investment, and jobs — especially in tech and infrastructure.`,
    
    ukraine: `The **Russia-Ukraine War** (started February 2022) affects South Africa significantly even though it's far away: (1) **Food prices** — Ukraine and Russia are major wheat and sunflower oil exporters. SA's bread and cooking oil prices rose 20–30% after the war started. (2) **Fuel prices** — global oil supply disruptions pushed SA petrol prices to record highs. (3) **SA's diplomatic position** — SA abstained from UN votes condemning Russia, which angered the US and EU. This led to threats to SA's AGOA trade deal (which allows SA goods duty-free access to the US). SA argues it wants to be "neutral" and support peace negotiations. Critics say SA's stance benefits Russian interests. The debate reveals the tension between SA's BRICS ties and its Western trade relationships.`,
    
    climate: `**Climate change** is not just an environmental issue for SA — it's an economic, political, and human rights issue. SA is the 12th largest carbon emitter globally (mostly from coal electricity). How it affects SA youth: (1) More frequent droughts devastate farming and food security. (2) Floods destroy homes and infrastructure. (3) Rising temperatures increase disease spread. (4) But ALSO — the green energy transition is creating massive job opportunities. SA's **Just Energy Transition** plan (backed by $8.5 billion from rich countries) aims to shift from coal to renewables by 2030, potentially creating 200,000+ new jobs. If you want a career with a future: solar engineering, wind turbine technician, green finance, environmental law.`,
    
    // History
    apartheid: `**Apartheid** (1948–1994) was a legal system of racial segregation enforced by the white-minority National Party government. Under apartheid: (1) Black people could not vote, own land in most areas, attend white schools, use white facilities, or live where they chose. (2) The "Homelands" (Bantustans) forced millions of black people into overcrowded rural areas with no economic opportunity. (3) Black education (Bantu Education Act, 1953) was deliberately inferior — preparing black people only for manual labor. (4) Torture, murder, and imprisonment of activists was routine. Why does it still matter in 2026? Because its economic effects are still with us: the Gini coefficient (inequality measure) of 0.63 makes SA the most unequal country in the world. The wealth gap between black and white South Africans remains enormous. Understanding this history is essential for understanding today's politics.`,
    
    soweto76: `The **Soweto Uprising (June 16, 1976)** began when black students refused to be taught in Afrikaans — the language of the oppressor. Led by teenagers from Soweto (around YOUR age), they marched peacefully on June 16. Police opened fire. **Hector Pieterson** (13 years old) was one of the first killed. The iconic photo of Sam Nzima carrying his body shocked the world. The uprising spread to townships across SA. The government responded with brutal force — over 500 students were killed. But the uprising changed history: it reinvigorated the anti-apartheid movement globally, increased international sanctions on SA, and showed the world that young people would not accept oppression. June 16 is now **Youth Day** in SA — a public holiday in honor of these heroes.`,
    
    feesmustfall: `**#FeesMustFall (2015–2016)** was a student-led movement that shut down universities across SA, demanding free higher education. What sparked it: Wits University announced a 10.5% fee increase in 2015. Students gathered, shut the gates, and the movement exploded nationally. What it achieved: (1) Government announced a **0% fee increase** for 2016. (2) Eventually led to free education being introduced for students from families earning under R350,000/year (NSFAS expansion). (3) Sparked a national debate about education as a human right. The movement also raised issues of institutional racism, curriculum decolonization ("Rhodes Must Fall"), and the mental health crisis among students. It showed that organized, peaceful youth activism can force government to act.`,
    
    // Generic helpful responses
    default: [
        "That's a great question. I can help you understand SA politics, world politics, economy, history, and financial literacy. Could you be more specific? For example: ask about unemployment, land reform, the ANC, EFF, how to invest, what inflation means, apartheid history, or any news story you want explained.",
        "I'm here to help you understand what's really happening in South Africa and the world — in plain language. Try asking me about: the 2024 elections, youth unemployment, load shedding, how to save money, Black Consciousness, the GNU, or any topic you're curious about.",
        "Good question! I can break down any political or economic topic for you. What specifically would you like to understand better? Politics, economy, history, investing, or something in the news?"
    ]
};

function setupAIChat() {
    const aiBtn = document.getElementById('ai-chat-btn');
    const modal = document.getElementById('ai-chat-modal');
    const closeBtn = document.getElementById('closeModal');
    const sendBtn = document.getElementById('send-btn');
    const input = document.getElementById('chat-input');

    if (!aiBtn || !modal) return;

    aiBtn.addEventListener('click', openAIChat);
    if (closeBtn) closeBtn.addEventListener('click', () => modal.classList.remove('show'));
    modal.addEventListener('click', (e) => { if (e.target === modal) modal.classList.remove('show'); });
    if (sendBtn) sendBtn.addEventListener('click', sendMessage);
    if (input) {
        input.addEventListener('keydown', (e) => { if (e.key === 'Enter' && !e.shiftKey) { e.preventDefault(); sendMessage(); } });
    }
}

function openAIChat() {
    const modal = document.getElementById('ai-chat-modal');
    if (!modal) return;
    modal.classList.add('show');
    const messages = document.getElementById('chat-messages');
    if (messages && messages.children.length === 0) {
        setTimeout(() => {
            addAIMessage("Hey! 👋 I'm the YouthPolitics AI. I can explain anything about South African politics, the economy, world affairs, history, and how to build your financial future — in plain language.\n\nTry asking me: \"Why is youth unemployment so high?\" or \"Tell me about Winnie Madikizela-Mandela\" or \"How do I start investing?\"");
        }, 300);
    }
}

function sendMessage() {
    const input = document.getElementById('chat-input');
    if (!input) return;
    const text = input.value.trim();
    if (!text) return;

    addUserMessage(text);
    input.value = '';
    showTyping();

    setTimeout(() => {
        removeTyping();
        const response = generateResponse(text);
        addAIMessage(response);
    }, 900 + Math.random() * 700);
}

function addUserMessage(text) {
    const msgs = document.getElementById('chat-messages');
    if (!msgs) return;
    const div = document.createElement('div');
    div.className = 'message user-message';
    div.textContent = text;
    msgs.appendChild(div);
    msgs.scrollTop = msgs.scrollHeight;
}

function addAIMessage(text) {
    const msgs = document.getElementById('chat-messages');
    if (!msgs) return;
    const div = document.createElement('div');
    div.className = 'message ai-message';
    // Format markdown-style bold
    const formatted = text
        .replace(/\*\*(.*?)\*\*/g, '<strong>$1</strong>')
        .replace(/\n/g, '<br>');
    div.innerHTML = `<div class="message-content"><i class="fas fa-robot"></i><p>${formatted}</p></div>`;
    msgs.appendChild(div);
    msgs.scrollTop = msgs.scrollHeight;
}

function showTyping() {
    const msgs = document.getElementById('chat-messages');
    if (!msgs) return;
    const div = document.createElement('div');
    div.className = 'message ai-message typing-indicator';
    div.innerHTML = `<div class="message-content"><i class="fas fa-robot"></i><div class="typing-dots"><span></span><span></span><span></span></div></div>`;
    msgs.appendChild(div);
    msgs.scrollTop = msgs.scrollHeight;
}

function removeTyping() {
    const indicator = document.querySelector('.typing-indicator');
    if (indicator) indicator.remove();
}

function generateResponse(msg) {
    const m = msg.toLowerCase();

    // Economy
    if (m.includes('inflation') || m.includes('price') || m.includes('cost of living')) return aiKnowledge.inflation;
    if (m.includes('unemploy') || m.includes('job') || m.includes('work') || m.includes('yes program')) return aiKnowledge.unemployment;
    if (m.includes('gdp') || m.includes('growth') || m.includes('economy grow')) return aiKnowledge.gdp;
    if (m.includes('invest') || m.includes('easyequities') || m.includes('etf') || m.includes('stock') || m.includes('share')) return aiKnowledge.investment;
    if (m.includes('property') || m.includes('house') || m.includes('home') || m.includes('bond') || m.includes('real estate')) return aiKnowledge.property;
    if (m.includes('nsfas') || m.includes('bursary') || m.includes('student loan') || m.includes('fees') || m.includes('university funding')) return aiKnowledge.nsfas;

    // SA Politics
    if (m.includes('anc') || m.includes('african national congress')) return aiKnowledge.anc;
    if (m.includes('eff') || m.includes('economic freedom fighter') || m.includes('malema') || m.includes('julius')) return aiKnowledge.eff;
    if (m.includes(' da ') || m.includes('democratic alliance') || m.includes('steenhuisen')) return aiKnowledge.da;
    if (m.includes('gnu') || m.includes('national unity') || m.includes('coalition') || m.includes('2024 election')) return aiKnowledge.gnu;
    if (m.includes('biko') || m.includes('black consciousness') || m.includes('bcm')) return aiKnowledge.bikos;
    if (m.includes('winnie') || m.includes('madikizela') || m.includes('mother of the nation')) return aiKnowledge.winnie;
    if (m.includes('albertina') || m.includes('sisulu') || m.includes('ma sisulu')) return aiKnowledge.albertina;
    if (m.includes('lilian') || m.includes('ngoyi')) return aiKnowledge.lilian;
    if (m.includes('fatima') || m.includes('meer')) return aiKnowledge.fatima;
    if (m.includes('ruth') || m.includes('first') || m.includes('joe slovo')) return aiKnowledge.ruth;
    if (m.includes('mandela') || m.includes('nelson')) return aiKnowledge.mandela;
    if (m.includes('load shedding') || m.includes('loadshedding') || m.includes('eskom') || m.includes('electricity')) return aiKnowledge.loadshedding;

    // World Politics
    if (m.includes('brics')) return aiKnowledge.brics;
    if (m.includes('ukraine') || m.includes('russia') || m.includes('war in europe')) return aiKnowledge.ukraine;
    if (m.includes('climate') || m.includes('environment') || m.includes('green energy') || m.includes('renewable')) return aiKnowledge.climate;

    // History
    if (m.includes('apartheid') || m.includes('history of sa') || m.includes('inequality')) return aiKnowledge.apartheid;
    if (m.includes('soweto') || m.includes('1976') || m.includes('hector') || m.includes('youth day')) return aiKnowledge.soweto76;
    if (m.includes('feesmustfall') || m.includes('fees must fall') || m.includes('student movement')) return aiKnowledge.feesmustfall;

    // Saving & Skills
    if (m.includes('save') || m.includes('saving') || m.includes('money') || m.includes('budget') || m.includes('financial')) return aiKnowledge.investment;
    if (m.includes('skill') || m.includes('learn') || m.includes('upwork') || m.includes('freelance') || m.includes('online work')) {
        return `Skills that can earn you money in South Africa in 2026:\n\n**Digital Skills:** Web development (HTML, CSS, JavaScript), graphic design (Canva, Photoshop), video editing (DaVinci Resolve is free), digital marketing, and social media management. These can earn you R5,000–R50,000+/month.\n\n**Freelance Platforms:** Upwork, Fiverr, 99designs, Toptal — these pay in USD, which means your rand earnings are much higher. A web developer in SA charging $30/hour earns more than most office jobs.\n\n**Free Learning Resources:** freeCodeCamp.org, Khan Academy, Coursera (many free courses), YouTube, and the SA government's **e-Skills Institute**.\n\n**Trades:** Electrician, plumber, solar installer — huge demand with load shedding. A qualified electrician can earn R25,000–R80,000/month.\n\n**Start today:** Pick ONE skill, commit 1 hour per day for 90 days. You'll be surprised how much you can learn.`;
    }

    // Random fallback
    const defaults = aiKnowledge.default;
    return defaults[Math.floor(Math.random() * defaults.length)];
}

/* ── Global helpers ── */
window.askAITopic = function(q) {
    openAIChat();
    setTimeout(() => {
        const input = document.getElementById('chat-input');
        if (input) {
            input.value = q;
            sendMessage();
        }
    }, 450);
};

window.openAI = function() {
    openAIChat();
};

// Quiz functionality
window.quizAnswer = function(isCorrect) {
    const result = document.getElementById('quiz-result');
    if (!result) return;
    
    if (isCorrect) {
        result.innerHTML = '🎉 CORRECT! The ANC got 40.2% — the first time below 50% since 1994. This led to the GNU coalition. <a href="sa-politics.html" style="color:#fff;text-decoration:underline;margin-left:0.5rem">Learn more →</a>';
        result.style.color = '#1db954';
        
        // Celebrate with confetti effect (simple)
        const btn = event.target;
        btn.style.background = '#1db954';
        btn.style.transform = 'scale(1.1)';
        
        // Track achievement
        let score = parseInt(localStorage.getItem('youthpolitics_quiz_score') || '0');
        score++;
        localStorage.setItem('youthpolitics_quiz_score', score);
        
        if (score === 1) {
            setTimeout(() => {
                alert('🎖️ Achievement Unlocked: First Quiz Question Correct! Keep learning to unlock more badges.');
            }, 1000);
        }
    } else {
        result.innerHTML = '❌ Not quite! The ANC got 40.2% in 2024 — its first time below 50%. Try the AI to learn more about SA politics.';
        result.style.color = '#e63946';
        event.target.style.background = '#e63946';
    }
    
    // Disable all buttons after answer
    document.querySelectorAll('.quiz-btn').forEach(b => b.disabled = true);
};

// Add progress tracker
window.addEventListener('scroll', () => {
    const scrolled = window.scrollY;
    const height = document.body.scrollHeight - window.innerHeight;
    const progress = (scrolled / height) * 100;
    
    // Update scroll progress bar
    const progressBar = document.getElementById('scrollProgress');
    if (progressBar) progressBar.style.width = progress + '%';
    
    // Track time on page
    if (!window.startTime) window.startTime = Date.now();
    const timeSpent = Math.floor((Date.now() - window.startTime) / 1000 / 60); // minutes
    
    if (timeSpent > 5 && !localStorage.getItem('youthpolitics_5min_badge')) {
        localStorage.setItem('youthpolitics_5min_badge', 'true');
        showAchievement('⏰ 5 Minutes of Learning', 'You spent 5 minutes learning! Knowledge is power.');
    }
    
    if (progress > 80 && !localStorage.getItem('youthpolitics_scroll_badge')) {
        localStorage.setItem('youthpolitics_scroll_badge', 'true');
        showAchievement('📚 Deep Reader', 'You read 80% of this page. Keep going!');
    }
});

function showAchievement(title, message) {
    const div = document.createElement('div');
    div.style.cssText = 'position:fixed;top:90px;right:20px;background:linear-gradient(135deg,#1db954,#14833b);color:#fff;padding:1rem 1.5rem;border-radius:12px;box-shadow:0 8px 30px rgba(0,0,0,0.3);z-index:9999;animation:slideIn 0.5s ease;max-width:300px';
    div.innerHTML = `<div style="font-weight:800;font-size:1rem;margin-bottom:0.3rem">${title}</div><div style="font-size:0.85rem;opacity:0.9">${message}</div>`;
    document.body.appendChild(div);
    
    setTimeout(() => {
        div.style.animation = 'slideOut 0.5s ease';
        setTimeout(() => div.remove(), 500);
    }, 4000);
}
