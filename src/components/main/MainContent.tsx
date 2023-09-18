import Dashboard from './Dashboard';
import LoanHistory from './LoanHistory';
import Feedback from './Feedback';
import Faqs from './Faqs';
import PaymentHistory from './PaymentHistory';
import React from "react";
import {User} from "../types";
import globalStyles from "../../themes/styles.tsx";

interface MainContentProps {
    selectedItem: string;
    user: User | null;
}

// @ts-ignore
const styles = {
    display: 'flex',
    flexDirection: 'column' as 'column',
    width: '800px',
    margin: '0 auto',
    padding: globalStyles.paddings.medium,
    borderRadius: globalStyles.paddings.small,
    boxShadow: '0px 0px 15px rgba(0, 0, 0, 0.1)', // This is an approximation of shadow-xl
    marginTop: globalStyles.margins.large,
    marginBottom: globalStyles.margins.large,
    overflowY: 'auto' as 'auto',
};


const MainContent: React.FC<MainContentProps> = ({selectedItem, user}) => {

    return (
        <main style={styles}>
            {selectedItem === 'Dashboard' && <Dashboard user={user}/>}
            {selectedItem === 'Loan History' && <LoanHistory user={user}/>}
            {selectedItem === 'Feedback' && <Feedback/>}
            {selectedItem === 'Help & FAQs' && <Faqs/>}
            {selectedItem === 'Payment History' && <PaymentHistory user={user}/>}
        </main>

    );
}


export default MainContent;
