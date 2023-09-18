import globalStyles from "../../themes/styles.tsx";

const baseButtonStyles = {
    button: {
        backgroundColor: globalStyles.colors.statusGood,
        color: globalStyles.colors.baseColor,
        padding: `${globalStyles.paddings.small} ${globalStyles.paddings.medium}`,
        borderRadius: globalStyles.paddings.small,
        fontWeight: globalStyles.fontWeight.bold,
        transition: 'background-color 0.3s',
        border: 'none',
        cursor: 'pointer',
        width: 'fit-content'
    },
}
const styles = {
    section: {
        marginBottom: globalStyles.margins.large
    },
    header: {
        fontSize: globalStyles.fontSize.large,
        fontWeight: globalStyles.fontWeight.bold,
        marginBottom: globalStyles.margins.medium,
        color: globalStyles.colors.h1,
    },
    header2: {
        fontSize: globalStyles.fontSize.medium,
        fontWeight: globalStyles.fontWeight.bold,
        marginBottom: globalStyles.margins.medium,
        color: globalStyles.colors.h1,
    },
    listItem: {
        padding: globalStyles.paddings.large,
        marginBottom: globalStyles.margins.medium,
        backgroundColor: globalStyles.colors.elevations[1],
        boxShadow: '0 4px 6px rgba(0, 0, 0, 0.1)',
        borderRadius: '0.375rem',
        listStyle: 'none',
    },
    flexBetween: {
        display: 'flex',
        justifyContent: 'space-between',
        marginBottom: globalStyles.margins.small,
    },
    fontSemiBold: {
        fontWeight: globalStyles.fontWeight.semiBold,
        marginBottom: globalStyles.margins.small
    },
    fontLarge: {
        fontSize: globalStyles.fontSize.medium,
        fontWeight: globalStyles.fontWeight.semiBold,
        color: globalStyles.colors.h2
    },
    textMain: {
        ...globalStyles.textBase,
        color: globalStyles.colors.h1,
    },
    textStatusOk: {
        ...globalStyles.textBase,
        color: globalStyles.colors.statusOk,
    },
    button: {
        ...baseButtonStyles.button,
    },
    buttonHover: {
        ...baseButtonStyles.button,
        backgroundColor: '#0a7c57'  // A darker shade of statusGood for hover effect
    }
};


export default styles;
