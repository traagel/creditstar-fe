interface User {
    id: number;
    created_on: Date;
    first_name: string;
    last_name: string;
    birth_date: Date;
    personal_code: string;
    loan_ids: number[];
}

interface Loan {
    amount: number;
    client_id: number;
    created_on: Date;
    duration: number;
    id: number;
    matured_on: Date;
    status: string;
    updated_on: Date;
}


export type {User, Loan};
