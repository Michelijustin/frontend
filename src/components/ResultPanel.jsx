import { motion, AnimatePresence } from "framer-motion";

export default function ResultPanel({
  response,
  selected,
  THEMES,
  generate,
  copyResponse,
}) {
  return (
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
              <div
                className="result-header"
                style={{
                  background: `linear-gradient(90deg, ${THEMES[selected].primary}, #6C38FF)`,
                }}
              >
                <div className="result-title">
                  <div className="result-icon">{THEMES[selected].icon}</div>
                  <div>
                    <div className="h4" style={{ textTransform: "capitalize" }}>
                      {selected}
                    </div>
                    <div className="muted">Seu Raio-X Emocional</div>
                  </div>
                </div>

                <div className="result-controls">
                  <button className="btn-ghost" onClick={generate}>
                    Gerar outra
                  </button>
                </div>
              </div>

              <div className="result-body">
                <div className="row"><div className="label">Fato</div><div className="value">{response.fact}</div></div>
                <div className="row"><div className="label">Interpretação</div><div className="value">{response.interpretation}</div></div>
                <div className="row"><div className="label">Sentimento</div><div className="value">{response.feeling}</div></div>
                <div className="row"><div className="label">Ação</div><div className="value">{response.action}</div></div>

                <div className="result-footer">
                  <button className="btn-copy" onClick={copyResponse}>
                    Copiar
                  </button>
                </div>
              </div>
            </motion.article>
          ) : (
            <motion.div
              key="empty"
              className="empty-card"
              initial={{ opacity: 0, y: 8 }}
              animate={{ opacity: 1, y: 0 }}
            >
              <div className="empty-illustration">💭</div>
              <div className="empty-text">
                Selecione uma emoção à esquerda e clique em <strong>Gerar Raio-X</strong>.
              </div>
            </motion.div>
          )}
        </AnimatePresence>
      </div>
    </section>
  );
}
