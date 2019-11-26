export const xtOpen: number;
export const xtClose: number;
export const xtAttribute: number;
export const xtText: number;
export const xtCData: number;
export const xtComment: number;

// Should match the exported values above
export const enum ParserEvent {
    Open = 0,
    Close = 1,
    Attribute = 2,
    Text = 3,
    CData = 4,
    Comment = 5
}

export type EventHandler = (event: ParserEvent, name?: string, value?: string) => boolean;

export interface XmlNode {
    name: string;
    attrs?: { [key: string]: string };
    children?: (XmlNode | string)[];
}

export class XmlParser {
    new(): XmlParser;
    parseBuffer(buffer: Buffer, length: number, handler: EventHandler): boolean;
    parseString(string: string, handler: EventHandler): boolean;

    offset: number;
    line: number;
    col: number;
}

export function parseBuffer(buffer: Buffer): XmlNode;
export function parseString(string: string): XmlNode;
export function parseFile(path: string, callback: (err?: Error | null, root?: XmlNode) => void);
export function parseFileSync(path: string): XmlNode;

