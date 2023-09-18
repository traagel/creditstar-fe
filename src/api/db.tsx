import axios from 'axios';

const api = axios.create({
    baseURL: 'http://127.0.0.1:5000/api/v1/data',
    headers: {
        'Content-Type': 'application/json',
    },
});

export const queryUser = async (personalCode) => {
    if (!personalCode) {
        return null;
    }
    try {
        const response = await api.get(`/users/${personalCode}`);
        if (response && response.status === 404) {
            return null;
        }
        return response.data;
    } catch (error) {
        if (error.response && error.response.status === 404) {
            return null;
        }
        console.error("Error querying user:", error);
        throw error;
    }
}


export const queryLoanHistory = async (client_id: number) => {
    if (!client_id) {
        return null;
    }
    try {
        const response = await api.get(`/users/${client_id}/loans`);
        if (response.status === 404) {
            return [];
        }
        return response.data;
    } catch (error) {
        if (error.response && error.response.status === 404) {
            return [];
        }
        throw error;
    }
}

export const queryPaymentHistoryByUser = async (user_id: number) => {
    if (!user_id) {
        return null;
    }
    try {
        const response = await api.get(`/users/${user_id}/payments`);
        if (response.status === 404) {
            return [];
        }
        return response.data;
    } catch (error) {
        if (error.response && error.response.status === 404) {
            return [];
        }
        throw error;
    }
}

export const queryUnpaidLoansByUser = async (user_id: string) => {
    if (!user_id) {
        return null;
    }

    try {
        const response = await api.get(`/users/${user_id}/unpaid_loans`);

        if (response.status === 404) {
            return [];
        }


        return response.data;
    } catch (error) {
        if (error.response && error.response.status === 404) {
            return [];
        } else {
            throw error;
        }
    }
}

export const predictUserLoan = async (user_id: string) => {
    if (!user_id) {
        return null;
    }

    try {
        const response = await api.get(`/users/${user_id}/predict`);

        if (response.status === 404) {
            return [];
        }

        return response.data;

    } catch (error) {
        if (error.response && error.response.status === 404) {
            return [];
        } else {
            throw error;
        }
    }
}
