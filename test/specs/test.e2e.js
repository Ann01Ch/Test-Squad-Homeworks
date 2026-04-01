import { expect } from '@wdio/globals'

describe("Homework: WDIO Methods Practice", () => {
    it("should complete all steps from the task", async () => {

        await browser.url('https://webdriver.io/');
        await browser.pause(2000);

        
        const apiLink = await $('=API');
        await apiLink.click();

        
        await expect(browser).toHaveUrl(expect.stringContaining('docs/api'));

       
        const header = await $('h1');
        await expect(header).toHaveText('Introduction');

        
        const webDriverLink = await $('=WebDriver'); 
        
        
        const webDriverHref = await webDriverLink.getAttribute('href');
        console.log("WebDriver link is: " + webDriverHref);

        
        await expect(webDriverLink).toHaveAttribute('href', '/docs/api/webdriver');

        
        const searchBtn = await $('.DocSearch-Button');
        await searchBtn.click();
        await browser.pause(1000);

        const searchInput = await $('.DocSearch-Input');
        await searchInput.setValue("all is done");
        await browser.pause(2000); 

       
        await searchInput.clearValue();
        await browser.pause(2000);
        
        console.log("ДЗ готово ");
    });
});