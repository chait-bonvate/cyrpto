/* =========================================
   CRYPTOGRAPHY WEBSITE
   Interactive JavaScript
========================================= */

document.addEventListener("DOMContentLoaded", () => {

    const alphabet = "ABCDEFGHIJKLMNOPQRSTUVWXYZ";


    /* =========================================
       MOBILE NAVIGATION
    ========================================= */

    const menuToggle = document.getElementById("menuToggle");
    const navMenu = document.getElementById("navMenu");

    menuToggle.addEventListener("click", () => {
        navMenu.classList.toggle("active");
    });

    document.querySelectorAll("nav a").forEach(link => {

        link.addEventListener("click", () => {
            navMenu.classList.remove("active");
        });

    });


    /* =========================================
       CAESAR CIPHER ELEMENTS
    ========================================= */

    const input = document.getElementById("cipherInput");

    const output = document.getElementById("cipherOutput");

    const shiftRange = document.getElementById("shiftRange");

    const shiftValue = document.getElementById("shiftValue");

    const encryptBtn = document.getElementById("encryptBtn");

    const decryptBtn = document.getElementById("decryptBtn");

    const clearBtn = document.getElementById("clearBtn");

    const copyBtn = document.getElementById("copyBtn");

    const originalLetters =
        document.getElementById("originalLetters");

    const shiftedLetters =
        document.getElementById("shiftedLetters");

    const shiftDescription =
        document.getElementById("shiftDescription");


    /* =========================================
       CREATE ALPHABET VISUALIZATION
    ========================================= */

    function createAlphabet() {

        originalLetters.innerHTML = "";
        shiftedLetters.innerHTML = "";

        const shift = Number(shiftRange.value);

        for (let i = 0; i < alphabet.length; i++) {

            const original = document.createElement("div");

            original.className = "letter";

            original.textContent = alphabet[i];

            original.dataset.index = i;

            originalLetters.appendChild(original);


            const shiftedIndex =
                (i + shift) % 26;

            const shifted = document.createElement("div");

            shifted.className = "letter";

            shifted.textContent =
                alphabet[shiftedIndex];

            shifted.dataset.index =
                shiftedIndex;

            shiftedLetters.appendChild(shifted);
        }

        shiftDescription.textContent =
            `Each letter moves ${shift} position${shift === 1 ? "" : "s"}`;
    }


    /* =========================================
       CAESAR ENCRYPTION
    ========================================= */

    function caesarCipher(text, shift) {

        return text
            .split("")
            .map(character => {

                const upper = character.toUpperCase();

                const index =
                    alphabet.indexOf(upper);

                // Keep spaces, numbers and punctuation unchanged
                if (index === -1) {
                    return character;
                }

                const newIndex =
                    (index + shift + 26) % 26;

                const encrypted =
                    alphabet[newIndex];

                // Preserve lowercase letters
                if (character === character.toLowerCase()) {
                    return encrypted.toLowerCase();
                }

                return encrypted;

            })
            .join("");
    }


    /* =========================================
       ENCRYPT
    ========================================= */

    function encrypt() {

        const text = input.value;

        const shift =
            Number(shiftRange.value);

        output.textContent =
            caesarCipher(text, shift);

        animateOutput();
        highlightLetters(text, shift);
    }


    /* =========================================
       DECRYPT
    ========================================= */

    function decrypt() {

        const text = input.value;

        const shift =
            Number(shiftRange.value);

        output.textContent =
            caesarCipher(text, -shift);

        animateOutput();
        highlightLetters(text, -shift);
    }


    /* =========================================
       OUTPUT ANIMATION
    ========================================= */

    function animateOutput() {

        output.style.opacity = "0";
        output.style.transform = "translateY(8px)";

        requestAnimationFrame(() => {

            output.style.transition =
                "opacity 0.3s ease, transform 0.3s ease";

            output.style.opacity = "1";

            output.style.transform =
                "translateY(0)";

        });
    }


    /* =========================================
       HIGHLIGHT LETTERS
    ========================================= */

    function highlightLetters(text, shift) {

        document
            .querySelectorAll(".letter")
            .forEach(letter => {
                letter.classList.remove("active");
            });

        const firstLetter =
            text.toUpperCase()
                .split("")
                .find(char =>
                    alphabet.includes(char)
                );

        if (!firstLetter) {
            return;
        }

        const index =
            alphabet.indexOf(firstLetter);

        const targetIndex =
            (index + shift + 26) % 26;

        const original =
            originalLetters.children[index];

        const shifted =
            shiftedLetters.children[
                targetIndex
            ];

        if (original) {
            original.classList.add("active");
        }

        if (shifted) {
            shifted.classList.add("active");
        }
    }


    /* =========================================
       SHIFT SLIDER
    ========================================= */

    shiftRange.addEventListener("input", () => {

        shiftValue.textContent =
            shiftRange.value;

        createAlphabet();

        if (input.value.trim() !== "") {
            encrypt();
        }

    });


    /* =========================================
       BUTTONS
    ========================================= */

    encryptBtn.addEventListener(
        "click",
        encrypt
    );

    decryptBtn.addEventListener(
        "click",
        decrypt
    );


    clearBtn.addEventListener(
        "click",
        () => {

            input.value = "";

            output.textContent =
                "Your encrypted message will appear here.";

            document
                .querySelectorAll(".letter")
                .forEach(letter => {
                    letter.classList.remove("active");
                });

        }
    );


    /* =========================================
       COPY BUTTON
    ========================================= */

    copyBtn.addEventListener(
        "click",
        async () => {

            const text =
                output.textContent;

            if (
                !text ||
                text ===
                "Your encrypted message will appear here."
            ) {
                return;
            }

            try {

                await navigator.clipboard.writeText(text);

                copyBtn.textContent =
                    "Copied!";

                setTimeout(() => {
                    copyBtn.textContent =
                        "Copy";
                }, 1500);

            } catch (error) {

                copyBtn.textContent =
                    "Copy failed";

                setTimeout(() => {
                    copyBtn.textContent =
                        "Copy";
                }, 1500);

            }

        }
    );


    /* =========================================
       LIVE INPUT
    ========================================= */

    input.addEventListener(
        "input",
        () => {

            if (input.value.length > 0) {
                encrypt();
            } else {
                output.textContent =
                    "Your encrypted message will appear here.";
            }

        }
    );


    /* =========================================
       INITIALIZE
    ========================================= */

    createAlphabet();

    encrypt();


    /* =========================================
       ACTIVE NAVIGATION ON SCROLL
    ========================================= */

    const sections =
        document.querySelectorAll("section[id]");

    const navLinks =
        document.querySelectorAll("nav a");

    const observer =
        new IntersectionObserver(
            entries => {

                entries.forEach(entry => {

                    if (entry.isIntersecting) {

                        navLinks.forEach(link => {
                            link.style.color = "";
                        });

                        const active =
                            document.querySelector(
                                `nav a[href="#${entry.target.id}"]`
                            );

                        if (active) {
                            active.style.color =
                                "var(--primary)";
                        }

                    }

                });

            },
            {
                threshold: 0.3
            }
        );

    sections.forEach(section => {
        observer.observe(section);
    });

});
