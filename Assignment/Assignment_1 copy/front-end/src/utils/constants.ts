import { NavPath } from './types';

export const emailReg = /^([A-Za-z0-9_\-.])+@([A-Za-z0-9_\-.])+\.([A-Za-z]{2,4})$/;

export const errorMessage = {
  COMPANY_STATS_API_ERROR_MESSAGE: 'Failed to fetch the company details, please try again!!',
  EMPTY_EMAIL: 'Email cannot be blank',
  EMPTY_PASSWORD: 'Password cannot be blank',
  END_DATE_GREATER: `End Date cannot be greater than today's date`,
  INDIVIDUAL_LEADERBOARD_API_ERROR_MESSAGE:
    'Failed to fetch the individual squad members details, please try again!!',
  INVALID_EMAIL: 'Invalid Email Address',
  LEADERBOARD_API_ERROR_MESSAGE: 'Failed to fetch company squad details, please try again!!',
  LIST_COMPANY_API_ERROR_MESSAGE: 'Failed to fetch the companies list, please try again!!',
  MIN_DATE_RANGE: 'Please select a minimum date range of 1 week',
  OVERALL_COMPANY_STATS_API_ERROR_MESSAGE:
    'Failed to fetch the company overall data, please try again!!',
  START_DATE_GREATER: `Start Date cannot be greater than today's date`,
  START_GREATER_THAN_END: 'Start date cannot be greater than End Date',
  TEAM_STATS_API_ERROR_MESSAGE: 'Failed to fetch the squad members details, please try again!!',
  UNAUTHORIZED_ERROR_MESSAGE: 'Sorry, unrecognized username or password.',
  USER_DETAILS_API_ERROR_MESSAGE: 'Failed to fetch user details, please try again!!',
};

export const urls = {
  CONTACT_US_URL: 'https://www.alphacoach.app/contact-us',
  FORGOT_PASSWORD_URL: 'https://www.alphacoach.app/auth/forgot-password',
};

export const appRoles = {
  ADMIN: 'admin',
  COMPANY_ADMIN: 'company_admin',
  TEAM_ADMIN: 'team_admin',
};

export const paginationLimit: number = 11;

export const pagePath: NavPath = {
  COMPANY: '/app/company',
  HOME: '/app/home',
  SQUAD: '/app/squad',
  INDIVIDUAL: '/app/individual',
};
