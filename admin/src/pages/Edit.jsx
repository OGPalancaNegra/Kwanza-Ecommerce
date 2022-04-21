import React, { useEffect, useState } from 'react'
import { useLocation, useNavigate } from 'react-router-dom'
import img1 from "../images/lekicks.png"
import { editProduct } from '../redux/apiCalls'
import { categoryArray } from '../redux/filterData'
import { colorsArray } from '../redux/filterData'
import { sizeArray } from '../redux/filterData'
import Page from './Page'
import {
    getStorage,
    ref,
    uploadBytes,
    uploadBytesResumable, 
    getDownloadURL,
    deleteObject,
    
  } from "@firebase/storage";



import app from "../firebase";
import axios from 'axios'
import { useSelector } from 'react-redux'


const Edit = () => {

    const forToken = useSelector(state=>state.currentAdmin)

     if (!forToken) {
        navigate("/login")
    }

    const [foundProduct, setProduct] = useState({
    })

    
    const colorsArray =["black","white","red", "green","blue","brown","grey","pink","purple", "yellow","orange"]

    const objectId = useLocation().pathname.split("/")[2]
 


 

   const [previewArr, setPreview] = useState([])
   const [imgsToPossiblyDelete, setImgsToDelete] = useState(foundProduct.images)
   
   const [loading, setLoading] = useState(false)


    const navigate = useNavigate()


    console.log(foundProduct)

    useEffect(()=>{
        const getProduct = async () =>{
            try {
                const res = await axios.get(`http://localhost:5000/api/product/products/${objectId}`)
                setProduct(res.data)
                setImgsToDelete(res.data.images)
                
            } catch {
                console.log("Failed to get it")
            }
        }
        getProduct()
    },[])
    

    const storeInfo = (e) =>{
        const {type} = e.target.type
        setProduct((oldData)=>{
            return {
                ...oldData,
                [e.target.name]: type? [...oldData.categories,oldData.categories.push(e.target.value)]: e.target.value
            }
        })        
    }
    
    const storeImages = (e)=>{
       // store old image info to delete it later
    
      
       
       // preview stuff
        previewArr.length = []
        for (let i=0; i < e.target.files.length; i++){
         
            setPreview(oldArray=>[...oldArray,URL.createObjectURL(e.target.files[i])])
      
    } 

       setProduct((oldProduct)=>{  
            return {...oldProduct, images: e.target.files}})

    }

    
   const displayImages = ()=>{
    
     if (foundProduct.images?.length >=1 && Array.isArray(foundProduct.images)){    
            return foundProduct.images?.map(el=>{
                return <img src={el} alt="" /> 
                })
            
        }   else {
            return previewArr.map(el=>{
                return <img src={el} alt="" /> 
                }) 
        }   
   }
   console.log(Array.isArray(foundProduct.images))



   const storeCategory = (e)=>{
    if (e.target.checked){
        if (e.target.name === "categories"){
            setProduct((oldData)=>{
                return {...oldData, categories:[...oldData.categories,e.target.value]}
            })
        } else if (e.target.name ==="sizes"){
            setProduct((oldData)=>{
                return {...oldData, sizes:[...oldData.sizes,e.target.value]}
            })
        }
    } else {
        if (e.target.name ==="categories"){
            setProduct((oldCat)=>{
                return {...oldCat,categories:[...oldCat.categories.filter(el=>el !==e.target.value)]}})
               
        } else if (e.target.name ==="sizes"){
            setProduct((oldSizes)=>{
                return {...oldSizes,sizes:[...oldSizes.sizes.filter(el=>el !==e.target.value)]}
            })
            
        }

    }
}

   const storeColor = (e)=>{
     
       if (!foundProduct.colors.includes(e.target.style.backgroundColor)){
        e.target.style.opacity = 1
        setProduct((oldColors)=>{ 
            return {...oldColors, colors:[...oldColors.colors,e.target.style.backgroundColor]}
        })
       } else if (foundProduct.colors.includes(e.target.style.backgroundColor)){
        e.target.style.opacity = 0.1
        setProduct((oldColors)=>{
            return {...oldColors, colors:[...oldColors.colors.filter(el=> el !== e.target.style.backgroundColor)]}
    
       })
   }

}



   const colorStyle =(color) => {
       return {
        backgroundColor: color,
        opacity: foundProduct.colors?.includes(color) ? 1 : 0.1
       }
      
   }

   // if color in the color array set opacity to 1

   const displayColorSelector = ()=>{
       return colorsArray.map(el=>{
           return <div onClick={storeColor} className='colors' value={el} style={colorStyle(el)}></div>
        
       })
   }

//"https://firebasestorage.googleapis.com/v0/b/ecommerce1-fc429.appspot.com/o/products%2F1648303559188%2B%22smt%20unique%22%20?alt=media&token=2a1911f2-bea5-45c7-88cd-f2e25ff9a9b4"

// "https://firebasestorage.googleapis.com/v0/b/ecommerce1-fc429.appspot.com/o/products%2F1648303559187%2B%22smt%20unique%22%20?alt=media&token=d5d4f35b-ff15-4a05-a980-f9f8aebb0711"



    const createProduct = async (e)=>{

       e.preventDefault()

       console.log(Array.isArray(foundProduct.images))

       setLoading(true)

       if (!Array.isArray(foundProduct.images)){
        

        const storage = getStorage(app)
        
       // const storageRef = ref(storage,`products/${new Date().getTime()}+"smt unique" `)
    
 

        console.log("the one with image change RAN")

        // delete old imgs
        imgsToPossiblyDelete.forEach(el=>
            {
                //const imageRefToDelete = ref(storage,`${el?.split("/")[7].split("%")[1].toString().substring(2)}+"smt unique" `)
                deleteObject(ref(storage,el)).then(()=>{
                    console.log("images succuefully Deleted")
                }).catch((e)=>{console.log("images not deleted")})
            })

        let arrayTing = []
       
        

        for (let i=0; i< foundProduct.images.length; i++){
            const storage = getStorage(app)
            const storageRef = ref(storage,`products/${new Date().getTime()}+ ${foundProduct.images[i].name} `)
             
            console.log(storageRef)
            const uploadTask = uploadBytesResumable(storageRef, foundProduct.images[i])
         //   console.log(uploadTask)
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
                if (arrayTing.length===foundProduct.images.length) {
                    editProduct({...foundProduct, images:arrayTing}, objectId, forToken.accessToken, forToken._id)
                    console.log("last ting run")
                    setLoading(false)
                    navigate(`/products/${foundProduct._id}`);
                }
                
            })
         })   
        }
       } else {
           console.log("the one without image change RAN")
           editProduct(foundProduct, objectId, forToken.accessToken, forToken._id)
           setLoading(false)
           navigate(`/products/${foundProduct._id}`)
       }

  
    }

   // console.log(imgsToPossiblyDelete)
    console.log(imgsToPossiblyDelete)

  return (
    <>
      <Page></Page>
        <div className="main-content right-section">
        
        <h2><a onClick={()=>navigate(`/products/${objectId}`)}>Product </a>/ Edit Page</h2>
        
        {
            !loading ? (
                <form className='column md-gap' id='create-form' action="" encType="multipart/form-data">
                <label htmlFor="Name">Name</label>
                <input onChange={storeInfo} type="text" name="name" id="Name" value={foundProduct.name} />
                <label htmlFor="description">Description</label>
                <textarea onChange={storeInfo} name="description" id="" cols="30" rows="5" value={foundProduct.description}></textarea>
                <label htmlFor="image">Image (s)</label>
                <input onChange={storeImages} type="file" id="image" name='images' multiple/>
                
                <div className="row wrap sm-gap">
                   {displayImages()}
                </div>
               
                <fieldset className='row vert-center wrap sm-gap'>
                    <legend>Categories</legend>    
                    {categoryArray.map(el=>{
                        return <> <label htmlFor={el}>{el}</label>  
                        <input type="checkbox" name="categories" value={el} id={el} checked={foundProduct.categories?.includes(el) && true}  onChange={storeCategory}/>   
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
                    {sizeArray.map(el=>{
                        return <>
                        <label htmlFor={el}>{el}</label>  
                        <input type="checkbox" name="sizes" value={el} id={el}  onChange={storeCategory} checked={foundProduct.sizes?.includes(el) && true}/>   
                        </>
                    })}   
                        
                       {/*  <label htmlFor="s">s</label>   
                        <input type="checkbox" name="sizes" value="s" id='s'   onChange={storeCategory}/> 
                        <label htmlFor="m">m</label>   
                        <input type="checkbox" name="sizes" value="m" id='m' onChange={storeCategory}/>
                        <label htmlFor="l">l</label>     
                        <input type="checkbox" name="sizes" value="l" id='l'  onChange={storeCategory}/>   
                        <label htmlFor="xl">xl</label>     
                        <input type="checkbox" name="sizes" value="xl" id='xl' onChange={storeCategory}/> */}
                </fieldset>
    
                <p>Select Colors</p>
                <div className='row sm-gap wrap'>
                    
                  {displayColorSelector()}     
                </div>
                
    
                <label htmlFor="price">Price</label>
                <input onChange={storeInfo} type="number" name="price" id="price" value={foundProduct.price} />
                <label htmlFor="quantity">Number of Products Available Online</label>
                <input onChange={storeInfo} type="number" name="quantity" id="quantity" value={foundProduct.quantity}/>
                <button onClick={createProduct}>Edit</button>
            </form>
            ) : <div class="loader"></div>
        }
        
  
    </div>
    </>
  )
}

export default Edit
