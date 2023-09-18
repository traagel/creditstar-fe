import React from 'react';
import globalStyles from "../../themes/styles.tsx";

const styles = {
    section: {
        marginBottom: globalStyles.margins.large
    },
    header: {
        fontSize: globalStyles.fontSize.large,
        fontWeight: globalStyles.fontWeight.bold,
        marginBottom: globalStyles.margins.medium,
        color: globalStyles.colors.h1
    },
    textarea: {
        border: `1px solid ${globalStyles.colors.h3}`,
        width: '80%',
        padding: globalStyles.paddings.medium,
        marginBottom: globalStyles.margins.medium,
        borderRadius: globalStyles.paddings.small,
        fontSize: globalStyles.fontSize.medium,
        color: globalStyles.colors.p,
        backgroundColor: globalStyles.colors.elevations[1],
    },
    submitButton: {
        backgroundColor: globalStyles.colors.statusGood,
        color: globalStyles.colors.baseColor,
        padding: `${globalStyles.paddings.small} ${globalStyles.paddings.medium}`,
        borderRadius: globalStyles.paddings.small,
        fontWeight: globalStyles.fontWeight.bold,
        transition: 'background-color 0.3s',
        '&:hover': {
            backgroundColor: '#0a7c57'  // A darker shade of statusGood for hover effect
        },
        border: 'none',
        cursor: 'pointer',
        width: 'fit-content'
    }
};


const Feedback = () => {
    return (
        <section style={styles.section}>
            <h2 style={styles.header}>Feedback</h2>
            <div style={{
                marginBottom: globalStyles.margins.medium,
                padding: globalStyles.paddings.medium,
                backgroundColor: globalStyles.colors.elevations[1],
                boxShadow: '0 4px 6px rgba(0, 0, 0, 0.1)',
                borderRadius: '0.375rem',
                display: 'flex',
                flexDirection: 'column' as 'column',

            }}>
            <textarea
                style={styles.textarea}
                rows={5}
                placeholder="Submit your feedback">
            </textarea>
                <button style={styles.submitButton}>Submit</button>
            </div>
        </section>
    );
}


export default Feedback;
