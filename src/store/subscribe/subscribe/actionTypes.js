import { generateActions } from '../../../helpers/generateActions';

export const SUBSCRIBE_TO_CELEB = generateActions('SUBSCRIBE_TO_CELEB');
export const UNSUBSCRIBE_FROM_CELEB = generateActions('UNSUBSCRIBE_FROM_CELEB');
export const CHECK_VALID_SUBSCRIPTION = generateActions('CHECK_VALID_SUBSCRIPTION');
export const CLEAR_SUB_CHECK = 'CLEAR_SUB_CHECK';
