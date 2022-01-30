import React from 'react';
import AltCard from './components/card/card';
import SearchAppBar from './components/app-bar/bar';
import AddNewMovie from './components/modal/modal';
import { ReloadContext, Reload } from './context/movieContext';


function App() {
  const [value, setValue] = React.useState([]);
  const [reload, setReload] = React.useState(Reload.reload);

  console.log(value)
  React.useEffect(() => {

   
  })
  return (
    <ReloadContext.Provider value={{ reload, setReload }}>
    <div className="App">
       <br/>
        <SearchAppBar/>
        <br/>
        <AddNewMovie />
        <AltCard />
    </div>
    </ReloadContext.Provider >
  );
}

export default App;
