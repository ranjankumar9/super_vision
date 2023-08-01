
import { useTranslation } from 'react-i18next';
import { useSelector, useDispatch } from 'react-redux';
import React, { useState, useEffect } from 'react';
import { v4 as uuidv4 } from 'uuid';
import { MDBIcon } from 'mdb-react-ui-kit';
import axios from 'axios';
import './style.css';
import Alert from '@mui/material/Alert';
import Button from '@mui/material/Button';
import Dialog from '@mui/material/Dialog';
import DialogActions from '@mui/material/DialogActions';
import DialogContent from '@mui/material/DialogContent';
import DialogTitle from '@mui/material/DialogTitle';
import InputLabel from '@mui/material/InputLabel';
import MenuItem from '@mui/material/MenuItem';
import FormControl from '@mui/material/FormControl';
import Select from '@mui/material/Select';
import { Box, Divider, IconButton, TextField, Tooltip } from '@mui/material';
import ArrowRightAltOutlinedIcon from '@mui/icons-material/ArrowRightAltOutlined';
import { databaseActions } from '../../../Store/database-slice';
import useDataHandleHook from '../../ComponentDataHook/DataHandleHook';
import CloseIcon from '@mui/icons-material/Close';
import '../commoncss/components.css';

import { ifNewActions } from '../../../Store/ifnew';

import { elseNewActions } from '../../../Store/elsenew';

import { activeProcessActions } from '../../../Store/activeProcess-slice';

import InfoOutlinedIcon from '@mui/icons-material/InfoOutlined';
import GetDataHook from '../../ComponentDataHook/GetDataHook';
import FillDataHook from '../../ComponentDataHook/FillData';


// const ip = localStorage.getItem("ip");
// const ip = "192.168.1.28"
const ip= "192.168.1.16";


const AddRow = ({
    id, purpose
}) => {

    // for info text

    const [textData, setTextData] = useState();
    const { filldata } = FillDataHook(id)
  const { getkeys } = GetDataHook()
    
    const getData=()=>{
        fetch('/infoText.json'
        ,{
          headers : { 
            'Content-Type': 'application/json',
            'Accept': 'application/json'
           }
        }
        )
          .then(function(response){
            console.log(response)
            return response.json();
          })
          .then(function(myJson) {
            console.log(myJson);
            setTextData(myJson)
          });
      }
      useEffect(()=>{
        getData()
      },[])
            console.log(textData);
    //

    const { t } = useTranslation()
    const processId = "02921d5d-2a92-408f-8b7a-b648936aca1b"

    const { visibilityHandler, updateComponentData, addComponentData, typeOfPurpose, editComponent } = useDataHandleHook(id);

    const itemId = useSelector(state => (state.ActiveProcess.itemId))

    const itemIds = useSelector(state => (state.ActiveProcess.activeProcess))

    const boxid = useSelector(state => (state.ActiveProcess.activeBoxid))

    const dispatch = useDispatch();


    const items = useSelector(state => state.components.items);
    console.log(items)
    const bank = useSelector((state) => (state.dataBank.data))

    const [pageUsingFor, setPageUsingFor] = useState(purpose);
    const [tableDropList, setTableDropList] = useState([]);
    const [columnDropList, setColumnDropList] = useState([]);
    const [columnsDrop, setColumnsDrop] = useState(false);
    const [columnDrop, setColumnDrop] = useState(true);
    const [rows, setRows] = useState([]);
    const [basicModal, setBasicModal] = useState(false);
    const [exist, setExist] = useState(false);
    const [inputError, setInputError] = useState(false);
    const [auto, setAuto] = useState(false);
    const [attachment1, setAttachment1] = useState('');
    const [columnHeaders, setColumnHeaders] = useState([]);
    const [tableName,setTableName] = useState()
    const [tableNameResponse,setTableNameresponse] = useState()



    const userId = localStorage.getItem("UserId")
    const activeType = useSelector(state => (state.ActiveProcess.type))
    console.log("tffffff", activeType)
    const activeBoxId = useSelector(state => (state.ActiveProcess.activeBoxid))
    console.log(activeBoxId)

    const mappedDataFromRedux = useSelector(state => state.dataTable.mappedData);
    const mappedData = [mappedDataFromRedux]
    const excelJSONData = useSelector(state => state.dataTable.excelJsonData);

    const hasHeaders = useSelector(state => state.dataTable.hasHeaders)
    console.log(hasHeaders);

    const showExcelHeaders = useSelector(state => state.dataTable.showExcelHeaders);
    // console.log(showExcelHeaders.headers)

    // let excelHeaders = Object.values(showExcelHeaders.headers[0]);
    // console.log(excelHeaders)


    console.log(excelJSONData)
    console.log(mappedData[0].tablename);
    console.log(mappedData[0].columns)

    console.log(mappedData[0].mappedData);

    const toggleShow = () => {
        setBasicModal(!basicModal);
        setInputError(false);
    };
    
    const getTableName = async () => {
        const formdata = new FormData()
        formdata.append("table", (JSON.stringify({
            id,
            backId: processId,
            component: {
                process: "CreateDataTable",
                "TableName":tableName,
                userId,
            }
        })))

        axios.post(`http://${ip}:8003/SendTablename`, formdata) 
        .then(response =>
            setTableDropList([response.data[0].tablename]))


        // const response = await axios.get(`http://${ip}:8003/SendTablename`)
        // console.log(response.data[0].tablename);
        // if(response.data[0].user_id==userId){
        //     setTableDropList([response.data[0].tablename])

        // }
        // setTimeout(() => {
        //     // setHidealert(false)
        //     setBasicModal(false)
        // }, 3000)
        // if(activeType == "ifnew"){

        //     console.log("hiiiiiii",id)

        //     dispatch(ifNewActions.toggleVisibilityif({ itemId, pid: itemIds }))

        //     dispatch(activeProcessActions.resetActive())

        //     // dispatch(componentActions.toggleVisibility(id));

        // }

        // if(activeType == "elsenew"){

        //     console.log("hiiiiiii",id)

        //     dispatch(elseNewActions.toggleVisibility({ id, pid: itemIds }))

        //     dispatch(activeProcessActions.resetActive())

        //     // dispatch(componentActions.toggleVisibility(id));

        // }

        // if(activeType == "elifthen"){

        //     dispatch(ifNewActions.toggleVisibilitythen({ itemId,boxid, pid: itemIds }))

        //     dispatch(activeProcessActions.resetActive())

        // }
    };

   console.log(tableName)
    // useEffect(() => {

    //     const dat = getkeys("", "Array")
    
    //     console.log(dat)
    //     let arr = [...dat]
    //     console.log(arr)
    //     setTableName(arr)
    //     let test=  arr.map((item)=>item.variableName)
    //     let lastElement = test[test.length-1]
    //      console.log(lastElement)
    //     // setShowStoredVar(arr);
    
    //     const formdata = new FormData()
    //     formdata.append("table", (JSON.stringify({
    //         id,
    //         backId: processId,
    //         component: {
    //             process: "CreateDataTable",
    //             // "tablename":arr[0]?.variableName,
    //             "tablename":(lastElement),
    //             userId,
    //         }
    //     })))

    //     axios.post(`http://${ip}:8003/SendTablename`, formdata) 
    //     .then(response =>{
    //         setTableDropList([response.data[0].tablename])
    //         setTableNameresponse(response.data[0].tablename)
    //      } )
           
    //     // const lists = dat.filter((item) => (item.dataType == "Object"))
    
    //     // console.log(lists, "yyyyyyyyyyy=======>", dat)
    
       
    //   }, [])
   
      useEffect(() => {
        // getTableName()
        const dat = getkeys("", "Array")
    
        console.log(dat)
        let arr = [...dat]
        console.log(arr)
        setTableDropList(arr)
    }, [])
    // Update here
    const clearMappedData = () => {
        dispatch(databaseActions.handleMappedDataAddRow({ tablename: "", columns: [], mappedData: [] }));
    }

    let data = {};
    let addRowDatatable = {};
    if (!auto) {
        addRowDatatable = {
            id,
            backId: processId,
            component: {
                tablename: attachment1,
                userId,
                columns: columnDropList,
                rowData: rows,
                automatic: "No"
            }
        };

        data = {
            id,
            backId: processId,
            // component: {
            component: {
                process: "AddDataTableRecord",
                userId,
                tablename: attachment1,
                columns: columnDropList,
                rowData: rows,
                automatic: "No"
            }
        };
    }
    else {


        addRowDatatable = {
            id,
            backId: processId,
            component: {
                tablename: mappedData[0].tablename,
                userId,
                columns: mappedData.columns,
                automatic: "Yes",
                mapData: mappedData[0].mappedData,
                excelJSONData: excelJSONData
            }
        };

        data = {
            id,
            backId: processId,
            // component: {
            component: {
                process: "AddDataTableRecord",
                userId,
                tablename: mappedData[0].tablename,
                columns: mappedData.columns,
                automatic: "Yes",
                mapData: mappedData[0].mappedData
            }
        }
    }
    const submitHandler = async () => {
        // setInputError(false);
        // if (!exist) addComponentData(data, pageUsingFor);
        // if (exist) updateComponentData(data, pageUsingFor);

        console.log(addRowDatatable)

        const formData = new FormData();
        formData.append('mapadddatas', JSON.stringify(addRowDatatable));

     axios.post(`http://${ip}:8003/MapAddData`, formData)
     .then((response)=>
     {    
 
        //  filldata({ id, vardata: response.data, variable: addRowDatatable, type: "object", processName: "Add_Row", parent: "datatable" })
        console.log("Back Data", response.data);
        // console.log(response.data[0]?.s2)
        // visibilityHandler(pageUsingFor);
        // toggleShow();
        // clearMappedData();
    })
        console.log(addRowDatatable.component.rowData)
        
        setTimeout(() => {
            // setHidealert(false)
            setBasicModal(false)
        }, 3000)
        if (activeType == "ifnew") {

            console.log("hiiiiiii", id)

            dispatch(ifNewActions.toggleVisibilityif({ itemId, pid: itemIds }))

            dispatch(activeProcessActions.resetActive())

            // dispatch(componentActions.toggleVisibility(id));

        }

        if (activeType == "elsenew") {

            console.log("hiiiiiii", id)

            dispatch(elseNewActions.toggleVisibility({ id, pid: itemIds }))

            dispatch(activeProcessActions.resetActive())

            // dispatch(componentActions.toggleVisibility(id));

        }

        if (activeType == "elifthen") {

            dispatch(ifNewActions.toggleVisibilitythen({ itemId, boxid, pid: itemIds }))

            dispatch(activeProcessActions.resetActive())

        }
    };

       
 

    const onTableselectHandler = async (obj) => {
     
        const db_name=obj.target.value
        const formdata = new FormData()
        formdata.append("table", (JSON.stringify({
            id,
            backId: processId,
            component: {
                process: "CreateDataTable",
             
                "tablename":(db_name),
            
                userId,
            }
        })))
        axios.post(`http://${ip}:8003/DataDisplay`,formdata)
            .then(response => {
                console.log(response.data);
                setColumnsDrop(true)
                const list = [...response.data];
                setRows(list);
            // setColumnDropList(data.columns ? data.columns : "")
                // setDataTable(response.data)
               //  setTableData(response.data)
               // const entryData = response.data.map(item => [item]);
               // const entries = new Map(entryData);
               // const data = Object.fromEntries(entries);
               // setRows((preState) => [...preState, data]);
              
            })
        const data = {
            id,
            backId: processId,
            component: {
                process: "CreateDataTable",
                userId,
                "tablename":(db_name),

       
           
        }
        }

     

            const formData = new FormData();
            formData.append('datatablecolumns', JSON.stringify(data));
        await axios.post(`http://${ip}:8003/SendTableColumnname`,formData)

        .then((response)=>{
            console.log(response)
            console.log(response.data);

            setColumnDrop(true);

            if (response.statusText === "OK") {
                setColumnDropList(() => response.data[0].data);
                console.log(response.data[0].data)
                setColumnDrop(true);
                setColumnsDrop(true);

                const entryData = response.data[0].data.map(item => [item, ""]);
                const entries = new Map(entryData);
                const data = Object.fromEntries(entries)
                console.log(data);
                setRows(() => [data]);

                const list = response.data.data[0].map(item => ({ id: uuidv4(), dtcolumn: item, excelcolumn: "" }));
                console.log(list)
                setColumnHeaders(() => list);
                // setTimeout(() => {
                //     // setHidealert(false)
                //     setBasicModal(false)
                // }, 3000)
                // if(activeType == "ifnew"){

                //     console.log("hiiiiiii",id)

                //     dispatch(ifNewActions.toggleVisibilityif({ itemId, pid: itemIds }))

                //     dispatch(activeProcessActions.resetActive())

                //     // dispatch(componentActions.toggleVisibility(id));

                // }

                // if(activeType == "elsenew"){

                //     console.log("hiiiiiii",id)

                //     dispatch(elseNewActions.toggleVisibility({ id, pid: itemIds }))

                //     dispatch(activeProcessActions.resetActive())

                //     // dispatch(componentActions.toggleVisibility(id));

                // }

                // if(activeType == "elifthen"){

                //     dispatch(ifNewActions.toggleVisibilitythen({ itemId,boxid, pid: itemIds }))

                //     dispatch(activeProcessActions.resetActive())

                // }
            }
    
        } )
      
          
    }
    const addRowData = () => {
        const entryData = columnDropList.map(item => [item, ""]);
        const entries = new Map(entryData);
        const data = Object.fromEntries(entries);
        setRows((preState) => [...preState, data]);
    }

    const addRowChangeHandler = (index, value, name) => {
        console.log(index, name, value);

        const list = [...rows];
        list[index][name] = value;
        setRows(() => list);
    }



    console.log(rows);


    const [populate1, setPopulate1] = useState(false)

    const editallfieilds = (info) => {
        console.log(info)
        const exst = info.exst

        const data = info.compInfo
        const data2 = info.excelInfo
        // console.log(data2)
        const elifData = info.elifData

        if (exst) {
            setExist(true);
        
            setTableDropList([data?.tablename ? data?.tablename : ""])
            setRows(data?.rowData ? data?.rowData : "")
            setColumnsDrop(true)
           

            // setAttachment1(data?.tablename?data?.tablename:"");
            setColumnDropList(data.columns ? data.columns : "")
            setPopulate1(true)

        }
        // console.log(data);

        if (data2 && activeType == "ifnew") {
            console.log(data2)
            setExist(true);


            setRows(data2?.content[0]?.componentData?.component?.if?.then[0]?.component?.rowData ? data2?.content[0]?.componentData?.component?.if?.then[0]?.component?.rowData : "")
            setColumnsDrop(true)

            setAttachment1(() => data.tablename);
            setColumnDropList(data2?.content[0]?.componentData?.component?.if?.then[0]?.component?.columns ? data2?.content[0]?.componentData?.component?.if?.then[0]?.component?.columns : "")
            setPopulate1(true)

        }

        if (data2 && activeType == "elsenew") {
            setExist(true);


            setRows(data2?.content[0]?.componentData?.component?.else[0]?.component?.rowData ? data2?.content[0]?.componentData?.component?.else[0]?.component?.rowData : "")
            setColumnsDrop(true)

            setAttachment1(() => data.tablename);
            setColumnDropList(data2?.content[0]?.componentData?.component?.else[0]?.component?.columns ? data2?.content[0]?.componentData?.component?.else[0]?.component?.columns : "")
    
            setPopulate1(true)

        }


        if (elifData && activeType === "elifthen") {
            const elifDatas = elifData?.content
            // console.log(elifDatas)


            // console.log(dataStore)
            // let newArr=[]
            for (let i = 0; i < elifDatas.length; i++) {

                //    console.log(elifDatas[i])
                if (activeBoxId === elifDatas[i].boxId) {
                    setExist(true);


                    setRows(elifDatas[i].then[0]?.componentData?.component?.rowData ? elifDatas[i].then[0]?.componentData?.component?.rowData : "")
                    setColumnsDrop(true)

                    setAttachment1(() => data.tablename);
                    setColumnDropList(elifDatas[i].then[0]?.componentData?.component?.columns ? elifDatas[i].then[0]?.componentData?.component?.columns : "")
                    setPopulate1(true)

                }
            }
        }



    }

 
    console.log(rows)


    useEffect(() => {
        // to get what is the purpose of the component whether it is used for main process/ inside while loop/ inside if condition
        const pageusingtype = typeOfPurpose();
        editallfieilds(editComponent(pageusingtype));
        // setPageUsingFor(pageusingtype);

    }, []);
   

    // const resetAll = () => {
    //     setAttachment1('');
    //     setInputError(false);
    // }
    const editflag = useSelector((state) => (state.editFlag))
    const isviewed = editflag.editassignFlag

    return (
        <>
            <MDBIcon far icon="edit" onClick={toggleShow} />

            <Dialog
                open={basicModal}
                onClose={toggleShow}
                fullWidth={true}
                maxWidth="sm"
                aria-labelledby="alert-dialog-title"
                aria-describedby="alert-dialog-description"
            >

                <Box sx={{ mb: -5 }}>
                    <DialogTitle id="alert-dialog-title" color='primary'>
                        {t('Add Row')}
                    </DialogTitle>
                    <Box>
                        <Tooltip sx={{ ml: "93%", mt: -13 }} title="Close">
                            <IconButton onClick={() => setBasicModal(false)}>
                                <CloseIcon />
                            </IconButton>
                        </Tooltip>
                    </Box>
                </Box>
                <DialogContent>

                    {!auto && (

                        <Box sx={{ mt: -3 }}>
                            <FormControl sx={{ mt: 2, width: '49%', ml: "1%" }} size="small" variant='filled'>
                                <InputLabel id="demo-select-small">  {t('Select Table')} </InputLabel>
                                <Select
                                    labelId="demo-select-small"
                                    id="demo-select-small"
                                    label={t("Select Table")}
                                    value={attachment1}
                                    onChange={obj => { setAttachment1(obj.target.value); setInputError(false); onTableselectHandler(obj)}}
                                    disabled={isviewed}
                                >
                                    {tableDropList.map((item, index) => <MenuItem ket={index} value={item?.variableName}> {item?.variableName} </MenuItem>)}
                                  

                                </Select>
                            </FormControl>

                            {/* for info button */}
                          { textData &&  <Tooltip title={textData.select_data_table_name}>

                                <InfoOutlinedIcon sx={{ fontSize: "medium", color: "black", mt: 3, ml: 1 }} />

                            </Tooltip>
}
                            
                            <Box>
                                <div className='d-flex justify-content-between mt-4'>
                                    <p> {t('Row Details')} </p>
                                    <Button id="btn" variant='contained' size='small' color='inherit' sx={{ height: 30 }} onClick={addRowData} disabled={isviewed}> {t('Insert')} </Button>
                                </div>

                                <Divider />
                                {columnsDrop && (
                                    <div className='px-1' style={{ overflow: "scroll" }}>

                                        <table cellPadding='5' className='table table-bordered table-sm' >
                                            <thead>
                                                <tr className='bg-dark text-white'>
                                                    {columnDropList.map(item => <th className='thead'> {item} </th>)}
                                                </tr>
                                                
                                            </thead>

                                            <tbody>
                                                {rows.map((row, index) => {
                                                    return (<tr key={index}>
                                                        {columnDropList.map((item) =>
                                                        (<td>
                                                            <input
                                                                key={item}
                                                                value={row[data]}
                                                                type='text'
                                                             
                                                                className='row-input'
                                                                name={item}
                                                                onChange={e => addRowChangeHandler(index, e.target.value, e.target.name)}
                                                            />
                                                        </td>))}
                                                    </tr>)
                                                })}
                                            </tbody>

                                        </table>
                                    </div>

                                )}
                                <div className='mt-5'>
                                    {!columnDrop && <Alert severity="info" sx={{ heigth: 50 }}> {t('Select Table to get column list!')} </Alert>}
                                    {inputError && <Alert severity="error" sx={{ heigth: 50 }}> {t('No fields should be empty!')} </Alert>}
                                </div>
                            </Box>
                        </Box>
                    )}


                    {auto && (
                        hasHeaders ? <>
                            <div className='mt-3'>
                                <TextField
                                    sx={{ width: "49%", ml: "1%" }}
                                    variant='filled'
                                    size='small'
                                    value={mappedData[0].tablename}
                                    label='Data Table Name'
                                    disabled={isviewed}
                                />
                            </div>
                            <Box>
                                <h5 className='text-center mt-4'> {!auto ? "Insert Data" : "Mapped Data"} </h5>
                                <div className='mt-2 mb-2 border rounded pt-2'>
                                    <div className='row'>
                                        <div className='col-md-5  text-end'>
                                            <p style={{ color: "#2196f3" }}> <b>{t('Excel Headers')}</b> </p>
                                        </div>
                                        <div className='col-md-2 text-center'>  </div>
                                        <div className='col-md-5 text-start'>
                                            <p style={{ color: "#2196f3" }}>  <b>{t('Data Table Columns')}</b> </p>
                                        </div>
                                    </div>
                                    {mappedData[0].mappedData !== undefined && mappedData[0].mappedData.map(item => {
                                        return (
                                            <div className='row'>
                                                <div className='col-md-5  text-end'>
                                                    <p> {item.excelcolumn} </p>
                                                </div>
                                                <div className='col-md-2 text-center'> <p> <ArrowRightAltOutlinedIcon /> </p> </div>
                                                <div className='col-md-5 text-start'>
                                                    <p>  {item.dtcolumn} </p>
                                                </div>
                                            </div>
                                        );
                                    })}

                                </div>
                            </Box>
                        </>
                            :
                            <>
                                <div className='mt-3'>
                                    <TextField
                                        sx={{ width: "49%", ml: "1%" }}
                                        variant='filled'
                                        size='small'
                                        value={mappedData[0].tablename}
                                        label='Data Table Name'
                                        disabled={isviewed}
                                    />
                                </div>
                                <Box>
                                    <h5 className='text-center mt-4'> {!auto ? "Insert Data" : "Mapped Data"} </h5>
                                    <div className='mt-2 mb-2 border rounded pt-2'>
                                        <div className='row'>
                                            <div className='col-md-5  text-end'>
                                                <p style={{ color: "#2196f3" }}> <b>{t('Excel Headers')}</b> </p>
                                            </div>
                                            <div className='col-md-2 text-center'>  </div>
                                            <div className='col-md-5 text-start'>
                                                <p style={{ color: "#2196f3" }}>  <b>{t('Data Table Columns')}</b> </p>
                                            </div>
                                        </div>
                                        <Box>
                                            {mappedData[0].mappedData !== undefined && mappedData[0].mappedData.map(item => {
                                                const excelHeaders = Object.keys(showExcelHeaders.headers[0]);
                                                console.log(excelHeaders)
                                                return (
                                                    <div className='row'>
                                                        <div className='col-md-5  text-end'>
                                                            <p> {excelHeaders} </p>
                                                        </div>
                                                        <div className='col-md-2 text-center'> <p> <ArrowRightAltOutlinedIcon /> </p> </div>
                                                        <div className='col-md-5 text-start'>
                                                            <p>  {item.dtcolumn} </p>
                                                        </div>
                                                    </div>
                                                );
                                            })}


                                            <div className='row'>
                                                <div className='col-md-5  text-end'>
                                                    {Object.values(showExcelHeaders.headers[0]) === 'undefined' && Object.values(showExcelHeaders.headers[0]).map(it => <p>{it}</p>)}
                                                </div>
                                                <div className='col-md-2 text-center'> <p> <ArrowRightAltOutlinedIcon /> </p> </div>
                                                <div className='col-md-5 text-start'>
                                                    {mappedData[0].mappedData !== undefined && mappedData[0].mappedData.map(item => {
                                                        return (
                                                            <p>  {item.dtcolumn} </p>
                                                        );
                                                    })}
                                                </div>
                                            </div>
                                        </Box>
                                    </div>
                                </Box>
                            </>
                    )}



                </DialogContent>
                <DialogActions sx={{ pr: 4, pb: 2 }}>
                    {/* <Button id="btn" variant='contained' size='small' color='inherit' onClick={resetAll}  disabled={isviewed}> {t('Reset')} </Button> */}
                    <Button id="btn" variant='contained' size='small' color='inherit' onClick={submitHandler} disabled={isviewed}> {t('Save')} </Button>
                </DialogActions>
            </Dialog>
        </>
    );
}

export default AddRow;
