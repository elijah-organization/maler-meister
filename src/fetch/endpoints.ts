export const constructionById = (id: number | string) => `constructions/${id}`;
export const constructions = (query: string) => `constructions/?${query}`;

export const appJobById = (id: number | string) => `jobs/${id}`;
export const appJobs = (query: string) => `jobs/?${query}`;

export const bgbServiceById = (id: number | string) => `bgb-services/${id}`;
export const bgbServices = (query: string) => `bgb-services/?${query}`;

export const printSettingById = (id: number | string) => `print-settings/${id}`;
export const printSettings = (query: string) => `print-settings/?${query}`;

export const offerById = (id: number | string) => `offers/${id}`;
export const offers = (query: string) => `offers/?${query}`;

export const dailyEntries = (query: string) => `daily-entries/?${query}`;
export const users = (query: string) => `users/?${query}`;
