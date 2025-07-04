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

function getAllLabels(item: Item): string[] {
  const children = item.children?.flatMap(getAllLabels) || [];
  return [item.label, ...children];
}

function getCheckedLeaves(tree: Item[], checkedSet: Set<string>): string[] {
  const leaves: string[] = [];

  function dfs(item: Item) {
    const isChecked = checkedSet.has(item.label);
    const hasChildren = item.children && item.children.length > 0;

    if (!hasChildren && isChecked) {
      leaves.push(item.label);
    } else if (hasChildren) {
      item.children!.forEach(dfs);
    }
  }
  tree.forEach(dfs);
  return leaves;
}


function CollapsibleItem({ item, checkedSet, setCheckedSet, }: { item: Item; checkedSet?: Set<string>; setCheckedSet: (set: Set<string>) => void;}) {
  const [isOpen, setIsOpen] = useState(true);
  const hasChildren = item.children && item.children.length > 0;

  const isChecked = checkedSet?.has(item.label);

  const handleCheckChange = () => {
    const allLabels = new Set(getAllLabels(item));
    const newCheckedSet = new Set(checkedSet);
    
    if (isChecked) {
      allLabels.forEach((label) => newCheckedSet.delete(label));
    } else {
      allLabels.forEach((label) => newCheckedSet.add(label));
    }
    setCheckedSet(newCheckedSet);
  }
  return (
    <div className="ml-2">
      <div className='flex items-center gap-2'>
        <input
          type="checkbox"
          checked={isChecked}
          onChange={handleCheckChange}
          />
      <div
        className="cursor-pointer hover:text-blue-500 transition"
        onClick={() => hasChildren && setIsOpen(!isOpen)}
        >
        {item.label} {hasChildren && <span>{isOpen ? '▾' : '▸'}</span>}
      </div>
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
              <CollapsibleItem key={idx} item={child} checkedSet={checkedSet} setCheckedSet={setCheckedSet}/>
            ))}
          </motion.div>
        )}
      </AnimatePresence>
    </div>
  );
}

export default function ProblemTypeMenu() {
  const [checkedSet, setCheckedSet] = useState<Set<string>>(new Set());
  const checkedLeaves = getCheckedLeaves(problemTree, checkedSet);

  return (
    <div className="flex flex-col gap-3 text-[15px] p-4">
      {problemTree.map((item, idx) => (
        <CollapsibleItem key={idx} item={item} checkedSet={checkedSet} setCheckedSet={setCheckedSet}/>
      ))}
      <div className='pt-4 text-[15px] text-gray-500'>
         ✅ Checked: {checkedLeaves.length > 0 ? checkedLeaves.join(', ') : 'None'}
      </div>
    </div>
  );
}
