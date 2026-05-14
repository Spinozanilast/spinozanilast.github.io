class Typewriter {
    readonly STANDARD_TYPING_DELAY: number = 100;

    #typingDelay: number;
    #skipAnimation: boolean;
    #withBlinking: boolean;

    #animationTimeout: NodeJS.Timeout | null;

    constructor(
        withBlinking: boolean = true,
        typingDelay: number = this.STANDARD_TYPING_DELAY,
    ) {
        this.#typingDelay = typingDelay;
        this.#withBlinking = withBlinking;
        this.#skipAnimation = false;
        this.#animationTimeout = null;
    }

    setSkipAnimation(skipAnimation: boolean) {
        this.#skipAnimation = skipAnimation;
    }

    setTypingDelay(delay: number) {
        if (delay < 0) return;
        this.#typingDelay = delay;
    }

    /**
     * USE THIS FOR FRAMEWORK COMPONENTS (React, Vue, etc.):
     * Pass an already rendered DOM element. It will animate the text inside
     * WITHOUT destroying your custom components.
     */
    setupTypewriterFromElement(typewriterElement: HTMLHeadingElement) {
        this.changeTypeWriterState(typewriterElement, "hidden");
        this.setupTypewriter(typewriterElement.innerHTML, typewriterElement);
    }

    setupTypewriter(innerText: string, typewriterElement: HTMLHeadingElement) {
        typewriterElement.innerHTML = innerText;
        this.changeTypeWriterState(typewriterElement, "hidden");
        this.startTyping(typewriterElement);
    }

    /*
     * Sets up typewriters in the given container with the provided inner texts for each typewriter.
     */
    setupTypewriters(innerTexts: string[], container: HTMLElement) {
        const typewriters = container.getElementsByClassName(
            "typewriter",
        ) as HTMLCollectionOf<HTMLHeadingElement>;

        for (let i = 0; i < typewriters.length; i++) {
            const typewriter = typewriters[i];
            typewriter.innerHTML = innerTexts[i];
            this.changeTypeWriterState(typewriter, "hidden");
        }

        this.startTyping(typewriters);
    }

    startTyping(
        typewriters: HTMLCollectionOf<HTMLHeadingElement> | HTMLHeadingElement,
    ) {
        if (typewriters instanceof HTMLHeadingElement) {
            this.startTypewriter(typewriters, () => {});
            return;
        }

        let index = 0;
        const startNext = () => {
            if (index < typewriters.length) {
                this.startTypewriter(
                    typewriters[index] as HTMLHeadingElement,
                    startNext,
                );
                index++;
            }
        };

        startNext();
    }

    startTypewriter(heading: HTMLHeadingElement, onComplete: () => void) {
        this.changeTypeWriterState(heading, "typing");
        const nodes = Array.from(heading.childNodes);
        heading.innerHTML = "";

        let nodeIndex = 0;
        const processNode = () => {
            if (nodeIndex < nodes.length) {
                const node = nodes[nodeIndex];
                const clone = node.cloneNode();
                heading.appendChild(clone);
                this.typeNodeContent(node, clone, () => {
                    nodeIndex++;
                    processNode();
                });
            } else {
                onComplete?.();
                this.changeTypeWriterState(heading, "ended");
            }
        };
        processNode();
    }

    typeNodeContent(node: Node, target: Node, onComplete: () => void) {
        if (node.nodeType === Node.TEXT_NODE) {
            const text = node.textContent ?? "";
            let i = 0;

            const type = () => {
                if (i < text.length) {
                    (target as Text).data = text.slice(0, i + 1);
                    i++;
                    if (!this.#skipAnimation) {
                        this.#animationTimeout = setTimeout(
                            type,
                            Math.random() * this.#typingDelay + 50,
                        );
                    } else {
                        this.#animationTimeout = setTimeout(type, 0);
                    }
                } else {
                    onComplete();
                }
            };
            type();
        } else if (node.nodeType === Node.ELEMENT_NODE) {
            const targetEl = target as HTMLElement;
            const childNodes = Array.from(node.childNodes);
            let childIndex = 0;

            const processNextChild = () => {
                if (childIndex < childNodes.length) {
                    const child = childNodes[childIndex];
                    const childClone = child.cloneNode();
                    targetEl.appendChild(childClone);

                    this.typeNodeContent(child, childClone, () => {
                        childIndex++;
                        processNextChild();
                    });
                } else {
                    onComplete();
                }
            };
            processNextChild();
        } else {
            onComplete();
        }
    }

    changeTypeWriterState(
        typewriter: HTMLHeadingElement,
        state: "ended" | "typing" | "hidden",
    ) {
        switch (state) {
            case "ended":
                if (!this.#withBlinking) return;
                typewriter.classList.remove("blinking");
                break;
            case "typing":
                if (this.#withBlinking) {
                    typewriter.classList.add("blinking");
                }
                typewriter.classList.remove("hidden");
                break;
            case "hidden":
                typewriter.classList.add("hidden");
                if (this.#withBlinking) {
                    typewriter.classList.remove("blinking");
                }
                break;
        }
    }

    release() {
        if (this.#animationTimeout) {
            clearTimeout(this.#animationTimeout);
            this.#animationTimeout = null;
        }
        this.#skipAnimation = false;
    }
}

export default Typewriter;
