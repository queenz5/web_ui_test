import { Page } from '@playwright/test';
import { ConfigManager } from '../utils/ConfigManager';

export class LoginPage {
    private readonly config = ConfigManager.getInstance();

    constructor(private page: Page) {}

    // 页面元素
    private readonly elements = {
        usernameInput: {
            dev: "请输入邮箱/用户名/手机号",
            ops: "请输入用户名/手机号"
        },
        passwordInput: "请输入密码",
        loginButton: "登 录",
        accountMenu: "[data-testid='d407f84d-accountinfo-10-7']",
        logoutButton: "退出登录",
        confirmButton: "确定"
    };
    
    /**
     * 获取页面标题
     */
    async getTitle() {
        return await this.page.title();
    }

    /**
     * 使用开发中心账号登录
     */
    async loginWithDevAccount() {
        const [username, password] = this.config.get('DEV_USER_ACCOUNT');
        await this.page.getByPlaceholder(this.elements.usernameInput.dev).click();
        await this.page.getByPlaceholder(this.elements.usernameInput.dev).fill(username);
        await this.page.getByPlaceholder(this.elements.passwordInput).click();
        await this.page.getByPlaceholder(this.elements.passwordInput).fill(password);
        await this.page.getByRole("button", { name: this.elements.loginButton }).click();
    }

    /**
     * 使用运营中心账号登录
     */
    async loginWithOpsAccount() {
        const [username, password] = this.config.get('OPS_USER_ACCOUNT');
        await this.page.getByPlaceholder(this.elements.usernameInput.ops).click();
        await this.page.getByPlaceholder(this.elements.usernameInput.ops).fill(username);
        await this.page.getByPlaceholder(this.elements.passwordInput).click();
        await this.page.getByPlaceholder(this.elements.passwordInput).fill(password);
        await this.page.getByRole("button", { name: this.elements.loginButton }).click();
    }

    /**
     * 登出操作
     */
    async logout() {
        await this.page.getByTestId("d407f84d-accountinfo-10-7").click();
        await this.page.getByText(this.elements.logoutButton).click();
        await this.page.getByRole("button", { name: this.elements.confirmButton }).click();
    }
}
