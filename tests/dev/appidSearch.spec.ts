import { test, expect } from "@playwright/test";
import { BasePage } from "../../pages/basePage";
import { ConfigManager } from '../../utils/ConfigManager';

test.describe('小程序搜索测试', () => {
    let basePage: BasePage;
    const config = ConfigManager.getInstance();  

    test.beforeEach(async ({ page }) => {
        basePage = new BasePage(page);
    });

    test('搜索小程序 AppID', async ({ page }) => {
        const appid = config.getTestData('appId');
        const appName = config.getTestData('appName');  
        
        // 使用自定义账号登录
        await basePage.goto('/dev#/miniApp/index', 'pengzq1');
        // 等待页面加载
        await page.waitForTimeout(2000);

        const searchInput = page.getByTestId('5785894c-miniapplist-5-7');
        await searchInput.fill(appid);
        await searchInput.press('Enter');

        // 等待搜索结果加载
        await page.waitForTimeout(2000);

        // 验证搜索结果小程序名称
        const appNameElement = page.getByTestId('5785894c-basic-36-11').getByText(appName);
        await expect(appNameElement).toBeVisible();
        // 保存截图以便调试
        await page.screenshot({
            path: 'test-results/search-result.png',
            fullPage: true
        });
    });
});
