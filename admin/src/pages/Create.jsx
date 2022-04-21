import axios from 'axios'
import React, { useEffect, useState } from 'react'
import { useNavigate } from 'react-router-dom'
import img1 from "../images/lekicks.png"
import { postProduct } from '../redux/apiCalls'
import { categoryArray } from '../redux/filterData'
import { colorsArray } from '../redux/filterData'
import Page from './Page'
import {
    getStorage,
    ref,
    uploadBytes,
    uploadBytesResumable, 
    getDownloadURL
  } from "@firebase/storage";
import app from "../firebase";
import { useSelector } from 'react-redux'


const Create = () => {
    
  
    const [productInfo, updateProduct] = useState({
        name:"",
        description:"",
        price: 0,
        quantity: 0
    })

    const [images, updateImages] = useState([])
    const [categories, updateCategories] = useState([])
    const [sizes, updateSizes] = useState([])
    const [colors, updateColors] = useState([])
    const colorsArray =["black","white","red", "green","blue","brown","grey","pink","purple", "yellow","orange"]

    const [loading, setLoading] = useState(false)


    const navigate = useNavigate()


    const forToken = useSelector(state=>state.currentAdmin)
    //console.log(for)



    const storeInfo = (e) =>{
        const {type} = e.target.type
        updateProduct((oldData)=>{

            return {
                ...oldData,
                [e.target.name]: type? [...oldData.categories,oldData.categories.push(e.target.value)]: e.target.value
            }
        })        
    }

  /*   const storeCategory = (e)=>{
        if (e.target.checked){
            updateCategories((oldData)=>{
                return [...oldData, e.target.value]
            })
        } else {
            updateCategories((oldData)=>{ 
                return [...oldData.filter(el=>el !== e.target.value)]
              
            })
        }   
    } */

    const storeCategory = (e)=>{
        if (e.target.checked){
            if (e.target.name === "categories"){
                updateCategories((oldData)=>{
                    return [...oldData, e.target.value]
                })
            } else if (e.target.name ==="sizes"){
                updateSizes((oldData)=>{
                    return [...oldData, e.target.value]
                })
            }
        } else {
            if (e.target.name ==="categories"){
                updateCategories(oldCat=>[...oldCat.filter(el=>el !==e.target.value)])
            } else if (e.target.name ==="sizes"){
                updateSizes(oldSizes=>[...oldSizes.filter(el=>el !==e.target.value)])
            }

        }
    }

    console.log(sizes)
    console.log(categories)

    const storeImages = (e)=>{
       updateImages(e.target.files)
    }

   const displayImages = ()=>{
    
        if (images){

            const imgUrls = []

            for (let i=0; i < images.length; i++){
                imgUrls.push(URL.createObjectURL(images[i]))
            }
            
            return imgUrls.map(el=>{
                return <img src={el} alt="" />
            })
        }
           
   }

   const storeColor = (e)=>{
       console.dir(e.target.style.backgroundColor)
       //if color false do this
       // if color not in the state array do this
       if (!colors.includes(e.target.style.backgroundColor)){
        e.target.style.opacity = 1
        updateColors(oldColors=>[...oldColors,e.target.style.backgroundColor ])
       } else if (colors.includes(e.target.style.backgroundColor)){
        e.target.style.opacity = 0.1
        updateColors(oldColors=>[...oldColors.filter(el=> el !== e.target.style.backgroundColor)])
       }
   }


   console.log(colors)


   const displayColorSelector = ()=>{
       return colorsArray.map(el=>{
           return <div onClick={storeColor} className='colors' value={el} style={{backgroundColor:el}}></div>
        
       })
   }

    const createProduct = async (e)=>{

       e.preventDefault()

        setLoading(true)

        let arrayTing = []
       
       for (let i=0; i< images.length; i++){
        const storage = getStorage(app)
        const storageRef = ref(storage,`products/${new Date().getTime()}+${images[i].name} `)
         

        const uploadTask = uploadBytesResumable(storageRef, images[i])

        uploadTask.on("state_changed", (snapshot)=>{
            // Observe state change events such as progress, pause, and resume
        // Get task progress, including the number of bytes uploaded and the total number of bytes to be uploaded
        const progress = (snapshot.bytesTransferred / snapshot.totalBytes) * 100;
        console.log('Upload is ' + progress + '% done');
        switch (snapshot.state) {
        case 'paused':
            console.log('Upload is paused');
            break;
        case 'running':
            console.log('Upload is running');
            break;
        }
    }, 
    (error) => {
        // Handle unsuccessful uploads
    }, 
    async () => {

        console.log(uploadTask.snapshot.ref)
       await getDownloadURL(uploadTask.snapshot.ref).then((downloadURL) => {
            
            arrayTing.push(downloadURL)
            console.log(arrayTing) 
            if (arrayTing.length===images.length) {
                postProduct({...productInfo, categories, images:arrayTing, colors, sizes},forToken.accessToken, forToken._id)
                console.log("last ting run")
                setLoading(false)
                navigate("/products")
            } 
        })
     })   
    }
    }

    console.log(images)


    return (
    <>
        <Page></Page>
        <div className="main-content right-section">
        <h2>Create Product</h2>
        {!loading ? (<form className='column md-gap' id='create-form' action="" encType="multipart/form-data">
                    <label htmlFor="Name">Name</label>
                    <input onChange={storeInfo} type="text" name="name" id="Name" />
                    <label htmlFor="description">Description</label>
                    <textarea onChange={storeInfo} name="description" id="" cols="30" rows="5"></textarea>
                    <label htmlFor="image">Image (s)</label>
                    <input onChange={storeImages} type="file" id="image" name='images' multiple/>
                    
                    <div className="row wrap sm-gap">
                       {displayImages()}
                    </div>
                   
                    <fieldset className='row vert-center wrap sm-gap'>
                        <legend >Categories</legend>    
                        {categoryArray.map(el=>{
                            return <> <label htmlFor={el}>{el}</label>  
                            <input type="checkbox" name="categories" value={el} id={el}  onChange={storeCategory}/>   
                            </>
                           
                        
                           
                        })}
                           {/*  <label htmlFor="Men">Men</label>  
                            <input type="checkbox" name="categories" value="Men" id='Men'  onChange={storeCategory}/>   
                            <label htmlFor="Women">Women</label>   
                            <input type="checkbox" name="categories" value="Women" id='Women'   onChange={storeCategory}/> 
                            <label htmlFor="Kids">Kids</label>   
                            <input type="checkbox" name="categories" value="Kids" id='Kids' onChange={storeCategory}/>
                            <label htmlFor="Shirt">Shirt</label>     
                            <input type="checkbox" name="categories" value="Shirt" id='Shirt'  onChange={storeCategory}/>   
                            <label htmlFor="Shoes">Shoes</label>     
                            <input type="checkbox" name="categories" value="Shoes" id='Shoes' onChange={storeCategory}/>
                            <label htmlFor="Pants">Pants</label>     
                            <input type="checkbox" name="categories" value="Pants" id='Pants' onChange={storeCategory}/>
                            <label htmlFor="Underwear">Underwear</label>     
                            <input type="checkbox" name="categories" value="Undewear" id='Underwear' onChange={storeCategory}/>    */}
                    </fieldset>
        
                    <fieldset className='row vert-center wrap sm-gap'>
                        <legend >Sizes</legend>    
                            <label htmlFor="xs">xs</label>  
                            <input type="checkbox" name="sizes" value="xs" id='xs'  onChange={storeCategory}/>   
                            <label htmlFor="s">s</label>   
                            <input type="checkbox" name="sizes" value="s" id='s'   onChange={storeCategory}/> 
                            <label htmlFor="m">m</label>   
                            <input type="checkbox" name="sizes" value="m" id='m' onChange={storeCategory}/>
                            <label htmlFor="l">l</label>     
                            <input type="checkbox" name="sizes" value="l" id='l'  onChange={storeCategory}/>   
                            <label htmlFor="xl">xl</label>     
                            <input type="checkbox" name="sizes" value="xl" id='xl' onChange={storeCategory}/>
                    </fieldset>
        
                    <p>Select Colors</p>
                    <div className='row sm-gap wrap'>
                        
                      {displayColorSelector()}     
                    </div>
                    
        
                    <label htmlFor="price">Price</label>
                    <input onChange={storeInfo} type="number" name="price" id="price" />
                    <label htmlFor="quantity">Number of Products Available Online</label>
                    <input onChange={storeInfo} type="number" name="quantity" id="quantity" />
                    <button onClick={createProduct}>Create</button>
                </form>)  : <div class="loader"></div>

        }

    </div>
    </>
    
  )
}

export default Create
