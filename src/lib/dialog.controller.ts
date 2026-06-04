import type Typewriter from "./typewriter";

export type DialogData = {
    texts: string[];
    targetElement: HTMLElement;
    onComplete?: () => void;
    onFrazesActions?: Record<number, () => void>;
    hideMsDelay?: number;
};

export type DialogState = "idle" | "typing" | "waiting" | "ended";

class DialogController {
    static LOCAL_STORAGE_KEY_DIALOG_STATE = "killerDialogState";

    #typewriter: Typewriter | null = null;

    #nextButton: HTMLButtonElement | null = null;
    #endButton: HTMLButtonElement | null = null;

    #dialogState: DialogState = "idle";
    #texts: string[] = [];
    #currentTextIdx: number = 0;
    #targetElement: HTMLElement | null = null;
    #onComplete: (() => void) | null = null;
    #keydownHandler: ((event: KeyboardEvent) => void) | null = null;
    #onFrazesActions: Record<number, () => void> = {};
    #hideMsDelay: number = 0;

    registerTypewriter(tw: Typewriter) {
        this.#typewriter = tw;
    }

    registerNextButton(button: HTMLButtonElement) {
        this.#nextButton = button;
    }

    registerEndButton(button: HTMLButtonElement) {
        this.#endButton = button;
    }

    startDialog(data: DialogData) {
        if (!this.#typewriter || !(data.texts && data.texts.length > 0)) return;

        this.#texts = data.texts;
        this.#targetElement = data.targetElement;
        this.#hideMsDelay = data.hideMsDelay ?? 0;
        this.#onComplete = data.onComplete ?? null;

        this.#dialogState = "idle";
        this.saveActualDialogStateToStorage();

        this.#onFrazesActions = data.onFrazesActions ?? {};

        this.#currentTextIdx = 0;
        this.#typeNext();
    }

    get state() {
        return this.#dialogState;
    }

    #typeNext() {
        if (!this.#typewriter || !this.#targetElement) return;

        if (this.#currentTextIdx < this.#texts.length) {
            this.#executeOnFrazeAction();
            this.#dialogState = "typing";
            this.#setButtonVisibilityState(this.#nextButton, false);
            this.setSkipAnimation(false);

            this.#typewriter.setupTypewriterWithSingleText(
                this.#texts[this.#currentTextIdx],
                this.#targetElement as HTMLHeadingElement,
                () => {
                    if (this.#currentTextIdx < this.#texts.length) {
                        this.#dialogState = "waiting";
                        this.#setButtonVisibilityState(this.#nextButton, true);
                    } else {
                        {
                            this.#dialogState = "ended";
                            this.#setButtonVisibilityState(
                                this.#endButton,
                                true,
                            );
                            this.#setButtonVisibilityState(
                                this.#nextButton,
                                false,
                            );
                            this.saveActualDialogStateToStorage();
                        }
                    }
                },
            );
            this.#currentTextIdx++;
        }
    }

    #executeOnFrazeAction() {
        const action = this.#onFrazesActions[this.#currentTextIdx];
        action?.();
    }

    setSkipAnimation(skipAnimation: boolean = true) {
        this.#typewriter?.setSkipAnimation(skipAnimation);
    }

    saveActualDialogStateToStorage() {
        localStorage.setItem(
            DialogController.LOCAL_STORAGE_KEY_DIALOG_STATE,
            this.#dialogState,
        );
    }

    changeToNextFraze() {
        if (this.#dialogState === "waiting") {
            this.#typeNext();
        }
    }

    registerKeyboardShortcuts(): void {
        this.#keydownHandler = (e: KeyboardEvent) => {
            if (e.key === "Shift") {
                this.setSkipAnimation();
            }
            if (
                (e.key === "Enter" || e.key === " ") &&
                this.#dialogState === "waiting"
            ) {
                e.preventDefault();
                this.#typeNext();
            }
        };

        document.addEventListener("keydown", this.#keydownHandler);
    }

    #setButtonVisibilityState(
        button: HTMLButtonElement | null,
        visible: boolean,
    ) {
        if (button) {
            button.classList.toggle("visible", visible);
        }
    }

    release(dialogElement: HTMLElement) {
        this.#onComplete?.();

        setTimeout(() => {
            this.#typewriter?.release();

            if (this.#keydownHandler) {
                document.removeEventListener("keydown", this.#keydownHandler);
                this.#keydownHandler = null;
            }

            this.#texts = [];
            this.#currentTextIdx = 0;
            this.#dialogState = "idle";
            this.#targetElement = null;
            this.#onComplete = null;

            dialogElement.hidden = true;
        }, this.#hideMsDelay * 1000);
    }
}

export default new DialogController();
