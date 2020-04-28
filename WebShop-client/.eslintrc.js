module.exports = {
    root: true,
    env: {
        node: true
    },
    extends: ['plugin:vue/essential'],
    parserOptions: {
        parser: 'babel-eslint'
    },
    rules: {
        //函数名后不留空格
        'space-before-function-paren': 0,
        //关闭缩进检查
        indent: 'off',
        'vue/script-indent': ['error', 4],
        //关闭文件末尾留空行
        'eol-last': 0,
        'no-console': process.env.NODE_ENV === 'production' ? 'warn' : 'off',
        'no-debugger': process.env.NODE_ENV === 'production' ? 'warn' : 'off'
    }
}
