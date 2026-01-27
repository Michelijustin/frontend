import { motion, AnimatePresence } from "framer-motion";

export default function ResultModal({ isOpen, onClose, response, selected, THEMES }) {
  if (!isOpen || !response) return null;

  return (
    <AnimatePresence>
      <motion.div
        className="modal-overlay"
        initial={{ opacity: 0 }}
        animate={{ opacity: 1 }}
        exit={{ opacity: 0 }}
        onClick={onClose}
      >
        <motion.div
          className="modal-content"
          initial={{ scale: 0.9, y: 20 }}
          animate={{ scale: 1, y: 0 }}
          exit={{ scale: 0.9, y: 20 }}
          onClick={(e) => e.stopPropagation()}
        >
          


          <div
            className="result-header"
            style={{
              background: `linear-gradient(90deg, ${THEMES[selected].primary}, #6C38FF)`,
            }}
          >
            <div className="result-icon">{THEMES[selected].icon}</div>
            <h3 style={{ textTransform: "capitalize" }}>{selected}</h3>
          </div>

          <div className="result-body">
            <p><strong>Fato:</strong> {response.fact}</p>
            <p><strong>Interpretação:</strong> {response.interpretation}</p>
            <p><strong>Sentimento:</strong> {response.feeling}</p>
            <p><strong>Ação:</strong> {response.action}</p>
          </div>
        </motion.div>
      </motion.div>
    </AnimatePresence>
  );
}
