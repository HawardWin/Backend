import React, { useState , useEffect } from 'react'
import axios from 'axios'
import './Notes.css'
 
    // let r ;
    // let g ;
    // let b ;
    let color
    let style
   



const Notes = () => {
 
  const [inputTF, setInputTF] = useState(false)
  let [notes, setNotes] = useState([])
  const [UpdateDes, setUpdateDes] = useState('')
  const [NoteId, setNoteId] = useState('')

 async function  createNotes (e){

                   e.preventDefault() ;
         
      color =    await `rgb(${Math.floor(Math.random() * 100) + 108} , ${Math.floor(Math.random() * 100) + 108} , ${Math.floor(Math.random() * 100) + 108}) `
                    console.log(color)
       const {Title , Description } = e.target

            axios.post('http://localhost:4000/api/notes' , { 
                 Title : Title.value , 
                 Description : Description.value ,
                 Color: color })

                 .then(res=>{
                  console.log("new note has been added ")
                  fetchTheNotes()
                 })

  }

   async    function deleteNote (note){
             console.log(note._id)

        await     axios.delete(`http://localhost:4000/api/notes/${note._id}`)
                .then(res=>{
                  console.log(`Note ${note.Title} has been deleted `)
                  fetchTheNotes()
                })
                 }
  

  function editDes(e){
         
    e.preventDefault();
    // setUpdateDes(e.target.elements[0].value)
      
    editTheNotes(e.target.elements[0].value)
     
        console.log(inputTF)
        
        e.target.elements[0].value = ''

  const  value = inputTF ? false : true ;
  setInputTF(value)


  }


  async    function editTheNotes(data){
               console.log(NoteId)
        if(data){
             await  axios.patch('http://localhost:4000/api/notes/' + NoteId , {
          Description : data 
         })

         .then(res=>{
          console.log(`Note ${NoteId} has been edited`)
         })
        }
      
        fetchTheNotes()
      }


         function fetchTheNotes(){
       axios.get('http://localhost:4000/api/notes') 
      .then((res)=>{
          setNotes(res.data.notes)            
       })
     }

     

    useEffect(()=>{                                     
   
       axios.get('http://localhost:4000/api/notes') 
      .then((res)=>{
          setNotes(res.data.notes)             // useEffet don't allow to re-render such codes in it.. 
       })
     }, [] )

  

  return (
     <>
        <form className='note-create' onSubmit={createNotes}>
          <div className="title">
            <label htmlFor="name">Title Name : </label>
          <input  type="text" id='name' name='Title' placeholder='Enter Title Name' />
          </div>
          <div className="des">
            <label htmlFor="name">Description : </label>
          <input type="text" name='Description' placeholder='Enter Title Description' />
          </div>
          <div className="type">
             <div className="urgent">
            <label htmlFor="urgent">Urgent</label>
            <input type="radio" id='urgent' value='urgent'/>
             </div>

                      <div className="urgent">
            <label htmlFor="urgent">Urgent</label>
            <input type="radio" id='urgent' value='urgent'/>
             </div>
          </div>
          <button type='submit'>Submit</button>
        </form>
      
       <div className="notes">
      {notes.map((note)=>{
                            
                                             
                  // style={{backgroundColor : `rgb(${r},${g} , ${b})`}}
           return <div className="note" style={{backgroundColor : note.Color}} >  
                    <h3>{note.Title}</h3>
                    <p>{note.Description}</p>
                   
                   <div className="action">
                    <div > <i className="ri-check-line"></i> </div>   


                    <div onClick={()=>{
                      setInputTF(true)
                      setNoteId(note._id)
                    }}>  <i className="ri-pencil-fill"></i> </div> 

                     <div onClick={()=>{
                      deleteNote(note)
                     }}> <i className="ri-close-line"></i> </div> 
                   </div>
                    
                  </div>
      })} 
    </div>

          {  
              <div className={` box ${ inputTF? 'isPop' : 'isClosed' }`} >
            <form onSubmit={ editDes } action="">
               <input type="text" placeholder='Type here ...' required />

            <button>Submit</button>
            </form>
           
          </div>
          }
       
     </>
  )
}

export default Notes