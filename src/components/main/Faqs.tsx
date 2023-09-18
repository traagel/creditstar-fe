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
    faqContainer: {
        marginBottom: globalStyles.margins.medium
    },
    faqTitle: {
        marginBottom: globalStyles.margins.small,
        fontWeight: globalStyles.fontWeight.semiBold,
        color: globalStyles.colors.h2
    },
    faqContent: {
        fontSize: globalStyles.fontSize.medium,
        color: globalStyles.colors.p
    },
    listItem: {
        padding: globalStyles.paddings.large,
        marginBottom: globalStyles.margins.medium,
        backgroundColor: globalStyles.colors.elevations[1],
        boxShadow: '0 4px 6px rgba(0, 0, 0, 0.1)',
        borderRadius: '0.375rem',
        listStyle: 'none',
    },
};

const questions = [
    'How do I apply for a loan?',
    'How long does the loan approval process take?',
    'Can I make early repayments?',
    'What happens if I miss a payment?',
    'How can I check the status of my loan application?',
];

const answers = [
    'Click on the "Submit New Loan" button on the Dashboard.',
    'Typically, the loan approval process takes 2-5 business days. However, it can vary depending on the loan amount and other factors.',
    'Yes, you can make early repayments without any penalties. Please ensure to notify our team in advance.',
    'If you miss a payment, additional interest may be charged. It\'s important to contact our support team if you foresee any payment difficulties.',
    'You can check the status of your loan application by logging into your account and navigating to the "My Loans" section.'
];

const Faqs = () => {
    return (
        <section style={styles.section}>
            <h2 style={styles.header}>Help & FAQs</h2>
            <div style={styles.faqContainer}>
                <ul style={{margin: 0, padding: 0}}>

                    {questions.map((question, index) => (

                        <li style={styles.listItem} key={index}>
                            <h3 style={styles.faqTitle}>{question}</h3>
                            <p style={styles.faqContent}>{answers[index]}</p>
                        </li>

                    ))}
                </ul>
            </div>
        </section>
    );
}

export default Faqs;

