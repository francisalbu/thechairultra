// PT / EN — o HTML está em inglês; este ficheiro troca os textos para português.
// Chave = innerHTML normalizado (espaços colapsados, <img> sem atributos).
(function () {
  var T = {
    // nav / geral
    "Formats": "Formatos",
    "About": "Sobre",
    "FAQ": "FAQ",
    "Partners": "Parceiros",
    "The Concept": "O Conceito",
    "Join the waitlist": "Junta-te à waitlist",
    "Coming soon": "Brevemente",
    "Know more": "Saber mais",
    "Spring 2027": "Primavera 2027",
    "Fall 2027": "Outono 2027",
    "Lisbon": "Lisboa",

    // hero
    "A new era of endurance races.": "Uma nova era de corridas de resistência.",
    "Redefine your distance.": "Redefine a tua distância.",
    "Discover our formats": "Descobre os nossos formatos",

    // formats
    "Our formats": "Os nossos formatos",
    "A 24 hour last person standing race.<br>Run it solo, in duos or in crews of 4.<br>Strategy is key.":
      "Uma corrida last person standing de 24 horas.<br>Corre a solo, em duplas ou em equipas de 4.<br>A estratégia é tudo.",
    "A traditional backyard ultra race.<br>6.7km loops, every hour on the hour.<br>No time limit. Last person standing wins.":
      "Uma backyard ultra tradicional.<br>Voltas de 6,7 km, de hora a hora.<br>Sem limite de tempo. Ganha o último em pé.",

    // about
    "<b>The Chair is a project designed to redefine endurance racing by challenging athletes to push beyond what they believe they are capable of.</b>":
      "<b>O The Chair é um projeto criado para redefinir as provas de resistência, desafiando os atletas a ir além daquilo que acreditam ser capazes.</b>",
    "We believe distance is more than the kilometres you can run. It is the gap between what you think you can achieve and what you can actually do when you refuse to quit.":
      "Acreditamos que a distância é mais do que os quilómetros que consegues correr. É o espaço entre aquilo que achas que consegues e aquilo que realmente fazes quando te recusas a desistir.",
    "<b>That is the distance you will redefine.</b>": "<b>É essa a distância que vais redefinir.</b>",
    "The concept": "O conceito",
    "You are a <span class=\"dnl\"><i>.</i>DNL</span>": "És um <span class=\"dnl\"><i>.</i>DNL</span>",
    "Official Race Codes": "Conclusões oficiais da prova",
    "What sets us apart": "O que nos distingue",
    "Up until now, last person standing races only had 2 possible conclusions. <b>Last Person Standing</b> and <b>DNF</b> (did not finish).": "Até agora, as corridas last person standing tinham apenas 2 desfechos possíveis. <b>Last Person Standing</b> e <b>DNF</b> (did not finish).",
    "The Chair Ultra races provide a mental stimulus for runners to keep on going.": "As corridas The Chair Ultra dão aos atletas um estímulo mental para continuarem.",
    "Introducing the DNL<small>(Did not leave)</small>": "Apresentamos o DNL<small>(Did not leave)</small>",
    "*Did not Leave": "*Did not Leave (não saiu)",
    "You stayed in the comfort of the chair and didn't go to the corral.": "Ficaste no conforto da cadeira e não foste para o corral.",
    "Runners who <span class=\"dnl\"><i>.</i>DNL</span> ring the quitting bell, seated in the chair at the start of the corral.": "Os atletas que fazem <span class=\"dnl\"><i>.</i>DNL</span> tocam o sino da desistência, sentados na cadeira à entrada do corral.",
    "Last Person/Team standing": "Último atleta/equipa em pé",
    "Did not finish the loop in 1 hour but still completed the loop": "Não terminou a volta em 1 hora, mas completou a volta",
    "Did not leave the chair/base to attempt to complete another loop": "Não saiu da cadeira/base para tentar completar outra volta",

    // DNT
    "Introducing the DNT.<small>(Did not try)</small>": "Apresentamos o DNT.<small>(Did not try)</small>",
    "If:": "Se:",
    "You stayed in the comfort of the base and didn't go to the corral.": "Ficaste no conforto da base e não foste para o corral.",
    "You walked up to the corral, crossed the start line, did some meters and turned around.": "Foste até ao corral, passaste a linha de partida, fizeste uns metros e voltaste para trás.",
    "You didn't try.": "Não tentaste.",
    "So you will sit in our chair and receive a DNT.": "Por isso vais sentar-te na nossa cadeira e receber um DNT.",
    "The chair": "A cadeira",

    // founders
    "\"I PROMISE THAT,<br> LOOP AFTER LOOP,<br> I WILL REMEMBER<br> THE TIME I SACRIFICED,<br> AND THAT I WILL NOT QUIT<br> IN THIS FUCKING CHAIR.\"":
      "\"PROMETO QUE,<br> VOLTA APÓS VOLTA,<br> VOU LEMBRAR-ME<br> DO TEMPO QUE SACRIFIQUEI,<br> E QUE NÃO VOU DESISTIR<br> NESTA MALDITA CADEIRA.\"",
    "\"This is without a doubt the best way for you to challenge your beliefs, to change your perceptions about what you really can do.\"": "\"Esta é, sem dúvida, a melhor forma de te desafiares e mudares a perceção sobre aquilo que realmente consegues fazer.\"",
    "Founder &amp; Creator Andamente": "Fundador &amp; Criador Andamente",
    "Founder &amp; Ultra athlete": "Fundador &amp; Atleta de ultra",

    // FAQ
    "Questions.": "Perguntas.",
    "What is a backyard ultra?": "O que é uma backyard ultra?",
    "A race format where every athlete runs the same 6.7 km loop, starting together every hour, on the hour. Miss the start and you're out. The last athlete standing wins.":
      "Um formato de corrida em que todos os atletas fazem a mesma volta de 6,7 km, partindo juntos de hora a hora. Falhas a partida e estás fora. Ganha o último atleta em pé.",
    "What's the difference between <img> and <img>?": "Qual é a diferença entre o <img> e o <img>?",
    "<img> lasts 24 hours and can be run solo, in duos or in crews of 4. <img> has no time limit and is solo only. It ends when only one athlete remains.":
      "O <img> dura 24 horas e pode ser corrido a solo, em duplas ou em equipas de 4. O <img> não tem limite de tempo e é só a solo. Acaba quando resta apenas um atleta.",
    "How do I get into <img>?": "Como entro no <img>?",
    "It's open to everyone, but places are limited. Join the waitlist to get priority access when registration opens.": "É aberto a todos, mas as vagas são limitadas. Junta-te à waitlist para teres acesso prioritário quando as inscrições abrirem.",
    "How do I get into <img>?": "Como entro no <img>?",
    "The top 3 men and the top 3 women in the <span class=\"tm\"><i>.</i>solo</span> category at <img> earn a spot. The other places go by application or wildcard.": "Os 3 primeiros homens e as 3 primeiras mulheres da categoria <span class=\"tm\"><i>.</i>solo</span> do <img> ganham um lugar. As restantes vagas são atribuídas por candidatura ou wildcard.",
    "Where and when will it happen?": "Onde e quando vai acontecer?",
    "Both races take place in Lisbon. <img> is planned for Spring 2027 and <img> for Fall 2027. Waitlist members will be able to register before everyone else.": "As duas provas são em Lisboa. O <img> será na primavera de 2027 e o <img> no outono de 2027. As pessoas da waitlist vão conseguir fazer a inscrição mais cedo que as outras pessoas.",
    "Do I need to be an ultra runner?": "Preciso de ser ultramaratonista?",
    "No. You only need to be able to run 6.7 km in under an hour. How far you go after that depends on how long you refuse to quit.":
      "Não. Só precisas de conseguir correr 6,7 km em menos de uma hora. Até onde vais depois disso depende de quanto tempo te recusas a desistir.",
    "What is a <span class=\"dnl\"><i>.</i>DNL</span>?": "O que é um <span class=\"dnl\"><i>.</i>DNL</span>?",
    "Did Not Leave. When the bell rings, you either don't start the next loop, or you start it and turn back after the first 20 metres. The chair took you out.": "Did Not Leave. Quando o sino toca, ou não começas a volta seguinte, ou começas e voltas para trás nos primeiros 20 metros. Foi a cadeira que te tirou da prova.",
    "What is a DNF?": "O que é um DNF?",
    "Did Not Finish. You didn't complete the loop before the hour was up, so the clock took you out.": "Did Not Finish. Não completaste a volta antes de acabar a hora, por isso foi o relógio que te tirou da prova.",
    "Can I have a support crew?": "Posso ter uma equipa de apoio?",
    "Solo runners can have a support crew. Duos can have one person. Crews of four run with no outside support.": "Os atletas a solo podem ter uma equipa de apoio. As duplas podem ter uma pessoa. As equipas de quatro correm sem apoio externo.",
    "How do I sign up?": "Como me inscrevo?",
    "Registration opens soon. Follow <span class=\"hq-tag\">@thechairultra</span> and join the waitlist to be the first to know.": "As inscrições abrem em breve. Segue <span class=\"hq-tag\">@thechairultra</span> e junta-te à waitlist para seres o primeiro a saber.",
    "What happens if more than one runner completes the 24 hours?": "O que acontece se mais do que um atleta completar as 24 horas?",
    "There's a 25th loop. The first to finish it wins <img>.": "Há uma 25.ª volta. O primeiro a terminá-la ganha o <img>.",

    // partners
    "Build the first edition with us.": "Constrói connosco a primeira edição.",
    "We're looking for partners who share our passion for endurance. Put your brand at the heart of the race, from the very first loop.":
      "Procuramos parceiros que partilhem a nossa paixão pela resistência. Coloca a tua marca no centro da prova, desde a primeira volta.",
    "<span>Get in touch</span>": "<span>Fala connosco</span>",

    // waitlist
    "Waitlist": "Waitlist",
    "Choose one": "Escolhe um",
    "What's your format?": "Qual é o teu formato?",
    "Gender": "Género",
    "Female": "Feminino",
    "Male": "Masculino",
    "Prefer not to say": "Prefiro não dizer",
    "Age": "Idade",
    "District": "Distrito",
    "<span>Sign up</span>": "<span>Inscrever</span>",
    "You're in.": "Estás dentro.",
    "Check your inbox. We'll be in touch before anyone else.": "Verifica o teu email. Vamos falar contigo antes de toda a gente.",

    // 24h
    "<span class=\"inl-logo\"><img></span> is a 24-hour last-person-standing race, in the heart of the city. You run as many loops as you can, <span class=\"tm\"><i>.</i>solo</span>, in <span class=\"tm\"><i>.</i>duos</span> or in <span class=\"tm\"><i>.</i>crews</span> of 4. It's competition, it's community, and it's your chance to go further than you ever have.":
      "<span class=\"inl-logo\"><img></span> é uma corrida last-person-standing de 24 horas, no coração da cidade. Fazes tantas voltas quanto conseguires, a <span class=\"tm\"><i>.</i>solo</span>, em <span class=\"tm\"><i>.</i>duos</span> ou em <span class=\"tm\"><i>.</i>crews</span> de 4. É competição, é comunidade, e é a tua oportunidade de ir mais longe do que nunca.",
    "Every hour on the hour.": "De hora a hora.",
    "All athletes leave the start box together on the hour, every hour.": "Todos os atletas saem juntos da zona de partida no início de cada hora.",
    "6.7 km per loop.": "6,7 km por volta.",
    "Athletes have one hour to run the loop at their own pace. They must be back in the start box before the next hour starts.":
      "Os atletas têm uma hora para fazer a volta ao seu ritmo. Têm de estar de volta à zona de partida antes de começar a hora seguinte.",
    "Late means disqualification.": "Atrasado é desclassificado.",
    "Athletes who aren't in the start box when the next hour begins are disqualified.": "Os atletas que não estiverem na zona de partida quando começa a hora seguinte são desclassificados.",
    "Two ways to win.": "Duas formas de ganhar.",
    "<b>Last Person Standing wins.</b> The race continues hour after hour until only one athlete/team remains.": "<b>Ganha o último em pé.</b> A corrida continua hora após hora até restar apenas um atleta/equipa.",
    "<b><span class=\"hl\"><i>.</i>25<small>th</small></span> lap - Winner takes it all.</b> If more than one runner makes it through 24 hours, there's one final loop. First to finish it wins.":
      "<b><span class=\"hl\"><i>.</i>25<small>.ª</small></span> volta - O vencedor leva tudo.</b> Se mais do que um atleta chegar às 24 horas, há uma última volta. O primeiro a terminá-la ganha.",
    "The last athlete standing wins.": "Ganha o último atleta em pé.",
    "The race ends when only one athlete remains.": "A corrida acaba quando resta apenas um atleta.",
    "Your race.<br>Your strategy.": "A tua corrida.<br>A tua estratégia.",
    "It's just you against your personal best.": "És só tu contra o teu melhor.",
    "Last person standing wins. If it goes past 24 hours, all remaining <span class=\"tm\"><i>.</i>solo</span> runners dispute a 25th loop to decide the <span class=\"tm\"><i>.</i>solo</span> winner.":
      "Ganha o último em pé. Se passar das 24 horas, todos os atletas <span class=\"tm\"><i>.</i>solo</span> que restarem disputam uma 25.ª volta para decidir o vencedor <span class=\"tm\"><i>.</i>solo</span>.",
    "Runners can bring their supporting crew.": "Os atletas podem trazer a sua equipa de apoio.",
    "Pick your teammate and go beyond together.": "Escolhe o teu parceiro e vão mais longe juntos.",
    "Define a strategy and take turns between loops.": "Definam uma estratégia e revezem-se entre voltas.",
    "Last duo standing wins. If it goes past 24 hours, pick who runs the 25th loop to decide the <span class=\"tm\"><i>.</i>duos</span> winner.":
      "Ganha a última dupla em pé. Se passar das 24 horas, escolham quem corre a 25.ª volta para decidir o vencedor <span class=\"tm\"><i>.</i>duos</span>.",
    "Your team is your crew, no external assistance.": "A tua equipa é o teu apoio, sem assistência externa.",
    "Every runner must run a minimum number of loops.": "Cada atleta tem de correr um número mínimo de voltas.",
    "Last crew standing wins. If it goes past 24 hours, pick who runs the 25th loop to decide the <span class=\"tm\"><i>.</i>crews</span> winner.":
      "Ganha a última equipa em pé. Se passar das 24 horas, escolham quem corre a 25.ª volta para decidir o vencedor <span class=\"tm\"><i>.</i>crews</span>.",
    "Which one are you going to pick?": "Qual vais escolher?",
    "See The Chair.BYU format": "Ver o formato The Chair.BYU",
    "See The Chair.24 format": "Ver o formato The Chair.24",

    // backyard
    "A traditional backyard ultra. All athletes start together on the hour. You have one hour to finish the 6.7 km loop and be back in the start box before the next hour begins. Miss it and you're out. There is no time limit: the race ends when only one athlete remains.":
      "Uma backyard ultra tradicional. Todos os atletas partem juntos no início de cada hora. Tens uma hora para fazer a volta de 6,7 km e voltar à zona de partida antes de começar a hora seguinte. Se falhares, estás fora. Não há limite de tempo: a corrida acaba quando resta apenas um atleta.",
    "6.7 km every hour, on the hour": "6,7 km de hora a hora",
    "No time limit": "Sem limite de tempo",
    "The race": "A corrida",
    "<span class=\"inl-logo\"><img></span> is a traditional backyard ultra. All athletes start together on the hour. You have one hour to finish the 6.7 km loop and be back in the start box before the next hour begins. Miss it and you're out. There is no time limit: the race ends when only one athlete remains.": "<span class=\"inl-logo\"><img></span> é uma backyard ultra tradicional. Todos os atletas partem juntos no início de cada hora. Tens uma hora para fazer a volta de 6,7 km e voltar à zona de partida antes de começar a hora seguinte. Se falhares, estás fora. Não há limite de tempo: a corrida acaba quando resta apenas um atleta.",
    "One loop.<br>No limit.": "Uma volta.<br>Sem limite.",
    "It's just you against everyone else, and yourself.": "És só tu contra todos os outros, e contra ti próprio.",
    "No time limit. The race goes on until only one runner remains.": "Sem limite de tempo. A corrida continua até restar apenas um atleta.",
    "How to qualify": "Como te qualificas",
    "Top 3 men &amp; Top 3 women": "Top 3 masculino &amp; Top 3 feminino",
    "of the <span class=\"tm\"><i>.</i>solo</span> race at": "da prova <span class=\"tm\"><i>.</i>solo</span> no",
    "Application": "Candidatura",
    "The Chair team will pick athletes based on their race history, their story and what they're chasing.": "A equipa The Chair escolhe atletas com base no seu historial de provas, na sua história e naquilo que procuram.",
    "Wildcard": "Wildcard",
    "Show us why you belong in the chair. Post a video on Instagram with <span class=\"hq-tag\">#thechairultra</span> and tag <span class=\"hq-tag\">@thechairultra</span>.": "Mostra-nos porque mereces um lugar na cadeira. Publica um vídeo no Instagram com <span class=\"hq-tag\">#thechairultra</span> e identifica <span class=\"hq-tag\">@thechairultra</span>.",
    "Top 3<br><span class=\"tm\"><i>.</i>solo</span>": "Top 3<br><span class=\"tm\"><i>.</i>solo</span>",
    "Top 3 Men": "Top 3 Homens",
    "Top 3 Women": "Top 3 Mulheres",
    "Qualify for": "Qualificam-se para",
    "Fall 2027 · Lisbon": "Outono 2027 · Lisboa",
    "Direct entry": "Entrada direta",
    "Men &amp; Women": "Masculino &amp; Feminino",
    "The top 3 men and top 3 women of the <span class=\"tm\"><i>.</i>solo</span> race qualify for": "Os 3 primeiros homens e as 3 primeiras mulheres da prova <span class=\"tm\"><i>.</i>solo</span> qualificam-se para",
    "How far will you go?": "Até onde vais?"
  };
  var PH = { "First name": "Nome", "Last name": "Apelido", "Your email": "O teu email", "Search your country…": "Pesquisa o teu país…", "Search your district…": "Pesquisa o teu distrito…" };

  var SEL = "h1,h2,h3,h4,p,li,summary,a,button,option,legend,span,small,b,dt,dd";
  var norm = function (h) { return h.replace(/<img\b[^>]*>/g, "<img>").replace(/\s+/g, " ").trim(); };
  var store = [];

  function collect() {
    document.querySelectorAll(SEL).forEach(function (el) {
      if (el.closest("svg,script,style")) return;
      var k = norm(el.innerHTML);
      if (!T[k]) return;
      // não traduzir um pai se um filho já tem tradução própria
      var imgs = Array.prototype.map.call(el.querySelectorAll("img"), function (i) { return i.outerHTML; });
      store.push({ el: el, en: el.innerHTML, pt: T[k].replace(/<img>/g, function () { return imgs.shift() || ""; }) });
    });
    document.querySelectorAll("[placeholder]").forEach(function (el) {
      var p = el.getAttribute("placeholder");
      if (PH[p]) store.push({ el: el, attr: "placeholder", en: p, pt: PH[p] });
    });
  }

  function apply(lang) {
    store.forEach(function (s) {
      var v = lang === "pt" ? s.pt : s.en;
      if (s.attr) s.el.setAttribute(s.attr, v); else if (s.el.innerHTML !== v) s.el.innerHTML = v;
    });
    document.documentElement.lang = lang;
    document.querySelectorAll(".lang-sw button").forEach(function (b) { b.setAttribute("aria-pressed", b.dataset.lang === lang); });
    try { localStorage.setItem("lang", lang); } catch (e) {}
    window.LANG = lang;
  }

  function init() {
    collect();
    var nav = document.querySelector(".nav");
    if (nav) {
      var sw = document.createElement("div");
      sw.className = "lang-sw";
      sw.innerHTML = '<button type="button" data-lang="pt">PT</button><button type="button" data-lang="en">EN</button>';
      nav.insertBefore(sw, nav.querySelector(".nav-cta"));
      sw.addEventListener("click", function (e) { var b = e.target.closest("button"); if (b) apply(b.dataset.lang); });
    }
    var saved = null;
    try { saved = localStorage.getItem("lang"); } catch (e) {}
    apply(saved || ((navigator.language || "").toLowerCase().indexOf("pt") === 0 ? "pt" : "en"));
  }

  var css = document.createElement("style");
  css.textContent = ".lang-sw{display:flex;border:1px solid rgba(241,240,234,.25);border-radius:999px;padding:3px;gap:2px}" +
    ".lang-sw button{font:inherit;font-size:12px;font-weight:800;letter-spacing:.08em;color:rgba(241,240,234,.6);background:transparent;border:0;border-radius:999px;padding:7px 11px;cursor:pointer}" +
    ".lang-sw button[aria-pressed=true]{background:var(--bone,#f1f0ea);color:#000}" +
    "@media(max-width:760px){.lang-sw button{padding:6px 9px;font-size:11px}}";
  document.head.appendChild(css);

  if (document.readyState === "loading") document.addEventListener("DOMContentLoaded", init); else init();
})();
