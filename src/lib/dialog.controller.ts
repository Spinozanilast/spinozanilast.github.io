import type Typewriter from "./typewriter";

export type DialogData = {
    texts: string[];
    targetElement: HTMLElement;
    onComplete?: () => void;
};

export type DialogState = "idle" | "typing" | "waiting" | "ended";

class DialogController {
    #typewriter: Typewriter | null = null;
    #nextButton: HTMLButtonElement | null = null;
    #dialogState: DialogState = "idle";
    #texts: string[] = [];
    #currentTextIdx: number = 0;
    #targetElement: HTMLElement | null = null;
    #onComplete: (() => void) | null = null;
    #keydownHandler: ((event: KeyboardEvent) => void) | null = null;

    registerTypewriter(tw: Typewriter) {
        this.#typewriter = tw;
    }
    registerNextButton(button: HTMLButtonElement) {
        this.#nextButton = button;
    }

    startDialog(data: DialogData) {
        if (!this.#typewriter || !(data.texts && data.texts.length > 0)) return;

        this.#texts = data.texts;
        this.#targetElement = data.targetElement;
        this.#onComplete = data.onComplete ?? null;
        this.#dialogState = "idle";
        this.#currentTextIdx = 0;
        this.#typeNext();
    }

    get state() {
        return this.#dialogState;
    }

    #typeNext() {
        if (!this.#typewriter || !this.#targetElement) return;

        if (this.#currentTextIdx < this.#texts.length) {
            this.#dialogState = "typing";
            this.#setNextButtonVisibilityState(false);

            this.#typewriter.setupTypewriterWithSingleText(
                this.#texts[this.#currentTextIdx],
                this.#targetElement as HTMLHeadingElement,
                () => {
                    this.#dialogState = "waiting";
                    this.#setNextButtonVisibilityState(true);
                },
            );
            this.#currentTextIdx++;
        } else {
            this.#dialogState = "ended";
            this.#setNextButtonVisibilityState(false);
            this.#onComplete?.();
        }
    }

    skipAnimation() {
        this.#typewriter?.setSkipAnimation(true);
    }

    changeToNextFraze() {
        if (this.#dialogState === "waiting") {
            this.#typeNext();
        }
    }

    registerKeyboardShortcuts(): void {
        this.#keydownHandler = (e: KeyboardEvent) => {
            if (e.key === "Shift") {
                this.skipAnimation();
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

    #setNextButtonVisibilityState(visible: boolean) {
        if (this.#nextButton) {
            this.#nextButton.classList.toggle("next-visible", visible);
        }
    }

    release() {
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
    }
}

export default new DialogController();
