import * as fs from 'fs';
import * as path from 'path';
import { dirname } from 'path';
import { fileURLToPath } from 'url';

// 获取当前文件的目录路径
const currentDir = dirname(fileURLToPath(import.meta.url));

// 直接导入配置文件获取类型
const envConfig = JSON.parse(fs.readFileSync(path.join(currentDir, '../config/environments.json'), 'utf-8'));
type EnvConfig = typeof envConfig;
type Environment = keyof EnvConfig;

// 导入测试数据配置文件获取类型
const testDataConfig = JSON.parse(fs.readFileSync(path.join(currentDir, '../config/testData.json'), 'utf-8'));
type TestDataConfig = typeof testDataConfig;

/**
 * 配置管理器
 * 用于读取和管理不同环境的配置
 */
export class ConfigManager {
    private static instance: ConfigManager;
    private config: EnvConfig;
    private testData: TestDataConfig;
    private currentEnv: Environment;
    private readonly configPath: string;
    private readonly testDataPath: string;

    private constructor() {
        // 从环境变量获取环境标识，默认为 FC_TESTING
        this.currentEnv = (process.env.TEST_TARGET as Environment) || 'FC_TESTING';
        // 设置配置文件路径
        this.configPath = path.join(currentDir, '../config/environments.json');
        this.testDataPath = path.join(currentDir, '../config/testData.json');
        this.loadConfig();
        this.loadTestData();
    }

    /**
     * 获取配置管理器实例
     */
    public static getInstance(): ConfigManager {
        if (!ConfigManager.instance) {
            ConfigManager.instance = new ConfigManager();
        }
        return ConfigManager.instance;
    }

    /**
     * 加载配置文件
     */
    private loadConfig() {
        try {
            if (!fs.existsSync(this.configPath)) {
                throw new Error(`配置文件不存在: ${this.configPath}`);
            }

            const configContent = fs.readFileSync(this.configPath, 'utf8');
            this.config = JSON.parse(configContent);
            
            // 验证当前环境是否存在
            if (!this.config[this.currentEnv]) {
                console.warn(`Environment ${String(this.currentEnv)} not found, falling back to FC_TESTING`);
                this.currentEnv = 'FC_TESTING';
            }
        } catch (error) {
            console.error(`Failed to load config file: ${error}`);
            throw new Error(`配置文件加载失败: ${error}`);
        }
    }

    /**
     * 加载测试数据配置文件
     */
    private loadTestData() {
        try {
            if (!fs.existsSync(this.testDataPath)) {
                throw new Error(`测试数据配置文件不存在: ${this.testDataPath}`);
            }

            const testDataContent = fs.readFileSync(this.testDataPath, 'utf8');
            this.testData = JSON.parse(testDataContent);
        } catch (error) {
            console.error(`Failed to load test data file: ${error}`);
            throw new Error(`测试数据配置文件加载失败: ${error}`);
        }
    }

    /**
     * 获取指定配置项的值
     * @param key 配置项键名
     * @returns 配置项的值
     */
    public get<K extends keyof EnvConfig[Environment]>(key: K): EnvConfig[Environment][K] {
        const value = this.config[this.currentEnv][key];
        if (value === undefined) {
            throw new Error(`配置项 ${String(key)} 不存在`);
        }
        return value;
    }

    /**
     * 获取测试数据
     * @param key 数据路径，支持点号分隔的路径，如 'appSearch.appid'
     * @returns 测试数据值
     */
    public getTestData(key: string): any {
        try {
            const keys = key.split('.');
            let value: any = this.testData;
            
            for (const k of keys) {
                if (value === undefined || value === null) {
                    throw new Error(`测试数据路径 ${key} 不存在`);
                }
                value = value[k];
            }

            if (value === undefined) {
                throw new Error(`测试数据 ${key} 不存在`);
            }

            return value;
        } catch (error) {
            console.error(`Failed to get test data for key ${key}: ${error}`);
            throw error;
        }
    }
}
