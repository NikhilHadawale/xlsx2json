import { monokai, twilight } from 'base16';
import React , {useState} from 'react';
import ReactJson from 'react-json-view';
const XLSX = require('xlsx');


export default function ExcelConverter() {

    const [file,setFile] = useState();
    const [json,setJson] = useState([]);
    const [isJsonLoaded,setIsJsonLoaded] = useState(false);
    const [isSelected,setIsSelected] = useState(false);
    const [sheets,setSheets] =useState([]);
    const [prefix,setPrefix] = useState("");
    const [suffix,setSuffix] = useState("");
    const [sheet,setSheet] = useState(null);


    const sharedProps = {
        displayDataTypes: false,
        displayObjectSize: false,
        iconStyle : "square",
      };

    const handleFile = (event)=>{
        let file1 = event.target.files[0];
        if(file1){
            setFile(file1);
            setIsSelected(true);
        }
    }

    const onClickHandler = (event)=>{

        event.preventDefault();
        
        const reader = new FileReader();
        reader.onload = (e)=>{
            const data = e.target.result;
            const readedData = XLSX.read(data,{type:'binary'});

            setSheets(readedData.SheetNames);
            const wsname = isSelected?(sheet):null;
            const ws = readedData.Sheets[wsname];

            const dataParse = XLSX.utils.sheet_to_json(ws, {raw:true});
            
            setJson(dataParse);  
            setIsJsonLoaded(true);
            
        }
        reader.readAsBinaryString(file)

    }
    
    const onClickDown =(e)=>{
        
        const fileData = JSON.stringify(json);
        const blob = new Blob([fileData], {type: "text/plain"});
        const url = URL.createObjectURL(blob);
        const link = document.createElement('a');
        link.download = 'filename.json';
        link.href = url;
        link.click();
    }

    const handlePrefix =(e)=>{
       
        setPrefix(e.target.value);

    }

    const handleSuffix =(e)=>{
       
        setSuffix(e.target.value);

    }

    const handleSheet =(e)=>{
        setSheet(e.target.value)
    }
    return (
        <div className="container-fluid row position-fixed my-3">
            <div className="container col-3">
                <form>
                <blockquote className="blockquote">Select a file (xlsx/csv/xls) </blockquote>
                <input id="excel_file" name="excel_file" type="file" accept=".xls,.xlsx,.csv" onChange={handleFile}/>
                <br/>
                <label className ="form-label mt-3"> prefix
                <input type = "text" className="form-control" value= {prefix} onChange={handlePrefix}/>
                </label>
                <br/>
                <label className ="form-label mt-3"> suffix
                <input type = "text" className="form-control" value= {suffix} onChange={handleSuffix}/>
                </label>
                <br/>
                {
                    isSelected?(  
                        <div> 
                        <label className ="form-check-label"> sheet </label>
                        <select className="form-select" value={sheet} onChange={handleSheet}>
                        {sheets.map(obj=>(
                            <option value={obj}>{obj}</option>
                        ))}
                        </select>
                        </div>
                    ):null
                }
                <button type="button" className="btn btn-sm btn-primary mt-3 mb-3" onClick={onClickHandler}>View JSON</button> 
                {isJsonLoaded?(
                    <button type="button" className="btn btn-sm btn-success mt-3 mx-3 mb-3" onClick={onClickDown}>Download JSON</button> 
                ):null}
                </form>
            </div>   
            <div className="container col cust-scroll"> 
                {
                    json.map(obj=>(
                        <ReactJson src= {obj} {...sharedProps}/>
                    ))
                }
            </div>
        </div>
    )
}
