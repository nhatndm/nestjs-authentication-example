export const ERROR_MESSAGE_CODE = {
  error_001: {
    content: 'Your email is not verified',
    code: 'error_001',
  },
  error_002: {
    content: 'This account has been registered, Please use login instead!!!',
    code: 'error_002',
  },
  error_003: {
    content: 'This account has not been registered!!!',
    code: 'error_003',
  },
  error_004: {
    content: 'Password does not match with this identity',
    code: 'error_004',
  },
  error_005: {
    content: 'No data is summited',
    code: 'error_005',
  },
  error_006: {
    content: 'You are unauthorized',
    code: 'error_006',
  },
  error_007: {
    content:
      'System role has not been defined, Please contact admin for assistance!!',
    code: 'error_007',
  },
  error_008: {
    content: 'You are not allowed to access this resource!!',
    code: 'error_008',
  },
  error_009: {
    content: 'Your email has been registered, Please use another email!!!',
    code: 'error_009',
  },
  error_010: {
    content: 'You can not delete yourself!!!',
    code: 'error_010',
  },
  error_011: {
    content: 'This resource is not available',
    code: 'error_011',
  },
  error_012: {
    content:
      'Your Account Has not been verified yet, Please contact admin for assistance',
    code: 'error_012',
  },
  error_013: {
    content: 'Images can not be empty',
    code: 'error_013',
  },
  error_014: {
    content: 'A number of images has been reached maximum',
    code: 'error_014',
  },
  error_015: {
    content: 'There seem this parent doesnt exist',
    code: 'error_015',
  },
  error_016: {
    content: 'Property seems not to be created before',
    code: 'error_016',
  },
  error_017: {
    content:
      'Can not create this property due to property type!!!!Only room will be belonged to its parent',
    code: 'error_017',
  },
  error_018: {
    content:
      'Can not update this property due to property type!!!!Only room will be belonged to its parent',
    code: 'error_018',
  },
  error_019: {
    content: 'Review seems not to be created before',
    code: 'error_019',
  },
  error_020: {
    content: 'You cant not update this property',
    code: 'error_020',
  },
  error_021: {
    content: 'This property is not available',
    code: 'error_021',
  },
  error_022: {
    content: 'Start date can be greater than end date',
    code: 'error_022',
  },
  error_023: {
    content: 'You can not update this booking',
    code: 'error_023',
  },
  error_024: {
    content: 'Checkout is not provided',
    code: 'error_024',
  },
  error_025: {
    content: 'Checkin is not provided',
    code: 'error_025',
  },
  error_026: {
    content: 'You can not edit this review',
    code: 'error_026',
  },
  error_027: {
    content: 'Point can not be greater than 5',
    code: 'error_027',
  },
  error_028: {
    content: 'Firebase token is not valid',
    code: 'error_028',
  },
  error_029: {
    content: 'You can not access this resource',
    code: 'error_029',
  },
  error_030: {
    content: 'Time range is not valid',
    code: 'error_030',
  },
  error_031: {
    content: 'Daily type can not be null',
    code: 'error_031',
  },
  error_032: {
    content: 'Price rule is not available',
    code: 'error_032',
  },
};

export const SUCCESS_MESSAGE_CODE = {
  success_001: {
    content: 'Updated Successfully',
    code: 'Success_001',
  },
  success_002: {
    content: 'Deleted Successfully',
    code: 'Success_002',
  },
  success_003: {
    content: 'Created Successfully',
    code: 'Success_003',
  },
  success_004: {
    content:
      'Please use the token has been sent to your mailbox to change your password',
    code: 'success_004',
  },
  success_005: {
    content: 'Change Passoword Successfully, Please login again!!!',
    code: 'success_005',
  },
};

export enum API_ROUTE {
  'USER' = 'user',
  'PROPERTY' = 'property',
  'REVIEW' = 'review',
  'BOOKING' = 'booking',
  'METADATA' = 'metadata',
  'PROPERTY_PRICE_RULE' = 'property_price_rule',
}

export enum DOMAIN {
  'USER' = 'user',
  'USERS' = 'users',
  'PROPERTY' = 'property',
  'PROPERTIES' = 'properties',
  'PROPERTY_DETAIL' = 'property_detail',
  'PROPERTY_DETAILS' = 'property_details',
  'PROPERTY_PRICE_RULE' = 'property_price_rule',
  'PROPERTY_PRICE_RULES' = 'property_price_rules',
  'IMAGE' = 'image',
  'IMAGES' = 'images',
  'REVIEW' = 'review',
  'REVIEWS' = 'reviews',
  'BOOKING' = 'booking',
  'BOOKINGS' = 'bookings',
  'SELLER' = 'seller',
  'SELLER_BOOKING' = 'seller_booking',
}

export enum PROCESSOR {}

export enum PROCESSNAME {}
