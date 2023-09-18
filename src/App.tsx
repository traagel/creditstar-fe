/* eslint-disable */

import MainContent from "./components/main/MainContent.tsx";
import Sidebar from "./components/common/Sidebar.tsx";
import {CSSProperties, useState} from "react";
import {User} from "./components/types";
import globalStyles from "./themes/styles.tsx";

const styles: Record<string, CSSProperties> = {
    appContainer: {
        display: 'flex',
        flexDirection: 'column',
        flex: 1,
        padding: '0',
        margin: '0',
        fontFamily: 'Inter, sans-serif',
        backgroundColor: globalStyles.colors.baseColor,
        height: '100vh',  // Use viewport height to ensure full coverage
        minHeight: '100%' // Ensure it covers at least 100% of the viewport height
    },
    mainContainer: {
        display: 'flex',
        width: '100%',
        minHeight: '100%', // Allow it to grow with content
    },
    contentContainer: {
        display: 'flex',
        flexDirection: 'column',
        width: '800px',
        margin: '0 auto',
        minHeight: '100%', // Allow it to grow with content
        backgroundColor: globalStyles.colors.baseColor, // Apply the background color here too
    }
};


function App() {
    const [selectedItem, setSelectedItem] = useState('Dashboard');
    const [user, setUser] = useState<User | null>(null);

    return (
        <div style={styles.appContainer}>
            {/* <Header user={user} /> */}
            <div style={styles.mainContainer}>
                <Sidebar
                    selectedItem={selectedItem}
                    onSelectionChange={setSelectedItem}
                    onUserChange={setUser}
                    // @ts-ignore
                    user={user}
                />
                <div style={styles.contentContainer}>
                    <MainContent
                        selectedItem={selectedItem}
                        user={user}
                    />
                    {/* <Footer/> */}
                </div>
            </div>
        </div>
    );
}

export default App;
