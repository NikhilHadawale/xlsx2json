import ExcelConverter from "./Components/ExcelConverter";
import NavBar from "./Components/NavBar";


function App() {
  return (
   <>
   <NavBar name="XLSX2JSON" option1="home" option2="about us" option3="contact us"/>
   <ExcelConverter/>
   </>
  );
}

export default App;
