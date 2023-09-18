import {predictUserLoan, queryUnpaidLoansByUser} from "../../api/db.tsx";
import React, {useState} from "react";

import styles from './DashboardStyles.tsx';
import globalStyles from "../../themes/styles.tsx";

// @ts-ignore
const modalStyles = {
    modal: {
        position: 'fixed' as 'fixed',
        top: '50%',
        left: '50%',
        transform: 'translate(-50%, -50%)',
        zIndex: 1000,
        backgroundColor: globalStyles.colors.elevations[1],
        padding: globalStyles.paddings.large,
        borderRadius: '0.375rem',
        boxShadow: '0 4px 6px rgba(0, 0, 0, 0.1)',
        width: '80%',
        maxWidth: '500px',
    },
    // @ts-ignore
    modalBackdrop: {
        // @ts-ignore
        position: 'fixed' as 'fixed',
        top: 0,
        left: 0,
        width: '100vw',
        height: '100vh',
        backgroundColor: 'rgba(0, 0, 0, 0.7)',
        zIndex: 999
    },
    input: {
        ...globalStyles.textBase,  // Inheriting base text styles for consistency
        display: 'block',
        margin: globalStyles.margins.medium,
        padding: globalStyles.paddings.medium,
        width: '80%',
        borderRadius: '0.375rem',
        border: 0,
    },
    button: {
        ...globalStyles.textBase,  // Inheriting base text styles for consistency
        margin: globalStyles.margins.medium,
        padding: globalStyles.paddings.medium,
        backgroundColor: globalStyles.colors.statusGood,
        transition: 'background-color 0.3s',
        border: 0,
        borderRadius: '0.375rem',
    },
    buttonClose: {
        ...globalStyles.textBase,  // Inheriting base text styles for consistency
        margin: globalStyles.margins.medium,
        padding: globalStyles.paddings.medium,
        backgroundColor: globalStyles.colors.elevations[5],
        transition: 'background-color 0.3s',
        border: 0,
    },
    spinner: {
        border: '4px solid rgba(0, 0, 0, 0.1)',  // Transparent border for the spinner
        borderTop: '4px solid #007BFF',          // Blue color for the top of the spinner
        borderRadius: '50%',
        width: '50px',
        height: '50px',
        animation: 'spin 1s linear infinite'
    },

};
const Dashboard = ({user}) => {
    const [loans, setLoans] = useState([]);
    const [isHovered, setIsHovered] = useState(false);
    const [showModal, setShowModal] = useState(false);
    const [loanAmount, setLoanAmount] = useState("");
    const [loanDays, setLoanDays] = useState("");
    const [submitStatus, setSubmitStatus] = useState('idle'); // 'idle', 'loading', 'success', 'failed'
    const handleMouseOver = () => {
        setIsHovered(true);
    };

    const handleMouseOut = () => {
        setIsHovered(false);
    };


    const handleSubmitLoan = () => {
        if (loanAmount === "" || loanDays === "") {
            alert("Please fill in all fields");
            return;
        }
        if (isNaN(Number(loanAmount)) || isNaN(Number(loanDays))) {
            alert("Please enter valid numbers");
            return;
        }
        if (Number(loanAmount) < 0 || Number(loanDays) < 0) {
            alert("Please enter positive numbers");
            return;
        }
        if (user === null) {
            alert("Please login first");
            return;
        }
        setSubmitStatus('loading');

        predictUserLoan(user.id)
            .then(response => {
                console.log(response);
                if (response.outcome === "1") {
                    setSubmitStatus('success');
                } else {
                    setSubmitStatus('failed');
                }
            })
            .catch(e => {
                // TODO: Handle error
                console.log(e);
                setSubmitStatus('failed');
            });
    };


    React.useEffect(() => {
        if (user && user.id) {
            queryUnpaidLoansByUser(user.id)
                .then(r => {
                    setLoans(r);
                })
                .catch(e => {
                    // TODO: Handle error
                });
        } else {
            setLoans([]);
        }
        setSubmitStatus('idle');

    }, [user]);


    return (
        <section style={styles.section}>
            <h2 style={styles.header}>Dashboard</h2>
            <div style={styles.listItem}>
                <h3 style={styles.textMain}>Active Loans</h3>
                {loans.length === 0 ? (
                    <p style={styles.textMain}>No active loans</p>
                ) : (
                    <>
                        <div style={styles.flexBetween}>
                            <p style={styles.textMain}>Loan ID</p>
                            <p style={styles.textMain}>Amount</p>
                            <p style={styles.textMain}>Interest</p>
                            <p style={styles.textMain}>Duration</p>
                            <p style={styles.textMain}>Status</p>
                        </div>
                        {loans.map((loan, index) => (
                            <div key={index} style={styles.flexBetween}>
                                <p style={styles.fontLarge}>{loan.id}</p>
                                <p style={styles.fontLarge}>{loan.amount}</p>
                                <p style={styles.fontLarge}>{loan.interest}</p>
                                <p style={styles.fontLarge}>{loan.duration}</p>
                                <p style={styles.textStatusOk}>Active</p>
                            </div>
                        ))}
                    </>
                )}
            </div>
            <button
                style={isHovered ? styles.buttonHover : styles.button}
                onMouseOver={handleMouseOver}
                onMouseOut={handleMouseOut}
                onClick={() => setShowModal(true)}
            >
                Submit New Loan
            </button>
            {showModal && (
                <>
                    <div style={modalStyles.modalBackdrop} onClick={() => setShowModal(false)}></div>
                    <div style={modalStyles.modal}>
                        <h3 style={styles.header}>Submit New Loan</h3>

                        {submitStatus === 'idle' && (
                            <>
                                <label style={styles.header2}>
                                    Amount:
                                    <input
                                        type="text"
                                        style={modalStyles.input}
                                        value={loanAmount}
                                        placeholder={'Enter loan amount'}
                                        onChange={(e) => setLoanAmount(e.target.value)}
                                    />
                                </label>
                                <label style={styles.header2}>
                                    Number of Days:
                                    <input
                                        type="text"
                                        style={modalStyles.input}
                                        value={loanDays}
                                        placeholder={'Enter number of days'}
                                        onChange={(e) => setLoanDays(e.target.value)}
                                    />
                                </label>
                                <button style={modalStyles.button} onClick={handleSubmitLoan}>
                                    Submit
                                </button>
                                <button style={modalStyles.buttonClose} onClick={() => setShowModal(false)}>
                                    Close
                                </button>
                            </>
                        )}

                        {submitStatus === 'loading' && (
                            <div style={modalStyles.spinner}></div>
                        )}

                        {submitStatus === 'success' && (
                            <p style={{
                                color: globalStyles.colors.statusGood,
                            }}>
                                Loan request successful!</p>
                        )}

                        {submitStatus === 'failed' && (
                            <p
                                style={{
                                    color: globalStyles.colors.statusBad,
                                }}
                            >Loan request failed. Please contact us for more information.</p>
                        )}
                    </div>
                </>
            )}
        </section>
    );
}


export default Dashboard;
