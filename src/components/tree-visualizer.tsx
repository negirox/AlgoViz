
"use client";

import { cn } from "@/lib/utils";
import React from 'react';
import { Tooltip, TooltipContent, TooltipProvider, TooltipTrigger } from "@/components/ui/tooltip";

type TreeNodeData = {
    value: number;
    height?: number;
    left?: TreeNodeData | null;
    right?: TreeNodeData | null;
};

type TreeNodeProps = {
    node: TreeNodeData;
    isHighlighted: boolean;
    isSecondaryHighlight: boolean;
    isTraversed: boolean;
};

const NODE_DIAMETER = 45;
const HORIZONTAL_SPACING = 25;
const VERTICAL_SPACING = 90;

const TreeNodeComponent: React.FC<TreeNodeProps> = ({ node, isHighlighted, isSecondaryHighlight, isTraversed }) => {
    const getHeight = (n: TreeNodeData | null | undefined): number => n ? n.height || 1 : 0;
    const balanceFactor = getHeight(node.left) - getHeight(node.right);

    return (
        <Tooltip>
            <TooltipTrigger asChild>
                <div className="relative">
                    <div 
                        className={cn(
                            "flex items-center justify-center rounded-full border-2 transition-all duration-300 font-bold",
                            isHighlighted ? "bg-primary text-primary-foreground border-primary" : 
                            isSecondaryHighlight ? "bg-yellow-500 text-black border-yellow-400" :
                            isTraversed ? "bg-primary/20 border-primary/50" :
                            "bg-card border-border",
                        )}
                        style={{
                            width: NODE_DIAMETER,
                            height: NODE_DIAMETER,
                        }}
                    >
                        <span>{node.value}</span>
                    </div>
                     {node.height !== undefined && (
                        <div className="absolute -bottom-5 left-1/2 -translate-x-1/2 text-xs font-mono flex gap-2">
                           <span className="text-blue-400" title="Height">H:{node.height}</span>
                           <span className={cn(
                               "font-bold",
                               balanceFactor > 1 || balanceFactor < -1 ? 'text-red-500' : 'text-green-400'
                           )} title="Balance Factor">B:{balanceFactor}</span>
                        </div>
                    )}
                </div>
            </TooltipTrigger>
            <TooltipContent>
                <p>Node: {node.value}</p>
                {node.height !== undefined && <p>Height: {node.height}</p>}
                {node.height !== undefined && <p>Balance Factor: {balanceFactor}</p>}
            </TooltipContent>
        </Tooltip>
    );
};


type TreeVisualizerProps = {
    treeData?: TreeNodeData;
    highlightedNode?: number | null;
    secondaryHighlight?: number[];
    traversalPath?: number[];
};

const calculatePositions = (node: TreeNodeData | null | undefined, depth = 0, x = 0, positions: any = {}) => {
    if (!node) return { positions, width: 0, x };

    const leftSubtree = calculatePositions(node.left, depth + 1, x, positions);
    const nodeX = leftSubtree.width > 0 ? leftSubtree.x + leftSubtree.width + HORIZONTAL_SPACING : x;
    
    positions[node.value] = { x: nodeX, y: depth * VERTICAL_SPACING };

    const rightSubtree = calculatePositions(node.right, depth + 1, nodeX + NODE_DIAMETER + HORIZONTAL_SPACING, positions);
    
    const childrenWidth = rightSubtree.width > 0 ? rightSubtree.x + rightSubtree.width - nodeX - NODE_DIAMETER : 0;
    
    if (node.left && node.right) {
        positions[node.value].x = (positions[node.left.value].x + positions[node.right.value].x) / 2;
    } else if (node.left) {
        positions[node.value].x = positions[node.left.value].x + HORIZONTAL_SPACING;
    } else if (node.right) {
        positions[node.value].x = positions[node.right.value].x - HORIZONTAL_SPACING;
    }

    // Shift the right subtree if it overlaps
    if (node.left && node.right) {
        const rightShift = positions[node.left.value].x + NODE_DIAMETER + HORIZONTAL_SPACING - positions[node.right.value].x;
        if(rightShift > 0) {
             const shiftSubtree = (n: TreeNodeData | null | undefined, amount: number) => {
                if(!n) return;
                positions[n.value].x += amount;
                shiftSubtree(n.left, amount);
                shiftSubtree(n.right, amount);
            }
            shiftSubtree(node.right, rightShift);
            return calculatePositions(node, depth, x, positions); // Recalculate after shift
        }
    }


    const totalWidth = Math.max(nodeX + NODE_DIAMETER, rightSubtree.x + rightSubtree.width);

    return { positions, width: totalWidth, x: x };
};


const renderTree = (node: TreeNodeData | null | undefined, positions: any, highlightedNode: number | null | undefined, secondaryHighlight: number[] = [], traversalPath: number[] = []): React.ReactNode[] => {
    if (!node) return [];

    const children: React.ReactNode[] = [];
    const nodePos = positions[node.value];

    if (node.left) {
        const leftPos = positions[node.left.value];
        children.push(<line key={`${node.value}-L-line`} x1={nodePos.x + NODE_DIAMETER/2} y1={nodePos.y + NODE_DIAMETER/2} x2={leftPos.x + NODE_DIAMETER/2} y2={leftPos.y + NODE_DIAMETER/2} className="stroke-border" strokeWidth="2" />);
        children.push(...renderTree(node.left, positions, highlightedNode, secondaryHighlight, traversalPath));
    }
    if (node.right) {
        const rightPos = positions[node.right.value];
        children.push(<line key={`${node.value}-R-line`} x1={nodePos.x + NODE_DIAMETER/2} y1={nodePos.y + NODE_DIAMETER/2} x2={rightPos.x + NODE_DIAMETER/2} y2={rightPos.y + NODE_DIAMETER/2} className="stroke-border" strokeWidth="2" />);
        children.push(...renderTree(node.right, positions, highlightedNode, secondaryHighlight, traversalPath));
    }
    
    children.push(
        <foreignObject key={node.value} x={nodePos.x} y={nodePos.y} width={NODE_DIAMETER*2} height={NODE_DIAMETER*2}>
           <div style={{width: NODE_DIAMETER, height: NODE_DIAMETER }}>
                <TreeNodeComponent
                    node={node}
                    isHighlighted={highlightedNode === node.value}
                    isSecondaryHighlight={secondaryHighlight.includes(node.value)}
                    isTraversed={traversalPath.includes(node.value)}
                />
            </div>
        </foreignObject>
    );

    return children;
};


export function TreeVisualizer({ treeData, highlightedNode, secondaryHighlight = [], traversalPath = [] }: TreeVisualizerProps) {
    if (!treeData) {
        return (
            <div className="flex items-center justify-center h-64 text-muted-foreground">
                Enter tree data to start visualization.
            </div>
        );
    }
    
    let { positions } = calculatePositions(treeData);

    const xValues = Object.values(positions).map((p: any) => p.x);
    const minX = Math.min(...xValues);

     Object.values(positions).forEach((p: any) => {
        p.x -= minX;
    });

    const maxX = Math.max(...Object.values(positions).map((p: any) => p.x));
    const totalWidth = maxX + NODE_DIAMETER;
    
    const renderedNodes = renderTree(treeData, positions, highlightedNode, secondaryHighlight, traversalPath);
    
    const maxDepth = Math.max(...Object.values(positions).map((p: any) => p.y));
    const totalHeight = maxDepth + NODE_DIAMETER * 2;

    return (
        <TooltipProvider>
            <div className="w-full flex justify-center items-center overflow-auto p-4">
                 <svg width={totalWidth + 40} height={totalHeight + 40} style={{ minWidth: totalWidth + 40 }}>
                    <g transform={`translate(20, 20)`}>
                        {renderedNodes}
                    </g>
                 </svg>
            </div>
        </TooltipProvider>
    );
}

    