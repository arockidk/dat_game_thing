import Quad from "./Quad.js";
import { Vec2 } from "./Vector2.js";
import { WorldObject } from "./WorldObject.js";


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
        repeat?: {
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
    // public createLevel(data: LevelData) {
    //     for (let obj of data.data) {
    //         if (obj.terrain_type === 'tile') { 
                
    //         }
    //     }
    // }
    // public createTile(name: string, size: Vec2): WorldObject {}
    // public createQuad(name: string, size: Vec2): Quad {}
}


