export type FilterType = { 
    filterType: 'search' | 'type' | 'dateRange', 
    field: string, 
    label?: string, 
    options?: string[] 
};