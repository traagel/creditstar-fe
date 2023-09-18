import React, {useState} from "react";
import {queryPaymentHistoryByUser} from "../../api/db.tsx";
import {User} from "../types";
import globalStyles from "../../themes/styles.tsx";

type Payment = {
    id: number;
    loan_id: bigint;
    amount: number; // double precision is typically represented as a number in TypeScript
    principle: number; // double precision as number
    interest: number; // double precision as number
    status: string; // character varying as string
    created_on: Date;
}

type PaymentHistoryProps = {
    user: User | null;
}

const styles = {
    section: {
        margin: 0,
        padding: 0,
    },
    header: {
        fontSize: globalStyles.fontSize.large,
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
        fontSize: globalStyles.fontSize.medium
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
    textStatusGood: {
        ...globalStyles.textBase,
        color: globalStyles.colors.statusGood,
    },
    textStatusOk: {
        ...globalStyles.textBase,
        color: globalStyles.colors.statusOk,
    },
    textStatusBad: {
        ...globalStyles.textBase,
        color: globalStyles.colors.statusBad,
    }
};

const PaymentHistory: React.FC<PaymentHistoryProps> = ({user}) => {

    const [payments, setPayments] = useState<Payment[]>([]);

    React.useEffect(() => {
        if (user && user.id) {
            // console.log('Querying payment history for user:', user.id);
            queryPaymentHistoryByUser(user.id)
                .then(payments => {
                    // sort by loan id, then by payment id, ascending
                    payments.sort((a, b) => {
                        if (a.loan_id < b.loan_id) {
                            return -1;
                        } else if (a.loan_id > b.loan_id) {
                            return 1;
                        } else {
                            return a.id - b.id;
                        }
                    });
                    setPayments(payments);
                    // console.log('Payment history changed to:', payments);
                }).catch(err => {
                if (err instanceof Error) {
                    // console.log(err.message);
                } else {
                    // console.log(err);
                }
            })
        } else {
            setPayments([]);
        }
    }, [user]);

    return (
        <section style={styles.section}>
            <h2 style={styles.header}>Payment History</h2>

            {payments && payments.length > 0 ? (
                <ul style={{margin: 0, padding: 0}}>
                    {payments.map((payment, index) => (
                        <li key={index} style={styles.listItem}>
                            <div style={styles.flexBetween}>
                                <span style={
                                    payment.status === 'on_time' ? styles.fontLarge : styles.fontLarge
                                }>Payment #{payment.id}</span>
                                <span style={
                                    payment.status === 'on_time' ? styles.textStatusGood :
                                        payment.status === 'pending' ? styles.textStatusOk :
                                            payment.status === 'overdue' ? styles.textStatusBad :
                                                styles.textStatusOk
                                }>
                                    {(payment.status.charAt(0).toUpperCase() + payment.status.slice(1)).replace('_', ' ')}
                            </span>
                            </div>
                            <div style={styles.flexBetween}>
                                <span style={styles.textMain}>Loan #{payment.loan_id.toString()}</span>
                                <span style={styles.textMain}>{new Date(payment.created_on).toDateString()}</span>
                            </div>
                            <div style={styles.flexBetween}>
                                <span style={styles.textMain}>Amount:</span>
                                <span style={styles.textMain}> ${payment.amount.toFixed(2)}</span>
                            </div>
                            <div style={styles.flexBetween}>
                                <span style={styles.textMain}>Principle:</span>
                                <span style={styles.textMain}> ${payment.principle.toFixed(2)}</span>
                            </div>
                            <div style={styles.flexBetween}>
                                <span style={styles.textMain}>Interest:</span>
                                <span style={
                                    payment.interest > 0 ? styles.textMain : styles.textMain
                                }> ${payment.interest.toFixed(2)}</span>
                            </div>
                        </li>
                    ))}
                </ul>
            ) : (
                <div style={{...styles.listItem, textAlign: 'center', color: '#4B5563'}}>
                    No payments found.
                </div>
            )}
        </section>
    );
}


export default PaymentHistory;
