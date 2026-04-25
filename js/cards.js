const BLUE = "#004D98";
const RED = "#A50044";
const CARD_BG = "#f5f0e8";

function createSVG(shape, color) {
    let svgContent = '';
    switch(shape) {
        case 'circle':
            svgContent = `
                <circle cx="48" cy="64" r="32" fill="${color}"/>
                <circle cx="48" cy="64" r="20" fill="none" stroke="${CARD_BG}" stroke-width="4"/>`;
            break;
        case 'star':
            svgContent = `<polygon points="48,37 54,57 76,57 58,69 65,90 48,78 31,90 38,69 20,57 42,57" fill="${color}"/>`;
            break;
       case 'moon':
            svgContent = `<path d="M 64 32 A 32 32 0 0 0 64 96 A 20 32 0 0 1 64 32 Z" fill="${color}"/>`;
            break;
    }

    let svg = `<svg xmlns="http://www.w3.org/2000/svg" viewBox="0 0 96 128" width="96" height="128">
        <rect width="96" height="128" rx="8" ry="8" fill="${CARD_BG}" stroke="${color}" stroke-width="3"/>
        ${svgContent}
    </svg>`;
    return 'data:image/svg+xml;base64,' + btoa(svg);
}

function createBack() {
    let svg = `<svg xmlns="http://www.w3.org/2000/svg" viewBox="0 0 96 128" width="96" height="128">
        <rect width="96" height="128" rx="8" ry="8" fill="#004D98" stroke="#A50044" stroke-width="4"/>
        <rect x="8" y="8" width="80" height="112" rx="5" fill="none" stroke="#A50044" stroke-width="1.5"/>
    </svg>`;
    return 'data:image/svg+xml;base64,' + btoa(svg);
}

export const CARDS = {
    cb: createSVG('circle', BLUE),
    cr: createSVG('circle', RED),
    sb: createSVG('star', BLUE),
    sr: createSVG('star', RED),
    mb: createSVG('moon', BLUE),
    mr: createSVG('moon', RED),
    back: createBack()
};