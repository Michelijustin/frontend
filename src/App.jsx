import React, { useState } from "react";
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
    { fact: "Seu corpo parece tenso ou acelerado.", interpretation: "Você assumiu resultados negativos antecipadamente.", feeling: "Medo + tensão.", action: "Respire 10 vezes pausadamente." },
    { fact: "Pensamentos repetitivos estão presentes.", interpretation: "Sua mente está tentando prever o pior.", feeling: "Inquietação.", action: "Conte 5 objetos ao redor por 20s." },
    { fact: "Sensação de aperto no peito.", interpretation: "Você interpretou desconforto como ameaça.", feeling: "Alerta + desconforto.", action: "Beba devagar um copo de água." },
    { fact: "Dificuldade de concentração.", interpretation: "Você está dividindo atenção demais.", feeling: "Confusão.", action: "Faça pausa de 2 minutos sem telefone." },
    { fact: "Preocupação com o futuro.", interpretation: "Você está supervalorizando incertezas.", feeling: "Ansiedade antecipatória.", action: "Anote 1 passo pequeno e faça agora." },
    { fact: "Pensou em possíveis erros.", interpretation: "Você generalizou um erro para tudo.", feeling: "Vergonha misturada ao medo.", action: "Escreva uma ação corretiva simples." },
    { fact: "Sono pouco ou agitado.", interpretation: "A mente não encontra descanso.", feeling: "Cansaço nervoso.", action: "Respire 4-4-4 (inspire, segure, expire por 4s)." },
    { fact: "Foco em problemas passados.", interpretation: "Você está ruminando experiências.", feeling: "Pressão mental.", action: "Escolha uma coisa que você resolveu bem hoje." },
  ],
  insegurança: [
    { fact: "Você se comparou com alguém.", interpretation: "Suas falhas parecem maiores do que são.", feeling: "Insegurança + dúvida.", action: "Lembre-se de uma conquista recente." },
    { fact: "Recebeu feedback e ficou abalado.", interpretation: "Você personalizou a crítica.", feeling: "Vulnerabilidade.", action: "Anote 1 ponto útil do feedback." },
    { fact: "Evita expor ideias por medo.", interpretation: "Você supõe julgamento severo.", feeling: "Timidez + tensão.", action: "Compartilhe uma ideia pequena com um amigo." },
    { fact: 'Se sente deslocada em um grupo.', interpretation: 'Você acredita que não pertence.', feeling: 'Solidão.', action: 'Diga internamente: "Posso aprender aqui".' },
    { fact: "Dúvida sobre suas escolhas.", interpretation: "Você imagina todas as falhas possíveis.", feeling: "Incerteza.", action: "Reveja 1 motivo pelo qual escolheu isso." },
    { fact: "Preocupação com aparência/percepção.", interpretation: "Você acredita que é sempre avaliada.", feeling: "Exposição desconfortável.", action: "Escolha uma peça que te traga confiança." },
    { fact: "Ansiedade social leve.", interpretation: "Você espera rejeição.", feeling: "Apreensão.", action: "Planeje uma fala curta para quebrar o gelo." },
    { fact: 'Dificuldade em aceitar elogios.', interpretation: 'Você minimiza seus pontos fortes.', feeling: 'Autocrítica.', action: 'Aceite um elogio dizendo apenas \"obrigada\".' },
  ],
  cansaço: [
    { fact: "Olhos pesados e mente lenta.", interpretation: "Seu corpo pede descanso.", feeling: "Exaustão.", action: "Faça alongamento de 1 minuto." },
    { fact: "Procrastinação frequente.", interpretation: "Cansaço reduz energia de ação.", feeling: "Letargia.", action: "Defina uma tarefa de 5 minutos." },
    { fact: "Irritabilidade aumentada.", interpretation: "Fadiga reduz paciência.", feeling: "Frustração por cansaço.", action: "Beba água e descanse 10 minutos." },
    { fact: "Sono irregular recente.", interpretation: "Rotina de sono foi afetada.", feeling: "Corpo desregulado.", action: "Desconecte telas 30 minutos antes de dormir." },
    { fact: "Dificuldade com tarefas simples.", interpretation: "O cérebro precisa de recarga.", feeling: "Lentidão.", action: "Faça uma breve soneca (15-20min)." },
    { fact: "Sensação de peso no corpo.", interpretation: "Você está acumulando tarefas sem pausa.", feeling: "Cansaço físico.", action: "Caminhe 5 minutos ao ar livre." },
    { fact: "Perda de interesse temporária.", interpretation: "Atividades ficam menos atrativas.", feeling: "Desânimo.", action: "Faça algo que foi prazeroso por 3 minutos." },
    { fact: "Falta de clareza mental.", interpretation: "Capacidade de decisão reduzida.", feeling: "Neblina mental.", action: "Liste 3 prioridades pequenas." },
  ],
  frustração: [
    { fact: "Algo não saiu como planejado.", interpretation: "Você espera perfeição constante.", feeling: "Irritação + pressão.", action: "Respire profundamente 3x e reavalie." },
    { fact: "Repetição de erros.", interpretation: "Você se culpa por não aprender rápido.", feeling: "Frustração acumulada.", action: "Escolha um ajuste pequeno e aplique." },
    { fact: "Bloqueio criativo.", interpretation: "Você força soluções impossíveis agora.", feeling: "Travamento mental.", action: "Troque de atividade por 10 minutos." },
    { fact: "Conflito com outra pessoa.", interpretation: "Você personalizou a resposta do outro.", feeling: "Raiva contida.", action: "Escreva 1 frase para acalmar e não enviar." },
    { fact: "Expectativa alta sobre resultado.", interpretation: "Você criou uma meta rígida demais.", feeling: "Decepção.", action: "Reduza a meta em 1 passo realizável." },
    { fact: "Tarefas empilhadas.", interpretation: "Você sente que tudo é urgente.", feeling: "Pressão.", action: "Classifique 3 tarefas por prioridade." },
    { fact: "Sentiu-se injustiçada.", interpretation: "Você internalizou opinião alheia.", feeling: "Magoa.", action: "Escreva o que gostaria de dizer calmamente." },
    { fact: "Fracasso percebido.", interpretation: "Você amplificou um erro.", feeling: "Desânimo e raiva.", action: "Liste 1 aprendizado desse episódio." },
  ],
  paz: [
    { fact: "Momento de calma atual.", interpretation: "Você está presente no agora.", feeling: "Tranquilidade.", action: "Respire agradecendo uma conquista." },
    { fact: "Sente-se alinhada.", interpretation: "Seu ritmo pessoal funciona bem.", feeling: "Equilíbrio.", action: "Reserve 5 minutos para contemplar." },
    { fact: "Paz interior temporária.", interpretation: "Você encontrou um espaço segura.", feeling: "Serenidade.", action: "Escreva 1 pensamento positivo." },
    { fact: "Relaxamento físico.", interpretation: "O corpo não exige ação urgente.", feeling: "Descanso.", action: "Faça alongamento leve e sorria." },
    { fact: "Boas relações no momento.", interpretation: "Conexões trazem sentido.", feeling: "Gratidão.", action: "Envie uma mensagem simples de agradecimento." },
    { fact: "Rotina equilibrada.", interpretation: "Há organização na sua vida agora.", feeling: "Satisfação.", action: "Planeje um pequeno prazer para o fim do dia." },
    { fact: "Clareza sobre prioridades.", interpretation: "Objetivos estão alinhados.", feeling: "Foco sereno.", action: "Liste 1 meta alcançável desta semana." },
    { fact: "Momento de confiança.", interpretation: "Você reconhece sua força.", feeling: "Calma confiante.", action: "Celebre com uma pequena pausa de alegria." },
  ],
  alegria: [
    { fact: "Você está animada agora.", interpretation: "Situação trouxe prazer imediato.", feeling: "Entusiasmo.", action: "Compartilhe a alegria com alguém." },
    { fact: "Algo deu certo recentemente.", interpretation: "Você obteve um resultado positivo.", feeling: "Orgulho saudável.", action: "Anote 1 detalhe que ajudou." },
    { fact: "Gratidão presente.", interpretation: "Você percebeu algo bom.", feeling: "Calor emocional.", action: "Respire e agradeça internamente." },
    { fact: "Motivação elevada.", interpretation: "Você tem energia para criação.", feeling: "Empolgação.", action: "Comece uma tarefa curta agora." },
    { fact: "Sorriso fácil.", interpretation: "Pequenas coisas te fazem bem.", feeling: "Leveza.", action: "Permita-se 5 minutos de celebração." },
    { fact: "Conexão humana positiva.", interpretation: "Interação gerou afeto.", feeling: "Alegria compartilhada.", action: "Diga algo simples e gentil a alguém." },
    { fact: "Descoberta inspiradora.", interpretation: "Algo novo capturou sua atenção.", feeling: "Curiosidade feliz.", action: "Pesquise por 5 minutos sobre isso." },
    { fact: "Pequeno sucesso.", interpretation: "Você avançou em um objetivo.", feeling: "Satisfação.", action: "Marque essa conquista no seu diário." },
  ],
};

export default function App() {
  const [selected, setSelected] = useState(null);
  const [response, setResponse] = useState(null);

  function selectEmotion(key) {
    setSelected(key);
    setResponse(null);
  }

  function generate() {
    if (!selected) return;
    const list = EMOTIONS[selected];
    const pick = list[Math.floor(Math.random() * list.length)];
    setResponse(pick);
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

          <section className="panel right">
            <div className="panel-head">
              <h3>Resultado</h3>
              <p className="muted">Receba fatos, interpretação, sentimento e uma ação prática.</p>
            </div>

            <div className="result-area">
              <AnimatePresence mode="wait">
                {response ? (
                  <motion.article
                    key={selected}
                    className="result-card"
                    initial={{ opacity: 0, y: 18 }}
                    animate={{ opacity: 1, y: 0 }}
                    exit={{ opacity: 0, y: 12 }}
                    transition={{ duration: 0.42 }}
                  >
                    <div className="result-header" style={{ background: `linear-gradient(90deg, ${THEMES[selected].primary}, ${BRAND.primary})` }}>
                      <div className="result-title">
                        <div className="result-icon">{THEMES[selected].icon}</div>
                        <div>
                          <div className="h4" style={{ textTransform: "capitalize" }}>{selected}</div>
                          <div className="muted">Seu Raio-X Emocional</div>
                        </div>
                      </div>

                       <div className="result-controls">
                        <button className="btn-ghost" onClick={() => generate()}>Gerar outra</button>
                      </div>
                    </div>

                    <div className="result-body">
                      <div className="row"><div className="label">Fato</div><div className="value">{response.fact}</div></div>
                      <div className="row"><div className="label">Interpretação</div><div className="value">{response.interpretation}</div></div>
                      <div className="row"><div className="label">Sentimento</div><div className="value">{response.feeling}</div></div>
                      <div className="row"><div className="label">Ação</div><div className="value">{response.action}</div></div>

                      <div className="result-footer">
                        <button className="btn-copy" onClick={copyResponse}>Copiar</button>
                      </div>
                    </div>
                  </motion.article>

                  ) : (
                  <motion.div
                    key="empty"
                    className="empty-card"
                    initial={{ opacity: 0, y: 8 }}
                    animate={{ opacity: 1, y: 0 }}
                    transition={{ duration: 0.35 }}
                  >
                    <div className="empty-illustration">💭</div>
                    <div className="empty-text">Selecione uma emoção à esquerda e clique em <strong>Gerar Raio-X</strong>.</div>
                  </motion.div>
                   )}
               </AnimatePresence>
            </div>
          </section>
                  
        </main>
      </div>
    </div>
  )

}