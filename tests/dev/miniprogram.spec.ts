import { test, expect } from '@playwright/test';
import { BasePage } from "../../pages/basePage";
import { ConfigManager } from '../../utils/ConfigManager';
import path from 'path';


test.describe('小程序管理', () => {
    let basePage: BasePage;
    const config = ConfigManager.getInstance();

    test.beforeEach(async ({ page }) => {
        basePage = new BasePage(page);
    });

test('小程序管理-小程序切换插件', async ({ page }) => {
  await basePage.goto('/dev#/miniApp/index', 'pengzq1');
  const loginSuccessIndicator = page.getByTestId('d407f84d-logo-2-3'); // 替换为登录成功的唯一标识元素
  await expect(loginSuccessIndicator).toBeVisible({ timeout: 10000 });
  await page.waitForTimeout(2000)
  await expect(page.getByTestId('5785894c-miniapplist-2-3').getByTestId('b05d5e15-labeltitle-3-5')).toMatchAriaSnapshot(`- text: 小程序 插件`);
  await page.getByTestId('a114e88a-switchtitle-7-5').click();
  await expect(page.getByTestId('a114e88a-pluginlist-2-3').getByTestId('b05d5e15-labeltitle-3-5')).toMatchAriaSnapshot(`- text: 插件 小程序`);
});
test('小程序管理-小程序搜索样式', async ({ page }) => {
  await basePage.goto('/dev#/miniApp/index', 'pengzq1');
  const loginSuccessIndicator = page.getByTestId('d407f84d-logo-2-3'); // 替换为登录成功的唯一标识元素
  await expect(loginSuccessIndicator).toBeVisible({ timeout: 10000 });
  await page.waitForTimeout(2000)

  await expect(page.getByTestId('5785894c-miniapplist-5-7')).toBeVisible();
  await expect(page.getByTestId('5785894c-miniapplist-4-5').getByTestId('b05d5e15-svgicon-2-3').first()).toBeVisible();
  await expect(page.getByTestId('5785894c-miniapplist-30-9')).toBeVisible();
  await expect(page.getByTestId('41f713e6-appsearchfilter-11-7')).toBeVisible();
  await page.waitForSelector('.custom-header-class');
  const headers = await page.locator('.custom-header-class th .cell').allTextContents();
  expect(headers).toEqual(['名称', '状态', '启用状态']);
});
test('小程序管理-基本信息模块样式展示', async ({ page }) => {
  await basePage.goto('/dev#/miniApp/index', 'pengzq1');
  const loginSuccessIndicator = page.getByTestId('d407f84d-logo-2-3'); // 替换为登录成功的唯一标识元素
  await expect(loginSuccessIndicator).toBeVisible({ timeout: 10000 });
  await page.waitForTimeout(2000)
  await expect(page.getByTestId('5785894c-basic-3-5').getByTestId('b05d5e15-labeltitle-3-5')).toMatchAriaSnapshot(`- text: 基本信息`);
  await expect(page.getByText('名称:')).toBeVisible();
  await expect(page.getByText('AppID:')).toBeVisible();
  await expect(page.getByText('分类:')).toBeVisible();
  await expect(page.getByText('简介:')).toBeVisible();
  await expect(page.getByText('截图:')).toBeVisible();
});

test('小程序管理-信息详情默认样式展示', async ({ page }) => {
  await basePage.goto('/dev#/miniApp/index', 'pengzq1');
  const loginSuccessIndicator = page.getByTestId('d407f84d-logo-2-3'); // 替换为登录成功的唯一标识元素
  await expect(loginSuccessIndicator).toBeVisible({ timeout: 10000 });
  await page.waitForTimeout(2000)
  await expect(page.getByTestId('5785894c-versionpublisher-7-7')).toMatchAriaSnapshot(`- text: 信息详情`);
  await expect(page.getByRole('tablist')).toMatchAriaSnapshot(`
    - tablist:
      - tab "版本管理" [selected]
      - tab "灰度发布"
      - tab "关联应用"
      - tab "API 与菜单"
      - tab "第三方平台关联"
      - tab "隐私设置"
      - tab "开发域名配置"
      - tab "AI+"
      - tab "其他"
    `);
  await expect(page.getByTestId('5785894c-publicedition-3-5')).toBeVisible();
  await expect(page.getByTestId('5785894c-auditedition-3-5')).toBeVisible();
  await expect(page.getByTestId('5785894c-previewedition-3-5')).toBeVisible();
});

test('test新增小程序成功', async ({ page }) => {
  const __dirname = new URL('.', import.meta.url).pathname;
  const testImagePath = path.resolve(__dirname, '../../config/testimages/test.png');

  await basePage.goto('/dev#/miniApp/index', 'pengzq1');
  const loginSuccessIndicator = page.getByTestId('d407f84d-logo-2-3'); // 替换为登录成功的唯一标识元素
  await expect(loginSuccessIndicator).toBeVisible({ timeout: 10000 });
  await page.waitForTimeout(2000);
  await page.waitForSelector('[data-testid="d407f84d-siderwrapper-9-5"]');
  const randomPhoneNumber = '156' + Math.floor(10000000 + Math.random() * 90000000);

  await page.getByTestId('d407f84d-siderwrapper-9-5').getByText('小程序', { exact: true }).click();
  await page.getByTestId('5785894c-miniapplist-30-9').click();
  await page.getByTestId('c08d77df-miniappinfodialog-15-13').click();
  await page.getByTestId('c08d77df-miniappinfodialog-15-13').fill('小程序名称' + randomPhoneNumber);
  await page.getByPlaceholder('请选择分类').click();
  await page.getByRole('option', { name: '金融' }).locator('span').click();
  await page.locator('form').click();
  await page.getByTestId('c08d77df-miniappinfodialog-72-9').click();
  await page.getByTestId('c08d77df-miniappinfodialog-72-9').fill('小程序简介');
  await page.getByTestId('b05d5e15-dialog-36-7').getByTestId('b05d5e15-svgicon-2-3').click();

  const fileInputParent = await page.locator('div.el-upload.el-upload--picture-card');
  const fileInput = await fileInputParent.locator('input[type="file"]');
  await fileInput.setInputFiles(testImagePath);

  await page.getByTestId('c08d77df-miniappinfodialog-85-9').click();
  await page.getByTestId('c08d77df-miniappinfodialog-85-9').fill('小程序描述');
  await page.getByTestId('c08d77df-miniappinfodialog-109-7').click();
  await page.getByTestId('b05d5e15-dialog-24-11').getByTestId('b05d5e15-svgicon-2-3').click();
  await expect(page.getByTestId('5785894c-basic-30-7').getByText('小程序名称' + randomPhoneNumber)).toBeVisible();
});

    test('搜索小程序 AppID', async ({ page }) => {
        const appid = config.getTestData('appId');
        const appName = config.getTestData('appName');

        // 使用自定义账号登录
        await basePage.goto('/dev#/miniApp/index', 'pengzq1');
        const loginSuccessIndicator = page.getByTestId('d407f84d-logo-2-3'); // 替换为登录成功的唯一标识元素
        await expect(loginSuccessIndicator).toBeVisible({ timeout: 10000 });
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
