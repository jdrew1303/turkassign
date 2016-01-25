import API from './api';
import { generateQuestionXML, questionTemplate } from './question';
import taskPool from '../task-pool';
import config from '../config';

const uploadFile = file => {
  return taskPool.uploadFile(file);
};

class MTurk {
  constructor(apiParams) {
    this.api = new API(apiParams);
  }

  createHIT(taskGroupId, assignmentProgram, apiParams = {}) {
    return uploadFile(assignmentProgram).then(res => {
      const { filename } = res;
      const taskPoolAddress = config.get('taskPoolAddress');
      const assignmentProgramUrl = `${taskPoolAddress}/${filename}`;

      const question = questionTemplate(taskGroupId, assignmentProgramUrl);
      const questionXML = generateQuestionXML(question);

      const params = Object.assign({
        Question: questionXML
      }, apiParams);
      return this.api.createHIT(params);
    });
  }
};

export default MTurk;
