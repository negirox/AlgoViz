
"use client";

import { cn } from "@/lib/utils";
import React from 'react';
import { Tooltip, TooltipContent, TooltipProvider, TooltipTrigger } from "@/components/ui/tooltip";

type TreeNodeData = {
    value: number;
    left?: TreeNodeData | null;
    right?: TreeNodeData | null;
};

type TreeNodeProps = {
    node: TreeNodeData;
    isHighlighted: boolean;
    isTraversed: boolean;
    depth: number;
};

const NODE_DIAMETER = 40;
const HORIZONTAL_SPACING = 20;
const VERTICAL_SPACING = 70;

const TreeNodeComponent: React.FC<TreeNodeProps> = ({ node, isHighlighted, isTraversed }) => {
    return (
        <Tooltip>
            <TooltipTrigger asChild>
                <div 
                    className={cn(
                        "flex items-center justify-center rounded-full border-2 transition-all duration-300",
                        isHighlighted ? "bg-primary text-primary-foreground border-primary" : 
                        isTraversed ? "bg-primary/20 border-primary/50" :
                        "bg-card border-border",
                    )}
                    style={{
                        width: NODE_DIAMETER,
                        height: NODE_DIAMETER,
                    }}
                >
                    <span className="text-sm font-bold">{node.value}</span>
                </div>
            </TooltipTrigger>
            <TooltipContent>
                <p>Node: {node.value}</p>
            </TooltipContent>
        </Tooltip>
    );
};


type TreeVisualizerProps = {
    treeData?: TreeNodeData;
    highlightedNode?: number | null;
    traversalPath?: number[];
};

const calculatePositions = (node: TreeNodeData | null | undefined, depth = 0, x = 0, positions: any = {}) => {
    if (!node) return { positions, width: 0 };

    const leftSubtree = calculatePositions(node.left, depth + 1, x, positions);
    const nodeX = leftSubtree.width + x + (leftSubtree.width > 0 ? HORIZONTAL_SPACING : 0);
    const rightSubtree = calculatePositions(node.right, depth + 1, nodeX + NODE_DIAMETER, positions);

    const subtreeWidth = rightSubtree.width > 0 ? HORIZONTAL_SPACING + rightSubtree.width : 0;
    const totalWidth = leftSubtree.width + NODE_DIAMETER + subtreeWidth;

    positions[node.value] = { 
      x: x + (totalWidth - NODE_DIAMETER) / 2, 
      y: depth * VERTICAL_SPACING + NODE_DIAMETER / 2
    };

    return { positions, width: totalWidth };
};

const renderTree = (node: TreeNodeData | null | undefined, positions: any, highlightedNode: number | null | undefined, traversalPath: number[] = [], depth = 0): React.ReactNode[] => {
    if (!node) return [];

    const children: React.ReactNode[] = [];
    const nodePos = positions[node.value];

    if (node.left) {
        const leftPos = positions[node.left.value];
        children.push(<line key={`${node.value}-L-line`} x1={nodePos.x} y1={nodePos.y} x2={leftPos.x} y2={leftPos.y} className="stroke-border" strokeWidth="2" />);
        children.push(...renderTree(node.left, positions, highlightedNode, traversalPath, depth + 1));
    }
    if (node.right) {
        const rightPos = positions[node.right.value];
        children.push(<line key={`${node.value}-R-line`} x1={nodePos.x} y1={nodePos.y} x2={rightPos.x} y2={rightPos.y} className="stroke-border" strokeWidth="2" />);
        children.push(...renderTree(node.right, positions, highlightedNode, traversalPath, depth + 1));
    }
    
    children.push(
        <foreignObject key={node.value} x={nodePos.x - NODE_DIAMETER/2} y={nodePos.y - NODE_DIAMETER/2} width={NODE_DIAMETER} height={NODE_DIAMETER}>
            <TreeNodeComponent
                node={node}
                isHighlighted={highlightedNode === node.value}
                isTraversed={traversalPath.includes(node.value)}
                depth={depth}
            />
        </foreignObject>
    );

    return children;
};


export function TreeVisualizer({ treeData, highlightedNode, traversalPath = [] }: TreeVisualizerProps) {
    if (!treeData) {
        return (
            <div className="flex items-center justify-center h-64 text-muted-foreground">
                Enter tree data to start visualization.
            </div>
        );
    }
    
    const { positions, width } = calculatePositions(treeData);
    const renderedNodes = renderTree(treeData, positions, highlightedNode, traversalPath);
    
    const maxDepth = Math.max(...Object.values(positions).map((p: any) => p.y));
    const totalHeight = maxDepth + NODE_DIAMETER * 2;

    return (
        <TooltipProvider>
            <div className="w-full flex justify-center items-center overflow-auto p-4">
                 <svg width={width + 40} height={totalHeight} style={{ minWidth: width + 40 }}>
                    <g transform={`translate(20, 20)`}>
                        {renderedNodes}
                    </g>
                 </svg>
            </div>
        </TooltipProvider>
    );
}
