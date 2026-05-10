const filters = {
    brightness: { value: 100, max: 200, min: 0, unit: "%" },
    contrast: { value: 100, max: 200, min: 0, unit: "%" },
    saturation: { value: 100, max: 200, min: 0, unit: "%" },
    hueRotation: { value: 0, max: 360, min: 0, unit: "deg" },
    blur: { value: 0, max: 20, min: 0, unit: "px" },
    grayscale: { value: 0, max: 100, min: 0, unit: "%" },
    sepia: { value: 0, max: 100, min: 0, unit: "%" },
    opacity: { value: 100, max: 100, min: 0, unit: "%" },
    invert: { value: 0, max: 100, min: 0, unit: "%" }
};
const presets = {

    cyberpunk: {
        brightness: 120,
        contrast: 140,
        saturation: 180,
        hueRotation: 290,
        blur: 0,
        grayscale: 0,
        sepia: 10,
        opacity: 100,
        invert: 0
    },

    vintageFilm: {
        brightness: 105,
        contrast: 115,
        saturation: 75,
        hueRotation: 350,
        blur: 1,
        grayscale: 15,
        sepia: 45,
        opacity: 100,
        invert: 0
    },

    modern: {
        brightness: 110,
        contrast: 125,
        saturation: 115,
        hueRotation: 0,
        blur: 0,
        grayscale: 0,
        sepia: 0,
        opacity: 100,
        invert: 0
    },

    neonDream: {
        brightness: 130,
        contrast: 150,
        saturation: 200,
        hueRotation: 250,
        blur: 0,
        grayscale: 0,
        sepia: 0,
        opacity: 100,
        invert: 0
    },

    darkMode: {
        brightness: 75,
        contrast: 140,
        saturation: 90,
        hueRotation: 0,
        blur: 0,
        grayscale: 10,
        sepia: 0,
        opacity: 100,
        invert: 0
    },

    sunset: {
        brightness: 115,
        contrast: 110,
        saturation: 160,
        hueRotation: 25,
        blur: 0,
        grayscale: 0,
        sepia: 20,
        opacity: 100,
        invert: 0
    },

    iceBlue: {
        brightness: 105,
        contrast: 120,
        saturation: 130,
        hueRotation: 180,
        blur: 0,
        grayscale: 0,
        sepia: 0,
        opacity: 100,
        invert: 0
    },

    matrix: {
        brightness: 90,
        contrast: 160,
        saturation: 50,
        hueRotation: 90,
        blur: 0,
        grayscale: 20,
        sepia: 0,
        opacity: 100,
        invert: 0
    },

    dreamy: {
        brightness: 120,
        contrast: 90,
        saturation: 140,
        hueRotation: 320,
        blur: 2,
        grayscale: 0,
        sepia: 10,
        opacity: 95,
        invert: 0
    },

    noir: {
        brightness: 95,
        contrast: 170,
        saturation: 0,
        hueRotation: 0,
        blur: 0,
        grayscale: 100,
        sepia: 10,
        opacity: 100,
        invert: 0
    }
};

const imageCanvas = document.querySelector("#image-canvas");
const imgInput = document.querySelector("#image-input");
const canvasCtx = imageCanvas.getContext("2d");
const resetButton=document.querySelector("#reset-btn");
const downloadButton=document.querySelector("#download-btn");

let file = null;
let image = null;

const filtersContainer = document.querySelector(".filters");

function createFilterElement(name, unit, value, min, max) {

    const div = document.createElement("div");
    div.classList.add("filter");

    const p = document.createElement("p");
    p.innerText = `${name} (${value}${unit})`;

    const input = document.createElement("input");

    input.type = "range";
    input.min = min;
    input.max = max;
    input.value = value;
    input.id = name;

    input.addEventListener("input", () => {

        filters[name].value = input.value;

        p.innerText = `${name} (${input.value}${unit})`;

        applyFilters();
    });

    div.appendChild(p);
    div.appendChild(input);

    return div;
}

Object.keys(filters).forEach((key) => {

    const filter = filters[key];

    const filterElement = createFilterElement(
        key,
        filter.unit,
        filter.value,
        filter.min,
        filter.max
    );

    filtersContainer.appendChild(filterElement);
});

imgInput.addEventListener("change", (event) => {

    file = event.target.files[0];

    const imagePlaceholder = document.querySelector(".placeholder");

    imagePlaceholder.style.display = "none";

    image = new Image();

    image.src = URL.createObjectURL(file);

    image.onload = () => {

        imageCanvas.width = image.width;
        imageCanvas.height = image.height;

        applyFilters();
    };
});

function applyFilters() {

    canvasCtx.clearRect(0, 0, imageCanvas.width, imageCanvas.height);

    canvasCtx.filter = `
        brightness(${filters.brightness.value}${filters.brightness.unit})
        contrast(${filters.contrast.value}${filters.contrast.unit})
        saturate(${filters.saturation.value}${filters.saturation.unit})
        hue-rotate(${filters.hueRotation.value}${filters.hueRotation.unit})
        blur(${filters.blur.value}${filters.blur.unit})
        grayscale(${filters.grayscale.value}${filters.grayscale.unit})
        sepia(${filters.sepia.value}${filters.sepia.unit})
        opacity(${filters.opacity.value}${filters.opacity.unit})
        invert(${filters.invert.value}${filters.invert.unit})
    `;

    canvasCtx.drawImage(image, 0, 0);
}

resetButton.addEventListener("click", () => {

    // Reset values
    filters.brightness.value = 100;
    filters.contrast.value = 100;
    filters.saturation.value = 100;
    filters.hueRotation.value = 0;
    filters.blur.value = 0;
    filters.grayscale.value = 0;
    filters.sepia.value = 0;
    filters.opacity.value = 100;
    filters.invert.value = 0;

    // Clear old sliders
    filtersContainer.innerHTML = "";

    // Recreate sliders with updated values
    Object.keys(filters).forEach((key) => {

        const filter = filters[key];

        const filterElement = createFilterElement(
            key,
            filter.unit,
            filter.value,
            filter.min,
            filter.max
        );

        filtersContainer.appendChild(filterElement);
    });

    applyFilters();
});
downloadButton. addEventListener("click", () => {
const link = document. createElement("a")
link. download = "edited-image.png"
link.href = imageCanvas. toDataURL()
link.click()
})

const presetsContainer = document.querySelector(".presets");
 
Object.keys(presets).forEach((presetName) => {

    const presetButton = document.createElement("button");

    presetButton.classList.add("preset-btn");

    presetButton.innerText = presetName;

    presetsContainer.appendChild(presetButton);

    presetButton.addEventListener("click", () => {

        const preset = presets[presetName];

        Object.keys(preset).forEach((key) => {

            filters[key].value = preset[key];
        });

        filtersContainer.innerHTML = "";

        Object.keys(filters).forEach((key) => {

            const filter = filters[key];

            const filterElement = createFilterElement(
                key,
                filter.unit,
                filter.value,
                filter.min,
                filter.max
            );

            filtersContainer.appendChild(filterElement);
        });

        applyFilters();
    });
});