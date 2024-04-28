import './App.css';
import "../node_modules/bootstrap/dist/css/bootstrap.min.css"
import Navbar from './layout/Navbar';
import Home from './pages/Home';
import { BrowserRouter as Router, Routes, Route} from 'react-router-dom';
import AddFamilyMember from './familyMembers/AddFamilyMember';
import EditFamilyMember from './familyMembers/EditFamilyMember';
import ViewFamilyMember from './familyMembers/ViewFamilyMember';


function App() {
  return (
    <div className="App">
      <Router>
        <Navbar/>
        <Routes>
          <Route exact path="/" element={<Home/>}/>
          <Route exact path="/addfamilymember" element={<AddFamilyMember/>}/>
          <Route exact path="/editfamilymember/:id" element={<EditFamilyMember/>}/>
          <Route exact path="/viewfamilymember/:id" element={<ViewFamilyMember/>}/>
        </Routes>
      </Router>
      
    </div>
  );
}

export default App;