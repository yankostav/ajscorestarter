
export class Exception {
    date: Date;
    errorMessage: string;
    dateString: string;
    timeString: string;
}

export class Performance {
    date: Date;
    responseTime: number;
    dateString: string;
    timeString: string;
}

export class AnalyticsData {
    exceptions: Array<Exception>;
    performances: Array<Performance>;
    averageResponseTime: number;
}