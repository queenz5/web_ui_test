import { Page } from '@playwright/test';
import { ConfigManager } from '../utils/ConfigManager';

export class BasePage {
    private readonly config = ConfigManager.getInstance();

    // 在类的顶部添加类型定义
    private readonly elements = {
        usernameInput: {
            dev: "请输入邮箱/用户名/手机号",
            ops: "请输入用户名/手机号"
        },
        passwordInput: "请输入密码",
        loginButton: "登 录"
    } as const;  // 使用 as const 确保类型不可变

    constructor(private page: Page) {}

    /**
     * 通用的页面打开方法
     * @param path 要打开的页面路径
     * @param accountAndPassword 可选的账号密码参数
     */
    async goto(path: string, accountAndPassword?: string) {
        const baseUrl = this.config.get('BASE_URL');
        const url = `${baseUrl}/${path}`;
        await this.page.goto(url);
        // 等待页面加载完成
        await this.page.waitForLoadState('networkidle');
    
        if(path !="/ops" && path !="/dev") {
            // 获取当前URL
            const currentUrl = this.page.url();
        
            // 根据URL中的app_type参数决定使用哪个登录方法
            if (currentUrl.includes('app_type=dev')) {
                await this.loginWithDevAccount(accountAndPassword);
            } else if (currentUrl.includes('app_type=ops')) {
                await this.loginWithOpsAccount(accountAndPassword);
            }
        }
    }

    /**
     * 使用开发中心账号登录
     */
    async loginWithDevAccount(accountAndPassword?: string) {
        const accountKey = accountAndPassword ?? 'DEV_USER_ACCOUNT';
        const credentials = this.config.get(accountKey) as [string, string];
        const [username, password] = credentials;
        await this.page.getByPlaceholder(this.elements.usernameInput.dev).click();
        await this.page.getByPlaceholder(this.elements.usernameInput.dev).fill(username);
        await this.page.getByPlaceholder(this.elements.passwordInput).click();
        await this.page.getByPlaceholder(this.elements.passwordInput).fill(password);
        await this.page.getByRole("button", { name: this.elements.loginButton }).click();
    }

    /**
     * 使用运营中心账号登录
     */
    async loginWithOpsAccount(accountAndPassword?: string) {
        const accountKey = accountAndPassword ?? "OPS_USER_ACCOUNT";
        const credentials = this.config.get(accountKey) as [string, string];
        const [username, password] = credentials;
        await this.page.getByPlaceholder(this.elements.usernameInput.ops).click();
        await this.page.getByPlaceholder(this.elements.usernameInput.ops).fill(username);
        await this.page.getByPlaceholder(this.elements.passwordInput).click();
        await this.page.getByPlaceholder(this.elements.passwordInput).fill(password);
        await this.page.getByRole("button", { name: this.elements.loginButton }).click();
    }

}
