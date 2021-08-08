export const pathNames = ['start', 'theme', 'options', 'locale', 'API']
const i18n = {
  en: ['start', 'theme', 'options', 'locale', 'API'],
  zh: ['开始', '主题', '配置', '地区设置', '其他接口'],
}

export function routeConfig(lang: 'en' | 'zh') {
  return i18n[lang].map((name, index) => ({
    path: pathNames[index],
    name,
  }))
}
