const baseColor = "#121212";

const generateElevationColors = (base, levels) => {
    let currentBase = parseInt(base.slice(1), 16); // Convert hex to integer
    const elevations = [];

    for (let i = 0; i < levels; i++) {
        currentBase += 0x0A0A0A; // Increment color value
        elevations.push(`#${currentBase.toString(16).padStart(6, '0')}`); // Convert integer back to hex
    }

    return elevations;
};


const elevations = generateElevationColors(baseColor, 12);

const colors = {
    baseColor,
    elevations,
    h1: "#E1E1E1",
    h2: "#D1D1D1",
    h3: "#C1C1C1",
    p: "#B0B0B0",
    statusGood: "#10B981",
    statusOk: "#FBBF24",
    statusBad: "#EF4444",
}


const globalStyles = {
    colors,
    fontSize: {
        large: '2rem',
        medium: '1.125rem',
        small: '1.25rem'
    },
    fontWeight: {
        bold: 'bold',
        semiBold: '600'
    },
    textBase: {
        fontSize: '1.125rem'
    },
    margins: {
        small: '0.5rem',
        medium: '1rem',
        large: '2rem'
    },
    paddings: {
        small: '0.5rem',
        medium: '1rem',
        large: '2rem'
    }
};


export default globalStyles;
