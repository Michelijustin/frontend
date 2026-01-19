import React, { useState, useEffect, lazy, Suspense } from "react";
const ResultPanel = lazy(() => import("./components/ResultPanel"));
import { motion, AnimatePresence } from "framer-motion";
import "./App.css";

const BRAND = {
  primary: "#6C38FF", // roxo tecnológico
  accent: "#5CE1E6", // neon
  bg: "#0b0b10",
  surface: "rgba(255,255,255,0.04)",
  glass: "rgba(255,255,255,0.06)",
};


const THEMES = {
  ansiedade: { primary: "#A78BFA", secondary: "#1e1b4b", icon: "😰" },
  insegurança: { primary: "#C4B5FD", secondary: "#312e81", icon: "😟" },
  cansaço: { primary: "#A1A1AA", secondary: "#3f3f46", icon: "😴" },
  frustração: { primary: "#FB7185", secondary: "#7f1d1d", icon: "😤" },
  paz: { primary: "#86EFAC", secondary: "#14532d", icon: "😌" },
  alegria: { primary: "#FDE68A", secondary: "#92400e", icon: "🤩" },
};


const EMOTIONS = {
  ansiedade: [
  {
    fact: "Seu corpo está mais tenso ou acelerado agora.",
    interpretation: "Sua mente pode estar tentando te proteger antecipando cenários que ainda não aconteceram.",
    feeling: "Medo misturado com tensão.",
    action: "Respire devagar 10 vezes, puxando o ar pelo nariz e soltando lentamente pela boca."
  },
  {
    fact: "Pensamentos estão se repetindo sem parar.",
    interpretation: "Você pode estar tentando ter controle sobre algo incerto.",
    feeling: "Inquietação mental.",
    action: "Olhe ao redor e identifique 5 coisas que você consegue ver agora."
  },
  {
    fact: "Existe uma sensação de aperto no peito.",
    interpretation: "Seu corpo reagiu como se estivesse diante de uma ameaça.",
    feeling: "Alerta e desconforto.",
    action: "Coloque a mão no peito e respire contando 4 segundos para inspirar e 6 para soltar o ar."
  },
  {
    fact: "Está difícil manter o foco.",
    interpretation: "Sua atenção pode estar dividida entre muitas preocupações.",
    feeling: "Confusão e cansaço.",
    action: "Faça uma pausa de 2 minutos sem celular ou estímulos."
  },
  {
    fact: "Preocupações com o futuro estão presentes.",
    interpretation: "Você está lidando com incertezas que ainda não têm resposta.",
    feeling: "Ansiedade antecipatória.",
    action: "Escolha apenas um pequeno passo possível e foque nele agora."
  },
  {
    fact: "Erros passados voltaram à sua mente.",
    interpretation: "Um erro acabou ganhando mais peso do que realmente tem.",
    feeling: "Vergonha misturada com medo.",
    action: "Anote uma coisa que você faria diferente hoje, sem se julgar."
  },
  {
    fact: "Seu sono não tem sido reparador.",
    interpretation: "Sua mente pode não estar encontrando descanso.",
    feeling: "Cansaço nervoso.",
    action: "Respire no ritmo 4-4-4: inspire, segure e solte o ar por 4 segundos."
  },
  {
    fact: "Pensamentos sobre o passado surgiram.",
    interpretation: "Você pode estar ruminando situações que já terminaram.",
    feeling: "Pressão mental.",
    action: "Lembre-se de algo que você conseguiu resolver hoje, mesmo que pequeno."
  }
  ],
  insegurança: [
  {
    fact: "Você se comparou com outra pessoa.",
    interpretation: "Suas próprias qualidades podem ter ficado invisíveis nesse momento.",
    feeling: "Dúvida e insegurança.",
    action: "Lembre-se de uma conquista sua, mesmo que simples."
  },
  {
    fact: "Um feedback te abalou.",
    interpretation: "Talvez você tenha levado essa fala como algo pessoal demais.",
    feeling: "Vulnerabilidade.",
    action: "Anote apenas um ponto útil do feedback e deixe o resto ir."
  },
  {
    fact: "Hesitou em expor suas ideias.",
    interpretation: "Pode existir o medo de julgamento ou rejeição.",
    feeling: "Timidez e tensão.",
    action: "Compartilhe uma ideia pequena com alguém de confiança."
  },
  {
    fact: "Você se sentiu deslocada em um grupo.",
    interpretation: "Isso não significa que você não pertença.",
    feeling: "Solidão.",
    action: "Lembre a si mesma que se sentir deslocada não significa que você não pertença."
  },
  {
    fact: "Surgiram dúvidas sobre suas escolhas.",
    interpretation: "Você pode estar focando mais nos riscos do que nos motivos que te trouxeram até aqui.",
    feeling: "Incerteza.",
    action: "Relembre um motivo que fez você escolher esse caminho."
  },
  {
    fact: "Preocupação com a forma como é vista.",
    interpretation: "Talvez você esteja se sentindo observada mais do que realmente está.",
    feeling: "Desconforto.",
    action: "Faça algo simples que já te ajudou a se sentir mais confiante antes."
  },
  {
    fact: "Ansiedade social apareceu.",
    interpretation: "Você pode estar esperando rejeição antes mesmo dela existir.",
    feeling: "Apreensão.",
    action: "Planeje uma frase simples para iniciar uma conversa."
  },
  {
    fact: "Foi difícil aceitar um elogio.",
    interpretation: "Seus pontos fortes podem estar sendo minimizados por você mesma.",
    feeling: "Autocrítica.",
    action: "Aceite o elogio apenas dizendo 'obrigada'. Isso já é suficiente."
  }
  ],
  cansaço: [
  {
    fact: "Seus olhos e sua mente estão pesados.",
    interpretation: "Seu corpo está pedindo descanso.",
    feeling: "Exaustão.",
    action: "Alongue o corpo por 1 minuto, sem pressa."
  },
  {
    fact: "Você tem adiado tarefas simples.",
    interpretation: "O cansaço pode estar reduzindo sua energia de ação.",
    feeling: "Letargia.",
    action: "Permita-se começar pequeno, sem se cobrar rendimento."
  },
  {
    fact: "Irritação apareceu com mais facilidade.",
    interpretation: "A fadiga pode estar diminuindo sua paciência.",
    feeling: "Frustração por cansaço.",
    action: "Beba um copo de água e respire fundo."
  },
  {
    fact: "Seu sono está irregular.",
    interpretation: "Sua rotina pode estar desorganizada.",
    feeling: "Desregulação.",
    action: "Desligue telas 30 minutos antes de dormir hoje."
  },
  {
    fact: "Até tarefas simples parecem difíceis.",
    interpretation: "Seu cérebro pode precisar de uma pausa.",
    feeling: "Lentidão.",
    action: "Descanse por 15 minutos sem culpa."
  },
  {
    fact: "Sensação de peso no corpo.",
    interpretation: "Você pode estar acumulando tarefas sem descanso.",
    feeling: "Cansaço físico.",
    action: "Caminhe por 5 minutos, se possível ao ar livre."
  },
  {
    fact: "Perdeu o interesse em coisas que gostava.",
    interpretation: "O cansaço pode estar abafando o prazer.",
    feeling: "Desânimo.",
    action: "Esteja por alguns minutos perto de algo que você costumava gostar, sem se cobrar."
  },
  {
    fact: "Pensar com clareza está difícil.",
    interpretation: "Sua capacidade de decisão pode estar reduzida.",
    feeling: "Neblina mental.",
    action: "Coloque no papel o que estiver passando pela sua mente."
  }
  ],
  frustração: [
  {
    fact: "Algo não saiu como esperado.",
    interpretation: "Talvez você esteja se cobrando além do necessário.",
    feeling: "Irritação.",
    action: "Respire fundo 3 vezes antes de reagir."
  },
  {
    fact: "O mesmo erro aconteceu novamente.",
    interpretation: "Aprender leva tempo, mesmo quando parece repetitivo.",
    feeling: "Frustração acumulada.",
    action: "Escolha um ajuste pequeno para tentar diferente."
  },
  {
    fact: "Você se sente travada.",
    interpretation: "Talvez esteja exigindo uma solução imediata.",
    feeling: "Bloqueio mental.",
    action: "Levante, beba água ou caminhe por 2 minutos, sem tentar resolver nada."
  },
  {
    fact: "Houve conflito com alguém.",
    interpretation: "A reação do outro pode não ser totalmente sobre você.",
    feeling: "Raiva contida.",
    action: "Escreva o que sente sem enviar para ninguém."
  },
  {
    fact: "A expectativa estava muito alta.",
    interpretation: "A meta pode ter ficado rígida demais.",
    feeling: "Decepção.",
    action: "Reduza a meta para algo possível hoje."
  },
  {
    fact: "Muitas tarefas acumuladas.",
    interpretation: "Tudo pode parecer urgente ao mesmo tempo.",
    feeling: "Pressão.",
    action: "Escolha apenas uma tarefa para começar."
  },
  {
    fact: "Sentimento de injustiça.",
    interpretation: "Você pode ter internalizado a opinião de outra pessoa.",
    feeling: "Magoa.",
    action: "Reconheça internamente o que você sente."
  },
  {
    fact: "Um erro parece definir tudo.",
    interpretation: "Esse erro ocupou mais espaço do que merece.",
    feeling: "Desânimo.",
    action: "Anote um aprendizado desse momento."
  }
  ],
  paz: [
  {
    fact: "Você percebe um momento de calma.",
    interpretation: "Você está mais conectada com o presente.",
    feeling: "Tranquilidade.",
    action: "Respire agradecendo algo simples."
  },
  {
    fact: "Seu ritmo parece equilibrado.",
    interpretation: "Você encontrou um fluxo que funciona agora.",
    feeling: "Estabilidade.",
    action: "Reserve 5 minutos para apenas estar presente."
  },
  {
    fact: "O corpo está relaxado.",
    interpretation: "Não há urgência neste momento.",
    feeling: "Descanso.",
    action: "Alongue-se suavemente."
  },
  {
    fact: "As relações estão leves.",
    interpretation: "Conexões trazem apoio emocional.",
    feeling: "Gratidão.",
    action: "Envie uma mensagem simples de agradecimento."
  },
  {
    fact: "Clareza sobre prioridades.",
    interpretation: "Seus objetivos estão mais alinhados.",
    feeling: "Foco sereno.",
    action: "Defina uma meta pequena para a semana."
  },
  {
    fact: "Sensação de segurança interna.",
    interpretation: "Você reconhece sua própria força.",
    feeling: "Confiança tranquila.",
    action: "Celebre com uma pequena pausa."
  },
  {
    fact: "Pensamentos mais organizados.",
    interpretation: "Sua mente está menos sobrecarregada.",
    feeling: "Leveza.",
    action: "Anote algo positivo desse momento."
  },
  {
    fact: "Momento de aceitação.",
    interpretation: "Neste momento, não há urgência nem exigência.",
    feeling: "Serenidade.",
    action: "Perceba que não existe urgência agora. Você pode simplesmente estar."
  }
  ],
  alegria: [
  {
    fact: "Você se sente animada.",
    interpretation: "Algo despertou entusiasmo em você.",
    feeling: "Empolgação.",
    action: "Compartilhe essa alegria com alguém."
  },
  {
    fact: "Algo deu certo recentemente.",
    interpretation: "Seu esforço gerou resultado.",
    feeling: "Orgulho saudável.",
    action: "Anote o que contribuiu para isso."
  },
  {
    fact: "Gratidão está presente.",
    interpretation: "Você percebeu algo bom no agora.",
    feeling: "Calor emocional.",
    action: "Respire e reconheça isso internamente."
  },
  {
    fact: "Energia para criar.",
    interpretation: "Sua motivação está elevada.",
    feeling: "Entusiasmo.",
    action: "Comece uma tarefa curta agora."
  },
  {
    fact: "Sorriso surge com facilidade.",
    interpretation: "Pequenas coisas estão fazendo bem.",
    feeling: "Leveza.",
    action: "Permita-se aproveitar."
  },
  {
    fact: "Conexão positiva com alguém.",
    interpretation: "Essa troca gerou afeto.",
    feeling: "Alegria compartilhada.",
    action: "Diga algo gentil a essa pessoa."
  },
  {
    fact: "Algo novo te inspirou.",
    interpretation: "Sua curiosidade foi ativada.",
    feeling: "Curiosidade feliz.",
    action: "Explore isso por 5 minutos."
  },
  {
    fact: "Você avançou em algo importante.",
    interpretation: "Mesmo um pequeno passo é progresso.",
    feeling: "Satisfação.",
    action: "Reconheça essa conquista."
  }
  ],
};

export default function App() {
  const [selected, setSelected] = useState(null);
  const [response, setResponse] = useState(null);
  const [lastIndex, setLastIndex] = useState(null);

  useEffect(() => {
    if (response && selected) {
      const dataToSave = {
        selected,
        response,
      };
      localStorage.setItem("lastEmotionResult", JSON.stringify(dataToSave));
    }
  }, [response, selected]);

  useEffect(() => {
    const savedData = localStorage.getItem("lastEmotionResult");
    if (savedData) {
      const parsed = JSON.parse(savedData);
      setSelected(parsed.selected);
      setResponse(parsed.response);
    }
  }, []);

  function selectEmotion(key) {
    setSelected(key);
    setResponse(null);
  }

  function generate() {
    if (!selected) return;
    const list = EMOTIONS[selected];
    let newIndex;
    do {
      newIndex = Math.floor(Math.random() * list.length);
    } while (newIndex === lastIndex && list.length > 1);
    setLastIndex(newIndex);
    setResponse(list[newIndex]);
  }


  function copyResponse() {
    if (!response) return;
    const text = `${response.fact}\n${response.interpretation}\n${response.feeling}\n${response.action}`;
    navigator.clipboard?.writeText(text);
    // small UX feedback
    alert("Texto copiado ✅");
  }

   return (
    <div className="app-root" style={{ background: BRAND.bg }}>
      <div className="app-shell">
        <header className="topbar">
          <div className="brand">
            <div className="brand-avatar">❤</div>
            <div className="brand-text">
              <div className="brand-title">ClarezaEmocional</div>
              <div className="brand-sub">Transforme sentimento em ação</div>
            </div>
          </div>
          <div className="actions">
            <button className="btn-ghost" onClick={() => { setSelected(null); setResponse(null); }}>
              Reset
            </button>
          </div>
        </header>

        <main className="main">
          <section className="panel left">

            <div className="panel-head">
              <h3>Como você está?</h3>
              <p className="muted">Escolha uma emoção para receber clareza prática.</p>
            </div>

            <div className="grid">
              {Object.keys(THEMES).map((k) => {
                const t = THEMES[k];
                const isActive = selected === k;
                return (
                  <motion.button
                    key={k}
                    className={`emo-btn ${isActive ? "active" : ""}`}
                    onClick={() => selectEmotion(k)}
                    whileHover={{ scale: 1.03 }}
                    whileTap={{ scale: 0.98 }}
                    style={{
                      border: isActive ? `1px solid ${BRAND.accent}` : "1px solid rgba(255,255,255,0.04)",
                      boxShadow: isActive ? `0 8px 30px ${t.primary}33` : "0 6px 18px rgba(0,0,0,0.18)",
                    }}
                  >
                    <div className="emo-icon" style={{ background: `linear-gradient(135deg, ${t.primary}, ${BRAND.primary})` }}>
                      {t.icon}
                    </div>
                    <div className="emo-label">{k}</div>
                  </motion.button>
                );
              })}
            </div>

            <div className="panel-actions">
              <button className="btn-primary" onClick={generate} aria-disabled={!selected}>
                Gerar Raio-X
              </button>
            </div>

          </section>

          <Suspense fallback={<div className="panel right">Carregando resultado...</div>}>
            <ResultPanel
              response={response}
              selected={selected}
              THEMES={THEMES}
              generate={generate}
              copyResponse={copyResponse}
            />
          </Suspense>
                
        </main>

        <footer className="footer">
          <div>Todos os direitos reservados</div>
        </footer>

      </div>
    </div>
  )
}