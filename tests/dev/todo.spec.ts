import { test, expect } from '@playwright/test';
import { BasePage } from "../../pages/basePage";
import { ConfigManager } from '../../utils/ConfigManager';

test.describe('首页-待办中心', () => {
    let basePage: BasePage;
    const config = ConfigManager.getInstance();

    test.beforeEach(async ({ page }) => {
        basePage = new BasePage(page);
    });

test('首页-待办中心-头部文案检验', async ({ page }) => {
  await basePage.goto('/dev#/home/todo', 'pengzq1');
  const loginSuccessIndicator = page.getByTestId('d407f84d-logo-2-3'); // 替换为登录成功的唯一标识元素
  await expect(loginSuccessIndicator).toBeVisible({ timeout: 10000 });
  await page.waitForTimeout(2000)

  await expect(page.getByTestId('3a5951fe-homeheader-2-3')).toMatchAriaSnapshot(`
    - text: /Finclip 小程序数字管理平台(上午好|中午好|下午好|晚上好)，今天是\\d+\\/\\d+\\/\\d+/
    - button "切换数据概览"
    `);
});

test('首页-待办中心-待办项tab展示', async ({ page }) => {
  await basePage.goto('/dev#/home/todo', 'pengzq1');
  const loginSuccessIndicator = page.getByTestId('d407f84d-logo-2-3'); // 替换为登录成功的唯一标识元素
  await expect(loginSuccessIndicator).toBeVisible({ timeout: 10000 });
  await page.waitForTimeout(2000)

  await expect(page.getByTestId('3a5951fe-todocomponent-3-5')).toMatchAriaSnapshot(`
    - tablist:
      - tab /小程序审核（\\d+）/ [selected]
      - tab /小程序关联（\\d+）/
      - tab /自定义API调用（\\d+）/
      - tab /菜单调用（\\d+）/
      - tab /用户反馈（\\d+）/
    `);
});

test('首页-待办中心-小程序审核tab样式', async ({ page }) => {
  await basePage.goto('/dev#/home/todo', 'pengzq1');
  const loginSuccessIndicator = page.getByTestId('d407f84d-logo-2-3'); // 替换为登录成功的唯一标识元素
  await expect(loginSuccessIndicator).toBeVisible({ timeout: 10000 });
  await page.waitForTimeout(2000)

  await expect(page.getByTestId('3a5951fe-miniappaudit-4-7')).toBeVisible();
  await expect(page.getByTestId('3a5951fe-miniappaudit-5-7')).toBeVisible();
  await expect(page.getByTestId('6a3ff847-tablefilter-2-3')).toMatchAriaSnapshot(`
    - paragraph: 名称
    - textbox "名称"
    - paragraph: 状态
    - combobox "状态": 审核中
    - img
    - button "重置"
    - button "查询"
    - button "展开"
    `);
});

test('首页-待办中心-小程序关联tab样式', async ({ page }) => {
  await basePage.goto('/dev#/home/todo', 'pengzq1');
  const loginSuccessIndicator = page.getByTestId('d407f84d-logo-2-3'); // 替换为登录成功的唯一标识元素
  await expect(loginSuccessIndicator).toBeVisible({ timeout: 10000 });
  await page.waitForTimeout(2000)

  await page.locator('#tab-2').click();
  await expect(page.getByTestId('3a5951fe-todocomponent-3-5')).toMatchAriaSnapshot(`
    - tablist:
      - tab /小程序审核（\\d+）/ 
      - tab /小程序关联（\\d+）/ [selected]
      - tab /自定义API调用（\\d+）/ 
      - tab /菜单调用（\\d+）/ 
      - tab /用户反馈（\\d+）/ 
    `);
  await expect(page.getByTestId('3a5951fe-miniappbind-4-7')).toBeVisible();
  await expect(page.getByTestId('3a5951fe-miniappbind-5-7')).toBeVisible();
  await expect(page.getByTestId('6a3ff847-tablefilter-2-3')).toMatchAriaSnapshot(`
    - paragraph: 名称
    - textbox "名称"
    - paragraph: 状态
    - combobox "状态": 审核中
    - img
    - button "重置"
    - button "查询"
    - button "展开"
    `);
});
//切换tab中的定位需要开发增加id，tab中数字会有变动
test('首页-待办中心-自定义API调用tab样式', async ({ page }) => {
  await basePage.goto('/dev#/home/todo', 'pengzq1');
  const loginSuccessIndicator = page.getByTestId('d407f84d-logo-2-3'); // 替换为登录成功的唯一标识元素
  await expect(loginSuccessIndicator).toBeVisible({ timeout: 10000 });
  await page.waitForTimeout(2000)

  await page.locator('#tab-3').click();
  await expect(page.getByTestId('3a5951fe-todocomponent-3-5')).toMatchAriaSnapshot(`
    - tablist:
      - tab /小程序审核（\\d+）/
      - tab /小程序关联（\\d+）/
      - tab /自定义API调用（\\d+）/ [selected]
      - tab /菜单调用（\\d+）/
      - tab /用户反馈（\\d+）/
    `);
  await expect(page.getByTestId('3a5951fe-customapi-4-7')).toBeVisible();
  await expect(page.getByTestId('3a5951fe-customapi-5-7')).toBeVisible();
  await expect(page.getByTestId('6a3ff847-tablefilter-2-3')).toMatchAriaSnapshot(`
    - paragraph: 名称
    - textbox "名称"
    - paragraph: 状态
    - combobox "状态": 审核中
    - img
    - button "重置"
    - button "查询"
    - button "展开"
    `);
});

test('首页-待办中心-菜单调用tab样式', async ({ page }) => {
  await basePage.goto('/dev#/home/todo', 'pengzq1');
  const loginSuccessIndicator = page.getByTestId('d407f84d-logo-2-3'); // 替换为登录成功的唯一标识元素
  await expect(loginSuccessIndicator).toBeVisible({ timeout: 10000 });
  await page.waitForTimeout(2000)
  await page.locator('#tab-4').click();
  await expect(page.getByTestId('3a5951fe-menu-4-7')).toBeVisible();
  await expect(page.getByTestId('3a5951fe-menu-5-7')).toBeVisible();
  await expect(page.getByTestId('6a3ff847-tablefilter-2-3')).toMatchAriaSnapshot(`
    - paragraph: 名称
    - textbox "名称"
    - paragraph: 状态
    - combobox "状态": 审核中
    - img
    - button "重置"
    - button "查询"
    - button "展开"
    `);
});

test('首页-待办中心-用户反馈tab样式', async ({ page }) => {
  await basePage.goto('/dev#/home/todo', 'pengzq1');
  const loginSuccessIndicator = page.getByTestId('d407f84d-logo-2-3'); // 替换为登录成功的唯一标识元素
  await expect(loginSuccessIndicator).toBeVisible({ timeout: 10000 });
  await page.waitForTimeout(2000)
  await page.locator('#tab-10').click();
  await expect(page.getByTestId('3a5951fe-userfeedback-4-7')).toBeVisible();
  await expect(page.getByTestId('3a5951fe-userfeedback-7-7')).toBeVisible();
  await expect(page.getByTestId('6a3ff847-tablefilter-2-3')).toMatchAriaSnapshot(`
    - paragraph: 名称
    - textbox "名称"
    - paragraph: 反馈类型
    - textbox "反馈类型"
    - img
    - button "重置"
    - button "查询"
    - button "展开"
    `);
  await expect(page.getByTestId('3a5951fe-todocomponent-3-5')).toMatchAriaSnapshot(`
    - tablist:
      - tab /小程序审核（\\d+）/
      - tab /小程序关联（\\d+）/
      - tab /自定义API调用（\\d+）/
      - tab /菜单调用（\\d+）/
      - tab /用户反馈（\\d+）/ [selected]
    `);
});

});