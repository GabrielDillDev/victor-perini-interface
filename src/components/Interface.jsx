import AddImage from './AddImage.jsx';
import ImageList from './ImageList.jsx';
import AddEvent from './AddEvent.jsx';
import EventList from './EventList.jsx';
import BioText from './BioText.jsx';
import Lancamento from './Lancamento.jsx';
import GlobalStyle from './GlobalStyle.jsx';


function App() {
  
  return (
    <>
     <GlobalStyle />
     <AddImage />
     <ImageList />
     <AddEvent />
     <EventList />
     <BioText />
     <Lancamento />
    </>
  )
  
}

export default App
