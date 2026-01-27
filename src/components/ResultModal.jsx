import { motion } from "framer-motion";
import { FiX } from "react-icons/fi";

export default function ResultModal({ isOpen, onClose, response, selected, THEMES }) {
  if (!isOpen || !response) return null;

  return (
    <div className="modal-overlay" onClick={onClose}>
      <motion.div
        className="modal-content"
        initial={{ scale: 0.9, y: 20, opacity: 0 }}
        animate={{ scale: 1, y: 0, opacity: 1 }}
        transition={{ duration: 0.25 }}
        onClick={(e) => e.stopPropagation()}
      >
        {/* BOTÃO FECHAR */}
        <button className="modal-close" onClick={onClose}>
          <FiX size={20} />
        </button>

        <div
            className="result-header"
            style={{
                background: `linear-gradient(90deg, ${THEMES[selected].primary}, #6C38FF)`,
            }}
            >
            <div className="header-left">
                <div className="result-icon">{THEMES[selected].icon}</div>
                <h3 style={{ textTransform: "capitalize" }}>{selected}</h3>
            </div>

            <button className="modal-close" onClick={onClose}>
                <FiX size={18} />
            </button>
       </div>


        <div className="result-body">
          <p><strong>Fato:</strong> {response.fact}</p>
          <p><strong>Interpretação:</strong> {response.interpretation}</p>
          <p><strong>Sentimento:</strong> {response.feeling}</p>
          <p><strong>Ação:</strong> {response.action}</p>
        </div>
      </motion.div>
    </div>
  );
}
