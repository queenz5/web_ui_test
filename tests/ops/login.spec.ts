import { test } from "@playwright/test";
import { LoginPage } from "../../pages/LoginPage";
import { ConfigManager } from "../../utils/ConfigManager";
import { BasePage } from "../../pages/basePage";

const config = ConfigManager.getInstance();

test.describe('运营中心登录测试', () => {
    let loginPage: LoginPage;
    let basePage: BasePage;

    test.beforeEach(async ({ page }) => {
        loginPage = new LoginPage(page);
        basePage = new BasePage(page);
    });

    test("运营中心 - 登录页默认登录", async () => {
        await basePage.goto('/ops');
        await loginPage.loginWithOpsAccount();
        await loginPage.logout();
    });
});
