'use client'

import { useState } from 'react';
import { motion, AnimatePresence } from 'framer-motion';

type Item = {
  label: string;
  children?: Item[];
};

const problemTree: Item[] = [
  {
    label: 'Algebra',
    children: [
      { label: 'Expansion' },
      {
        label: 'Linear',
        children: [
          { label: 'Linear Equation' },
          { label: 'Linear System' },
        ]
      },
      {
        label: 'Quadratic',
        children: [
          { label: 'Quadratic Factoring' },
          { label: 'Find Vertex Coordinates' },
        ]
      },
    ]
  }
];

function CollapsibleItem({ item }: { item: Item }) {
  const [isOpen, setIsOpen] = useState(false);
  const hasChildren = item.children && item.children.length > 0;

  return (
    <div className="ml-2">
      <div
        className="cursor-pointer hover:text-blue-500 transition"
        onClick={() => hasChildren && setIsOpen(!isOpen)}
      >
        {item.label} {hasChildren && <span>{isOpen ? '▾' : '▸'}</span>}
      </div>

      <AnimatePresence initial={false}>
        {isOpen && hasChildren && (
          <motion.div
            className="flex flex-col gap-1 ml-2 overflow-hidden"
            initial={{ height: 0, opacity: 0 }}
            animate={{ height: 'auto', opacity: 1 }}
            exit={{ height: 0, opacity: 0 }}
            transition={{ duration: 0.3 }}
          >
            {item.children!.map((child, idx) => (
              <CollapsibleItem key={idx} item={child} />
            ))}
          </motion.div>
        )}
      </AnimatePresence>
    </div>
  );
}

export default function ProblemTypeMenu() {
  return (
    <div className="flex flex-col gap-3 text-[15px] p-4">
      {problemTree.map((item, idx) => (
        <CollapsibleItem key={idx} item={item} />
      ))}
    </div>
  );
}
