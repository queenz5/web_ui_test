import { test, expect } from "@playwright/test";
import { BasePage } from "../../pages/basePage";
import { LoginPage } from "../../pages/LoginPage";

test.describe('页面标题测试', () => {
    let loginPage: LoginPage;
    let basePage: BasePage;

    test.beforeEach(async ({ page }) => {
        loginPage = new LoginPage(page);
        basePage = new BasePage(page);
    });

    test("登录页面标题 - 默认", async () => {
        await basePage.goto('/dev');
        const title = await loginPage.getTitle();
        expect(title).toBe("小程序数字管理平台 - 开发中心");
    });

    test("登录页面标题 - app_type=ops", async () => {
        await basePage.goto('/ops');
        const title = await loginPage.getTitle();
        expect(title).toBe("小程序数字管理平台 - 数字中心");
    });

    test("登录页面标题 - app_type=dev", async () => {
        await basePage.goto('/dev');
        const title = await loginPage.getTitle();
        expect(title).toBe("小程序数字管理平台 - 开发中心");
    });
});
