import { Signal } from "./Signal.js"

export class UserInputService {
    private static Keys: {[key: string]: boolean} = {};
    public static InputBegan: Signal<(inputObject: UserInputService.InputObject)=>void> = new Signal();
    public static InputEnded: Signal<(inputObject: UserInputService.InputObject)=>void> = new Signal();
    protected static HTMLKeyboardInputStarted(ev: KeyboardEvent): void {
        
        UserInputService.Keys[ev.key] = true;
        UserInputService.InputBegan.Fire({
            "key": ev.key
        });
        
    }
    protected static HTMLKeyboardInputEnded(ev: KeyboardEvent): void {
        UserInputService.Keys[ev.key] = false;
        UserInputService.InputEnded.Fire({
            "key": ev.key
        });
    }
    public static Initialize(): void {
        window.addEventListener("keydown",this.HTMLKeyboardInputStarted);
        window.addEventListener("keyup",this.HTMLKeyboardInputEnded);

    }
    public static IsKeyDown(key: string): boolean { 
        return !!this.Keys[key];
    }
}

export namespace UserInputService { 
    export interface InputObject {
        key: string,
    }
    export enum UserInputType {
        MouseButton1,
        MouseButton2,
        MouseButton3,
        MouseWheel,
        MouseMovement,
        Touch,
        Keyboard,
        Focus
    }
}


