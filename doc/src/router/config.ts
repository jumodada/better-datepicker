export const pathNames = [
  'start',
  'theme',
  'example',
  'example-options',
  'example-method',
  'options',
  'locale',
  'API',
]
const i18n = {
  en: [
    'start',
    'theme',
    'example',
    'example-options',
    'example-method',
    'options',
    'locale',
    'API',
  ],
  zh: [
    '开始',
    '主题',
    '示例',
    '示例-配置',
    '示例-方法',
    '配置',
    '地区设置',
    '其他接口',
  ],
}

export function routeConfig(lang: 'en' | 'zh') {
  return i18n[lang].map((name, index) => {
    return {
      path: pathNames[index],
      name,
    }
  })
}
