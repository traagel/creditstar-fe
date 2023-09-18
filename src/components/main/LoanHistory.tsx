import {Loan, User} from "../types";
import {queryLoanHistory} from "../../api/db.tsx";
import React, {useState} from "react";
import globalStyles from "../../themes/styles.tsx";

interface LoanHistoryProps {
    user: User | null;
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
    button: {
        padding: globalStyles.paddings.medium,
        borderRadius: globalStyles.paddings.small,
        marginRight: globalStyles.margins.small,
        borderColor: globalStyles.colors.elevations[2],
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
    },
    textYellow: {
        color: '#FFC107',
        fontWeight: globalStyles.fontWeight.bold,
        fontSize: globalStyles.fontSize.small
    }
};


const LoanHistory: React.FC<LoanHistoryProps> = ({user}) => {

    const [loans, setLoans] = React.useState<Loan[]>([]);
    const [filteredLoans, setFilteredLoans] = useState<Loan[]>([]);
    const [currentFilter, setCurrentFilter] = useState<string | null>(null);

    React.useEffect(() => {
        if (user && user.id) {
            // console.log('Querying loan history for user:', user);
            queryLoanHistory(user.id)
                .then(loans => {
                    setLoans(loans);
                    setFilteredLoans(loans);  // Set filteredLoans to all loans by default
                    // console.log('Loan history changed to:', loans);
                });
        } else {
            setLoans([]);
            setFilteredLoans([]);
        }
    }, [user]);

    const filterLoans = (status: string) => {
        if (currentFilter === status) { // If the current filter is the same as the selected filter
            setFilteredLoans(loans); // Reset to show all loans
            setCurrentFilter(null); // Reset current filter
        } else {
            const filtered = loans.filter(loan => loan.status === status);
            setFilteredLoans(filtered);
            setCurrentFilter(status); // Update current filter
        }
    }

    return (
        <section style={styles.section}>
            <h2 style={styles.header}>Loan History</h2>
            <div style={{marginBottom: '1rem'}}>
                <button style={{...styles.button, backgroundColor: '#17A2B8', color: globalStyles.colors.baseColor}}
                        onClick={() => filterLoans('active')}>Active
                </button>
                <button style={{...styles.button, backgroundColor: '#28A745', color: globalStyles.colors.baseColor}}
                        onClick={() => filterLoans('paid')}>Paid
                </button>
                <button style={{...styles.button, backgroundColor: '#DC3545', color: globalStyles.colors.baseColor}}
                        onClick={() => filterLoans('overdue')}>Overdue
                </button>
                <button style={{...styles.button, backgroundColor: '#FFC107', color: globalStyles.colors.baseColor}}
                        onClick={() => filterLoans('application')}>Application
                </button>
            </div>


            {filteredLoans && filteredLoans.length > 0 ? (
                <ul style={{margin: 0, padding: 0}}>
                    {filteredLoans.map((loan, index) => (
                        <li key={index} style={styles.listItem}>
                            <div style={styles.flexBetween}>
                                <span style={styles.fontLarge}>Loan #{loan.id}</span>
                                <span style={styles.textMain}> {loan.created_on.toDateString()}</span>
                            </div>
                            <div style={styles.flexBetween}>
                                <span style={styles.textMain}>Amount:</span>
                                <span style={styles.textMain}> ${loan.amount}</span>
                            </div>
                            <div style={styles.flexBetween}>
                                <span style={styles.textMain}>Duration:</span>
                                <span style={styles.textMain}> {loan.duration} days</span>
                            </div>
                            <div style={styles.flexBetween}>
                                <span style={styles.textMain}>Matured On:</span>
                                <span style={styles.textMain}> {loan.matured_on.toDateString()}</span>
                            </div>
                            <div style={styles.flexBetween}>
                                <span style={styles.textMain}>Updated On:</span>
                                <span style={styles.textMain}> {loan.updated_on.toDateString()}</span>
                            </div>
                            <div style={styles.flexBetween}>
                                <span style={styles.textMain}>Status:</span>
                                <span style={
                                    loan.status === 'paid' ? styles.textStatusGood :
                                        loan.status === 'active' ? styles.textStatusOk :
                                            loan.status === 'overdue' ? styles.textStatusBad :
                                                loan.status === 'application' ? styles.textYellow : styles.textMain
                                }>
                        {loan.status.charAt(0).toUpperCase() + loan.status.slice(1)}
                    </span>
                            </div>
                        </li>
                    ))}
                </ul>
            ) : (<ul style={{margin: 0, padding: 0}}>
                    <li style={styles.listItem}>
                        <div style={styles.flexBetween}>
                            <span style={styles.fontLarge}>No loans found</span>
                        </div>
                    </li>
                </ul>

            )}
        </section>

    );
}


export default LoanHistory;
