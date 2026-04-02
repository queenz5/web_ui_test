import { test, expect } from '@playwright/test';
import { BasePage } from "../../pages/basePage";
import { ConfigManager } from '../../utils/ConfigManager';


test.describe('首页-数据概览', () => {
    let basePage: BasePage;
    const config = ConfigManager.getInstance();

    test.beforeEach(async ({ page }) => {
        basePage = new BasePage(page);
    });

test('首页-数据概览-头部文案检验', async ({ page }) => {
    await basePage.goto('/dev#/home/dataProfile', 'pengzq1');
    const loginSuccessIndicator = page.getByTestId('d407f84d-logo-2-3'); // 替换为登录成功的唯一标识元素
    await expect(loginSuccessIndicator).toBeVisible({ timeout: 10000 });
    await page.waitForTimeout(2000)

  await expect(page.getByTestId('3a5951fe-homeheader-2-3')).toMatchAriaSnapshot(`
    - text: /Finclip 小程序数字管理平台(上午好|中午好|下午好|晚上好)，今天是\\d+\\/\\d+\\/\\d+/
    - button "切换待办中心"
  `);
});
test('首页-数据概览-最新公告/最新活动模块存在检查', async ({ page }) => {
    await basePage.goto('/dev#/home/dataProfile', 'pengzq1');
    const loginSuccessIndicator = page.getByTestId('d407f84d-logo-2-3'); // 替换为登录成功的唯一标识元素
    await expect(loginSuccessIndicator).toBeVisible({ timeout: 10000 });
    await page.waitForTimeout(2000)
  await expect(page.getByTestId('3a5951fe-overview-110-7').getByTestId('b05d5e15-labeltitle-3-5')).toMatchAriaSnapshot(`
    - text: 最新公告
  `);

  await expect(page.getByTestId('3a5951fe-overview-143-7').getByTestId('b05d5e15-labeltitle-3-5')).toMatchAriaSnapshot(`
    - text: 最新活动
  `);
});

test('首页-数据概览-资源看板模块样式检查', async ({ page }) => {
    await basePage.goto('/dev#/home/dataProfile', 'pengzq1');
    const loginSuccessIndicator = page.getByTestId('d407f84d-logo-2-3'); // 替换为登录成功的唯一标识元素
    await expect(loginSuccessIndicator).toBeVisible({ timeout: 10000 });
    await page.waitForTimeout(2000)

  await expect(page.getByTestId('3a5951fe-overview-52-7').getByTestId('b05d5e15-labeltitle-3-5')).toMatchAriaSnapshot(`- text: 资源看板`);
  await expect(page.getByTestId('3a5951fe-overview-55-9')).toMatchAriaSnapshot(`
  - paragraph: 接口请求次数
  - paragraph: /\\d+/
  - paragraph: 代码包下载量
  - paragraph: /\\d+\\.\\d{2} MB/
  - paragraph: 日志上传流量
  - paragraph: /\\d+\\.\\d{2} MB/
`);
});
test('首页-数据概览-我的小程序模块tab展示存在展示', async ({ page }) => {
  await basePage.goto('/dev#/home/dataProfile', 'pengzq1');
  const loginSuccessIndicator = page.getByTestId('d407f84d-logo-2-3'); // 替换为登录成功的唯一标识元素
  await expect(loginSuccessIndicator).toBeVisible({ timeout: 10000 });
  await page.waitForTimeout(2000)

  await expect(page.getByTestId('3a5951fe-overviewminiapps-2-3').getByTestId('b05d5e15-labeltitle-3-5')).toBeVisible();
  await expect(page.getByTestId('3a5951fe-overviewminiapps-6-11')).toBeVisible();
  await expect(page.getByTestId('3a5951fe-overviewminiapps-31-5')).toMatchAriaSnapshot(`
    - tablist:
      - tab /全部（\\d+）/ [selected]
      - tab /小程序（\\d+）/
      - tab /小游戏（\\d+）/
      - tab /H5 应用（\\d+）/
      - tab /小组件（\\d+）/
    `);

});
test('首页-数据概览-我的应用模块tab展示存在展示', async ({ page }) => {
  await basePage.goto('/dev#/home/dataProfile', 'pengzq1');
  const loginSuccessIndicator = page.getByTestId('d407f84d-logo-2-3'); // 替换为登录成功的唯一标识元素
  await expect(loginSuccessIndicator).toBeVisible({ timeout: 10000 });
  await page.waitForTimeout(2000)

  await expect(page.getByTestId('3a5951fe-overviewapps-2-3').getByTestId('b05d5e15-labeltitle-3-5')).toBeVisible();
  await expect(page.getByTestId('3a5951fe-overviewapps-6-11')).toBeVisible();
  await expect(page.getByTestId('3a5951fe-overviewapps-32-5')).toMatchAriaSnapshot(`
    - tablist:
      - tab /全部（\\d+）/ [selected]
      - tab /我创建的（\\d+）/
      - tab /可使用的 （\\d+）/
    `);
});
test('首页-数据概览-点击按钮切换待办中心成功', async ({ page }) => {
  await basePage.goto('/dev#/home/dataProfile', 'pengzq1');
  const loginSuccessIndicator = page.getByTestId('d407f84d-logo-2-3'); // 替换为登录成功的唯一标识元素
  await expect(loginSuccessIndicator).toBeVisible({ timeout: 10000 });
  await page.waitForTimeout(2000)

  await page.getByTestId('3a5951fe-homeheader-14-5').click();
  await expect(page.getByTestId('d407f84d-siderwrapper-9-5')).toMatchAriaSnapshot(`
    - menubar:
      - menuitem "首页" [expanded]:
        - menu:
          - listitem:
            - list:
              - menuitem "数据概览"
              - menuitem "待办中心"
      - menuitem "小程序"
      - menuitem "应用"
      - menuitem "开发"
      - menuitem "分析"
      - menuitem "用户"
    `);
});

});
