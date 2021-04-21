export default function Home(props) {
  console.log(props.episodes)

  // Consumo de API em SPA (React e Next)
  // Não é uma boa opção para o SEO e indexação, pois só serão carregadas as informações depois de carregada a página
  // useEffect(() => {
  //   fetch('http://localhost:3333/episodes')
  //     .then(response => response.json())
  //     .then(data => console.log(data))
  // }, [])

  return (
    <div>
      <h1>Index</h1>
      <p>{JSON.stringify(props.episodes)}</p>
    </div>
  )
}

// Consumo de API em SSR (Next)
// Dentro de qualquer arquivo da pasta pages deve se importar uma função getServerSideProps()
// export async function getServerSideProps() {
//   const response = await fetch('http://localhost:3333/episodes')
//   const data = await response.json()
    
//   return {
//     props: {
//       episodes: data
//     }
//   }
// }

// Consumo de API em SSG (Next)
// Útil para deixar a aplicação mais performática no caso de conteúdo que não muda tanto em questão de tempo
export async function getStaticProps() {
  const response = await fetch('http://localhost:3333/episodes')
  const data = await response.json()
    
  return {
    props: {
      episodes: data
    },
    // Propriedade que recebe o tempo em que tem que gerar uma nova versão da página em segundos, ou seja, fazer uma nova requisição para gerar um novo HTML (conteúdo estático) a ser servido para os usuários dentro do período de tempo indicado
    revalidate: 60 * 60 * 8
  }
}