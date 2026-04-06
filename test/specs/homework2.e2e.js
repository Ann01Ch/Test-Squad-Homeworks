import { expect } from '@wdio/globals'

describe("Домашнее задание: продвинутые методы и селекторы", () => {
    it("должен проверить API, скролл и ожидание заголовка", async () => {
        await browser.url('https://webdriver.io/');

        const apiLink = await $('nav a[href="/docs/api"]');
        await apiLink.click();

        const introHeader = await $('h1');
        await expect(introHeader).toHaveText('Introduction');

        const apiReferenceLink = await $('=API Reference');
        await apiReferenceLink.scrollIntoView({ block: 'center' });
        await browser.pause(1000);

        const isDisplayed = await apiReferenceLink.isDisplayed();
        console.log("Ссылка API Reference отображается: " + isDisplayed);

        const protocolCommandsLink = await $('=Protocol Commands');
        await protocolCommandsLink.scrollIntoView({ block: 'center' });
        
        const isVisible = await protocolCommandsLink.isDisplayed();
        console.log("Protocol Commands отображается: " + isVisible);

        const isClickable = await protocolCommandsLink.isClickable();
        console.log("На Protocol Commands можно нажать: " + isClickable);

        const html = await protocolCommandsLink.getHTML();
        console.log("HTML код ссылки: " + html);

        await browser.execute((el) => el.click(), await protocolCommandsLink);
        
        // Ждем 3 секунды, чтобы страница точно переключилась
        await browser.pause(3000);

        const targetHeader = await $('h1');
        
        await browser.waitUntil(async () => {
            const text = await targetHeader.getText();
            return text.length > 0; // Просто ждем, что заголовок вообще появился
        }, {
            timeout: 10000,
            timeoutMsg: 'Заголовок не загрузился'
        });

        const finalTitle = await targetHeader.getText();
        console.log("Итоговый заголовок: " + finalTitle);
    });
});