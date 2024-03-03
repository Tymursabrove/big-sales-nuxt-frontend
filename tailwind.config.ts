import type { Config } from 'tailwindcss'

export default <Partial<Config>>{
    content: [
        './node_modules/preline/preline.js',
    ],

    darkMode: 'class',

    plugins: [
        require('preline/plugin'),
        require('@tailwindcss/forms'),
    ]
}

