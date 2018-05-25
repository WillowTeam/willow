import axios from 'axios';
import { reset } from 'redux-form';

import { 
  CREATE_PROJECT_ADD_PROJECT_TITLE,
  CREATE_PROJECT_ADD_MILESTONES,
  CREATE_PROJECT_SAVE_PROJECT,
  CREATE_PROJECT_HAS_ERRORED,
  DATA_WITHIN_CREATE_PROJECT_IS_LOADING,
  CREATE_PROJECT_HANDLE_NEW_ITEM,
  CREATE_PROJECT_DELETE_ITEM,
  RESET_PROJECT_BUILDER,
  CREATE_PROJECT_NAVIGATE_BACK,
  CREATE_PROJECT_IS_LOADING
} from '../actions/types';

import { closeModal } from './modal';

export const handleProjectNaming = projectName => ({
  type: CREATE_PROJECT_ADD_PROJECT_TITLE,
  payload: projectName,
});

export const handleAddMilestones = milestones => ({
  type: CREATE_PROJECT_ADD_MILESTONES,
  payload: milestones,
});

export const resetPB = () => ({
  type: RESET_PROJECT_BUILDER,
  payload: null,
});

export const resetProjectBuilder = () => ((dispatch) => {
  dispatch(reset('NewProjectTitle'));
  dispatch(resetPB());
});

export const redirectTo = projectID => ({
  type: CREATE_PROJECT_SAVE_PROJECT,
  payload: projectID,
});

export const handleSaveProject = (projectDetails, modal) => dispatch => {
  dispatch(createProjectIsLoading(true));

  console.log('projectDetails: ', projectDetails)
  
  axios
    .post('/api/newProject', { data: projectDetails, })
    .then(data => {
      dispatch(createProjectIsLoading(false));
      dispatch(closeModal(modal));
      dispatch(reset('NewProjectTitle'));
      
      // redirect to newly create project
      let projectID = data.data.project_id;
      dispatch(redirectTo(projectID));
    })
    .catch(err => {
      console.log('err: ', err);
      dispatch(resetProjectBuilder());
      dispatch(createProjectIsLoading(false));
    });
};

export const handleAddItem = item => ({
  type: CREATE_PROJECT_HANDLE_NEW_ITEM,
  payload: item,
});

export const deleteItem = idx => ({
  type: CREATE_PROJECT_DELETE_ITEM,
  payload: idx,
});

export const createProjectIsLoading = boolean => ({
  type: CREATE_PROJECT_IS_LOADING,
  payload: boolean,
});

export const navigateBack = modalTitle => ({
  type: CREATE_PROJECT_NAVIGATE_BACK,
  payload: modalTitle,
});