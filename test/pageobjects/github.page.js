class GitHubPage {
    get signUpButton() { return $('a[href*="/signup"]') }
    get emailInput() { return $('#email') }
    get passwordInput() { return $('#password') }
    get usernameInput() { return $('#login') }
    get optInInput() { return $('input[name="opt_in"]') }

    get enterpriseTrialLink() { return $('a[href="/enterprise"]') }
    get searchInput() { return $('[data-target="qbsearch-input.inputButtonText"]') }
    get searchField() { return $('#query-builder-test') }

    async open() {
        await browser.url('https://github.com/');
    }
}
export default new GitHubPage(); 