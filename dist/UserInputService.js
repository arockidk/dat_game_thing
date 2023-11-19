import { Signal } from "./Signal.js";
export class UserInputService {
    static Keys = {};
    static InputBegan = new Signal();
    static InputEnded = new Signal();
    static HTMLKeyboardInputStarted(ev) {
        UserInputService.Keys[ev.key] = true;
        UserInputService.InputBegan.Fire({
            "key": ev.key
        });
    }
    static HTMLKeyboardInputEnded(ev) {
        UserInputService.Keys[ev.key] = false;
        UserInputService.InputEnded.Fire({
            "key": ev.key
        });
    }
    static Initialize() {
        window.addEventListener("keydown", this.HTMLKeyboardInputStarted);
        window.addEventListener("keyup", this.HTMLKeyboardInputEnded);
    }
    static IsKeyDown(key) {
        return !!this.Keys[key];
    }
}
(function (UserInputService) {
    let UserInputType;
    (function (UserInputType) {
        UserInputType[UserInputType["MouseButton1"] = 0] = "MouseButton1";
        UserInputType[UserInputType["MouseButton2"] = 1] = "MouseButton2";
        UserInputType[UserInputType["MouseButton3"] = 2] = "MouseButton3";
        UserInputType[UserInputType["MouseWheel"] = 3] = "MouseWheel";
        UserInputType[UserInputType["MouseMovement"] = 4] = "MouseMovement";
        UserInputType[UserInputType["Touch"] = 5] = "Touch";
        UserInputType[UserInputType["Keyboard"] = 6] = "Keyboard";
        UserInputType[UserInputType["Focus"] = 7] = "Focus";
    })(UserInputType = UserInputService.UserInputType || (UserInputService.UserInputType = {}));
})(UserInputService || (UserInputService = {}));
//# sourceMappingURL=UserInputService.js.map