import { SqlResponse } from './sql';

type SurveyResponseGroup = SqlResponse<{ group: string; count: string }>;

export type SurveyResponsesByAgeResponse = SurveyResponseGroup;
export type SurveyResponsesByGenderResponse = SurveyResponseGroup;

export type EligibilityQualificationsResponse = SqlResponse<{
  group: string;
  value: string;
  totalValue: string;
}>;

export type AvgHeartRateFluctuationsResponse = SqlResponse<{
  name: string;
  dataKey: string;
  value: string;
}>;

export type ParticipantItemId = string;

export type GetParticipantHeartRateRequest = {
  startTime: string;
  endTime: string;
};

export type GetAverageParticipantHeartRateRequest = {
  startTime: string;
  endTime: string;
};

export type AverageStepCountSqlRow = {
  gender: string;
  day_of_week: string;
  steps: string;
};

export type ProfileAttribute = {
  key?: 'email' | 'age' | 'gender';
  value?: string;
};

export type HealthDataOverview = {
  userId?: string;
  averageSleep?: number;
  lastSyncTime?: string;
  latestAverageHR?: number;
  latestAverageSystolicBP?: number;
  latestAverageDiastolicBP?: number;
  latestTotalStep?: number;
  profiles?: ProfileAttribute[];
};

export type HealthDataOverviewSortDirection = 'ASC' | 'DESC';

export type HealthDataOverviewSortColumn =
  | 'ID'
  | 'EMAIL'
  | 'AVG_HR'
  | 'TOTAL_STEPS'
  | 'LAST_SYNCED';

export interface HealthDataOverviewSort {
  column: HealthDataOverviewSortColumn;
  direction: HealthDataOverviewSortDirection;
}

export type HealthDataOverviewParams = {
  limit: number;
  offset: number;
  sort: HealthDataOverviewSort;
};

export type HealthDataOverviewResponse = {
  healthDataOverview: HealthDataOverview[];
};

export type HealthDataOverviewOfUserResponse = {
  healthDataOverviewOfUser: HealthDataOverview;
};

export type CountTableRowsResponse = {
  count: number;
};

type HeartRate = {
  time?: string;
  bpm?: number;
};

type HealthData = {
  userId?: string;
  profiles?: ProfileAttribute[];
  heartRates?: HeartRate[];
};

type AverageHealthData = {
  userId?: string;
  lastSyncTime?: string;
  profiles?: ProfileAttribute[];
  averageHR?: number;
};

export type RawHealthDataResponse = {
  rawHealthData: HealthData[];
};

export type AverageHealthDataResponse = {
  averageHealthData: AverageHealthData[];
};
