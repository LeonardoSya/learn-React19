export default function App() {
  return (
    <div>
      <div>
        Symbol 基础数据类型 创建全局唯一值
        Symbol.for 传入相同字符串时，不会重复创建不同的值，而是在后续的调用中读取之前已经创建好的值

        var a = Symbol.for('for')
        var b = Symbol.for('for')
        a === b  // true

        初始化时默认给所有缓存变量一个初始值，组件根据缓存值是否等于Symbol.for的初始值
        来判断某一段内容是否被初始化过。如果相等，则没有被初始化
      </div>

      <div>npx react-compiler-healthcheck  检测代码库是否兼容</div>

      <div>
        {/* 
        const ReactCompilerConfig = {
          sources: (filename) => {
            return filename.indexOf('src/path/to/dir') !== -1;
          },
        };
        */}
      </div>

      <div>eslint插件 npm i eslint-plugin-react-compiler</div>

      <div>eslint配置 
        {/*
        plugins: [
        'eslint-plugin-react-compiler',
        ],
        rules: {
          'react-compiler/react-compiler': 2,
        },
        */}
      </div>

      <div>npm i babel-plugin-react-compiler</div>

      <div>babel配置
        plugins: [
        ['babel-plugin-react-compiler', ReactCompilerConfig], // must run first!
        // ...
        ],
      </div>
    </div>
  )
}