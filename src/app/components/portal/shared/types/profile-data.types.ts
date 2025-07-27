export type ProfileData = {
    headerData: {
        name: string;
        id?: string;
        idFieldName? : string;
        headerIcon: string;
    },
    profileDetails: {
        iconClass: string;
        fieldName: string;
        fieldValue: string;
    }[]
};