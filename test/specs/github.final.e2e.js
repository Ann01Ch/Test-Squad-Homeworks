import GitHubPage from '../pageobjects/github.page.js' // <--- ВОТ ЭТА СТРОЧКА ЛЕЧИТ ТВОЮ ОШИБКУ

describe('GitHub Final Project - Trainee Level', () => {

    it('TC-1: Эмуляция регистрации', async () => {
        await browser.maximizeWindow();
        await GitHubPage.open();
        
        await browser.execute(() => {
            const banner = document.querySelector('#wcpConsentBannerCtrl');
            if (banner) banner.remove();
        });

        await GitHubPage.signUpButton.waitForClickable({ timeout: 10000 });
        await GitHubPage.signUpButton.click();

        const id = Math.floor(Math.random() * 1000000);
        
        const emailField = await $('#email');
        await emailField.waitForExist({ timeout: 20000 });
        await emailField.setValue(`test.user.${id}@gmail.com`);
        await browser.pause(2000);
        await browser.keys('Enter');

        const passwordField = await $('input[type="password"]');
        await passwordField.waitForDisplayed({ timeout: 10000 }).catch(() => {});
        await passwordField.setValue('SuperP@ssw0rd123!');
        await browser.pause(2000);
        await browser.keys('Enter');

        const usernameField = await $('#login');
        await usernameField.waitForDisplayed({ timeout: 10000 }).catch(() => {});
        await usernameField.setValue(`botuser${id}`);
        await browser.pause(3000);
        await browser.keys('Enter');
        
        const optInField = await GitHubPage.optInInput;
        const exists = await optInField.waitForExist({ timeout: 5000 }).catch(() => false);
        if (exists) {
            await optInField.setValue('y');
            await browser.keys('Enter');
        }
    });

    it('TC-2: Проверка планов Enterprise', async () => {
        await GitHubPage.open();
        await GitHubPage.enterpriseTrialLink.scrollIntoView();
        await GitHubPage.enterpriseTrialLink.waitForDisplayed({ timeout: 10000 });
        await browser.execute((el) => el.click(), await GitHubPage.enterpriseTrialLink);
        
        const mainHeader = await $('main h1'); 
        await mainHeader.waitForDisplayed({ timeout: 10000 });
        await expect(mainHeader).toHaveText(expect.stringContaining('enterprise'), { ignoreCase: true });
    });

    it('TC-4: Проверка поиска', async () => {
        await GitHubPage.open();
        const searchButton = await GitHubPage.searchInput;
        await searchButton.waitForExist({ timeout: 10000 });
        await browser.execute((el) => el.click(), await searchButton);

        const searchInput = await GitHubPage.searchField;
        await searchInput.waitForDisplayed({ timeout: 5000 });
        await searchInput.setValue('webdriverio');
        await browser.keys('Enter');

        const firstResult = await $('div.search-title a');
        await firstResult.waitForDisplayed({ timeout: 10000 });
        const attr = await firstResult.getAttribute('href');
        await expect(attr).toContain('webdriverio');
    });
});
  