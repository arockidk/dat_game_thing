import { Vec2 } from "./Vector2.js";


interface TileData {
    name: string;
    size: Vec2   
}
interface QuadData {
    name: string;
    textures: string[];
}
interface TerrainList {
    tiles: TileData[];
    quads: QuadData[];
}
interface terrain_json {
    [key : string]: TerrainList
}
export interface LevelData {
    data: {
        terrain_type: 'tile' | 'quad';
        size: Vec2;
        repeat: {
            min: number;
            max: number;
            func: string;
            inequality: string;
        };
    }[]
}
export class TerrainFactory {
    private data: terrain_json
    public constructor(data: terrain_json) {
        this.data = data;
    }
    public create_tile(name: string, size: Vec2) {}
}

