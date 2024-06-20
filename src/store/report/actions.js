import { CREATE_REPORT } from './actionTypes';

export const createReport = (
  { 
    user_id, 
    report_reason, 
    report_content, 
    is_content,  
    is_user, 
    reported_content_id,
    reported_user_id  
  },
  cb,
) => {
  console.log('report_reason', report_reason);
  return {
    type: CREATE_REPORT.REQUEST,
    payload: {
      values: {
        user_id,
        report_reason,
        report_content,
        is_content,
        is_user,
        reported_content_id,
        reported_user_id,
        cb,
      },
      cb: cb,
    },
  };
};

export const createReportSuccess = () => {
  return {
    type: CREATE_REPORT.SUCCESS,
  };
};

export const createReportFailure = () => {
  return {
    type: CREATE_REPORT.FAILURE,
  };
};
