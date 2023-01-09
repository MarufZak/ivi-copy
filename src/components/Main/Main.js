import './Main.module.css'
import Intro from './Intro/Intro';
import Content from './Content/Content';

const Main = () => {
  return <main className='main'>
    <Intro />
    <Content />
  </main>
}

export default Main;