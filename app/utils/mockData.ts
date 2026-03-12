type UserRecord = {
  status: "Client" | "Staff";
  recruitedStatus: "Yes" | "No";
};

type StatsRecord = {
  state?: string;
  gender?: string;
  requestType?: string;
  clients: number;
  workers: number;
};

export function generateMockUsers(count: number): UserRecord[] {
  return Array.from({ length: count }, (_, i) => ({
    status: i % 2 === 0 ? "Client" : "Staff",
    recruitedStatus: i % 3 === 0 ? "No" : "Yes",
  }));
}

export function generateStatisticsData(): StatsRecord[] {
  const byState: StatsRecord[] = [
    { state: "Lagos", clients: 120, workers: 80 },
    { state: "Abuja", clients: 90, workers: 60 },
    { state: "Rivers", clients: 70, workers: 45 },
    { state: "Oyo", clients: 65, workers: 40 },
    { state: "Kano", clients: 55, workers: 38 },
    { state: "Enugu", clients: 48, workers: 30 },
    { state: "Kaduna", clients: 42, workers: 28 },
    { state: "Delta", clients: 37, workers: 24 },
  ];
  const byGender: StatsRecord[] = [
    { gender: "Female", clients: 210, workers: 160 },
    { gender: "Male", clients: 180, workers: 130 },
  ];
  const byRequestType: StatsRecord[] = [
    { requestType: "Nanny", clients: 95, workers: 72 },
    { requestType: "Driver", clients: 86, workers: 61 },
    { requestType: "Housekeeper", clients: 76, workers: 58 },
    { requestType: "Chef", clients: 52, workers: 40 },
  ];
  return [...byState, ...byGender, ...byRequestType];
}
