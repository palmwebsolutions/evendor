import { Evendor1Page } from './app.po';

describe('evendor1 App', () => {
  let page: Evendor1Page;

  beforeEach(() => {
    page = new Evendor1Page();
  });

  it('should display message saying app works', () => {
    page.navigateTo();
    expect(page.getParagraphText()).toEqual('app works!');
  });
});
