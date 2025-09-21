import React from 'react';
import { motion } from 'framer-motion';

interface Props {
  summary: string;
}

const InstantRecapCard: React.FC<Props> = ({ summary }) => (
  <motion.div
    initial={{ opacity: 0, y: 20 }}
    animate={{ opacity: 1, y: 0 }}
    transition={{ duration: 0.5 }}
    className="bg-gradient-to-br from-blue-500 to-indigo-600 text-white rounded-xl shadow-lg p-6 mb-4"
  >
    <h2 className="text-xl font-bold mb-2">Instant Recap</h2>
    <p className="text-base whitespace-pre-line">{summary}</p>
  </motion.div>
);

export default InstantRecapCard;
