/**
 * @name DraggableEllen
 * @description Make Ellen Joe chibi draggable inside Discord, remembers position
 * @author sailentcoder
 */
module.exports = class DraggableEllen {
    start() {
        if (document.getElementById("ellen-pet")) return;

        const pet = document.createElement("div");
        pet.id = "ellen-pet";

        // Load saved position if exists
        const savedPos = JSON.parse(localStorage.getItem("ellenPetPos"));
        if (savedPos) {
            pet.style.left = savedPos.left + "px";
            pet.style.top = savedPos.top + "px";
            pet.style.bottom = "auto";
            pet.style.right = "auto";
        }

        document.body.appendChild(pet);

        let isDragging = false, offsetX, offsetY;

        pet.addEventListener("mousedown", (e) => {
            isDragging = true;
            offsetX = e.clientX - pet.offsetLeft;
            offsetY = e.clientY - pet.offsetTop;
            pet.style.cursor = "grabbing";
        });

        document.addEventListener("mousemove", (e) => {
            if (!isDragging) return;
            pet.style.left = e.clientX - offsetX + "px";
            pet.style.top = e.clientY - offsetY + "px";
            pet.style.bottom = "auto";
            pet.style.right = "auto";
        });

        document.addEventListener("mouseup", () => {
            if (!isDragging) return;
            isDragging = false;
            pet.style.cursor = "grab";

            // Save position to localStorage
            localStorage.setItem("ellenPetPos", JSON.stringify({
                left: pet.offsetLeft,
                top: pet.offsetTop
            }));
        });
    }

    stop() {
        const pet = document.getElementById("ellen-pet");
        if (pet) pet.remove();
    }
};

