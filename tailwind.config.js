/** @type {import('tailwindcss').Config} */
export default {
  content: [
    "./index.html",
    "./src/**/*.{js,ts,jsx,tsx}", // تحديد المسارات التي تستخدم Tailwind
  ],
  theme: {
    extend: {

      colors: {
        'primary' : '#f50a0a',
        'white' : '#fafafa',
        'red':'#aa0a0a',
       'secend2' : '#c1291b',
       'black' : '#000000',
       'secend1' :'#8A0303',
       'gray' :'#b9b9b9',
      'gray1' :'#626262',
        'whiteee' :'rgb(98, 98, 98)',
      }
    },
  },
  plugins: [],
}

