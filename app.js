let colorMode = document.getElementById("toggle-color");
let shadingMode = document.getElementById("toggle-shading");
let slider = document.getElementById("slider");
let dimensions = document.querySelector(".dimensions");

let randomColorMode = false;
let shadingModeEnabled = false;

// function to generate a random color
function getRandomColor() {
	const r = Math.floor(Math.random() * 256);
	const g = Math.floor(Math.random() * 256);
	const b = Math.floor(Math.random() * 256);
	return `rgb(${r}, ${g}, ${b})`;
}

// event listener for the slider
slider.addEventListener("input", () => {
	const size = slider.value;
	dimensions.textContent = `${size} x ${size}`;
	createGrid(size);
});

// event listener for color mode
colorMode.addEventListener("click", () => {
	randomColorMode = !randomColorMode;
	const size = slider.value;
	if (randomColorMode === true) {
		colorMode.textContent = "Rainbow ON";
	} else {
		colorMode.textContent = "Rainbow OFF";
	}
	console.log(`Random color mode = ${randomColorMode}`);
	createGrid(size);
});

// event listener for the shading mode
shadingMode.addEventListener("click", () => {
	shadingModeEnabled = !shadingModeEnabled;
	const size = slider.value;
	if (shadingModeEnabled === true) {
		shadingMode.textContent = "Shading ON";
	} else {
		shadingMode.textContent = "Shading OFF";
	}
	console.log(`Shading mode = ${shadingModeEnabled}`);
	createGrid(size);
});

// creating the container grid
function createGrid(size) {
	const container = document.querySelector("#container");
	container.innerHTML = "";
	// set container size dynamically
	container.style.width = "480px";
	container.style.height = "480px";
	container.style.display = "flex";
	container.style.flexWrap = "wrap";

	const squareSize = 480 / size;

	for (let i = 0; i < size * size; i++) {
		const square = document.createElement("div");
		square.classList.add("square");
		// set square size dynamically
		square.style.width = `${squareSize}px`;
		square.style.height = `${squareSize}px`;
		square.style.backgroundColor = "";
		square.dataset.shade = 0;

		// hover effect
		square.addEventListener("mouseenter", () => {
			// setting the shading efect
			if (shadingModeEnabled) {
				// increasing darkness by 10% using the addition operator +=
				let shadeLevel = parseInt(square.dataset.shade) || 0;
				if (shadeLevel < 10) {
					shadeLevel += 1;
					square.dataset.shade = shadeLevel;
					// get the current color or set a random color if its the first interaction
					let currentColor = square.style.backgroundColor;
					if (!currentColor || currentColor === "black") {
						currentColor = randomColorMode
							? getRandomColor()
							: "rgb(255, 255, 255)";
						square.style.backgroundColor = currentColor;
					}
					let rgbValues = currentColor.match(/\d+/g).map(Number);
					if (rgbValues) {
						let r = Math.max(0, rgbValues[0] - 25.5);
						let g = Math.max(0, rgbValues[1] - 25.5);
						let b = Math.max(0, rgbValues[2] - 25.5);

						square.style.backgroundColor = `rgb(${r}, ${g}, ${b})`;
					}
				}
				// setting a random color
			} else if (randomColorMode) {
				square.style.backgroundColor = getRandomColor();
			} else {
				square.style.backgroundColor = "black";
			}
		});
		container.appendChild(square);
	}
}

createGrid(16);
