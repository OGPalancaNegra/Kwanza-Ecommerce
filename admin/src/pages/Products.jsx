import React, { useEffect, useState } from 'react'
import img1 from "../images/lekicks.png"
import { faPen } from '@fortawesome/free-solid-svg-icons'
import { faTrash } from '@fortawesome/free-solid-svg-icons'
import { FontAwesomeIcon } from '@fortawesome/react-fontawesome'
import { faFileExport } from '@fortawesome/free-solid-svg-icons'
import ProductList from '../components/ProductList'
import Create from './Create'
import {BrowserRouter, Routes, Route, Redirect, useNavigate } from 'react-router-dom'
import Page from './Page'
import axios from 'axios'
import { categoryArray } from '../redux/filterData'
import { colorArray } from '../redux/filterData'
import { sizeArray } from '../redux/filterData'
import { deleteProduct } from '../redux/apiCalls'

import {
    getStorage,
    ref,
    uploadBytes,
    uploadBytesResumable, 
    getDownloadURL,
    deleteObject,
    
  } from "@firebase/storage";
import app from '../firebase'
import { useSelector } from 'react-redux'


const Products = ({products}) => {

  //const [page, updatePage] = useState()
  
  const [currentPage, setCurrentPage] = useState(1)
  const [postPerPage, setPostsPerPage] = useState(8)

 // const [stateCategoryArray, setCategory] = useState(categoryArray)


  const [filterObj, setFilter] = useState({
      category:categoryArray,
      color: colorArray,
      size: sizeArray,
      name: ""
  })

  const [filteredProducts, setFilteredProducts] = useState([])

  const navigate = useNavigate()

  const forToken = useSelector(state=>state.currentAdmin)

  if (!forToken) {
     navigate("/login")
 }



  const displayProducts = ()=>{

    const indexOfLastPost = postPerPage * currentPage
    const indexOfFirstPost = indexOfLastPost - postPerPage

      if (filteredProducts) {
        const currentPosts = filteredProducts.slice(indexOfFirstPost,indexOfLastPost)
        return currentPosts.map(el=>{
        
            return <div className='product column sm-gap' onClick={()=>navigate(`/products/${el._id}`)}>
                    <div className='img-div'>
                     <img src={el.images[0]} alt="" />
                     {el.percentageNum > 0 && <h4 className='discount-div'>{el.percentageNum}%</h4>}
                    </div>
                    

                    <p>{el.name}</p>
                    <h5>{el.price}</h5>
                    <div className="row md-gap sp-btw">
                        <h4 onClick={(e)=>{
                          e.stopPropagation()
                          navigate(`/products/${el._id}/edit`)}}><FontAwesomeIcon icon={faPen}/>Edit</h4>
                        <h4 onClick={(e)=>{
                          e.stopPropagation()
                          deleteP(el._id, el)}
                        
                          }><FontAwesomeIcon icon={faTrash}/>Delete</h4>
                    </div>
                </div>  
        })    
      }
  }

  const pagination = ()=>{
    // display pagination number based of products and posts per page
    const paginationNum = Math.ceil(filteredProducts.length / postPerPage)
   
    const paginationJsx = []
    for (let i = 1; i <= paginationNum; i++){
      
        paginationJsx.push(<a href="#" onClick={()=>setCurrentPage(i)}>{i}</a>)   
    }

    return paginationJsx.map(el=>{
        return el
    })
  }


  const storeFilter = (e)=>{
    let array= []

    const eValue = e.target.value

    if (eValue === "category") {
      array = categoryArray
    } else if (eValue ==="size"){
      array = sizeArray
    } else if (eValue ==="color"){
      array = colorArray
    }
        setFilter((oldFilterObj)=>{

            return {
                ...oldFilterObj,
                [e.target.name]: eValue === "category" || eValue === "size" || eValue === "color" ? array:eValue
            }
        })
  }

/*   useEffect(()=>{
    setFilteredProducts(products.filter((el)=>
     // el.categories.includes(filterObj.category) && el.sizes.includes(filterObj.size)))
    typeof filterObj.category === "string" || typeof filterObj.size === "string"

    ? el.categories.includes(filterObj.category) && !el.sizes.includes(filterObj.size) : !el.categories.includes(filterObj.category) && !el.sizes.includes(filterObj.size)))
  },[products,filterObj]) */


  
  useEffect(()=>{
    setFilteredProducts(products.filter((el)=>{
      if (typeof filterObj.category ==="string" && typeof filterObj.size ==="object" && typeof filterObj.color ==="object"){
        console.log("just category filtered")
        return !el.sizes.includes(filterObj.size) && !el.colors.includes(filterObj.color) && el.categories.includes(filterObj.category)
      } else if (typeof filterObj.size ==="string" && typeof filterObj.category ==="object" && typeof filterObj.color ==="object"){
        console.log("just size filtered")
        return  !el.categories.includes(filterObj.category) && !el.colors.includes(filterObj.color) && el.sizes.includes(filterObj.size)
      } else if (typeof filterObj.color ==="string" && typeof filterObj.size ==="object" && typeof filterObj.category ==="object" )
      {
        console.log("just colors filtered")
        return !el.categories.includes(filterObj.category) && !el.sizes.includes(filterObj.size) && el.colors.includes(filterObj.color) 
      }
      else if (typeof filterObj.category ==="object" && typeof filterObj.size ==="object" && typeof filterObj.color ==="object"){
      console.log("all of them UNfiltered")
      return !el.categories.includes(filterObj.category) && !el.sizes.includes(filterObj.size) && !el.sizes.includes(filterObj.color) }
      
      /* MULTIPLE SINGLE CATEGORIES */
      else if (typeof filterObj.category ==="string" && typeof filterObj.color ==="string" && typeof filterObj.size ==="object"){
        console.log("category and color filtered")
        return el.categories.includes(filterObj.category) && el.colors.includes(filterObj.color) && !el.sizes.includes(filterObj.size)
      }
      else if (typeof filterObj.category ==="string" && typeof filterObj.size ==="string" && typeof filterObj.color ==="object"){
        console.log("category and size filtered")
        return el.categories.includes(filterObj.category) && el.sizes.includes(filterObj.size) && !el.colors.includes(filterObj.size)
      }

      else if (typeof filterObj.size ==="string" && typeof filterObj.color ==="string" && typeof filterObj.category ==="object"){
        console.log("size and color filtered")
        return el.colors.includes(filterObj.color) && el.sizes.includes(filterObj.size) && !el.categories.includes(filterObj.category)
      }

      else {
        console.log("all of them filtered")
       return el.categories.includes(filterObj.category) && el.sizes.includes(filterObj.size) && el.colors.includes(filterObj.color)
      }
    }))

    setFilteredProducts((oldProducts)=>
    {
      function capitalizeFirstLetter(string) {
        return string.charAt(0).toUpperCase() + string.slice(1);
      }
     // let name= filterObj.name.slice(0,1).toUpperCase()
    /*   console.log(name)
      if (filterObj.name.length ===0){
        //name.toUpperCase()
      } else {
        //name.toLowerCase()
      } */
      return oldProducts.filter(el=>el.name.includes(capitalizeFirstLetter(filterObj.name)))
    
    })

       /*  setFilteredProducts((oldProducts)=>
    {
      return oldProducts.filter((el)=>{
        const capitalized = filterObj.name.slice(0,1)
        console.log(capitalized)
        return el.name.includes(filterObj.name)  
    })
    }
    ,[products,filterObj])}) */
  },[products,filterObj])


  


  console.log(filterObj)
  console.log(filteredProducts)


const deleteP =(id, product)=>{
       
    // delete images in database
    console.log("deleting Product...")
     const storage = getStorage(app)
     product.images.forEach(el=>{
         deleteObject(ref(storage, el))
         .then(()=>{
             console.log("image succesfully deleted")
             deleteProduct(id)
             window.location.reload(false);
             
         })
         .catch(console.log("not deleted"))

     })
}



  return (
      <>
       <Page></Page>
       <div className='main-content right-section'>
      <div className="row sp-btw">
        <h2>Product Page</h2>
        <div className="row sm-gap">
            <button className="btn secondary-btn"><FontAwesomeIcon icon={faFileExport}/>Export</button>
            <button className="btn primary-btn" onClick={()=>navigate("/create")} >+ Create New</button>
        </div>
      </div>
      
      <div className='products'>
          <div className="row sp-btw">
             <input type="search" name="name" id="name" placeholder='Air Jordan' onChange={storeFilter}/>
             <div className="row sm-gap wrap">
                 <select className='filter-btn' name="category" id="category" onChange={storeFilter}>
                   <option>category</option>
                     {categoryArray.map(el=>{
                        return <option value={el}>{el}</option>
                     })}
                 </select>
                 <select className='filter-btn' name="size" id="size" onChange={storeFilter}>
                 <option>size</option>
                     {sizeArray.map(el=>{
                        return <option value={el}>{el}</option>
                     })}
                 </select>
                 <select className='filter-btn' name="color" id="color" onChange={storeFilter}>
                 <option>color</option>
                     {colorArray.map(el=>{
                        return <option value={el}>{el}</option>
                     })}
                 </select>
                 
                 <select className='filter-btn' name="sort" > 
                 <option value="">order</option>
                     <option value="Newest">Newest</option>
                     <option value="Highest">Highest</option>
                     <option value="Lowest">Lowest</option>
                 </select>
             </div>
          </div>
          
          <div className='product-grid grid sm-gap'>
            {displayProducts()}

          </div>

        

      </div>
      <div className="pagination row">
            <a href="#" onClick={()=>currentPage >1 && setCurrentPage(oldTing=>oldTing-1)}>Previous</a>
            {pagination()}
            <a href="#"onClick={()=>setCurrentPage(oldTing=>oldTing+1)}>Next</a>
        </div>
    </div>
      </>
    
  
  )
}

export default Products
