
"use client";

import { cn } from "@/lib/utils";
import React from 'react';

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

const TreeNodeComponent: React.FC<TreeNodeProps> = ({ node, isHighlighted, isTraversed, depth }) => {
    return (
        <div 
            className={cn(
                "absolute flex items-center justify-center rounded-full border-2 transition-all duration-300",
                isHighlighted ? "bg-primary text-primary-foreground border-primary" : 
                isTraversed ? "bg-primary/20 border-primary/50" :
                "bg-card border-border",
            )}
            style={{
                width: NODE_DIAMETER,
                height: NODE_DIAMETER,
                transform: 'translate(-50%, -50%)'
            }}
        >
            <span className="text-sm font-bold">{node.value}</span>
        </div>
    );
};


type TreeVisualizerProps = {
    treeData?: TreeNodeData;
    highlightedNode?: number | null;
    traversalPath?: number[];
};

const calculatePositions = (node: TreeNodeData | null | undefined, depth = 0, xOffset = 0, positions: any = {}, widths: any = {}) => {
    if (!node) return { positions, totalWidth: 0 };

    const leftWidth = node.left ? calculatePositions(node.left, depth + 1, xOffset, positions, widths).totalWidth : 0;
    const rightOffset = xOffset + leftWidth + (leftWidth > 0 ? HORIZONTAL_SPACING : 0);
    const rightWidth = node.right ? calculatePositions(node.right, depth + 1, rightOffset + NODE_DIAMETER + HORIZONTAL_SPACING, positions, widths).totalWidth : 0;
    
    const nodeX = xOffset + leftWidth + (leftWidth > 0 ? HORIZONTAL_SPACING/2 : 0) + (rightWidth > 0 ? rightWidth/2 - HORIZONTAL_SPACING/2 : 0) + NODE_DIAMETER / 2;
    positions[node.value] = { x: nodeX, y: depth * VERTICAL_SPACING + NODE_DIAMETER };
    widths[depth] = (widths[depth] || 0) + NODE_DIAMETER + (leftWidth > 0 ? HORIZONTAL_SPACING : 0) + (rightWidth > 0 ? HORIZONTAL_SPACING : 0);

    return { positions, totalWidth: leftWidth + rightWidth + NODE_DIAMETER + (leftWidth > 0 ? HORIZONTAL_SPACING : 0) + (rightWidth > 0 ? HORIZONTAL_SPACING : 0) };
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
        <foreignObject key={node.value} x={nodePos.x} y={nodePos.y} width="1" height="1" style={{overflow: 'visible'}}>
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
    
    const { positions, totalWidth } = calculatePositions(treeData);
    const renderedNodes = renderTree(treeData, positions, highlightedNode, traversalPath);
    
    const maxDepth = Math.max(...Object.values(positions).map((p: any) => p.y));
    const totalHeight = maxDepth + NODE_DIAMETER * 2;

    return (
        <div className="w-full flex justify-center items-center overflow-auto p-4">
             <svg width={totalWidth + 40} height={totalHeight} style={{ minWidth: totalWidth + 40 }}>
                <g transform={`translate(20, 20)`}>
                    {renderedNodes}
                </g>
             </svg>
        </div>
    );
}
