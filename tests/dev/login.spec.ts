
import { test, expect } from "@playwright/test";
import { LoginPage } from "../../pages/LoginPage";
import { ConfigManager } from "../../utils/ConfigManager";
import { BasePage } from "../../pages/basePage";
import { time } from "console";
import { TIMEOUT } from "dns";

const config = ConfigManager.getInstance();

test.describe('开发中心登录测试', () => {
    let loginPage: LoginPage;
    let basePage: BasePage;

    test.beforeEach(async ({ page }) => {
        loginPage = new LoginPage(page);
        basePage = new BasePage(page);
    });


test('test登录界面展示及成功登录', async ({ page }) => {
  await basePage.goto('/dev');
  await expect(page.getByTestId('3252d404-login-24-11')).toMatchAriaSnapshot(`
    - text: 登 录
    - paragraph:
      - text: 没有账户？
      - button "免费注册"
    `);
  await expect(page.getByTestId('3252d404-bottombuttonwrapper-2-3')).toMatchAriaSnapshot(`
    - button "手机验证码登录"
    - button "忘记密码"
    `);
  await expect(page.getByTestId('279e5761-oauthiconlist-3-5')).toMatchAriaSnapshot(`- paragraph: 第三方登录`);
  await expect(page.getByTestId('3252d404-topnav-9-7')).toBeVisible();
  await expect(page.getByTestId('3252d404-layout-4-7').getByTestId('6a3ff847-fetchimg-3-5')).toBeVisible();
  await expect(page.getByTestId('3252d404-login-3-5').getByTestId('6a3ff847-fetchimg-3-5')).toBeVisible();
  await expect(page.getByTestId('3252d404-login-205-3')).toMatchAriaSnapshot(`- paragraph: Finclip 小程序数字管理平台`);
});



test('test注册页面展示及注册成功', async ({ page }) => {
  const randomPhoneNumber = '156' + Math.floor(10000000 + Math.random() * 90000000);
  await basePage.goto('/dev');
  await page.getByTestId('373c592e-operationdesc-5-7').click();
  await expect(page.getByTestId('3252d404-register-5-9')).toMatchAriaSnapshot(`
    - text: 注册
    - paragraph:
      - text: 已有账户？
      - button "直接登录"
    `);
  await expect(page.locator('form')).toMatchAriaSnapshot(`
    - textbox "请输入用户名（必填）"
    - textbox "请输入手机号"
    - textbox "请输入短信验证码"
    - button "获取验证码" [disabled]
    - textbox "请输入邮箱（必填）"
    - textbox "请输入密码（必填）"
    - checkbox "已读并同意产品隐私政策与服务协议"
    - text: 已读并同意产品
    - link "隐私政策"
    - text: 与
    - link "服务协议"
    `);
  await expect(page.getByTestId('3252d404-login-205-3')).toMatchAriaSnapshot(`- paragraph: Finclip 小程序数字管理平台`);
  await page.getByTestId('3252d404-register-22-17').click();
  await page.getByTestId('3252d404-register-22-17').fill('zhen'+randomPhoneNumber );
  await page.getByTestId('3252d404-register-22-17').press('Enter');
  await page.getByTestId('3252d404-register-31-17').click();
  await  page.getByTestId('3252d404-register-31-17').fill(randomPhoneNumber);
  await expect(page.getByTestId('341f0977-index-17-11')).toBeVisible();
  await page.getByTestId('341f0977-index-8-7').click();
  await page.getByTestId('341f0977-index-8-7').fill('380295');
  await page.getByTestId('3252d404-register-75-17').click();
  await page.getByTestId('3252d404-register-75-17').press('CapsLock');
  await page.getByTestId('3252d404-register-75-17').fill(randomPhoneNumber + '@qq.com');
  await page.getByTestId('3252d404-register-97-17').click();
  await page.getByTestId('3252d404-register-97-17').press('CapsLock');
  await page.getByTestId('3252d404-register-97-17').fill('Abcd@12345');
  await page.getByTestId('3252d404-register-111-17').locator('span').nth(1).click();
  await page.getByTestId('3252d404-register-160-9').click();
});




test('test重置密码和忘记密码界面检查', async ({ page }) => {
  await basePage.goto('/dev');
  await page.getByTestId('3252d404-login-134-13').click();
  await expect(page.getByTestId('3252d404-bottombuttonwrapper-2-3')).toMatchAriaSnapshot(`
    - button "账密登录"
    - button "忘记密码"
    `);
  await expect(page.getByTestId('373c592e-operationdesc-2-3')).toMatchAriaSnapshot(`
    - paragraph:
      - text: 没有账户？
      - button "免费注册"
    `);
  await expect(page.locator('form')).toMatchAriaSnapshot(`
    - textbox "请输入手机号"
    - textbox "请输入验证码，点击图片可更新"
    - textbox "请输入短信验证码"
    - button "获取验证码" [disabled]
    `);
  await page.getByTestId('3252d404-login-142-13').click();
  await expect(page.getByTestId('3252d404-forgetpass-5-9')).toMatchAriaSnapshot(`
    - text: 重置密码
    - paragraph: /遇到问题可致电 \\d+-\\d+/
    `);
  await expect(page.getByTestId('3252d404-forgetpass-166-9')).toMatchAriaSnapshot(`- button "重置密码"`);
  await expect(page.locator('form')).toMatchAriaSnapshot(`
    - textbox "请输入手机号"
    - textbox "请输入验证码，点击图片可更新"
    - textbox "请输入短信验证码"
    - button "获取验证码" [disabled]
    - textbox "请输入新密码"
    - textbox "请再次输入密码"
    `);
  await expect(page.getByTestId('3252d404-topnav-9-7')).toBeVisible();
});
});
