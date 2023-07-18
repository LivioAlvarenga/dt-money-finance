export default function Home() {
  const textShadow = {
    color: '#ffffff',
    textShadow:
      '0 0 10px #26a9e0, 0 0 20px #26a9e0, 0 0 40px #26a9e0, 0 0 80px #26a9e0',
  }

  return (
    <main className="wrapper flex flex-1 flex-col items-start justify-start">
      <h1 className="headline6 sm:headline4 lg:headline2 mt-5 text-center font-playfair400 text-tGray lg:max-w-7xl">
        Projeto de <b style={textShadow}>DT Money Gestão Financeira</b> com
        Nextjs 13 App Router, React, Typescript e Tailwindcss.
      </h1>
      <div className="my-20 flex w-full items-center justify-center rounded-lg bg-gray-800 p-5 lg:p-10">
        Home!!!
      </div>
    </main>
  )
}
