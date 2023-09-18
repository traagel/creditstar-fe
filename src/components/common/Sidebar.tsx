// ts ignore the whole file
// @ts-ignore

import React from "react";
import {User} from "../types";
import {queryUser} from "../../api/db";
import {FaCommentDots, FaHistory, FaMoneyBillWave, FaQuestionCircle, FaTachometerAlt} from 'react-icons/fa';
import globalStyles from "../../themes/styles.tsx"; // Importing icons

interface SidebarProps {
    selectedItem: string;
    onSelectionChange: (item: string) => void;
    onUserChange: (user: User | null) => void;
}

const styles = {
    sidebar: {
        backgroundColor: globalStyles.colors.elevations[1],
        color: globalStyles.colors.h1,
        height: '100%',
        width: '16rem',
        position: 'sticky'
    },
    button: {
        backgroundColor: '#efca53', // '#3A3A3C
        color: globalStyles.colors.baseColor,
        padding: '0.5rem 1rem',
        borderRadius: '0.25rem',
        marginBottom: '1rem',
        cursor: 'pointer',
        border: 'none',
    },
    header: {
        fontSize: '1.25rem',
        fontWeight: 'bold',
        color: globalStyles.colors.h3,
        marginBottom: '1rem'
    },
    textGray: {
        color: globalStyles.colors.p
    },
    logoutButton: {
        backgroundColor: globalStyles.colors.elevations[2],
        color: globalStyles.colors.h1,
        padding: '0.5rem 1rem',
        borderRadius: '0.25rem',
        marginBottom: '1rem',
        cursor: 'pointer',
        transition: 'background-color 0.3s ease',
        border: 'none',
    },
    input: {
        flexGrow: 1,
        padding: '0.25rem',
        borderRadius: '0.25rem',
        border: `1px solid ${globalStyles.colors.elevations[2]}`,
        backgroundColor: globalStyles.colors.elevations[2],
        color: globalStyles.colors.h1,
        maxWidth: 'calc(100% - 6.25rem)',
        marginRight: '0.5rem'
    },
    goButton: {
        backgroundColor: globalStyles.colors.elevations[5],
        color: globalStyles.colors.h1,
        padding: '0.5rem 1rem',
        borderRadius: '0.25rem',
        cursor: 'pointer',
        transition: 'background-color 0.3s ease',
        border: 'none',
    },
    navItem: {
        display: 'flex',
        alignItems: 'center',
        padding: '0.5rem 1rem',
        cursor: 'pointer',
        transition: 'background-color 0.3s ease',
        color: globalStyles.colors.h1,
    }
}

// @ts-ignore
const Sidebar: React.FC<SidebarProps> = ({selectedItem, onSelectionChange, onUserChange, user}) => {
    const [personalCode, setPersonalCode] = React.useState('');

    return (
        // ts ignore all
        // @ts-ignore
        <aside style={styles.sidebar}>
            <div style={{
                marginBottom: '1rem',
                padding: '1rem',
            }}>
                <span style={{marginRight: '0.75rem', ...styles.textGray}}>Select User:</span>
                <div style={{marginBottom: '1rem', display: 'flex', alignItems: 'center'}}>
                    <input
                        type="text"
                        placeholder="Enter Personal Code"
                        style={styles.input}
                        value={personalCode}
                        onChange={e => setPersonalCode(e.target.value)}
                    />

                    <button style={{...styles.goButton}}
                            onClick={() => {
                                queryUser(personalCode)
                                    .then(user => {
                                        onUserChange(user);
                                        // console.log('User changed to:', user);
                                    });
                            }}
                    >
                        Go
                    </button>
                </div>

                <button style={styles.button} onClick={() => {
                    queryUser('344-17-0576')
                        .then(user => {
                            onUserChange(user);
                            // console.log('User changed to:', user);
                        });
                }}
                > Switch to Sample User
                </button>

                <div style={{marginBottom: '1rem'}}>
                    <h2 style={styles.header}>User:</h2>
                    <div>
                        {user?.id ? (
                            <span style={styles.textGray}>{user?.first_name} {user?.last_name}</span>
                        ) : (
                            <span style={styles.textGray}>None</span>
                        )}
                    </div>
                </div>
                {// @ts-ignore
                }
                <div style={{marginBottom: '1rem'}}>
                    <button style={{...styles.logoutButton}}
                            onClick={() => {
                                onUserChange(null);
                                // console.log('User changed to: null');
                            }}
                    >
                        Logout
                    </button>
                </div>


                <nav>
                    <ul style={{listStyleType: 'none', paddingLeft: 0}}>
                        {[
                            {name: 'Dashboard', icon: <FaTachometerAlt/>},
                            {name: 'Loan History', icon: <FaHistory/>},
                            {name: 'Payment History', icon: <FaMoneyBillWave/>},
                            {name: 'Help & FAQs', icon: <FaQuestionCircle/>},
                            {name: 'Feedback', icon: <FaCommentDots/>}
                        ].map(item => (
                            <li
                                key={item.name}
                                style={{
                                    ...styles.navItem,
                                    backgroundColor: item.name === selectedItem ?
                                        globalStyles.colors.elevations[4] :
                                        globalStyles.colors.elevations[1],
                                }}
                                onClick={() => onSelectionChange(item.name)}>
                                {item.icon && <span style={{marginRight: '0.5rem'}}>{item.icon}</span>}
                                {item.name}
                            </li>
                        ))}
                    </ul>
                </nav>
            </div>
        </aside>
    );
}

export default Sidebar;
