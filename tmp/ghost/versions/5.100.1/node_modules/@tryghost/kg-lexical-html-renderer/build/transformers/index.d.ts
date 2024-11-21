/// <reference path="../../lib/kg-default-nodes.d.ts" />
import { ElementNode } from 'lexical';
import type { RendererOptions } from '@tryghost/kg-default-nodes';
export type ExportChildren = (node: ElementNode, options?: RendererOptions) => string;
export type ElementTransformer = {
    export: (node: ElementNode, options: RendererOptions, exportChildren: ExportChildren) => string | null;
};
declare const elementTransformers: ElementTransformer[];
export default elementTransformers;
