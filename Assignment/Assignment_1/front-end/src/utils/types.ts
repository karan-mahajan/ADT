import { Dispatch, ElementType, ReactElement, SetStateAction } from 'react';
import { errorMessage } from './constants';

export type NavLink = '/company' | '/home' | '/individual' | '/squad';
export type NavText = 'Companies' | 'Home' | 'Individual Leaderboard' | 'Squad Leaderboard';
export type Button = 'button' | 'submit' | 'reset' | undefined;
export type CardColorClass = 'alpha' | 'beta' | 'gamma';
export type DonutValues = {
  color: string;
  id: string;
  name: string;
  value: number;
};

export type AppRoles = 'admin' | 'company_admin' | 'team_admin';

export type UserDetails = {
  firstName: string;
  companyId: string;
  lastName: string;
  roleName: AppRoles | '';
  teamId: string;
};

export type SortValues = 'Steps' | 'Workouts' | 'Check-Ins' | 'Meal Logs' | 'Total Points';

export type CompanyStat = {
  companyName: string;
  totalStepAssigned: number;
  stepsCount: number;
  averageStepCount: number;
  mealLogCount: number;
  mealLogPoint: number;
  workoutCount: number;
  workoutPoint: number;
  checkinCount: number;
  checkinPoint: number;
  bonusPoint: number;
  totalUsers: number;
  totalPoint: number;
  bodyWeightDelta: number;
};

export type ErrorKey = keyof typeof errorMessage | '';

export type TableHeader = {
  name: string;
  align?: string;
};

export interface NavList {
  id: number;
  name: NavText;
  path: `/app${NavLink}`;
}

export interface NavItemProps {
  logo?: ReactElement;
  path: `/app${NavLink}`;
  text: NavText;
}

export interface FormErrors {
  email: string;
  password: string;
}

export interface InputProps {
  errors: FormErrors;
  label: string;
  name: 'email' | 'password';
  placeholder: string;
  // eslint-disable-next-line no-unused-vars
  setValue: (e: any) => void;
  type: string;
  value: string | number;
}

export interface ButtonProps {
  type: Button;
  value: string;
  variant?: string;
  customClass?: string;
  buttonClicked?: () => void;
  beforeIcon?: ReactElement;
  afterIcon?: ReactElement;
}

export interface DonutChartProps {
  colors?: Array<string>;
  data: Array<DonutValues>;
  logo: ReactElement;
  title: string;
}

export interface DonutFooterProps {
  data: DonutValues;
}

export interface CardProps {
  color?: CardColorClass;
  colorShape?: string;
  icon?: ReactElement;
  name: string;
  score: number;
}

export interface TableProps {
  activeRow?: number;
  boldColumn?: number;
  customClassName?: string;
  // eslint-disable-next-line no-unused-vars
  onRowClick?: (row: any) => void;
  tableHeader: Array<TableHeader>;
  tableData: Array<any>;
}

// TODO
export interface BargraphProps {
  data: Array<any>;
}

export interface BarContainerProps {
  heading: string;
  footer: string;
  score: number;
}

export interface SelectBoxProps {
  customText?: string;
  values: Array<string | number>;
  className?: string;
  // eslint-disable-next-line no-unused-vars
  handleChange?: (e: any) => void;
  icon?: ElementType;
  value?: string | number;
}

export interface PaginationProps {
  currentPage: number;
  changePage: Dispatch<SetStateAction<number>>;
  totalPages: Array<number>;
}

export interface DatepickerProps {
  applyFilters?: () => void;
  setStartDate: Dispatch<SetStateAction<Date>>;
  startDate: Date;
}

export interface ErrorMessageProps {
  icon?: ReactElement;
  text: string;
}

export interface OverviewProps {
  activeUsers: Array<DonutValues>;
  companyScore: Array<DonutValues>;
  genderRatio: Array<DonutValues>;
}

export interface OverAllCompanyStats {
  activeUsers: number;
  bodyWeightDelta: number;
  bonusPoint: number;
  checkinPoint: number;
  companyName: string;
  femaleCount: number;
  maleCount: number;
  mealLogPoint: number;
  otherGenderCount: number;
  stepsPoint: number;
  totalPoint: number;
  totalUsers: number;
  workoutPoint: number;
}

export interface Payload {
  audience?: string;
  client_id?: string;
  client_secret?: string;
  grant_type?: string;
  password: string;
  username: string;
}

export interface PermissionResponse {
  commission: number;
  companyId: string;
  createdAt: Date;
  currentUserId: string;
  id: string;
  roleName: AppRoles | '';
  status: string;
  teamId: string;
  traineeUserId: null;
  updatedAt: Date;
}

export interface CompanyStatProps {
  companyStat: CompanyStat;
}

export interface CompanyDetails {
  companyId: string;
  name: string;
  status: string;
  createdAt: Date;
  updatedAt: Date;
}

export interface CompanyLeaderboardTeamData {
  rank: number;
  teamName: string;
  teamPoint: number;
  totalUsers: number;
}

export interface CompanyLeaderboardProps {
  leaderboardData: Array<CompanyLeaderboardTeamData>;
}

export interface SquadLeaderboardRow {
  rank: number;
  teamName: string;
  totalPoint: number;
}

export interface LoadingCircleProps {
  openLoader: boolean;
  className?: string;
}

export interface TeamStats {
  averageStepCount: number;
  bodyWeightDelta: number;
  bonusPoint: number;
  checkinPoint: number;
  checkinCount: number;
  mealLogCount: number;
  mealLogPoint: number;
  stepsCount: number;
  teamName: string;
  totalPoint: number;
  totalUsers: number;
  workoutCount: number;
  workoutPoint: number;
}

export interface TeamDetails {
  companyId: string;
  createdAt: string;
  name: string;
  status: string;
  teamId: string;
  updatedAt: Date;
}

export interface TeamMemberStats {
  checkins: number;
  meallogs: number;
  memberName: string;
  steps: number;
  totalPoints: number;
  workout: number;
}

export interface MembersData {
  checkins: number;
  meallogs: number;
  memberName: string;
  rank: number;
  steps: number;
  teamName: string;
  totalPoints: number;
  workout: number;
}

export interface CompanyBoardData {
  companyId: string;
  companyName: string;
  steps: number;
  workouts: number;
  checkins: number;
  mealLogs: number;
  totalPoints: number;
  totalUsers: number;
}

export interface TeamStatsResponse {
  averageStepCount: number;
  bodyWeightDelta: number;
  bonusPoint: number;
  checkinCount: number;
  checkinPoint: number;
  companyId: string;
  companyName: string;
  mealLogCount: number;
  mealLogPoint: number;
  stepsCount: number;
  stepsPoint: number;
  teamId: string;
  teamName: string;
  totalPoint: number;
  totalUsers: number;
  workoutCount: number;
  workoutPoint: number;
}

export interface LeaderboardResponse {
  list: Array<TeamStatsResponse>;
  totalCount: number;
}

export interface CompanyUserResponse {
  averageStepCount: number;
  bodyWeight: number;
  bodyWeightDelta: number;
  bonusPoint: number;
  checkInCount: number;
  checkInPoint: number;
  companyName: string;
  email: string;
  firstName: string;
  lastName: string;
  mealLogCount: number;
  mealLogPoint: number;
  stepsCount: number;
  stepsPoint: number;
  teamName: string;
  totalPoint: number;
  userId: string;
  workoutCount: number;
  workoutPoint: number;
}

export interface AllCompaniesResponse {
  activeUsers: string;
  averageStepCount: number;
  bonusPoint: number;
  checkinCount: number;
  checkinPoint: number;
  companyId: string;
  companyName: string;
  companyOverallStatId: string;
  createdAt: Date;
  femaleCount: number;
  maleCount: number;
  mealLogCount: number;
  mealLogPoint: number;
  otherGenderCount: number;
  stepsCount: number;
  stepsPoint: number;
  totalPoint: number;
  totalUsers: number;
  updatedAt: Date;
  workoutCount: number;
  workoutPoint: number;
}

export interface NavPath {
  COMPANY: `/app${NavLink}`;
  HOME: `/app${NavLink}`;
  SQUAD: `/app${NavLink}`;
  INDIVIDUAL: `/app${NavLink}`;
}
