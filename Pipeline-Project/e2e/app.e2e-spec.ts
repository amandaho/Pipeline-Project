import { PipelineProjectPage } from './app.po';

describe('pipeline-project App', () => {
  let page: PipelineProjectPage;

  beforeEach(() => {
    page = new PipelineProjectPage();
  });

  it('should display welcome message', () => {
    page.navigateTo();
    expect(page.getParagraphText()).toEqual('Welcome to app!!');
  });
});
