import React, { useEffect, useState } from 'react'
import Navbar from '../Components/Navbar'
import {useNavigate, useLocation } from 'react-router-dom'
import { editProduct } from '../Redux/apiCalls'

import axios from "axios"
import { categoryArray, colorArray, sizeArray } from '../filterData'
import { faArrowDown, faArrowUp} from '@fortawesome/free-solid-svg-icons'
import { FontAwesomeIcon } from '@fortawesome/react-fontawesome'
import { faXmark} from '@fortawesome/free-solid-svg-icons'

const ProductList = () => {

  const [products, setProducts] = useState([])
  const [filteredProducts, setFilteredProducts] = useState([])
  console.log(products)
  

  const pathQuery = useLocation().search

  const category = pathQuery.split("=")[1]

  const navigate = useNavigate()

  const [categoryDisplay, setCategoryDisplay] = useState("none")
  const [sizeDisplay, setSizeDisplay] = useState("none")
  const [colorDisplay, setColorDisplay] = useState("none")
  
  const [categoryFilterArrow, setCategoryArrow] = useState(faArrowDown)
  const [colorFilterArrow, setColorArrow] = useState(faArrowDown)
  const [sizeFilterArrow, setSizeArrow] = useState(faArrowDown)



  const [filterObject, setFilter] = useState({
    category: [],
    size: [],
    color: []
  })

  const [filterDivDisplay, setFilterDivDisplay] = useState("none")
  
  useEffect(()=>{
    const getProducts = async ()=>{
      const res =await axios.get(`http://localhost:5000/api/product/products${pathQuery}`)
      setProducts(res.data)
      setFilteredProducts(res.data)
      //setFilteredProducts(res.data)
    }
    getProducts()
    
  },[pathQuery])


  const oldPriceStyle = (el)=> {
    return {
        color: el.percentageNum > 0 && "grey",
        textDecoration: el.percentageNum > 0 && "line-through" 
    }

  }




  /* Filter Stuff */
  const toggleFilter = (filter)=>{
    if (filter === "category"){
      
      // either set display to none or empty depending on 
      if (categoryDisplay ==="none"){
        setCategoryDisplay("")
        setCategoryArrow(faArrowUp)
      } else if (categoryDisplay ===""){
        setCategoryDisplay("none")
        setCategoryArrow(faArrowDown)
      }
      
    } else if (filter ==="color"){

      if (colorDisplay ==="none"){
        setColorDisplay("")
        setColorArrow(faArrowUp)
      } else if (colorDisplay ===""){
        setColorDisplay("none")
        setColorArrow(faArrowDown)
      }
      

    } else if (filter ==="size"){
      if (sizeDisplay ==="none"){
        setSizeDisplay("")
        setSizeArrow(faArrowUp)
      } else if (sizeDisplay ===""){
        setSizeDisplay("none")
        setSizeArrow(faArrowDown)
      }

    }
  }


  const listClick = (e)=>{

    let attribute 
    if (e.target.children[1].name ==="category"){
      attribute = filterObject.category
    } else if (e.target.children[1].name === "size"){
      attribute = filterObject.size
    } else if (e.target.children[1].name === "color"){
      attribute = filterObject.color
    }
    

    if (!e.target.children[1].checked){
      e.target.children[1].checked = true
      setFilter((oldData)=>{

    
        return {
          ...oldData,
          [e.target.children[1].name]: [...attribute,e.target.children[1].value]
        }
      })
    } else {
      e.target.children[1].checked = false
      setFilter((oldData)=>{

        
      

        return {
          ...oldData,
          [e.target.children[1].name]: [...attribute.filter(el=>el !== e.target.children[1].value)]
        }
      })
    }
  }

  const displayFilterDiv = ()=>{
    
    if (filterDivDisplay === "none"){
      setFilterDivDisplay("")
    } else {
      setFilterDivDisplay("none")
    }
    
  }

  
  useEffect(()=>{

    let filteredProducts1 = []
    let filteredProducts2 = []
    let filteredProducts3 = []

    const uniqueIds = [];


    const filterFun = (filterObject2) =>{
      filterObject2.forEach(filterValue=>{
      
        filteredProducts1.push(...products.filter(product=>{
          let type
           if (filterObject.category.length > 0){
             type= product.categories
           } else if (filterObject.size.length >0){
             type= product.sizes
           } else if (filterObject.color.length > 0){
             type= product.colors
           }
             return type.includes(filterValue)
         })
       )
     })
     setFilteredProducts(filteredProducts1)
    }

    

/*     const secondAndThirdFilter = (typeString,filterObjectAtt,productToFilter, filterToStore)=>{
      
      filterObjectAtt.forEach(filterValue=>{
        filterToStore.push(...productToFilter.filter(productObject=>{
          if (typeString ==="color"){
            return productObject.colors.includes(filterValue)
          }
          else if (typeString ==="size"){
            return productObject.sizes.includes(filterValue)
          } else if (typeString ==="category"){
            return productObject.category.includes(filterValue)
          }
          
        })) 
      })

      const uniqueIds = [];
      const unique = filterToStore.filter(element => {
      const isDuplicate = uniqueIds.includes(element._id);

      if (!isDuplicate) {
        uniqueIds.push(element._id);
        return true;
      } 
});
      //console.log(filteredProducts2)
      setFilteredProducts(unique)
    } */

  
    const colorfilterFun = (productToFilter, filterToStore)=>{
      
      filterObject.color.forEach(filterValue=>{
        filterToStore.push(...productToFilter.filter(productObject=>{
          return productObject.colors.includes(filterValue)
        })) 
      })

      const uniqueIds = [];
      const unique = filterToStore.filter(element => {
      const isDuplicate = uniqueIds.includes(element._id);

      if (!isDuplicate) {
        uniqueIds.push(element._id);
        return true;
      } 
});
      //console.log(filteredProducts2)
      setFilteredProducts(unique)
    }

    const sizefilterFun = (productToFilter,filterToStore)=>{
  
      filterObject.size.forEach(filterValue=>{
        filterToStore.push(...productToFilter.filter(productObject=>{
          return productObject.sizes.includes(filterValue)
        }))
      })
      //console.log(filteredProducts2)

      const uniqueIds = [];

      const unique = filterToStore.filter(element => {
      const isDuplicate = uniqueIds.includes(element._id);

      if (!isDuplicate) {
        uniqueIds.push(element._id);
        return true;
      } 
    
});

      setFilteredProducts(unique)
    }

    const categoryfilterFun = (productToFilter,filterToStore)=>{
  
      filterObject.category.forEach(filterValue=>{
        filterToStore.push(...productToFilter.filter(productObject=>{
          return productObject.categories.includes(filterValue)
        }))
      })
      //console.log(filteredProducts2)

      const uniqueIds = [];

      const unique = filterToStore.filter(element => {
      const isDuplicate = uniqueIds.includes(element._id);

      if (!isDuplicate) {
        uniqueIds.push(element._id);
        return true;
      } 
    
});
      setFilteredProducts(unique)
    }
    //nobody better
    
    let filterObject2 = [] 

      if (filterObject.category.length > 0){
        filterObject2 = filterObject.category
        filterFun(filterObject2)
        if (filterObject.color.length > 0 && filterObject.category.length > 0){
          filterObject2 = filterObject.color
          colorfilterFun(filteredProducts1,filteredProducts2)
          //secondAndThirdFilter("color",filterObject2, filteredProducts1, filteredProducts2)
          if (filterObject.size.length > 0 && filterObject.color.length > 0 && filterObject.category.length > 0){
            //filterObject2= filterObject.size
            //secondAndThirdFilter("size",filterObject2, filteredProducts1, filteredProducts2)
             sizefilterFun(filteredProducts2, filteredProducts3)
          
          }
        } 
        else if (filterObject.size.length > 0 && filterObject.category.length > 0){
          sizefilterFun(filteredProducts1,filteredProducts2)
            if (filterObject.size.length > 0 && filterObject.color.length > 0 && filterObject.category.length > 0){
              colorfilterFun(filteredProducts2,filteredProducts3)
            }
          }
      
      } else if (filterObject.size.length > 0){
          filterObject2 = filterObject.size
          filterFun(filterObject2)
          if (filterObject.size.length > 0 && filterObject.category.length > 0){
            categoryfilterFun(filteredProducts1,filteredProducts2)
            if (filterObject.size.length > 0 && filterObject.color.length > 0 && filterObject.category.length > 0){
                colorfilterFun(filteredProducts2, filteredProducts3)
            }
          }
          
          else if (filterObject.size.length > 0  && filterObject.color.length ){
            colorfilterFun(filteredProducts1,filteredProducts2)
              if (filterObject.size.length > 0 && filterObject.color.length > 0 && filterObject.category.length > 0){
                sizefilterFun(filteredProducts2,filteredProducts3)
              }
            }

      } else if (filterObject.color.length > 0){
          filterObject2 = filterObject.color
          filterFun(filterObject2)

          if (filterObject.color.length > 0 && filterObject.category.length > 0){
            categoryfilterFun(filteredProducts1,filteredProducts2)
            if (filterObject.size.length > 0 && filterObject.color.length > 0 && filterObject.category.length > 0){
                colorfilterFun(filteredProducts2, filteredProducts3)
            }
          }
          
          else if (filterObject.size.length > 0  && filterObject.color.length ){
            colorfilterFun(filteredProducts1,filteredProducts2)
              if (filterObject.size.length > 0 && filterObject.color.length > 0 && filterObject.category.length > 0){
                sizefilterFun(filteredProducts2,filteredProducts3)
              }
            }
      } 
      else if (filterObject.size.length === 0  && filterObject.color.length === 0 && filterObject.category.length === 0 ){
        setFilteredProducts(products)
      }
  },[filterObject])


  console.log(filteredProducts)

  console.log(filterObject)
  console.log(filterObject.category)


  const handleSort = (e)=>{

    if (e.target.value === "highestPrice"){
      console.log("Sorting by Highest Price")
      setFilteredProducts(oldProduct=>[...oldProduct.sort((a,b)=>b.price-a.price)])
    } else if (e.target.value === "lowestPrice"){
      console.log("Sorting by Lowest Price")
      setFilteredProducts(oldProduct=>[...oldProduct].sort((a,b)=>a.price-b.price))
    } else if (e.target.value === "popular"){
      console.log("Sorting by Most Popular")
      setFilteredProducts(oldProduct=>[...oldProduct].sort((a,b)=>a.productSold-b.productSold))
    } else {
      setFilteredProducts(products)
    }
   
  }


  return (
    <>  
        <Navbar></Navbar>
        <div className="content-container">
          <div className="row sp-btw vert-center">
            <h1 className='md-bottom-margin header-font-size'>Products For {category}</h1>
            <div className="row md-gap lg-bottom-margin">
              <select name="sort" id="sort" className='light-grey-border' onChange={handleSort}>
                <option value="">Sort By</option>
                <option value="popular">Most Popular</option>
                <option value="highestPrice">Highest Price</option>
                <option value="lowestPrice">Lowest Price</option>
              </select>
              <button onClick={displayFilterDiv} className='filter-btn sm-vert-padd md-horz-padd light-grey-border'>Filter</button>
            </div>
            
          </div>
           
          <div className="product-list-container lg-gap">

          <div className={`${filterDivDisplay} filters-div column lg-gap md-padd`}>
            <div onClick={displayFilterDiv} className="header row sp-btw vert-center">
               <h1>Filter Products By</h1>
               <FontAwesomeIcon className='filter-cross' icon={faXmark}></FontAwesomeIcon>
            </div>
        
            <div className="filter-div">
              <div onClick={()=>toggleFilter("category")} className='filter-header row sp-btw vert-center sm-bottom-margin xsm-padd'>
                <h2>Category</h2>
                <FontAwesomeIcon icon={categoryFilterArrow} className="down-arrow"></FontAwesomeIcon>
              </div>
              <ul className="filter-category-list column sm-gap xsm-padd">
              {categoryArray.map(el=>{
                return <div onClick={listClick} className={`filter-checkbox row vert-center ${categoryDisplay}`}>
                    <label htmlFor={el}>{el}</label>
                    <input type="checkbox" name="category" value={el} id={el}/>
                </div>
                  
                })}
              </ul>
            </div>

            <div className="filter-div">
              <div onClick={()=>toggleFilter("size")} className='filter-header row sp-btw vert-center sm-bottom-margin xsm-padd'>
                <h2>Sizes</h2>
                <FontAwesomeIcon icon={sizeFilterArrow} className="down-arrow"></FontAwesomeIcon>
              </div>
              <ul className='filter-size-list column sm-gap xsm-padd'>
               {sizeArray.map(el=>{
                return <div onClick={listClick} className={`filter-checkbox row vert-center ${sizeDisplay}`}>
                    <label htmlFor={el}>{el}</label>
                    <input value={el} type="checkbox" name="size" id={el}/>
                </div>
                  
                })}
              </ul>
            </div>

            <div className="filter-div">
              <div onClick={()=>toggleFilter("color")} className='filter-header row sp-btw vert-center sm-bottom-margin xsm-padd'>
                <h2>Colors</h2>
                <FontAwesomeIcon icon={colorFilterArrow} className="down-arrow"></FontAwesomeIcon>
              </div>
              <ul className='filter-color-list column sm-gap xsm-padd'>
              {colorArray.map(el=>{
                return <div onClick={listClick}  className={`filter-checkbox row vert-center ${colorDisplay}`}>
                    <label htmlFor={el}>{el}</label>
                    <input type="checkbox" name="color" value={el} id={el}/>
                </div>
                  
                })}
              </ul>
            </div>

          </div>

            <div className="product-grid sm-gap">
              {filteredProducts.map(el=>{
                return <div onClick={()=>{
                    navigate(`/product/${el._id}`)
                    editProduct({productViews:"change product count"},el._id, )}
                    
                    } className="product-item column sm-gap md-padd relative">
                  { el.percentageNum > 0 && <h2 className='absolute discount-info sm-vert-padd md-horz-padd'>{el.percentageNum}%</h2>}
                  <img src={el.images[0]} alt="" />
                  <h3>{el.name}</h3>
                  <p>{el.description}</p>
                  <div className="row sm-gap">
                    <h3 style={oldPriceStyle(el)}>{el.price}$</h3>
                    { el.percentageNum > 0 && <h3>{el.price - (el.price * el.percentageNum / 100)}$</h3>}
                  </div>
                  
                </div>
              })}
            </div>

          </div>

          

        </div>  
    </>
  )
}

export default ProductList
