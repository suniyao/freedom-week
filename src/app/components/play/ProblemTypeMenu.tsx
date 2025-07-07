'use client'

import {useEffect, useMemo, useState} from 'react';
import {motion, AnimatePresence} from 'framer-motion';
import {usePlaySession} from "@/app/components/play/PlaySessionContext";

type Item = {
    label: string;
    children?: Item[];
    value?: string;
};

const problemTree: Item[] = [
    {
        label: 'All Types',
        children: [
            {
                label: 'Algebra',
                children: [
                    {label: 'Expansion', value: "binomial-expansion"},
                    {
                        label: 'Linear',
                        children: [
                            {label: 'Linear Equation', value: "linear-equation"},
                            {label: 'Linear System', value: "linear-system"},
                        ],
                    },
                    {
                        label: 'Quadratic',
                        children: [
                            {label: 'Quadratic Factoring', value: "quadratic-factoring"},
                            {label: 'Find Vertex Coordinates', value: "quadratic-vertex"},
                        ],
                    },
                ],
            },
            {
                label: 'Geometry',
                children: [
                    {label: 'Area'},
                    {label: 'Perimeter'},
                    {
                        label: 'Circle',
                        children: [
                            {label: 'Circumference'},
                            {label: 'Area'},
                            {label: 'Chord Length'},
                        ],
                    },
                ],
            },
            {
                label: 'Combinatorics',
                children: [
                    {label: 'Permutations'},
                    {label: 'Combinations'},
                    {label: 'Binomial Coefficients'},
                ],
            },
            {
                label: 'Number Theory',
                children: [
                    {label: 'Prime Factorization'},
                    {label: 'GCD and LCM'},
                    {label: 'Divisibility Rules'},
                ],
            },
        ],
    },
];


function getAllLabels(item: Item): string[] {
    const children = item.children?.flatMap(getAllLabels) || [];
    return [item.label, ...children];
}

const getCheckedLeaves = (tree: Item[], checkedSet: Set<string>)=> {
    const leaves: string[] = [];
    const types: string[] = []

    function dfs(item: Item) {
        const isChecked = checkedSet.has(item.label);
        const hasChildren = item.children && item.children.length > 0;

        if (!hasChildren && isChecked && item.value) {
            leaves.push(item.label);
            types.push(item.value)
        } else if (hasChildren) {
            item.children!.forEach(dfs);
        }
    }

    tree.forEach(dfs);
    return {checkedLeaves: leaves, checkedTypes: types};
}

function CollapsibleItem({item, checkedSet, setCheckedSet, depth = 0}: {
    item: Item;
    checkedSet?: Set<string>;
    setCheckedSet: (set: Set<string>) => void;
    depth?: number;
}) {
    const [isOpen, setIsOpen] = useState(depth < 2);
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
                        initial={{height: 0, opacity: 0}}
                        animate={{height: 'auto', opacity: 1}}
                        exit={{height: 0, opacity: 0}}
                        transition={{duration: 0.3}}
                    >
                        {item.children!.map((child, idx) => (
                            <CollapsibleItem key={idx} item={child} checkedSet={checkedSet}
                                             setCheckedSet={setCheckedSet} depth={depth + 1}/>
                        ))}
                    </motion.div>
                )}
            </AnimatePresence>
        </div>
    );
}

export default function ProblemTypeMenu() {
    const [checkedSet, setCheckedSet] = useState<Set<string>>(new Set());
    const {checkedLeaves, checkedTypes} = useMemo(
        () => getCheckedLeaves(problemTree, checkedSet),
        [checkedSet]
    );
    const playSession = usePlaySession();

    useEffect(() => {
        playSession.setQuestionTypes(checkedTypes)
    }, [checkedTypes])

    return (
        <div className="flex flex-col gap-3 text-[15px] p-4">
            <div className='items-center'>
                {problemTree.map((item, idx) => (
                    <CollapsibleItem key={idx} item={item} checkedSet={checkedSet} setCheckedSet={setCheckedSet}/>
                ))}
            </div>
            <div className='pt-4 text-[15px] text-gray-500'>
                ✅ Checked: {checkedLeaves.length > 0 ? checkedLeaves.join(', ') : 'None'}
            </div>
        </div>
    );
}
